import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class CommunityCommService {
  async getPosts(tenantId: string) {
    const posts = await prisma.communityPost.findMany({
      where: { propertyProject: { tenantId } },
      include: {
        author: true,
        comments: {
          include: { author: true },
          orderBy: { createdAt: 'asc' }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return posts.map(p => ({
      id: p.id,
      title: p.postType + ' Post',
      content: p.content,
      type: p.postType, // ANNOUNCEMENT, EVENT, POLL, DISCUSSION
      authorName: p.author?.name || 'Admin',
      createdAt: p.createdAt,
      likes: 0,
      commentsCount: p.comments.length,
      comments: p.comments.map(c => ({
        id: c.id,
        content: c.content,
        authorName: c.author?.name || 'User',
        createdAt: c.createdAt
      }))
    }));
  }

  async createPost(tenantId: string, data: any) {
    return prisma.communityPost.create({
      data: {
        ...data,
      }
    });
  }
}
