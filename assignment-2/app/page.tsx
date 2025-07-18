'use client';
import { useState } from 'react';
import { Globe, Sparkles, Zap } from 'lucide-react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [summary, setSummary] = useState('');
  const [translation, setTranslation] = useState('');
  const [loading, setLoading] = useState(false);
  const [showUrdu, setShowUrdu] = useState(false);

  async function analyze() {
    try {
      setLoading(true);
      setShowUrdu(false);

      const res = await fetch('/api/summarise', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ url }),
});


      const data = await res.json();
      if (data.error) {
        alert(data.error);
      } else {
        setSummary(data.englishSummary);
        setTranslation(data.urduSummary);
      }
    } catch (err) {
      alert('Something went wrong!');
    } finally {
      setLoading(false);
    }
  }

  const Feature = ({ icon: Icon, title, desc }: any) => (
    <div className="p-6 bg-[#1f2937] rounded-xl border border-[#374151] hover:border-purple-500 hover:scale-105 transition">
      <Icon className="text-purple-400 w-8 h-8 mb-3" />
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-400">{desc}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#111827] text-white px-6 py-12">
      <div className="max-w-3xl mx-auto space-y-10">
        <h1 className="text-4xl font-bold text-center text-purple-400">
          Blog Summarizer
        </h1>

        <div className="flex gap-4">
          <div className="flex items-center bg-[#1f2937] p-2 rounded-lg border border-[#374151] flex-grow">
            <Globe className="text-gray-400 mr-2 w-6 h-6" />
            <input
              type="url"
              className="bg-transparent grow outline-none placeholder-gray-500"
              placeholder="https://example.com/blog"
              value={url}
              onChange={e => setUrl(e.target.value)}
            />
          </div>
          <button
            disabled={!url || loading}
            className="bg-purple-600 px-6 rounded-lg disabled:opacity-50 flex items-center"
            onClick={analyze}
          >
            {loading ? 'Analyzing...' : 'Analyze Blog'} <Sparkles className="ml-2" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Feature icon={Globe} title="Smart Scraping" desc="Extracts full readable content." />
          <Feature icon={Sparkles} title="AI Summary" desc="Concise 2–3 sentence summary." />
          <Feature icon={Zap} title="Neural Translation" desc="Dictionary-based Urdu translation." />
        </div>

        {loading && (
          <div className="flex justify-center py-8">
            <div className="animate-spin h-10 w-10 border-4 border-purple-600 rounded-full border-t-transparent"></div>
          </div>
        )}

        {summary && !loading && (
          <div className="space-y-6">
            <div className="bg-[#1f2937] p-6 rounded-2xl border border-[#374151]">
              <h2 className="flex items-center text-xl font-semibold text-purple-400">
                <Sparkles className="mr-2" /> Summary (English)
              </h2>
              <p className="mt-4 text-gray-200 leading-relaxed">{summary}</p>
            </div>

            <div className="bg-[#1f2937] p-6 rounded-2xl border border-[#374151]">
              <h2 className="flex items-center text-xl font-semibold text-purple-400">
                <Sparkles className="mr-2" /> Summary (Urdu)
              </h2>
              <button
                className="mt-2 text-green-400 hover:underline"
                onClick={() => setShowUrdu(!showUrdu)}
              >
                {showUrdu ? 'Hide Urdu Translation' : 'Click to view Urdu translation'}
              </button>
              {showUrdu && <p className="mt-4 text-gray-200 leading-relaxed">{translation}</p>}
            </div>

            <div className="text-gray-500 text-sm">
              Words: ~{summary.split(' ').length} •{' '}
              <a href={url} target="_blank" className="underline hover:text-purple-400">
                Original Blog
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
