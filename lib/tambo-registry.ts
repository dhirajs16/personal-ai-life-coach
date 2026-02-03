import { type TamboComponent, defineTool } from "@tambo-ai/react";
import { z } from "zod";
import { WeatherCard } from "@/components/features/weather-card";
import { TodoList } from "@/components/features/todo-list";
import { EventList } from "@/components/features/event-list";
import { MOCK_EVENTS, MOCK_TASKS, MOCK_WEATHER } from "@/lib/mock-data";

export const components: TamboComponent[] = [
  {
    name: "WeatherCard",
    description: "Displays current weather. 1. Call 'getWeather'. 2. Pass the result object to 'data' prop. DO NOT PRINT JSON.",
    component: WeatherCard,
    propsSchema: z.object({
      data: z.object({
        temp: z.number().catch(0),
        condition: z.enum(['sunny', 'cloudy', 'rainy']).catch('sunny'),
        location: z.string().default('Unknown'),
      }).optional()
    })
  },
  {
    name: "TodoList",
    description: "Displays tasks. 1. Call 'getTasks'. 2. Pass the result array to 'tasks' prop. DO NOT PRINT JSON.",
    component: TodoList,
    propsSchema: z.object({
      tasks: z.array(z.object({
        id: z.string().default(""),
        title: z.string().default("Untitled Task"),
        completed: z.boolean().default(false),
        priority: z.enum(['high', 'medium', 'low']).catch('medium')
      })).optional()
    })
  },
  {
    name: "EventList",
    description: "Displays events. 1. Call 'getEvents'. 2. Pass the result array to 'events' prop. DO NOT PRINT JSON.",
    component: EventList,
    propsSchema: z.object({
      events: z.array(z.object({
        id: z.string().default(""),
        title: z.string().default("Untitled Event"),
        start: z.string().default(new Date().toISOString()), 
        end: z.string().default(new Date().toISOString()),
        type: z.enum(['work', 'personal', 'health']).catch('personal')
      })).optional()
    })
  }
];

export const tools = [
  defineTool({
    name: "getWeather",
    description: "Get current weather",
    inputSchema: z.object({}),
    tool: async () => {
        console.log("TOOL CALLED: getWeather");
        return MOCK_WEATHER;
    },
  }),
  defineTool({
    name: "getTasks",
    description: "Get user tasks",
    inputSchema: z.object({}),
    tool: async () => {
        console.log("TOOL CALLED: getTasks");
        return MOCK_TASKS;
    },
  }),
  defineTool({
    name: "getEvents",
    description: "Get calendar events",
    inputSchema: z.object({}),
    tool: async () => {
        console.log("TOOL CALLED: getEvents");
        return MOCK_EVENTS.map(e => ({
            ...e,
            start: e.start.toISOString(),
            end: e.end.toISOString()
        }));
    },
  })
];
