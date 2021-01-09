import {User} from "@entity/user/User.entity";
import sendToGroupChat from "@/vk/utils/sendToGroupChat";
import KError from "@/error/KError";
import removeChatUser from "@/vk/utils/removeChatUser";
import sendToDirect from "@/vk/utils/sendToDirect";

/**
 * Сообщаю подавшему заявку о решении старшины (принять его или нет)
 */
export default async function (halfSubordinate: User, halfForeman: User, status: boolean): Promise<void> {
  if (status && !halfSubordinate.foreman?.mid) {
    throw new KError('Старшина не задан', 1500)
  }

  await sendToDirect(halfSubordinate, {
    message: status ? `$t ${halfSubordinate.firstName}, ${halfSubordinate.foremanRequest.firstName} согласился быть твоим старшиной. Во благо! Сейчас я добавлю тебя в чат десятки, где он старшина.` : `$t ${halfSubordinate.firstName}, твоё предложение отклонено`
  })
}
