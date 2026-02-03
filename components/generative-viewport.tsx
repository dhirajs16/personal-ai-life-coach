'use client';

import { useTamboThread } from '@tambo-ai/react';
import { Sparkles } from 'lucide-react';

export function GenerativeViewport() {
  const { thread } = useTamboThread();

  // Get the last message that has a component
  const lastComponentMessage = [...thread.messages].reverse().find(m => m.renderedComponent);

  return (
    <div className="w-full h-full flex items-center justify-center p-8 bg-zinc-50/50 dark:bg-zinc-900/50">
      <div className="w-full max-w-2xl min-h-[400px] transition-all duration-500 ease-in-out">
        {!lastComponentMessage ? (
            <div className="flex flex-col items-center justify-center h-[400px] gap-4 text-zinc-400">
                <div className="p-4 bg-white dark:bg-zinc-800 rounded-full shadow-sm">
                    <Sparkles className="w-8 h-8 text-indigo-500" />
                </div>
                <div className="text-center">
                    <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">Ready to help</h3>
                    <p className="text-sm">Ask me to check on your day...</p>
                </div>
            </div>
        ) : (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                {lastComponentMessage.renderedComponent}
            </div>
        )}
      </div>
    </div>
  );
}
