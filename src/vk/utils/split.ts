import trim from "@/vk/utils/trim";

export default function (message: string, maxLength= 4000) {
  const trimmed = trim(message)
  const regexp= new RegExp(`(?<=\\n*)(.(.|\\n){0,${maxLength-2}}.)(?=\\n{2,}|$)`,'g')
  const result= trimmed.match(regexp)
  return result
}
