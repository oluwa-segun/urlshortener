import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;

  const { data: link, error } = await supabase
    .from('links')
    .select('longUrl')
    .eq('slug', slug)
    .single();

  if (error || !link) {
    return new NextResponse('Not Found', { status: 404 });
  }

  return NextResponse.redirect(link.longUrl, { status: 301 });
} 