import { ReactNode } from "react";

type props = {
  children: ReactNode;
  focused?: boolean;
  onClick: any;
};

export const MessageIcon: React.FC<props> = ({
  children,
  focused,
  onClick,
}) => {
  return (
    <div
      className={`flex flex-row hover:text-[#4182EB] cursor-pointer ${
        focused ? "text-[#4182EB]" : "text-[#656f93]"
      }`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
