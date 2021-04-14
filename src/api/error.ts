import {version} from '../../package.json'

export default function (err: Error){
  return {
    error: {
      error_code: (err as any).code || undefined,
        error_msg: err.message,
        error_stack: err.stack,
    },
    version,
  }
}
