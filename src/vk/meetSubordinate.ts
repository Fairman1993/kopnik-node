import {User} from "@entity/user/User.entity";
import container from "@/di/container";
import {basename} from "path";
import friends from "@/vk/utils/friends";
import addChatUser from "@/vk/utils/addChatUser";
import sendToGroupChat from "@/vk/utils/sendToGroupChat";
import join from "@/vk/utils/join";
import link from "@/vk/utils/link";
import LinkMode from "@/vk/utils/LinkMode";

/**
 * Встреча с новоявленным младшим десятки
 */
export default async function (subordinate: User, foreman: User): Promise<void> {
  const logger = container.createLogger({name: basename(__filename),})

  const t = container.i18next.getFixedT(foreman.locale, 'meetSubordinate')
  const messageTen = t('messageTen', {
    foreman: link(foreman, LinkMode.i),
    subordinate: link(subordinate, LinkMode.iof),
  })
  const t2 = container.i18next.getFixedT(subordinate.locale, 'meetSubordinate')
  const messageSubordinate = t2('messageSubordinate', {
    subordinate: link(subordinate, LinkMode.i),
    foreman: link(foreman, LinkMode.iof),
  })

  // ожидаю когда можно будет пригласить заверяемого
  await friends([subordinate], {wait: true}, async () => {

    // свожу со старшиной
    await addChatUser(foreman.tenChat, subordinate)

    // объясняю что к чему
    await sendToGroupChat(foreman.tenChat, {
      message: messageTen
    })

    await sendToGroupChat(foreman.tenChat, {
      message: messageSubordinate
    })
  })
}
