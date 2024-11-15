export type User = {
  id: number;
  first_name: string;
  last_name: string;
  is_active: boolean;
};

export type UserById = {
  id: number;
};

export type CreateUser = {
  first_name: string;
  last_name: string;
  is_active: boolean;
};

export type UpdateUser = {
  id: number;
  first_name?: string;
  last_name?: string;
  is_active?: boolean;
};
