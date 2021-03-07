import {User} from "@entity/user/User.entity";
import sendToGroupChat from "@/vk/utils/sendToGroupChat";
import StatusEnum from "@entity/user/StatusEnum";
import join from "@/vk/utils/join";
import removeChatUser from "@/vk/utils/removeChatUser";
import link from "@/vk/utils/link";
import LinkMode from "@/vk/utils/LinkMode";

export default async function (halfUser: User, witness: User): Promise<void> {
  const message= halfUser.status===StatusEnum.Confirmed
    ?`
    $t ${link(halfUser, LinkMode.i)}, поздравляю!
    Заверитель подтвердил твою истинность. 
    Теперь тебе доступны все возможности kopnik.org`
    : `
    $t ${link(halfUser, LinkMode.i)}, заверитель не смог подтвердить твою истинность. 
    Без этого мы не можем принять тебя в нашу сеть.`

  await sendToGroupChat(halfUser.witnessChat, {
    message: join([
      message,
      `На этом данный чат исчерпал свое предназначение. Расходимся все отсюда.
      Во благо!`
    ])
  })
  await removeChatUser(halfUser.witnessChat, halfUser)
  await removeChatUser(halfUser.witnessChat, witness)
}
