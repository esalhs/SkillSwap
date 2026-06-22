import React from 'react';

interface PlusCircleIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  color?: string;
}

const PlusCircleIcon: React.FC<PlusCircleIconProps> = ({
  size = 24,
  color = 'currentColor',
  ...restProps
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      {...restProps}
    >
      <path
        fill={color}
        d="M10 20C4.484 20 0 15.516 0 10S4.484 0 10 0s10 4.484 10 10-4.484 10-10 10m0-18.605c-4.744 0-8.605 3.86-8.605 8.605 0 4.744 3.86 8.605 8.605 8.605 4.744 0 8.605-3.86 8.605-8.605 0-4.744-3.86-8.605-8.605-8.605"
      />
      <path
        fill={color}
        d="M13.721 10.698H6.28A.703.703 0 0 1 5.582 10c0-.381.316-.698.697-.698h7.442c.381 0 .698.317.698.698a.703.703 0 0 1-.698.698"
      />
      <path
        fill={color}
        d="M10 14.419a.703.703 0 0 1-.698-.698V6.279c0-.381.317-.698.698-.698s.698.317.698.698v7.442a.703.703 0 0 1-.698.698"
      />
    </svg>
  );
};

export default PlusCircleIcon;