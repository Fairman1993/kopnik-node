import {User} from "@entity/user/User.entity";
import container from "@/di/container";
import {basename} from "path";
import meet from "@/vk/meet";
import Chat from "@entity/Chat.entity";
import friends from "@/vk/utils/friends";
import link from "@/vk/utils/link";
import LinkMode from "@/vk/utils/LinkMode";

export default async function (subject: string, participants: User[],): Promise<Chat> {
  const vk = container.vk
  const logger = container.createLogger({name: basename(__filename),})
  let result: Chat

  const t = container.i18next.getFixedT(participants[0].locale, 'meetKopa')
  const title = t('title', {subject})
  const message = t('message', {
    inviter: link(participants[0], LinkMode.iof),
    subject,
  })

  await friends(participants, {wait: false}, async () => {

    // свожу в чате
    result = await meet(title, participants, {
      data: {
        message
      },
    })
  })

  return result
}
