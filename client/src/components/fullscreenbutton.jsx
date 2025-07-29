// FullScreenButton.js
import React, { memo } from 'react';
import { Maximize, Minimize } from "lucide-react"; // Import Lucide icons

const FullScreenButton = memo(({ onClick,fullscreen }) => {
  return (
    <button onClick={onClick}  className="fullscreen-button">
        {fullscreen ? <Minimize size={24} /> : <Maximize size={24} />} {/* Use Lucide Icons */}
    </button>
  );
});

export default FullScreenButton;