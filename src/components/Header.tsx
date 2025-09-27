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

  const countries = [
    "Estados Unidos",
    "Canadá", 
    "Reino Unido",
    "México",
    "Coreia",
    "Taiwan",
    "Japão",
    "Austrália",
    "Islândia",
    "França",
    "Nova Zelândia",
    "Suécia"
  ];

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

  return (
    <header className="font-custom w-full  bg-white">
      <Desktop>
        {/* Верхняя панель */}
        <div className="flex justify-end items-center py-2 px-4 max-w-[1400px] mx-auto bg-white">
          <div className="flex items-center space-x-6">
            <div className="relative" ref={languageRef}>
              <button
                className="text-[#0060a9] text-[20px] hover:text-blue-800 hover:underline flex items-center transition-colors"
                onMouseEnter={() => setIsLanguageOpen(true)}
                onMouseLeave={() => setIsLanguageOpen(false)}
              >
                Português <span className="ml-1">▼</span>
              </button>
              {isLanguageOpen && (
                <div 
                  className="absolute right-0 mt-2 w-48 bg-white shadow-lg z-50 border border-gray-200"
                  onMouseEnter={() => setIsLanguageOpen(true)}
                  onMouseLeave={() => setIsLanguageOpen(false)}
                >
                  <Link href="/" className="block px-4 py-2 text-[#0060a9] text-[25px] hover:bg-gray-100 hover:underline">
                    Português
                  </Link>
                </div>
              )}
            </div>

            <div className="relative" ref={countryRef}>
              <button
                className="text-[#0060a9] text-[20px] hover:text-blue-800 hover:underline flex items-center transition-colors"
                onMouseEnter={() => setIsCountryOpen(true)}
                onMouseLeave={() => setIsCountryOpen(false)}
              >
                País <span className="ml-1">▼</span>
              </button>
              {isCountryOpen && (
                <div 
                  className="absolute right-0 mt-2 w-64 bg-white shadow-lg z-50 border border-gray-200 max-h-96 overflow-y-auto"
                  onMouseEnter={() => setIsCountryOpen(true)}
                  onMouseLeave={() => setIsCountryOpen(false)}
                >
                  {countries.map((country, index) => (
                    <Link 
                      key={index}
                      href="/" 
                      className="block px-4 py-2 text-[#0060a9] text-[25px] hover:bg-gray-100 hover:underline border-b border-gray-100 last:border-b-0"
                    >
                      {country}
                    </Link>
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
            />
          </Link>
        </div>

        {/* Нижняя панель навигации */}
        <div className="bg-[#0060a9] text-white py-3">
          <div className="max-w-[1400px] mx-auto px-4">
            <nav className="flex space-x-8">
              <Link href="./" className="text-lg font-bold hover:underline">
                Hagase socio
              </Link>
              <Link href="./location" className="text-lg font-bold hover:underline">
                Test
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
            />
          </Link>
          <div className="flex items-center space-x-4">
            <div className="relative" ref={languageRef}>
              <button
                className="text-[#0060a9] text-[20px] hover:text-blue-800 hover:underline flex items-center"
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
              >
                PT <span className="ml-1">▼</span>
              </button>
              {isLanguageOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg z-50 border border-gray-200">
                  <Link href="/" className="block px-4 py-2 text-[#0060a9] text-[20px] hover:bg-gray-100">
                    Português
                  </Link>
                </div>
              )}
            </div>

            <div className="relative" ref={countryRef}>
              <button
                className="text-[#0060a9] text-[20px] hover:text-blue-800 hover:underline flex items-center"
                onClick={() => setIsCountryOpen(!isCountryOpen)}
              >
                País <span className="ml-1">▼</span>
              </button>
              {isCountryOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg z-50 border border-gray-200 max-h-64 overflow-y-auto">
                  {countries.map((country, index) => (
                    <Link 
                      key={index}
                      href="/" 
                      className="block px-4 py-2 text-[#0060a9] text-[18px] hover:bg-gray-100 border-b border-gray-100 last:border-b-0"
                    >
                      {country}
                    </Link>
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
              <Link href="/" className="block px-4 py-3 text-[#0060a9] text-[20px] font-bold border-b border-gray-100 hover:bg-gray-50">
                Hagase socio
              </Link>
              <Link href="/" className="block px-4 py-3 text-[#0060a9] text-[20px] font-bold hover:bg-gray-50">
                Test
              </Link>
            </div>
          </div>
        )}
      </Tablet>

      <Mobile>
        <div className="flex justify-between items-center py-3 px-4 bg-white text-white">
          <Link href="/">
            <Image 
              src="/logoC.webp" 
              alt="Logo" 
              width={150} 
              height={40}
              className="object-contain"
            />
          </Link>
          
          <button 
            className="flex items-center space-x-2 bg-[#0060a9] py-2 px-2 text-white font-bold"
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
              <Link href="/" className="block px-4 py-3 text-[#0060a9] text-[20px] font-bold border-b border-gray-100 hover:bg-gray-50">
                Hagase socio
              </Link>
              <Link href="/" className="block px-4 py-3 text-[#0060a9] text-[20px] font-bold hover:bg-gray-50">
                Test
              </Link>
            </div>
          </div>
        )}
      </Mobile>
    </header>
  );
};

export default Header;