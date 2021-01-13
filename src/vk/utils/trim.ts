export default function (message: string) {
  let result = message.replaceAll(/^ +/gm, '').trim()

  return result
}
