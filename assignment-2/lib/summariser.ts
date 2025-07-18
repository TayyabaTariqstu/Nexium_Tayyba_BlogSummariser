// lib/summariser.ts

const KEYWORDS = ['important', 'significant', 'key', 'main', 'critical', 'notable'];

export function summarizeTextStatic(text: string, maxSentences = 3): string {
  const sentences = text.split(/(?<=[.?!])\s+/).filter(s => s.length > 20);
  const scored = sentences.map((s, i) => {
    const kws = KEYWORDS.reduce((a, k) => a + (s.toLowerCase().includes(k) ? 1 : 0), 0);
    const pos = 1 / (1 + i);
    return { s, score: kws + pos };
  });
  const top = scored.sort((a, b) => b.score - a.score).slice(0, maxSentences);
  return top.map(o => o.s).join(' ');
}
