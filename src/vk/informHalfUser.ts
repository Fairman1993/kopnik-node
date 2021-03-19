import {User} from "@entity/user/User.entity";
import sendToGroupChat from "@/vk/utils/sendToGroupChat";
import StatusEnum from "@entity/user/StatusEnum";
import join from "@/vk/utils/join";
import removeChatUser from "@/vk/utils/removeChatUser";
import link from "@/vk/utils/link";
import LinkMode from "@/vk/utils/LinkMode";
import container from "@/di/container";

export default async function (halfUser: User, witness: User): Promise<void> {
  const t= container.i18next.getFixedT(halfUser.locale, 'informHalfUser')
  await sendToGroupChat(halfUser.witnessChat, {
    message: t(halfUser.status===StatusEnum.Confirmed?'messageConfirmed':'messageDeclined', {halfUser: link(halfUser, LinkMode.i)})
  })
  await removeChatUser(halfUser.witnessChat, halfUser)
  await removeChatUser(halfUser.witnessChat, witness)
}
