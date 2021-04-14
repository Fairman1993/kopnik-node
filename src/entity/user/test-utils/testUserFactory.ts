import {User} from "@entity/user/User.entity";
import StatusEnum from "@entity/user/StatusEnum";
import RoleEnum from "@entity/user/RoleEnum";
import LocaleEnum from "@entity/LocaleEnum";
import Chat from "@entity/Chat.entity";

export default function (prefix: string = new Date().toString(), fields: Partial<User> = {}) {
  const now = new Date()

  prefix = prefix ?? now.toLocaleTimeString()
  const uniq = now.getTime()

  const result = new User({
    lastName: prefix,
    firstName: prefix,
    patronymic: prefix,
    // birthYear: 1900,
    // passport: '0123',
    latitude: 0,
    longitude: 0,
    photo: 'https://photo/' + prefix,
    status: StatusEnum.Confirmed,
    locale: LocaleEnum.ru,
    isWitness: false,
    role: RoleEnum.Kopnik,
    rank: 1,
    mid: uniq,
    domain: 'https://' + prefix,
    ...fields
  })

  if (result.witness || result.status!==StatusEnum.New) {
    result.witnessChat = new Chat(new Date().getTime(), 'https://witnessChat')
  }

  return result
}
