import { Injectable } from '@nestjs/common';
import fakeUsers from './fake/fakeUsers.json';

@Injectable()
export class UsersService {
  private users = fakeUsers;

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      return this.users.filter(user => user.role === role);
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find(user => user.id === id);
    return user;
  }

  create(user: { name: string; role: 'INTERN' | 'ENGINEER' | 'ADMIN'; email: string }) {
    const userByHigestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: userByHigestId[0].id + 1,
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(
    id: number,
    updatedUser: {
      name?: string;
      role?: 'INTERN' | 'ENGINEER' | 'ADMIN';
      email?: string;
    },
  ) {
    this.users = this.users.map(user => {
      if (user.id === id) {
        return { ...user, ...updatedUser };
      }
      return user;
    });
  }

  delete(id: number) {
    const removedUser = this.findOne(id);
    this.users = this.users.filter(user => user.id !== id);
    return removedUser;
  }
}
