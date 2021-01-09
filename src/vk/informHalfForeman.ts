import {User} from "@entity/user/User.entity";
import container from "@/di/container";
import {basename} from "path";
import Chat from "@entity/Chat.entity";
import KError from "@/error/KError";
import friends from "@/vk/utils/friends";
import sendToDirect from "@/vk/utils/sendToDirect";
import join from "@/vk/utils/join";
import link from "@/vk/utils/link";
import LinkMode from "@/vk/utils/LinkMode";
import sendToGroupChat from "@/vk/utils/sendToGroupChat";

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

  const message = join([
    halfForeman.tenChat.id && halfForeman.rank > 1 ? `$t Единства и благополучия вашей доброй десятке и всему славянскому роду!` : `Здравия, ${link(halfForeman, LinkMode.i)}!`,
    `${link(halfForeman, LinkMode.i)}, ${link(halfSubordinate, LinkMode.iof)} предлагает тебе стать его старшиной.`,
    `Это значит, что ты возьмешь на себя ответственность представлять его семью на всех копах, на  которые тебя пригласят и на которых ты будешь участвовать как старшина общины.`,
    `Посмотреть подробности и принять решение можно в разделе "Моя десятка" здесь ${container.constants.messaging.baseClientUrl}/ten`,
  ])

  // ожидаю когда можно будет создать чат и пригласить в него обоих
  await friends([halfForeman], {wait: true}, async () => {
    if (halfForeman.tenChat.id) {
      await sendToGroupChat(halfForeman.tenChat, {
        message
      })
    } else {
      await sendToDirect(halfForeman, {
        message
      })
    }
  })

  return result
}
