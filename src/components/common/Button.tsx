import * as React from "react"
import clsx from "clsx"

// We'll just define the styles without relying on class-variance-authority package if it's not installed
// The user strictly forbade UI libraries but standard components with clsx is fine.
// Wait, they said `clsx` for conditional classes. I will just use a simple function since I don't have CVA.

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
}

const getButtonStyles = (variant: ButtonVariant = 'primary', size: ButtonSize = 'md', className?: string) => {
  const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-xl font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50";
  
  const variants = {
    primary: "neo-button text-[#3f51b5]",
    secondary: "neo-button text-[#4a5568]",
    outline: "neo-pressed text-[#3f51b5]",
    ghost: "hover:bg-white/10 text-dark",
  };

  const sizes = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-6 text-base",
    lg: "h-14 px-8 text-lg",
  };

  return clsx(baseStyles, variants[variant], sizes[size], className);
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    // If we wanted to use asChild we'd need @radix-ui/react-slot, but user didn't install it.
    // So we just render a regular button. If they need a link, they can wrap it or we just use className directly on Links.
    return (
      <button
        className={getButtonStyles(variant, size, className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"
