import {Request, Response} from "express";

import container from "@/di/container";
import {basename} from "path";
import context from "@/context/context";
import {getRepository} from "typeorm";
import {User} from "@entity/user/User.entity";
import plain from "@entity/user/plain";
import response from "@api/response";
import plainForCurrentUser from "@entity/user/plainForCurrentUser";
import StatusEnum from "@entity/user/StatusEnum";


/**
 */
export default async function (req: Request, res: Response) {
  const logger = container.createLogger({name: basename(__filename),})

  const result = await getRepository(User).find({
    where: {
      witness: context.user,
      status: StatusEnum.Pending,
      // 'witnessChat.inviteLink': Raw(alias=>`${alias} is not null`)
    },
    order: {updatedAt: 'DESC'},
    relations: ['witness',] // чтобы корректно отрабатывался plainForCurrentUser
  })

  res.json(response(result.filter(eachHalfUser=>eachHalfUser.witnessChat?.inviteLink).map(eachHalfUser => plainForCurrentUser(eachHalfUser,))))
}
