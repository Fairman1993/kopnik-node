import container from "@/di/container";
import {basename} from "path";
import {MessagesSendParams} from "vk-io/lib/api/schemas/params";
import _ from 'lodash'
import plain from "@entity/user/plain";
import trim from "@/vk/utils/trim";

/**
 * Отправляет сообщение в чат
 *
 */
// doc: https://vk.com/dev/messages.createChat
// https://vk.com/dev/messages.send
export default async function (peer_id: number, data: MessagesSendParams): Promise<void> {
  const vk = container.vk
  const logger = container.createLogger({name: basename(__filename),})

  const trimmedMessage= trim(data.message)
  logger.info({
    chatId: peer_id
  }, `${peer_id}: ${trimmedMessage}`)

  await vk.api.messages.send({
    peer_id,
    random_id: _.random(1000000),
    ...data,
    message:trimmedMessage
  })
}
