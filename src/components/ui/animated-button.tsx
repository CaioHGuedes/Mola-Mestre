import { forwardRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
}

export const AnimatedButton = forwardRef<
  HTMLButtonElement,
  AnimatedButtonProps
>(({ className, children, ...props }, ref) => {
  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "flex cursor-pointer items-center justify-center gap-2",
        "px-4 py-2 rounded-lg",

        "text-sm font-medium text-white",

        "bg-gray-900 hover:bg-gray-800",
        "shadow-lg shadow-gray-200",
        "transition-colors cursor-pointer",

        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
});

AnimatedButton.displayName = "AnimatedButton";
