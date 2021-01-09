import {User} from "@entity/user/User.entity";
import sendToGroupChat from "@/vk/utils/sendToGroupChat";
import StatusEnum from "@entity/user/StatusEnum";
import join from "@/vk/utils/join";
import removeChatUser from "@/vk/utils/removeChatUser";

export default async function (halfUser: User, witness: User): Promise<void> {
  const messages = []
  messages.push(halfUser.status===StatusEnum.Confirmed?`$t Поздравляю! Заверитель подтвердил твою истинность. Теперь тебе доступны все возможности kopnik.org`: `$t Заверитель не смог подтвердить твою истинность. Без этого мы не можем принять тебя в нашу сеть.`)
  messages.push('На этом предназначение данного чата исчерпано. Всем разойтись.')

  await sendToGroupChat(halfUser.witnessChat, {message: join(messages)})
  await removeChatUser(halfUser.witnessChat, halfUser)
  await removeChatUser(halfUser.witnessChat, witness)
}
