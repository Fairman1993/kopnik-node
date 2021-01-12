export default function (message: string) {
  let trimmed = message.replaceAll(/^ +/gm, '').trim()
  let result = trimmed.split('\n\n\n')

  return result
}
