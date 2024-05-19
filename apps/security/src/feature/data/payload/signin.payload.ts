import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsOptional} from 'class-validator';
export class SignInPayload {
  @ApiProperty()
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  @ApiProperty()
  password: string;
  @ApiProperty()
  @IsOptional()
  googleHash: string;
  @IsOptional()
  @ApiProperty()
  facebookHash: string;
  @ApiProperty()
  socialLogin: boolean;
}