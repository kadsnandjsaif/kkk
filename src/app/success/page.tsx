'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [membershipType, setMembershipType] = useState('');

  useEffect(() => {
    const emailParam = searchParams.get('email');
    const typeParam = searchParams.get('type');
    
    if (emailParam) setEmail(decodeURIComponent(emailParam));
    if (typeParam) setMembershipType(decodeURIComponent(typeParam));
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Pagamento Realizado com Sucesso!
        </h1>
        
        <p className="text-gray-600 mb-4">
          Obrigado por se juntar à Costco com a assinatura {membershipType}.
        </p>
        
        {email && (
          <p className="text-gray-500 text-sm mb-6">
            Um e-mail de confirmação foi enviado para: <strong>{email}</strong>
          </p>
        )}
        
        <div className="bg-gray-50 rounded-lg p-4 text-left">
          <h3 className="font-semibold mb-2">Próximos passos:</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Você receberá um e-mail de confirmação</li>
            <li>• Seu cartão de membro será enviado em breve</li>
            <li>• Acesso imediato às vantagens Costco</li>
          </ul>
        </div>
      </div>
    </div>
  );
}