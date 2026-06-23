type CheckboxCategoryIconProps = {
  color?: string
  active?: boolean
}

export function CheckboxCategoryIcon({
  color = '#253017',
  active = false,
}: CheckboxCategoryIconProps) {
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
            stroke="#000"
            d="M9.209 2.5h5.582c2.468 0 4.11.53 5.145 1.564S21.5 6.741 21.5 9.21v5.582c0 2.468-.53 4.11-1.564 5.145S17.259 21.5 14.79 21.5H9.209c-2.468 0-4.11-.53-5.145-1.564S2.5 17.259 2.5 14.79V9.209c0-2.468.53-4.11 1.564-5.145S6.741 2.5 9.21 2.5Zm0 .396c-2.18 0-3.805.382-4.868 1.445S2.896 7.03 2.896 9.209v5.582c0 2.18.382 3.805 1.445 4.868s2.689 1.446 4.868 1.446h5.582c2.18 0 3.805-.383 4.868-1.446s1.446-2.689 1.446-4.868V9.209c0-2.18-.383-3.805-1.446-4.868s-2.689-1.445-4.868-1.445z"
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
            d="M14.791 2C19.841 2 22 4.158 22 9.209v5.582C22 19.841 19.842 22 14.791 22H9.209C4.159 22 2 19.842 2 14.791V9.209C2 4.159 4.158 2 9.209 2zM8 11.25c-.41 0-.75.34-.75.75s.34.75.75.75h8c.41 0 .75-.34.75-.75s-.34-.75-.75-.75z"
          />
        </svg>
      )}
    </>
  )
}

export default CheckboxCategoryIcon
