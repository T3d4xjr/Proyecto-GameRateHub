import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jhmitdlfkwyudwteerpt.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpobWl0ZGxma3d5dWR3dGVlcnB0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY3NTc2NTEsImV4cCI6MjA1MjMzMzY1MX0.8qqUQJZGPsU0FmDDMhRkVJ1QWNkaWOQsG2OleVEY0Lk';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req) {
  try {
    const { nombre, email, password } = await req.json();

    if (!email || !password || !nombre) {
      return new Response(
        JSON.stringify({ error: 'Todos los campos son obligatorios' }),
        { status: 400 }
      );
    }

    const { data: existingUser, error: fetchError } = await supabase
      .from('usuario')
      .select('email')
      .eq('email', email)
      .single();

    if (existingUser) {
      return new Response(
        JSON.stringify({ error: 'El correo electrónico ya está registrado' }),
        { status: 400 }
      );
    }

    const { user, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { nombre }, 
      },
    });

    if (authError) {
      console.error('Error en la autenticación:', authError);
      return new Response(JSON.stringify({ error: authError.message }), {
        status: 400,
      });
    }

    const { data: dbData, error: dbError } = await supabase
      .from('usuario')
      .insert([
        {
          nombre,
          email,
        },
      ]);

    if (dbError) {
      console.error('Error al insertar en la base de datos:', dbError);
      return new Response(
        JSON.stringify({
          error: `Error en la base de datos: ${dbError.message}`,
        }),
        { status: 400 }
      );
    }

    return new Response(
      JSON.stringify({ message: 'Usuario registrado exitosamente' }),
      { status: 200 }
    );
  } catch (err) {
    console.error('Error en el servidor:', err);
    return new Response(JSON.stringify({ error: 'Error en el servidor' }), {
      status: 500,
    });
  }
}
