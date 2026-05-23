import { Injectable } from '@nestjs/common';

const users: { id: number; name: string }[] = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Doe' },
];

@Injectable()
export class UserService {
  getUsers(): { id: number; name: string }[] {
    return users;
  }

  getUserById(id: string): { id: number; name: string } | string {
    const user = users.find((user) => user.id === parseInt(id));
    if (user) {
      return user;
    }
    return 'User not found';
  }

  createUser(body: { id: number; name: string }): string {
    const users = this.getUsers();
    const userExists = users.some((user) => user.id === body.id);
    if (userExists) {
      return 'User already exists';
    }
    users.push(body);
    return 'User created successfully';
  }

  updateUser(body: { name: string }, id: string): string {
    const users = this.getUsers();
    const userIndex = users.findIndex((user) => user.id === parseInt(id));
    if (userIndex === -1) {
      return 'User not found';
    }
    users[userIndex].name = body.name;
    return 'User updated successfully';
  }
}
