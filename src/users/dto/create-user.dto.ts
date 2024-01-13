export class CreateUserDto {
  name: string;
  role: 'INTERN' | 'ENGINEER' | 'ADMIN';
  email: string;
}
