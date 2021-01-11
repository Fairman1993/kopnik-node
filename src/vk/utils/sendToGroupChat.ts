import {MessagesSendParams} from "vk-io/lib/api/schemas/params";
import _send from "@/vk/utils/send";
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
  await _send(chat.id+ 2000000000, data)
}
