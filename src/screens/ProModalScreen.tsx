import React from 'react';
import { ScreenId, TransitionType } from '../types';
import { sounds } from '../utils/audio';

interface Props {
  onNavigate: (screen: ScreenId, transition?: TransitionType) => void;
}

export const ProModalScreen: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="relative min-h-screen bg-[#fff8f6] text-[#3b0900] antialiased overflow-x-hidden font-body-md flex items-center justify-center p-3 sm:p-5 md:p-6">
      {/* BACKGROUND SIMULATED TRANSLATOR CANVAS (BLURRED) */}
      <div className="fixed inset-0 filter blur-md select-none pointer-events-none opacity-40 bg-[#fbf7ee] flex flex-col justify-between">
        <header className="w-full bg-white shadow-sm border-b border-[#e5e2da] h-16 px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#f27a21]"></div>
            <span className="font-bold text-xl text-[#f27a21]">Allikiwa</span>
          </div>
          <div className="flex gap-4 text-sm font-bold text-[#7a6f66]">
            <span>Traductor</span>
            <span>Aprender</span>
          </div>
        </header>
        <div className="p-8 max-w-4xl mx-auto w-full">
          <div className="h-64 bg-white rounded-3xl border-2 border-[#e5e2da] shadow-sm"></div>
        </div>
        <footer className="h-14 bg-white border-t border-[#e5e2da]"></footer>
      </div>

      {/* BACKDROP OVERLAY */}
      <div className="fixed inset-0 z-40 bg-[#3b0900]/45 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-y-auto">
        {/* MODAL PRINCIPAL: Allikiwa Yachaq Pro */}
        <div
          aria-modal="true"
          className="relative w-full max-w-[620px] bg-white rounded-3xl shadow-2xl border-4 border-[#ffe9e4] overflow-hidden my-auto transform transition-all duration-300"
          role="dialog"
        >
          {/* Ribete Chumpi Andino Superior */}
          <div className="w-full h-2.5 chumpi-border"></div>

          {/* Botón de Cerrar Flotante */}
          <button
            aria-label="Cerrar modal"
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-[#fff1ed] hover:bg-[#ffe9e4] text-[#454652] hover:text-[#3b0900] flex items-center justify-center transition-all duration-150 active:scale-95 shadow-sm cursor-pointer"
            onClick={() => {
              sounds.playTap();
              onNavigate('traductor', 'push_back');
            }}
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>

          <div className="p-5 sm:p-7 md:p-8 flex flex-col items-center text-center">
            {/* Cabecera de Marca */}
            <div className="flex items-center gap-2 mb-2">
              <img
                alt="Allikiwa Icon"
                className="w-8 h-8 rounded-lg object-contain"
                src={`${import.meta.env.BASE_URL}images/logo.png`}
              />
              <span className="font-display text-xl sm:text-2xl font-extrabold text-[#f27a21] tracking-tight">
                Allikiwa
              </span>
              <span className="bg-[#2a3691] text-white text-[11px] tracking-wider px-2.5 py-0.5 rounded-full font-black uppercase shadow-xs flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px] text-amber-300" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
                YACHAQ PRO
              </span>
            </div>

            {/* Mascota Protagonista */}
            <div className="relative my-2 sm:my-3">
              <div className="absolute inset-0 bg-[#ffdbc9]/50 rounded-full blur-2xl transform scale-110 -z-10"></div>
              <div className="absolute -top-1 -left-4 sm:-left-6 text-amber-400 animate-pulse">
                <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  arrow_back_ios_new
                </span>
              </div>
              <div className="absolute top-2 -right-3 sm:-right-5 text-amber-400 animate-pulse">
                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  hotel_class
                </span>
              </div>
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-10 filter drop-shadow-md">
                <div className="bg-amber-400 text-[#104b00] px-3 py-1 rounded-full border-2 border-amber-300 flex items-center gap-1 shadow-sm text-xs font-extrabold whitespace-nowrap">
                  <span className="material-symbols-outlined text-[16px] text-amber-900" style={{ fontVariationSettings: "'FILL' 1" }}>
                    military_tech
                  </span>
                  <span className="text-[#3b0900] tracking-wide">YACHAQ SAPAQ</span>
                </div>
              </div>

              <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-3xl p-1 bg-[#e8eeff] border-2 border-[#c8d9ff] shadow-md floating-anim flex items-center justify-center overflow-hidden">
                <img
                  alt="Pancita la mascota oficial de Allikiwa"
                  className="w-full h-full object-contain"
                  src={`${import.meta.env.BASE_URL}images/pancita.png`}
                />
              </div>
            </div>

            {/* Título Principal */}
            <h2 className="font-display text-2xl sm:text-3xl font-black text-[#0e1c7b] tracking-tight leading-tight mt-1 mb-1.5">
              ¡Aprende y traduce sin límites!
            </h2>
            <p className="text-sm sm:text-base text-[#454652] max-w-[480px] mb-5">
              Supera las 5 traducciones mensuales. Desbloquea sabiduría infinita en{' '}
              <strong className="text-[#0e1c7b] font-semibold">Quechua Chanka</strong> y{' '}
              <strong className="text-[#083200] font-semibold">Aimara</strong> con pronunciación de hablantes nativos.
            </p>

            {/* Comparativa Duolingo Max Style */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5 text-left">
              {/* Plan Gratuito */}
              <div className="bg-[#fff1ed]/70 rounded-2xl p-4 border border-[#c6c5d4]/50 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[#454652] uppercase tracking-wider">Plan Gratuito</span>
                    <span className="text-xs bg-[#ffe9e4] text-[#454652] px-2 py-0.5 rounded-full font-medium">Básico</span>
                  </div>
                  <p className="text-xl sm:text-2xl font-bold text-[#3b0900] mb-2">
                    S/ 0 <span className="text-xs font-normal text-[#454652]">/mes</span>
                  </p>
                  <ul className="space-y-2 text-[#454652] text-xs sm:text-sm">
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px]">check</span>
                      <span>5 traducciones gratis al mes</span>
                    </li>
                    <li className="flex items-center gap-2 text-[#454652]/80">
                      <span className="material-symbols-outlined text-[18px] text-[#767683]">volume_down</span>
                      <span>Audio estándar sintetizado</span>
                    </li>
                    <li className="flex items-center gap-2 text-[#454652]/70">
                      <span className="material-symbols-outlined text-[18px] text-[#767683]">campaign</span>
                      <span>Anuncios comunitarios breves</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-4 pt-2 border-t border-[#c6c5d4]/30 text-center">
                  <span className="text-xs text-[#454652] font-medium">Tu estado actual</span>
                </div>
              </div>

              {/* Plan Allikiwa Pro */}
              <div className="relative bg-gradient-to-b from-[#dfe0ff]/30 to-white rounded-2xl p-4 border-2 border-[#0e1c7b] shadow-md flex flex-col justify-between overflow-hidden">
                <div className="absolute -right-7 top-4 bg-[#f27a21] text-white text-[10px] font-black uppercase py-0.5 px-8 rotate-45 shadow-sm">
                  MÁS POPULAR
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[#0e1c7b] uppercase tracking-wider flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px] text-amber-500" style={{ fontVariationSettings: "'FILL' 1" }}>
                        stars
                      </span>
                      Allikiwa Pro
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-2xl sm:text-3xl font-extrabold text-[#0e1c7b]">S/ 20</span>
                    <span className="text-xs font-medium text-[#454652]">al mes</span>
                  </div>
                  <ul className="space-y-2 text-[#3b0900] text-xs sm:text-sm font-medium">
                    <li className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-[18px] text-[#3ca21d] shrink-0 mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
                        check_circle
                      </span>
                      <span><strong>Traducciones infinitas</strong> de texto y voz</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-[18px] text-[#3ca21d] shrink-0 mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
                        check_circle
                      </span>
                      <span>Pronunciación nativa en <strong>alta fidelidad + modo lento</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-[18px] text-[#3ca21d] shrink-0 mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
                        check_circle
                      </span>
                      <span>Todas las variantes (Chanka, Aimara y Collao)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-[18px] text-[#3ca21d] shrink-0 mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
                        volunteer_activism
                      </span>
                      <span className="text-[#9a4600] font-semibold">Apoyo directo a comunidades originarias</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-3 pt-2 border-t border-[#0e1c7b]/20 flex items-center justify-between text-xs">
                  <span className="text-[#0e1c7b] font-bold">Sin contratos</span>
                  <span className="text-[#9a4600] font-semibold">Cancela cuando quieras</span>
                </div>
              </div>
            </div>

            {/* Resumen de Pago */}
            <div className="w-full bg-[#ffe9e4] rounded-xl p-3 mb-4 flex items-center justify-between border border-[#ffdbc9]">
              <div className="flex items-center gap-3 text-left">
                <div className="w-10 h-10 rounded-full bg-[#ff842c]/20 text-[#9a4600] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[24px]">verified</span>
                </div>
                <div>
                  <p className="font-bold text-sm text-[#3b0900]">Membresía Mensual Sapaq</p>
                  <p className="text-xs text-[#454652]">Facturación recurrente de S/ 20. Cancela con 1 clic.</p>
                </div>
              </div>
              <span className="font-headline-sm text-headline-sm font-extrabold text-[#f27a21] whitespace-nowrap">
                S/ 20/mes
              </span>
            </div>

            {/* Botón CTA: Navigation XPath requires //a[@href='#activar-pro'] */}
            <a
              className="w-full rounded-2xl py-4 px-6 text-white font-headline-sm text-headline-sm font-black tracking-wide flex items-center justify-center gap-2 mb-3 cursor-pointer decoration-0 bg-[#f27a21] hover:bg-[#e06c15] shadow-duo-orange btn-3d"
              href="#activar-pro"
              onClick={(e) => {
                e.preventDefault();
                sounds.playSuccess();
                onNavigate('perfil_dinamico', 'push');
              }}
            >
              <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                bolt
              </span>
              <span>¡OBTENER ALLIKIWA PRO!</span>
            </a>

            {/* Botón de Salida: Navigation XPath requires //button[contains(., 'Continuar con 5 traducciones gratis')] */}
            <button
              className="text-sm font-bold text-[#454652] hover:text-[#0e1c7b] transition-colors py-1.5 px-4 rounded-lg cursor-pointer"
              type="button"
              onClick={() => {
                sounds.playTap();
                onNavigate('traductor', 'push_back');
              }}
            >
              Continuar con 5 traducciones gratis cada mes
            </button>

            {/* Garantía */}
            <div className="flex items-center justify-center gap-4 mt-3 pt-3 border-t border-[#ffe9e4] w-full text-xs text-[#454652]/80">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px]">lock</span>
                Pago seguro con Yape, Plin o Tarjeta
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px]">favorite</span>
                Yachay Comunitario Garantizado
              </span>
            </div>
          </div>

          <div className="w-full h-1.5 bg-[#ffe9e4]"></div>
        </div>
      </div>
    </div>
  );
};
