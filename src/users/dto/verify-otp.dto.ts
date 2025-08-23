import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, IsEmail } from 'class-validator';

export class VerifyOtpDto {
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
}
