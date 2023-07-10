export default function AlberoMonumentaleIcon({
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
        d="M6.65 2C5.43 2 4.48 3.38 4.11 3.82C4.0365 3.9102 3.9975 4.0237 4 4.14V8.54C3.9884 8.7827 4.1758 8.9889 4.4185 9.0005C4.528 9.0057 4.6355 8.9699 4.72 8.9C5.1865 8.2736 5.8789 7.8539 6.65 7.73C8.06 7.73 8.6 9 10.07 9C11.0648 8.9024 12.0115 8.5244 12.8 7.91C12.9272 7.8166 13.0016 7.6678 13 7.51V2.45C13.0275 2.2086 12.8541 1.9905 12.6126 1.963C12.5332 1.954 12.4527 1.9668 12.38 2C11.6987 2.5212 10.9094 2.8834 10.07 3.06C8.6 3.08 8.12 2 6.65 2ZM2.5 3C1.9477 3 1.5 2.5523 1.5 2C1.5 1.4477 1.9477 1 2.5 1C3.0523 1 3.5 1.4477 3.5 2C3.5 2.5523 3.0523 3 2.5 3ZM3 4V13.48C3 13.7561 2.7761 13.98 2.5 13.98C2.2239 13.98 2 13.7561 2 13.48V4C2 3.7239 2.2239 3.5 2.5 3.5C2.7761 3.5 3 3.7239 3 4Z"
        fill={fill}
      />
    </svg>
  )
}
