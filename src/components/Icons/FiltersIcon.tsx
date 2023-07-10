export default function FiltersIcon({ fill = 'white' }: { fill?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M8.89583 17.5V12.8125H10.1458V14.5417H17.5V15.7917H10.1458V17.5H8.89583ZM2.5 15.7917V14.5417H7.64583V15.7917H2.5ZM6.39583 12.3333V10.625H2.5V9.375H6.39583V7.625H7.64583V12.3333H6.39583ZM8.89583 10.625V9.375H17.5V10.625H8.89583ZM12.3542 7.1875V2.5H13.6042V4.20833H17.5V5.45833H13.6042V7.1875H12.3542ZM2.5 5.45833V4.20833H11.1042V5.45833H2.5Z"
        fill={fill}
      />
    </svg>
  )
}
