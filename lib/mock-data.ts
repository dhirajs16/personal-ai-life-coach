export type Event = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  type: 'work' | 'personal' | 'health';
};

export type Task = {
  id: string;
  title: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
};

export type Weather = {
  temp: number;
  condition: 'sunny' | 'cloudy' | 'rainy';
  location: string;
};

export const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Morning Yoga',
    start: new Date(new Date().setHours(7, 0, 0, 0)),
    end: new Date(new Date().setHours(8, 0, 0, 0)),
    type: 'health',
  },
  {
    id: '2',
    title: 'Team Sync',
    start: new Date(new Date().setHours(10, 0, 0, 0)),
    end: new Date(new Date().setHours(11, 0, 0, 0)),
    type: 'work',
  },
  {
    id: '3',
    title: 'Lunch with Sarah',
    start: new Date(new Date().setHours(12, 30, 0, 0)),
    end: new Date(new Date().setHours(13, 30, 0, 0)),
    type: 'personal',
  },
];

export const MOCK_TASKS: Task[] = [
  { id: '1', title: 'Finish project proposal', completed: false, priority: 'high' },
  { id: '2', title: 'Buy groceries', completed: false, priority: 'medium' },
  { id: '3', title: 'Call mom', completed: true, priority: 'low' },
];

export const MOCK_WEATHER: Weather = {
  temp: 72,
  condition: 'sunny',
  location: 'San Francisco, CA',
};

export async function getContext() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
        events: MOCK_EVENTS,
        tasks: MOCK_TASKS,
        weather: MOCK_WEATHER,
        userState: 'focused' // 'focused' | 'relaxing' | 'moving'
    };
}
