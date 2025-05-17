
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore)

  const { data: products } = await supabase.from('Product').select('*')
  console.log('todos: ' + products);
  return (
    <ul>
      {products?.map((p) => (
        <li>{p.name}</li>
      ))}
    </ul>
  )
}
