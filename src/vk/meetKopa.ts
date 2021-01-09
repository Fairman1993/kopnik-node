import {User} from "@entity/user/User.entity";
import container from "@/di/container";
import {basename} from "path";
import meet from "@/vk/meet";
import Chat from "@entity/Chat.entity";
import friends from "@/vk/utils/friends";
import join from "@/vk/utils/join";
import link from "@/vk/utils/link";
import LinkMode from "@/vk/utils/LinkMode";

export default async function (subject: string, participants: User[],): Promise<Chat> {
  const vk = container.vk
  const logger = container.createLogger({name: basename(__filename),})
  let result: Chat

  await friends(participants, {wait: false}, async () => {

    // свожу в чате
    result = await meet(`Копа: ` + subject, participants, {
      data: {
        message: join([
          `$t Здравия братцы. Единства и благополучия всему славянскому роду!`,
          `Вас всех созвал на копу наш брат ${link(participants[0], LinkMode.iof)}`,
          `Повод для обсуждения: ${subject}`,
          `Выберите меж собой кашевого (модератора копы) только единогласным решением и передайте ему право вести эту копу.`,
          `Во всё время проведения копы ставьте интересы рода выше личного эга, а кто не устоит, того кашевой с копы пусть прогонит.`,
          `Описание порядка копы........`
        ])
      },
    })
  })

  return result
}
