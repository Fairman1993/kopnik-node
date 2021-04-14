import {User} from "@entity/user/User.entity";
import container from "@/di/container";
import {basename} from "path";
import plain from "@entity/user/plain";
import getChatInviteLink from "@/vk/utils/getChatInviteLink";
import Chat from "@entity/Chat.entity";

// doc: https://vk.com/dev/messages.createChat
export default async function (title: string, users: User[]): Promise<Chat> {
  const vk = container.vk
  const logger = container.createLogger({name: basename(__filename),})

  logger.info({
    chat: {
      title,
      participants: users.map(eachUser => plain(eachUser)),
    }
  }, `Создаю чат [${title}] для ${users.map(eachUser => `[${eachUser.iof}]`).join(', ')}`)

  const chatId = await vk.api.messages.createChat({
    user_ids: [...users.map(eachUser => eachUser.mid)],
    title
  })

  const chatInviteLink = await getChatInviteLink(chatId)

  const chat = new Chat(chatId, chatInviteLink)

  logger.info({
    chat: {
      ...chat,
      title,
      participants: users.map(eachUser => plain(eachUser)),
    }
  }, `Создал чат [${title}] для ${users.map(eachUser => `[${eachUser.iof}]`).join(', ')}`)

  return chat
}
