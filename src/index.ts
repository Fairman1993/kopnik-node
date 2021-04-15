import https from 'https'
import fs from 'fs'

import app from './app';
import container from "@/di/container";
import {basename} from "path";
import '@/utils/checkEnv'
import {types} from 'pg'
import meetHalfUserReadyToWitnessChat from "@/job/meetHalfUserReadyToWitnessChat";
import {version} from '../package.json'

// doc: https://github.com/typeorm/typeorm/issues/2400#issuecomment-612193003
types.setTypeParser(20, Number);

const logger = container.createLogger({name: basename(__filename)});

logger.info(`v${version} on ${process.env.NODE_ENV}`);

(async () => {


  await container.provideDatabase()
  await container.provideI18next()

  let server
  if (process.env.NODE_SCHEMA === 'https') {
    server= https.createServer({
      key: fs.readFileSync('server.key'),
      cert: fs.readFileSync('server.cert')
    }, app)
  } else {
    server= app
  }

  server.listen(process.env.NODE_PORT)
  logger.info(`Open ${process.env.NODE_SCHEMA}://localhost:${process.env.NODE_PORT}/api/test/ping?qwerty to see results`)

  // ожидающие когда можно будет им создать чат заверения
  setInterval(async () => {
    try {
      await meetHalfUserReadyToWitnessChat()
    } catch (err) {
      logger.error(err, 'Ошибка встречи ожидаемых пользователей со старшинами')
    }
  }, container.constants.messaging.checkSvetoslavFriendshipInterval)
})()

