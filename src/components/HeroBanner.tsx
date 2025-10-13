'use client';
import Image from 'next/image';

const HeroBanner = () => {
  return (
    <div className="w-full flex justify-center px-4 py-1  bg-white">
      <div className="w-full max-w-[1200px] relative">
        
        <div className="relative w-full" style={{ aspectRatio: '9/12' }}> {/* Укажите правильное соотношение */}
          <Image
            src="/katalog.png"
            alt="Katalog"
            fill
            className="object-contain" // Показывает все изображение без обрезки
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;