// interfaces/UserRepository.ts
export interface UserRepository {
  searchUsers(
    filter: any,
    sortObj: any,
    page: number,
    limit: number
  ): Promise<any>;
}

export interface CacheService {
  get(key: string): Promise<any | null>;
  set(key: string, value: any, ttl?: number): Promise<void>;
}
