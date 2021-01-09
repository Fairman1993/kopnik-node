import {User} from "@entity/user/User.entity";
import container from "@/di/container";
import FriendStatusEnum from "@/di/vk-io/FriendStatusEnum";
import {basename} from "path";
import meet from "@/vk/meet";
import Chat from "@entity/Chat.entity";
import KError from "@/error/KError";
import friends from "@/vk/utils/friends";
import sendToDirect from "@/vk/utils/sendToDirect";
import join from "@/vk/utils/join";

/**
 * Копник делает предложение быть старшиной
 * @param halfSubordinate
 */
export default async function (halfSubordinate: User, halfForeman: User): Promise<Chat> {
  const vk = container.vk
  const logger = container.createLogger({name: basename(__filename),})
  let result: Chat

  if (!halfForeman) {
    throw new KError('Полустаршина не установлен', 1500)
  }

  // ожидаю когда можно будет создать чат и пригласить в него обоих
  await friends([halfSubordinate, halfForeman], {wait: true}, async () => {

    await sendToDirect(halfForeman, {
      message: join([
        `$t Доброго здравия ${halfForeman.firstName}. Единства и благополучия всему славянскому роду!`,
        `${halfSubordinate.firstName} предлагает тебе стать его старшиной.`,
        `Посмотреть подробности и принять решение можно в разделе "Моя десятка"`,
        `${container.constants.messaging.baseClientUrl}/ten`,
      ])
    })
  })

  return result
}
