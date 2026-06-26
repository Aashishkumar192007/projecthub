'use client';

import React, { useEffect } from 'react';
import { MessageSquare, Megaphone, HelpCircle, Store, Calendar as CalendarIcon, Edit, Loader2 } from 'lucide-react';
import { useCommunityStore } from '@/store/communityStore';

export default function CommunityHub() {
  const { posts, fetchPosts, isLoading } = useCommunityStore();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className="flex h-[calc(100vh-64px)] bg-black text-white overflow-hidden">
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden p-6 relative">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-light tracking-wide text-white flex items-center gap-2">
              <MessageSquare className="w-6 h-6 text-pink-400" />
              Community Hub
            </h1>
            <p className="text-white/50 text-sm mt-1">Resident social ecosystem</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-pink-600 hover:bg-pink-500 text-white rounded-lg text-sm font-medium transition-all shadow-[0_0_15px_rgba(236,72,153,0.3)]">
            <Edit className="w-4 h-4" /> Create Post
          </button>
        </div>

        <div className="flex gap-6 h-full">
          {/* Main Feed */}
          <div className="flex-1 space-y-6 overflow-auto pr-2 no-scrollbar">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-3 text-white/50">
                <Loader2 className="w-6 h-6 animate-spin text-pink-500" />
                <div>Loading community feed...</div>
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-20 text-white/40">
                No posts found.
              </div>
            ) : posts.map(post => (
              <div key={post.id} className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    post.type === 'ANNOUNCEMENT' ? 'bg-blue-500/20 text-blue-400' :
                    post.type === 'POLL' ? 'bg-emerald-500/20 text-emerald-400' :
                    'bg-purple-500/20 text-purple-400'
                  }`}>
                    {post.type === 'ANNOUNCEMENT' ? <Megaphone className="w-5 h-5" /> :
                     post.type === 'POLL' ? <HelpCircle className="w-5 h-5" /> :
                     <MessageSquare className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="font-medium text-white/90">{post.title}</h3>
                    <p className="text-xs text-white/50" suppressHydrationWarning>{post.authorName} • {post.createdAt ? post.createdAt.split('T')[0] : ''}</p>
                  </div>
                </div>
                <p className="text-sm text-white/70 leading-relaxed mb-4 whitespace-pre-wrap">
                  {post.content}
                </p>
                <div className="flex items-center gap-4 text-xs text-white/40 border-t border-white/10 pt-4">
                  <span className="hover:text-white cursor-pointer transition-colors">{post.likes} Likes</span>
                  <span className="hover:text-white cursor-pointer transition-colors">{post.commentsCount} Comments</span>
                </div>
              </div>
            ))}
          </div>

          {/* Side Panel Widgets */}
          <div className="w-80 space-y-6 shrink-0">
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-white/90 uppercase tracking-wider mb-4 flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-emerald-400" /> Upcoming Events
              </h3>
              <div className="space-y-4">
                <div className="flex gap-3 items-start">
                  <div className="bg-emerald-500/20 text-emerald-400 rounded-lg p-2 text-center min-w-[50px]">
                    <div className="text-xs uppercase">Aug</div>
                    <div className="text-lg font-bold">15</div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-white/90">Independence Day Celebration</h4>
                    <p className="text-xs text-white/50 mt-1">Clubhouse Lawn • 9:00 AM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-white/90 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Store className="w-4 h-4 text-purple-400" /> Marketplace
              </h3>
              <div className="space-y-3 text-sm">
                <div className="hover:bg-white/5 p-2 -mx-2 rounded-lg cursor-pointer transition-colors">
                  <p className="text-white/80 font-medium">Selling IKEA Bookshelf</p>
                  <p className="text-white/40 text-xs">₹2,500 • Tower B</p>
                </div>
                <div className="hover:bg-white/5 p-2 -mx-2 rounded-lg cursor-pointer transition-colors">
                  <p className="text-white/80 font-medium">Looking for Math Tutor</p>
                  <p className="text-white/40 text-xs">Grade 8 • Tower A</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
