import { create } from 'zustand';

export interface CommunityComment {
  id: string;
  content: string;
  authorName: string;
  createdAt: string;
}

export interface CommunityPost {
  id: string;
  title: string;
  content: string;
  type: string;
  authorName: string;
  createdAt: string;
  likes: number;
  commentsCount: number;
  comments: CommunityComment[];
}

interface CommunityState {
  posts: CommunityPost[];
  isLoading: boolean;
  
  fetchPosts: () => Promise<void>;
}

export const useCommunityStore = create<CommunityState>((set) => ({
  posts: [],
  isLoading: false,

  fetchPosts: async () => {
    set({ isLoading: true });
    try {
      const res = await fetch('http://localhost:3001/api/v1/community/posts');
      if (res.ok) {
        const data = await res.json();
        set({ posts: data, isLoading: false });
      } else {
        set({ isLoading: false });
      }
    } catch (error) {
      set({ isLoading: false });
    }
  }
}));
