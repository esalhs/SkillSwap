import React from 'react';

interface HomeIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  color?: string;
}

const HomeIcon: React.FC<HomeIconProps> = ({
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
        d="M15.386 20H4.614C2.065 20 0 17.923 0 15.372v-6.9c0-1.267.781-2.86 1.786-3.642L6.8.919c1.507-1.174 3.916-1.23 5.48-.13l5.748 4.032C19.135 5.594 20 7.25 20 8.6v6.78A4.62 4.62 0 0 1 15.386 20M7.656 2.018l-5.014 3.91c-.66.522-1.247 1.705-1.247 2.543v6.9a3.23 3.23 0 0 0 3.219 3.232h10.772a3.22 3.22 0 0 0 3.219-3.222v-6.78c0-.893-.642-2.132-1.377-2.635l-5.749-4.032c-1.06-.745-2.81-.708-3.823.084"
      />
      <path
        fill={color}
        d="M10 16.75c-.41 0-.75-.34-.75-.75v-3c0-.41.34-.75.75-.75s.75.34.75.75v3c0 .41-.34.75-.75.75"
      />
    </svg>
  );
};

export default HomeIcon;