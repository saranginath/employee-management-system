import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale/en-US";

import "react-big-calendar/lib/css/react-big-calendar.css";

interface LeaveCalendarEvent {
  title: string;
  start: Date;
  end: Date;
}

interface Props {
  events?: LeaveCalendarEvent[];
  date: Date;
  onNavigate: (nextDate: Date) => void;
}

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const LeaveCalendarView = ({
  events = [],
  date,
  onNavigate,
}: Props) => {
  return (
    <Calendar
      localizer={localizer}
      date={date}
      onNavigate={onNavigate}
      events={events}
      defaultView="month"
      views={["month", "week", "day", "agenda"]}
      popup

      startAccessor="start"

      endAccessor="end"

      style={{
        height: 600,
      }}
    />
  );
};

export default LeaveCalendarView;
