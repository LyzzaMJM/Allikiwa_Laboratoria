// ---------------------------------------------------------------------------
// Allikiwa – Servicio de traducción con NLP Cloud (NLLB-200)
// Traduce español ↔ Quechua Chanka (Ayacucho) y Aimara usando la API de Meta NLLB
// ---------------------------------------------------------------------------

const NLPCLOUD_API_URL = 'https://api.nlpcloud.io/v1/nllb-200-3-3b/translation';

function getApiKey(): string {
  return import.meta.env.VITE_NLPCLOUD_API_KEY || '';
}

/**
 * Language codes for NLP Cloud NLLB-200 model (Flores-200 format)
 */
const LANG_CODES = {
  español: 'spa_Latn',
  chanka: 'quy_Latn',   // Ayacucho Quechua
  aimara: 'ayr_Latn',    // Central Aymara
} as const;

export interface TranslationResult {
  result: string;
  phonetics: string;
  note: string;
  source: 'api' | 'offline' | 'error';
}

/**
 * Genera una guía fonética aproximada a partir del texto traducido.
 * Separa en sílabas simples para ayudar a la pronunciación.
 */
function generatePhonetics(text: string): string {
  // Reglas básicas de silabificación para quechua/aimara
  return text
    .toLowerCase()
    .split(/\s+/)
    .map(word => {
      // Dividir en sílabas simples: consonante(s) + vocal(es) + consonante opcional
      const syllables: string[] = [];
      let current = '';
      const chars = word.split('');
      const vowels = 'aeiouáéíóúäëïöü';

      for (let i = 0; i < chars.length; i++) {
        current += chars[i];
        const isVowel = vowels.includes(chars[i]);
        const nextIsConsonant = i + 1 < chars.length && !vowels.includes(chars[i + 1]);
        const nextNextIsVowel = i + 2 < chars.length && vowels.includes(chars[i + 2]);

        if (isVowel && (
          i === chars.length - 1 || // Última letra
          (nextIsConsonant && nextNextIsVowel) || // CV-CV pattern
          (i + 1 < chars.length && vowels.includes(chars[i + 1])) // Dos vocales seguidas
        )) {
          // Si siguiente es consonante seguida de vocal, la consonante va con la siguiente sílaba
          if (nextIsConsonant && nextNextIsVowel) {
            syllables.push(current);
            current = '';
          } else if (i === chars.length - 1) {
            syllables.push(current);
            current = '';
          }
        } else if (isVowel && nextIsConsonant && !nextNextIsVowel && i + 1 < chars.length) {
          // Consonante al final de sílaba (CVC)
          current += chars[i + 1];
          i++;
          syllables.push(current);
          current = '';
        }
      }

      if (current) {
        if (syllables.length > 0) {
          syllables[syllables.length - 1] += current;
        } else {
          syllables.push(current);
        }
      }

      return syllables.length > 0 ? syllables.join('-') : word;
    })
    .join(' · ');
}

/**
 * Traduce texto usando la API de NLP Cloud con el modelo NLLB-200
 */
export async function translateWithApi(
  text: string,
  targetLang: 'chanka' | 'aimara'
): Promise<TranslationResult> {
  const apiKey = getApiKey();

  if (!apiKey) {
    return {
      result: '',
      phonetics: '',
      note: '',
      source: 'error',
    };
  }

  try {
    const response = await fetch(NLPCLOUD_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: text,
        source: LANG_CODES.español,
        target: targetLang === 'chanka' ? LANG_CODES.chanka : LANG_CODES.aimara,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => '');
      console.warn(`NLP Cloud API error ${response.status}: ${errorText}`);
      return {
        result: '',
        phonetics: '',
        note: '',
        source: 'error',
      };
    }

    const data = await response.json();
    const translatedText = data.translation_text || '';

    if (!translatedText) {
      return {
        result: '',
        phonetics: '',
        note: '',
        source: 'error',
      };
    }

    const langName = targetLang === 'chanka' ? 'Quechua Chanka' : 'Aimara';
    const phonetics = generatePhonetics(translatedText);

    return {
      result: translatedText,
      phonetics,
      note: `Traducción automática al ${langName} usando inteligencia artificial (modelo NLLB-200 de Meta). La pronunciación es una guía aproximada.`,
      source: 'api',
    };
  } catch (error) {
    console.warn('NLP Cloud API call failed:', error);
    return {
      result: '',
      phonetics: '',
      note: '',
      source: 'error',
    };
  }
}
