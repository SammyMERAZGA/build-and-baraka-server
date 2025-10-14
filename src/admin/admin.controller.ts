import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Public } from '../auth/decorators/public.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { AdminLoginDto } from './dto/admin-login.dto';
import {
  AdminResponseDto,
  AdminLoginResponseDto,
} from './dto/admin-response.dto';

@ApiTags('Admin Authentication')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Admin login',
    description: 'Authenticate admin user and receive JWT token',
  })
  @ApiBody({ type: AdminLoginDto })
  @ApiResponse({
    status: 200,
    description: 'Admin successfully authenticated',
    type: AdminLoginResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid admin credentials',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 401 },
        message: {
          type: 'string',
          example: 'Identifiants administrateur invalides',
        },
        error: { type: 'string', example: 'Unauthorized' },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: {
          type: 'array',
          items: { type: 'string' },
          example: [
            "Le nom d'utilisateur est requis",
            'Le mot de passe doit contenir au moins 6 caractères',
          ],
        },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
  })
  async login(
    @Body(ValidationPipe) adminLoginDto: AdminLoginDto,
  ): Promise<AdminLoginResponseDto> {
    return this.adminService.login(adminLoginDto);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get admin profile',
    description: 'Retrieve current admin profile information',
  })
  @ApiResponse({
    status: 200,
    description: 'Admin profile retrieved successfully',
    type: AdminResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing JWT token',
  })
  @ApiResponse({
    status: 404,
    description: 'Admin not found',
  })
  async getProfile(@CurrentUser() user: any): Promise<AdminResponseDto> {
    return this.adminService.getProfile(user.sub);
  }
}
