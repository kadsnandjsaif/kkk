import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function POST(request: NextRequest) {
  try {
    const { 
      encryptedEmail, 
      encryptedMembershipType, 
      ivEmail, 
      ivMembership 
    } = await request.json();

    // Сохраняем зашифрованные данные в Supabase
    const { data, error } = await supabase
      .from('leads')
      .insert([
        { 
          encrypted_email: encryptedEmail,
          encrypted_membership_type: encryptedMembershipType,
          iv: ivEmail // сохраняем IV для email
        }
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Database error' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, data },
      { status: 200 }
    );

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}