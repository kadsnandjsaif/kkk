'use client';

import { useState } from 'react';
import Image from 'next/image';

const Footer = () => {
  const [openSections, setOpenSections] = useState<{[key: string]: boolean}>({});

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const footerData = {
    social: {
      title: 'Siga-nos',
      links: [
        { name: 'Facebook', icon: '/f.svg', href: '#' },
        { name: 'Instagram', icon: '/i.svg', href: '#' }
      ]
    },
    columns: [
      {
        title: 'Sobre nós',
        links: [
          'Instrução "Brigadero"',
          'Trabalho com os seguintes',
          'Livro apresentação',
          'Lista de ingredientes',
          'Costos Connection',
          'Sustentabilidade',
          'Certificações'
        ]
      },
      {
        title: 'Torne-se membro',
        links: [
          'Reconhecimentos',
          'Incidentes e correções'
        ]
      },
      {
        title: 'Serviços',
        links: [
          'Gestões',
          'Centro de reuniões',
          'Óptica',
          'Centro Auditivo',
          'Joalharia'
        ]
      },
      {
        title: 'Localizações',
        links: []
      }
    ],
    legal: [
      'Termos e Condições',
      'Política de Privacidade',
      'Informação Corporativa',
      'Política de Cookies',
      'Configurações de Cookies',
      'Prevenção de Fraude',
      'Política de Membros',
      'Canal de Denúncias da Costco'
    ],
    copyright: '© 2013 — 2025 Costco Wholesale Corporation. Todos os direitos reservados.'
  };

  return (
    <footer className="bg-gray-100 text-gray-700">
      {/* Основной контент футера */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Социальные сети - видно только на десктопе */}
        <div className="block border-b border-gray-300 pb-6 mb-6">
          <div className="flex items-start flex-col">
            <h3 className="text-lg font-semibold">{footerData.social.title}</h3>
            <div className="flex space-x-4">
              {footerData.social.links.map((social, index) => (
                <a 
                  key={index}
                  href={social.href}
                  className="hover:opacity-80 transition-opacity"
                  aria-label={social.name}
                >
                  <Image 
                    src={social.icon} 
                    alt={social.name}
                    width={60}
                    height={60}
                    className="w-10 h-10"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Колонки - десктоп версия */}
        <div className="hidden md:grid md:grid-cols-5 gap-8 mb-8">
          {/* Социальные сети в отдельной колонке для десктопа */}
 

          {/* Основные колонки */}
          {footerData.columns.map((column, index) => (
            <div key={index}>
              <h4 className="font-semibold mb-4 text-lg">{column.title}</h4>
              <ul className="space-y-2">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <span className="hover:text-blue-600 cursor-pointer transition-colors text-base">
                      {link}
                    </span>
                  </li>
                ))}
                {column.links.length === 0 && (
                  <li className="text-gray-500 text-base">Em breve</li>
                )}
              </ul>
            </div>
          ))}
        </div>

        {/* Мобильная версия - аккордеон */}
        <div className="md:hidden space-y-4">
          {footerData.columns.map((column, index) => (
            <div key={index} className="border-b border-gray-300 pb-4">
              <button
                onClick={() => toggleSection(column.title)}
                className="flex justify-between items-center w-full text-left font-semibold text-lg py-2"
              >
                {column.title}
                <svg 
                  className={`w-5 h-5 transform transition-transform ${
                    openSections[column.title] ? 'rotate-180' : ''
                  }`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 ${
                openSections[column.title] ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <ul className="space-y-2 pt-2">
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <span className="hover:text-blue-600 cursor-pointer transition-colors text-base block py-1">
                        {link}
                      </span>
                    </li>
                  ))}
                  {column.links.length === 0 && (
                    <li className="text-gray-500 text-base py-1">Em breve</li>
                  )}
                </ul>
              </div>
            </div>
          ))}

          {/* Язык для мобильной версии */}
          <div className="border-b border-gray-300 pb-4">
            <button
              onClick={() => toggleSection('idioma')}
              className="flex justify-between items-center w-full text-left font-semibold text-lg py-2"
            >
              Idioma
              <svg 
                className={`w-5 h-5 transform transition-transform ${
                  openSections['idioma'] ? 'rotate-180' : ''
                }`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <div className={`overflow-hidden transition-all duration-300 ${
              openSections['idioma'] ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
            }`}>
              <div className="pt-2">
                <span className="text-blue-600 font-medium text-base block py-1">
                  Português
                </span>
              </div>
            </div>
          </div>

          {/* Социальные сети для мобильной версии */}
      
        </div>

        {/* Легальные ссылки */}
        <div className="border-t border-gray-300 pt-6">
          <div className="flex flex-wrap gap-4 justify-center mb-4">
            {footerData.legal.map((link, index) => (
              <span 
                key={index}
                className="hover:text-blue-600 cursor-pointer transition-colors text-sm"
              >
                {link}
              </span>
            ))}
          </div>
          
          {/* Копирайт */}
          <div className="text-center">
            <p className="text-gray-600 text-sm">{footerData.copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;