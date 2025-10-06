'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Location {
  city: string;
  date: string;
}

const ComingSoonLocations = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const targetDate = new Date('Jan 30, 2026 00:00:00').getTime();

  const locations: Location[] = [
    { city: 'São Paulo/SP e Grande ABC', date: 'Dez2025/Jan2026' },
    { city: 'Campinas ', date: 'Dez2025/Jan2026' },
    { city: 'Brasília ', date: 'Dez2025/Jan2026' },
    { city: 'Rio de Janeiro', date: 'Dez2025/Jan2026' },
    { city: 'Salvador ', date: 'Dez2025/Jan2026' },
    { city: 'Belo Horizonte ', date: 'Dez2025/Jan2026' },
    { city: 'Curitiba', date: 'Dez2025/Jan2026' }
  ];

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const formatTimeUnit = (unit: number): string => {
    return unit < 10 ? `0${unit}` : `${unit}`;
  };

  return (
    <div className="bg-white"> <div className="w-full  max-w-[1400px] mx-auto px-4 py-8 ">
      {/* Заголовок с изображением */}

      <div className="flex flex-row mb-8 bg-blue-200">
        <h1 className="flex text-2xl p-10 font-bold  text-gray-900 mb-2 text-center items-center">New Locations Coming Soon</h1>
        <Image 
          src="/cc.jpg" 
          alt="New Locations Coming Soon"
          width={500}
          height={400}
          className=" shadow-lg object-cover w-full"
          priority
        />
      </div>

      {/* Таблица с локациями - десктоп версия */}
      <div className="hidden md:block bg-white  overflow-hidden w-full">
        <table className="w-full">
   
          <tbody>
            {locations.map((location, index) => (
              <tr key={index} className=" transition-colors border-b-indigo-500 ">
                <td className="py-4 px-6 text-gray-900 font-medium text-lg">{location.city}</td>
                <td className="py-4 px-6 text-gray-700 text-center text-lg">{location.date}</td>
                <td className="py-4 px-6 text-center">
                  <div className="inline-flex px-4 py-2 \">
                    <span className="text-gray-700 font-medium font-bold text-lg mr-1">
                      {formatTimeUnit(timeLeft.days)}
                    </span>
                    <span className=" text-sm mr-2">d</span>
                    
                    <span className="text-gray-700 font-medium font-bold text-lg mr-1">
                      {formatTimeUnit(timeLeft.hours)}
                    </span>
                    <span className=" text-sm mr-2">h</span>
                    
                    <span className="text-gray-700 font-medium font-bold text-lg mr-1">
                      {formatTimeUnit(timeLeft.minutes)}
                    </span>
                    <span className=" text-sm mr-2">m</span>
                    
                    <span className="text-gray-700 font-medium font-bold text-lg mr-1">
                      {formatTimeUnit(timeLeft.seconds)}
                    </span>
                    <span className=" text-sm">s</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Мобильная версия */}
      <div className="md:hidden space-y-4">
        {locations.map((location, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-gray-900 text-lg">{location.city}</h3>
              <span className="text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded text-lg">
                {location.date}
              </span>
            </div>
            <div className="flex justify-center">
              <div className="inline-flex items-center bg-blue-100 px-4 py-2 rounded-lg border border-blue-200">
                <span className="text-blue-800 font-mono font-bold text-lg mr-1">
                  {formatTimeUnit(timeLeft.days)}
                </span>
                <span className=" text-sm mr-2">d</span>
                
                <span className="text-blue-800 font-mono font-bold text-lg mr-1">
                  {formatTimeUnit(timeLeft.hours)}
                </span>
                <span className=" text-sm mr-2">h</span>
                
                <span className="text-blue-800 font-mono font-bold text-lg mr-1">
                  {formatTimeUnit(timeLeft.minutes)}
                </span>
                <span className=" text-sm mr-2">m</span>
                
                <span className="text-blue-800 font-mono font-bold text-lg mr-1">
                  {formatTimeUnit(timeLeft.seconds)}
                </span>
                <span className=" text-sm">s</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div></div>
   
  );
};

export default ComingSoonLocations;