// import i18next from "i18next";
// import Backend from 'i18next-fs-backend'
import link from "@/vk/utils/link";
import testUser from "@entity/user/test-utils/testUser";
import container from "@/di/container";


describe('i18next', () => {
  let i18next: typeof container.i18next
  beforeEach(async () => {
    await container.provideI18next()
    i18next= container.i18next
  })
  it('meetHalfUserWitness', async () => {
    expect(i18next.t('meetHalfUserWitness:message', {halfUser: link(testUser())})).toContain(testUser().firstName,)
    expect(i18next.t('meetHalfUserWitness:message', {halfUser: link(testUser())})).toContain('я создал этот чат для того',)
  })
  it.skip('key1.key2', async () => {
    expect(i18next.t('witness:key1.key2')).toBe(123,)
  })
  it('getFixedT', async () => {
    const t= i18next.getFixedT('ru')
    expect(t('meetHalfUserWitness:message')).toContain('я создал этот чат для того',)
  })
  it('fallback', async () => {
    const t= i18next.getFixedT('de')
    expect(t('meetHalfUserWitness:message')).toContain('я создал этот чат для того',)
  })
})
