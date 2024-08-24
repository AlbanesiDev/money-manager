import { User } from "../domain/entities/User";

export interface UserRepository {
  getUser(id: number): Promise<User>;
  createUser(user: User): Promise<User>;
  updateUser(user: User): Promise<User>;
  deleteUser(id: number): Promise<void>;
}
