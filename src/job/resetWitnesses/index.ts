import resetWitnesses from "@/job/resetWitnesses/resetWitnesses";
import container from "@/di/container";

(async function main() {
  await container.provideDatabase()
  await container.provideDatabase()
  const halfUsers = await resetWitnesses()

  for (let eachHalfUser of halfUsers) {
    console.log(`${eachHalfUser.iof} -> ${eachHalfUser.witness.iof}`)
  }

  console.log(`total: ${halfUsers.length}`)
})()
