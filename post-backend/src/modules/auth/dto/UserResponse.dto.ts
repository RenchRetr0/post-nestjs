import { ApiProperty } from "@nestjs/swagger";

export class UserResponseDto {
    @ApiProperty({ example: 'Aleks228', description: 'User login.' })
    login: string;

    @ApiProperty({example: 'test@mail.com', description: 'User email.'})
    email: string;

    @ApiProperty({ description: 'Unique jwt token.' })
    access_token: string;
}