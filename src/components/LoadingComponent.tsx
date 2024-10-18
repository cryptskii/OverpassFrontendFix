// src/components/LoadingComponent.tsx

import React from 'react';

interface LoadingProps {
  isInitialized: boolean;
  isLoading: boolean;
}

const LoadingComponent: React.FC<LoadingProps> = ({ isInitialized, isLoading }) => {
  if (!isInitialized || isLoading) {
    return (
      <div className="loading-container fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <img src="/assets/loadingOPlogo.gif" alt="Loading..." />
      </div>
    );
  }
  return null;
};

export default LoadingComponent;
