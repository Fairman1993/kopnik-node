import {Request, Response} from "express";

import container from "@/di/container";
import {basename} from "path";
import context from "@/context/context";
import {Between, getRepository, LessThan, LessThanOrEqual, MoreThan} from "typeorm";
import {User} from "@entity/user/User.entity";
import plain from "@entity/user/plain";
import response from "@api/response";
import plainForCurrentUser from "@entity/user/plainForCurrentUser";
import StatusEnum from "@entity/user/StatusEnum";


/**
 * opi/webhook/create -> opi/webhook/project_name/package_name/create
 */
export default async function (req: Request, res: Response) {
  const logger = container.createLogger({name: basename(__filename),})
  const {x1, y1, x2, y2, } = req.query

  const users = await getRepository(User).find({
    where: {
      isWitness: true,
      latitude: Between(y1, y2),
      longitude: Between(x1, x2),
    },
    relations: ['foreman', 'foremanRequest'] // как в оригинальном getTopInsideSquare чтобы не произошло перезатирания его данных этими данными
  })

  res.json(response(users.map(eachUser => plainForCurrentUser(eachUser,))))
}
