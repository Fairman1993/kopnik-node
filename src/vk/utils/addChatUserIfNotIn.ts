import {User} from "@entity/user/User.entity";
import container from "@/di/container";
import {basename} from "path";
import plain from "@entity/user/plain";
import Chat from "@entity/Chat.entity";
import konaz from "@entity/user/konaz";
import addChatUser from "@/vk/utils/addChatUser";

/**
 * @deprecated
 * Добавляет пользователя в чат, если он еще не там
 * doc: https://vk.com/dev/messages.getChatPreview
 */
export default async function (chat: Chat, user: User, options: { visibleMessagesCount?: number } = {visibleMessagesCount: 0}): Promise<void> {
  const vk = container.vk
  const logger = container.createLogger({name: basename(__filename),})
  const {preview}= await vk.api.messages.getChatPreview({
    link: chat.inviteLink
  })

  if (!preview.members.includes(user.mid)){
    await addChatUser(chat, user, options)
  }
}
