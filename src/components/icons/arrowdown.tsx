export const ArrowDownIcon = ({selected} : {selected?: boolean}) => {
  return (
    <svg
      width="12"
      height="7"
      viewBox="0 0 12 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.3333 0.74292H0.666626L5.99983 6.57892L11.3333 0.74292Z"
        fill={`${selected ? '#4182EB' : '#656F9380'}`}
        className=""
      />
    </svg>
  );
};
