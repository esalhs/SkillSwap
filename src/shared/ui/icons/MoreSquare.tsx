import type { SVGProps } from 'react'

type MoreSquareProps = SVGProps<SVGSVGElement>

export const MoreSquare = (props: MoreSquareProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 20 20"
      {...props}
    >
      <path
        fill="currentColor"
        d="M12.79 20H7.21C2.157 20 0 17.842 0 12.79V7.21C0 2.157 2.158 0 7.21 0h5.58C17.843 0 20 2.158 20 7.21v5.58c0 5.052-2.158 7.21-7.21 7.21M7.21 1.395c-4.29 0-5.815 1.526-5.815 5.814v5.582c0 4.288 1.526 5.814 5.814 5.814h5.582c4.288 0 5.814-1.526 5.814-5.814V7.209c0-4.288-1.526-5.814-5.814-5.814z"
      />
      <path
        fill="currentColor"
        d="M10 10.93a.927.927 0 0 1-.93-.93c0-.511.418-.93.93-.93s.93.419.93.93-.41.93-.93.93M13.72 10.93a.927.927 0 0 1-.93-.93c0-.511.42-.93.93-.93.513 0 .931.419.931.93s-.41.93-.93.93M6.28 10.93a.927.927 0 0 1-.931-.93c0-.511.418-.93.93-.93s.93.419.93.93-.409.93-.93.93"
      />
    </svg>
  )
}

export default MoreSquare
