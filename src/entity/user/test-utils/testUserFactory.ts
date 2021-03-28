import {User} from "@entity/user/User.entity";
import StatusEnum from "@entity/user/StatusEnum";
import RoleEnum from "@entity/user/RoleEnum";
import LocaleEnum from "@entity/LocaleEnum";
import merge from "@entity/user/merge";
import Chat from "@entity/Chat.entity";

export default function (prefix: string = new Date().toString(), fields: Partial<User> & { [key: string]: any } = {}) {
  const now = new Date()

  prefix = prefix ?? now.toLocaleTimeString()
  const uniq = now.getTime()

  const result = new User()

  if (fields.witness_id || fields.status!==StatusEnum.New) {
    result.witnessChat = new Chat(new Date().getTime(), 'https://witnessChat')
  }

  merge(result, {
    lastName: prefix,
    firstName: prefix,
    patronymic: prefix,
    birthYear: 1900,
    passport: '0123',
    location: {
      lat: 0,
      lng: 0,
    },
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
  return result
}
