import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class AdminResponseDto {
  @ApiProperty({
    description: 'Admin unique identifier',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  uuid: string;

  @ApiProperty({
    description: 'Admin username',
    example: 'admin',
  })
  username: string;

  @ApiProperty({
    description: 'Admin description',
    example: 'Super administrator',
    required: false,
  })
  description?: string;

  @ApiProperty({
    description: 'Account creation date',
    example: '2024-01-15T10:30:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Last update date',
    example: '2024-01-15T10:30:00Z',
  })
  updatedAt: Date;

  @Exclude()
  password: string;

  constructor(admin: any) {
    this.uuid = admin.uuid;
    this.username = admin.username;
    this.description = admin.description;
    this.createdAt = admin.createdAt;
    this.updatedAt = admin.updatedAt;
  }
}

export class AdminLoginResponseDto {
  @ApiProperty({
    description: 'JWT access token for admin authentication',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  accessToken: string;

  @ApiProperty({
    description: 'Admin information',
    type: AdminResponseDto,
  })
  admin: AdminResponseDto;
}
