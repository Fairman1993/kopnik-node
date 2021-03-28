import {User} from "@entity/user/User.entity";
import context from "@/context/context";
import {getManager,} from "typeorm";
import {basename} from "path";
import container from "@/di/container";
import plain from "@entity/user/plain";

export default async function (halfUser: User,): Promise<User> {
  const logger = container.createLogger({name: basename(__filename),})
  let em = context.em || getManager(),
    witnessId

  let witnessRows = await em.query(`
    select 
      witness.id, 
      distance (witness, halfUserLocation) < witness.witness_radius as cover, 
      distance (witness, halfUserLocation) as distance, 
      witness.witness_radius, 
      witness.first_name || ' ' || witness.last_name as if,
      witness.latitude,
      witness.longitude
    from
      users witness,
      point(${halfUser.longitude}, ${halfUser.latitude}) as halfUserLocation 
    where
      witness.is_witness
      and witness.id != ${halfUser.id}
    order by
      witness.witness_radius ASC
  `)

  logger.debug({witnesses: witnessRows}, 'findWitness')

  if (halfUser.id===1){
    witnessId=1
  }
  else if (witnessId= witnessRows.find(eachWitnessRow=>eachWitnessRow.cover)?.id){
    // уже присвоился внутри else if
  }
  else{
    witnessId=1
  }

  const result = await em.findOneOrFail(User, witnessId)
  logger.info({witness: plain(result)}, 'witness')
  return result
}
