import {getRepository} from "typeorm";
import {User} from "@entity/user/User.entity";

/**
 * Возвращает пользователя с идентификтором как в .env файлу
 * Не сохраняет его в БД
 * Например для юнит-тестов или для тестов ВК
 *
 * @param fields
 */
export default function (fields={}) {
  const user = new User({
    mid: parseInt(process.env.VK_TEST_USER),
    firstName: 'Борода',
    patronymic: 'Гореевич',
    lastName: 'Удалой',
    locale: 'ru',
    rank: 1,
    ...fields
  })
  return user
}
