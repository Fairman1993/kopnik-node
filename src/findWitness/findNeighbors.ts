import {User} from "@entity/user/User.entity";
import context from "@/context/context";
import {getManager, In,} from "typeorm";
import {basename} from "path";
import container from "@/di/container";
import plain from "@entity/user/plain";
import StatusEnum from "@entity/user/StatusEnum";
import RoleEnum from "@entity/user/RoleEnum";

export default async function (halfUser: User, count=3): Promise<User[]> {
  const logger = container.createLogger({name: basename(__filename),})
  let em = context.em || getManager(),
    neighborIds

  let neighborsRows = await em.query(`
    select 
      neighbor.id, 
      distance (neighbor, halfUserLocation) as distance, 
      neighbor.first_name || ' ' || neighbor.last_name as if,
      neighbor.latitude,
      neighbor.longitude
    from 
      users neighbor,
      point(${halfUser.longitude}, ${halfUser.latitude}) as halfUserLocation 
    where
      neighbor.status= ${StatusEnum.Confirmed}
      and neighbor.role <> ${RoleEnum.Female}
      and neighbor.id <> ${halfUser.id}
    order by
      distance ASC
    limit ${count}
  `)

  if (halfUser.id===1){
    neighborIds=[1]
  }
  else {
    neighborIds= neighborsRows.map(eachNeighborRow=>eachNeighborRow.id)
  }

  const result = await em.find(User, {
    where:{
      id: In(neighborIds)
    }})
  logger.info({neighbor: result.map(eachResult=> ({
      id: eachResult.id,
      iof: eachResult.iof,
    }))}, 'neighbors')
  return result
}
