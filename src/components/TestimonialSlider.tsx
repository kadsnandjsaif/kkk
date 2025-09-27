'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

// Импорт стилей Swiper
import 'swiper/css';
import 'swiper/css/navigation';

type Slide = {
  id: number;
  image: string;
  avatar: string;
  username: string;
  comment: string;
};

const TestimonialSlider = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSlide, setModalSlide] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  // Данные для слайдов
  const slidesData: Slide[] = [
    {
      id: 1,
      image: "/slide1.jpg",
      avatar: "/avatar.jpg",
      username: "@takecoweer",
      comment: "A Costco superou todas as minhas expectativas! Preços incríveis e qualidade excepcional em todos os produtos. Recomendo a todos!"
    },
    {
      id: 2,
      image: "/slide2.jpg",
      avatar: "/avatar.jpg",
      username: "@membro_feliz",
      comment: "Melhor custo-benefício do mercado! A assinatura executiva vale cada centavo com os benefícios exclusivos."
    },
    {
      id: 3,
      image: "/slide3.jpg",
      avatar: "/avatar.jpg",
      username: "@familia_costco",
      comment: "Fazemos todas as nossas compras mensais aqui. Qualidade garantida e atendimento impecável!"
    },
    {
      id: 4,
      image: "/slide4.jpg",
      avatar: "/avatar.jpg",
      username: "@economiza_sempre",
      comment: "Os preços da Costco são imbatíveis! Economizo centenas por mês sem abrir mão da qualidade."
    },
    {
      id: 5,
      image: "/slide5.jpg",
      avatar: "/avatar.jpg",
      username: "@cliente_satisfeito",
      comment: "Experiência de compra única! Produtos frescos, variedade enorme e serviços excelentes."
    },
        {
      id: 6,
      image: "/slide4.jpg",
      avatar: "/avatar.jpg",
      username: "@economiza_sempre",
      comment: "Os preços da Costco são imbatíveis! Economizo centenas por mês sem abrir mão da qualidade."
    },
  ];

  // Тексты на португальском
  const texts = {
    title: "Não Apenas Acredite na Nossa Palavra",
    subtitle: "Histórias reais de membros reais"
  };

  // Открытие модального окна
  const openModal = (index: number) => {
    setModalSlide(index);
    setIsModalOpen(true);
  };

  // Закрытие модального окна
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Навигация в модальном окне
  const nextModalSlide = () => {
    const next = modalSlide === slidesData.length - 1 ? 0 : modalSlide + 1;
    setModalSlide(next);
    if (swiperInstance) {
      swiperInstance.slideTo(next);
    }
  };

  const prevModalSlide = () => {
    const prev = modalSlide === 0 ? slidesData.length - 1 : modalSlide - 1;
    setModalSlide(prev);
    if (swiperInstance) {
      swiperInstance.slideTo(prev);
    }
  };

  // Настройки для Swiper
  const swiperParams = {
    modules: [Navigation],
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    loop: true,
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto' as const,
    spaceBetween: 15,
    breakpoints: {
      // 1400px и выше - показываем 5 слайдов
      1400: {
        slidesPerView: 5,
      },
      // 1200px - 1399px - показываем 4 слайда
      1200: {
        slidesPerView: 4,
      },
      // 992px - 1199px - показываем 3 слайда
      992: {
        slidesPerView: 3,
      },
      // 768px - 991px - показываем 2 слайда
      768: {
        slidesPerView: 2,
      },
      // До 767px - показываем 1 слайд
      320: {
        slidesPerView: 1,
      }
    },
    onSwiper: setSwiperInstance,
  };

  return (
    <div className="bg-white"><div className="w-full max-w-[1400px] mx-auto px-4 py-16 bg-white">
      {/* Заголовок */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">{texts.title}</h2>
        <p className="text-xl text-gray-600">{texts.subtitle}</p>
      </div>

      {/* Слайдер */}
      <div className="relative">
        <Swiper {...swiperParams} className="py-8">
          {slidesData.map((slide, index) => (
            <SwiperSlide key={slide.id} className="!w-[300px] !h-[300px]">
              <div 
                className="relative w-full h-full cursor-pointer group"
                onClick={() => openModal(index)}
              >
                <Image
                  src={slide.image}
                  alt={`Depoimento ${index + 1}`}
                  fill
                  className="object-cover rounded-lg shadow-lg"
                  priority={index < 3}
                />
                
                {/* Белый овальный блок (появляется при наведении) */}
                <div className= " w-full absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white rounded-t-[90%] px-6 py-3 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 w-4/5">
                  <div className="text-center">
                    <span className="font-semibold text-gray-900 text-sm whitespace-nowrap">
                      {slide.username}
                    </span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Кастомные стрелки навигации */}
        <button className="swiper-button-prev absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full w-12 h-12 shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 border border-gray-200">
         <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button className="swiper-button-next absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full w-12 h-12 shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 border border-gray-200">
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Модальное окно */}
      <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${isModalOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        {/* Затемненный фон */}
        <div 
          className={`absolute inset-0 bg-black transition-opacity duration-300 ${isModalOpen ? 'opacity-40' : 'opacity-0'}`}
          onClick={closeModal}
        />
        
        {/* Контент модального окна */}
        <div className={`relative bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden transform transition-transform duration-300 ${isModalOpen ? 'scale-100' : 'scale-95'}`}>
          {/* Кнопка закрытия */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 z-20 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors hover:scale-110 border border-gray-200"
          >
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Контент */}
          <div className="flex flex-col md:flex-row h-full">
            {/* Левая часть - изображение */}
            <div className="relative w-full md:w-1/2 h-64 md:h-auto">
              <Image
                src={slidesData[modalSlide].image}
                alt="Depoimento"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Правая часть - текст */}
            <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
              <div className="flex items-center space-x-4 mb-6">
                <div className="relative w-16 h-16">
                  <Image
                    src={slidesData[modalSlide].avatar}
                    alt="Avatar"
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Costco</h3>
                  <p className="text-gray-600">{slidesData[modalSlide].username}</p>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <p className="text-gray-700 text-lg leading-relaxed">
                  {slidesData[modalSlide].comment}
                </p>
              </div>

              {/* Номер отзыва */}
              <div className="text-center">
                
                <p className="text-sm text-gray-400 mt-1">REPORT POWERED BY EMPURI</p>
              </div>
            </div>
          </div>
        </div>

        {/* Кнопки навигации в модальном окне (снаружи блока) */}
        <button
          onClick={prevModalSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-60 bg-white rounded-full w-12 h-12 shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 border border-gray-200"
        >
          <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={nextModalSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-60 bg-white rounded-full w-12 h-12 shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 border border-gray-200"
        >
          <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div></div>
    
  );
};

export default TestimonialSlider;