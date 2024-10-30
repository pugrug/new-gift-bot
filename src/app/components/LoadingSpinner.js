// src/app/components/LoadingSpinner.js
import React from 'react';
import { Loader2 } from "lucide-react";

const LoadingSpinner = ({ size = "medium", className = "" }) => {
  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-6 h-6",
    large: "w-8 h-8"
  };

  // Apply size classes directly to Loader2
  const loaderClassName = `animate-spin ${sizeClasses[size]}`;

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Loader2 
        className={loaderClassName}
        data-testid="loader-icon"  // Add this for testing
      />
    </div>
  );
};

export default LoadingSpinner;