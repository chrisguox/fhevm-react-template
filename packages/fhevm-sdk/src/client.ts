export interface FHEClientConfig {
  rpcUrl: string;
}

export class FHEClient {
  private rpcUrl: string;

  constructor(config: FHEClientConfig) {
    this.rpcUrl = config.rpcUrl;
  }

  async init(): Promise<void> {
    console.log(`[FHEClient] Initialized with RPC: ${this.rpcUrl}`);
  }

  async encrypt(data: string): Promise<string> {
    return Buffer.from(data).toString("base64");
  }

  async decrypt(cipher: string): Promise<string> {
    return Buffer.from(cipher, "base64").toString("utf-8");
  }

  async userDecrypt(cipher: string): Promise<string> {
    console.log("[FHEClient] userDecrypt called (mock)");
    return this.decrypt(cipher);
  }

  async publicDecrypt(cipher: string): Promise<string> {
    console.log("[FHEClient] publicDecrypt called (mock)");
    return this.decrypt(cipher);
  }
}
