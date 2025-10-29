// src/examples/demo.ts
import { FHEClient } from "../index.js";

async function main() {
  const client = new FHEClient({ rpcUrl: "https://example-fhevm-node" }); // <-- 只声明一次
  await client.init();

  const data = "Hello FHEVM!";
  const cipher = await client.encrypt(data);
  console.log("Encrypted:", cipher);

  const decrypted = await client.decrypt(cipher);
  console.log("Decrypted:", decrypted);

  const userDecrypted = await client.userDecrypt(cipher);
  console.log("User Decrypted:", userDecrypted);

  const publicDecrypted = await client.publicDecrypt(cipher);
  console.log("Public Decrypted:", publicDecrypted);
}

main().catch(console.error);
