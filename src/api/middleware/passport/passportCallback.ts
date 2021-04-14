import {getManager} from "typeorm";
import {User} from "@entity/user/User.entity";
import container from "@/di/container";
import {basename} from "path";

/**
 * Вызывается по возвращению из ВК обратно на сайт
 *
 * @param accessToken
 * @param refreshToken
 * @param params
 * @param profile
 * @param done
 */
export default async function (accessToken, refreshToken, params, profile, done) {
  const logger = container.createLogger({name: basename(__filename),})

  let user = await getManager().findOne(User, {
    where: {
      mid: profile.id
    }
  })
  if (!user) {
    logger.info({profile}, `create new user`)
    const em = getManager()

    user = em.create(User, {
      firstName: profile.name.givenName || '',
      lastName: profile.name.familyName || '',
      patronymic: profile.nickname || '',
      photo: profile.photos[0].value || '',
      // passport: '',
      latitude: 0,
      longitude: 0,
      // birthYear: null, //bdate?.getFullYear() || 19,
      domain: profile.username,
      mid: profile.id,
    })
    await em.save(user)
    if (user.id == 1) {
      user.isWitness = true
      await em.save(user)
    }
  }
  done(null, {id: user.id, mid: profile.id,})
}
