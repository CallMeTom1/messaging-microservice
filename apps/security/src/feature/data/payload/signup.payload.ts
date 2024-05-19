import { ApiProperty } from "@nestjs/swagger"
import {IsEmail, IsNotEmpty, Length, Matches} from "class-validator";

export class SignupPayload {
  @ApiProperty()
  @IsNotEmpty()
  @Length(1,25)
  @Matches(/^[a-zA-Z0-9_.-]+$/)
  username: string

  @ApiProperty()
  @IsNotEmpty()
  @Length(1,25)
  @Matches(/^[^\s<>]+$/)
  password: string

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @Matches(/^[^\s<>]+$/)
  mail: string

  @ApiProperty()
  googleHash: string
  @ApiProperty()
  facebookHash: string
}