import { GenerativeViewport } from '@/components/generative-viewport';
import { ChatInterface } from '@/components/chat-interface';

export default function Home() {
  return (
    <main className="flex h-screen flex-col bg-zinc-50 dark:bg-black overflow-hidden">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Personal AI Life Coach
        </p>
      </div>

      <div className="flex-1 w-full flex overflow-hidden">
        {/* Generative UI Viewport (Left 2/3) */}
        <div className="flex-1 relative flex flex-col h-full border-r border-zinc-200 dark:border-zinc-800">
            <GenerativeViewport />
        </div>

        {/* Chat Interface (Right 1/3) */}
        <div className="w-full lg:w-1/3 h-full">
            <ChatInterface />
        </div>
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
      </div>
    </main>
  );
}
