import {interfaces} from "inversify";
import Logger, {LoggerOptions} from "bunyan";
import TYPES from "@/di/TYPES";
import {resolve} from "path";
import container from "@/di/container";
import _ from 'lodash'
import ConsoleStream from "@/di/createLogger/ConsoleStream";
import LoggerHooked from "@/di/createLogger/LoggerEmitter";
import clscontext from "@/context/context";
import plain from "@entity/user/plain";
import RotatingFileStream from "bunyan-rotating-file-stream";

const rotatingFileStream = new RotatingFileStream({
  path: resolve(__dirname, '../../../logs', `${process.env.NODE_ENV}.%F.log`),
  // period: '1d',
  totalFiles: 10,
  fieldOrder: ['time', 'name', 'level', 'levelName', 'req_id', 'user.id', "user.lastName", "msg"],
});

container.bind<interfaces.Factory<Logger>>(TYPES.createLogger).toFactory((context) => {
  return (options = {}) => {
    const defaultOptions: LoggerOptions = {
      name: "main",
      streams: [
        {
          level: 'debug',
          type: "raw",
          stream: new ConsoleStream() as any
        },
        {
          level: 'debug',
          type: 'raw',
          stream: rotatingFileStream,
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

    const loggerOptions = _.merge(defaultOptions, options)
    const result = new LoggerHooked(loggerOptions)
    result.on('beforeEmit', (rec, noemit) => {
      // levelName
      rec.levelName = Logger.nameFromLevel[rec.level]

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
