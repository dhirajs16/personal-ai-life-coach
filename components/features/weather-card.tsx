import { Cloud, Sun, CloudRain } from 'lucide-react';
import { Weather } from '@/lib/mock-data';

export function WeatherCard({ data }: { data?: Weather }) {
  if (!data) return null;
  return (
    <div className="bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-2xl p-6 shadow-lg transform transition-all hover:scale-105">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold opacity-90">{data.location}</h3>
          <p className="text-5xl font-bold mt-2">{data.temp}°</p>
        </div>
        <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
            {/* Lucide icons */}
            <Sun className="w-8 h-8 text-yellow-300" />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2 text-sm font-medium opacity-80">
        <span>{data.condition.charAt(0).toUpperCase() + data.condition.slice(1)}</span>
        <span>•</span>
        <span>High 75° / Low 60°</span>
      </div>
    </div>
  );
}
