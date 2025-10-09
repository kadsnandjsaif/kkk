import { decryptData } from '@/lib/encryption';
import { supabase } from '@/lib/supabaseClient';
export const dynamic = 'force-dynamic';
async function getLeads() {
  console.log('🟡 Fetching leads from Supabase...');
  
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('❌ Supabase fetch error:', error);
    throw new Error('Failed to fetch leads: ' + error.message);
  }

  console.log('✅ Leads fetched:', data?.length || 0);
  console.log('Sample lead:', data?.[0]);
  
  return data || [];
}

export default async function AdminPage() {
  try {
    const leads = await getLeads();
    
    console.log('🟡 Processing leads:', leads.length);
    
    // Расшифровываем данные
    const decryptedLeads = leads.map(lead => {
      try {
        console.log('🔓 Decrypting lead:', lead.id);
        const email = decryptData(lead.encrypted_email, lead.iv);
        const membershipType = decryptData(lead.encrypted_membership_type, lead.iv);
        
        console.log('✅ Decrypted:', { email, membershipType });
        
        return {
          ...lead,
          email,
          membershipType
        };
      } catch (error) {
        console.error('❌ Decryption error for lead', lead.id, error);
        return {
          ...lead,
          email: '❌ Decryption Error',
          membershipType: '❌ Decryption Error'
        };
      }
    });

    console.log('✅ Final decrypted leads:', decryptedLeads.length);

    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-xl rounded-lg overflow-hidden">
            {/* Заголовок */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-4">
              <h1 className="text-2xl font-bold text-white">
                Панель администратора - Заявки
              </h1>
              <p className="text-blue-100 mt-1">
                Всего заявок: {decryptedLeads.length}
              </p>
              <p className="text-blue-100 text-sm">
                {typeof window !== 'undefined' ? 'Client-side' : 'Server-side'}
              </p>
            </div>

            {/* Таблица */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Тип членства
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Дата подачи
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {decryptedLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500">
                        {lead.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {lead.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {lead.membershipType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(lead.created_at).toLocaleString('pt-BR')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {decryptedLeads.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                  </div>
                  <p className="text-gray-500 text-lg">Пока нет заявок</p>
                  <p className="text-gray-400 text-sm mt-2">
                    Данные появятся здесь после отправки форм на сайте
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('❌ Admin page error:', error);
    
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <div className="text-red-500 text-center mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-800 text-center mb-4">
            Ошибка загрузки данных
          </h2>
          <p className="text-gray-600 text-center">
            !!!
          </p>
          <div className="mt-6 text-center">
            <button 
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
            >
              Обновить страницу
            </button>
          </div>
        </div>
      </div>
    );
  }
}