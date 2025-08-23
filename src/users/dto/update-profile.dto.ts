import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  MinLength,
  IsBoolean,
  IsOptional,
  Matches,
} from 'class-validator';

export class UpdateProfileDto {
  @ApiProperty({
    description: 'New email address',
    example: 'newemail@example.com',
    required: false,
  })
  @IsOptional()
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @Matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: 'Invalid email format' })
  @Matches(
    /^(?!.*@(yopmail|10minutemail|guerrillamail|mailinator|tempmail)\.)/i,
    {
      message: 'Temporary email addresses are not allowed',
    },
  )
  email?: string;

  @ApiProperty({
    description: 'Newsletter subscription preference',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  newsletterSubscribed?: boolean;
}

export class ChangePasswordDto {
  @ApiProperty({
    description: 'Current password',
    example: 'mycurrentpassword',
  })
  @IsString()
  currentPassword: string;

  @ApiProperty({
    description: 'New password',
    example: 'mynewpassword123',
    minLength: 8,
  })
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  newPassword: string;
}
