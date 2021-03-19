import trim from "@/vk/utils/trim";

/**
 * Разделяет длинное сообщение на кусочки по maxLength символов строго на двойных переносах строк
 * @param message
 * @param maxLength
 */
export default function (message: string, maxLength= 4000) {
  const trimmed = trim(message)
  const regexp= new RegExp(`(?<=\\n*)(.(.|\\n){0,${maxLength-2}}.)(?=\\n{2,}|$)`,'g')
  const result= trimmed.match(regexp)
  return result
}
