import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

const users: { id: number; name: string }[] = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Doe' },
];

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  getUsers(): { id: number; name: string }[] {
    this.logger.verbose('Fetching all users');
    return users;
  }

  getUserById(id: number): { id: number; name: string } | string {
    this.logger.debug(`Fetching user with ID: ${id}`);
    const user = users.find((user) => user.id === id);
    if (user) {
      return user;
    }
    return 'User not found';
  }

  createUser(body: CreateUserDto): string {
    const users = this.getUsers();
    const userExists = users.some((user) => user.id === body.id);
    if (userExists) {
      return 'User already exists';
    }
    users.push(body);
    return 'User created successfully';
  }

  updateUser(body: { name: string }, id: number): string {
    const users = this.getUsers();
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      return 'User not found';
    }
    users[userIndex].name = body.name;
    return 'User updated successfully';
  }
}
