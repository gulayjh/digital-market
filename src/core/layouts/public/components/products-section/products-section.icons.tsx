export const ArrowRightCircle = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    className="arrowCircleSvg"
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      fill="white"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <g className="arrowShape">
      {/* Curved shaft: arcs from left toward right, arrowhead at right */}
      <path
        d="M8 12.5 Q12 8 16 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M14 10.5 L17 12 L14 13.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </g>
  </svg>
);
