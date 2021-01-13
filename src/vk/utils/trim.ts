export default function (message: string) {
  let result = message.replaceAll(/^( |\t)+/gm, '').trim()

  return result
}
