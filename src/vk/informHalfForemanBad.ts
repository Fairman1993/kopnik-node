import {User} from "@entity/user/User.entity";
import sendToGroupChat from "@/vk/utils/sendToGroupChat";
import sendToDirect from "@/vk/utils/sendToDirect";
import link from "@/vk/utils/link";
import LinkMode from "@/vk/utils/LinkMode";
import container from "@/di/container";

/**
 * Сообщаю подавшему заявку о решении старшины (принять его или нет)
 */
export default async function (halfForeman: User, halfSubordinate: User): Promise<void> {
  const t= container.i18next.getFixedT(halfForeman.locale, 'informHalfForemanBad')
  const message = t('message', {
    who: halfForeman.rank==1?link(halfForeman, LinkMode.i): t('ten'),
    halfForeman: link(halfForeman, LinkMode.i),
    halfSubordinate: link(halfSubordinate, LinkMode.iof),
  })

  if (halfForeman.tenChat?.id) {
    await sendToGroupChat(halfForeman.tenChat, {
      message
    })
  } else {
    await sendToDirect(halfForeman, {
      message
    })
  }
}
