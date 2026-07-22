import { FiCalendar } from "react-icons/fi";

interface Props {
  type: string;

  allowed: number;

  used: number;

  remaining: number;
}

const LeaveCard = ({
  type,

  allowed,

  used,

  remaining,
}: Props) => {
  const percentage = allowed ? (used / allowed) * 100 : 0;

  return (
    <div
      className="
bg-white
rounded-2xl
shadow-sm
p-6
"
    >
      <div
        className="
flex
justify-between
"
      >
        <h2
          className="
capitalize
font-bold
text-xl
"
        >
          {type}
        </h2>

        <FiCalendar />
      </div>

      <div
        className="
mt-5
"
      >
        <div
          className="
h-2
bg-slate-100
rounded-full
"
        >
          <div
            className="
h-full
bg-blue-600
rounded-full
"

            style={{
              width: `${percentage}%`,
            }}
          />
        </div>
      </div>

      <div
        className="
mt-5
grid
grid-cols-2
gap-3
"
      >
        <div
          className="
bg-green-50
p-3
rounded-xl
"
        >
          <p>Remaining</p>

          <h3
            className="
text-2xl
font-bold
"
          >
            {remaining}
          </h3>
        </div>

        <div
          className="
bg-yellow-50
p-3
rounded-xl
"
        >
          <p>Used</p>

          <h3
            className="
text-2xl
font-bold
"
          >
            {used}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default LeaveCard;
