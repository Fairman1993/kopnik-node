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
export default async function (halfSubordinate: User, halfForeman: User, ): Promise<Chat> {
  const vk = container.vk
  const logger = container.createLogger({name: basename(__filename),})
  let result: Chat

  if (!halfForeman) {
    throw new KError('Полустаршина не установлен', 1500)
  }

  const t= container.i18next.getFixedT(halfForeman.locale, 'informHalfForeman')
  const message = t('message', {
    who: halfForeman.rank==1?link(halfForeman, LinkMode.i): t('ten'),
    halfForeman: link(halfForeman, LinkMode.i),
    halfSubordinate: link(halfSubordinate, LinkMode.iof),
    baseClientUrl: container.constants.messaging.baseClientUrl
  })

  // ожидаю когда можно будет создать чат и пригласить в него обоих
  await friends([halfForeman], {wait: true}, async () => {
    if (halfForeman.tenChat?.id) {
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
