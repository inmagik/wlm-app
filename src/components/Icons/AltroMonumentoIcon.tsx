export default function AltroMonumentoIcon({
  fill = 'white',
}: {
  fill?: string
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
    >
      <path
        d="M7.5 0L6 2.5V9.5H9V2.5L7.5 0ZM3 11.5V15H12V11.5L10.5 10H4.5L3 11.5Z"
        fill={fill}
      />
    </svg>
  )
}
