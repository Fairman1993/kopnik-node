import {User} from "@entity/user/User.entity";
import container from "@/di/container";
import removeChatUser from "@/vk/utils/removeChatUser";
import sendToGroupChat from "@/vk/utils/sendToGroupChat";
import KError from "@/error/KError";
import link from "@/vk/utils/link";
import LinkMode from "@/vk/utils/LinkMode";

/**
 * Исключаю подчиненного из чата десятки
 */
export default async function (subordinate: User, kicker: User): Promise<void> {
  if (!subordinate.foreman) {
    throw new KError('Foreman undefined', 1500)
  }

  const t = container.i18next.getFixedT(subordinate.foreman.locale, 'kickSubordinate')
  const message = t(kicker === subordinate ? 'messageSelfKick' : 'messageForemanKick', {
    who: subordinate.foreman.rank == 1 ? link(subordinate.foreman, LinkMode.i) : t('ten'),
    foreman: link(subordinate.foreman, LinkMode.i),
    subordinate: link(subordinate, LinkMode.i),
  })

  await sendToGroupChat(subordinate.foreman.tenChat, {
    message
  })

  await removeChatUser(subordinate.foreman.tenChat, subordinate)
}
