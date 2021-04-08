import container from "@/di/container";
import {basename} from "path";
import {MessagesSendParams} from "vk-io/lib/api/schemas/params";
import _ from 'lodash'
import plain from "@entity/user/plain";
import trim from "@/vk/utils/trim";
import split from "@/vk/utils/split";

/**
 * Отправляет сообщение в чат
 *
 */
// doc: https://vk.com/dev/messages.createChat
// https://vk.com/dev/messages.send
export default async function (peer_id: number, data: MessagesSendParams): Promise<void> {
  const vk = container.vk
  const logger = container.createLogger({name: basename(__filename),})

  const messages = split(data.message)
  for (let eachMessage of messages) {
    logger.info({
      chatId: peer_id
    }, `${peer_id}: ${eachMessage}`)

    await vk.api.messages.send({
      peer_id,
      random_id: _.random(1000000),
      ...data,
      message: eachMessage
    })
  }
}
