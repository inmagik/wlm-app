export default function EdificioReligiosoIcon({
  fill = 'white',
}: {
  fill?: string
}) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
    >
      <path
        d="M7.5 0L5.5 2V4H9.5V2L7.5 0ZM5.5 4.5L4 6H11L9.5 4.5H5.5ZM2 6.5C1.4477 6.5 1 6.9477 1 7.5V13H3V7.5C3 6.9477 2.5523 6.5 2 6.5ZM4 6.5V13H11V6.5H4ZM13 6.5C12.4477 6.5 12 6.9477 12 7.5V13H14V7.5C14 6.9477 13.5523 6.5 13 6.5Z"
        fill={fill}
      />
    </svg>
  )
}
