export const ArrowUpIcon = ({selected} : {selected?: boolean}) => {
  return (
    <svg
      width="12"
      height="7"
      viewBox="0 0 12 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.666626 6.23077H11.3333L6.00008 0.421143L0.666626 6.23077Z"
        fill={`${selected ? '#4182EB' : '#656F9380'}`}
        className=""
      />
    </svg>
  );
};
