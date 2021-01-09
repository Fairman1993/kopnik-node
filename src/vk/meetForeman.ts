import {User} from "@entity/user/User.entity";
import container from "@/di/container";
import {basename} from "path";
import meet from "@/vk/meet";
import Chat from "@entity/Chat.entity";
import friends from "@/vk/utils/friends";
import join from "@/vk/utils/join";

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
          message: join([
            `$t ${foreman.firstName}! Настал новый этап в твоей жизни, теперь ты - старшина!`,
            `Быть старшиной значит, что другие копные мужи возлагают на тебя представление интересов семей. Помни, что это временная должность: тот кто тебя выбрал, волен тебя и снять. Относись к своим новым обязанностям ответственно и добросовестно!`,
            `Я создал этот новый чат для общения твоей десятки. Я сам буду приглашать в него тех, кто выберет тебя старшиной и буду исключать из него тех, кто передумает. Так тебе и твоим друзьям будет удобно использовать его как место для общения самым близким и доверенным кругом друзей.`,
            `$t А сейчас встречай первого друга`,
          ]),
        }
      })
  })

  return result
}
