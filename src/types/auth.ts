export interface User {
  _id: string;
  nome: string;
  email: string;
}

export interface LoginResponse {
  msg: string;
  usuario: User;
}

export interface LoginFormData {
  email: string;
  senha: string;
}

export interface RegisterFormData {
  nome: string;
  email: string;
  senha: string;
}

export interface RegisterResponse {
  msg: string;
}
