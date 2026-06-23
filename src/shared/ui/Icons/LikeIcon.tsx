type LikeIconProps = {
  color?: string
  active?: boolean
}

export function LikeIcon({ color = '#253017', active = false }: LikeIconProps) {
  return (
    <>
      {!active && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            fill={color}
            d="M12 20.954a2.4 2.4 0 0 1-.8-.121C7.647 19.614 2 15.288 2 8.898 2 5.642 4.633 3 7.87 3A5.78 5.78 0 0 1 12 4.712 5.78 5.78 0 0 1 16.13 3C19.367 3 22 5.651 22 8.898c0 6.4-5.646 10.716-9.2 11.935a2.4 2.4 0 0 1-.8.12M7.87 4.394c-2.465 0-4.475 2.019-4.475 4.503 0 6.353 6.112 9.888 8.26 10.623.168.056.531.056.699 0 2.139-.735 8.26-4.26 8.26-10.623 0-2.484-2.01-4.503-4.474-4.503A4.42 4.42 0 0 0 12.567 6.2c-.26.353-.855.353-1.116 0A4.44 4.44 0 0 0 7.87 4.395"
          />
        </svg>
      )}

      {active && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            fill={color}
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7.95 4C5.216 4 3 6.152 3 8.807 3 13.614 8.85 17.983 12 19c3.15-1.017 9-5.386 9-10.193C21 6.152 18.784 4 16.05 4A4.99 4.99 0 0 0 12 6.042 4.99 4.99 0 0 0 7.95 4"
          />
        </svg>
      )}
    </>
  )
}

export default LikeIcon
