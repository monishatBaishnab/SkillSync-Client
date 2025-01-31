"use client";

import { useNextCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import {
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import { createEventModalPlugin } from "@schedule-x/event-modal";
import "@schedule-x/theme-default/dist/index.css";
import { useEffect } from "react";

// Fix: Explicitly type the calendar with assertion
function EmptyScheduler() {
  const plugins = [createEventModalPlugin(), createEventsServicePlugin()];

  const calendar = useNextCalendarApp(
    {
      views: [createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
      events: [],
    },
    plugins,
  ) as typeof useNextCalendarApp extends (...args: any) => infer R
    ? R & { eventsService?: any }
    : never;

  useEffect(() => {
    if (calendar?.eventsService) {
      calendar.eventsService.getAll();
    }
  }, [calendar]);

  return (
    <div className="max-w-full h-[500px]">
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  );
}

export default EmptyScheduler;
