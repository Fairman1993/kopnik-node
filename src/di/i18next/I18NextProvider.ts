import i18next from "i18next";

export default interface I18NextProvider {
  (): Promise<typeof i18next>
}
