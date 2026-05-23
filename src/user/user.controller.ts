import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AppGuard } from '~/app.guard';

@UseGuards(AppGuard)
@Controller('user')
export class UserController {
  constructor(private readonly appService: UserService) {}

  @Get()
  getUser(): { id: number; name: string }[] {
    const result = this.appService.getUsers();
    return result;
  }

  @Get(':id')
  getUserById(@Param('id') id: string): { id: number; name: string } | string {
    return this.appService.getUserById(id);
  }

  @Post()
  createUser(@Body() body: { id: number; name: string }): string {
    if (!body.id || !body.name) {
      return 'Invalid user data';
    }
    const parsedBody = {
      id: Number(body.id),
      name: body.name,
    };
    if (
      typeof parsedBody.id !== 'number' ||
      typeof parsedBody.name !== 'string'
    ) {
      return 'Invalid user data types';
    }

    const result = this.appService.createUser(parsedBody);
    return result;
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() body: { name: string }): string {
    // Verify if user exists
    const existingUser = this.appService.getUserById(id);
    // Verify id and body
    if (!id || !body.name) {
      return 'Invalid user data';
    }

    const user = this.appService.updateUser(body, id);
    return user;
  }
}
