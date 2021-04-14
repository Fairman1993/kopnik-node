import {User} from "@entity/user/User.entity";
import container from "@/di/container";
import {basename} from "path";
import plain from "@entity/user/plain";
import Chat from "@entity/Chat.entity";
import konaz from "@entity/user/konaz";

// doc: https://vk.com/dev/messages.addChatUser
export default async function (chat: Chat, user: User, options: { visibleMessagesCount?: number } = {visibleMessagesCount: 0}): Promise<void> {
  const vk = container.vk
  const logger = container.createLogger({name: basename(__filename),})

  // сам себя добавить не может  APIError: Code №15 - Access denied: can't add this user
  if (user.mid === konaz().mid) {
    return
  }

  try {
    logger.info({
      chat,
      added: plain(user),
    }, `Приглашаю [${user.iof}] в чат [${chat.id}] [${chat.inviteLink}]`)

    await vk.api.messages.addChatUser({
      chat_id: chat.id,
      user_id: user.mid,
      visible_messages_count: options.visibleMessagesCount || 0,
    })
  }
    // возможно пользователь уже в чате
  catch (err) {
    if (!err.message.match(/already in/)) {
      throw err
    }
  }
}
