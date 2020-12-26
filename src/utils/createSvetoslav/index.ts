import createSvetoslav from "@/utils/createSvetoslav/createSvetoslav";
import container from "@/di/container";

(async function () {
  await container.provideDatabase()
  await createSvetoslav()
})()
