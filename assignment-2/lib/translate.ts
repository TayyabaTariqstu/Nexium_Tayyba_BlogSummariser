const urduDict: { [key: string]: string } = {
 // Basic verbs and nouns
  "is": "ہے",
  "are": "ہیں",
  "was": "تھا",
  "were": "تھے",
  "do": "کرتے",
  "does": "کرتا ہے",
  "did": "کیا",
  "go": "جاتے",
  "goes": "جاتا ہے",
  "went": "گیا",
  "have": "رکھتے ہیں",
  "has": "رکھتا ہے",
  "had": "رکھا تھا",
  "can": "سکتا ہے",
  "will": "کرے گا",
  "shall": "کرے گا",
  "should": "چاہیے",
  "must": "ضرور",
  "not": "نہیں",
  "i": "میں",
  "we": "ہم",
  "you": "تم",
  "he": "وہ",
  "she": "وہ",
  "they": "وہ لوگ",
  "it": "یہ",
  "this": "یہ",
  "that": "وہ",
  "these": "یہ لوگ",
  "those": "وہ لوگ",
  "and": "اور",
  "but": "لیکن",
  "or": "یا",
  "if": "اگر",
  "because": "کیونکہ",
  "why": "کیوں",
  "what": "کیا",
  "who": "کون",
  "how": "کیسے",
  "when": "کب",
  "where": "کہاں",
  "important": "اہم",
  "start": "شروع کریں",
  "next": "اگلا",
  "week": "ہفتہ",
  "day": "دن",
  "challenge": "چیلنج",
  "interview": "انٹرویو",
  "meeting": "میٹنگ",
  "code": "کوڈ",
  "design": "ڈیزائن",
  "real": "حقیقی",
  "consistency": "تسلسل",
  "luck": "قسمت",
  "course": "کورس",
  "developer": "ڈویلپر",
  "backend": "بیک اینڈ",
  "experience": "تجربہ",
  "scalable": "قابل توسیع",
  "confidence": "اعتماد",
  "fake": "جعلی",
  "understand": "سمجھنا",
  "explain": "سمجھانا",
  "build": "بنائیں",
  "make": "بنائیں",
  "summary": "خلاصہ",
  "translation": "ترجمہ",
  "english": "انگریزی",
  "urdu": "اردو",
  "blog": "بلاگ",
  "content": "مواد",
  "url": "لنک",
  "title": "عنوان",
  "author": "مصنف",
  "date": "تاریخ",
  "save": "محفوظ کریں",
  "progress": "پیش رفت",
  "status": "حیثیت",
  // ...add more words as needed
};

// ✅ Preserve casing for translated word
function matchCase(src: string, target: string): string {
  return src[0] === src[0].toUpperCase()
    ? target[0].toUpperCase() + target.slice(1)
    : target;
}

// ✅ Smart translator with casing and punctuation handling
export function translateToUrduStatic(text: string): string {
  return text
    .split(/\b/)
    .map((token) => {
      const lower = token.toLowerCase();
      return urduDict[lower] ? matchCase(token, urduDict[lower]) : token;
    })
    .join('');
}
