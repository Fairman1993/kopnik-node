import resetWitnesses from "@/job/resetWitnesses/resetWitnesses";
import container from "@/di/container";

(async function main() {
  await container.provideDatabase()
  await container.provideI18next()
  const halfUsers = await resetWitnesses()

  for (let eachHalfUser of halfUsers) {
    console.log(`${eachHalfUser.iof} -> ${eachHalfUser.witness.iof}`)
  }

  console.log(`total: ${halfUsers.length}`)
})()
