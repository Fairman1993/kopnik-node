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

  // ожидаю когда можно будет пригласить заверяемого
  await friends([subordinate], {wait: true}, async () => {

    // свожу со старшиной
    await addChatUser(foreman.tenChat, subordinate)

    // объясняю что к чему
    await sendToGroupChat(foreman.tenChat, {
      message: join([
        `$t Единства и благополучия сей доброй десятке и всему славянскому роду!`,
        `${link(foreman,)} принял предложение быть старшиной.`,
        `$t Поприветствуйте нового друга! Его зовут ${link(subordinate, LinkMode.iof)}`,
        `${link(subordinate, LinkMode.i)}, это чат твоей новой десятки. Старшина десятки ${link(subordinate,)}`
      ])
    })
  })
}
