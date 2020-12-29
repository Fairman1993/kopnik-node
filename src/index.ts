import https from 'https'
import fs from 'fs'

import app from './app';
import container from "@/di/container";
import {basename} from "path";
import '@/utils/checkEnv'
import {types} from 'pg'


// doc: https://github.com/typeorm/typeorm/issues/2400#issuecomment-612193003
types.setTypeParser(20, Number);

const logger = container.createLogger({name: basename(__filename)});

logger.info(`process.NODE_ENV = ${process.env.NODE_ENV}`);

(async () => {


  await container.provideDatabase()

  if (['test', 'production', 'staging'].includes(process.env.NODE_ENV)) {
    app.listen(process.env.APP_PORT)
    logger.info(`Express server has started on port ${process.env.APP_PORT}. Open http://localhost:${process.env.APP_PORT}/api/test/ping?qwerty to see results`)
  } else {
    https.createServer({
      key: fs.readFileSync('server.key'),
      cert: fs.readFileSync('server.cert')
    }, app).listen(process.env.APP_PORT)
    logger.info(`Express server has started on port ${process.env.APP_PORT}. Open https://localhost:${process.env.APP_PORT}/api/test/ping?qwerty to see results`)
  }

})()
