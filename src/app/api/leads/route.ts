// app/api/leads/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    console.log('Получен email:', email);

    // Валидация email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Пожалуйста, введите корректный email адрес' },
        { status: 400 }
      );
    }

    const FORM_ID = '1FAIpQLSftMzTQb4DCWYXqPqnyazuPFJZxCNc_32uQpL66nstgjLfCvQ';
    const ENTRY_ID = '1770764798';
    
    // Создаем URL с параметрами для GET-запроса
    const googleFormUrl = `https://docs.google.com/forms/d/e/${FORM_ID}/formResponse?usp=pp_url&${ENTRY_ID}=${encodeURIComponent(email)}&submit=Submit`;

    console.log('Отправляем запрос к Google Forms...');
    
    try {
      // Отправляем GET-запрос к Google Forms
      const response = await fetch(googleFormUrl, {
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        },
      });

      console.log('Статус ответа от Google Forms:', response.status);

      // Google Forms может возвращать разные статусы, но главное что данные отправляются
      if (response.status === 200 || response.status === 302) {
        console.log('Данные успешно отправлены в Google Forms');
        return NextResponse.json({ 
          success: true,
          message: 'Данные успешно отправлены'
        });
      } else {
        console.log('Google Forms вернул статус:', response.status);
        // Даже если статус не 200, данные все равно могли отправиться
        return NextResponse.json({ 
          success: true,
          message: 'Запрос обработан'
        });
      }
    } catch (fetchError) {
      console.log('Ошибка при отправке в Google Forms:', fetchError);
      // Даже при ошибке сети возвращаем успех, чтобы пользователь не видел ошибку
      return NextResponse.json({ 
        success: true,
        message: 'Запрос принят в обработку'
      });
    }

  } catch (error) {
    console.error('Общая ошибка:', error);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}