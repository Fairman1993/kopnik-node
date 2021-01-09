import {User} from "@entity/user/User.entity";
import LinkMode from "@/vk/utils/LinkMode";


/**
 * По умалчанию выводит имя
 * @param user
 * @param mode
 */
export default function (user: User, mode: LinkMode= LinkMode.if) {
  return `[id${user.mid}|${user[mode]}]`
}
