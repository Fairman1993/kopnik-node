import Logger from "bunyan";

export default class extends Logger {
  _emit() {
    this.emit('beforeEmit', ...arguments)
    // @ts-ignore
    super._emit(...arguments)
  }
}



