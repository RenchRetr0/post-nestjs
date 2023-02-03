import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Length, IsEmail, Matches } from "class-validator";
import { MESSAGE, REGEX } from "src/app.utils"


export class CreateUserDto {
    @IsNotEmpty({ message: 'Login cannot be shorter than five characters' })
    @ApiProperty({example: 'Aleks228', description: 'Уникальный логин.'})
    @Length(5)
    readonly login: string

    @IsEmail()
    @IsNotEmpty({ message: 'Email cannot be empty' })
    @ApiProperty({example: 'test@mail.com', description: 'Уникальная электронная почта.'})
    readonly email: string

    @IsNotEmpty({ message: 'Password cannot be empty.' })
    @Length(8)
    @Matches(
        REGEX.PASSWORD_RULE,
        { message: MESSAGE.PASSWORD_RULE_MESSAGE},
    )
    @ApiProperty({example: 'Jackson6!', description: 'Сложный пароль.'})
    readonly password: string
}