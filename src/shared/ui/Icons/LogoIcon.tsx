import type { SVGProps } from 'react'

export type LogoIconProps = SVGProps<SVGSVGElement>

export const LogoIcon = (props: LogoIconProps) => {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <rect width="40" height="40" fill="currentColor" rx="20" />
      <path
        fill="#f9faf7"
        d="M20 10s.552 5.15 2.7 7.3C24.85 19.447 30 20 30 20s-5.15.552-7.3 2.7C20.553 24.85 20 30 20 30s-.552-5.15-2.7-7.3C15.15 20.553 10 20 10 20s5.15-.552 7.3-2.7C19.447 15.15 20 10 20 10"
      />
    </svg>
  )
}
