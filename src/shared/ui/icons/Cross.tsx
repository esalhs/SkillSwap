type CrossProps = {
  color?: string
}

export function Cross({ color = '#253017' }: CrossProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" fill="none" viewBox="0 0 11 11">
      <path
        fill={color}
        d="m10.076 1.592-8.485 8.485c-.29.29-.77.29-1.06 0a.755.755 0 0 1 0-1.06L9.015.53c.29-.29.77-.29 1.06 0s.29.771 0 1.06"
      />
      <path
        fill={color}
        d="M10.076 10.076c-.29.29-.77.29-1.06 0L.53 1.591a.755.755 0 0 1 0-1.06c.29-.29.771-.29 1.061 0l8.485 8.484c.29.29.29.771 0 1.061"
      />
    </svg>
  )
}

export default Cross
