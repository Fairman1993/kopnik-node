import {User} from "@entity/user/User.entity";
import container from "@/di/container";
import {basename} from "path";
import {MessagesSendParams} from "vk-io/lib/api/schemas/params";
import createChat from "@/vk/utils/createChat";
import Chat from "@entity/Chat.entity";
import sendToGroupChat from "@/vk/utils/sendToGroupChat";
import konaz from "@entity/user/konaz";
import addChatUser from "@/vk/utils/addChatUser";

/**
 * Приглашает пользователей и Святослава в чат и пишет вводные сообщения
 * Если чата нет, создает его и возвращает
 * Если чат есть, повторно приглашает в него всех, потому что могли выйти
 *
 * @return новый чат
 */
export default async function (title: string, users: User[], options: { data?: MessagesSendParams, chat?: Chat } = {}): Promise<Chat> {
  const vk = container.vk
  const logger = container.createLogger({name: basename(__filename),})

  let result: Chat
  // если чат создан, добавляю в него пользователей
  if (options.chat?.id) {
    for (let eachUser of users) {
      await addChatUser(options.chat, eachUser)
    }
  }
  // иначе создаю новый чат пользователей
  else {
    result = await createChat(title,
      [...users, konaz()],
    )
  }

  // вводные сообщения
  if (options.data) {
    await new Promise(res=>setTimeout(res,process.env.NODE_ENV=='test'?0:1500))
    await sendToGroupChat(result || options.chat, options.data)
  }

  return result
}
