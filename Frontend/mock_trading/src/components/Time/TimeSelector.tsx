
import React, { useState } from 'react';

type Option = '1d' | '5d' | '1mo' | '5mo' | '1yr';

interface TimeSelectorProps {
  onSelect: (option: Option) => void;
}

const TimeSelector: React.FC<TimeSelectorProps> = ({ onSelect }) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const options: Option[] = ['1d', '5d', '1mo', '5mo', '1yr'];

  const handleClick = (option: Option) => {
    setSelectedOption(option);
    onSelect(option);
  };

  return (
    <div className='flex' >
      {options.map((option) => (
        <button
          className='cursor-pointer p-1'
          key={option}

          onClick={() => handleClick(option)}
          style={{
            // padding: '5px 10px',
            // cursor: 'pointer',
            border: selectedOption === option ? '2px solid blue' : '1px solid gray',
            backgroundColor: selectedOption === option ? 'lightblue' : 'white',
            // borderRadius: '5px'
          }}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default TimeSelector;
