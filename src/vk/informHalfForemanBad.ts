import {User} from "@entity/user/User.entity";
import sendToGroupChat from "@/vk/utils/sendToGroupChat";
import sendToDirect from "@/vk/utils/sendToDirect";
import link from "@/vk/utils/link";
import LinkMode from "@/vk/utils/LinkMode";

/**
 * Сообщаю подавшему заявку о решении старшины (принять его или нет)
 */
export default async function (halfForeman: User, halfSubordinate: User): Promise<void> {
  const message = `
  $t ${halfForeman.tenChat.id && halfForeman.rank > 1 ? `$t Здарова, десятка!` : `Здравия, ${link(halfForeman, LinkMode.i)}!`}
  ${link(halfForeman, LinkMode.i)}, ${link(halfSubordinate)} отозвал свое предложение выбрать тебя старшиной. Так тому и быть!`

  if (halfForeman.tenChat.id) {
    await sendToGroupChat(halfForeman.tenChat, {
      message
    })
  } else {
    await sendToDirect(halfForeman, {
      message
    })
  }
}
