import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { FeedbackResponseDto } from './dto/feedback-response.dto';

@Injectable()
export class FeedbackService {
  constructor(private prisma: PrismaService) {}

  async create(
    userUuid: string,
    createFeedbackDto: CreateFeedbackDto,
  ): Promise<FeedbackResponseDto> {
    const { type, comment } = createFeedbackDto;

    // Verify user exists
    const user = await this.prisma.user.findUnique({
      where: { uuid: userUuid },
    });

    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    // Create feedback
    const feedback = await this.prisma.feedback.create({
      data: {
        type,
        comment,
        userUuid,
      },
      include: {
        user: true,
      },
    });

    return new FeedbackResponseDto(feedback);
  }

  async findAll(): Promise<FeedbackResponseDto[]> {
    const feedbacks = await this.prisma.feedback.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return feedbacks.map((feedback) => new FeedbackResponseDto(feedback));
  }
}
