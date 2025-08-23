import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  MinLength,
  IsBoolean,
  IsOptional,
  Matches,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    description: 'Email address of the user',
    example: 'user@example.com',
    required: true,
  })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @Matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: 'Invalid email format' })
  @Matches(
    /^(?!.*@(yopmail|10minutemail|guerrillamail|mailinator|tempmail)\.)/i,
    {
      message: 'Temporary email addresses are not allowed',
    },
  )
  email: string;

  @ApiProperty({
    description: 'Password for the user account',
    example: 'mypassword123',
    minLength: 8,
    required: true,
  })
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;

  @ApiProperty({
    description: 'Subscribe to newsletter',
    example: true,
    required: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  newsletterSubscribed?: boolean = false;
}
