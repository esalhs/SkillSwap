import type { SVGProps } from 'react'

type SearchProps = SVGProps<SVGSVGElement>

export const SearchIcon = (props: SearchProps) => {
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
        d="M9.535 19.07C4.279 19.07 0 14.79 0 9.535 0 4.279 4.28 0 9.535 0c5.256 0 9.535 4.28 9.535 9.535 0 5.256-4.28 9.535-9.535 9.535m0-17.675c-4.493 0-8.14 3.656-8.14 8.14s3.647 8.14 8.14 8.14 8.14-3.656 8.14-8.14-3.647-8.14-8.14-8.14M19.302 20a.7.7 0 0 1-.493-.205l-1.86-1.86a.7.7 0 0 1 0-.986c.27-.27.716-.27.986 0l1.86 1.86c.27.27.27.717 0 .986a.7.7 0 0 1-.493.205"
      />
    </svg>
  )
}

export default SearchIcon
