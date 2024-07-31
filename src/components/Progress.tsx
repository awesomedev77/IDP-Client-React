type props = {
    name: string;
    color: string;
    value: number;
  };
  
  export const Progress: React.FC<props> = ({ name, color, value }) => {
    return (
      <div className="py-6 px-[18px] flex flex-col gap-1 bg-[#fff] border-[1px] rounded-xl border-[#ECECEC] card-shadow">
        <div className="flex flex-col gap-2 my-auto">
          <p className="text-[16px] font-semibold leading-normal ">
            {name}
          </p>
          <div className="bg-[#F3F4F7] rounded-full">
            <div className="h-3 rounded-full" style={{width: `${value}%`, background: `${color}`}}>

            </div>
          </div>
        </div>
      </div>
    );
  };
  