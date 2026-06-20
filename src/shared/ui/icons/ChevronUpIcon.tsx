import type { SVGProps } from 'react'

type ChevronUpProps = SVGProps<SVGSVGElement>

export const ChevronUpIcon = (props: ChevronUpProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="8"
      fill="none"
      viewBox="0 0 16 8"
      {...props}
    >
      <path
        fill="currentColor"
        d="M15.31 7.933a.69.69 0 0 1-.49-.203L8.804 1.712a1.136 1.136 0 0 0-1.606 0L1.179 7.73a.696.696 0 0 1-.978 0 .696.696 0 0 1 0-.978L6.219.734a2.53 2.53 0 0 1 3.562 0L15.8 6.752a.696.696 0 0 1 0 .978.73.73 0 0 1-.489.203"
      />
    </svg>
  )
}

export default ChevronUpIcon
