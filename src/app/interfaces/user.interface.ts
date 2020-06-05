export interface UserInterface {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  isAdmin: boolean;
  isBlocked: boolean;
  courses: number[];
}
