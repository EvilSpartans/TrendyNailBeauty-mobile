export interface User {
  id?: string;
  token: string;
  roles: string[];
  email: string;
  username: string;
  userIdentifier?: string;
  password?: string;
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
  ordersCount: number;
  phone: string;
  street: string;
  zipCode: string;
  city: string;
  country: string;
  gender: string;
}
