export interface User {
  id: string;
  authyId?: string;
  fingerId?: string;
  fingerEnabled: boolean;
  name: string;
  email: string;
  phone: string;
  phoneCountryCode: number;
  phoneNationalNumber: number;
  photoURL?: string;
  updatedAt: Date,
  username: string;
  emailVerified?: boolean;
  phoneVerified?: boolean;
}
