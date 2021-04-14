import {MessagesSendParams} from "vk-io/lib/api/schemas/params";
import send from "@/vk/utils/send";
import Chat from "@entity/Chat.entity";
import {User} from "@entity/user/User.entity";

/**
 * Отправляет сообщение в групповой чат
 *
 */
// doc: https://vk.com/dev/messages.createChat
// https://vk.com/dev/messages.send
export default async function (user: User, data: MessagesSendParams): Promise<void> {
  await send(user.mid, data)
}
