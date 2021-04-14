import {version} from '../../package.json'

export default function (response){
  return {
    version,
    response
  }
}
