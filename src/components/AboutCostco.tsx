'use client';

import Image from 'next/image';

const AboutCostco = () => {
  // Тексты на португальском
  const content = {
    mission: {
      title: "Missão e Valores",
      missionTitle: "Missão",
      missionText: "Nossa missão é oferecer a nossos associados, a melhor qualidade em cada produto e serviço que oferecemos ao mais baixo preço possível.",
      valuesTitle: "Valores:",
      valuesText: "Nosso código de ética organizacional se baseia em quatro pilares principalmente:",
      pillars: [
        "Obediência à lei",
        "Cuidado com nossos associados",
        "Cuidado com nossos empregados", 
        "Respeito aos nossos fornecedores"
      ],
      conclusion: "Cumprindo estas quatro metas alcançaremos o objetivo final: Recompensar a nossos Associados.",
      principlesTitle: "Nossas operações especializadas levam um rumo comum: adicionar valor a nossas afiliadas. Por isso, baseamo-nos nos seguintes princípios:",
      principles: [
        "A mercadoria correta",
        "No local adequado", 
        "No momento correto",
        "Na condição desejada",
        "No compromisso definitivo",
        "Pelo melhor preço de venda"
      ]
    },
    current: {
      title: "Atualidade en Costco",
      statsTitle: "Número de Armazéns",
      regionsTitle: "Armazéns por região",
      regions: [
        { name: "Número de armazéns", count: '833 (em 01/09/2022)' },
        { name: " Estados Unidos e Porto Rico", count: '625' },
        { name: "Canadá", count: 107 },
        { name: "México", count: 40 },
        { name: "Japão", count: 31 },
        { name: "Reino Unido", count: 29 },
        { name: "Coreia", count: 18 },
        { name: "Austrália", count: 14 },
        { name: "Taiwan", count: 14 },
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
        "A história de Costco Wholesale remonta a 1976, quando, sob o nome de Price Club, a companhia construiu uma loja em um hangar de aviões em New Boulevard, San Diego. Originalmente atendia a pequenos negócios, mas encontrou um nicho de mercado importante ao servir a particulares sem necessidade de ser negócios. Com esta decisão, o crescimento dos clubes de compra foi impressionante.",
        "Em 1983, a primeira loja de Costco abriu em Seattle. Costco foi a primeira companhia a crescer desde 0 a 3.000 milhões de dólares em vendas em menos de 6 anos.",
        "Quando Costco e Price Club se uniram em 1993, a companhia operava sob o nome de PriceCostco, já contava com 206 localizações e gerava 16.000 milhões de dólares anuais de vendas.",
        "A estratégia de Costco sempre foi simples: manter os preços baixos e repassar as economias a nossos associados. Nossa grande base de membros e nosso poder de compra, combinado com nossa busca incansável por eficiência, resultam em melhores preços para nossos membros.",
        "Desde a reconversão a Costco em 1997, a companhia tem crescido em todo o mundo superando os 64.000 milhões de dólares."
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

          <p className="text-gray-700 mb-2">
            {content.mission.conclusion}
          </p>

          <p className="text-gray-700 mb-2">
            {content.mission.principlesTitle}
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
          {content.history.title}
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