import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jhmitdlfkwyudwteerpt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpobWl0ZGxma3d5dWR3dGVlcnB0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY3NTc2NTEsImV4cCI6MjA1MjMzMzY1MX0.8qqUQJZGPsU0FmDDMhRkVJ1QWNkaWOQsG2OleVEY0Lk';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET() {
  const { data: generos, error: errorGeneros } = await supabase
    .from('generos')
    .select('*');
  
  if (errorGeneros) {
    return new Response(
      JSON.stringify({ error: errorGeneros.message }),
      { status: 400 }
    );
  }
  if (!generos || generos.length === 0) {
    return new Response(
      JSON.stringify({ message: 'No generos disponibles' }),
      { status: 404 }
    );
  }

  const generosConVideojuegos = await Promise.all(
    generos.map(async (genero) => {
      const { data: videojuegos, error: errorVideojuegos } = await supabase
        .from('videojuegos')
        .select('id, titulo, imagen')
        .eq('genero_id', genero.id);
        
      if (errorVideojuegos) {
        console.error(`Error al obtener los videojuegos para el género ${genero.id}: `, errorVideojuegos.message);
        return {
          ...genero,
          videojuegos: [], 
        };
      }

      return {
        ...genero,
        videojuegos: videojuegos || [],
      };
    })
  );

  return new Response(
    JSON.stringify({ generos: generosConVideojuegos }),
    { status: 200 }
  );
}
