export default function MapIcon({
  fill = 'var(--primary)',
}: {
  fill?: string
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M12.75 17.5L7.27083 15.5625L3.54167 17.0417C3.30556 17.1667 3.07292 17.1597 2.84375 17.0208C2.61458 16.8819 2.5 16.6736 2.5 16.3958V4.77083C2.5 4.59028 2.55208 4.43056 2.65625 4.29167C2.76042 4.15278 2.89583 4.04861 3.0625 3.97917L7.27083 2.5L12.75 4.41667L16.4583 2.9375C16.6944 2.82639 16.9271 2.83681 17.1562 2.96875C17.3854 3.10069 17.5 3.30556 17.5 3.58333V15.3542C17.5 15.5069 17.4479 15.6389 17.3438 15.75C17.2396 15.8611 17.1111 15.9444 16.9583 16L12.75 17.5ZM12.0417 15.9375V5.41667L7.95833 4.04167V14.5625L12.0417 15.9375ZM13.2917 15.9375L16.25 14.9583V4.29167L13.2917 5.41667V15.9375ZM3.75 15.6875L6.70833 14.5625V4.04167L3.75 5.02083V15.6875Z"
        fill={fill}
      />
    </svg>
  )
}
