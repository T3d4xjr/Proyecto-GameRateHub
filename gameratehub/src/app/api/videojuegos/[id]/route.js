import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jhmitdlfkwyudwteerpt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpobWl0ZGxma3d5dWR3dGVlcnB0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY3NTc2NTEsImV4cCI6MjA1MjMzMzY1MX0.8qqUQJZGPsU0FmDDMhRkVJ1QWNkaWOQsG2OleVEY0Lk';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(req) {
  try {
    const url = new URL(req.url); 
    const id = url.pathname.split('/').pop(); 

    if (!id) {
      return new Response(
        JSON.stringify({ error: 'Falta el parámetro id' }),
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('videojuegos')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    }

    if (!data) {
      return new Response(
        JSON.stringify({ message: 'Videojuego no encontrado' }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify({ videojuego: data }), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Hubo un error interno' }),
      { status: 500 }
    );
  }
}