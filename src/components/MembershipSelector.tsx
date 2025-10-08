'use client';

import { useState } from 'react';
import Image from 'next/image';
import EmailModal from './EmailModal';

type MembershipType = 'personal' | 'business';

// SVG иконки для галочек и крестиков
const CheckIcon = ({ color = "text-green-600" }: { color?: string }) => (
  <svg className={`w-5 h-5 mr-2 mt-0.5 flex-shrink-0 ${color}`} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

const CrossIcon = ({ color = "text-red-600" }: { color?: string }) => (
  <svg className={`w-5 h-5 mr-2 mt-0.5 flex-shrink-0 ${color}`} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
  </svg>
);

const  MembershipSelector = () => {
  const [membershipType, setMembershipType] = useState<MembershipType>('personal');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMembership, setSelectedMembership] = useState('');
  

  // Функция для открытия модалки
  const handleOpenModal = (membership: string) => {
    setSelectedMembership(membership);
    setIsModalOpen(true);
  };

  // Функция при успешной отправке
  const handleSuccess = () => {
    // Можно добавить уведомление об успехе
    console.log(`Lead captured for: ${selectedMembership}`);
  };
 

  // Тексты на португальском
  const texts = {
    title: 'Junte-se a Costco ',
    subtitle: 'Ainda não é membro da Costco? Compre sua assinatura agora mesmo.',
    
    executive: {
      title: 'Assinatura Executiva',
      subtitle: 'Melhor Valor e Benefícios Exclusivos',
      price: ' R$ 550 ',
      tax: 'Para primeiros 10.000 sócios',
      button: 'Começa a economizar e ganhar',
      benefits: {
        collapsed: [
        'Preços exclusivos em produtos de alta qualidade',
       "Ofertas e promoções especiais para membros",
        'Recompensas e cashback em compras selecionadas',
        'Viagens e experiências exclusivas, inclusive no exterior',
       ' Acesso antecipado a lançamentos e eventos especiais'
        ],
        expanded: [
          {
            title: 'Preços exclusivos em produtos de alta qualidade',
            description: 'Até $1.250 em compras elegíveis da Costco e Costco Travel. Aplicam-se Termos e Condições.'
          },
          {
            title:  "Ofertas e promoções especiais para membros",
            description: 'Segunda a sexta: 9h – 10h\nSábado: 9h – 9:30h\nDomingo: 9h – 10h'
          },
          {
            title: 'Recompensas e cashback em compras selecionadas',
            description: 'Receba um crédito mensal de $10 para uso em pedidos elegíveis de $150+ e receba seus favoritos do armazém diretamente em sua porta, em até 1 hora.'
          },
          {
            title:'Viagens e experiências exclusivas, inclusive no exterior',
            description: 'Benefícios executivos e descontos em serviços selecionados da Costco'
          },
          {
            title: ' Acesso antecipado a lançamentos e eventos especiais',
            description: 'Compre em todas as lojas Costco e online em Costco.com'
          }
        ]
      }
    },

    goldStar: {
      title: 'Assinatura Gold Star',
      subtitle: 'Valor do Dia a Dia',
      price: 'R$ 275',
      tax: ' Para primeiros 10.000 sócios',
      button: 'Começa a economizar e ganhar',
      benefits: {
        collapsed: [
            
           ' Acesso antecipado a lançamentos e eventos especiais',

             'Recompensas e cashback em compras selecionadas',
           'Viagens e experiências exclusivas, inclusive no exterior',
            'Preços exclusivos em produtos de alta qualidade',
            "Ofertas e promoções especiais para membros"

        ],
        expanded: [
          
           {
            title: ' Acesso antecipado a lançamentos e eventos especiais',
            description: 'Compre em todas as lojas Costco e online em Costco.com'
          },
          {
            title: 'Recompensas e cashback em compras selecionadas',
            description: 'Receba um crédito mensal de $10 para uso em pedidos elegíveis de $150+ e receba seus favoritos do armazém diretamente em sua porta, em até 1 hora.'
          },
          {
            title:'Viagens e experiências exclusivas, inclusive no exterior',
            description: 'Benefícios executivos e descontos em serviços selecionados da Costco'
          },
          {
            title: 'Preços exclusivos em produtos de alta qualidade',
            description: 'Até $1.250 em compras elegíveis da Costco e Costco Travel. Aplicam-se Termos e Condições.'
          },
         
          {
            title:  "Ofertas e promoções especiais para membros",
            description: 'Segunda a sexta: 9h – 10h\nSábado: 9h – 9:30h\nDomingo: 9h – 10h'
          },
        ]
      }
    },

    business: {
      title: 'Assinatura Empresarial',
      subtitle: 'Valor Empresarial',
      price: 'R$275',
      tax: 'Mais impostos aplicáveis',
      button: 'Começa a economizar e ganhar',
      benefits: {
        collapsed: [
          'Recompensa Anual de 2%',
          'Horários de Compras para Membros Executivos',
          'Crédito Mensal de $10 no SameDay.Costco.com ou Costco via Instacart¹',
          'Valor Adicional nos Serviços Costco',
          'Compre Online e nas Lojas',
          'Compre para Revenda',
          'Inclui 2 Cartões de Assinatura',
          'Adicione Pessoas Adicionais ($65 cada)',
          'Garantia de Satisfação de 100%'
        ],
        expanded: [
          {
            title: 'Recompensa Anual de 2%',
            description: 'Até $1.250 em compras elegíveis da Costco e Costco Travel. Aplicam-se Termos e Condições.'
          },
          {
            title: 'Horários de Compras para Membros Executivos',
            description: 'Segunda a sexta: 9h – 10h\nSábado: 9h – 9:30h\nDomingo: 9h – 10h'
          },
          {
            title: 'Crédito Mensal de $10 no SameDay.Costco.com ou Costco via Instacart¹',
            description: 'Receba um crédito mensal de $10 para uso em pedidos elegíveis de $150+ e receba seus favoritos do armazém diretamente em sua porta, em até 1 hora.'
          },
          {
            title: 'Valor Adicional nos Serviços Costco',
            description: 'Benefícios executivos e descontos em serviços selecionados da Costco'
          },
          {
            title: 'Compre Online e nas Lojas',
            description: 'Compre em todas as lojas Costco e online em Costco.com'
          },
          {
            title: 'Compre para Revenda',
            description: 'A revenda de bebidas alcoólicas é proibida, exceto onde permitido por lei estadual'
          },
          {
            title: 'Inclui 2 Cartões de Assinatura',
            description: 'Para você e para alguém da sua casa'
          },
          {
            title: 'Adicione Pessoas Adicionais ($65 cada)',
            description: 'Para adicionar Afiliados à sua Assinatura Empresarial, visita o balcão de assinaturas em qualquer armazém'
          },
          {
            title: 'Garantia de Satisfação de 100%',
            description: 'Cancelaremos e reembolsaremos sua assinatura a qualquer momento se você ficar insatisfeito'
          }
        ]
      }
    }
  };


  
  const currentRightCard = membershipType === 'personal' ? texts.goldStar : texts.business;

  // Функция для отображения иконки в правой карточке
  const renderRightCardIcon = (index: number) => {
    // Для правой карточки: первые 4 пункта - крестики, остальные - галочки
    if (index < 3) {
      return <CrossIcon />;
    } else {
      return <CheckIcon />;
    }
  };

  return (
    <div data-component="membership-selector" className="bg-blue-600 lg:bg-[linear-gradient(to_bottom,_#0060a9_70%,_white_30%)]">
      <div className="relative w-full max-w-[1400px] mx-auto px-4 py-8">
        {/* Синий фон */}
        
        {/* Заголовок */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-2">{texts.title}</h1>
          <p className="text-3xl text-white">{texts.subtitle}</p>
        </div>

        {/* Карточки */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Левая карточка - Executive */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border-4 max-w-[90%] mx-auto">
            <div className="bg-red-600 p-6 text-white text-center">
              <h2 className="text-3xl font-bold mb-2">{texts.executive.title}</h2>
              <p className="text-red-100">{texts.executive.subtitle}</p>
            </div>
            
            <div className="p-6">
              <div className="flex flex-col md:flex-row items-center justify-center mx-10 mb-6">
                <Image 
                  src="/blackCard.avif" 
                  alt="Cartão Executivo"
                  width={160}
                  height={80}
                  className="object-contain mb-4 md:mb-0 mr-0 md:mr-10"
                />
                <div className="w-[max-content] md:text-center">
                  <div className=" text-3xl font-bold text-gray-900"><div className='flex text-xl'> <p className='text-decoration: line-through'>R$ 1.100</p>ㅤpor ano por</div> {texts.executive.price}</div>
                  <div className="text-gray-600 text-sm">{texts.executive.tax}</div>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center justify-center">
                 <button 
                onClick={() => handleOpenModal('executive')}
                className="w-[max-content] bg-blue-600 text-white py-3 px-3 rounded-lg font-semibold mb-6 hover:bg-blue-700 transition-colors"
              >
                {texts.executive.button}
              </button>
              </div>

              <div className={`transition-all duration-300 ${isExpanded ? 'max-h-[2000px]' : 'max-h-120'} overflow-hidden px-5`}>
                <p className='text-2xl text-gray-700 font-medium  '>Acesso Completo aos Benefícios da Costco!
                    <br />Ao se tornar sócio, você aproveita: </p> <br />
                <ul className="space-y-3 mb-4">
                  {(isExpanded ? texts.executive.benefits.expanded : texts.executive.benefits.collapsed).map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <CheckIcon />
                      <div className="text-gray-700">
                        <span className="font-medium text-2xl">
                          {typeof benefit === 'string' ? benefit : benefit.title}
                        </span>
                        {isExpanded && typeof benefit !== 'string' && (
                          <p className="text-gray-600 text-sm mt-1 whitespace-pre-line">
                            {benefit.description}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-blue-600 font-semibold hover:underline px-5"
              >
                {isExpanded ? 'Ocultar Detalhes' : 'Ver Detalhes dos Benefícios ✓'}
              </button>
            </div>
          </div>

          {/* Правая карточка - Gold Star/Business */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-[90%] mx-auto">
            <div className="bg-[#CCCCCC] p-6 text-black text-center">
              <h2 className="text-3xl font-bold mb-2">{currentRightCard.title}</h2>
              <p className="text-black">{currentRightCard.subtitle}</p>
            </div>
            
            <div className="p-6">
              <div className="flex flex-col md:flex-row items-center justify-center mx-10 mb-6">
                <Image 
                  src={membershipType === 'personal' ? "/whiteCard.avif" : "/whiteCardB.avif"} 
                  alt={membershipType === 'personal' ? "Cartão Gold Star" : "Cartão Empresarial"}
                  width={160}
                  height={80}
                  className="object-contain mb-4 md:mb-0 mr-0 md:mr-10"
                />
                <div className="w-[max-content] md:text-center">
                  <div className="text-3xl font-bold text-gray-900"><div className='flex text-xl'><p className='text-decoration: line-through'>R$ 550</p>ㅤpor ano por</div> {currentRightCard.price}</div>
                  <div className="text-gray-600 text-sm">{currentRightCard.tax}</div>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center justify-center">
              <button 
                onClick={() => handleOpenModal(membershipType === 'personal' ? 'goldstar' : 'business')}
                className="w-[max-content] px-3 bg-white text-blue-600 border border-blue-600 py-3 rounded-lg font-semibold mb-6 hover:bg-blue-50 transition-colors"
              >
                {currentRightCard.button}
              </button>
              </div>

              <div className={`transition-all duration-300 ${isExpanded ? 'max-h-[2200px]' : 'max-h-140'} overflow-hidden px-5`}>
                      <div className='text-2xl text-gray-700 font-medium '><p className='text-decoration: line-through '>Acesso Completo aos Benefícios da Costco!</p>
                    Ao se tornar sócio, você aproveita: </div> <br />
                <ul className="space-y-3 mb-2">
                  {(isExpanded ? currentRightCard.benefits.expanded : currentRightCard.benefits.collapsed).map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      {renderRightCardIcon(index)}
                      <div className="text-gray-700">
                        <span className="font-medium text-2xl">
                          {typeof benefit === 'string' ? benefit : benefit.title}
                        </span>
                        {isExpanded && typeof benefit !== 'string' && (
                          <p className="text-gray-600 text-sm mt-1 whitespace-pre-line">
                            {benefit.description}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-blue-600 font-semibold hover:underline px-5"
              >
                {isExpanded ? 'Ocultar Detalhes' : 'Ver Detalhes dos Benefícios ✓'}
              </button>
            </div>
          </div>
        </div>

        {/* Переключатель типа членства */}
        <div className="text-center flex flex-col border-1 border-black rounded-xl p-5 md:flex-row items-center justify-center bg-blue-100 max-w-[800px] mx-[auto] ">
          <h3 className="text-lg font-semibold mr-4 mb-2 md:mb-0">Escolha o tipo de assinatura:</h3>
          <div className="flex justify-center space-x-4 flex flex-col md:flex-row">
            <button
              onClick={() => setMembershipType('personal')}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                membershipType === 'personal' 
                   ? 'bg-blue-200 text-blue-600 border-1' 
                  : 'bg-gray-200 text-blue-600 border-1 hover:bg-blue-200 '
              }`}
            >
              Assinatura Pessoal
            </button>
            <button
              onClick={() => setMembershipType('business')}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                membershipType === 'business' 
                   ? 'bg-blue-200 text-blue-600 border-1' 
                  : 'bg-gray-200 text-blue-600 border-1 hover:bg-blue-200'
              }`}
            >
              Assinatura Empresarial
            </button>
          </div>
        </div>
      </div>
       <EmailModal 
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  membershipType={selectedMembership}
/>
    </div>
  );
};

export default MembershipSelector;