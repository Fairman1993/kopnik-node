import {Request, Response} from "express";

import container from "@/di/container";
import {basename} from "path";
import context from "@/context/context";
import {getManager, getRepository} from "typeorm";
import {User} from "@entity/user/User.entity";
import response from "@api/response";
import merge from "@entity/user/merge";
import StatusEnum from "@entity/user/StatusEnum";
import meetHalfUserWitness from "@/vk/meetHalfUserWitness";
import getContext from "@/context/getContext";
import transaction from "@/transaction/transaction";


/**
 * Обновляет профиль текущего пользователя.
 * Не умеет обновлять что-то кроме профиля (например mid, чаты и тп)
 */
export default async function (req: Request, res: Response) {
  await transaction(async () => {
    const logger = container.createLogger({name: basename(__filename),}),
      body = req.body
    const user = context.user
    const {em} = getContext()

    merge(user, {
      firstName: body.firstName,
      lastName: body.lastName,
      patronymic: body.patronymic,
      locale: body.locale,
      birthYear: body.birthYear,
      passport: body.passport,
      location: body.location,
      role: body.role,
      status: StatusEnum.Pending,
    })
    user.witness = await em.findOneOrFail(User, 1)
    // сохраняю переданные данные (пока без чата заверения, который обновится асинхронно ниже)
    await em.save(user)

    // если чат уже создан, значит его использую для сведения с заверителем
    // иначе чат будет создан и сведение будет сделано в отдельной службе src/job/meetHalfUserReadyToWitnessChat.ts
    if (user.witnessChat?.id) {
      await meetHalfUserWitness(user, user.witness)
    }

    res.json(response({
      witness_id: user.witness.id,
    }))
  })
}
