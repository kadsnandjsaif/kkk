'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useMediaQuery } from 'react-responsive';

const Desktop = ({ children }: { children: React.ReactNode }) => {
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  return isDesktop ? <>{children}</> : null;
};

const Tablet = ({ children }: { children: React.ReactNode }) => {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  return isTablet ? <>{children}</> : null;
};

const Mobile = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return isMobile ? <>{children}</> : null;
};

const Header = () => {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const languageRef = useRef<HTMLDivElement>(null);
  const countryRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Объект с доменами Costco для разных стран
  const countryDomains = {
    "Estados Unidos": "https://www.costco.com",
    "Canadá": "https://www.costco.ca", 
    "Reino Unido": "https://www.costco.co.uk",
    "México": "https://www.costco.com.mx",
    "Coreia": "https://www.costco.co.kr",
    "Taiwan": "https://www.costco.com.tw",
    "Japão": "https://www.costco.co.jp",
    "Austrália": "https://www.costco.com.au",
    "Islândia": "https://www.costco.is",
    "França": "https://www.costco.fr",
    "Nova Zelândia": "https://www.costco.co.nz",
    "Suécia": "https://www.costco.se",
    "Espanha": "https://www.costco.es"
  };

  const countries = Object.keys(countryDomains);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (languageRef.current && !languageRef.current.contains(event.target as Node)) {
        setIsLanguageOpen(false);
      }
      if (countryRef.current && !countryRef.current.contains(event.target as Node)) {
        setIsCountryOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Функции для управления hover с задержкой
  const handleLanguageMouseEnter = () => {
    setIsLanguageOpen(true);
  };

  const handleLanguageMouseLeave = () => {
    setTimeout(() => {
      if (languageRef.current && !languageRef.current.matches(':hover')) {
        setIsLanguageOpen(false);
      }
    }, 200);
  };

  const handleCountryMouseEnter = () => {
    setIsCountryOpen(true);
  };

  const handleCountryMouseLeave = () => {
    setTimeout(() => {
      if (countryRef.current && !countryRef.current.matches(':hover')) {
        setIsCountryOpen(false);
      }
    }, 200);
  };

  const handleDropdownMouseEnter = () => {
    // Отменяем закрытие при наведении на dropdown
  };

  const handleDropdownMouseLeave = () => {
    setTimeout(() => {
      setIsLanguageOpen(false);
      setIsCountryOpen(false);
    }, 200);
  };

  return (
    <header className="font-custom w-full bg-white shadow-sm">
      <Desktop>
        {/* Верхняя панель */}
        <div className="flex justify-end items-center py-2 px-4 max-w-[1400px] mx-auto bg-white">
          <div className="flex items-center space-x-6">
            {/* Выбор языка */}
            <div 
              className="relative" 
              ref={languageRef}
              onMouseEnter={handleLanguageMouseEnter}
              onMouseLeave={handleLanguageMouseLeave}
            >
              <button
                className="text-[#0060a9] text-[20px] hover:text-blue-800 hover:underline flex items-center transition-colors"
              >
                Português <span className="ml-1">▼</span>
              </button>
              {isLanguageOpen && (
                <div 
                  className="absolute right-0 mt-2 w-48 bg-white shadow-lg z-50 border border-gray-200 rounded-lg"
                  onMouseEnter={handleDropdownMouseEnter}
                  onMouseLeave={handleDropdownMouseLeave}
                >
                  <Link 
                    href="/" 
                    className="block px-4 py-3 text-[#0060a9] text-[18px] hover:bg-gray-100 transition-colors border-b border-gray-100 last:border-b-0"
                  >
                    Português
                  </Link>
                </div>
              )}
            </div>

            {/* Выбор страны */}
            <div 
              className="relative" 
              ref={countryRef}
              onMouseEnter={handleCountryMouseEnter}
              onMouseLeave={handleCountryMouseLeave}
            >
              <button
                className="text-[#0060a9] text-[20px] hover:text-blue-800 hover:underline flex items-center transition-colors"
              >
                País <span className="ml-1">▼</span>
              </button>
              {isCountryOpen && (
                <div 
                  className="absolute right-0 mt-2 w-64 bg-white shadow-lg z-50 border border-gray-200 rounded-lg max-h-96 overflow-y-auto"
                  onMouseEnter={handleDropdownMouseEnter}
                  onMouseLeave={handleDropdownMouseLeave}
                >
                  {countries.map((country, index) => (
                    <a 
                      key={index}
                      href={countryDomains[country as keyof typeof countryDomains]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-3 text-[#0060a9] text-[18px] hover:bg-gray-100 transition-colors border-b border-gray-100 last:border-b-0"
                    >
                      {country}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Средняя панель с лого */}
        <div className="flex justify-start items-center py-1 px-4 max-w-[1400px] mx-auto bg-white">
          <Link href="/">
            <Image 
              src="/logoC.webp" 
              alt="Logo" 
              width={250} 
              height={60}
              className="object-contain"
              priority
            />
          </Link>
        </div>

        {/* Нижняя панель навигации */}
        <div className="bg-[#0060a9] text-white py-3">
          <div className="max-w-[1400px] mx-auto px-4">
            <nav className="flex space-x-8">
              <Link href="./" className="text-lg font-bold hover:underline transition-colors">
                Seja um sócio
              </Link>
              <Link href="./location" className="text-lg font-bold hover:underline transition-colors">
                localização
              </Link>
            </nav>
          </div>
        </div>
      </Desktop>

      <Tablet>
        <div className="flex justify-between items-center py-4 px-6 max-w-[1400px] mx-auto">
          <Link href="/">
            <Image 
              src="/logoC.webp" 
              alt="Logo" 
              width={120} 
              height={50}
              className="object-contain"
              priority
            />
          </Link>
          <div className="flex items-center space-x-4">
            {/* Выбор языка для планшета */}
            <div className="relative" ref={languageRef}>
              <button
                className="text-[#0060a9] text-[16px] hover:text-blue-800 flex items-center border border-[#0060a9] px-3 py-1 rounded"
                onClick={() => {
                  setIsLanguageOpen(!isLanguageOpen);
                  setIsCountryOpen(false);
                }}
              >
                PT <span className="ml-1">▼</span>
              </button>
              {isLanguageOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg z-50 border border-gray-200 rounded-lg">
                  <Link href="/" className="block px-4 py-2 text-[#0060a9] text-[16px] hover:bg-gray-100">
                    Português
                  </Link>
                </div>
              )}
            </div>

            {/* Выбор страны для планшета */}
            <div className="relative" ref={countryRef}>
              <button
                className="text-[#0060a9] text-[16px] hover:text-blue-800 flex items-center border border-[#0060a9] px-3 py-1 rounded"
                onClick={() => {
                  setIsCountryOpen(!isCountryOpen);
                  setIsLanguageOpen(false);
                }}
              >
                País <span className="ml-1">▼</span>
              </button>
              {isCountryOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg z-50 border border-gray-200 rounded-lg max-h-64 overflow-y-auto">
                  {countries.map((country, index) => (
                    <a 
                      key={index}
                      href={countryDomains[country as keyof typeof countryDomains]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-2 text-[#0060a9] text-[14px] hover:bg-gray-100 border-b border-gray-100 last:border-b-0"
                    >
                      {country}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Нижняя панель для планшета */}
        <div className="flex justify-between items-center py-3 px-4 bg-[#0060a9] text-white">
          <button 
            className="flex items-center space-x-2 text-white font-bold"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="flex flex-col space-y-1">
              <span className="w-4 h-0.5 bg-white"></span>
              <span className="w-4 h-0.5 bg-white"></span>
              <span className="w-4 h-0.5 bg-white"></span>
            </div>
            <span>Menu</span>
          </button>
        </div>

        {/* Мобильное меню для планшета */}
        {isMobileMenuOpen && (
          <div ref={mobileMenuRef} className="bg-white shadow-lg border-t border-gray-200">
            <div className="px-4 py-2">
              <Link 
                href="/" 
                className="block px-4 py-3 text-[#0060a9] text-[18px] font-bold border-b border-gray-100 hover:bg-gray-50 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Seja um sócio
              </Link>
              <Link 
                href="/" 
                className="block px-4 py-3 text-[#0060a9] text-[18px] font-bold hover:bg-gray-50 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                localização
              </Link>
            </div>
          </div>
        )}
      </Tablet>

      <Mobile>
        <div className="flex justify-between items-center py-3 px-4 bg-white">
          <Link href="/">
            <Image 
              src="/logoC.webp" 
              alt="Logo" 
              width={150} 
              height={40}
              className="object-contain"
              priority
            />
          </Link>
          
          <button 
            className="flex items-center space-x-2 bg-[#0060a9] py-2 px-3 rounded text-white font-bold"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="flex flex-col space-y-1">
              <span className="w-4 h-0.5 bg-white"></span>
              <span className="w-4 h-0.5 bg-white"></span>
              <span className="w-4 h-0.5 bg-white"></span>
            </div>
            <span>Menu</span>
          </button>
        </div>

        {/* Мобильное меню */}
        {isMobileMenuOpen && (
          <div ref={mobileMenuRef} className="bg-white shadow-lg border-t border-gray-200">
            <div className="px-4 py-2">
              <Link 
                href="/" 
                className="block px-4 py-3 text-[#0060a9] text-[18px] font-bold border-b border-gray-100 hover:bg-gray-50 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Hagase socio
              </Link>
              <Link 
                href="/" 
                className="block px-4 py-3 text-[#0060a9] text-[18px] font-bold hover:bg-gray-50 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Test
              </Link>
              
              {/* Выбор языка и страны в мобильном меню */}
              <div className="border-t border-gray-200 mt-2 pt-2">
                <div className="px-4 py-2">
                  <span className="text-gray-600 text-sm block mb-2">Idioma:</span>
                  <select className="w-full p-2 border border-gray-300 rounded">
                    <option>Português</option>
                  </select>
                </div>
                <div className="px-4 py-2">
                  <span className="text-gray-600 text-sm block mb-2">País:</span>
                  <select className="w-full p-2 border border-gray-300 rounded">
                    {countries.map((country, index) => (
                      <option key={index} value={countryDomains[country as keyof typeof countryDomains]}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}
      </Mobile>
    </header>
  );
};

export default Header;
