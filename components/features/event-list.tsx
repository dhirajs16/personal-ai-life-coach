import { Calendar as CalendarIcon, Clock } from 'lucide-react';
import { Event } from '@/lib/mock-data';
import { withInteractable } from '@tambo-ai/react';

// Define a type that allows strings for dates, compatible with JSON serialization
type SerializableEvent = Omit<Event, 'start' | 'end'> & {
  start: string | Date;
  end: string | Date;
};

function EventListBase({ events = [] }: { events?: SerializableEvent[] }) {
  if (!events || events.length === 0) {
    return (
        <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl p-6 text-center text-zinc-500">
            <p>No events scheduled.</p>
        </div>
    );
  }
  return (
    <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-4 text-zinc-500">
        <CalendarIcon className="w-4 h-4" />
        <span className="text-xs font-semibold uppercase tracking-wider">Today's Schedule</span>
      </div>
      <div className="space-y-4">
        {events.map((event) => {
            const startDate = new Date(event.start);
            const endDate = new Date(event.end);
            
            return (
                <div key={event.id} className="flex gap-4 relative pl-4 border-l-2 border-zinc-200 dark:border-zinc-800">
                    <div className="flex-1">
                        <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">{event.title}</h4>
                        <div className="flex items-center gap-1.5 mt-1 text-sm text-zinc-500">
                            <Clock className="w-3.5 h-3.5" />
                            <span>
                                {startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                 - 
                                {endDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                    </div>
                </div>
            );
        })}
      </div>
    </div>
  );
}

export const EventList = withInteractable(EventListBase, {
  componentName: "EventList",
  description: "A list of upcoming events",
});
