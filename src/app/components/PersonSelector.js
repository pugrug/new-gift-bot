'use client';

import React, { useState } from 'react';

const PersonSelector = () => {
  const [selectedPerson, setSelectedPerson] = useState(null);
  
  const people = [
    { id: 'mom', label: 'Mom 👩', description: 'For the amazing mother in your life' },
    { id: 'dad', label: 'Dad 👨', description: 'For your awesome father' },
    { id: 'partner', label: 'Partner 💝', description: 'For that special someone' },
    { id: 'friend', label: 'Friend 🤝', description: 'For your best buddy' },
    { id: 'sibling', label: 'Sibling 👥', description: 'For your brother or sister' },
    { id: 'other', label: 'Someone Else ✨', description: 'For anyone else' }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl md:text-3xl text-center mb-6 font-bold text-green-700">
        I'm looking for a gift for...
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {people.map((person) => (
          <button
            key={person.id}
            onClick={() => setSelectedPerson(person.id)}
            className={`
              p-6 rounded-lg transition-all duration-300
              ${selectedPerson === person.id
                ? 'bg-green-500 text-white transform scale-105'
                : 'bg-white hover:bg-green-50 border-2 border-green-500 text-green-700 hover:border-green-600'
              }
              flex flex-col items-center gap-2
              shadow-md hover:shadow-lg
            `}
            data-testid={`person-button-${person.id}`}
          >
            <span className="text-2xl font-bold">{person.label}</span>
            <span className="text-sm text-center opacity-80">
              {person.description}
            </span>
          </button>
        ))}
      </div>

      {selectedPerson && (
        <div className="mt-8 text-center">
          <button 
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-lg text-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => console.log('Next step with:', selectedPerson)}
            data-testid="next-step-button"
          >
            Next Step! 🎄
          </button>
        </div>
      )}
    </div>
  );
};

export default PersonSelector;