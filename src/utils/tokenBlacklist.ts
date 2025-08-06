import redisClient from "../redisClient";

export async function blacklistToken(
  token: string,
  ttlInSeconds: number = 86400
) {
  await redisClient.set(`blacklist:${token}`, "true", {
    EX: ttlInSeconds,
  });
}

export async function isTokenBlacklisted(token: string): Promise<boolean> {
  const exists = await redisClient.exists(`blacklist:${token}`);
  return exists === 1;
}
