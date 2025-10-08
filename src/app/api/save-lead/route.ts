import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, membershipType } = await request.json();
    
    // URL для отправки данных в Google Forms
    const googleFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSftMzTQb4DCWYXqPqnyazuPFJZxCNc_32uQpL66nstgjLfCvQ/formResponse';
    
    // Создаем FormData для отправки в Google Forms
    const formData = new URLSearchParams();
    formData.append('entry.129178783', email);
    // Если нужно сохранять membershipType, добавьте еще одно поле в Google Forms
    // formData.append('entry.XXXXXXX', membershipType);

    // Отправляем данные в Google Forms
    const response = await fetch(googleFormUrl, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (response.ok) {
      return NextResponse.json({ success: true });
    } else {
      console.error('Google Forms error:', response.status);
      return NextResponse.json({ error: 'Ошибка отправки в Google Forms' }, { status: 500 });
    }
  } catch (error) {
    console.error('Save lead error:', error);
    return NextResponse.json({ error: 'Ошибка сохранения' }, { status: 500 });
  }
}