import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { AdminLoginDto } from './dto/admin-login.dto';
import {
  AdminResponseDto,
  AdminLoginResponseDto,
} from './dto/admin-response.dto';

@Injectable()
export class AdminService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(adminLoginDto: AdminLoginDto): Promise<AdminLoginResponseDto> {
    const { username, password } = adminLoginDto;

    // Find admin by username
    const admin = await this.prisma.admin.findUnique({
      where: { username },
    });

    if (!admin) {
      throw new UnauthorizedException('Identifiants administrateur invalides');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Identifiants administrateur invalides');
    }

    // Generate JWT token with admin role
    const payload = {
      sub: admin.uuid,
      username: admin.username,
      role: 'admin',
    };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      admin: new AdminResponseDto(admin),
    };
  }

  async getProfile(adminUuid: string): Promise<AdminResponseDto> {
    const admin = await this.prisma.admin.findUnique({
      where: { uuid: adminUuid },
    });

    if (!admin) {
      throw new NotFoundException('Administrateur non trouvé');
    }

    return new AdminResponseDto(admin);
  }

  async validateAdmin(adminUuid: string): Promise<AdminResponseDto | null> {
    const admin = await this.prisma.admin.findUnique({
      where: { uuid: adminUuid },
    });

    if (!admin) {
      return null;
    }

    return new AdminResponseDto(admin);
  }
}
