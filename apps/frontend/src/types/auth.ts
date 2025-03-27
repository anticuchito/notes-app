export type Credentials = {
  email: string;
  password: string;
};
export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  name: string;
}
export interface FormCreateAccount {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
