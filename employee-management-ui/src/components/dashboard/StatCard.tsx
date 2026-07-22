interface Props {
  title: string;
  value: number | string;
  icon: React.ReactNode;
}

const StatCard = ({ title, value, icon }: Props) => {
  return (
    <div
      className="
bg-white
rounded-xl
shadow
p-5
flex
justify-between
items-center
"
    >
      <div>
        <p className="text-gray-500">{title}</p>

        <h2
          className="
text-3xl
font-bold
"
        >
          {value}
        </h2>
      </div>

      <div
        className="
text-blue-600
text-3xl
"
      >
        {icon}
      </div>
    </div>
  );
};

export default StatCard;
