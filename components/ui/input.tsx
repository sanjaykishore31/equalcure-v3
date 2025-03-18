import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, value, defaultValue, ...props }, ref) => {
    // Ensure the component is consistently controlled or uncontrolled
    // by providing an empty string as the default value when value is undefined
    const inputValue = value === undefined ? undefined : (value || '');
    const inputDefaultValue = defaultValue === undefined ? undefined : (defaultValue || '');
    
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        value={inputValue}
        defaultValue={inputDefaultValue}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
