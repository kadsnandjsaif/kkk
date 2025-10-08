// components/MembershipCards.tsx
'use client';

import React from 'react';
import Image from 'next/image';

const MembershipCards = () => {
  // Данные для верхних карточек
  const topCards = [
    {
      id: 1,
      logo: '/card1logo.png',
      background: '/card1b.webp',
      gradient: 'linear-gradient(rgba(221, 5, 43, 0.78), rgba(221, 5, 43, 1))',
      borderColor: 'border-red-600',
      title: 'Torne-se membro',
      subtitle: 'Em apenas alguns minutos'
    },
    {
      id: 2,
      logo: '/card2logo.webp',
      background: '/card2b.webp',
      gradient: 'linear-gradient(rgba(204, 204, 204, 0.78), rgba(204, 204, 204, 1))',
      borderColor: 'border-gray-400',
      title: 'Auto Renovação',
      subtitle: 'Ative já'
    },
    {
      id: 3,
      logo: '/card3logo.webp',
      background: '/card3b.webp',
      gradient: 'linear-gradient(rgba(0, 83, 161, 0.78), rgba(0, 83, 161, 1))',
      borderColor: 'border-blue-700',
      title: 'Conheça a Costco',
      subtitle: 'Vídeo de apresentação'
    }
  ];

  // Данные для нижних карточек с разделением на заголовок и подзаголовок
  const bottomCards = [
    {
      id: 2,
      image: '/btcard2.svg',
      title: 'Economia e qualidade',
      subtitle: 'As melhores marcas e produtos pelo melhor preço possível'
    },
    {
      id: 3,
      image: '/btcard3.svg',
      title: 'Exclusividade',
      subtitle: 'Produtos de todo o mundo, com a melhor qualidade'
    },
    {
      id: 4,
      image: '/btcard4.svg',
      title: 'Garantido',
      subtitle: 'Tratamento exclusivo e 100% de satisfação em produtos e serviços'
    },
    {
      id: 5,
      image: '/btcard5.svg',
      title: 'Serviços',
      subtitle: 'Posto de gasolina¹, Óptica, Centro Auditivo, Centro de Pneus…'
    }
  ];

  return (
    <div className="bg-[#c5d8ea]">
      <div className="max-w-[1400px] mx-auto px-4 py-8">
        {/* Верхний ряд карточек */}
        <div className="flex flex-row gap-6 mb-8">
          {topCards.map((card) => (
            <div
              key={card.id}
              className="flex-1 min-h-[120px] rounded-full overflow-hidden relative group"
            >
              {/* Десктопная версия */}
              <div 
                className="hidden lg:block relative h-full min-h-[150px] bg-cover bg-center"
                style={{ backgroundImage: `url(${card.background})` }}
              >
                <div 
                  className="absolute inset-0"
                  style={{ background: card.gradient }}
                ></div>
                <div className="relative z-10 h-full flex items-center p-6">
                  <div className="flex items-center space-x-6">
                    {/* Белый круг с изображением */}
                    <div className="flex-shrink-0 w-24 h-24 bg-white rounded-full flex items-center justify-center p-2">
                      <div className="w-20 h-20 relative">
                        <Image
                          src={card.logo}
                          alt={card.title}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                    
                    {/* Текст */}
                    <div className="text-white">
                      <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                      <p className="text-sm opacity-90">{card.subtitle}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Планшетная версия (768-1024px) */}
              <div className="hidden md:block lg:hidden rounded-3xl p-6 h-full min-h-[150px] flex flex-col items-center justify-center bg-[#c5d8ea]">
                <div className={`w-24 h-24 bg-white rounded-full border-4 ${card.borderColor} mx-[auto] flex items-center justify-center p-2 mb-4`}>
                  <div className="w-20 h-20 relative">
                    <Image
                      src={card.logo}
                      alt={card.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="font-bold text-gray-800 mb-1 text-lg">{card.title}</h3>
                  <p className="text-sm text-gray-600">{card.subtitle}</p>
                </div>
              </div>

              {/* Мобильная версия (<768px) - только иконки */}
              <div className="md:hidden rounded-3xl p-4 h-full min-h-[120px] flex flex-col items-center justify-center bg-[#c5d8ea]">
                <div className={`w-20 h-20 bg-white rounded-full border-4 ${card.borderColor} flex items-center justify-center p-2`}>
                  <div className="w-16 h-16 relative">
                    <Image
                      src={card.logo}
                      alt={card.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Нижний ряд карточек */}
        <div className="flex flex-col xl:flex-row gap-6 items-stretch">
          {/* Особенная карточка */}
          <div className="xl:flex-1 rounded-3xl p-4 flex flex-col items-center justify-center text-center min-h-[350px] order-1">
            <div className="w-80 h-80 md:w-80 md:h-80 xl:w-55 xl:h-55 mb-2 relative">
              <Image
                src="/btcard1.png"
                alt="Presente"
                fill
                className="object-contain"
              />
            </div>
            
            {/* Текст с ценами */}
            <div className="mb-6">
              <div className="text-1xl font-semibold text-gray-800 mb-2">
               <span className="flex justify-center"> Particulares:ㅤ R$ <div className='flex text-l'> <div className='text-decoration: line-through'> 1.100 </div> /550 por ano</div> </span>
              </div>
              <div className="text-1xl font-semibold text-gray-800 mb-2">
               <span className="flex justify-center"> Empresas:ㅤ R$ <div className='flex text-l'> <div className='text-decoration: line-through'> 550 </div> /275 por ano</div> </span>
              </div>
              <p className="text-sm text-gray-600">Comece a economizar hoje mesmo e aproveite todos os benefícios de ser nosso associado!</p>
            </div>
            
            
          </div>

          {/* Остальные 4 карточки */}
          <div className="xl:flex-[2] grid grid-cols-2 xl:grid-cols-4 gap-0 order-2">
            {bottomCards.map((card) => (
              <div
                key={card.id}
                className=" rounded-2xl p-4 xl:p-4 flex flex-col text-center min-h-[100px] items-center justify-items-stretch "
              >
                <div className="w-50 h-50 md:w-35 md:h-35 xl:w-45 xl:h-45 mb-4 relative">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-contain"
                  />
                </div>
                
                {/* Разделенный текст: заголовок (жирный) и подзаголовок */}
                <div className="text-gray-700">
                  <h4 className="font-bold text-lg mb-2">{card.title}</h4>
                  <p className="text-sm leading-tight">{card.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Текст присоединения (вместо кнопки) */}
            <div className="font-bold text-2xl text-gray-800 text-center">
              JUNTE-SE AO NOSSO CLUBE!
            </div>
      </div>
    </div>
  );
};

export default MembershipCards;