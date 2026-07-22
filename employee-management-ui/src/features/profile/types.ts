export interface UserProfile {
  _id: string;

  firstName: string;

  lastName: string;

  email: string;

  role: string;

  phone?: string;

  address?: string;

  profilePicture?: string;

  createdAt: string;
}
