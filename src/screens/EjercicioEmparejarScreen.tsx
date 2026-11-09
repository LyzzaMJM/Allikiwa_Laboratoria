import React, { useEffect, useState } from 'react';
import { ScreenId, TransitionType } from '../types';
import { sounds } from '../utils/audio';

interface Props {
  onNavigate: (screen: ScreenId, transition?: TransitionType) => void;
}

/* ------------------------------------------------------------------ */
/* VOCABULARIO                                                         */
/* ------------------------------------------------------------------ */

type Lang = 'AIMARA' | 'QUECHUA' | 'QUECHUA & AIMARA';

interface Word {
  id: string;
  text: string; // palabra en quechua / aimara
  es: string; // significado en espaÃ±ol (Ãºnico en todo el vocabulario)
  lang: Lang;
}

const VOCAB: Word[] = [
  { id: 'tayka', text: 'Tayka', es: 'Madre / MamÃ¡', lang: 'AIMARA' },
  { id: 'kamisaraki', text: 'Kamisaraki', es: 'Â¿CÃ³mo estÃ¡s?', lang: 'AIMARA' },
  { id: 'allillanchu', text: 'Allillanchu', es: 'Â¿EstÃ¡s bien?', lang: 'QUECHUA' },
  { id: 'urpi', text: 'Urpi', es: 'Paloma', lang: 'QUECHUA' },
  { id: 'inti', text: 'Inti', es: 'Sol', lang: 'QUECHUA & AIMARA' },
  { id: 'yaku', text: 'Yaku', es: 'Agua', lang: 'QUECHUA' },
  { id: 'wasi', text: 'Wasi', es: 'Casa', lang: 'QUECHUA' },
  { id: 'jaqi', text: 'Jaqi', es: 'Persona', lang: 'AIMARA' },
  { id: 'killa', text: 'Killa', es: 'Luna', lang: 'QUECHUA' },
  { id: 'nawi', text: 'Ã‘awi', es: 'Ojo', lang: 'QUECHUA' },
  { id: 'jilata', text: 'Jilata', es: 'Hermano', lang: 'AIMARA' },
  { id: 'sumaq', text: 'Sumaq', es: 'Hermoso', lang: 'QUECHUA' }
];

interface DialogData {
  lang: 'Quechua' | 'Aimara';
  prompt: string;
  promptEs: string;
  answer: string;
  answerEs: string;
  distractors: string[];
}

const DIALOGS: DialogData[] = [
  {
    lang: 'Aimara',
    prompt: 'Kamisaraki?',
    promptEs: 'Â¿CÃ³mo estÃ¡s?',
    answer: 'Walikistwa',
    answerEs: 'Estoy bien',
    distractors: ['Ã‘awi', 'Wasi']
  },
  {
    lang: 'Quechua',
    prompt: 'Allillanchu?',
    promptEs: 'Â¿EstÃ¡s bien?',
    answer: 'ArÃ­, allinmi',
    answerEs: 'SÃ­, estoy bien',
    distractors: ['Yaku', 'Killa']
  }
];

/* ------------------------------------------------------------------ */
/* EJERCICIOS                                                          */
/* ------------------------------------------------------------------ */

type Exercise = { retry?: boolean } & (
  | { kind: 'match'; words: Word[]; rights: Word[] }
  | { kind: 'meaning'; word: Word; options: string[]; answer: string }
  | { kind: 'word'; word: Word; options: string[]; answer: string }
  | { kind: 'listen'; word: Word; options: string[]; answer: string }
  | { kind: 'truefalse'; word: Word; shown: string; answer: boolean }
  | { kind: 'dialog'; dialog: DialogData; options: string[] }
);

const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const MAX_HEARTS = 4;

const buildLesson = (): Exercise[] => {
  const pool = shuffle(VOCAB);
  const others = (w: Word, n: number) => shuffle(VOCAB.filter((v) => v.id !== w.id)).slice(0, n);

  const matchA = pool.slice(0, 4);
  const matchB = pool.slice(4, 8);
  const [w1, w2, w3, w4, w5] = pool.slice(8).concat(pool.slice(0, 4));

  const meaning = (w: Word): Exercise => ({
    kind: 'meaning',
    word: w,
    answer: w.es,
    options: shuffle([w.es, ...others(w, 3).map((o) => o.es)])
  });

  const wordEx = (w: Word): Exercise => ({
    kind: 'word',
    word: w,
    answer: w.text,
    options: shuffle([w.text, ...others(w, 3).map((o) => o.text)])
  });

  const listen = (w: Word): Exercise => ({
    kind: 'listen',
    word: w,
    answer: w.es,
    options: shuffle([w.es, ...others(w, 3).map((o) => o.es)])
  });

  const truefalse = (w: Word, truth: boolean): Exercise => ({
    kind: 'truefalse',
    word: w,
    answer: truth,
    shown: truth ? w.es : others(w, 1)[0].es
  });

  const dialog = (d: DialogData): Exercise => ({
    kind: 'dialog',
    dialog: d,
    options: shuffle([d.answer, ...d.distractors])
  });

  const [d1, d2] = shuffle(DIALOGS);

  return [
    { kind: 'match', words: matchA, rights: shuffle(matchA) },
    meaning(w1),
    listen(w2),
    wordEx(w3),
    truefalse(w4, Math.random() > 0.5),
    dialog(d1),
    { kind: 'match', words: matchB, rights: shuffle(matchB) },
    listen(w5),
    truefalse(w1, Math.random() > 0.5),
    dialog(d2)
  ];
};

/* ------------------------------------------------------------------ */
/* COMPONENTE                                                          */
/* ------------------------------------------------------------------ */

type Status = 'idle' | 'correct' | 'wrong';

export const EjercicioEmparejarScreen: React.FC<Props> = ({ onNavigate }) => {
  const [queue, setQueue] = useState<Exercise[]>(() => buildLesson());
  const [total, setTotal] = useState<number>(() => queue.length);
  const [idx, setIdx] = useState(0);
  const [hearts, setHearts] = useState(MAX_HEARTS);
  const [correctCount, setCorrectCount] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [status, setStatus] = useState<Status>('idle');

  // Estado de opciÃ³n Ãºnica (meaning, word, listen, truefalse, dialog)
  const [selected, setSelected] = useState<string | null>(null);

  // Estado de emparejar
  const [selLeft, setSelLeft] = useState<string | null>(null);
  const [selRight, setSelRight] = useState<string | null>(null);
  const [matched, setMatched] = useState<string[]>([]);
  const [wrongPair, setWrongPair] = useState<{ l: string; r: string } | null>(null);

  const current: Exercise | undefined = queue[idx];
  const finished = idx >= queue.length;
  const outOfHearts = hearts <= 0;
  const progress = finished ? 100 : Math.round((correctCount / total) * 100);

  // Al escuchar: reproducir automÃ¡ticamente la palabra (si el navegador lo permite)
  useEffect(() => {
    if (current && current.kind === 'listen') {
      try {
        sounds.playVoice(current.word.text);
      } catch {
        /* sin audio */
      }
    }
  }, [idx]); // eslint-disable-line react-hooks/exhaustive-deps

  const resetSelections = () => {
    setSelected(null);
    setSelLeft(null);
    setSelRight(null);
    setMatched([]);
    setWrongPair(null);
    setStatus('idle');
  };

  const loseHeart = () => {
    setHearts((h) => Math.max(0, h - 1));
    setMistakes((m) => m + 1);
    const s = sounds as unknown as { playError?: () => void };
    if (s.playError) s.playError();
  };

  const restart = () => {
    const lesson = buildLesson();
    setQueue(lesson);
    setTotal(lesson.length);
    setIdx(0);
    setHearts(MAX_HEARTS);
    setCorrectCount(0);
    setMistakes(0);
    resetSelections();
  };

  /* ---------------------------- Emparejar --------------------------- */

  const evaluatePair = (l: string, r: string) => {
    if (!current || current.kind !== 'match') return;
    if (l === r) {
      sounds.playSuccess();
      const next = [...matched, l];
      setMatched(next);
      setSelLeft(null);
      setSelRight(null);
      if (next.length === current.words.length) {
        setStatus('correct');
        setCorrectCount((c) => c + 1);
      }
    } else {
      loseHeart();
      setWrongPair({ l, r });
      setSelLeft(null);
      setSelRight(null);
      setTimeout(() => setWrongPair(null), 600);
    }
  };

  const onLeftClick = (w: Word) => {
    sounds.playTap();
    sounds.playVoice(w.text);
    if (status !== 'idle' || matched.includes(w.id) || outOfHearts) return;
    if (selRight) evaluatePair(w.id, selRight);
    else setSelLeft(w.id);
  };

  const onRightClick = (w: Word) => {
    sounds.playTap();
    if (status !== 'idle' || matched.includes(w.id) || outOfHearts) return;
    if (selLeft) evaluatePair(selLeft, w.id);
    else setSelRight(w.id);
  };

  /* ------------------------ Resto de ejercicios --------------------- */

  const onOptionClick = (value: string) => {
    if (status !== 'idle' || outOfHearts) return;
    sounds.playTap();
    setSelected(value);
  };

  const handleComprobar = () => {
    if (!current || status !== 'idle' || !selected || current.kind === 'match') return;

    let ok = false;
    if (current.kind === 'truefalse') ok = (selected === 'Verdadero') === current.answer;
    else if (current.kind === 'dialog') ok = selected === current.dialog.answer;
    else ok = selected === current.answer;

    if (ok) {
      sounds.playSuccess();
      setStatus('correct');
      setCorrectCount((c) => c + 1);
    } else {
      loseHeart();
      setStatus('wrong');
    }
  };

  const handleContinuar = () => {
    sounds.playTap();
    if (current && status === 'wrong' && !current.retry) {
      // Un ejercicio fallado se repite una vez al final de la lecciÃ³n
      setQueue((q) => [...q, { ...current, retry: true }]);
    }
    setIdx((i) => i + 1);
    resetSelections();
  };

  const handleSkip = () => {
    sounds.playTap();
    if (!current) return;
    if (!current.retry) setQueue((q) => [...q, { ...current, retry: true }]);
    setIdx((i) => i + 1);
    resetSelections();
  };

  /* ---------------------------- Textos ------------------------------ */

  const titleFor = (ex: Exercise): { chip: string; title: string; hint: string } => {
    switch (ex.kind) {
      case 'match':
        return {
          chip: 'Emparejar',
          title: 'Toca los pares que corresponden',
          hint: 'Toca una palabra y luego su significado. Si aciertas, el par se bloquea.'
        };
      case 'meaning':
        return { chip: 'Significado', title: 'Â¿QuÃ© significa esta palabra?', hint: 'Toca el altavoz para escucharla.' };
      case 'word': {
        return {
          chip: 'TraducciÃ³n',
          title: 'Elige la palabra correcta',
          hint: `Â¿CÃ³mo se dice "${ex.word.es}" en ${ex.word.lang === 'AIMARA' ? 'Aimara' : ex.word.lang === 'QUECHUA' ? 'Quechua' : 'Quechua o Aimara'}?`
        };
      }
      case 'listen':
        return { chip: 'Escucha', title: 'Escucha y elige el significado', hint: 'Toca el botÃ³n para volver a oÃ­r la palabra.' };
      case 'truefalse':
        return { chip: 'Verdadero o falso', title: 'Â¿Es correcta esta traducciÃ³n?', hint: 'Decide si el significado corresponde a la palabra.' };
      case 'dialog':
        return { chip: 'ConversaciÃ³n', title: 'Completa la conversaciÃ³n', hint: `Elige la respuesta mÃ¡s natural en ${ex.dialog.lang}.` };
    }
  };

  const correctAnswerText = (ex: Exercise): string => {
    switch (ex.kind) {
      case 'meaning':
      case 'word':
      case 'listen':
        return ex.answer;
      case 'truefalse':
        return ex.answer ? `SÃ­: ${ex.word.text} = ${ex.word.es}` : `No: ${ex.word.text} significa "${ex.word.es}"`;
      case 'dialog':
        return `${ex.dialog.answer} (${ex.dialog.answerEs})`;
      default:
        return '';
    }
  };

  /* ---------------------------- Subvistas --------------------------- */

  const OptionButton: React.FC<{ value: string; label?: string; index: number }> = ({ value, label, index }) => {
    const isSelected = selected === value;
    const answer =
      current && current.kind !== 'match' && current.kind !== 'truefalse'
        ? current.kind === 'dialog'
          ? current.dialog.answer
          : current.answer
        : null;
    const revealCorrect = status !== 'idle' && value === answer;
    const revealWrong = status === 'wrong' && isSelected && value !== answer;

    let cls = 'bg-white border-2 border-[#c6c5d4]/60 hover:border-[#0e1c7b]/40 shadow-duo-neutral text-[#3b0900]';
    if (revealCorrect) cls = 'bg-[#91fb6e]/30 border-2 border-[#76de55] shadow-duo-green text-[#083200]';
    else if (revealWrong) cls = 'bg-[#ffdad6]/70 border-2 border-[#ba1a1a] text-[#93000a]';
    else if (isSelected) cls = 'bg-[#dfe0ff]/40 border-2 border-[#0e1c7b] shadow-duo-blue text-[#0e1c7b]';

    return (
      <button
        type="button"
        onClick={() => onOptionClick(value)}
        className={`w-full min-h-[64px] p-3 md:p-4 rounded-2xl text-left flex items-center gap-3 transition-all cursor-pointer ${cls}`}
      >
        <span className="w-7 h-7 shrink-0 rounded-lg border border-current/30 flex items-center justify-center text-xs font-bold opacity-70">
          {index + 1}
        </span>
        <span className="font-display text-base sm:text-lg font-semibold">{label ?? value}</span>
      </button>
    );
  };

  const SpeakButton: React.FC<{ text: string; big?: boolean }> = ({ text, big }) => (
    <button
      type="button"
      onClick={() => {
        sounds.playTap();
        sounds.playVoice(text);
      }}
      className={`${big ? 'w-24 h-24' : 'w-12 h-12'} rounded-2xl bg-[#dfe0ff]/60 border-2 border-[#0e1c7b] text-[#0e1c7b] flex items-center justify-center shadow-duo-blue cursor-pointer hover:bg-[#dfe0ff] transition-colors shrink-0`}
      aria-label={`Escuchar ${text}`}
    >
      <span
        className={`material-symbols-outlined ${big ? 'text-[48px]' : 'text-[26px]'}`}
        style={{ fontVariationSettings: "'FILL' 1" }}
      >
        volume_up
      </span>
    </button>
  );

  const renderBody = (ex: Exercise) => {
    switch (ex.kind) {
      case 'match':
        return (
          <section className="grid grid-cols-2 gap-3 md:gap-4 my-auto py-2">
            <div className="flex flex-col gap-3">
              {ex.words.map((w) => {
                const isMatched = matched.includes(w.id);
                const isSelected = selLeft === w.id && !isMatched;
                const isWrong = wrongPair?.l === w.id;
                return (
                  <button
                    key={w.id}
                    onClick={() => onLeftClick(w)}
                    type="button"
                    className={`w-full min-h-[72px] p-3 md:p-4 rounded-2xl text-left flex items-center justify-between transition-all cursor-pointer ${
                      isMatched
                        ? 'bg-[#91fb6e]/30 border-2 border-[#76de55] opacity-90 shadow-duo-green'
                        : isWrong
                        ? 'bg-[#ffdad6]/70 border-2 border-[#ba1a1a] animate-pulse'
                        : isSelected
                        ? 'bg-[#dfe0ff]/40 border-2 border-[#0e1c7b] shadow-duo-blue'
                        : 'bg-white border-2 border-[#c6c5d4]/60 hover:border-[#0e1c7b]/40 shadow-duo-neutral'
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className={`text-[10px] font-bold tracking-wider ${isMatched ? 'text-[#083200]' : isSelected ? 'text-[#0e1c7b]' : 'text-[#454652]'}`}>
                        {w.lang}
                      </span>
                      <span className={`font-display text-base sm:text-lg font-bold ${isMatched ? 'text-[#083200]' : isSelected ? 'text-[#0e1c7b]' : 'text-[#3b0900]'}`}>
                        {w.text}
                      </span>
                    </div>
                    {isMatched ? (
                      <div className="w-7 h-7 rounded-full bg-[#91fb6e] flex items-center justify-center text-[#042100] shrink-0 ml-2">
                        <span className="material-symbols-outlined text-[18px] font-bold">check</span>
                      </div>
                    ) : (
                      <span
                        className={`material-symbols-outlined text-[20px] ${isSelected ? 'text-[#0e1c7b]' : 'text-[#c6c5d4]'}`}
                        style={{ fontVariationSettings: isSelected ? "'FILL' 1" : undefined }}
                      >
                        volume_up
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-col gap-3">
              {ex.rights.map((w) => {
                const isMatched = matched.includes(w.id);
                const isSelected = selRight === w.id && !isMatched;
                const isWrong = wrongPair?.r === w.id;
                return (
                  <button
                    key={w.id}
                    onClick={() => onRightClick(w)}
                    type="button"
                    className={`w-full min-h-[72px] p-3 md:p-4 rounded-2xl text-left flex items-center justify-between transition-all cursor-pointer ${
                      isMatched
                        ? 'bg-[#91fb6e]/30 border-2 border-[#76de55] opacity-90 shadow-duo-green'
                        : isWrong
                        ? 'bg-[#ffdad6]/70 border-2 border-[#ba1a1a] animate-pulse'
                        : isSelected
                        ? 'bg-white border-2 border-[#2a3691] shadow-duo-blue'
                        : 'bg-white border-2 border-[#c6c5d4]/60 hover:border-[#0e1c7b]/40 shadow-duo-neutral'
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className="text-[10px] text-[#454652] font-medium">ESPAÃ‘OL</span>
                      <span className={`font-display text-sm sm:text-base font-semibold ${isMatched ? 'text-[#083200] font-bold' : isSelected ? 'text-[#2a3691] font-bold' : 'text-[#3b0900]'}`}>
                        {w.es}
                      </span>
                    </div>
                    {isMatched ? (
                      <div className="w-7 h-7 rounded-full bg-[#91fb6e] flex items-center justify-center text-[#042100] shrink-0 ml-2">
                        <span className="material-symbols-outlined text-[18px] font-bold">check</span>
                      </div>
                    ) : isSelected ? (
                      <span className="material-symbols-outlined text-[#2a3691] text-[18px]">radio_button_checked</span>
                    ) : (
                      <span className="material-symbols-outlined text-[#c6c5d4]/50 text-[18px]">touch_app</span>
                    )}
                  </button>
                );
              })}
            </div>
          </section>
        );

      case 'meaning':
        return (
          <section className="my-auto py-2 flex flex-col gap-5">
            <div className="flex items-center gap-4 bg-white border border-[#ffe9e4] rounded-2xl p-4">
              <SpeakButton text={ex.word.text} />
              <div>
                <p className="text-[10px] font-bold tracking-wider text-[#454652]">{ex.word.lang}</p>
                <p className="font-display text-3xl font-bold text-[#0e1c7b]">{ex.word.text}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ex.options.map((o, i) => (
                <OptionButton key={o} value={o} index={i} />
              ))}
            </div>
          </section>
        );

      case 'word':
        return (
          <section className="my-auto py-2 flex flex-col gap-5">
            <div className="bg-white border border-[#ffe9e4] rounded-2xl p-4">
              <p className="text-[10px] font-bold tracking-wider text-[#454652]">ESPAÃ‘OL</p>
              <p className="font-display text-3xl font-bold text-[#0e1c7b]">{ex.word.es}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ex.options.map((o, i) => (
                <OptionButton key={o} value={o} index={i} />
              ))}
            </div>
          </section>
        );

      case 'listen':
        return (
          <section className="my-auto py-2 flex flex-col items-center gap-6">
            <SpeakButton text={ex.word.text} big />
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ex.options.map((o, i) => (
                <OptionButton key={o} value={o} index={i} />
              ))}
            </div>
          </section>
        );

      case 'truefalse':
        return (
          <section className="my-auto py-2 flex flex-col gap-5">
            <div className="flex items-center gap-4 bg-white border border-[#ffe9e4] rounded-2xl p-5">
              <SpeakButton text={ex.word.text} />
              <p className="font-display text-xl sm:text-2xl font-bold text-[#3b0900]">
                <span className="text-[#0e1c7b]">{ex.word.text}</span> significa{' '}
                <span className="text-[#9a4600]">"{ex.shown}"</span>
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {['Verdadero', 'Falso'].map((o, i) => (
                <OptionButton key={o} value={o} index={i} />
              ))}
            </div>
          </section>
        );

      case 'dialog':
        return (
          <section className="my-auto py-2 flex flex-col gap-5">
            <div className="flex flex-col gap-3">
              <div className="flex items-end gap-3">
                <div className="w-12 h-12 shrink-0">
                  <img
                    alt="Kusi Alpaca"
                    className="w-full h-full object-contain"
                    src={`${import.meta.env.BASE_URL}images/pancita.png`}
                  />
                </div>
                <div className="bg-white border border-[#ffe9e4] rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-3">
                  <SpeakButton text={ex.dialog.prompt} />
                  <div>
                    <p className="font-display text-xl font-bold text-[#0e1c7b]">{ex.dialog.prompt}</p>
                    <p className="text-xs text-[#454652]">{ex.dialog.promptEs}</p>
                  </div>
                </div>
              </div>
              <div className="self-end bg-[#fff1ed] border border-dashed border-[#9a4600]/40 rounded-2xl rounded-br-sm px-4 py-3 min-w-[160px] text-right">
                <p className="font-display text-xl font-bold text-[#9a4600]">{selected ?? '______'}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {ex.options.map((o, i) => (
                <OptionButton key={o} value={o} index={i} />
              ))}
            </div>
          </section>
        );
    }
  };

  /* ------------------------ Pantallas finales ----------------------- */

  if (outOfHearts) {
    return (
      <div className="bg-[#fff8f6] text-[#3b0900] min-h-screen flex flex-col items-center justify-center gap-5 px-6 text-center font-body-md">
        <span className="material-symbols-outlined text-[#ba1a1a] text-[72px]" style={{ fontVariationSettings: "'FILL' 1" }}>
          heart_broken
        </span>
        <h1 className="font-display text-3xl font-bold text-[#0e1c7b]">Â¡Te quedaste sin vidas!</h1>
        <p className="text-sm text-[#454652] max-w-sm">
          No pasa nada, equivocarse es parte de aprender. Vuelve a intentarlo con una lecciÃ³n nueva.
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
            className="flex-1 py-3 rounded-2xl bg-[#76de55] hover:bg-[#5cc23c] text-[#083200] font-bold text-sm shadow-duo-green btn-3d cursor-pointer"
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
      <div className="bg-[#fff8f6] text-[#3b0900] min-h-screen flex flex-col items-center justify-center gap-5 px-6 text-center font-body-md">
        <img
          alt="Kusi Alpaca"
          className="w-28 h-28 object-contain"
          src={`${import.meta.env.BASE_URL}images/pancita.png`}
        />
        <h1 className="font-display text-3xl font-bold text-[#0e1c7b]">Â¡Allinmi kanki! Â¡LecciÃ³n completa!</h1>
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
            <p className="text-xs text-[#454652]">Errores</p>
            <p className="font-bold text-2xl text-[#9a4600]">{mistakes}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            sounds.playSuccess();
            onNavigate('ejercicio_dictado', 'push');
          }}
          className="w-full max-w-sm py-3.5 px-6 rounded-2xl bg-[#76de55] hover:bg-[#5cc23c] text-[#083200] font-bold text-sm flex items-center justify-center gap-2 shadow-duo-green btn-3d cursor-pointer"
        >
          <span>CONTINUAR</span>
          <span className="material-symbols-outlined font-bold text-[20px]">arrow_forward</span>
        </button>
      </div>
    );
  }

  /* ------------------------------ Render ---------------------------- */

  const info = titleFor(current!);
  const canCheck = current!.kind !== 'match' && !!selected && status === 'idle';
  const showContinue = status !== 'idle';

  const footerBg =
    status === 'correct' ? 'bg-[#e4fddc] border-[#76de55]' : status === 'wrong' ? 'bg-[#ffe3df] border-[#ba1a1a]/40' : 'bg-white border-[#ffe2db]';

  return (
    <div className="bg-[#fff8f6] text-[#3b0900] min-h-screen flex flex-col font-body-md select-none antialiased">
      {/* HEADER */}
      <header className="w-full bg-white border-b border-[#ffe2db] py-3 px-4 md:px-10 sticky top-0 z-30">
        <div className="max-w-[1000px] mx-auto flex items-center justify-between gap-4">
          {/* Navigation Target: //header//button[@aria-label='Cerrar ejercicio'] */}
          <button
            aria-label="Cerrar ejercicio"
            onClick={() => {
              sounds.playTap();
              onNavigate('mapa_quechua', 'push_back');
            }}
            className="w-10 h-10 rounded-full flex items-center justify-center text-[#767683] hover:text-[#3b0900] hover:bg-[#ffe9e4] transition-colors cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[26px]">close</span>
          </button>

          {/* Barra de progreso real */}
          <div className="flex-1 max-w-xl mx-2">
            <div className="w-full bg-[#ffe9e4] h-4 rounded-full overflow-hidden p-0.5">
              <div
                className="bg-[#76de55] h-full rounded-full transition-all duration-500 relative flex items-center justify-end pr-1"
                style={{ width: `${Math.max(progress, 6)}%` }}
              >
                <div className="w-2 h-2 rounded-full bg-white opacity-80"></div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => sounds.playTap()}
              className="w-10 h-10 rounded-xl bg-[#fff1ed] text-[#2a3691] flex items-center justify-center hover:bg-[#ffe9e4] transition-colors cursor-pointer"
              title="Sonido activado"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                volume_up
              </span>
            </button>

            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#ffdad6]/60 rounded-xl">
              <span className="material-symbols-outlined text-[#ba1a1a] text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                favorite
              </span>
              <span className="font-bold text-sm text-[#ba1a1a]">{hearts}</span>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="flex-1 w-full max-w-[1000px] mx-auto px-4 md:px-10 py-6 flex flex-col justify-between">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#ffe9e4] rounded-full text-[#9a4600] text-xs mb-1.5 font-bold uppercase tracking-wide">
              <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                translate
              </span>
              {info.chip} Â· Chanka & Aimara
              {current!.retry && <span className="ml-1 text-[#ba1a1a]">Â· Repaso</span>}
            </div>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-[#0e1c7b]">{info.title}</h1>
            <p className="text-xs text-[#454652]">{info.hint}</p>
          </div>

          <div className="flex items-center gap-3 bg-white border border-[#ffe9e4] p-2.5 pr-4 rounded-2xl shadow-sm self-start md:self-auto">
            <div className="w-12 h-12 shrink-0">
              <img
                alt="Kusi Alpaca"
                className="w-full h-full object-contain filter drop-shadow-sm"
                src={`${import.meta.env.BASE_URL}images/pancita.png`}
              />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-bold text-sm text-[#3b0900]">Kusi</span>
                <span className="material-symbols-outlined text-[#f27a21] text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
              </div>
              <p className="text-xs text-[#454652]">
                Ejercicio {Math.min(idx + 1, queue.length)} de {queue.length}
              </p>
            </div>
          </div>
        </div>

        {renderBody(current!)}

        {/* Dato cultural */}
        <div className="mt-4 p-3.5 bg-[#fff1ed] border border-[#ffe2db] rounded-2xl flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#9a4600]/10 flex items-center justify-center text-[#9a4600] shrink-0">
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              lightbulb
            </span>
          </div>
          <p className="text-xs text-[#454652]">
            <strong className="text-[#3b0900] font-semibold">Dato Cultural:</strong> En Aimara, <span className="text-[#0e1c7b] font-bold">Kamisaraki</span> se responde habitualmente con <em className="text-[#9a4600] font-medium">Walikistwa</em> (Estoy bien). En Quechua, <span className="text-[#0e1c7b] font-bold">Allillanchu</span> se responde con <em className="text-[#9a4600] font-medium">ArÃ­, allinmi</em>.
          </p>
        </div>
      </main>

      {/* FOOTER */}
      <footer className={`w-full border-t py-4 px-4 md:px-10 sticky bottom-0 z-30 transition-colors ${footerBg}`}>
        <div className="max-w-[1000px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 w-full sm:w-auto min-h-[40px]">
            {status === 'correct' && (
              <>
                <div className="w-10 h-10 rounded-full bg-[#91fb6e]/60 flex items-center justify-center text-[#083200] shrink-0">
                  <span className="material-symbols-outlined text-[24px]">verified</span>
                </div>
                <div>
                  <p className="font-bold text-sm text-[#083200] leading-tight">Â¡Allinmi! Correcto</p>
                  <p className="text-xs text-[#454652]">Â¡Sigue asÃ­!</p>
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
                  <p className="text-xs text-[#93000a]">{correctAnswerText(current!)}</p>
                </div>
              </>
            )}
            {status === 'idle' && (
              <p className="text-xs text-[#454652]">
                {current!.kind === 'match'
                  ? `Pares resueltos: ${matched.length} de ${(current as { words: Word[] }).words.length}`
                  : 'Elige una respuesta y pulsa comprobar.'}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {status === 'idle' && (
              <button
                onClick={handleSkip}
                className="hidden sm:inline-flex px-4 py-3 rounded-xl border border-[#c6c5d4] text-[#454652] text-xs font-semibold hover:bg-[#ffe9e4] transition-colors cursor-pointer"
                type="button"
              >
                Saltar
              </button>
            )}

            {/* Navigation Target: //footer//button[contains(., 'COMPROBAR')] */}
            <button
              onClick={showContinue ? handleContinuar : handleComprobar}
              disabled={!showContinue && !canCheck}
              className={`w-full sm:w-56 py-3.5 px-6 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 btn-3d transition-colors ${
                !showContinue && !canCheck
                  ? 'bg-[#e5e2e1] text-[#9a9a9a] cursor-not-allowed'
                  : status === 'wrong'
                  ? 'bg-[#ba1a1a] hover:bg-[#93000a] text-white cursor-pointer'
                  : 'bg-[#76de55] hover:bg-[#5cc23c] text-[#083200] shadow-duo-green cursor-pointer'
              }`}
              type="button"
            >
              <span>{showContinue ? 'CONTINUAR' : 'COMPROBAR'}</span>
              <span className="material-symbols-outlined font-bold text-[20px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
