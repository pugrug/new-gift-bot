import React, { useState } from 'react';

const ModeToggle = () => {
    const [mode, setMode] = useState('light');

    const toggleMode = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    return (
        <div className={`mode-toggle ${mode}`}>
            <button onClick={toggleMode}>
                Switch to {mode === 'light' ? 'dark' : 'light'} mode
            </button>
        </div>
    );
};

export default ModeToggle;