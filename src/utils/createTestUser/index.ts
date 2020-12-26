import createTestUser from "@/utils/createTestUser/createTestUser";
import container from "@/di/container";

(async function () {
  await container.provideDatabase()
  await createTestUser()
})()
