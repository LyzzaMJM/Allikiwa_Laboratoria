import React, { useEffect, useState } from 'react';
import { ScreenId, TransitionType } from '../types';
import { sounds } from '../utils/audio';

interface Props {
  onNavigate: (screen: ScreenId, transition?: TransitionType) => void;
}

/* ------------------------------------------------------------------ */
/* CONTENIDO                                                           */
/* ------------------------------------------------------------------ */

interface Sentence {
  es: string;
  qu: string[]; // oración en quechua, una ficha por palabra
  esTok: string[]; // oración en español, una ficha por palabra
  decQu: string[]; // fichas señuelo en quechua
  decEs: string[]; // fichas señuelo en español
  explain: string;
  esOrderOk: boolean; // si sirve para el ejercicio quechua → español
}

const SENTENCES: Sentence[] = [
  {
    es: 'Buenos días, querido hermano',
    qu: ['Allin', 'punchaw', 'wawqillay'],
    esTok: ['Buenos', 'días', 'querido', 'hermano'],
    decQu: ['tuta', 'ñañay'],
    decEs: ['noches', 'hermana'],
    explain: '«wawqillay» = wawqi (hermano) + -lla (matiz cariñoso) + -y (mi): «mi querido hermano».',
    esOrderOk: true
  },
  {
    es: 'Buenas noches, mamá',
    qu: ['Allin', 'tuta', 'mamay'],
    esTok: ['Buenas', 'noches', 'mamá'],
    decQu: ['punchaw', 'yaku'],
    decEs: ['días', 'papá'],
    explain: '«mamay» = mama (madre) + -y (mi). «Allin tuta» es el saludo de la noche.',
    esOrderOk: true
  },
  {
    es: 'Yo bebo agua',
    qu: ['Ñuqa', 'yakuta', 'upyani'],
    esTok: ['Yo', 'bebo', 'agua'],
    decQu: ['tantata', 'mikuni'],
    decEs: ['pan', 'como'],
    explain: 'El sufijo -ta marca el objeto (yaku → yakuta). El verbo va al final y -ni indica «yo».',
    esOrderOk: true
  },
  {
    es: 'Yo como pan',
    qu: ['Ñuqa', 'tantata', 'mikuni'],
    esTok: ['Yo', 'como', 'pan'],
    decQu: ['yakuta', 'upyani'],
    decEs: ['agua', 'bebo'],
    explain: '«tantata» = tanta (pan) + -ta (objeto). «mikuni» = «yo como». El verbo va al final.',
    esOrderOk: true
  },
  {
    es: 'El perro duerme',
    qu: ['Allqu', 'puñun'],
    esTok: ['El', 'perro', 'duerme'],
    decQu: ['michi', 'pawan'],
    decEs: ['gato', 'corre'],
    explain: 'El sufijo -n indica tercera persona: «puñun» = «él/ella duerme». El verbo va al final.',
    esOrderOk: true
  },
  {
    es: 'Yo tengo una casa',
    qu: ['Ñuqa', 'wasiyuq', 'kani'],
    esTok: ['Yo', 'tengo', 'una', 'casa'],
    decQu: ['yakuta', 'tuta'],
    decEs: ['perro', 'mamá'],
    explain: '«wasiyuq» = wasi (casa) + -yuq (el que posee). Literalmente: «yo soy dueño de casa».',
    esOrderOk: false
  }
];

interface ClozeData {
  before: string[];
  after: string[];
  answer: string;
  options: string[];
  es: string;
  explain: string;
}

const CLOZES: ClozeData[] = [
  {
    before: ['Allin'],
    after: ['wawqillay'],
    answer: 'punchaw',
    options: ['punchaw', 'tuta', 'yaku'],
    es: 'Buenos días, querido hermano',
    explain: '«punchaw» significa día. «Allin punchaw» es el saludo de la mañana.'
  },
  {
    before: ['Allin'],
    after: ['mamay'],
    answer: 'tuta',
    options: ['tuta', 'punchaw', 'wasi'],
    es: 'Buenas noches, mamá',
    explain: '«tuta» significa noche. «Allin tuta» es el saludo de la noche.'
  },
  {
    before: ['Ñuqa'],
    after: ['upyani'],
    answer: 'yakuta',
    options: ['yakuta', 'tantata', 'wasita'],
    es: 'Yo bebo agua',
    explain: 'Se bebe «yaku» (agua) y el objeto lleva -ta: «yakuta upyani».'
  }
];

interface MeaningData {
  word: string;
  answer: string;
  options: string[];
  explain: string;
}

const MEANINGS: MeaningData[] = [
  {
    word: 'Allillanchu?',
    answer: '¿Estás bien?',
    options: ['¿Estás bien?', '¿Cómo te llamas?', '¡Hasta luego!', '¡Gracias!'],
    explain: 'Es un saludo muy usado en las comunidades quechuas. Se responde «Arí, allinmi».'
  },
  {
    word: 'Allin tuta',
    answer: 'Buenas noches',
    options: ['Buenas noches', 'Buenos días', 'Buenas tardes', 'Bienvenido'],
    explain: '«allin» = bueno, «tuta» = noche.'
  },
  {
    word: 'wasi',
    answer: 'Casa',
    options: ['Casa', 'Agua', 'Sol', 'Camino'],
    explain: '«wasi» significa casa y aparece en muchos nombres de lugares andinos.'
  }
];

/* ------------------------------------------------------------------ */
/* EJERCICIOS                                                          */
/* ------------------------------------------------------------------ */

type Round = { retry?: boolean } & (
  | {
    kind: 'build_qu' | 'build_es';
    prompt: string; // texto mostrado
    speak: string; // texto que suena
    answer: string[];
    tokens: string[]; // fichas ya mezcladas, con señuelos
    explain: string;
    es: string;
  }
  | { kind: 'cloze'; data: ClozeData }
  | { kind: 'meaning'; data: MeaningData; options: string[] }
);

const MAX_HEARTS = 4;
const EXP_PER_HIT = 10;

const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const buildLesson = (): Round[] => {
  const quSentences = shuffle(SENTENCES).slice(0, 3);
  const esSentences = shuffle(SENTENCES.filter((s) => s.esOrderOk)).slice(0, 2);

  const buildQu: Round[] = quSentences.map((s) => ({
    kind: 'build_qu',
    prompt: s.es,
    speak: s.es,
    answer: s.qu,
    tokens: shuffle([...s.qu, ...s.decQu]),
    explain: s.explain,
    es: s.es
  }));

  const buildEs: Round[] = esSentences.map((s) => ({
    kind: 'build_es',
    prompt: s.qu.join(' '),
    speak: s.qu.join(' '),
    answer: s.esTok,
    tokens: shuffle([...s.esTok, ...s.decEs]),
    explain: s.explain,
    es: s.es
  }));

  const cloze: Round[] = shuffle(CLOZES)
    .slice(0, 2)
    .map((data) => ({ kind: 'cloze', data: { ...data, options: shuffle(data.options) } }));

  const meaning: Round[] = shuffle(MEANINGS)
    .slice(0, 1)
    .map((data) => ({ kind: 'meaning', data, options: shuffle(data.options) }));

  return shuffle([...buildQu, ...buildEs, ...cloze, ...meaning]);
};

type Status = 'idle' | 'correct' | 'wrong';

/* ------------------------------------------------------------------ */
/* COMPONENTE                                                          */
/* ------------------------------------------------------------------ */

export const JuegosInteractivosScreen: React.FC<Props> = ({ onNavigate }) => {
  const [queue, setQueue] = useState<Round[]>(() => buildLesson());
  const [total, setTotal] = useState<number>(() => queue.length);
  const [idx, setIdx] = useState(0);
  const [status, setStatus] = useState<Status>('idle');
  const [hearts, setHearts] = useState(MAX_HEARTS);
  const [exp, setExp] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [mistakes, setMistakes] = useState(0);

  const [placed, setPlaced] = useState<number[]>([]); // índices de fichas colocadas
  const [selected, setSelected] = useState<string | null>(null);

  const round: Round | undefined = queue[idx];
  const finished = idx >= queue.length;
  const outOfHearts = hearts <= 0;
  const progress = finished ? 100 : Math.round((correctCount / total) * 100);

  const isBuild = round?.kind === 'build_qu' || round?.kind === 'build_es';

  /* ------------------------------ Lógica ---------------------------- */

  const reset = () => {
    setPlaced([]);
    setSelected(null);
    setStatus('idle');
  };

  const addToken = (i: number) => {
    if (status !== 'idle' || outOfHearts) return;
    sounds.playTap();
    setPlaced((p) => [...p, i]);
  };

  const removeToken = (pos: number) => {
    if (status !== 'idle' || outOfHearts) return;
    sounds.playTap();
    setPlaced((p) => p.filter((_, k) => k !== pos));
  };

  const pickOption = (v: string) => {
    if (status !== 'idle' || outOfHearts) return;
    sounds.playTap();
    setSelected(v);
  };

  const canCheck = status === 'idle' && !!round && (isBuild ? placed.length > 0 : selected !== null);

  const handleComprobar = () => {
    if (!round || !canCheck) return;
    let ok = false;
    if (round.kind === 'build_qu' || round.kind === 'build_es') {
      const built = placed.map((i) => round.tokens[i]);
      ok = built.length === round.answer.length && built.every((t, k) => t === round.answer[k]);
    } else if (round.kind === 'cloze') {
      ok = selected === round.data.answer;
    } else if (round.kind === 'meaning') {
      ok = selected === round.data.answer;
    }

    if (ok) {
      sounds.playSuccess();
      setStatus('correct');
      setCorrectCount((c) => c + 1);
      setExp((e) => e + EXP_PER_HIT);
    } else {
      const s = sounds as unknown as { playError?: () => void };
      if (s.playError) s.playError();
      setStatus('wrong');
      setHearts((h) => Math.max(0, h - 1));
      setMistakes((m) => m + 1);
    }
  };

  const handleContinuar = () => {
    sounds.playTap();
    if (round && status === 'wrong' && !round.retry) {
      setQueue((q) => [...q, { ...round, retry: true }]);
    }
    setIdx((i) => i + 1);
    reset();
  };

  const restart = () => {
    const lesson = buildLesson();
    setQueue(lesson);
    setTotal(lesson.length);
    setIdx(0);
    setHearts(MAX_HEARTS);
    setExp(0);
    setCorrectCount(0);
    setMistakes(0);
    reset();
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Enter' || finished || outOfHearts) return;
      if (status === 'idle') handleComprobar();
      else handleContinuar();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  /* ------------------------ Datos de la vista ----------------------- */

  const explainFor = (r: Round): string => {
    if (r.kind === 'build_qu' || r.kind === 'build_es') return r.explain;
    if (r.kind === 'cloze') return r.data.explain;
    if (r.kind === 'meaning') return r.data.explain;
    return '';
  };

  const correctText = (r: Round): string => {
    if (r.kind === 'build_qu' || r.kind === 'build_es') return r.answer.join(' ');
    if (r.kind === 'cloze') return [...r.data.before, r.data.answer, ...r.data.after].join(' ');
    if (r.kind === 'meaning') return r.data.answer;
    return '';
  };

  const meta = (r: Round) => {
    switch (r.kind) {
      case 'build_qu':
        return { chip: 'FORMAR LA ORACIÓN', title: 'Traduce la siguiente oración al Quechua', tip: 'El verbo siempre va al final' };
      case 'build_es':
        return { chip: 'QUECHUA → ESPAÑOL', title: 'Traduce la oración al Español', tip: 'Fíjate en los sufijos de cada palabra' };
      case 'cloze':
        return { chip: 'COMPLETAR', title: 'Completa la oración en Quechua', tip: 'Lee la traducción para guiarte' };
      case 'meaning':
        return { chip: 'SIGNIFICADO', title: '¿Qué significa esto?', tip: 'Toca el altavoz para escucharlo' };
    }
  };

  const optionClass = (value: string, correct: string) => {
    const isSel = selected === value;
    if (status !== 'idle' && value === correct) return 'bg-[#e9f7e5] border-2 border-[#3ca21d] text-[#104b00]';
    if (status === 'wrong' && isSel) return 'bg-[#ffdad6]/70 border-2 border-[#ba1a1a] text-[#93000a]';
    if (isSel) return 'bg-[#ebedfa] border-2 border-[#2a3691] text-[#0e1c7b]';
    return 'bg-white border-2 border-[#d6d1c4] text-[#0e1c7b] hover:border-[#f27a21] shadow-duo-neutral';
  };

  /* ------------------------ Pantallas finales ----------------------- */

  if (outOfHearts) {
    return (
      <div className="bg-[#fff8f6] text-[#3b0900] min-h-screen flex flex-col items-center justify-center gap-5 px-6 text-center">
        <span className="material-symbols-outlined text-[#ba1a1a] text-[72px]" style={{ fontVariationSettings: "'FILL' 1" }}>
          heart_broken
        </span>
        <h1 className="font-display text-3xl font-bold text-[#0e1c7b]">¡Te quedaste sin vidas!</h1>
        <p className="text-sm text-[#454652] max-w-sm">Equivocarse es parte de aprender. Inténtalo otra vez con una lección nueva.</p>
        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
          <button
            type="button"
            onClick={() => {
              sounds.playTap();
              onNavigate('mapa_quechua', 'push_back');
            }}
            className="flex-1 py-3 rounded-2xl border border-[#c6c5d4] text-[#454652] font-semibold text-sm hover:bg-[#ffe9e4] cursor-pointer"
          >
            Salir
          </button>
          <button
            type="button"
            onClick={() => {
              sounds.playTap();
              restart();
            }}
            className="flex-1 py-3 rounded-2xl bg-[#3ca21d] hover:bg-[#2d7d15] text-white font-chubby font-bold text-sm shadow-duo-green btn-3d cursor-pointer"
          >
            REINTENTAR
          </button>
        </div>
      </div>
    );
  }

  if (finished) {
    const accuracy = Math.max(0, Math.round(((total - Math.min(mistakes, total)) / total) * 100));
    return (
      <div className="bg-[#fff8f6] text-[#3b0900] min-h-screen flex flex-col font-body-md antialiased">
        <main className="flex-1 w-full max-w-[1000px] mx-auto px-4 md:px-8 py-10 flex flex-col items-center gap-6">
          <img
            alt="Kusi Alpaca"
            className="w-28 h-28 object-contain"
            src={`${import.meta.env.BASE_URL}images/pancita.png`}
          />
          <h1 className="font-chubby text-3xl font-bold text-[#104b00] text-center">¡Excelente! Allinmi wawa</h1>

          <div className="flex gap-3">
            <div className="px-5 py-3 bg-white border border-[#ffe2db] rounded-2xl text-center">
              <p className="text-xs text-[#454652]">Precisión</p>
              <p className="font-bold text-2xl text-[#083200]">{accuracy}%</p>
            </div>
            <div className="px-5 py-3 bg-white border border-[#ffe2db] rounded-2xl text-center">
              <p className="text-xs text-[#454652]">EXP</p>
              <p className="font-bold text-2xl text-[#2a3691]">+{exp}</p>
            </div>
            <div className="px-5 py-3 bg-white border border-[#ffe2db] rounded-2xl text-center">
              <p className="text-xs text-[#454652]">Vidas</p>
              <p className="font-bold text-2xl text-[#ba1a1a]">{hearts}</p>
            </div>
          </div>

          {/* OTRAS DINÁMICAS */}
          <div className="w-full mt-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display text-base font-bold text-[#0e1c7b] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#f27a21]">sports_esports</span>
                Sigue practicando con otras dinámicas
              </h3>
              <span className="text-xs font-bold text-[#767683]">3 Modos Extra</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div
                onClick={() => {
                  sounds.playTap();
                  onNavigate('ejercicio_emparejar', 'push');
                }}
                className="cursor-pointer bg-white rounded-2xl p-4 border-2 border-[#ede8df] hover:border-[#2a3691] hover:shadow-md transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#ebedfa] text-[#2a3691] flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[22px]">view_timeline</span>
                </div>
                <h4 className="font-chubby text-base font-bold text-[#0e1c7b]">Emparejar pares</h4>
                <p className="text-xs text-[#767683] mt-0.5">Asocia palabras en Quechua y Aimara con su traducción.</p>
                <span className="text-xs font-bold text-[#2a3691] mt-2 block group-hover:underline">Probar dinámica →</span>
              </div>

              <div
                onClick={() => {
                  sounds.playTap();
                  onNavigate('ejercicio_ilustracion', 'push');
                }}
                className="cursor-pointer bg-white rounded-2xl p-4 border-2 border-[#ede8df] hover:border-[#f27a21] hover:shadow-md transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#fff3e8] text-[#f27a21] flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[22px]">photo_library</span>
                </div>
                <h4 className="font-chubby text-base font-bold text-[#0e1c7b]">Elegir la ilustración</h4>
                <p className="text-xs text-[#767683] mt-0.5">Identifica la imagen andina que corresponde a la palabra.</p>
                <span className="text-xs font-bold text-[#f27a21] mt-2 block group-hover:underline">Probar dinámica →</span>
              </div>

              <div
                onClick={() => {
                  sounds.playTap();
                  onNavigate('ejercicio_dictado', 'push');
                }}
                className="cursor-pointer bg-white rounded-2xl p-4 border-2 border-[#ede8df] hover:border-[#3ca21d] hover:shadow-md transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#e9f7e5] text-[#3ca21d] flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[22px]">mic</span>
                </div>
                <h4 className="font-chubby text-base font-bold text-[#0e1c7b]">Dictado y fonética</h4>
                <p className="text-xs text-[#767683] mt-0.5">Entrena tu pronunciación de consonantes glotalizadas y aspiradas.</p>
                <span className="text-xs font-bold text-[#3ca21d] mt-2 block group-hover:underline">Iniciar micrófono →</span>
              </div>
            </div>
          </div>
        </main>

        <footer className="w-full bg-[#e9f7e5] border-t-2 border-[#3ca21d]/30 p-4 sm:p-5 sticky bottom-0 z-30 shadow-lg">
          <div className="max-w-[1000px] mx-auto flex justify-end">
            {/* Navigation XPath: //footer//button[contains(., 'CONTINUAR')] */}
            <button
              onClick={() => {
                sounds.playSuccess();
                onNavigate('mapa_quechua', 'push_back');
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#3ca21d] hover:bg-[#2d7d15] text-white font-chubby font-bold text-base sm:text-lg shadow-duo-green btn-3d flex items-center justify-center gap-2 cursor-pointer"
              type="button"
            >
              <span>CONTINUAR</span>
              <span className="material-symbols-outlined text-[22px]">arrow_forward</span>
            </button>
          </div>
        </footer>
      </div>
    );
  }

  /* ------------------------------ Render ---------------------------- */

  const r = round!;
  const m = meta(r);

  const footerBg =
    status === 'correct'
      ? 'bg-[#e9f7e5] border-[#3ca21d]/40'
      : status === 'wrong'
        ? 'bg-[#ffe3df] border-[#ba1a1a]/40'
        : 'bg-white border-[#ffe2db]';

  const mascot = (
    <div className="relative shrink-0">
      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#fdf2e9] border-2 border-[#ffdbc9] p-1 flex items-center justify-center overflow-hidden">
        <img
          alt="Kusi Alpaca"
          className="w-full h-full object-contain filter drop-shadow-sm"
          src={`${import.meta.env.BASE_URL}images/pancita.png`}
        />
      </div>
      <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#2a3691] text-white flex items-center justify-center shadow-md">
        <span className="material-symbols-outlined text-[16px]">graphic_eq</span>
      </div>
    </div>
  );

  return (
    <div className="bg-[#fff8f6] text-[#3b0900] min-h-screen flex flex-col font-body-md antialiased select-none">
      {/* HEADER */}
      <header className="w-full bg-white shadow-sm border-b border-[#ffe2db] sticky top-0 z-40">
        <div className="max-w-[1100px] mx-auto px-4 md:px-10 h-16 flex items-center justify-between gap-4">
          {/* Navigation XPath: //header//a[@href='#salir'] */}
          <a
            href="#salir"
            onClick={(e) => {
              e.preventDefault();
              sounds.playTap();
              onNavigate('mapa_quechua', 'push_back');
            }}
            className="w-10 h-10 flex items-center justify-center rounded-xl text-[#767683] hover:bg-[#ffe9e4] transition-colors cursor-pointer"
            aria-label="Salir de la lección"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </a>

          <div className="flex-1 max-w-xl mx-2">
            <div className="w-full bg-[#ffe2db] rounded-full h-3.5 p-0.5 overflow-hidden">
              <div
                className="bg-[#3ca21d] h-full rounded-full transition-all duration-500 shadow-sm"
                style={{ width: `${Math.max(progress, 5)}%` }}
              ></div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#ffe2db] rounded-xl text-[#9a4600] font-bold text-sm">
              <span className="material-symbols-outlined text-[#f27a21] text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                local_fire_department
              </span>
              <span>14</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#ffdad6]/60 rounded-xl text-[#ba1a1a] font-bold text-sm">
              <span className="material-symbols-outlined text-[#ba1a1a] text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                favorite
              </span>
              <span>{hearts}</span>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="flex-1 w-full max-w-[1000px] mx-auto px-4 md:px-8 py-6 flex flex-col justify-between">
        <div className="mb-6">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#ebedfa] text-[#2a3691] font-bold text-xs uppercase tracking-wider">
                {m.chip}
              </span>
              <span className="px-3 py-1 rounded-full bg-[#fff3e8] text-[#f27a21] font-bold text-xs flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">menu_book</span> Quechua Chanka
              </span>
              <span className="text-xs text-[#767683]">
                Ejercicio {Math.min(idx + 1, queue.length)} de {queue.length}
              </span>
              {r.retry && (
                <span className="px-2 py-0.5 rounded-full bg-[#ffdad6] text-[#ba1a1a] font-bold text-[10px] uppercase">Repaso</span>
              )}
            </div>
            <span className="text-xs font-semibold text-[#767683] flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-[#2a3691]">lightbulb</span>
              Consejo: {m.tip}
            </span>
          </div>

          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#0e1c7b]">{m.title}</h1>
        </div>

        {/* TARJETA DE PREGUNTA */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-[#ffe2db] shadow-sm mb-6 flex flex-col sm:flex-row items-center gap-5">
          {mascot}
          <div className="flex-1 text-center sm:text-left">
            {(r.kind === 'build_qu' || r.kind === 'build_es') && (
              <>
                <span className="text-xs font-bold text-[#767683] uppercase tracking-wider block mb-1">
                  {r.kind === 'build_qu' ? 'ESPAÑOL' : 'QUECHUA'}
                </span>
                <div className="flex items-center justify-center sm:justify-between gap-3">
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-[#3b0900]">&ldquo;{r.prompt}&rdquo;</h2>
                  <button
                    onClick={() => sounds.playVoice(r.speak)}
                    className="w-10 h-10 rounded-2xl bg-[#ebedfa] text-[#2a3691] hover:bg-[#2a3691] hover:text-white transition-colors flex items-center justify-center shrink-0 cursor-pointer"
                    title="Escuchar audio"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[20px]">volume_up</span>
                  </button>
                </div>
              </>
            )}

            {r.kind === 'cloze' && (
              <>
                <span className="text-xs font-bold text-[#767683] uppercase tracking-wider block mb-1">QUECHUA</span>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0e1c7b] flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  {r.data.before.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                  <span
                    className={`inline-block min-w-[110px] px-3 py-0.5 rounded-xl border-b-4 text-center ${status === 'idle'
                      ? 'border-[#f27a21] bg-[#fff3e8] text-[#9a4600]'
                      : status === 'correct'
                        ? 'border-[#3ca21d] bg-[#e9f7e5] text-[#104b00]'
                        : 'border-[#ba1a1a] bg-[#ffdad6]/60 text-[#93000a]'
                      }`}
                  >
                    {selected ?? '＿＿＿'}
                  </span>
                  {r.data.after.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </h2>
                <p className="text-sm text-[#454652] mt-1">&ldquo;{r.data.es}&rdquo;</p>
              </>
            )}

            {r.kind === 'meaning' && (
              <>
                <span className="text-xs font-bold text-[#767683] uppercase tracking-wider block mb-1">QUECHUA</span>
                <div className="flex items-center justify-center sm:justify-between gap-3">
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0e1c7b]">{r.data.word}</h2>
                  <button
                    onClick={() => sounds.playVoice(r.data.word)}
                    className="w-10 h-10 rounded-2xl bg-[#ebedfa] text-[#2a3691] hover:bg-[#2a3691] hover:text-white transition-colors flex items-center justify-center shrink-0 cursor-pointer"
                    title="Escuchar audio"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[20px]">volume_up</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* ZONA DE RESPUESTA */}
        {(r.kind === 'build_qu' || r.kind === 'build_es') && (
          <>
            <div className="bg-white rounded-3xl p-5 border-2 border-[#ffe2db] min-h-[90px] mb-4 flex flex-wrap items-center gap-3 shadow-inner">
              {placed.length === 0 ? (
                <span className="text-sm font-semibold text-[#c6c5d4] italic">
                  Toca las palabras del banco inferior para construir la oración...
                </span>
              ) : (
                placed.map((tokIdx, pos) => {
                  const tok = r.tokens[tokIdx];
                  const ok = status !== 'idle' && r.answer[pos] === tok;
                  const bad = status !== 'idle' && r.answer[pos] !== tok;
                  return (
                    <button
                      key={`${tokIdx}-${pos}`}
                      onClick={() => removeToken(pos)}
                      className={`px-4 py-2.5 rounded-2xl border-2 font-chubby font-bold text-base btn-3d flex items-center gap-2 ${ok
                        ? 'bg-[#e9f7e5] border-[#3ca21d] text-[#104b00]'
                        : bad
                          ? 'bg-[#ffdad6]/70 border-[#ba1a1a] text-[#93000a]'
                          : 'bg-white border-[#d6d1c4] text-[#0e1c7b] shadow-duo-neutral hover:border-[#b43f1d] cursor-pointer'
                        }`}
                    >
                      <span>{tok}</span>
                      {status === 'idle' && <span className="material-symbols-outlined text-[16px] text-[#767683]">close</span>}
                      {ok && <span className="material-symbols-outlined text-[18px]">check</span>}
                      {bad && <span className="material-symbols-outlined text-[18px]">close</span>}
                    </button>
                  );
                })
              )}
            </div>

            <div className="bg-[#fff1ed]/70 rounded-3xl p-5 border border-[#ffe2db] mb-8">
              <div className="flex justify-between items-center mb-3 text-xs font-bold text-[#767683]">
                <span>BANCO DE PALABRAS (TOCA PARA AGREGAR)</span>
                <button
                  onClick={() => {
                    if (status === 'idle') {
                      sounds.playTap();
                      setPlaced([]);
                    }
                  }}
                  className="hover:text-[#f27a21] flex items-center gap-1 cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[14px]">refresh</span> Reiniciar fichas
                </button>
              </div>

              <div className="flex flex-wrap gap-3">
                {r.tokens.map((tok, i) =>
                  placed.includes(i) ? (
                    <div
                      key={`slot-${i}`}
                      className="px-5 py-2.5 rounded-2xl bg-[#ffe9e4]/60 text-[#c6c5d4] font-chubby font-bold text-base border border-dashed border-[#ffe2db]"
                    >
                      {tok}
                    </div>
                  ) : (
                    <button
                      key={`bank-${i}`}
                      onClick={() => addToken(i)}
                      className="px-5 py-2.5 rounded-2xl bg-white border-2 border-[#d6d1c4] text-[#0e1c7b] font-chubby font-bold text-base shadow-duo-neutral btn-3d cursor-pointer hover:border-[#f27a21]"
                    >
                      {tok}
                    </button>
                  )
                )}
              </div>
            </div>
          </>
        )}

        {r.kind === 'cloze' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
            {r.data.options.map((o) => (
              <button
                key={o}
                type="button"
                onClick={() => pickOption(o)}
                className={`py-5 rounded-2xl font-chubby text-xl font-bold transition-all cursor-pointer btn-3d ${optionClass(o, r.data.answer)}`}
              >
                {o}
              </button>
            ))}
          </div>
        )}

        {r.kind === 'meaning' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {r.options.map((o) => (
              <button
                key={o}
                type="button"
                onClick={() => pickOption(o)}
                className={`py-5 px-4 rounded-2xl font-chubby text-lg font-bold transition-all cursor-pointer btn-3d ${optionClass(o, r.data.answer)}`}
              >
                {o}
              </button>
            ))}
          </div>
        )}
      </main>

      {/* FOOTER: el resultado solo aparece tras comprobar */}
      <footer className={`w-full border-t-2 p-4 sm:p-5 sticky bottom-0 z-30 shadow-lg transition-colors ${footerBg}`}>
        <div className="max-w-[1000px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto min-h-[48px]">
            {status === 'idle' && (
              <div className="hidden sm:flex items-center gap-2 text-[#454652] text-xs">
                <kbd className="px-2 py-1 rounded bg-[#ffe2db] border border-[#c6c5d4] font-mono text-xs">Enter</kbd>
                <span>para verificar</span>
              </div>
            )}

            {status === 'correct' && (
              <>
                <div className="w-12 h-12 rounded-full bg-[#3ca21d] text-white flex items-center justify-center shrink-0 shadow-md">
                  <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    check
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-chubby text-lg sm:text-xl font-bold text-[#104b00]">¡Excelente! Allinmi wawa</h3>
                    <span className="text-xs font-black px-2 py-0.5 rounded-full bg-white text-[#2d7d15] shadow-xs">
                      +{EXP_PER_HIT} EXP
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#125200] font-medium">
                    <strong>Explicación:</strong> {explainFor(r)}
                  </p>
                </div>
              </>
            )}

            {status === 'wrong' && (
              <>
                <div className="w-12 h-12 rounded-full bg-[#ba1a1a] text-white flex items-center justify-center shrink-0 shadow-md">
                  <span className="material-symbols-outlined text-[28px]">close</span>
                </div>
                <div>
                  <h3 className="font-chubby text-lg sm:text-xl font-bold text-[#93000a]">Respuesta correcta:</h3>
                  <p className="text-sm font-bold text-[#93000a]">{correctText(r)}</p>
                  <p className="text-xs sm:text-sm text-[#93000a] font-medium mt-0.5">
                    <strong>Explicación:</strong> {explainFor(r)}
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Navigation XPath: //footer//button[contains(., 'CONTINUAR')] */}
          <button
            onClick={status === 'idle' ? handleComprobar : handleContinuar}
            disabled={status === 'idle' && !canCheck}
            className={`w-full sm:w-auto px-8 py-4 rounded-2xl font-chubby font-bold text-base sm:text-lg btn-3d flex items-center justify-center gap-2 shrink-0 transition-colors ${status === 'idle' && !canCheck
              ? 'bg-[#e5e2e1] text-[#9a9a9a] cursor-not-allowed'
              : status === 'wrong'
                ? 'bg-[#ba1a1a] hover:bg-[#93000a] text-white cursor-pointer'
                : 'bg-[#3ca21d] hover:bg-[#2d7d15] text-white shadow-duo-green cursor-pointer'
              }`}
            type="button"
          >
            <span>{status === 'idle' ? 'COMPROBAR' : 'CONTINUAR'}</span>
            <span className="material-symbols-outlined text-[22px]">arrow_forward</span>
          </button>
        </div>
      </footer>
    </div>
  );
};
