import React, { useEffect, useState } from 'react';
import { ScreenId, TransitionType } from '../types';
import { sounds } from '../utils/audio';

interface Props {
  onNavigate: (screen: ScreenId, transition?: TransitionType) => void;
}

/* ------------------------------------------------------------------ */
/* VOCABULARIO                                                         */
/* ------------------------------------------------------------------ */

type Group = 'animal' | 'cosa';

interface Item {
  id: string;
  name: string; // palabra en quechua chanka
  es: string; // significado en espaÃ±ol (Ãºnico)
  group: Group; // las opciones de un ejercicio salen siempre del mismo grupo
  img?: string; // ilustraciÃ³n
  emoji?: string; // alternativa cuando no hay ilustraciÃ³n
  fact: string; // dato que se muestra DESPUÃ‰S de responder
}

const IMG = (file: string) => `${import.meta.env.BASE_URL}images/${file}`;

const VOCAB: Item[] = [
  {
    id: 'allqu',
    name: 'Allqu',
    es: 'Perro andino',
    group: 'animal',
    img: IMG('doggie.png'),
    fact: 'Los perros pastores andinos protegen al ganado en las alturas y son compaÃ±eros vitales en los valles del Cusco y Ayacucho.'
  },
  {
    id: 'michi',
    name: 'Michi',
    es: 'Gato andino',
    group: 'animal',
    img: IMG('verde.png'),
    fact: 'Michi es la palabra quechua para gato y se usa en muchas comunidades andinas.'
  },
  {
    id: 'wikuna',
    name: 'WikuÃ±a',
    es: 'VicuÃ±a',
    group: 'animal',
    img: IMG('pancita.png'),
    fact: 'La vicuÃ±a vive por encima de los 4000 metros y su fibra era muy valorada en el mundo andino.'
  },
  {
    id: 'kuntur',
    name: 'Kuntur',
    es: 'CÃ³ndor',
    group: 'animal',
    img: IMG('mari.png'),
    fact: 'El cÃ³ndor andino es una de las aves voladoras mÃ¡s grandes del mundo y simboliza el mundo de arriba.'
  },
  {
    id: 'inti',
    name: 'Inti',
    es: 'Sol',
    group: 'cosa',
    emoji: 'â˜€ï¸',
    fact: 'Inti era el dios Sol de los incas. Cada junio se celebra el Inti Raymi en el Cusco.'
  },
  {
    id: 'killa',
    name: 'Killa',
    es: 'Luna',
    group: 'cosa',
    emoji: 'ðŸŒ™',
    fact: 'Killa es la Luna. En la cosmovisiÃ³n andina se la conoce como Mama Killa.'
  },
  {
    id: 'yaku',
    name: 'Yaku',
    es: 'Agua',
    group: 'cosa',
    emoji: 'ðŸ’§',
    fact: 'Yaku significa agua, un elemento sagrado en la cosmovisiÃ³n andina.'
  },
  {
    id: 'wasi',
    name: 'Wasi',
    es: 'Casa',
    group: 'cosa',
    emoji: 'ðŸ ',
    fact: 'Wasi significa casa y aparece en muchos nombres de lugares andinos.'
  },
  {
    id: 'urpi',
    name: 'Urpi',
    es: 'Paloma',
    group: 'cosa',
    emoji: 'ðŸ•Šï¸',
    fact: 'Urpi es la paloma. En quechua tambiÃ©n se usa como palabra cariÃ±osa.'
  }
];

/* ------------------------------------------------------------------ */
/* EJERCICIOS                                                          */
/* ------------------------------------------------------------------ */

type Mode =
  | 'word_to_img' // veo la palabra + audio, elijo la ilustraciÃ³n
  | 'audio_to_img' // solo audio, elijo la ilustraciÃ³n
  | 'img_to_word' // veo la ilustraciÃ³n, elijo la palabra
  | 'word_to_es' // veo la palabra + audio, elijo el significado
  | 'listen_to_word'; // solo audio, elijo la palabra escrita

interface Round {
  mode: Mode;
  target: Item;
  options: Item[];
  retry?: boolean;
}

const MODES: Mode[] = ['word_to_img', 'audio_to_img', 'img_to_word', 'word_to_es', 'listen_to_word'];
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
  const targets = shuffle(VOCAB).slice(0, 10).concat(shuffle(VOCAB)).slice(0, 10);
  const modes = shuffle([...MODES, ...MODES]);

  return targets.map((target, i) => {
    const sameGroup = VOCAB.filter((v) => v.group === target.group && v.id !== target.id);
    const options = shuffle([target, ...shuffle(sameGroup).slice(0, 3)]);
    return { mode: modes[i], target, options };
  });
};

const isVisualMode = (m: Mode) => m === 'word_to_img' || m === 'audio_to_img';

type Status = 'idle' | 'correct' | 'wrong';

/* ------------------------------------------------------------------ */
/* COMPONENTE                                                          */
/* ------------------------------------------------------------------ */

export const EjercicioIlustracionScreen: React.FC<Props> = ({ onNavigate }) => {
  const [queue, setQueue] = useState<Round[]>(() => buildLesson());
  const [total, setTotal] = useState<number>(() => queue.length);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [hearts, setHearts] = useState(MAX_HEARTS);
  const [gems, setGems] = useState(120);
  const [correctCount, setCorrectCount] = useState(0);
  const [mistakes, setMistakes] = useState(0);

  const round: Round | undefined = queue[idx];
  const finished = idx >= queue.length;
  const outOfHearts = hearts <= 0;
  const progress = finished ? 100 : Math.round((correctCount / total) * 100);

  // Los modos de audio reproducen la palabra al aparecer
  useEffect(() => {
    if (round && (round.mode === 'audio_to_img' || round.mode === 'listen_to_word')) {
      try {
        sounds.playVoice(round.target.name);
      } catch {
        /* sin audio */
      }
    }
  }, [idx]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSelect = (id: string) => {
    if (status !== 'idle' || outOfHearts) return;
    sounds.playTap();
    setSelected(id);
  };

  const handleComprobar = () => {
    if (!round || !selected || status !== 'idle') return;
    if (selected === round.target.id) {
      sounds.playSuccess();
      setStatus('correct');
      setCorrectCount((c) => c + 1);
      setGems((g) => g + GEMS_PER_HIT);
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
      setQueue((q) => [...q, { ...round, retry: true, options: shuffle(round.options) }]);
    }
    setIdx((i) => i + 1);
    setSelected(null);
    setStatus('idle');
  };

  const restart = () => {
    const lesson = buildLesson();
    setQueue(lesson);
    setTotal(lesson.length);
    setIdx(0);
    setSelected(null);
    setStatus('idle');
    setHearts(MAX_HEARTS);
    setCorrectCount(0);
    setMistakes(0);
  };

  // Enter = comprobar / continuar
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Enter' || finished || outOfHearts) return;
      if (status === 'idle') handleComprobar();
      else handleContinuar();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  /* --------------------------- Subvistas ---------------------------- */

  const Visual: React.FC<{ item: Item; big?: boolean }> = ({ item, big }) =>
    item.img ? (
      <img
        className="w-full h-full object-contain"
        alt={status === 'idle' ? 'IlustraciÃ³n' : item.name}
        src={item.img}
      />
    ) : (
      <span className={big ? 'text-[110px] leading-none' : 'text-[64px] md:text-[72px] leading-none'}>{item.emoji}</span>
    );

  const AudioButton: React.FC<{ word: string }> = ({ word }) => (
    <button
      aria-label="Escuchar pronunciaciÃ³n"
      onClick={() => sounds.playVoice(word)}
      className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[#2a3691] text-white flex items-center justify-center shrink-0 hover:bg-[#0e1c7b] transition-colors cursor-pointer group shadow-duo-blue"
      type="button"
    >
      <span className="material-symbols-outlined text-[28px] md:text-[32px] group-hover:scale-110 transition-transform">
        volume_up
      </span>
    </button>
  );

  const header = (r: Round) => {
    switch (r.mode) {
      case 'word_to_img':
        return (
          <div className="flex items-center gap-3 md:gap-4">
            <AudioButton word={r.target.name} />
            <h1 className="font-display text-2xl md:text-3xl font-bold text-[#3b0900]">
              Â¿CuÃ¡l de estos es <span className="text-[#0e1c7b]">&ldquo;{r.target.name}&rdquo;</span>?
            </h1>
          </div>
        );
      case 'audio_to_img':
        return (
          <div className="flex items-center gap-3 md:gap-4">
            <AudioButton word={r.target.name} />
            <h1 className="font-display text-2xl md:text-3xl font-bold text-[#3b0900]">
              Escucha y elige la ilustraciÃ³n
            </h1>
          </div>
        );
      case 'img_to_word':
        return (
          <h1 className="font-display text-2xl md:text-3xl font-bold text-[#3b0900]">
            Â¿CÃ³mo se dice esto en Quechua?
          </h1>
        );
      case 'word_to_es':
        return (
          <div className="flex items-center gap-3 md:gap-4">
            <AudioButton word={r.target.name} />
            <h1 className="font-display text-2xl md:text-3xl font-bold text-[#3b0900]">
              Â¿QuÃ© significa <span className="text-[#0e1c7b]">&ldquo;{r.target.name}&rdquo;</span>?
            </h1>
          </div>
        );
      case 'listen_to_word':
        return (
          <div className="flex items-center gap-3 md:gap-4">
            <AudioButton word={r.target.name} />
            <h1 className="font-display text-2xl md:text-3xl font-bold text-[#3b0900]">
              Escucha y elige la palabra
            </h1>
          </div>
        );
    }
  };

  const subtitle = (r: Round) => {
    switch (r.mode) {
      case 'word_to_img':
        return 'Selecciona la ilustraciÃ³n correcta para la palabra.';
      case 'audio_to_img':
        return 'Toca el altavoz tantas veces como necesites.';
      case 'img_to_word':
        return 'Elige la palabra en Quechua Chanka que corresponde a la ilustraciÃ³n.';
      case 'word_to_es':
        return 'Elige el significado en espaÃ±ol.';
      case 'listen_to_word':
        return 'Escucha con atenciÃ³n y elige cÃ³mo se escribe.';
    }
  };

  const optionState = (item: Item) => {
    const isSelected = selected === item.id;
    const isTarget = round!.target.id === item.id;
    if (status !== 'idle' && isTarget) return 'correct';
    if (status === 'wrong' && isSelected) return 'wrong';
    if (isSelected && status === 'idle') return 'selected';
    return 'plain';
  };

  const stateClasses: Record<string, string> = {
    correct: 'border-2 border-[#76de55] bg-[#91fb6e]/25 shadow-duo-green',
    wrong: 'border-2 border-[#ba1a1a] bg-[#ffdad6]/60',
    selected: 'border-2 border-[#ff842c] bg-white shadow-duo-orange',
    plain: 'border-2 border-[#c6c5d4] bg-white hover:border-[#767683] shadow-duo-neutral'
  };

  /* ------------------------ Pantallas finales ----------------------- */

  if (outOfHearts) {
    return (
      <div className="bg-[#fff8f6] text-[#3b0900] min-h-screen flex flex-col items-center justify-center gap-5 px-6 text-center">
        <span className="material-symbols-outlined text-[#ba1a1a] text-[72px] font-variation-fill">heart_broken</span>
        <h1 className="font-display text-3xl font-bold text-[#0e1c7b]">Â¡Te quedaste sin vidas!</h1>
        <p className="text-sm text-[#454652] max-w-sm">
          Equivocarse es parte de aprender. Vuelve a intentarlo con una lecciÃ³n nueva.
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
        <img alt="Kusi Alpaca" className="w-28 h-28 object-contain" src={IMG('pancita.png')} />
        <h1 className="font-display text-3xl font-bold text-[#0e1c7b]">Â¡Allinmi kanki! Ronda completa</h1>
        <div className="flex gap-3">
          <div className="px-5 py-3 bg-white border border-[#ffe2db] rounded-2xl">
            <p className="text-xs text-[#454652]">PrecisiÃ³n</p>
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
            onNavigate('ejercicio_emparejar', 'push');
          }}
          className="w-full max-w-sm h-14 bg-[#ff842c] hover:bg-[#e06c15] text-white rounded-2xl font-display font-bold text-base flex items-center justify-center gap-2 cursor-pointer shadow-duo-orange btn-3d"
        >
          <span>Continuar</span>
          <span className="material-symbols-outlined text-[24px]">arrow_forward</span>
        </button>
      </div>
    );
  }

  /* ------------------------------ Render ---------------------------- */

  const r = round!;
  const showVisualOptions = isVisualMode(r.mode);
  const showTargetImage = r.mode === 'img_to_word';
  const footerBg =
    status === 'correct' ? 'bg-[#e4fddc] border-[#76de55]' : status === 'wrong' ? 'bg-[#ffe3df] border-[#ba1a1a]/40' : 'bg-white border-[#ffe2db]';

  return (
    <div className="bg-[#fff8f6] text-[#3b0900] min-h-screen flex flex-col font-body-md select-none antialiased">
      {/* Header */}
      <header className="w-full bg-white sticky top-0 z-30 shadow-sm border-b border-[#ffe2db]">
        <div className="max-w-[1040px] mx-auto px-4 md:px-10 h-16 flex items-center justify-between gap-4">
          {/* Navigation Target: //header//button[@aria-label='Cerrar lecciÃ³n'] */}
          <button
            aria-label="Cerrar lecciÃ³n"
            onClick={() => {
              sounds.playTap();
              onNavigate('mapa_quechua', 'push_back');
            }}
            className="w-10 h-10 flex items-center justify-center rounded-xl text-[#767683] hover:bg-[#ffe9e4] transition-colors cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>

          <div className="flex-1 max-w-xl mx-2">
            <div className="w-full bg-[#ffe2db] rounded-full h-3.5 p-0.5 overflow-hidden flex items-center">
              <div
                className="bg-[#ff842c] h-full rounded-full transition-all duration-500 ease-out flex items-center justify-end pr-1"
                style={{ width: `${Math.max(progress, 6)}%` }}
              >
                <div className="w-1.5 h-1.5 bg-white/70 rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-4 shrink-0">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ffdad6]/50 text-[#ba1a1a]">
              <span className="material-symbols-outlined text-[20px] text-[#ba1a1a] font-variation-fill">favorite</span>
              <span className="font-bold text-sm">{hearts}</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ffe9e4] text-[#2a3691]">
              <span className="material-symbols-outlined text-[20px] text-[#2a3691] font-variation-fill">diamond</span>
              <span className="font-bold text-sm">{gems}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Contenido */}
      <main className="flex-1 w-full max-w-[1040px] mx-auto px-4 md:px-10 py-6 flex flex-col justify-between">
        <div className="mt-2 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#dfe0ff] text-[#0e1c7b] font-bold text-xs uppercase tracking-wide">
              Vocabulario Andino
            </span>
            <span className="text-[#454652] text-xs">
              Quechua Chanka â€¢ Ejercicio {Math.min(idx + 1, queue.length)} de {queue.length}
            </span>
            {r.retry && (
              <span className="px-2 py-0.5 rounded-full bg-[#ffdad6] text-[#ba1a1a] font-bold text-[10px] uppercase">
                Repaso
              </span>
            )}
          </div>
          {header(r)}
          <p className="text-[#454652] text-sm mt-1 ml-0 md:ml-16">{subtitle(r)}</p>
        </div>

        {/* IlustraciÃ³n grande (solo en el modo ilustraciÃ³n â†’ palabra) */}
        {showTargetImage && (
          <div className="mx-auto w-44 h-44 md:w-56 md:h-56 rounded-3xl bg-white border-2 border-[#ffe2db] flex items-center justify-center p-4 shadow-duo-card mb-4">
            <Visual item={r.target} big />
          </div>
        )}

        {/* Opciones */}
        {showVisualOptions ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 md:gap-5 my-auto py-2">
            {r.options.map((opt, i) => {
              const st = optionState(opt);
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleSelect(opt.id)}
                  className={`relative rounded-2xl p-3 md:p-4 flex flex-col items-center justify-between cursor-pointer transition-all ${stateClasses[st]}`}
                >
                  <div className="w-full flex justify-between items-center mb-1">
                    <span className="w-6 h-6 rounded-lg bg-[#ffe2db] text-[#454652] font-bold text-xs flex items-center justify-center">
                      {i + 1}
                    </span>
                    {st === 'correct' && (
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#76de55] text-[#083200]">
                        <span className="material-symbols-outlined text-[16px] font-variation-fill">check</span>
                      </span>
                    )}
                    {st === 'wrong' && (
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#ba1a1a] text-white">
                        <span className="material-symbols-outlined text-[16px] font-variation-fill">close</span>
                      </span>
                    )}
                    {st === 'selected' && (
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#ff842c] text-white">
                        <span className="material-symbols-outlined text-[16px] font-variation-fill">check</span>
                      </span>
                    )}
                    {st === 'plain' && <span className="w-6 h-6 rounded-full border-2 border-[#c6c5d4]"></span>}
                  </div>

                  <div className="w-full aspect-square rounded-xl bg-[#fff1ed] overflow-hidden flex items-center justify-center p-2 my-1 border border-[#ffe2db]">
                    <Visual item={opt} />
                  </div>

                  {/* El nombre solo aparece DESPUÃ‰S de comprobar */}
                  <div className="text-center mt-2 w-full min-h-[44px]">
                    {status !== 'idle' ? (
                      <>
                        <h2 className="font-display text-lg font-bold text-[#3b0900]">{opt.name}</h2>
                        <span className="text-xs text-[#454652] block">{opt.es}</span>
                      </>
                    ) : (
                      <span className="text-xs text-[#c6c5d4] block pt-3">Toca para elegir</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-auto py-2">
            {r.options.map((opt, i) => {
              const st = optionState(opt);
              const label = r.mode === 'word_to_es' ? opt.es : opt.name;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleSelect(opt.id)}
                  className={`w-full min-h-[72px] p-4 rounded-2xl text-left flex items-center gap-3 cursor-pointer transition-all ${stateClasses[st]}`}
                >
                  <span className="w-7 h-7 shrink-0 rounded-lg bg-[#ffe2db] text-[#454652] font-bold text-xs flex items-center justify-center">
                    {i + 1}
                  </span>
                  <span className="font-display text-lg font-bold text-[#3b0900] flex-1">{label}</span>
                  {st === 'correct' && <span className="material-symbols-outlined text-[#2d7d15] font-variation-fill">check_circle</span>}
                  {st === 'wrong' && <span className="material-symbols-outlined text-[#ba1a1a] font-variation-fill">cancel</span>}
                </button>
              );
            })}
          </div>
        )}

        {/* Dato Yachay: solo despuÃ©s de responder, para no regalar la respuesta */}
        <div className="w-full bg-white border border-[#ffe2db] rounded-2xl p-3.5 md:p-4 mt-3 mb-2 flex items-center gap-3.5 md:gap-5 shadow-sm min-h-[88px]">
          <div className="relative w-16 h-16 md:w-20 md:h-20 shrink-0 flex items-center justify-center">
            <img alt="Kusi Alpaca" className="w-full h-full object-contain drop-shadow-md" src={IMG('pancita.png')} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1.5 text-[#9a4600] font-bold text-xs">
              <span className="material-symbols-outlined text-[18px]">lightbulb</span>
              <span>DATO YACHAY</span>
            </div>
            <p className="text-sm text-[#3b0900] mt-0.5">
              {status === 'idle' ? 'Responde para descubrir un dato curioso sobre esta palabra.' : r.target.fact}
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={`w-full border-t p-4 sticky bottom-0 z-30 transition-colors ${footerBg}`}>
        <div className="max-w-[1040px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 w-full sm:w-auto min-h-[40px]">
            {status === 'idle' && (
              <div className="hidden sm:flex items-center gap-2 text-[#454652] text-xs">
                <kbd className="px-2 py-1 rounded bg-[#ffe2db] border border-[#c6c5d4] font-mono text-xs">Enter</kbd>
                <span>para verificar</span>
              </div>
            )}
            {status === 'correct' && (
              <>
                <div className="w-10 h-10 rounded-full bg-[#91fb6e]/60 flex items-center justify-center text-[#083200] shrink-0">
                  <span className="material-symbols-outlined text-[24px]">verified</span>
                </div>
                <div>
                  <p className="font-bold text-sm text-[#083200] leading-tight">Â¡Allinmi! Correcto</p>
                  <p className="text-xs text-[#454652]">
                    {r.target.name} = {r.target.es} Â· +{GEMS_PER_HIT} gemas
                  </p>
                </div>
              </>
            )}
            {status === 'wrong' && (
              <>
                <div className="w-10 h-10 rounded-full bg-[#ffdad6] flex items-center justify-center text-[#ba1a1a] shrink-0">
                  <span className="material-symbols-outlined text-[24px]">close</span>
                </div>
                <div>
                  <p className="font-bold text-sm text-[#93000a] leading-tight">Respuesta correcta:</p>
                  <p className="text-xs text-[#93000a]">
                    {r.target.name} = {r.target.es}
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Navigation Target: //footer//button[contains(., 'Comprobar respuesta')] */}
          <button
            onClick={status === 'idle' ? handleComprobar : handleContinuar}
            disabled={status === 'idle' && !selected}
            className={`w-full sm:w-auto sm:min-w-[260px] h-14 rounded-2xl font-display font-bold text-base flex items-center justify-center gap-2 btn-3d transition-colors ${
              status === 'idle' && !selected
                ? 'bg-[#e5e2e1] text-[#9a9a9a] cursor-not-allowed'
                : status === 'wrong'
                ? 'bg-[#ba1a1a] hover:bg-[#93000a] text-white cursor-pointer'
                : 'bg-[#ff842c] hover:bg-[#e06c15] text-white cursor-pointer shadow-duo-orange'
            }`}
            type="button"
          >
            <span>{status === 'idle' ? 'Comprobar respuesta' : 'Continuar'}</span>
            <span className="material-symbols-outlined text-[24px]">arrow_forward</span>
          </button>
        </div>
      </footer>
    </div>
  );
};
