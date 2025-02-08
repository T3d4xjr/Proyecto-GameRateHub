import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jhmitdlfkwyudwteerpt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpobWl0ZGxma3d5dWR3dGVlcnB0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY3NTc2NTEsImV4cCI6MjA1MjMzMzY1MX0.8qqUQJZGPsU0FmDDMhRkVJ1QWNkaWOQsG2OleVEY0Lk';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(req) {
  try {
    const authorization = req.headers.get('Authorization');
    if (!authorization) {
      return new Response(JSON.stringify({ error: 'Token de autorización no proporcionado' }), { status: 400 });
    }

    const token = authorization.replace('Bearer ', '');
    const { data: session, error: sessionError } = await supabase.auth.getUser(token);

    if (sessionError || !session?.user) {
      return new Response(JSON.stringify({ error: 'Token inválido o expirado' }), { status: 401 });
    }

    const { data, error } = await supabase
      .from('usuario')
      .select('id, nombre, email, pais, localidad, telefono, informacion, foto_perfil')
      .eq('email', session.user.email)
      .single();

    if (error) {
      return new Response(JSON.stringify({ error: 'No se pudo obtener el perfil del usuario' }), { status: 500 });
    }

    return new Response(JSON.stringify({ user: data }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error interno del servidor' }), { status: 500 });
  }
}

export async function PUT(req) {
  try {
    let requestBody;
    try {
      requestBody = await req.json();
    } catch (jsonError) {
      return new Response(JSON.stringify({ error: 'El cuerpo de la solicitud no es JSON válido.' }), { status: 400 });
    }

    const { pais, localidad, telefono, informacion, foto_perfil } = requestBody;
    const authorization = req.headers.get('Authorization');

    if (!authorization) {
      return new Response(JSON.stringify({ error: 'Token de autorización no proporcionado' }), { status: 400 });
    }

    const token = authorization.replace('Bearer ', '');
    const { data: session, error: sessionError } = await supabase.auth.getUser(token);

    if (sessionError || !session?.user) {
      return new Response(JSON.stringify({ error: 'Token inválido o expirado' }), { status: 401 });
    }

    let fotoUrl = foto_perfil;

    if (foto_perfil && foto_perfil instanceof File) {
      const fileName = `${Date.now()}-${foto_perfil.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('profiles')
        .upload(fileName, foto_perfil);

      if (uploadError) {
        console.error('Error al subir la foto:', uploadError);
        return new Response(JSON.stringify({ error: 'Error al subir la foto.' }), { status: 500 });
      }

      const { publicURL, error: urlError } = supabase.storage
        .from('profiles')
        .getPublicUrl(uploadData.path);

      if (urlError) {
        console.error('Error al obtener la URL de la foto:', urlError);
        return new Response(JSON.stringify({ error: 'Error al obtener la URL de la foto.' }), { status: 500 });
      }

      fotoUrl = publicURL;
    }

    const { data: updatedUser, error: updateError } = await supabase
      .from('usuario')
      .update({ pais, localidad, telefono, informacion, foto_perfil: fotoUrl })
      .eq('email', session.user.email)
      .single();

    if (updateError) {
      console.error('Error al actualizar el perfil:', updateError);
      return new Response(JSON.stringify({ error: 'Error al actualizar el perfil del usuario' }), { status: 500 });
    }

    return new Response(JSON.stringify({ user: updatedUser }), { status: 200 });
  } catch (error) {
    console.error('Error inesperado:', error);
    return new Response(JSON.stringify({ error: 'Error interno del servidor' }), { status: 500 });
  }
}