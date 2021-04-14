import {User} from "@entity/user/User.entity";
import {DeepPartial} from "typeorm";
import Chat from "@entity/Chat.entity";
import StatusEnum from "@entity/user/StatusEnum";

export default function (user: User, data: Partial<User>) {
  user.id = data.id ?? user.id
  user.lastName = data.lastName ?? user.lastName
  user.firstName = data.firstName ?? user.firstName
  user.patronymic = data.patronymic ?? user.patronymic
  // user.birthYear = data.birthYear ?? user.birthYear
  // user.passport = data.passport ?? user.passport
  user.latitude = data.latitude ?? user.latitude
  user.longitude = data.longitude ?? user.longitude
  user.photo = data.photo ?? user.photo
  user.status = data.status ?? user.status
  user.locale = data.locale ?? user.locale
  user.isWitness = data.isWitness ?? user.isWitness
  user.witnessRadius= data.witnessRadius
  user.role = data.role ?? user.role
  user.rank = data.rank ?? user.rank
  user.mid = data.mid ?? user.mid
  user.domain = data.domain ?? user.domain

  // relations
  user.witness = data.witness ?? user.witness
  user.foremanRequest = data.foremanRequest ?? user.foremanRequest
  user.foreman = data.foreman ?? user.foreman

// chats
    user.witnessChat = data.witnessChat ?? user.witnessChat
    user.tenChat = data.tenChat ?? user.tenChat
}
