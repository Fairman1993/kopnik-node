import {MessagesSendParams} from "vk-io/lib/api/schemas/params";
import send from "@/vk/utils/send";
import Chat from "@entity/Chat.entity";
import * as assert from "assert";

/**
 * Отправляет сообщение в групповой чат
 *
 */
// doc: https://vk.com/dev/messages.createChat
// https://vk.com/dev/messages.send
export default async function (chat: Chat, data: MessagesSendParams): Promise<void> {
  assert.notEqual(chat.id, null)

  // иногда чаты пользователей загружаются как строки (скорее всего когда более одного пользователя за раз)
  await send(Number.parseInt(chat.id as any)+ 2000000000, data)
}
