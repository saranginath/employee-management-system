import { useMemo, useState } from "react";
import { endOfMonth, startOfMonth } from "date-fns";
import { useGetLeaveCalendarQuery } from "../../features/leave/leaveApi";
import type { Leave } from "../../features/leave/types";

import LeaveCalendarView from "../../components/leave/LeaveCalendarView";

const LeaveCalendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const queryRange = useMemo(() => {
        const monthStart = startOfMonth(currentDate);
        const monthEnd = endOfMonth(currentDate);

        return {
            start: monthStart.toISOString(),
            end: monthEnd.toISOString(),
        };
    }, [currentDate]);

    const { data, isLoading } = useGetLeaveCalendarQuery(queryRange);

    const events =
        data?.data?.map((leave: Leave) => ({
            title: `${leave.type} Leave`,

            start: new Date(leave.startDate),

            end: new Date(leave.endDate),
        })) || [];

    return (
        <div>
            <h1
                className="
text-3xl
font-bold
mb-6
"
            >
                Leave Calendar
            </h1>

            <div
                className="
bg-white
rounded-xl
p-6
"
            >
                {isLoading ? (
                    <p className="text-slate-500">Loading calendar...</p>
                ) : (
                    <LeaveCalendarView
                        date={currentDate}
                        onNavigate={setCurrentDate}
                        events={events}
                    />
                )}
            </div>
        </div>
    );
};

export default LeaveCalendar;
