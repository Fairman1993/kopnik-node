import {User} from "@entity/user/User.entity";
import sendToGroupChat from "@/vk/utils/sendToGroupChat";
import sendToDirect from "@/vk/utils/sendToDirect";

/**
 * Сообщаю подавшему заявку о решении старшины (принять его или нет)
 */
export default async function (halfForeman: User, halfSubordinate: User): Promise<void> {
  const message= `$t ${halfSubordinate.firstName} отменил свое предложение. Можем расходиться.`
  if (halfForeman.tenChat.id) {
    await sendToGroupChat(halfForeman.tenChat, {
      message
    })
  }
  else{
    await sendToDirect(halfForeman, {
      message
    })
  }
}
