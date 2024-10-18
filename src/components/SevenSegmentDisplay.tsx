// src/components/SevenSegmentDisplay.tsx

import React from 'react';
import '../styles/SevenSegmentDisplay.css';

interface SevenSegmentDisplayProps {
  value: string; // The value to display
}

const SevenSegmentDisplay: React.FC<SevenSegmentDisplayProps> = ({ value }) => {
  return (
    <div className="display">
      <h1 className="display-h1">{value}</h1>
      <p className="display-p">Seven Segment Display</p>
    </div>
  );
};

export default SevenSegmentDisplay;
