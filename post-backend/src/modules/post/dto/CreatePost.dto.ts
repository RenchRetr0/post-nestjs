import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Length, IsEmail, Matches } from "class-validator";
import { MESSAGE, REGEX } from "src/app.utils"


export class CreatePostDto {
    @IsNotEmpty({ message: 'Title cannot be shorter than five characters' })
    @ApiProperty({example: 'Clear sky', description: 'Title for post.'})
    @Length(5)
    readonly title: string

    @IsEmail()
    @IsNotEmpty({ message: 'Description cannot be empty' })
    @ApiProperty({example: 'Today is sunny weather', description: 'Description for post.'})
    readonly description: string
}