import {Request, Response} from "express";

import container from "@/di/container";
import {basename} from "path";
import context from "@/context/context";
import response from "@api/response";
import merge from "@entity/user/merge";
import StatusEnum from "@entity/user/StatusEnum";
import meetHalfUserWitness from "@/vk/meetHalfUserWitness";
import getContext from "@/context/getContext";
import transaction from "@/transaction/transaction";
import findWitness from "@/findWitness/findWitness";
import findNeighbors from "@/findWitness/findNeighbors";


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

    const prevStatus= user.status

    merge(user, {
      firstName: body.firstName,
      lastName: body.lastName,
      patronymic: body.patronymic,
      locale: body.locale,
      birthYear: body.birthYear,
      passport: body.passport,
      latitude: body.location.lat,
      longitude: body.location.lng,
      role: body.role,
      status: StatusEnum.Pending,
    })

    /**
     * если чат уже создан, значит его использую для сведения с заверителем
     * иначе чат будет создан и сведение будет сделано в отдельной службе
     * @see {@link meetHalfUserReadyToWitnessChat.ts}
     */

    if (user.witnessChat?.id) {
      user.witness = await findWitness(user)
      const neighbors= await findNeighbors(user,3)
      await meetHalfUserWitness(user, user.witness, neighbors, prevStatus, body.changesetTranslated)
    }

    // сохраняю переданные данные (пока без чата заверения, который обновится асинхронно позже)
    await em.save(user)


    res.json(response({
      witness_id: user.witness?.id,
    }))
  })
}
