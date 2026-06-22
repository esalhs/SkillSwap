import React from 'react';

interface LifestyleIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  color?: string;
}

export const LifestyleIcon: React.FC<LifestyleIconProps> = ({
  size = 24,
  color = 'currentColor',
  ...restProps
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 20 19"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...restProps}
    >
      <path d="M12.573 5.387C8.735 2.908 4.764 4.687 1.095.803.24-.104.737 10.969 5.33 15.164c3.358 3.065 8.542 2.723 10.29-.255 1.749-2.979.79-7.044-3.047-9.522" />
      <path d="M6.145 8.909c3.712 3.496 7.554 5.568 12.605 6.345" />
    </svg>
  );
};
