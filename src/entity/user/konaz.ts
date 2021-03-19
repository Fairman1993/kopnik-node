import {getRepository} from "typeorm";
import {User} from "@entity/user/User.entity";
import Chat from "@entity/Chat.entity";

export default function (data={}) {
  const user = new User({
    mid: parseInt(process.env.VK_SVETOSLAV_ID),
    firstName: 'Светослав',
    patronymic: 'Игоревич',
    lastName: 'Рюрик',
    tenChat: new Chat(1, 'Десятка Святослав'),
    rank:1,
    ...data
  })
  return user
}
