'use client';

import Image from 'next/image';

const AboutCostco = () => {
  // Тексты на португальском
  const content = {
    mission: {
      title: "Missão e Valores",
      missionTitle: "Missão",
      missionText: "Oferecer aos nossos associados a melhor qualidade em cada produto e serviço, sempre ao preço direto do fabricante, nenhum centavo a mais!",
      valuesTitle: "Valores:",
      valuesText: "Nosso código de ética organizacional se baseia em quatro pilares principais:",
      pillars: [
        "Obediência à lei",
        "Cuidado com nossos associados",
        "Cuidado com nossos colaboradores", 
        "Respeito aos nossos fornecedores"
      ],
      conclusion: "Cumprindo esses pilares, atingimos nosso objetivo final: recompensar nossos associados.",
      principlesTitle: "Princípios Operacionais",
      principles: [
        "A mercadoria correta",
        "No local adequado", 
        "No momento certo",
        "Na condição desejada",
        "Com compromisso definitivo",
        "O preço final que o associado paga é exatamente o mesmo praticado pelo fabricante, sem intermediários ou acréscimos"
      ]
    },
    current: {
      title: "Atualidade da Costco (em 01/09/2025)",
      statsTitle: "Número total de armazéns: 840",
      regionsTitle: "Distribuição por região:",
      regions: [
        { name: "Número de armazéns", count: '833 (em 01/09/2022)' },
        { name: " Estados Unidos e Porto Rico", count: '625' },
        { name: "Canadá", count: 107 },
        { name: "México", count: 40 },
        { name: "Japão", count: 31 },
        { name: "Reino Unido", count: 29 },
        { name: "Coreia do Sul", count: 18 },
        { name: "Austrália", count: 14 },
        { name: "Taiwan", count: 14 },
        { name: "Brasil", count: '7 (em breve)' },
        { name: "Espanha", count: 4 },
        { name: "França", count: 2 },
        { name: "Suécia", count: 2 },
        { name: "Islândia", count: 1 },
        { name: "Nova Zelândia", count: 1 }
      ]
    },
    history: {
      title: "História",
      timeline: [
        { year: "1976", label: "PRICE CLUB" },
        { year: "1983", label: "COSTCO WHOLESALE" }, 
        { year: "1993", label: "PRICE COSTCO" },
        { year: "1997", label: "COSTCO WHOLESALE" }
      ],
      text: [
        "1976 – Origem como Price Club: A companhia começou como Price Club, inaugurando sua primeira loja em um hangar de aviões em New Boulevard, San Diego. Inicialmente, atendia pequenos negócios, mas rapidamente identificou uma oportunidade de mercado ao permitir que particulares também comprassem sem a necessidade de serem empresas, impulsionando um crescimento impressionante dos clubes de compras.",
        "1983 – Primeira loja Costco: A primeira loja Costco foi inaugurada em Seattle. A empresa se destacou por seu rápido crescimento, chegando a 3 bilhões de dólares em vendas em menos de seis anos.",
        " 1993 – Fusão com Price Club: Quando a Costco se uniu ao Price Club, a empresa operou sob o nome PriceCostco, contando com 206 localizações e 16 bilhões de dólares em vendas anuais.",
        " Estratégia de negócios: A filosofia da Costco sempre foi simples: manter preços baixos e repassar as economias aos associados. Sua grande base de membros e o poder de compra combinado com eficiência operacional permitem oferecer preços ainda melhores.",
        "1997 – Reconversão para Costco: Após a mudança de nome para Costco, a companhia expandiu globalmente, alcançando mais de 64 bilhões de dólares em vendas."
      ]
    }
  };

  return (
    <div className=" bg-white"><div className=" max-w-[1400px] mx-auto px-4 py-16 bg-white">
      {/* Missão e Valores */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-left">
          {content.mission.title}
        </h2>
        
        <div className="mb-2">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {content.mission.missionTitle}
          </h3>
          <p className="text-gray-700 mb-2">
            {content.mission.missionText}
          </p>
        </div>

        <div className="mb-2">
          <h3 className="text-xm font-bold text-gray-900 mb-2">
            {content.mission.valuesTitle}
          </h3>
          <p className="text-gray-700 mb-4">
            {content.mission.valuesText}
          </p>
          
          <ul className="list-disc list-inside space-y-2 mb-2 text-gray-700">
            {content.mission.pillars.map((pillar, index) => (
              <li key={index}>{pillar}</li>
            ))}
          </ul>

          <p className="text-gray-700 mb-3">
            {content.mission.conclusion}
          </p>

          <p className="text-xm font-bold text-gray-900 mb-2">
            {content.mission.principlesTitle}
          </p> 
          <p className="text-gray-700 mb-2">
          Nossas operações seguem um rumo comum: adicionar valor às nossas afiliadas, garantindo:
           
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {content.mission.principles.map((principle, index) => (
              <li key={index}>{principle}</li>
            ))}
          </ul>
        </div>

        {/* Карта */}
        <div className="flex justify-left">
          <div className="relative w-full  h-180">
            <Image
              src="/map.png"
              alt="Mapa global da Costco"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </section>

      {/* Atualidade na Costco */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-left">
          {content.current.title}
        </h2>
        
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            {content.current.statsTitle}
          </h3>
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            {content.current.regionsTitle}
          </h4>
          
          <div className="space-y-3">
            {content.current.regions.map((region, index) => (
              <div key={index} className="flex  text-gray-700">
                <span className="font-bold mr-3">{region.count}</span>

                <span>{region.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* História */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-left">
                    História da Costco Wholesale

        </h2>

        {/* История логотипа */}
       
          <div className="relative w-[90%] h-[200] mx-[auto] ">
            <Image
              src="/logoHistory.jpg"
              alt="História dos logotipos da Costco"
              fill
              className="object-contain"
            />
          </div>
       

        {/* Текст истории */}
        <div className="space-y-4 text-gray-700">
          {content.history.text.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </section>
    </div></div>
    
  );
};

export default AboutCostco;