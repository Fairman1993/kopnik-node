import {Request, Response} from "express";
import container from "@/di/container";
import {basename} from "path";
import context from "@/context/context";
import {User} from "@entity/user/User.entity";
import {getManager, getRepository,} from "typeorm";
import StatusEnum from "@entity/user/StatusEnum";

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

  if (user.status===StatusEnum.New && !user.latitude && !user.longitude){
    const ipInfo= await container.ipApi(req.ip)
    logger.info({
      ipInfo,
    }, 'ip-api info')
    if (ipInfo.status=="success") { // для разработки (ip=::1) status=='fail'
      user.longitude = ipInfo.lon
      user.latitude = ipInfo.lat
      await em.save(user)
    }
  }

  context.set('user', user)
  // logger.debug(`${user.mid} -> ${user.id} : ${user.firstName} ${user.patronymic} ${user.lastName}`)
  next()
}
