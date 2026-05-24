import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AppGuard } from '~/app.guard';
import { UpperCasePipe } from '~/uppercase.pipe';

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
  getUserById(
    @Param('id', ParseIntPipe) id: number,
  ): { id: number; name: string } | string {
    return this.appService.getUserById(id);
  }

  @Post()
  createUser(
    @Body('id', ParseIntPipe) id: number,
    @Body('name', UpperCasePipe) name: string,
  ): string {
    const result = this.appService.createUser({ id, name });
    return result;
  }

  @Patch(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { name: string },
  ): string {
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
