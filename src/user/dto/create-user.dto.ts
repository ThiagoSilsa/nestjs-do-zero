import { IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNumber()
  id: number;

  @IsString({
    message: 'Name must be a string',
  })
  name: string;
}
