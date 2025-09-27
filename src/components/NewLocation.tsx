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

  const targetDate = new Date('25 Dezembro 2025 00:00:00').getTime();

  const locations: Location[] = [
    { city: 'Rimouski, QC', date: 'Agosto 2026' },
    { city: 'The Villages, FL', date: 'Agosto 2026' },
    { city: 'N Guadalajara, MX', date: 'Agosto 2026' },
    { city: 'Richland, WA', date: 'Agosto 2026' },
    { city: 'Allen, TX', date: 'Agosto 2026' },
    { city: 'E Newmarket, ON', date: 'Agosto 2026' },
    { city: 'Spring Valley, NV', date: 'Agosto 2026' },
    { city: 'Mississauga, ON Business Center', date: 'Outubro 2026' },
    { city: 'Frutiport, MI', date: 'Outubro 2026' },
    { city: 'Mechanicsburg, PA', date: 'Outubro 2026' },
    { city: 'Indian Land, SC', date: 'Outubro 2026' }
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
    <div className="bg-white">
      <div className="w-full max-w-[1400px] mx-auto px-4 py-8">
        {/* Заголовок с изображением */}
        <div className="flex flex-col md:flex-row mb-8 bg-blue-50 rounded-lg overflow-hidden">
          <div className="flex-1 flex items-center justify-center p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center md:text-left">
              Novas Localizações Em Breve
            </h1>
          </div>
          <div className="flex-1">
            <Image 
              src="/cc.jpg" 
              alt="Novas Localizações Em Breve"
              width={600}
              height={400}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </div>

        {/* Таблица с локациями - десктоп версия */}
        <div className="hidden md:block bg-white rounded-lg shadow-lg overflow-hidden w-full">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="text-left py-4 px-6 font-semibold w-2/5">Localização</th>
                <th className="text-center py-4 px-6 font-semibold w-1/5">Data de Abertura</th>
                <th className="text-center py-4 px-6 font-semibold w-2/5">Contagem Regressiva</th>
              </tr>
            </thead>
            <tbody>
              {locations.map((location, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 text-gray-900 font-medium text-lg">{location.city}</td>
                  <td className="py-4 px-6 text-gray-700 text-center text-lg">{location.date}</td>
                  <td className="py-4 px-6 text-center">
                    <div className="inline-flex justify-center bg-blue-100 px-4 py-2 rounded-lg">
                      <span className="text-blue-800 font-mono font-bold text-lg mr-1">
                        {formatTimeUnit(timeLeft.days)}
                      </span>
                      <span className="text-blue-600 text-sm mr-2">d</span>
                      
                      <span className="text-blue-800 font-mono font-bold text-lg mr-1">
                        {formatTimeUnit(timeLeft.hours)}
                      </span>
                      <span className="text-blue-600 text-sm mr-2">h</span>
                      
                      <span className="text-blue-800 font-mono font-bold text-lg mr-1">
                        {formatTimeUnit(timeLeft.minutes)}
                      </span>
                      <span className="text-blue-600 text-sm mr-2">m</span>
                      
                      <span className="text-blue-800 font-mono font-bold text-lg mr-1">
                        {formatTimeUnit(timeLeft.seconds)}
                      </span>
                      <span className="text-blue-600 text-sm">s</span>
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
            <div key={index} className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-gray-900 text-lg">{location.city}</h3>
                <span className="text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded text-lg">
                  {location.date}
                </span>
              </div>
              <div className="flex justify-center">
                <div className="inline-flex items-center bg-blue-100 px-4 py-2 rounded-lg">
                  <span className="text-blue-800 font-mono font-bold text-lg mr-1">
                    {formatTimeUnit(timeLeft.days)}
                  </span>
                  <span className="text-blue-600 text-sm mr-2">d</span>
                  
                  <span className="text-blue-800 font-mono font-bold text-lg mr-1">
                    {formatTimeUnit(timeLeft.hours)}
                  </span>
                  <span className="text-blue-600 text-sm mr-2">h</span>
                  
                  <span className="text-blue-800 font-mono font-bold text-lg mr-1">
                    {formatTimeUnit(timeLeft.minutes)}
                  </span>
                  <span className="text-blue-600 text-sm mr-2">m</span>
                  
                  <span className="text-blue-800 font-mono font-bold text-lg mr-1">
                    {formatTimeUnit(timeLeft.seconds)}
                  </span>
                  <span className="text-blue-600 text-sm">s</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComingSoonLocations;