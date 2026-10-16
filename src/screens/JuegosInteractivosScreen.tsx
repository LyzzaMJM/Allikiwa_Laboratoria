import React, { useState } from 'react';
import { ScreenId, TransitionType } from '../types';
import { sounds } from '../utils/audio';

interface Props {
  onNavigate: (screen: ScreenId, transition?: TransitionType) => void;
}

export const JuegosInteractivosScreen: React.FC<Props> = ({ onNavigate }) => {
  const initialAvailable = ['ñañay', 'tuta', 'allillanchu'];
  const [selectedTokens, setSelectedTokens] = useState<string[]>([
    'Allin',
    'punchaw',
    'wawqillay',
    'ayllunchikpi'
  ]);
  const [bankTokens, setBankTokens] = useState<string[]>(initialAvailable);

  const handleRemoveToken = (token: string, index: number) => {
    sounds.playTap();
    const nextSelected = [...selectedTokens];
    nextSelected.splice(index, 1);
    setSelectedTokens(nextSelected);
    setBankTokens([...bankTokens, token]);
  };

  const handleAddToken = (token: string, index: number) => {
    sounds.playTap();
    const nextBank = [...bankTokens];
    nextBank.splice(index, 1);
    setBankTokens(nextBank);
    setSelectedTokens([...selectedTokens, token]);
  };

  const handleReset = () => {
    sounds.playTap();
    setSelectedTokens([]);
    setBankTokens(['Allin', 'punchaw', 'wawqillay', 'ayllunchikpi', 'ñañay', 'tuta', 'allillanchu']);
  };

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

          {/* Progress Bar (60%) */}
          <div className="flex-1 max-w-xl mx-2">
            <div className="w-full bg-[#ffe2db] rounded-full h-3.5 p-0.5 overflow-hidden">
              <div
                className="bg-[#3ca21d] h-full rounded-full transition-all duration-500 shadow-sm"
                style={{ width: '60%' }}
              ></div>
            </div>
          </div>

          {/* Stats: Streak & Hearts */}
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
              <span>4</span>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 w-full max-w-[1000px] mx-auto px-4 md:px-8 py-6 flex flex-col justify-between">
        {/* Prompt Header */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#ebedfa] text-[#2a3691] font-bold text-xs uppercase tracking-wider">
                FORMAR LA ORACIÓN
              </span>
              <span className="px-3 py-1 rounded-full bg-[#fff3e8] text-[#f27a21] font-bold text-xs flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">menu_book</span> Quechua Chanka
              </span>
            </div>
            <span className="text-xs font-semibold text-[#767683] flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-[#2a3691]">lightbulb</span>
              Consejo: El verbo siempre va al final
            </span>
          </div>

          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#0e1c7b]">
            Traduce la siguiente oración al Quechua
          </h1>
        </div>

        {/* Source Card with Kusi mascot */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-[#ffe2db] shadow-sm mb-6 flex flex-col sm:flex-row items-center gap-5">
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

          <div className="flex-1 text-center sm:text-left">
            <span className="text-xs font-bold text-[#767683] uppercase tracking-wider block mb-1">ESPAÑOL</span>
            <div className="flex items-center justify-center sm:justify-between gap-3">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-[#3b0900]">
                &ldquo;Buenos días, hermano de mi comunidad&rdquo;
              </h2>
              <button
                onClick={() => sounds.playVoice('Buenos días, hermano de mi comunidad')}
                className="w-10 h-10 rounded-2xl bg-[#ebedfa] text-[#2a3691] hover:bg-[#2a3691] hover:text-white transition-colors flex items-center justify-center shrink-0 cursor-pointer"
                title="Escuchar audio"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">volume_up</span>
              </button>
            </div>
            <p className="text-xs text-[#767683] mt-1 flex items-center justify-center sm:justify-start gap-1">
              <span className="material-symbols-outlined text-xs text-[#f27a21]">explore</span>
              Contexto: Saludo andino cordial entre miembros del ayllu.
            </p>
          </div>
        </div>

        {/* Selected Answer Slot */}
        <div className="bg-white rounded-3xl p-5 border-2 border-[#ffe2db] min-h-[90px] mb-4 flex flex-wrap items-center gap-3 shadow-inner">
          {selectedTokens.length === 0 ? (
            <span className="text-sm font-semibold text-[#c6c5d4] italic">
              Toca las palabras del banco inferior para construir la oración...
            </span>
          ) : (
            selectedTokens.map((tok, idx) => (
              <button
                key={`${tok}-${idx}`}
                onClick={() => handleRemoveToken(tok, idx)}
                className="px-4 py-2.5 rounded-2xl bg-white border-2 border-[#d6d1c4] text-[#0e1c7b] font-chubby font-bold text-base shadow-duo-neutral btn-3d flex items-center gap-2 cursor-pointer hover:border-[#b43f1d]"
              >
                <span>{tok}</span>
                <span className="material-symbols-outlined text-[16px] text-[#767683]">close</span>
              </button>
            ))
          )}
        </div>

        {/* Word Bank */}
        <div className="bg-[#fff1ed]/70 rounded-3xl p-5 border border-[#ffe2db] mb-8">
          <div className="flex justify-between items-center mb-3 text-xs font-bold text-[#767683]">
            <span>BANCO DE PALABRAS (TOCA PARA AGREGAR)</span>
            <button onClick={handleReset} className="hover:text-[#f27a21] flex items-center gap-1 cursor-pointer">
              <span className="material-symbols-outlined text-[14px]">refresh</span> Reiniciar fichas
            </button>
          </div>

          <div className="flex flex-wrap gap-3">
            {/* Disabled placeholders for already selected tokens */}
            {['wawqillay', 'punchaw', 'Allin', 'ayllunchikpi'].map((tok) => {
              const isSelected = selectedTokens.includes(tok);
              return isSelected ? (
                <div
                  key={`slot-${tok}`}
                  className="px-4 py-2.5 rounded-2xl bg-[#ffe9e4]/60 text-[#c6c5d4] font-chubby font-bold text-base border border-dashed border-[#ffe2db]"
                >
                  {tok}
                </div>
              ) : null;
            })}

            {/* Interactive available tokens */}
            {bankTokens.map((tok, idx) => (
              <button
                key={`bank-${tok}-${idx}`}
                onClick={() => handleAddToken(tok, idx)}
                className="px-5 py-2.5 rounded-2xl bg-white border-2 border-[#d6d1c4] text-[#0e1c7b] font-chubby font-bold text-base shadow-duo-neutral btn-3d cursor-pointer hover:border-[#f27a21]"
              >
                {tok}
              </button>
            ))}
          </div>
        </div>

        {/* OTRAS DINÁMICAS EN ESTA LECCIÓN */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-display text-base font-bold text-[#0e1c7b] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#f27a21]">sports_esports</span>
              Otras dinámicas en esta lección
            </h3>
            <span className="text-xs font-bold text-[#767683]">3 Modos Extra</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Dinámica 1: Emparejar pares */}
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

            {/* Dinámica 2: Elegir la ilustración */}
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

            {/* Dinámica 3: Dictado y fonética */}
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

      {/* FOOTER SUCCESS CELEBRATION BAR */}
      <footer className="w-full bg-[#e9f7e5] border-t-2 border-[#3ca21d]/30 p-4 sm:p-5 sticky bottom-0 z-30 shadow-lg">
        <div className="max-w-[1000px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="w-12 h-12 rounded-full bg-[#3ca21d] text-white flex items-center justify-center shrink-0 shadow-md">
              <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                check
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-chubby text-lg sm:text-xl font-bold text-[#104b00]">¡Excelente! Allinmi wawa</h3>
                <span className="text-xs font-black px-2 py-0.5 rounded-full bg-white text-[#2d7d15] shadow-xs">
                  +15 EXP
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#125200] font-medium">
                <strong>Explicación:</strong> &ldquo;wawqillay&rdquo; lleva el sufijo posesivo <em>-llay</em> con afecto cariñoso (&ldquo;mi querido hermano&rdquo;).
              </p>
            </div>
          </div>

          {/* Navigation XPath: //footer//button[contains(., 'CONTINUAR')] */}
          <button
            onClick={() => {
              sounds.playSuccess();
              onNavigate('mapa_quechua', 'push_back');
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#3ca21d] hover:bg-[#2d7d15] text-white font-chubby font-bold text-base sm:text-lg shadow-duo-green btn-3d flex items-center justify-center gap-2 cursor-pointer shrink-0"
            type="button"
          >
            <span>CONTINUAR</span>
            <span className="material-symbols-outlined text-[22px]">arrow_forward</span>
          </button>
        </div>
      </footer>
    </div>
  );
};
