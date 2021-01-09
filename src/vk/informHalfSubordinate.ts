import {User} from "@entity/user/User.entity";
import sendToGroupChat from "@/vk/utils/sendToGroupChat";
import KError from "@/error/KError";
import removeChatUser from "@/vk/utils/removeChatUser";
import sendToDirect from "@/vk/utils/sendToDirect";
import join from "@/vk/utils/join";

/**
 * Сообщаю подавшему заявку о решении старшины (принять его или нет)
 */
export default async function (halfSubordinate: User, halfForeman: User, status: boolean): Promise<void> {
  if (status && !halfSubordinate.foreman?.mid) {
    throw new KError('Старшина не задан', 1500)
  }

  await sendToDirect(halfSubordinate, {
    message:
      join(status ? [
          `$t Здравия, ${halfSubordinate.firstName}. Единства и благополучия всему славянскому роду!`,
          `${halfForeman.firstName} принял твоё предложение быть старшиной. Во благо!`,
          `Сейчас я добавлю тебя в чат десятки, где он старшина.`
        ]
        : [
          `$t ${halfSubordinate.firstName}, ${halfForeman.firstName} отклонил твоё предложение быть старшиной. Не отчаивайся, это не всегда плохо. Выбери другого старшину, который тебе близок по духу. Исполни это обязательно как свой долг. Во благо!`
        ])
  })
}
