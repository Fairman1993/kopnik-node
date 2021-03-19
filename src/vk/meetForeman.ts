import {User} from "@entity/user/User.entity";
import container from "@/di/container";
import {basename} from "path";
import meet from "@/vk/meet";
import Chat from "@entity/Chat.entity";
import friends from "@/vk/utils/friends";
import join from "@/vk/utils/join";
import link from "@/vk/utils/link";
import LinkMode from "@/vk/utils/LinkMode";

export default async function (foreman: User,): Promise<Chat> {
  const logger = container.createLogger({name: basename(__filename),})
  let result: Chat

  const t = container.i18next.getFixedT(foreman.locale, 'meetForeman')
  const title = t('title', {foreman})
  const message = t('message', {
    foreman: link(foreman, LinkMode.i),
  })

  // ожидаю когда можно будет создать чат и пригласить в него новоявленного старшину
  await friends([foreman], {wait: true}, async () => {

    // встречаюсь со старшиной
    result = await meet(title,
      [foreman,],
      {
        chat: foreman.tenChat,
        data: {
          message
        }
      })
  })

  return result
}
