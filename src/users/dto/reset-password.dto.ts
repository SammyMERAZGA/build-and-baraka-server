import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, Matches, IsEmail } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty({
    description: 'Email address of the user',
    example: 'user@example.com',
  })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  @ApiProperty({
    description: 'OTP code received by email (6 digits)',
    example: '123456',
  })
  @IsString()
  @Matches(/^\d{6}$/, { message: 'OTP code must be exactly 6 digits' })
  otpCode: string;

  @ApiProperty({
    description: 'New password for the user account',
    example: 'mynewpassword123',
    minLength: 8,
  })
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  newPassword: string;
}
