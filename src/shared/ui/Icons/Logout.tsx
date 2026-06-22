import React from 'react';

interface LogoutIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  color?: string;
}

const LogoutIcon: React.FC<LogoutIconProps> = ({
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
        d="M6.826 20h.126c4.324 0 6.407-1.704 6.768-5.52a.73.73 0 0 0-.662-.8.745.745 0 0 0-.799.663c-.282 3.057-1.723 4.196-5.316 4.196h-.127c-3.963 0-5.365-1.402-5.365-5.365V6.826c0-3.963 1.402-5.365 5.365-5.365h.127c3.612 0 5.053 1.158 5.316 4.274.049.4.39.701.799.662a.73.73 0 0 0 .671-.788C13.4 1.733 11.305 0 6.952 0h-.126C2.045 0 0 2.045 0 6.826v6.348C0 17.955 2.045 20 6.826 20"
      />
      <path
        fill={color}
        d="M7.06 10.73h11.08c.4 0 .73-.33.73-.73s-.33-.73-.73-.73H7.06c-.4 0-.73.33-.73.73s.33.73.73.73"
      />
      <path
        fill={color}
        d="M15.97 13.992c.184 0 .37-.068.515-.214l3.262-3.262a.735.735 0 0 0 0-1.032l-3.262-3.262a.735.735 0 0 0-1.032 0 .735.735 0 0 0 0 1.032L18.2 10l-2.746 2.746a.735.735 0 0 0 0 1.032.7.7 0 0 0 .516.214"
      />
    </svg>
  );
};

export default LogoutIcon;