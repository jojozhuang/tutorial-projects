export interface UserDetails {
  _id: string;
  email: string;
  username: string;
  exp: number;
  iat: number;
}

export interface TokenResponse {
  token: string;
  username: string;
}

export interface TokenPayload {
  username: string;
  password: string;
  email?: string;
}

export interface ResetPassword {
  username: string;
  password: string;
  newpwd: string;
  confirmpwd: string;
}
