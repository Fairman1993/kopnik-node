import {Request, Response} from "express";

import container from "@/di/container";
import {basename} from "path";
import context from "@/context/context";
import {getRepository} from "typeorm";
import {User} from "@entity/user/User.entity";
import response from "@api/response";


/**
 * opi/webhook/create -> opi/webhook/project_name/package_name/create
 */
export default async function (req: Request, res: Response) {
  const logger = container.createLogger({name: basename(__filename),}),
    body = req.body

  const user = context.user
  user.locale = body.locale

  await getRepository(User).save(user)
  res.json(response(true))
}
