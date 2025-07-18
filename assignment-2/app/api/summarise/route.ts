// app/api/summarise/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { extractBlogContent } from '@/lib/scraper';
import { summarizeTextStatic } from '@/lib/summariser';
import { translateToUrduStatic } from '@/lib/translate';
import { supabase } from '@/lib/supabase';
import { connectMongo, Blog } from '@/lib/mongodb';



export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();
    if (!url) return NextResponse.json({ error: 'Missing URL' }, { status: 400 });

    const article = await extractBlogContent(url);
    if (!article.content || article.content.length < 50) {
      return NextResponse.json({ error: 'Could not fetch content.' }, { status: 422 });
    }

    const summary = summarizeTextStatic(article.content);
    const urduSummary = translateToUrduStatic(summary);

    // Supabase insert
    await supabase.from('summaries').insert({
      url,
      title: article.title,
      author: article.author,
      date: article.date,
      summary,
      urdu_summary: urduSummary,
    });

    // MongoDB archive
    await connectMongo();
    await Blog.create({ blogUrl: url, fullText: article.content });

    return NextResponse.json({ englishSummary: summary, urduSummary });
  } catch (err) {
    console.error('[PROCESS ERROR]', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
