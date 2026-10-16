import React, { useState } from 'react';
import { ScreenId, TransitionType } from '../types';
import { sounds } from '../utils/audio';

interface Props {
  onNavigate: (screen: ScreenId, transition?: TransitionType) => void;
}

export const EjercicioEmparejarScreen: React.FC<Props> = ({ onNavigate }) => {
  const [selectedLeft, setSelectedLeft] = useState<string | null>('Kamisaraki');
  const [selectedRight, setSelectedRight] = useState<string | null>('¿Cómo estás?');
  const [matchedPairs, setMatchedPairs] = useState<string[]>(['Tayka']);

  const leftItems = [
    { lang: 'AIMARA', text: 'Tayka', audioText: 'Tayka' },
    { lang: 'AIMARA', text: 'Kamisaraki', audioText: 'Kamisaraki' },
    { lang: 'QUECHUA', text: 'Allillanchu', audioText: 'Allillanchu' },
    { lang: 'QUECHUA', text: 'Urpi', audioText: 'Urpi' },
    { lang: 'QUECHUA & AIMARA', text: 'Inti', audioText: 'Inti' }
  ];

  const rightItems = [
    { text: '¿Estás bien?', pair: 'Allillanchu' },
    { text: 'Madre / Mamá', pair: 'Tayka' },
    { text: 'Sol / Luz solar', pair: 'Inti' },
    { text: '¿Cómo estás?', pair: 'Kamisaraki' },
    { text: 'Paloma / Mensajera', pair: 'Urpi' }
  ];

  const handleLeftClick = (item: { text: string; audioText: string }) => {
    sounds.playTap();
    sounds.playVoice(item.audioText);
    if (matchedPairs.includes(item.text)) return;
    setSelectedLeft(item.text);
  };

  const handleRightClick = (text: string) => {
    sounds.playTap();
    setSelectedRight(text);
  };

  const handleComprobar = () => {
    sounds.playSuccess();
    if (selectedLeft === 'Kamisaraki' && selectedRight === '¿Cómo estás?') {
      setMatchedPairs([...matchedPairs, 'Kamisaraki']);
    }
    onNavigate('ejercicio_dictado', 'push');
  };

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

          {/* Progress Bar (60%) */}
          <div className="flex-1 max-w-xl mx-2">
            <div className="w-full bg-[#ffe9e4] h-4 rounded-full overflow-hidden p-0.5">
              <div
                className="bg-[#76de55] h-full rounded-full transition-all duration-500 relative flex items-center justify-end pr-1"
                style={{ width: '60%' }}
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
              <span className="font-bold text-sm text-[#ba1a1a]">4</span>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CANVAS */}
      <main className="flex-1 w-full max-w-[1000px] mx-auto px-4 md:px-10 py-6 flex flex-col justify-between">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#ffe9e4] rounded-full text-[#9a4600] text-xs mb-1.5 font-bold uppercase tracking-wide">
              <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                translate
              </span>
              Vocabulario Chanka & Aimara
            </div>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-[#0e1c7b]">
              Toca los pares que corresponden
            </h1>
            <p className="text-xs text-[#454652]">
              Asocia cada palabra en Quechua o Aimara con su significado correspondiente.
            </p>
          </div>

          {/* Mascot Mini Card */}
          <div className="flex items-center gap-3 bg-white border border-[#ffe9e4] p-2.5 pr-4 rounded-2xl shadow-sm self-start md:self-auto">
            <div className="w-12 h-12 shrink-0">
              <img
                alt="Kusi Alpaca"
                className="w-full h-full object-contain filter drop-shadow-sm"
                src="/images/pancita.png"
              />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-bold text-sm text-[#3b0900]">Kusi</span>
                <span className="material-symbols-outlined text-[#f27a21] text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
              </div>
              <p className="text-xs text-[#454652]">¡Allinmi kanki! Llevas 1 par resuelto.</p>
            </div>
          </div>
        </div>

        {/* PAIRS MATCHING GRID */}
        <section className="grid grid-cols-2 gap-3 md:gap-4 my-auto py-2">
          {/* Left Column */}
          <div className="flex flex-col gap-3">
            {leftItems.map((item) => {
              const isMatched = matchedPairs.includes(item.text);
              const isSelected = selectedLeft === item.text && !isMatched;

              return (
                <button
                  key={item.text}
                  onClick={() => handleLeftClick(item)}
                  type="button"
                  className={`w-full min-h-[72px] p-3 md:p-4 rounded-2xl text-left flex items-center justify-between transition-all cursor-pointer ${
                    isMatched
                      ? 'bg-[#91fb6e]/30 border-2 border-[#76de55] opacity-90 shadow-duo-green'
                      : isSelected
                      ? 'bg-[#dfe0ff]/40 border-2 border-[#0e1c7b] shadow-duo-blue'
                      : 'bg-white border-2 border-[#c6c5d4]/60 hover:border-[#0e1c7b]/40 shadow-duo-neutral'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className={`text-[10px] font-bold tracking-wider ${isMatched ? 'text-[#083200]' : isSelected ? 'text-[#0e1c7b]' : 'text-[#454652]'}`}>
                      {item.lang}
                    </span>
                    <span className={`font-display text-base sm:text-lg font-bold ${isMatched ? 'text-[#083200]' : isSelected ? 'text-[#0e1c7b]' : 'text-[#3b0900]'}`}>
                      {item.text}
                    </span>
                  </div>

                  {isMatched ? (
                    <div className="w-7 h-7 rounded-full bg-[#91fb6e] flex items-center justify-center text-[#042100] shrink-0 ml-2">
                      <span className="material-symbols-outlined text-[18px] font-bold">check</span>
                    </div>
                  ) : (
                    <span className={`material-symbols-outlined text-[20px] ${isSelected ? 'text-[#0e1c7b]' : 'text-[#c6c5d4]'}`} style={{ fontVariationSettings: isSelected ? "'FILL' 1" : undefined }}>
                      volume_up
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-3">
            {rightItems.map((item) => {
              const isMatched = matchedPairs.includes(item.pair);
              const isSelected = selectedRight === item.text && !isMatched;

              return (
                <button
                  key={item.text}
                  onClick={() => handleRightClick(item.text)}
                  type="button"
                  className={`w-full min-h-[72px] p-3 md:p-4 rounded-2xl text-left flex items-center justify-between transition-all cursor-pointer ${
                    isMatched
                      ? 'bg-[#91fb6e]/30 border-2 border-[#76de55] opacity-90 shadow-duo-green'
                      : isSelected
                      ? 'bg-white border-2 border-[#2a3691] shadow-duo-blue'
                      : 'bg-white border-2 border-[#c6c5d4]/60 hover:border-[#0e1c7b]/40 shadow-duo-neutral'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[#454652] font-medium">ESPAÑOL</span>
                    <span className={`font-display text-sm sm:text-base font-semibold ${isMatched ? 'text-[#083200] font-bold' : isSelected ? 'text-[#2a3691] font-bold' : 'text-[#3b0900]'}`}>
                      {item.text}
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

        {/* Cultural Tip */}
        <div className="mt-4 p-3.5 bg-[#fff1ed] border border-[#ffe2db] rounded-2xl flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#9a4600]/10 flex items-center justify-center text-[#9a4600] shrink-0">
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              lightbulb
            </span>
          </div>
          <p className="text-xs text-[#454652]">
            <strong className="text-[#3b0900] font-semibold">Dato Cultural:</strong> En Aimara, <span className="text-[#0e1c7b] font-bold">Kamisaraki</span> se responde habitualmente con <em className="text-[#9a4600] font-medium">Walikistwa</em> (Estoy bien).
          </p>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="w-full bg-white border-t border-[#ffe2db] py-4 px-4 md:px-10 sticky bottom-0 z-30">
        <div className="max-w-[1000px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="w-10 h-10 rounded-full bg-[#91fb6e]/50 flex items-center justify-center text-[#083200] shrink-0">
              <span className="material-symbols-outlined text-[24px]">verified</span>
            </div>
            <div>
              <p className="font-bold text-sm text-[#083200] leading-tight">¡Pares sincronizados!</p>
              <p className="text-xs text-[#454652]">Selecciona tu siguiente correspondencia o comprueba.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                sounds.playTap();
                onNavigate('ejercicio_dictado', 'push');
              }}
              className="hidden sm:inline-flex px-4 py-3 rounded-xl border border-[#c6c5d4] text-[#454652] text-xs font-semibold hover:bg-[#ffe9e4] transition-colors cursor-pointer"
              type="button"
            >
              Saltar
            </button>

            {/* Navigation Target: //footer//button[contains(., 'COMPROBAR')] */}
            <button
              onClick={handleComprobar}
              className="w-full sm:w-56 py-3.5 px-6 rounded-2xl bg-[#76de55] hover:bg-[#5cc23c] text-[#083200] font-bold text-sm flex items-center justify-center gap-2 shadow-duo-green btn-3d cursor-pointer"
              type="button"
            >
              <span>COMPROBAR</span>
              <span className="material-symbols-outlined font-bold text-[20px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
