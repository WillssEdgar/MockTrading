
import Card from '../Cards/Card';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface CarouselProps {
  stockNames: string[];
  email: string;
}

const Carousel: React.FC<CarouselProps> = ({ stockNames, email }) => {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 3;
  const navigate = useNavigate();
  const handlePrev = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - itemsPerPage, 0));
  };

  const handleNext = () => {
    setStartIndex((prevIndex) => Math.min(prevIndex + itemsPerPage, stockNames.length - itemsPerPage));
  };

  const visibleNames = stockNames.slice(startIndex, startIndex + itemsPerPage);
  return (
    <div className="flex flex-col items-center">
      <div className="flex overflow-hidden w-full">
        {visibleNames.map((name, index) => (
          <div key={index} className="m-5 flex text-center">
            <Card
              key={index}
              stockdata={{ stocksymbol: name }}
              onClick={() => navigate("/Details", { state: { symbol: name, email: email } })}
            />
          </div>
        ))}
      </div>
      <div className="mt-4 flex space-x-4">
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4
                     rounded-lg focus:outline-none focus:shadow-outline'
          onClick={handlePrev}
          disabled={startIndex === 0}
        >
          Prev
        </button>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4
                     rounded-lg focus:outline-none focus:shadow-outline'
          onClick={handleNext}
          disabled={startIndex + itemsPerPage >= stockNames.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;

