export interface IRepository<T> {
  findById(id: string): Promise<T | null>;
  save(entity: T): Promise<T>;
  delete(id: string): Promise<void>;
}

export const REPOSITORY_TOKEN = Symbol('REPOSITORY_TOKEN');
