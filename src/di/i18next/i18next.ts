import TYPES from "@/di/TYPES";
import container, {CustomContainer} from "@/di/container";
import I18NextProvider from "@/di/i18next/I18NextProvider";
import i18next from "i18next";
import Backend from 'i18next-fs-backend'

container.bind<I18NextProvider>(TYPES.i18NextProvider).toProvider<typeof i18next>(context => {
  return async () => {
    if (context.container.isBound(TYPES.i18Next)) {
      return context.container.get<typeof i18next>(TYPES.i18Next);
    }

    await i18next.use(Backend)
      .init({
        backend: {
          loadPath: 'src/locales/{{lng}}/{{ns}}.json'
        },
        lng: 'ru',
        supportedLngs: ['ru', 'en', 'sk', 'pl', 'de',],
        nonExplicitSupportedLngs: true,
        fallbackLng: 'ru',
        ns: ['witness', 'meetHalfUserWitness', 'informHalfUser', 'informHalfForeman', 'informHalfForemanBad', 'informHalfSubordinateBad', 'kickSubordinate', 'meetForeman', 'meetKopa', 'meetSubordinate',],
        // defaultNS: 'main',
        // debug: true,
      })
    context.container.bind<typeof i18next>(TYPES.i18Next).toConstantValue(i18next)
    return i18next
  }
})
