import {User} from "@entity/user/User.entity";
import KError from "@/error/KError";
import sendToDirect from "@/vk/utils/sendToDirect";
import join from "@/vk/utils/join";
import link from "@/vk/utils/link";
import LinkMode from "@/vk/utils/LinkMode";
import container from "@/di/container";

/**
 * Сообщаю подавшему заявку о решении старшины (принять его или нет)
 */
export default async function (halfSubordinate: User, halfForeman: User): Promise<void> {
  const t= container.i18next.getFixedT(halfForeman.locale, 'informHalfSubordinateBad')
  const message = t('message', {
    halfSubordinate: link(halfSubordinate, LinkMode.i),
    halfForeman: link(halfForeman, LinkMode.iof),
  })

  await sendToDirect(halfSubordinate, {
    message
  })
}
