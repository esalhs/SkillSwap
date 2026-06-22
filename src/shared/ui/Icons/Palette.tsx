import React from 'react';

interface PaletteIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  color?: string;
}

const PaletteIcon: React.FC<PaletteIconProps> = ({
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
        d="M13.404 6.534a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5M8.906 5.721a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5M5.404 8.44a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5M4.435 12.656a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5M6.654 16.448a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5"
      />
      <path
        stroke={color}
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M19.25 10A9.25 9.25 0 1 0 10 19.25c1.318 0 2.224-1.28 2.329-2.594l.117-1.473a3 3 0 0 1 2.758-2.752l1.651-.129c1.28-.1 2.395-1.019 2.395-2.302Z"
      />
    </svg>
  );
};

export default PaletteIcon;