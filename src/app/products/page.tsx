
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore)

  const { data: todos } = await supabase.from('Product').select()
  console.log('todos: ' + todos);
  return (
    <ul>
      {todos?.map((todo) => (
        <li>{todo}</li>
      ))}
    </ul>
  )
}
