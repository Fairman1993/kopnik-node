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

  // ожидаю когда можно будет создать чат и пригласить в него новоявленного старшину
  await friends([foreman], {wait: true}, async () => {

    // встречаюсь со старшиной
    result = await meet(`10-ка ${foreman.firstName}`,
      [foreman,],
      {
        chat: foreman.tenChat,
        data: {
          message: `
            $t ${link(foreman, LinkMode.i)}! 
            Настал новый этап в твоей жизни, теперь ты старшина!
            
            Быть старшиной значит, что другие копные мужи возложили на тебя ответственность представлять их семьи на всех копах, на которые ты будешь участвовать как старшина общины. 
            Относись к своим новым обязанностям ответственно и добросовестно! 
            Помни, что старшина это временная должность: тот кто тебя выбрал, волен тебя и снять.
            
            Я создал этот новый чат для общения твоей десятки. 
            Я сам буду приглашать в него тех, кто выберет тебя старшиной и буду исключать из него тех, кто передумает. 
            Так тебе и твоим друзьям будет удобно использовать его как место для общения самым близким и доверенным кругом друзей.
            
            А сейчас встречай первого друга.`
        }
      })
  })

  return result
}
