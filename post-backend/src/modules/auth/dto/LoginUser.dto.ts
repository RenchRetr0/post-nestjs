import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';
import { MESSAGE, REGEX } from 'src/app.utils';

export class LoginUserDto {
  @ApiProperty({
    description: 'Email address of the user',
    example: 'test@mail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password in plain text',
    example: 'Jackson6!',
  })
  @IsNotEmpty({ message: 'Password cannot be empty.' })
    @Length(8)
    @Matches(
        REGEX.PASSWORD_RULE,
        { message: MESSAGE.PASSWORD_RULE_MESSAGE},
    )
    readonly password: string;
}