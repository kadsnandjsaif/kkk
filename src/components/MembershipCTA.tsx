// components/MembershipCTA.tsx
'use client';

import React from 'react';

const MembershipCTA = () => {
  const scrollToMembershipSelector = () => {
    // Пытаемся найти компонент по классу или другим признакам
    const selectors = [
     
           '[data-component="membership-selector"]'

      
    ];
    
    let targetElement = null;
    
    for (const selector of selectors) {
      targetElement = document.querySelector(selector);
      if (targetElement) break;
    }
    
    if (targetElement) {
      targetElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    } else {
      // Если не нашли по селекторам, используем позицию
      const sections = document.querySelectorAll('main > div, main > section, body > div');
      if (sections.length > 1) {
        sections[1].scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div className="bg-white py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Pronto para se Tornar um Membro da Costco?
        </h2>
        
        <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-10xl mx-auto leading-relaxed">
          At Costco, were dedicated to providing quality products and exceptional services for our members.
        </p>
        
        <button
          onClick={scrollToMembershipSelector}
          className="bg-[#0053a1] hover:bg-[#004080] text-white font-bold py-4 px-8  text-lg md:text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          Torne-se um Membro
        </button>
      </div>
    </div>
  );
};

export default MembershipCTA;