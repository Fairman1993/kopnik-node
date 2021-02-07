import {interfaces} from "inversify";
import Logger, {LoggerOptions} from "bunyan";
import TYPES from "@/di/TYPES";
import {resolve} from "path";
import httpContext from 'express-cls-hooked'
import container from "@/di/container";
import _ from 'lodash'
import ConsoleStream from "@/di/createLogger/ConsoleStream";
import ContextStream from "@/di/createLogger/ContextStream";
import LoggerHooked from "@/di/createLogger/LoggerEmitter";
import clscontext from "@/context/context";
import plain from "@entity/user/plain";


container.bind<interfaces.Factory<Logger>>(TYPES.createLogger).toFactory((context) => {
  return (options = {}) => {
    const defaultOptions: LoggerOptions = {
      name: "main",
      streams: [
/*        {
          level: 'debug',
          type: "raw",
          stream: new ContextStream() as any
        },*/
        {
          level: 'debug',
          type: "raw",
          stream: new ConsoleStream() as any
        },
        {
          type: "rotating-file",
          path: resolve(__dirname, '../../../logs', process.env.NODE_ENV + ".log"),
          period: "1d",   // daily rotation
          count: 30,        // keep 100 back copies
          level: "debug"
        },
      ],
      serializers: {
        ...Logger.stdSerializers,
        msg(msg) {
          return msg
        }
      },
      src: true
    }

    // в dev режиме сами отправляем логи в Логсташ
    switch (process.env.NODE_ENV) {
      /*      case 'development':
                      (defaultOptions.streams as any).push({
                        level: 'debug',
                        type: "raw",
                        stream: bunyantcp.createStream({
                          host: 'urz.open.ru',
                          // port: 9998,
                          port: 9995,
                        })
                      })
              break*/
      case 'test':
        break
      case 'production':
      case 'staging':
      case 'development':
        // (defaultOptions.streams as any).push()
        break
    }
    const loggerOptions = _.merge(defaultOptions, options)
    const result= new LoggerHooked(loggerOptions)
    result.on('beforeEmit', (rec, noemit)=>{
      // levelName
      rec.levelName= Logger.nameFromLevel[rec.level]

      // req_id
      const req_id = clscontext.req_id
      if (req_id) {
        rec.req_id = req_id
      } else {
        delete rec.req_id
      }

      // user
      const user = clscontext.user
      if (user) {
        rec.user = plain(user, {isCurrentUser: true})
      } else {
        delete rec.user
      }
    })
    return result
  }
})
