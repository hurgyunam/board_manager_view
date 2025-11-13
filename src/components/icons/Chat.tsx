"use client";

import { useState } from "react";

export default function IconChat({ stroke }: { stroke?: string }) {
  const [strokeColorCode, setStrokeColorCode] = useState<string>(
    stroke === "primary2" ? "#F48023" : "#808080"
  );

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M14.5 7.37502C14.5026 8.36492 14.2713 9.34144 13.825 10.225C13.2959 11.2838 12.4823 12.1744 11.4756 12.797C10.4689 13.4196 9.30871 13.7496 8.12503 13.75C7.13513 13.7526 6.15862 13.5213 5.27503 13.075L1.00003 14.5L2.42503 10.225C1.97873 9.34144 1.74745 8.36492 1.75003 7.37502C1.75049 6.19134 2.08049 5.03116 2.70307 4.02443C3.32565 3.01771 4.21622 2.2042 5.27503 1.67502C6.15862 1.22872 7.13513 0.99744 8.12503 1.00002H8.50003C10.0633 1.08627 11.5398 1.74609 12.6469 2.85317C13.754 3.96024 14.4138 5.43676 14.5 7.00002V7.37502Z"
        stroke={strokeColorCode}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
