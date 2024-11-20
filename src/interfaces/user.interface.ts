import { Observable } from 'rxjs';

export type User = {
  id: number;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
};

export type LoginUser = {
  email: string;
  password: string;
};

export type UserById = {
  id: number;
};

export type CreateUser = {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
};

export type UpdateUser = {
  id: number;
  email?: string;
  password?: string;
  first_name?: string;
  last_name?: string;
  is_active?: boolean;
};

export interface IUserService {
  findAll(data: object): Observable<User[]>;
  findOne(data: UserById): Observable<User>;
  createUser(data: CreateUser): Observable<User>;
  updateUser(data: UpdateUser): Observable<User>;
  deleteUser(data: UserById): Observable<User>;
}
