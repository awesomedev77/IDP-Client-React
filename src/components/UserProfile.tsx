type props = {
  name: string;
  location?: string;
};

export const UserProfile: React.FC<props> = ({ name, location }) => {
  const removeMrPrefix = (name: string): string => {
    // Regular expression to match 'Mr.' at the beginning of the string
    // '^' anchors to the start of the string
    // '\s*' allows for any number of whitespace characters following 'Mr.'
    const prefixRegex = /^mr\.\s*/i; // 'i' makes it case-insensitive

    // Remove 'Mr.' if it exists and trim the result
    return name.replace(prefixRegex, '').trim();
  }
  return (
    <div className="p-[18px] flex flex-row gap-3 bg-[#fff] border-[1px] items-center rounded-xl border-[#ECECEC] card-shadow">
      <img
        alt="avatarimage"
        src={`https://ui-avatars.com/api/?length=2&rounded=true&bold=true&name=${removeMrPrefix(name)}`}
        className="w-12 h-12"
      />
      <div className="flex flex-col gap-1 my-auto">
        <p className="text-[16px] font-semibold leading-normal overflow-hidden line-clamp-2 break-all">
          {removeMrPrefix(name)}
        </p>
        <p className="text-[14px] font-semibold leading-normal text-[#656F93]">
          {location}
        </p>
      </div>
    </div>
  );
};
