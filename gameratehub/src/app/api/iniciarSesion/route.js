import { createClient } from '@supabase/supabase-js';

// URL y clave de Supabase
const supabaseUrl = 'https://jhmitdlfkwyudwteerpt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpobWl0ZGxma3d5dWR3dGVlcnB0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY3NTc2NTEsImV4cCI6MjA1MjMzMzY1MX0.8qqUQJZGPsU0FmDDMhRkVJ1QWNkaWOQsG2OleVEY0Lk';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: 'Email y contraseña son requeridos' }),
        { status: 400 }
      );
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Error de autenticación:', error.message);
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 400 }
      );
    }

    const userName = data.user.user_metadata?.nombre || 'Usuario';

    return new Response(
      JSON.stringify({
        session: data.session,
        userName,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error en el servidor:', error);
    return new Response(
      JSON.stringify({ error: 'Error en el servidor' }),
      { status: 500 }
    );
  }
}
