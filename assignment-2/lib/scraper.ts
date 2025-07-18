// lib/scraper.ts

import { JSDOM } from 'jsdom';
import { Readability } from '@mozilla/readability';

export interface Article {
  title: string;
  author: string;
  date: string;
  content: string;
}

export async function extractBlogContent(url: string): Promise<Article> {
  const res = await fetch(url);
  const html = await res.text();
  const dom = new JSDOM(html, { url });

  const title = dom.window.document.querySelector('h1')?.textContent?.trim() || '';
  const author = dom.window.document.querySelector('[rel="author"]')?.textContent?.trim()
    || dom.window.document.querySelector('.author')?.textContent?.trim() || '';
  const date = dom.window.document.querySelector('time')?.getAttribute('datetime') || '';

  const reader = new Readability(dom.window.document);
  const article = reader.parse();
  const content = article?.textContent?.trim() || '';

  return { title, author, date, content };
}
