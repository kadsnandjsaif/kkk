import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-09-30.clover',
});

// Функция для определения суммы по типу membership
function getAmountByMembershipType(membershipType: string): number {
  const amounts: { [key: string]: number } = {
    'executive': 55000,    // 550 BRL в сентаво
    'goldstar': 27500,     // 275 BRL 
    'business': 27500,     // 275 BRL
    'personal': 27500,     // 275 BRL
  };
  return amounts[membershipType] || 27500;
}

export async function POST(request: Request) {
  try {
    const { email, membershipType } = await request.json();

    // Получаем сумму на основе типа membership
    const amount = getAmountByMembershipType(membershipType);

    // Создаем Payment Intent в Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'brl', // Бразильские реалы
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        customer_email: email,
        membership_type: membershipType
      },
      description: `Assinatura ${membershipType} - Costco`,
    });

    // Возвращаем client_secret для фронтенда
    return NextResponse.json({ 
      clientSecret: paymentIntent.client_secret,
      amount: amount 
    });
    
  } catch (error) {
    console.error('Stripe error:', error);
    return NextResponse.json(
      { error: 'Erro ao criar pagamento' },
      { status: 500 }
    );
  }
}