import React, { useState } from 'react';
import { ScreenId, TransitionType } from '../types';
import { sounds } from '../utils/audio';

interface Props {
  onNavigate: (screen: ScreenId, transition?: TransitionType) => void;
}

export const EjercicioIlustracionScreen: React.FC<Props> = ({ onNavigate }) => {
  const [selectedCard, setSelectedCard] = useState<number>(1); // Card 1: Allqu selected by default

  const cards = [
    {
      id: 1,
      name: 'Allqu',
      desc: 'Perro andino',
      img: `${import.meta.env.BASE_URL}images/doggie.png`
    },
    {
      id: 2,
      name: 'Michi',
      desc: 'Gato andino',
      img: `${import.meta.env.BASE_URL}images/verde.png`
    },
    {
      id: 3,
      name: 'Wikuña',
      desc: 'Vicuña',
      img: `${import.meta.env.BASE_URL}images/pancita.png`
    },
    {
      id: 4,
      name: 'Kuntur',
      desc: 'Cóndor',
      img: `${import.meta.env.BASE_URL}images/mari.png`
    }
  ];

  const handleCardClick = (id: number) => {
    sounds.playTap();
    setSelectedCard(id);
  };

  const handleComprobar = () => {
    sounds.playSuccess();
    onNavigate('ejercicio_emparejar', 'push');
  };

  return (
    <div className="bg-[#fff8f6] text-[#3b0900] min-h-screen flex flex-col font-body-md select-none antialiased">
      {/* Exercise Header */}
      <header className="w-full bg-white sticky top-0 z-30 shadow-sm border-b border-[#ffe2db]">
        <div className="max-w-[1040px] mx-auto px-4 md:px-10 h-16 flex items-center justify-between gap-4">
          {/* Navigation Target: //header//button[@aria-label='Cerrar lección'] */}
          <button
            aria-label="Cerrar lección"
            onClick={() => {
              sounds.playTap();
              onNavigate('mapa_quechua', 'push_back');
            }}
            className="w-10 h-10 flex items-center justify-center rounded-xl text-[#767683] hover:bg-[#ffe9e4] transition-colors cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>

          {/* Progress Bar (35%) */}
          <div className="flex-1 max-w-xl mx-2">
            <div className="w-full bg-[#ffe2db] rounded-full h-3.5 p-0.5 overflow-hidden flex items-center">
              <div
                className="bg-[#ff842c] h-full rounded-full transition-all duration-500 ease-out flex items-center justify-end pr-1"
                style={{ width: '35%' }}
              >
                <div className="w-1.5 h-1.5 bg-white/70 rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-4 shrink-0">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ffdad6]/50 text-[#ba1a1a]">
              <span className="material-symbols-outlined text-[20px] text-[#ba1a1a] font-variation-fill">favorite</span>
              <span className="font-bold text-sm">5</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ffe9e4] text-[#2a3691]">
              <span className="material-symbols-outlined text-[20px] text-[#2a3691] font-variation-fill">diamond</span>
              <span className="font-bold text-sm">120</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Exercise Content Canvas */}
      <main className="flex-1 w-full max-w-[1040px] mx-auto px-4 md:px-10 py-6 flex flex-col justify-between">
        <div className="mt-2 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#dfe0ff] text-[#0e1c7b] font-bold text-xs uppercase tracking-wide">
              Vocabulario Andino
            </span>
            <span className="text-[#454652] text-xs">Quechua Chanka • Nivel Básico</span>
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            <button
              aria-label="Escuchar pronunciación de Allqu"
              onClick={() => sounds.playVoice('Allqu')}
              className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[#2a3691] text-white flex items-center justify-center shrink-0 hover:bg-[#0e1c7b] transition-colors cursor-pointer group shadow-duo-blue"
              type="button"
            >
              <span className="material-symbols-outlined text-[28px] md:text-[32px] group-hover:scale-110 transition-transform">
                volume_up
              </span>
            </button>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-[#3b0900]">
              ¿Cuál de estos es <span className="text-[#0e1c7b] font-bold">&ldquo;Allqu&rdquo;</span>?
            </h1>
          </div>
          <p className="text-[#454652] text-sm mt-1 ml-0 md:ml-16">
            Selecciona la ilustración correcta para la palabra en Quechua Chanka.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 md:gap-5 my-auto py-2">
          {cards.map((card) => {
            const isSelected = selectedCard === card.id;
            return (
              <div
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                className={`relative rounded-2xl p-3 md:p-4 flex flex-col items-center justify-between cursor-pointer transition-all ${
                  isSelected
                    ? 'border-2 border-[#ff842c] bg-white shadow-duo-orange'
                    : 'border-2 border-[#c6c5d4] bg-white hover:border-[#767683] shadow-duo-neutral'
                }`}
              >
                <div className="w-full flex justify-between items-center mb-1">
                  <span
                    className={`w-6 h-6 rounded-lg font-bold text-xs flex items-center justify-center ${
                      isSelected ? 'bg-[#ffdbc9] text-[#321200]' : 'bg-[#ffe2db] text-[#454652]'
                    }`}
                  >
                    {card.id}
                  </span>
                  {isSelected ? (
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#ff842c] text-white">
                      <span className="material-symbols-outlined text-[16px] font-variation-fill">check</span>
                    </span>
                  ) : (
                    <span className="w-6 h-6 rounded-full border-2 border-[#c6c5d4]"></span>
                  )}
                </div>

                <div className="w-full aspect-square rounded-xl bg-[#fff1ed] overflow-hidden flex items-center justify-center p-2 my-1 border border-[#ffe2db]">
                  <img
                    className="w-full h-full object-contain hover:scale-105 transition-transform duration-200"
                    alt={card.name}
                    src={card.img}
                  />
                </div>

                <div className="text-center mt-2 w-full">
                  <h2 className={`font-display text-lg font-bold ${isSelected ? 'text-[#ff842c]' : 'text-[#3b0900]'}`}>
                    {card.name}
                  </h2>
                  <span className="text-xs text-[#454652] block">{card.desc}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dato Yachay Banner */}
        <div className="w-full bg-white border border-[#ffe2db] rounded-2xl p-3.5 md:p-4 mt-3 mb-2 flex items-center gap-3.5 md:gap-5 shadow-sm">
          <div className="relative w-16 h-16 md:w-20 md:h-20 shrink-0 flex items-center justify-center">
            <img
              alt="Kusi Alpaca"
              className="w-full h-full object-contain drop-shadow-md"
              src={`${import.meta.env.BASE_URL}images/pancita.png`}
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1.5 text-[#9a4600] font-bold text-xs">
              <span className="material-symbols-outlined text-[18px]">lightbulb</span>
              <span>DATO YACHAY</span>
            </div>
            <p className="text-sm text-[#3b0900] mt-0.5">
              &ldquo;Los perros pastores andinos protegen al ganado en las alturas y son compañeros vitales en los valles del Cusco y Ayacucho.&rdquo;
            </p>
          </div>
        </div>
      </main>

      {/* Sticky Bottom Task Action Bar */}
      <footer className="w-full bg-white border-t border-[#ffe2db] p-4 sticky bottom-0 z-30">
        <div className="max-w-[1040px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="hidden sm:flex items-center gap-2 text-[#454652] text-xs">
            <kbd className="px-2 py-1 rounded bg-[#ffe2db] border border-[#c6c5d4] font-mono text-xs">Enter</kbd>
            <span>para verificar</span>
          </div>

          {/* Navigation Target: //footer//button[contains(., 'Comprobar respuesta')] */}
          <button
            onClick={handleComprobar}
            className="w-full sm:w-auto sm:min-w-[260px] h-14 bg-[#ff842c] hover:bg-[#e06c15] text-white rounded-2xl font-display font-bold text-base flex items-center justify-center gap-2 cursor-pointer shadow-duo-orange btn-3d"
            type="button"
          >
            <span>Comprobar respuesta</span>
            <span className="material-symbols-outlined text-[24px]">arrow_forward</span>
          </button>
        </div>
      </footer>
    </div>
  );
};
