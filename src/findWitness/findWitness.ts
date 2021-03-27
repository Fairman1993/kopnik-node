import {User} from "@entity/user/User.entity";
import context from "@/context/context";
import {getManager, } from "typeorm";

export default async function (halfUser: User,): Promise<User> {
  let em = context.em || getManager()

  let witnessRows = await em.query(`
  select * 
  from
    users witness
  where 
    witness.is_witness
    and witness.id != ${halfUser.id}
    and point(witness.longitude, witness.latitude) <@> point(${halfUser.longitude}, ${halfUser.latitude}) <= witness.witness_radius * 0.62137
  order by
    witness_radius ASC
  `)

  const result = await em.findOneOrFail(User, witnessRows ?.[0]?.id || 1)

  return result
}
