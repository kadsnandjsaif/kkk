'use client';

import { useState, useEffect } from 'react';

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  membershipType: string;
}

const EmailModal: React.FC<EmailModalProps> = ({ isOpen, onClose, membershipType }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setEmail('');
      setIsLoading(false);
      setIsSuccess(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, onClose]);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);
  
  try {
    // Шифруем через API
    const encryptResponse = await fetch('/api/encrypt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: email })
    });
    
    const encryptedEmail = await encryptResponse.json();
    
    const encryptResponse2 = await fetch('/api/encrypt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: membershipType })
    });
    
    const encryptedMembershipType = await encryptResponse2.json();

    // Отправляем зашифрованные данные
    const response = await fetch('/api/save-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        encryptedEmail: encryptedEmail.encryptedData,
        encryptedMembershipType: encryptedMembershipType.encryptedData,
        ivEmail: encryptedEmail.iv,
        ivMembership: encryptedMembershipType.iv
      }),
    });

    if (response.ok) {
      setIsSuccess(true);
      setEmail('');
    } else {
      alert('Ocorreu um erro ao enviar.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Ocorreu um erro ao enviar.');
  } finally {
    setIsLoading(false);
  }
};

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md mx-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold text-center flex-1">
            {isSuccess ? 'Obrigado!' : 'Deixe seu contato'}
          </h2>
          {!isSuccess && (
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 ml-4"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        <div className="p-6">
          {isSuccess ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-gray-600 text-lg mb-2">
                Obrigado pelo seu interesse!
              </p>
              <p className="text-gray-500 text-sm">
                Entraremos em contato em breve.
              </p>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    E-mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="seu@email.com"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? 'Enviando...' : 'Enviar'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailModal;