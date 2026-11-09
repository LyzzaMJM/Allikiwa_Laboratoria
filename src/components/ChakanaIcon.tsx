import React from 'react';

interface ChakanaProps {
  className?: string;
  size?: number;
  color?: string;
}

export const ChakanaIcon: React.FC<ChakanaProps> = ({ 
  className = "w-6 h-6", 
  size = 24, 
  color = "currentColor" 
}) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Andean Chakana Stepped Cross */}
      <path
        d="M9 2H15V6H18V9H22V15H18V18H15V22H9V18H6V15H2V9H6V6H9V2Z"
        stroke={color}
        strokeWidth="1.8"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.15"
      />
      {/* Central circular portal / hole */}
      <circle cx="12" cy="12" r="3.2" stroke={color} strokeWidth="1.5" fill="none" />
    </svg>
  );
};
