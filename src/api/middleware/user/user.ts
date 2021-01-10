import {Request, Response} from "express";
import container from "@/di/container";
import {basename} from "path";
import context from "@/context/context";
import {User} from "@entity/user/User.entity";
import {getManager,} from "typeorm";

/**
 * Аутентифицирует пользователя на основе его кукисов
 * В тестовом режиме дополнительно проверяет заголовок t-authorization
 */
export default async function (req: Request, res: Response, next: Function) {
  const logger = container.createLogger({name: basename(__filename),})
  const em = context.em || getManager()

  const mid= (req as any).session?.passport?.user?.mid || (process.env.NODE_ENV==='test'?req.header('T-Authorization'):null)
  if (!mid) {
    next()
    return
  }

  let user = await em.findOneOrFail(User, {
    where: {
      mid: mid
    },
    relations: ['foreman', 'subordinates', 'foremanRequest', 'witness']
  })

  context.set('user', user)
  // logger.debug(`${user.mid} -> ${user.id} : ${user.firstName} ${user.patronymic} ${user.lastName}`)
  next()
}
