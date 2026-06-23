import type { SVGProps } from 'react'

export type NavigationIconProps = SVGProps<SVGSVGElement>

export const NavigationIcon = (props: NavigationIconProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 32 32" {...props}>
      <rect width="32" height="32" fill="#e4e8df" rx="16" transform="matrix(-1 0 0 1 32 0)"/>
      <path fill="#69735d" d="M13.793 21.333a.46.46 0 0 1-.326-.135.464.464 0 0 1 0-.652l4.012-4.012a.76.76 0 0 0 0-1.07l-4.012-4.011a.464.464 0 0 1 0-.653.464.464 0 0 1 .652 0l4.012 4.012c.314.314.492.738.492 1.187s-.172.874-.492 1.188l-4.011 4.01a.48.48 0 0 1-.327.136"/>
    </svg>
  )
}