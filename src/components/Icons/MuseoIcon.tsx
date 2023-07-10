export default function MuseoIcon({ fill = 'white' }: { fill?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
    >
      <path
        d="M7.5 0L1 3.5V4H14V3.5L7.5 0ZM2 5V10L1 11.6V13H14V11.6L13 10V5H2ZM4 6H5V11.5H4V6ZM7 6H8V11.5H7V6ZM10 6H11V11.5H10V6Z"
        fill={fill}
      />
    </svg>
  )
}
