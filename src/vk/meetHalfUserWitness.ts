import {User} from "@entity/user/User.entity";
import container from "@/di/container";
import {basename} from "path";
import meet from "@/vk/meet";
import Chat from "@entity/Chat.entity";
import KError from "@/error/KError";
import friends from "@/vk/utils/friends";
import join from "@/vk/utils/join";
import link from "@/vk/utils/link";
import LinkMode from "@/vk/utils/LinkMode";
import sendToGroupChat from "@/vk/utils/sendToGroupChat";

export default async function (halfUser: User, witness: User): Promise<Chat> {
  const vk = container.vk
  const logger = container.createLogger({name: basename(__filename),})
  let result: Chat

  if (!halfUser.witness?.mid) {
    throw new KError(`Empty witness`, 1500)
  }

  // ожидаю когда можно будет создать чат и пригласить в него обоих
  await friends([halfUser, halfUser.witness], {wait: true}, async () => {

    // свожу в чате с заверителем
    result = await meet(`Регистрация в kopnik org ${halfUser.iof}`,
      [halfUser, halfUser.witness,],
      {
        chat: halfUser.witnessChat,
      })


    const messages= [`$t Здравия, братцы! Единства и благополучия всему славянскому роду!`,
      `${link(halfUser, LinkMode.i)}, я создал этот чат для того, чтобы ты мог заверить свои личные данные, которые указал во время регистрации. Это обязательная процедура, которую проходит каждый новый участник сети kopnik org. Без этой процедуры мы не смогли бы собрать подлинную информацию об участниках сети. Ниже я расскажу тебе насколько это важно для воссоздания истинного Копного права. Обычно процедура заверения проходит за 2-3 минуты и не представляет сложности для честного общинника. `,
      `Теперь позволь мне более подробно объяснить, насколько важна процедура заверения для восстановления настоящего Копного права. Как ты знаешь в Копном праве объединение и управление общиной происходит исключительно только через копных мужей, все остальные члены общины как дети, жены, престарелые родители, делегируют эти полномочия копным мужам и представлены через них. Копные мужи отбираются в общине по известному набору личных качеств, которые были изложены Сергеем Даниловым и Алексеем Трехлебовым. Это дом, хозяйство, семья и дети. Это была короткая справка. А теперь представь, что вместо настоящих копных мужей общину наводнят самозванцы: вместо одного истинного копного мужа десятки самозванцев: диванных воинов, самопровозглашённых пророков, учителей с повышенным самомнением. Представь как все эти самозванцы разбавляют ряды истинных копных мужей, присутствие которых сводится на нет, потому как их количество намного меньше. Если ты представил, то согласишься, что в таком состоянии наша община вовсе не соответствовала бы Копному праву, в ней утратились бы все сильные стороны истинного Копного права и само ее предназначение.`,
      `Последнее, но не менее важное - заверять место проживания с точностью до дома. Это необходимо нам для взаимного поиска и построения живых общин на земле по территориальному принципу (дом, двор, город, область), а не воображаемых.`,
      `Процедура заверения, для которой мы здесь собрались, направлена против самозванцев и случайных ошибок честных общинников. Она очень простая и справедливая: чем больше полномочий новый пользователь желает на себя принять, тем больше качеств он должен сначала доказать остальным участникам общины. Самое большое предстоит заверить копным мужам, меньше всего чужакам. Пока община не разрастется достаточно для того, чтобы копные мужи сами на местах могли проводить подобную проверку, она будет проводиться специальными уполномоченными заверителями здесь. На данный момент так.`,
      `Теперь позволь мне рассказать, как проходит процедура заверения: 
            1. Сначала Заверитель ознакамливается с твоими регистрационными данными. 
            2. Затем, учитывая выбранную тобой копную роль, географическое расстояние между вами, возможность связаться по средствам связи, заверитель затребует доказательства твоих регистрационных данных. Скорее всего это потребует предоставления паспорта для подтверждения ФИО и места жительства. Это может проходить в форме личной встречи, видео звонка, голосового звонка, фотографии или что-то другое целиком на усмотрение Заверителя.
            3. Ты предоставляешь затребованные доказательства.
            3. Получив доказательства, Заверитель сопоставляет регистрационные данные и твою реальную личность.
            4. Наконец, на основании этого Заверитель выносит решение принимать тебя или нет.
            Как я уже говорил, обычно процедура заверения проходит за 2-3 минуты и не представляет сложности для честного общинника.
            Если процедура заверения закончилась отказом, ее можно возобновить повторно после устранения замечаний. Таков ее полный порядок.`,
      `${link(halfUser,LinkMode.i)}, я создал этот чат с единственной целью, чтобы ты имел возможность заверить свои регистрационные данные для становления полноправным участником копной сети. Если ты не готов проходить процедуру заверения, Заверитель не будет тебя уговаривать. В таком случае просто выходи из этого чата. Если ты готов пройти процедуру заверения, напиши в этом чате слово "готов" и приготовься следовать указаниям Заверителя. Удачи!`]

    for(let eachMessage of messages){
      await sendToGroupChat(result || halfUser.witnessChat, {message: eachMessage})
    }
  })

  return result
}
