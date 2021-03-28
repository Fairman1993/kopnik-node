import Logger, {LoggerOptions} from "bunyan";
import container from "@/di/container";


export default class ConsoleStream {
  write(rec) {
    // https://stackoverflow.com/a/41407246
    if (rec.err) {
      console.log('\x1b[33m%s\x1b[0m', rec.name, "\x1b[0m", rec.err.stack,)
    } else {
      // почему-то не заменяет селекты после первого
      // const msg = rec.msg.startsWith('SELECT') ? rec.msg.replaceAll(/^SELECT([^]+?)FROM/g, 'SELECT ... \nFROM') : rec.msg
      let msg = rec.msg
      if (container.constants.logger.console.shortSQL && msg.match(/^select|insert/i)) {
        msg = msg.replace(/^((.+\n){20})(.|\s)*/, '$1')
      }
      console.log('\x1b[33m%s\x1b[0m', rec.name, "\x1b[36m", '[' + Logger.nameFromLevel[rec.level] + ']', "\x1b[32m", `(${rec.req_id || ''})`, "\x1b[0m", msg,)
    }
  }
}
