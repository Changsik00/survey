import { ReactNode } from 'react';

import { cn } from '@/utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  primary?: boolean;
  className?: string;
  children?: ReactNode;
}

export const Button = ({ primary = false, className, children, ...props }: ButtonProps) => {
  const buttonClasses = cn(
    'px-4 py-2 rounded cursor-pointer',
    primary ? 'bg-purple-600 text-white hover:bg-purple-700' : 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    className
  );

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
};
