import React, { useEffect, useRef, useState } from 'react';
import { ScreenId, TransitionType } from '../types';
import { sounds } from '../utils/audio';

interface Props {
  onNavigate: (screen: ScreenId, transition?: TransitionType) => void;
}

/* ------------------------------------------------------------------ */
/* VOCABULARIO: tríadas y pares mínimos de consonantes                 */
/* ------------------------------------------------------------------ */

interface Word {
  text: string; // palabra completa
  onset: string; // consonante inicial (simple, glotalizada o aspirada)
  rest: string; // resto de la palabra (igual dentro de cada grupo)
  ipa: string;
  es: string;
  tip: string; // consejo que se muestra DESPUÉS de responder
}

const GLOTAL_TIP =
  'Consonante glotalizada: no expulses aire; retén un instante el aliento en la garganta y suéltalo con la consonante.';
const ASPIRATED_TIP = 'Consonante aspirada: suelta un golpe fuerte de aire justo después de la consonante.';
const PLAIN_TIP = 'Consonante simple: pronúnciala suave, sin golpe de aire ni corte en la garganta.';

const w = (onset: string, rest: string, ipa: string, es: string, tip: string): Word => ({
  text: onset + rest,
  onset,
  rest,
  ipa,
  es,
  tip
});

const SETS: Word[][] = [
  [
    w("t'", 'anta', '[ˈtʼan.ta]', 'Pan', GLOTAL_TIP),
    w('t', 'anta', '[ˈtan.ta]', 'Junta / reunión', PLAIN_TIP),
    w('th', 'anta', '[ˈtʰan.ta]', 'Viejo / desgastado', ASPIRATED_TIP)
  ],
  [
    w("ch'", 'aki', '[ˈtʃʼa.ki]', 'Seco', GLOTAL_TIP),
    w('ch', 'aki', '[ˈtʃa.ki]', 'Pie', PLAIN_TIP)
  ],
  [
    w("q'", 'ara', '[ˈqʼa.ɾa]', 'Pelado / desnudo', GLOTAL_TIP),
    w('q', 'ara', '[ˈqa.ɾa]', 'Cuero / piel', PLAIN_TIP)
  ],
  [
    w("p'", 'acha', '[ˈpʼa.tʃa]', 'Ropa', GLOTAL_TIP),
    w('p', 'acha', '[ˈpa.tʃa]', 'Tierra / tiempo', PLAIN_TIP)
  ]
];

const ALL_WORDS: Word[] = SETS.flat();
const setOf = (word: Word): Word[] => SETS.find((s) => s.includes(word))!;
const GLOTTAL_WORDS = ALL_WORDS.filter((x) => x.onset.includes("'"));

/* ------------------------------------------------------------------ */
/* EJERCICIOS                                                          */
/* ------------------------------------------------------------------ */

type Kind = 'dictado' | 'distinguir' | 'completar' | 'pronunciar';

interface Round {
  kind: Kind;
  word: Word;
  retry?: boolean;
}

const MAX_HEARTS = 5;
const GEMS_PER_HIT = 5;

const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const buildLesson = (): Round[] => {
  const pick = (n: number, pool: Word[] = ALL_WORDS) => shuffle(pool).slice(0, n);
  const rounds: Round[] = [
    ...pick(3).map((word) => ({ kind: 'dictado' as Kind, word })),
    ...pick(3).map((word) => ({ kind: 'distinguir' as Kind, word })),
    ...pick(2).map((word) => ({ kind: 'completar' as Kind, word })),
    ...pick(2, GLOTTAL_WORDS).map((word) => ({ kind: 'pronunciar' as Kind, word }))
  ];
  return shuffle(rounds);
};

const norm = (s: string) =>
  s
    .trim()
    .toLowerCase()
    .replace(/[’‘´`ʼ]/g, "'")
    .replace(/\s+/g, '');

type Status = 'idle' | 'correct' | 'wrong';
type RecState = 'idle' | 'recording' | 'recorded';

/* ------------------------------------------------------------------ */
/* COMPONENTE                                                          */
/* ------------------------------------------------------------------ */

export const EjercicioDictadoScreen: React.FC<Props> = ({ onNavigate }) => {
  const [queue, setQueue] = useState<Round[]>(() => buildLesson());
  const [total, setTotal] = useState<number>(() => queue.length);
  const [idx, setIdx] = useState(0);
  const [status, setStatus] = useState<Status>('idle');
  const [hearts, setHearts] = useState(MAX_HEARTS);
  const [gems, setGems] = useState(420);
  const [correctCount, setCorrectCount] = useState(0);
  const [mistakes, setMistakes] = useState(0);

  const [speed, setSpeed] = useState<'normal' | 'slow'>('normal');
  const [playing, setPlaying] = useState(false);

  const [typed, setTyped] = useState('');
  const [selected, setSelected] = useState<string | null>(null);

  // Grabación real con el micrófono
  const [recState, setRecState] = useState<RecState>('idle');
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [micError, setMicError] = useState(false);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const stopTimerRef = useRef<number | null>(null);

  const round: Round | undefined = queue[idx];
  const finished = idx >= queue.length;
  const outOfHearts = hearts <= 0;
  const progress = finished ? 100 : Math.round((correctCount / total) * 100);

  /* ------------------------------ Audio ----------------------------- */

  const playWord = (word: Word) => {
    sounds.playVoice(word.text, speed === 'slow');
    setPlaying(true);
    window.setTimeout(() => setPlaying(false), 1400);
  };

  // Reproducir automáticamente al empezar los ejercicios de escucha
  useEffect(() => {
    if (round && (round.kind === 'dictado' || round.kind === 'distinguir' || round.kind === 'completar')) {
      try {
        playWord(round.word);
      } catch {
        /* sin audio */
      }
    }
  }, [idx]); // eslint-disable-line react-hooks/exhaustive-deps

  /* --------------------------- Grabación ---------------------------- */

  const releaseMic = () => {
    if (stopTimerRef.current) window.clearTimeout(stopTimerRef.current);
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    recorderRef.current = null;
  };

  const clearRecording = () => {
    releaseMic();
    setAudioUrl((url) => {
      if (url) URL.revokeObjectURL(url);
      return null;
    });
    setRecState('idle');
    setMicError(false);
  };

  useEffect(() => () => releaseMic(), []);

  const toggleRecording = async () => {
    sounds.playTap();
    if (recState === 'recording') {
      recorderRef.current?.stop();
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const rec = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];
      rec.ondataavailable = (e) => e.data.size && chunks.push(e.data);
      rec.onstop = () => {
        const blob = new Blob(chunks, { type: rec.mimeType || 'audio/webm' });
        setAudioUrl((old) => {
          if (old) URL.revokeObjectURL(old);
          return URL.createObjectURL(blob);
        });
        setRecState('recorded');
        releaseMic();
      };
      recorderRef.current = rec;
      rec.start();
      setRecState('recording');
      setMicError(false);
      // Corte automático a los 4 segundos
      stopTimerRef.current = window.setTimeout(() => {
        if (rec.state === 'recording') rec.stop();
      }, 4000);
    } catch {
      setMicError(true);
    }
  };

  /* --------------------------- Flujo -------------------------------- */

  const resetRound = () => {
    setTyped('');
    setSelected(null);
    setStatus('idle');
    clearRecording();
  };

  const canCheck = (): boolean => {
    if (!round || status !== 'idle') return false;
    switch (round.kind) {
      case 'dictado':
        return typed.trim().length > 0;
      case 'pronunciar':
        return selected !== null && (recState === 'recorded' || micError);
      default:
        return selected !== null;
    }
  };

  const handleComprobar = () => {
    if (!round || !canCheck()) return;
    let ok = false;
    let costsHeart = true;

    switch (round.kind) {
      case 'dictado':
        ok = norm(typed) === norm(round.word.text);
        break;
      case 'distinguir':
        ok = selected === round.word.text;
        break;
      case 'completar':
        ok = selected === round.word.onset;
        break;
      case 'pronunciar':
        ok = selected === 'ok';
        costsHeart = false; // autoevaluación: repetir no cuesta vida
        break;
    }

    if (ok) {
      sounds.playSuccess();
      setStatus('correct');
      setCorrectCount((c) => c + 1);
      setGems((g) => g + GEMS_PER_HIT);
    } else {
      const s = sounds as unknown as { playError?: () => void };
      if (s.playError) s.playError();
      setStatus('wrong');
      if (costsHeart) {
        setHearts((h) => Math.max(0, h - 1));
        setMistakes((m) => m + 1);
      }
    }
  };

  const handleContinuar = () => {
    sounds.playTap();
    if (round && status === 'wrong' && !round.retry) {
      setQueue((q) => [...q, { ...round, retry: true }]);
    }
    setIdx((i) => i + 1);
    resetRound();
  };

  const handleSkip = () => {
    sounds.playTap();
    if (round && !round.retry) setQueue((q) => [...q, { ...round, retry: true }]);
    setIdx((i) => i + 1);
    resetRound();
  };

  const restart = () => {
    const lesson = buildLesson();
    setQueue(lesson);
    setTotal(lesson.length);
    setIdx(0);
    setHearts(MAX_HEARTS);
    setCorrectCount(0);
    setMistakes(0);
    resetRound();
  };

  // Enter para continuar cuando ya se comprobó
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && status !== 'idle' && !finished && !outOfHearts) handleContinuar();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const addChar = (c: string) => {
    if (status !== 'idle') return;
    sounds.playTap();
    setTyped((prev) => prev + c);
  };

  /* ------------------------ Pantallas finales ----------------------- */

  if (outOfHearts) {
    return (
      <div className="bg-[#fff8f6] text-[#3b0900] min-h-screen flex flex-col items-center justify-center gap-5 px-6 text-center">
        <span className="material-symbols-outlined text-[#ba1a1a] text-[72px]" style={{ fontVariationSettings: "'FILL' 1" }}>
          heart_broken
        </span>
        <h1 className="font-display text-3xl font-bold text-[#0e1c7b]">¡Te quedaste sin vidas!</h1>
        <p className="text-sm text-[#454652] max-w-sm">
          Los sonidos glotalizados toman práctica. Vuelve a intentarlo con una lección nueva.
        </p>
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
            className="flex-1 py-3 rounded-2xl bg-[#ff842c] hover:bg-[#e06c15] text-white font-bold text-sm shadow-duo-orange btn-3d cursor-pointer"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  if (finished) {
    const accuracy = Math.max(0, Math.round(((total - Math.min(mistakes, total)) / total) * 100));
    return (
      <div className="bg-[#fff8f6] text-[#3b0900] min-h-screen flex flex-col items-center justify-center gap-5 px-6 text-center">
        <img
          alt="Kusi Alpaca"
          className="w-28 h-28 object-contain"
          src={`${import.meta.env.BASE_URL}images/pancita.png`}
        />
        <h1 className="font-display text-3xl font-bold text-[#0e1c7b]">¡Allinmi kanki! Fonética completada</h1>
        <div className="flex gap-3">
          <div className="px-5 py-3 bg-white border border-[#ffe2db] rounded-2xl">
            <p className="text-xs text-[#454652]">Precisión</p>
            <p className="font-bold text-2xl text-[#083200]">{accuracy}%</p>
          </div>
          <div className="px-5 py-3 bg-white border border-[#ffe2db] rounded-2xl">
            <p className="text-xs text-[#454652]">Vidas</p>
            <p className="font-bold text-2xl text-[#ba1a1a]">{hearts}</p>
          </div>
          <div className="px-5 py-3 bg-white border border-[#ffe2db] rounded-2xl">
            <p className="text-xs text-[#454652]">Gemas</p>
            <p className="font-bold text-2xl text-[#2a3691]">{gems}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            sounds.playSuccess();
            onNavigate('cuaderno_repaso', 'push');
          }}
          className="w-full max-w-sm h-14 bg-[#104b00] hover:bg-[#083200] text-white rounded-2xl font-display font-bold text-base flex items-center justify-center gap-2 cursor-pointer shadow-duo-green btn-3d"
        >
          <span>Ir al cuaderno de repaso</span>
          <span className="material-symbols-outlined text-[24px]">arrow_forward</span>
        </button>
      </div>
    );
  }

  /* ------------------------------ Render ---------------------------- */

  const r = round!;
  const set = setOf(r.word);
  const revealWord = r.kind === 'pronunciar' || status !== 'idle';

  const titles: Record<Kind, { chip: string; title: string; hint: string }> = {
    dictado: {
      chip: 'Dictado',
      title: 'Escucha y escribe la palabra',
      hint: 'Usa el teclado andino para los sonidos glotalizados y aspirados.'
    },
    distinguir: {
      chip: 'Distinguir sonidos',
      title: '¿Cuál de estas palabras escuchaste?',
      hint: 'Fíjate en la consonante inicial: simple, glotalizada o aspirada.'
    },
    completar: {
      chip: 'Completar',
      title: '¿Qué consonante falta?',
      hint: 'Escucha la palabra y elige la consonante inicial correcta.'
    },
    pronunciar: {
      chip: 'Pronunciación',
      title: 'Di la palabra en voz alta',
      hint: 'Grábate, compárate con el audio nativo y evalúa tu pronunciación.'
    }
  };

  const footerBg =
    status === 'correct' ? 'bg-[#e4fddc] border-[#76de55]' : status === 'wrong' ? 'bg-[#ffe3df] border-[#ba1a1a]/40' : 'bg-white border-[#ffe2db]';

  const nearMiss =
    status === 'wrong' &&
    r.kind === 'dictado' &&
    norm(typed).replace(/'/g, '') === r.word.text.replace(/'/g, '');

  const optionClass = (value: string, correctValue: string) => {
    const isSel = selected === value;
    if (status !== 'idle' && value === correctValue) return 'bg-[#91fb6e]/30 border-2 border-[#76de55] text-[#083200]';
    if (status === 'wrong' && isSel) return 'bg-[#ffdad6]/70 border-2 border-[#ba1a1a] text-[#93000a]';
    if (isSel) return 'bg-[#dfe0ff]/40 border-2 border-[#0e1c7b] text-[#0e1c7b]';
    return 'bg-white border-2 border-[#c6c5d4]/60 hover:border-[#0e1c7b]/40 text-[#3b0900]';
  };

  const pick = (v: string) => {
    if (status !== 'idle') return;
    sounds.playTap();
    setSelected(v);
  };

  return (
    <div className="bg-[#fff8f6] text-[#3b0900] antialiased min-h-screen flex flex-col justify-between selection:bg-[#ffdbc9]">
      {/* HEADER */}
      <header className="w-full bg-white border-b border-[#ffe2db] shadow-sm sticky top-0 z-40">
        <div className="max-w-[1200px] mx-auto px-4 md:px-10 h-16 flex items-center justify-between gap-4">
          {/* Navigation Target: //header//button[@title='Cerrar lección'] */}
          <button
            title="Cerrar lección"
            onClick={() => {
              sounds.playTap();
              onNavigate('mapa_quechua', 'push_back');
            }}
            className="w-10 h-10 flex items-center justify-center rounded-xl text-[#767683] hover:bg-[#ffe9e4] transition-all cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[#767683]">close</span>
          </button>

          <div className="flex-1 max-w-xl mx-2">
            <div className="flex items-center justify-between mb-1.5 px-0.5">
              <span className="text-xs text-[#454652] flex items-center gap-1 font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#2a3691] inline-block animate-pulse"></span>
                Fonética Quechua • Nivel Avanzado
              </span>
              <span className="text-xs text-[#0e1c7b] font-bold">{progress}%</span>
            </div>
            <div className="w-full h-3.5 bg-[#ffe9e4] rounded-full overflow-hidden p-0.5 shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-[#ff842c] to-[#ffb68c] rounded-full transition-all duration-500 shadow-sm"
                style={{ width: `${Math.max(progress, 4)}%` }}
              ></div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#fff1ed] rounded-xl border border-[#ffe2db]">
              <span className="material-symbols-outlined text-[#ba1a1a] text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                favorite
              </span>
              <span className="font-bold text-sm text-[#3b0900]">
                {hearts}/{MAX_HEARTS}
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#dfe0ff] rounded-xl border border-[#bcc2ff]">
              <span className="material-symbols-outlined text-[#0e1c7b] text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                diamond
              </span>
              <span className="font-bold text-sm text-[#000b62]">{gems}</span>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="w-full max-w-[1200px] mx-auto px-4 md:px-10 py-6 flex-1 flex flex-col justify-center">
        <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-3">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-1 rounded-lg bg-[#dfe0ff] text-[#0e1c7b] text-xs font-bold">
                {titles[r.kind].chip}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-[#ffe9e4] text-[#9a4600] text-xs font-bold">
                Ejercicio {Math.min(idx + 1, queue.length)} de {queue.length}
              </span>
              {r.retry && (
                <span className="px-2.5 py-1 rounded-lg bg-[#ffdad6] text-[#ba1a1a] text-xs font-bold uppercase">
                  Repaso
                </span>
              )}
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#3b0900] tracking-tight">
              {titles[r.kind].title}
            </h1>
            <p className="text-sm text-[#454652] mt-1">{titles[r.kind].hint}</p>
          </div>

          {/* Velocidad */}
          <div className="flex items-center gap-2 bg-[#fff1ed] p-1.5 rounded-xl border border-[#ffe9e4]">
            {(['normal', 'slow'] as const).map((s) => (
              <button
                key={s}
                onClick={() => {
                  sounds.playTap();
                  setSpeed(s);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${speed === s ? 'bg-white text-[#0e1c7b] shadow-sm border border-[#c6c5d4]/30' : 'text-[#454652] hover:text-[#0e1c7b]'
                  }`}
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">{s === 'normal' ? 'play_arrow' : 'slow_motion_video'}</span>
                {s === 'normal' ? 'Velocidad normal (1x)' : 'Lenta (0.75x)'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-6">
          {/* IZQUIERDA: audio */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <div className="bg-white rounded-3xl border border-[#ffe9e4] p-6 shadow-sm flex flex-col items-center justify-center">
              <div className="w-full flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-[#767683] uppercase tracking-wide">Audio nativo</span>
                <span className="text-xs font-bold text-[#9a4600] bg-[#ffe9e4] px-2 py-0.5 rounded-md">
                  Quechua Cusco-Collao
                </span>
              </div>

              <div className="relative my-4 flex items-center justify-center">
                {playing && <div className="absolute w-36 h-36 rounded-full bg-[#dfe0ff] opacity-40 animate-ping pointer-events-none"></div>}
                <div className="absolute w-28 h-28 rounded-full bg-[#bcc2ff]/60 pointer-events-none"></div>
                <button
                  onClick={() => playWord(r.word)}
                  className="relative z-10 w-24 h-24 rounded-full bg-[#2a3691] hover:bg-[#0e1c7b] text-white flex items-center justify-center shadow-lg active:translate-y-1 transition-all duration-150 border-4 border-white cursor-pointer group"
                  type="button"
                  title="Reproducir audio nativo"
                >
                  <span className="material-symbols-outlined text-[48px] ml-1 group-hover:scale-110 transition-transform">
                    volume_up
                  </span>
                </button>
              </div>

              {/* Barras que se animan mientras suena */}
              <div className="h-8 flex items-center gap-1 justify-center mb-3" aria-hidden="true">
                {Array.from({ length: 14 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-1.5 h-6 rounded-full origin-center ${playing ? 'bg-[#ff842c] animate-voice-bar' : 'bg-[#2a3691]/25'}`}
                    style={{ animationDelay: `${i * 70}ms`, transform: playing ? undefined : `scaleY(${0.25 + ((i * 7) % 5) * 0.12})` }}
                  />
                ))}
              </div>

              {/* La palabra solo se muestra cuando no revela la respuesta */}
              <div className="text-center min-h-[64px]">
                {r.kind === 'completar' && status === 'idle' ? (
                  <span className="font-display text-3xl font-bold text-[#0e1c7b] tracking-wide">
                    <span className="inline-block px-2 border-b-4 border-[#ff842c]">&nbsp;&nbsp;&nbsp;</span>
                    {r.word.rest}
                  </span>
                ) : revealWord ? (
                  <>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fff1ed] border border-[#ffe9e4]">
                      <span className="w-2 h-2 rounded-full bg-[#ff842c]"></span>
                      <span className="font-display text-xl font-bold text-[#3b0900]">{r.word.text}</span>
                      <span className="text-[#767683] text-sm italic">{r.word.ipa}</span>
                    </div>
                    <p className="text-xs text-[#454652] mt-1.5">
                      Significado: <span className="font-semibold text-[#3b0900]">{r.word.es}</span>
                    </p>
                  </>
                ) : (
                  <p className="text-sm text-[#767683] pt-3">Escucha varias veces. Prueba la velocidad lenta.</p>
                )}
              </div>
            </div>
          </div>

          {/* DERECHA: interacción */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            <div className="bg-white rounded-3xl border border-[#ffe9e4] p-5 shadow-sm flex flex-col flex-1">
              {/* DICTADO */}
              {r.kind === 'dictado' && (
                <div className="flex flex-col gap-3 flex-1">
                  <p className="text-xs text-[#454652] font-semibold">
                    Pista: significa <span className="text-[#9a4600]">&ldquo;{r.word.es}&rdquo;</span>. Escribe la palabra con ortografía andina:
                  </p>
                  <div className="relative">
                    <input
                      className="w-full px-4 py-3 rounded-2xl bg-[#fff1ed] border border-[#ffe9e4] focus:border-[#0e1c7b] text-[#3b0900] font-bold text-lg outline-none disabled:opacity-70"
                      value={typed}
                      disabled={status !== 'idle'}
                      placeholder="Escribe aquí…"
                      autoComplete="off"
                      autoCapitalize="off"
                      spellCheck={false}
                      onChange={(e) => setTyped(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && status === 'idle') {
                          e.stopPropagation();
                          handleComprobar();
                        }
                      }}
                    />
                    <button
                      onClick={() => status === 'idle' && setTyped('')}
                      className="absolute right-3 top-3 text-[#767683] hover:text-[#0e1c7b] cursor-pointer"
                      type="button"
                      aria-label="Borrar"
                    >
                      <span className="material-symbols-outlined text-[20px]">backspace</span>
                    </button>
                  </div>

                  <div className="mt-2">
                    <span className="text-[11px] text-[#767683] uppercase tracking-wider block mb-1.5 font-bold">
                      Caracteres glotalizados y aspirados:
                    </span>
                    <div className="grid grid-cols-5 gap-1.5">
                      {["ch'", "p'", "t'", "k'", "q'", 'ph', 'th', 'kh', 'qh', 'ñ'].map((c) => (
                        <button
                          key={c}
                          onClick={() => addChar(c)}
                          className="py-2 rounded-xl bg-[#ffe9e4] hover:bg-[#0e1c7b] hover:text-white font-bold text-xs text-[#3b0900] border border-[#ffdbd1] transition-colors active:translate-y-0.5 cursor-pointer"
                          type="button"
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* DISTINGUIR */}
              {r.kind === 'distinguir' && (
                <div className="flex flex-col gap-3 flex-1 justify-center">
                  <p className="text-xs text-[#454652] font-semibold mb-1">Elige la palabra que escuchaste:</p>
                  {set.map((opt, i) => (
                    <button
                      key={opt.text}
                      type="button"
                      onClick={() => pick(opt.text)}
                      className={`w-full p-4 rounded-2xl text-left flex items-center gap-3 transition-all cursor-pointer ${optionClass(opt.text, r.word.text)}`}
                    >
                      <span className="w-7 h-7 shrink-0 rounded-lg bg-[#ffe2db] text-[#454652] font-bold text-xs flex items-center justify-center">
                        {i + 1}
                      </span>
                      <span className="font-display text-xl font-bold flex-1">{opt.text}</span>
                      <span className="text-xs opacity-70">{opt.es}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* COMPLETAR */}
              {r.kind === 'completar' && (
                <div className="flex flex-col gap-4 flex-1 justify-center">
                  <p className="text-xs text-[#454652] font-semibold">
                    Completa:{' '}
                    <span className="font-display text-lg font-bold text-[#0e1c7b]">
                      {status === 'idle' ? '___' : r.word.onset}
                      {r.word.rest}
                    </span>
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    {set.map((opt) => (
                      <button
                        key={opt.onset}
                        type="button"
                        onClick={() => pick(opt.onset)}
                        className={`py-5 rounded-2xl font-display text-2xl font-bold transition-all cursor-pointer ${optionClass(opt.onset, r.word.onset)}`}
                      >
                        {opt.onset}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* PRONUNCIAR */}
              {r.kind === 'pronunciar' && (
                <div className="flex flex-col items-center gap-4 flex-1 justify-center">
                  <p className="text-xs text-[#454652] text-center">
                    Pronuncia <span className="font-bold text-[#3b0900]">&ldquo;{r.word.text}&rdquo;</span>
                    {' '}({r.word.es}). Toca para grabar (máx. 4 s) y toca de nuevo para detener.
                  </p>

                  <button
                    onClick={toggleRecording}
                    disabled={status !== 'idle'}
                    className={`w-28 h-28 rounded-full ${recState === 'recording' ? 'bg-[#b43f1d] animate-pulse' : 'bg-[#ff842c] hover:bg-[#e06c15]'
                      } text-white flex flex-col items-center justify-center shadow-duo-orange active:translate-y-1 transition-all border-4 border-white cursor-pointer disabled:opacity-60`}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[44px]">{recState === 'recording' ? 'stop' : 'mic'}</span>
                    <span className="text-[10px] uppercase font-bold tracking-wider mt-0.5">
                      {recState === 'recording' ? 'Grabando' : recState === 'recorded' ? 'Repetir' : 'Hablar'}
                    </span>
                  </button>

                  {micError && (
                    <p className="text-xs text-[#93000a] bg-[#ffdad6]/60 px-3 py-2 rounded-xl text-center">
                      No pude acceder al micrófono. Revisa el permiso del navegador, o practica en voz alta y evalúate igual.
                    </p>
                  )}

                  {audioUrl && (
                    <div className="w-full flex flex-col items-center gap-1">
                      <span className="text-[11px] font-bold text-[#767683] uppercase tracking-wide">Tu grabación</span>
                      <audio controls src={audioUrl} className="w-full max-w-sm" />
                      <span className="text-[11px] text-[#454652]">Compárala con el audio nativo de la izquierda.</span>
                    </div>
                  )}

                  {(recState === 'recorded' || micError) && (
                    <div className="w-full grid grid-cols-2 gap-3 mt-1">
                      <button
                        type="button"
                        onClick={() => pick('ok')}
                        className={`py-3 rounded-2xl font-bold text-sm transition-all cursor-pointer ${optionClass('ok', 'ok')}`}
                      >
                        Sonó parecido
                      </button>
                      <button
                        type="button"
                        onClick={() => pick('again')}
                        className={`py-3 rounded-2xl font-bold text-sm transition-all cursor-pointer ${selected === 'again' ? 'bg-[#fff1ed] border-2 border-[#ff842c] text-[#9a4600]' : 'bg-white border-2 border-[#c6c5d4]/60 text-[#3b0900] hover:border-[#ff842c]/50'
                          }`}
                        disabled={status !== 'idle'}
                      >
                        Debo repasar
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Consejo de Kusi: solo tras responder, para no revelar la respuesta */}
            <div className="bg-white rounded-3xl border border-[#ffe9e4] p-4 shadow-sm flex items-center gap-4">
              <div className="w-16 h-16 flex-shrink-0 relative">
                <img
                  className="w-full h-full object-contain filter drop-shadow-md rounded-2xl"
                  alt="Pancita mascota de Allikiwa"
                  src={`${import.meta.env.BASE_URL}images/pancita.png`}
                />
              </div>
              <div className="flex-1 bg-[#fff1ed] p-3 rounded-2xl border border-[#ffe9e4]">
                <div className="flex items-center gap-1.5 mb-1 text-[#9a4600] font-bold text-xs">
                  <span className="material-symbols-outlined text-[16px]">tips_and_updates</span>
                  Consejo de Kusi:
                </div>
                <p className="text-xs text-[#3b0900] leading-snug">
                  {status === 'idle' ? 'Responde para recibir un consejo sobre cómo pronunciar esta consonante.' : r.word.tip}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className={`w-full border-t py-4 px-4 md:px-10 sticky bottom-0 z-30 shadow-lg transition-colors ${footerBg}`}>
        <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-4">
          {status === 'idle' ? (
            /* Navigation Target: //footer//button[contains(., 'Saltar ejercicio')] */
            <button
              onClick={handleSkip}
              className="px-5 py-3 rounded-xl border border-[#c6c5d4] text-xs font-bold text-[#454652] hover:bg-[#ffe9e4] cursor-pointer"
              type="button"
            >
              Saltar ejercicio
            </button>
          ) : (
            <div className="flex items-center gap-3 min-w-0">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${status === 'correct' ? 'bg-[#91fb6e]/60 text-[#083200]' : 'bg-[#ffdad6] text-[#ba1a1a]'
                  }`}
              >
                <span className="material-symbols-outlined text-[24px]">{status === 'correct' ? 'verified' : 'close'}</span>
              </div>
              <div className="min-w-0">
                {status === 'correct' ? (
                  <>
                    <p className="font-bold text-sm text-[#083200] leading-tight">¡Allinmi! Correcto</p>
                    <p className="text-xs text-[#454652] truncate">
                      {r.word.text} = {r.word.es} · +{GEMS_PER_HIT} gemas
                    </p>
                  </>
                ) : (
                  <>
                    <p className="font-bold text-sm text-[#93000a] leading-tight">
                      {r.kind === 'pronunciar' ? 'Sigue practicando' : nearMiss ? 'Casi: revisa los apóstrofos y la h' : 'Respuesta correcta:'}
                    </p>
                    <p className="text-xs text-[#93000a] truncate">
                      {r.kind === 'completar' ? `${r.word.onset} → ` : ''}
                      {r.word.text} = {r.word.es}
                    </p>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Navigation Target: //footer//button[contains(., 'Comprobar fonética')] */}
          <button
            onClick={status === 'idle' ? handleComprobar : handleContinuar}
            disabled={status === 'idle' && !canCheck()}
            className={`px-8 py-3.5 rounded-2xl font-bold text-sm btn-3d flex items-center gap-2 transition-colors ${status === 'idle' && !canCheck()
                ? 'bg-[#e5e2e1] text-[#9a9a9a] cursor-not-allowed'
                : status === 'wrong'
                  ? 'bg-[#ba1a1a] hover:bg-[#93000a] text-white cursor-pointer'
                  : 'bg-[#104b00] hover:bg-[#083200] text-white shadow-duo-green cursor-pointer'
              }`}
            type="button"
          >
            <span>{status === 'idle' ? 'Comprobar fonética' : 'Continuar'}</span>
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </button>
        </div>
      </footer>
    </div>
  );
};
