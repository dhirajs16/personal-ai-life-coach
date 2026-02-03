'use client';

import { useTamboThread, useTamboThreadInput } from '@tambo-ai/react';
import { Send, User, Bot, Loader2 } from 'lucide-react';
import { useRef, useEffect } from 'react';

export function ChatInterface() {
  const { thread } = useTamboThread();
  const { value, setValue, submit, isPending } = useTamboThreadInput();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [thread.messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    
    // We add a system prompt hint contextually if needed, but for now just raw input
    // The registry tools (getWeather etc) will be called by the AI automatically
    await submit();
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-zinc-950 border-l border-zinc-200 dark:border-zinc-800 shadow-xl">
      {/* Header */}
      <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
            AI
        </div>
        <div>
            <h2 className="font-semibold text-sm">Life Coach</h2>
            <p className="text-xs text-zinc-500">Online</p>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-6">
        {thread.messages.length === 0 && (
            <div className="text-center text-zinc-400 text-sm mt-10">
                <p>No messages yet.</p>
            </div>
        )}
        
        {thread.messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
             <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                 msg.role === 'user' ? 'bg-zinc-200 dark:bg-zinc-800' : 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600'
             }`}>
                {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
             </div>
             <div className={`flex flex-col max-w-[85%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`px-4 py-2 rounded-2xl text-sm ${
                    msg.role === 'user' 
                    ? 'bg-zinc-900 text-white dark:bg-white dark:text-black rounded-tr-none' 
                    : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 rounded-tl-none'
                }`}>
                    {/* Handle simple text or array content from SDK */}
                    {typeof msg.content === 'string' 
                        ? msg.content 
                        : Array.isArray(msg.content)
                            ? msg.content.map((c: any, i: number) => c.text || '').join('')
                            : ''}
                </div>
             </div>
          </div>
        ))}
        {isPending && (
            <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 flex items-center justify-center">
                    <Loader2 className="w-4 h-4 animate-spin" />
                </div>
                <div className="bg-zinc-100 dark:bg-zinc-900 px-4 py-2 rounded-2xl rounded-tl-none text-sm text-zinc-500 italic">
                    Thinking...
                </div>
            </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
        <form onSubmit={handleSubmit} className="relative">
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Type a message..."
                disabled={isPending}
                className="w-full pl-4 pr-12 py-3 bg-zinc-100 dark:bg-zinc-900 rounded-xl border-none focus:ring-2 focus:ring-indigo-500 text-sm"
            />
            <button 
                type="submit" 
                disabled={isPending || !value.trim()}
                className="absolute right-2 top-2 p-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600 transition-colors"
            >
                <Send className="w-4 h-4" />
            </button>
        </form>
      </div>
    </div>
  );
}
