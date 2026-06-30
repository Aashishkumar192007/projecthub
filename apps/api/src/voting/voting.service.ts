import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class VotingService {
  constructor(private prisma: PrismaService) {}

  async getPolls(tenant_id: string, societyId: string) {
    return this.prisma.poll.findMany({
      where: { tenant_id, societyId },
      include: { options: true, votes: true }
    });
  }

  async createPoll(tenant_id: string, societyId: string, data: any) {
    const { options, ...pollData } = data;
    return this.prisma.poll.create({
      data: {
        ...pollData,
        tenant_id,
        societyId,
        options: {
          create: options.map((opt: string) => ({ optionText: opt }))
        }
      },
      include: { options: true }
    });
  }

  async castVote(pollId: string, optionId: string, customer_id: string) {
    return this.prisma.vote.create({
      data: { pollId, optionId, customer_id }
    });
  }
}
