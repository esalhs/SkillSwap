import React from 'react';

interface DoneIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  color?: string;
}

const DoneIcon: React.FC<DoneIconProps> = ({
  size = 24,
  color = 'currentColor',
  ...restProps
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 77 77"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      {...restProps}
    >
      <path d="M75.75 38.25c0 20.71-16.79 37.5-37.5 37.5S.75 58.96.75 38.25 17.54.75 38.25.75s37.5 16.79 37.5 37.5Z" />
      <path d="m25.1 39.09 6.506 6.506a4.87 4.87 0 0 0 6.887 0l14.443-14.444" />
    </svg>
  );
};

export default DoneIcon;