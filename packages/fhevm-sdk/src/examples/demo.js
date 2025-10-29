// demo.ts
import { FHEClient } from "../src"; // 相对于 examples 目录
async function main() {
    // 初始化 SDK
    const client = new FHEClient({ rpcUrl: "https://example-fhevm-node" });
    await client.init();
    console.log("=== FHEClient Demo ===");
    const data = "Hello FHEVM!";
    // 加密
    const cipher = await client.encrypt(data);
    console.log("Encrypted:", cipher);
    // 解密
    const decrypted = await client.decrypt(cipher);
    console.log("Decrypted:", decrypted);
    // 用户解密（模拟 EIP-712 签名解密）
    const userDecrypted = await client.userDecrypt(cipher);
    console.log("User Decrypted:", userDecrypted);
    // 公钥解密
    const publicDecrypted = await client.publicDecrypt(cipher);
    console.log("Public Decrypted:", publicDecrypted);
}
main().catch((err) => console.error(err));
