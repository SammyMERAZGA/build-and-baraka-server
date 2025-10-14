import { ApiProperty } from '@nestjs/swagger';

export class AdminResponseDto {
  @ApiProperty({
    description: 'Admin UUID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  uuid: string;

  @ApiProperty({
    description: 'Admin username',
    example: 'admin_sammy',
  })
  username: string;

  @ApiProperty({
    description: 'Admin description',
    example: 'Super administrateur du système',
    required: false,
  })
  description?: string;

  @ApiProperty({
    description: 'Creation date',
    example: '2024-01-15T10:30:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Last update date',
    example: '2024-01-15T10:30:00.000Z',
  })
  updatedAt: Date;

  constructor(admin: any) {
    this.uuid = admin.uuid;
    this.username = admin.username;
    this.description = admin.description;
    this.createdAt = admin.createdAt;
    this.updatedAt = admin.updatedAt;
  }
}
