import {User} from "@entity/user/User.entity";
import sendToGroupChat from "@/vk/utils/sendToGroupChat";
import StatusEnum from "@entity/user/StatusEnum";
import join from "@/vk/utils/join";
import removeChatUser from "@/vk/utils/removeChatUser";
import link from "@/vk/utils/link";
import LinkMode from "@/vk/utils/LinkMode";
import container from "@/di/container";
import addChatUser from "@/vk/utils/addChatUser";
import merge from "@entity/user/merge";
import konaz from "@entity/user/konaz";

export default async function informHalfUser(halfUser: User, witness: User): Promise<void> {
  const vk = container.vk

  const t= container.i18next.getFixedT(halfUser.locale, 'informHalfUser')
  await sendToGroupChat(halfUser.witnessChat, {
    message: t(halfUser.status===StatusEnum.Confirmed?'messageConfirmed':'messageDeclined', {halfUser: link(halfUser, LinkMode.i)})
  })
  await removeChatUser(halfUser.witnessChat, halfUser)
  await removeChatUser(halfUser.witnessChat, witness)

  // исключаю соседей

  const {preview}= await vk.api.messages.getChatPreview({
    link: halfUser.witnessChat.inviteLink
  })

  for(let eachMemberMid of preview.members){
    if (eachMemberMid===konaz().mid){
      continue
    }
    await new Promise(resolve => setTimeout(resolve, 1000))
    const eachMember= new User()
    merge(eachMember, {
      mid: eachMemberMid,
    })
    await removeChatUser(halfUser.witnessChat, eachMember)
  }
}
