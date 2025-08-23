import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import * as speakeasy from 'speakeasy';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UpdateProfileDto, ChangePasswordDto } from './dto/update-profile.dto';
import { UserResponseDto, LoginResponseDto } from './dto/user-response.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private mailService: MailService,
    private configService: ConfigService,
  ) {}

  async register(registerDto: RegisterDto): Promise<LoginResponseDto> {
    const { email, password, newsletterSubscribed } = registerDto;

    // Check if user already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        newsletterSubscribed: newsletterSubscribed || false,
      },
    });

    // Generate JWT token
    const payload = { sub: user.uuid, email: user.email };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      user: new UserResponseDto(user),
    };
  }

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const { email, password } = loginDto;

    // Find user
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT token
    const payload = { sub: user.uuid, email: user.email };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      user: new UserResponseDto(user),
    };
  }

  async forgotPassword(
    forgotPasswordDto: ForgotPasswordDto,
  ): Promise<{ message: string }> {
    const { email } = forgotPasswordDto;

    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Don't reveal if email exists or not for security
      return {
        message: 'If this email exists, a password reset link has been sent',
      };
    }

    // Generate OTP code using speakeasy
    const otpCode = speakeasy.totp({
      secret:
        this.configService.get('JWT_SECRET', 'your-secret-key') + user.uuid,
      encoding: 'base32',
      step: 3600, // 1 hour validity
    });

    // Update user with reset flag
    await this.prisma.user.update({
      where: { uuid: user.uuid },
      data: {
        passwordResetToken: otpCode,
        isResettingPassword: true,
      },
    });

    // Send reset email with OTP
    await this.mailService.sendPasswordResetEmail(email, otpCode);

    return {
      message: 'If this email exists, a password reset code has been sent',
    };
  }

  async verifyOtp(
    verifyOtpDto: VerifyOtpDto,
  ): Promise<{ message: string; valid: boolean }> {
    const { email, otpCode } = verifyOtpDto;

    // Find user with this email and reset flag
    const user = await this.prisma.user.findFirst({
      where: {
        email,
        isResettingPassword: true,
      },
    });

    if (!user) {
      throw new BadRequestException('Invalid email or no reset request found');
    }

    // Verify OTP code with speakeasy
    const isValidToken = speakeasy.totp.verify({
      secret:
        this.configService.get('JWT_SECRET', 'your-secret-key') + user.uuid,
      encoding: 'base32',
      token: otpCode,
      step: 3600, // 1 hour validity
      window: 1, // Allow 1 step tolerance
    });

    if (!isValidToken) {
      throw new BadRequestException('Invalid or expired OTP code');
    }

    return { message: 'OTP code is valid', valid: true };
  }

  async resetPassword(
    resetPasswordDto: ResetPasswordDto,
  ): Promise<{ message: string }> {
    const { email, otpCode, newPassword } = resetPasswordDto;

    // Find user with this email and reset flag
    const user = await this.prisma.user.findFirst({
      where: {
        email,
        isResettingPassword: true,
      },
    });

    if (!user) {
      throw new BadRequestException('Invalid email or no reset request found');
    }

    // Verify OTP code with speakeasy
    const isValidToken = speakeasy.totp.verify({
      secret:
        this.configService.get('JWT_SECRET', 'your-secret-key') + user.uuid,
      encoding: 'base32',
      token: otpCode,
      step: 3600, // 1 hour validity
      window: 1, // Allow 1 step tolerance
    });

    if (!isValidToken) {
      throw new BadRequestException('Invalid or expired OTP code');
    }

    // Check if new password is the same as current password
    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      throw new BadRequestException(
        'New password must be different from your current password',
      );
    }

    // Hash new password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update user password and clear reset fields
    await this.prisma.user.update({
      where: { uuid: user.uuid },
      data: {
        password: hashedPassword,
        passwordResetToken: null,
        isResettingPassword: false,
      },
    });

    // Send confirmation email
    await this.mailService.sendPasswordChangeConfirmationEmail(email);

    return { message: 'Password has been successfully reset' };
  }

  async getProfile(userUuid: string): Promise<UserResponseDto> {
    const user = await this.prisma.user.findUnique({
      where: { uuid: userUuid },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return new UserResponseDto(user);
  }

  async updateProfile(
    userUuid: string,
    updateProfileDto: UpdateProfileDto,
  ): Promise<UserResponseDto> {
    const { email, newsletterSubscribed } = updateProfileDto;

    // If email is being updated, check if it's already taken
    if (email) {
      const existingUser = await this.prisma.user.findUnique({
        where: { email },
      });

      if (existingUser && existingUser.uuid !== userUuid) {
        throw new ConflictException('Email is already taken');
      }
    }

    const updatedUser = await this.prisma.user.update({
      where: { uuid: userUuid },
      data: {
        ...(email && { email }),
        ...(newsletterSubscribed !== undefined && { newsletterSubscribed }),
      },
    });

    return new UserResponseDto(updatedUser);
  }

  async changePassword(
    userUuid: string,
    changePasswordDto: ChangePasswordDto,
  ): Promise<{ message: string }> {
    const { currentPassword, newPassword } = changePasswordDto;

    const user = await this.prisma.user.findUnique({
      where: { uuid: userUuid },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password,
    );
    if (!isCurrentPasswordValid) {
      throw new UnauthorizedException('Current password is incorrect');
    }

    // Check if new password is the same as current password
    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      throw new BadRequestException(
        'New password must be different from your current password',
      );
    }

    // Hash new password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update password
    await this.prisma.user.update({
      where: { uuid: userUuid },
      data: { password: hashedPassword },
    });

    return { message: 'Password has been successfully changed' };
  }

  async deleteAccount(userUuid: string): Promise<{ message: string }> {
    const user = await this.prisma.user.findUnique({
      where: { uuid: userUuid },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Delete user (cascade will handle related records)
    await this.prisma.user.delete({
      where: { uuid: userUuid },
    });

    return { message: 'Account has been successfully deleted' };
  }
}
