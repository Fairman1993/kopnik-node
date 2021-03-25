export default function(items: string[]){
  return items.map(eachItem=>` * ${eachItem}`).join('\n')
}
