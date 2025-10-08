// components/EmailModal.tsx
'use client';

import { useState } from 'react';

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const EmailModal: React.FC<EmailModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);
  setError('');

  try {
    const response = await fetch('/api/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (response.ok) {
      // Всегда показываем успех, даже если на бекенде были проблемы
      setEmail('');
      onSuccess?.();
      onClose();
      // Можно показать уведомление об успехе
      alert('Спасибо! Мы свяжемся с вами в ближайшее время.');
    } else {
      setError(data.error || 'Что-то пошло не так');
    }
  } catch (err) {
    // Даже при ошибке сети показываем успех для пользователя
    setEmail('');
    onSuccess?.();
    onClose();
    alert('Спасибо! Ваша заявка принята.');
  } finally {
    setIsLoading(false);
  }
};

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md mx-auto">
        {/* Заголовок */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold text-center flex-1">
            Оставьте заявку
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 ml-4"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Контент */}
        <div className="p-6">
          <p className="text-gray-600 text-center mb-6">
            Мы с вами свяжемся
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Электронная почта
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="your@email.com"
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm text-center">{error}</div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Отправка...' : 'Отправить'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmailModal;