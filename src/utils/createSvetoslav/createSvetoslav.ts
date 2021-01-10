import httpContext from 'express-cls-hooked'

import context from "@/context/context";
import newUser from "@api/middleware/newUser_need_remove";
import container from "@/di/container";
import getContext from "@/context/getContext";
import StatusEnum from "@entity/user/StatusEnum";
import {getManager} from "typeorm";

export default async function () {
  httpContext.middleware({}, {}, async () => {
    context.set('token', {mid: process.env.VK_SVETOSLAV_ID})
    await newUser(null, null, () => {})

    const {user} = getContext()
    user.status= StatusEnum.Confirmed
    await getManager().save(user)

    await container.db.close()
  })
}
