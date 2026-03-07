import React from 'react';

interface BrutalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'outline';
}

export default function BrutalButton({ children, className = '', ...props }: BrutalButtonProps) {
  return (
    <button
      className={`btn-brutal ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
