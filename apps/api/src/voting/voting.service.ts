import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class VotingService {
  async getPolls(tenantId: string, societyId: string) {
    return prisma.poll.findMany({
      where: { tenantId, societyId },
      include: { options: true, votes: true }
    });
  }

  async createPoll(tenantId: string, societyId: string, data: any) {
    const { options, ...pollData } = data;
    return prisma.poll.create({
      data: {
        ...pollData,
        tenantId,
        societyId,
        options: {
          create: options.map((opt: string) => ({ optionText: opt }))
        }
      },
      include: { options: true }
    });
  }

  async castVote(pollId: string, optionId: string, customerId: string) {
    return prisma.vote.create({
      data: { pollId, optionId, customerId }
    });
  }
}
