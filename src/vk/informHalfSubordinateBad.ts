import {User} from "@entity/user/User.entity";
import KError from "@/error/KError";
import sendToDirect from "@/vk/utils/sendToDirect";
import join from "@/vk/utils/join";
import link from "@/vk/utils/link";
import LinkMode from "@/vk/utils/LinkMode";

/**
 * Сообщаю подавшему заявку о решении старшины (принять его или нет)
 */
export default async function (halfSubordinate: User, halfForeman: User): Promise<void> {
  await sendToDirect(halfSubordinate, {
    message:`
    $t Здравия, ${link(halfSubordinate, LinkMode.i)}! 
    ${link(halfForeman)} отклонил твоё предложение быть старшиной. 
        
    Не отчаивайся, это не всегда плохо.
    Выбери другого старшину, который тебе близок по духу. 
    Исполни этот наказ обязательно как свой долг.
    
    Во благо!`
  })
}
