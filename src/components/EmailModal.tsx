'use client';

import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';

// Inicializa o Stripe com sua chave pública
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  membershipType: string;
}

const EmailModal: React.FC<EmailModalProps> = ({ isOpen, onClose, membershipType }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const [amount, setAmount] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Função para formatar o preço
  const formatPrice = (cents: number) => {
    return (cents / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  // Função para obter o nome do tipo de assinatura
  const getMembershipName = (type: string) => {
    const names: { [key: string]: string } = {
      'executive': 'Executiva',
      'goldstar': 'Gold Star', 
      'business': 'Empresarial',
      'personal': 'Pessoal'
    };
    return names[type] || type;
  };

  useEffect(() => {
    if (!isOpen) {
      setEmail('');
      setIsLoading(false);
      setIsSuccess(false);
      setShowPayment(false);
      setClientSecret('');
      setAmount(0);
      setErrorMessage(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, onClose]);

  // Função para exibir erro
  const showError = (message: string) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(null), 5000);
  };

  // Passo 1: Salvar email e criar pagamento
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    setErrorMessage(null);
    
    try {
      // 1. Primeiro salvamos o email
      const encryptResponse = await fetch('/api/encrypt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: email })
      });
      
      if (!encryptResponse.ok) throw new Error('Falha na criptografia');
      const encryptedEmail = await encryptResponse.json();
      
      const encryptResponse2 = await fetch('/api/encrypt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: membershipType })
      });
      
      if (!encryptResponse2.ok) throw new Error('Falha na criptografia');
      const encryptedMembershipType = await encryptResponse2.json();

      // Salva o lead
      const saveResponse = await fetch('/api/save-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          encryptedEmail: encryptedEmail.encryptedData,
          encryptedMembershipType: encryptedMembershipType.encryptedData,
          ivEmail: encryptedEmail.iv,
          ivMembership: encryptedMembershipType.iv
        }),
      });

      if (!saveResponse.ok) throw new Error('Falha ao salvar lead');

      // 2. Criamos a sessão de pagamento no Stripe
      const paymentResponse = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: email,
          membershipType: membershipType
        }),
      });

      if (!paymentResponse.ok) {
        const errorData = await paymentResponse.json();
        throw new Error(errorData.error || 'Falha ao criar pagamento');
      }
      
      const paymentData = await paymentResponse.json();
      
      if (paymentData.clientSecret) {
        setClientSecret(paymentData.clientSecret);
        setAmount(paymentData.amount);
        setShowPayment(true);
      } else {
        throw new Error('Nenhum client secret recebido');
      }
      
    } catch (error) {
      console.error('Erro:', error);
      showError(error instanceof Error ? error.message : 'Ocorreu um erro ao processar sua solicitação. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  // Componente do formulário de pagamento Stripe
  const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [paymentLoading, setPaymentLoading] = useState(false);

    const handlePaymentSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!stripe || !elements) return;

      setPaymentLoading(true);
      setErrorMessage(null);

      try {
        const { error } = await stripe.confirmPayment({
          elements,
          confirmParams: {
            return_url: `${window.location.origin}/success?email=${encodeURIComponent(email)}&type=${membershipType}`,
          },
          redirect: 'if_required',
        });

        if (error) {
          console.error('Erro no pagamento:', error);
          showError(`Erro no pagamento: ${error.message}`);
        } else {
          // Pagamento bem-sucedido!
          setIsSuccess(true);
        }
      } catch (error) {
        console.error('Erro no processamento do pagamento:', error);
        showError('Erro ao processar o pagamento.');
      } finally {
        setPaymentLoading(false);
      }
    };

    if (!clientSecret) {
      return <div>Carregando forma de pagamento...</div>;
    }

    return (
      <form onSubmit={handlePaymentSubmit} className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-lg mb-2">Resumo do Pedido</h3>
          <p className="text-gray-700">Assinatura: {getMembershipName(membershipType)}</p>
          <p className="text-gray-700">E-mail: {email}</p>
          <p className="text-xl font-bold text-green-600 mt-2">
            Total: {formatPrice(amount)}
          </p>
        </div>

        <div className="border rounded-lg p-4">
          <PaymentElement options={{
            layout: {
              type: 'tabs',
              defaultCollapsed: false,
            }
          }} />
        </div>
        
        <button
          type="submit"
          disabled={!stripe || paymentLoading}
          className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold text-lg"
        >
          {paymentLoading ? 'Processando pagamento...' : `Pagar ${formatPrice(amount)}`}
        </button>
        
        <p className="text-xs text-gray-500 text-center">
          Pagamento seguro processado por Stripe. Suas informações estão protegidas.
        </p>
      </form>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white">
          <h2 className="text-xl font-bold text-center flex-1">
            {isSuccess ? 'Pagamento Realizado!' : showPayment ? 'Finalizar Pagamento' : 'Deixe seu contato'}
          </h2>
          {!isSuccess && !isLoading && (
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 ml-4 flex-shrink-0"
              disabled={isLoading}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        <div className="p-6">
          {/* Mensagem de erro */}
          {errorMessage && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
              {errorMessage}
            </div>
          )}

          {isSuccess ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-gray-600 text-lg mb-2">
                Pagamento realizado com sucesso!
              </p>
              <p className="text-gray-500 text-sm">
                Obrigado por se juntar à Costco. Entraremos em contato em breve.
              </p>
            </div>
          ) : showPayment && clientSecret ? (
            <Elements stripe={stripePromise} options={{ clientSecret, locale: 'pt-BR' }}>
              <PaymentForm />
            </Elements>
          ) : (
            <>
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Assinatura {getMembershipName(membershipType)}
                </h3>
                <p className="text-gray-600">Preencha seu e-mail para continuar</p>
              </div>

              <form onSubmit={handleEmailSubmit} className="space-y-4">
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
                    disabled={isLoading}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !email}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
                >
                  {isLoading ? 'Processando...' : 'Continuar para Pagamento'}
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