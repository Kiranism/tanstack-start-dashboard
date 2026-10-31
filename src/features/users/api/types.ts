export type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  status: string;
  role: string;
  created_at: string;
  updated_at: string;
};

export type UserFilters = {
  page?: number;
  limit?: number;
  roles?: string;
  search?: string;
  sort?: string;
};

export type UsersResponse = {
  success: boolean;
  time: string;
  message: string;
  total_users: number;
  offset: number;
  limit: number;
  users: User[];
};

export type UserMutationPayload = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  role: string;
  status: string;
};
