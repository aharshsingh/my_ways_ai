import React from "react";

export default function SendingAnswer() {
  return (
    <div className="items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 320 120"
        className="h-32 w-[75vw]"
        fill="none"
        stroke="#5862b2"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow
              dx="0"
              dy="0"
              stdDeviation="3"
              floodColor="#5862b2"
              floodOpacity="0.6"
            />
          </filter>
          <linearGradient id="waveGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#5862b2" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#a1aaff" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* Original group at (50,60) unchanged */}
        <g transform="translate(50,60)">
          <rect
            x="-10"
            y="-30"
            width="20"
            height="40"
            rx="10"
            ry="10"
            fill="#f0f4ff"
            stroke="#5862b2"
            strokeWidth="3"
          />
          <rect
            x="-4"
            y="-10"
            width="8"
            height="20"
            rx="3"
            ry="3"
            fill="#5862b2"
          />
          <line
            x1="0"
            y1="10"
            x2="0"
            y2="30"
            stroke="#5862b2"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <line
            x1="-15"
            y1="30"
            x2="15"
            y2="30"
            stroke="#5862b2"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </g>

        {/* Changed line animation to reverse direction */}
        <g
          transform="translate(70, 60)"
          filter="url(#glow)"
          stroke="url(#waveGrad)"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        >
          {[0, 15, 30, 45, 60].map((x, i) => (
            <line key={i} x1={x} y1="20" x2={x} y2="0">
              <animate
                attributeName="y1"
                values="20;10;20"
                dur={`${0.7 + i * 0.1}s`}
                repeatCount="indefinite"
                begin={`${i * 0.1}s`}
              />
            </line>
          ))}
        </g>

        {/* Wave path */}
        <path
          stroke="url(#waveGrad)"
          strokeWidth="3"
          fill="none"
          d="
          M 90 60 
          C 100 40, 110 80, 120 60
          S 140 40, 150 60
          S 170 80, 180 60
          S 200 40, 210 60
          S 230 80, 240 60
        "
        >
          <animate
            attributeName="stroke-dashoffset"
            from="100"
            to="0"
            dur="4s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-dasharray"
            values="10 30;30 10;10 30"
            dur="3s"
            repeatCount="indefinite"
          />
        </path>

        {/* Last group at (260,50) unchanged */}
        <g transform="translate(260,37)" filter="url(#glow)">
          <rect
            x="-20"
            y="0"
            width="40"
            height="50"
            rx="5"
            ry="5"
            fill="#f0f4ff"
            stroke="#5862b2"
            strokeWidth="3"
          />
          <rect x="-12" y="8" width="8" height="6" fill="#5862b2" />
          <rect x="4" y="8" width="8" height="6" fill="#5862b2" />
          <rect x="-12" y="20" width="24" height="20" fill="#d0d7ff" />
          <line
            x1="-12"
            y1="30"
            x2="12"
            y2="30"
            stroke="#5862b2"
            strokeWidth="1"
          />
          <line
            x1="-12"
            y1="40"
            x2="12"
            y2="40"
            stroke="#5862b2"
            strokeWidth="1"
          />
          <circle
            cx="0"
            cy="25"
            r="4"
            stroke="#5862b2"
            strokeWidth="2"
            fill="none"
          >
            <animate
              attributeName="r"
              values="4;6;4"
              dur="2s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="stroke-width"
              values="2;4;2"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      </svg>
    </div>
  );
}

{/* <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 120 120"
  className="h-32 w-32"
>
  <defs>
    <filter id="strong-glow" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="0" stdDeviation="3" flood-color="#5862b2" flood-opacity="0.8" />
    </filter>
  </defs>

  <rect x="30" y="20" width="60" height="80" rx="5" ry="5" fill="#e0e7ff" stroke="#5862b2" strokeWidth="2" />
  <line x1="40" y1="40" x2="80" y2="40" stroke="#5862b2" strokeWidth="2" />
  <line x1="40" y1="50" x2="80" y2="50" stroke="#5862b2" strokeWidth="2" />
  <line x1="40" y1="60" x2="80" y2="60" stroke="#5862b2" strokeWidth="2" />
  <line x1="40" y1="70" x2="80" y2="70" stroke="#5862b2" strokeWidth="2" />

  <g>
    <g filter="url(#strong-glow)">
      <circle r="10" fill="rgba(88, 98, 178, 0.15)">
        <animate attributeName="r" values="10;12;10" dur="1.5s" repeatCount="indefinite" />
        <animate attributeName="fill-opacity" values="0.15;0.3;0.15" dur="1.5s" repeatCount="indefinite" />
      </circle>
      <circle r="6" fill="white" stroke="#5862b2" strokeWidth="2" />
      <line x1="3" y1="3" x2="8" y2="8" stroke="#5862b2" strokeWidth="2" />
    </g>

    <animateTransform
      attributeName="transform"
      type="translate"
      values="40 30; 70 40; 50 80; 40 30"
      dur="4s"
      repeatCount="indefinite"
    />
  </g>
</svg>   */}
