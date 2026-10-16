import React from 'react';
import { ScreenId, TransitionType } from '../types';
import { sounds } from '../utils/audio';

interface Props {
  onNavigate: (screen: ScreenId, transition?: TransitionType) => void;
}

export const RutaAimaraScreen: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="bg-[#fff8f6] text-[#3b0900] antialiased min-h-screen flex flex-col font-body-md select-none">
      {/* TOP APP BAR */}
      <header className="bg-white border-b border-[#ffe9e4] shadow-sm sticky top-0 z-40">
        <div className="flex justify-between items-center w-full px-4 md:px-10 max-w-[1200px] mx-auto h-16">
          <div className="flex items-center gap-3">
            <a
              className="flex items-center gap-2 group cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                sounds.playTap();
                onNavigate('traductor', 'push_back');
              }}
              href="#traductor"
            >
              <img
                alt="Allikiwa Isotipo oficial"
                className="w-10 h-10 object-contain rounded-full shadow-sm group-hover:scale-105 transition-transform"
                src={`${import.meta.env.BASE_URL}images/logo.png`}
              />
              <span className="font-headline-md text-headline-md font-bold text-[#f27a21] tracking-tight">
                Allikiwa
              </span>
            </a>

            {/* Navigation Target: //nav//a[contains(., 'Traductor')] */}
            <nav className="hidden md:flex items-center gap-6 ml-6">
              <a
                className="text-[#454652] font-semibold text-sm hover:text-[#0e1c7b] transition-colors pb-1 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  sounds.playTap();
                  onNavigate('traductor', 'push_back');
                }}
                href="#traductor"
              >
                Traductor
              </a>
              <a
                className="border-b-2 border-[#0e1c7b] text-[#0e1c7b] font-bold text-sm pb-1 cursor-pointer"
                href="#aprender"
              >
                Aprender
              </a>
            </nav>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ffe9e4] border border-[#ffdbd1]">
              <span className="material-symbols-outlined text-[#9a4600] text-lg font-variation-fill">
                local_fire_department
              </span>
              <span className="font-bold text-sm text-[#632b00]">14</span>
              <span className="hidden lg:inline text-xs text-[#9a4600]">días</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#fff1ed] border border-[#0e1c7b]/10">
              <span className="material-symbols-outlined text-[#0e1c7b] text-lg font-variation-fill">diamond</span>
              <span className="font-bold text-sm text-[#0e1c7b]">480</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#fff1ed] border border-[#ba1a1a]/15">
              <span className="material-symbols-outlined text-[#ba1a1a] text-lg font-variation-fill">favorite</span>
              <span className="font-bold text-sm text-[#ba1a1a]">5</span>
            </div>

            {/* Navigation Target: //header//button[contains(., 'Perfil')] */}
            <button
              onClick={() => {
                sounds.playTap();
                onNavigate('perfil_dinamico', 'push');
              }}
              className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full hover:bg-[#ffe9e4] transition-colors cursor-pointer"
              type="button"
            >
              <span className="hidden sm:inline font-bold text-sm text-[#0e1c7b]">Perfil</span>
              <div className="w-8 h-8 rounded-full bg-[#dfe0ff] border-2 border-[#0e1c7b] flex items-center justify-center overflow-hidden">
                <span className="material-symbols-outlined text-[#0e1c7b] text-sm font-bold">person</span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* LANGUAGE SELECTOR BAR */}
      <section className="bg-[#fff1ed] border-b border-[#ffe9e4]">
        <div className="max-w-[1200px] mx-auto px-4 md:px-10 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#ff842c] animate-pulse"></span>
            <span className="text-xs text-[#454652] font-semibold">Aprendiendo ahora:</span>
            <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-white border border-[#c6c5d4] shadow-sm">
              <span className="material-symbols-outlined text-[#0e1c7b] text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
                water
              </span>
              <span className="font-bold text-sm text-[#0e1c7b]">Aimara Central (Puno / Lago Titicaca)</span>
            </div>
          </div>

          {/* Navigation Target: //button[contains(., 'Cambiar a Quechua Chanka')] */}
          <button
            onClick={() => {
              sounds.playTap();
              onNavigate('mapa_quechua', 'none');
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#0e1c7b]/20 bg-white text-[#0e1c7b] hover:bg-[#dfe0ff] transition-colors text-xs font-semibold cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-sm">swap_horiz</span>
            <span>Cambiar a Quechua Chanka (Ayacucho)</span>
          </button>
        </div>
      </section>

      {/* MAIN CANVAS */}
      <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 md:px-10 py-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT / CENTER (8 COLS) */}
        <div className="lg:col-span-8 flex flex-col items-center relative">
          {/* UNIDAD 1 */}
          <div className="w-full bg-white border border-[#c6c5d4]/60 rounded-2xl p-4 shadow-sm mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#76de55]/30 text-[#083200] flex items-center justify-center shadow-inner">
                <span className="material-symbols-outlined text-2xl font-bold font-variation-fill">check_circle</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#083200] px-2 py-0.5 rounded-md bg-[#76de55]/40">Completada 100%</span>
                  <span className="text-xs text-[#767683]">Nivel A1.1</span>
                </div>
                <h2 className="font-display text-lg font-bold text-[#0e1c7b] mt-0.5">
                  Unidad 1: Aruntanaka – Saludos y Respeto
                </h2>
                <p className="text-xs text-[#454652]">Normas de cortesía andina y saludos diarios en comunidades ribereñas de Puno.</p>
              </div>
            </div>
            <button className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-xl border border-[#c6c5d4] hover:bg-[#ffe9e4] text-[#454652] text-xs font-semibold">
              <span className="material-symbols-outlined text-sm">history_edu</span>
              Repasar
            </button>
          </div>

          {/* Sinuous Nodes Unidad 1 */}
          <div className="flex flex-col items-center gap-7 w-full max-w-md relative mb-12">
            <svg className="absolute top-6 bottom-6 left-1/2 -translate-x-1/2 w-48 h-[calc(100%-48px)] -z-0 pointer-events-none" preserveAspectRatio="none">
              <path d="M 96,20 Q 140,80 96,140 T 96,260 T 96,360" fill="none" stroke="#76de55" strokeDasharray="1 0" strokeLinecap="round" strokeWidth="8" />
            </svg>

            <div className="flex flex-col items-center z-10 -translate-x-6 cursor-pointer" onClick={() => sounds.playVoice('Kamisaraki')}>
              <div className="w-18 h-18 p-1 rounded-full bg-[#3ca21d] flex items-center justify-center shadow-duo-green relative">
                <div className="w-16 h-16 rounded-full bg-white flex flex-col items-center justify-center border-2 border-[#91fb6e] text-[#104b00]">
                  <span className="material-symbols-outlined text-2xl font-bold font-variation-fill">waving_hand</span>
                  <span className="text-[9px] font-bold">[PNG/JPG]</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#083200] text-white flex items-center justify-center text-xs shadow-md">
                  <span className="material-symbols-outlined text-xs">done_all</span>
                </div>
              </div>
              <div className="mt-2 bg-white px-3 py-1 rounded-full border border-[#c6c5d4]/60 shadow-sm text-center">
                <span className="text-xs font-bold text-[#3b0900]">1.1 Kamisaraki</span>
                <span className="text-[10px] text-[#767683] block">(¿Cómo estás?)</span>
              </div>
            </div>

            <div className="flex flex-col items-center z-10 translate-x-10 cursor-pointer" onClick={() => sounds.playVoice('Walikipuntwa')}>
              <div className="w-18 h-18 p-1 rounded-full bg-[#3ca21d] flex items-center justify-center shadow-duo-green relative">
                <div className="w-16 h-16 rounded-full bg-white flex flex-col items-center justify-center border-2 border-[#91fb6e] text-[#104b00]">
                  <span className="material-symbols-outlined text-2xl font-bold font-variation-fill">sentiment_very_satisfied</span>
                  <span className="text-[9px] font-bold">[PNG/JPG]</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#083200] text-white flex items-center justify-center text-xs shadow-md">
                  <span className="material-symbols-outlined text-xs">done_all</span>
                </div>
              </div>
              <div className="mt-2 bg-white px-3 py-1 rounded-full border border-[#c6c5d4]/60 shadow-sm text-center">
                <span className="text-xs font-bold text-[#3b0900]">1.2 Walikipuntwa</span>
                <span className="text-[10px] text-[#767683] block">(Muy bien, con salud)</span>
              </div>
            </div>

            <div className="flex flex-col items-center z-10 cursor-pointer -translate-x-2">
              <div className="w-16 h-16 rounded-2xl bg-[#ff842c] border-2 border-[#9a4600] shadow-lg flex flex-col items-center justify-center text-white relative">
                <span className="material-symbols-outlined text-3xl font-bold font-variation-fill">redeem</span>
                <span className="text-[8px] font-bold uppercase">[PNG/JPG]</span>
                <div className="absolute -top-2 px-2 py-0.5 rounded-full bg-[#0e1c7b] text-white text-[10px] font-bold">
                  ¡Reclamado!
                </div>
              </div>
              <span className="text-xs font-bold text-[#9a4600] mt-1">Cofre Yatiña (Sabiduría)</span>
            </div>
          </div>

          {/* UNIDAD 2 */}
          <div className="w-full bg-white border-2 border-[#ff842c]/40 rounded-2xl p-4 shadow-sm mb-8 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#ff842c] text-white flex items-center justify-center shadow-md">
                  <span className="material-symbols-outlined text-3xl font-variation-fill">diversity_1</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#ff842c] uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#ffdbc9]/50">
                      EN CURSO
                    </span>
                    <span className="text-xs font-bold text-[#0e1c7b]">Unidad 2</span>
                  </div>
                  <h2 className="font-display text-lg font-bold text-[#0e1c7b] mt-0.5">
                    Wila Masi – Familia y Comunidad Aymara
                  </h2>
                  <p className="text-xs text-[#454652]">Estructura del Ayllu, nombres de parentesco y veneración a los abuelos.</p>
                </div>
              </div>

              <div className="w-full sm:w-44 bg-[#ffe9e4] rounded-xl p-2.5 border border-[#ffdbd1] flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-xs font-bold text-[#9a4600]">
                  <span>Progreso Unidad</span>
                  <span>65%</span>
                </div>
                <div className="w-full bg-[#ffdbd1] rounded-full h-2.5 overflow-hidden">
                  <div className="bg-[#ff842c] h-full rounded-full w-[65%]"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Nodes Unidad 2 */}
          <div className="flex flex-col items-center gap-8 w-full max-w-md relative mb-12">
            <svg className="absolute top-6 bottom-6 left-1/2 -translate-x-1/2 w-48 h-[calc(100%-48px)] -z-0 pointer-events-none" preserveAspectRatio="none">
              <path d="M 96,20 Q 40,90 96,160 T 140,270 T 96,380" fill="none" stroke="#ff842c" strokeDasharray="10 6" strokeLinecap="round" strokeWidth="8" />
            </svg>

            <div className="flex flex-col items-center z-10 translate-x-8 cursor-pointer" onClick={() => sounds.playVoice('Tayka, Awki')}>
              <div className="w-18 h-18 p-1 rounded-full bg-[#3ca21d] flex items-center justify-center shadow-duo-green relative">
                <div className="w-16 h-16 rounded-full bg-white flex flex-col items-center justify-center border-2 border-[#91fb6e] text-[#083200]">
                  <span className="material-symbols-outlined text-2xl font-bold font-variation-fill">escalator_warning</span>
                  <span className="text-[9px] font-bold uppercase">[PNG/JPG]</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#083200] text-white flex items-center justify-center text-xs shadow-md">
                  <span className="material-symbols-outlined text-xs">done</span>
                </div>
              </div>
              <div className="mt-2 bg-white px-3 py-1 rounded-full border border-[#c6c5d4]/60 shadow-sm text-center">
                <span className="text-xs font-bold text-[#3b0900]">2.1 Tayka / Awki</span>
                <span className="text-[10px] text-[#767683] block">(Madre y Padre)</span>
              </div>
            </div>

            <div className="flex flex-col items-center z-10 -translate-x-8 cursor-pointer" onClick={() => sounds.playVoice('Jilaña, Kullaka')}>
              <div className="w-18 h-18 p-1 rounded-full bg-[#3ca21d] flex items-center justify-center shadow-duo-green relative">
                <div className="w-16 h-16 rounded-full bg-white flex flex-col items-center justify-center border-2 border-[#91fb6e] text-[#083200]">
                  <span className="material-symbols-outlined text-2xl font-bold font-variation-fill">groups</span>
                  <span className="text-[9px] font-bold uppercase">[PNG/JPG]</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#083200] text-white flex items-center justify-center text-xs shadow-md">
                  <span className="material-symbols-outlined text-xs">done</span>
                </div>
              </div>
              <div className="mt-2 bg-white px-3 py-1 rounded-full border border-[#c6c5d4]/60 shadow-sm text-center">
                <span className="text-xs font-bold text-[#3b0900]">2.2 Jilaña / Kullaka</span>
                <span className="text-[10px] text-[#767683] block">(Hermanos y Hermanas)</span>
              </div>
            </div>

            {/* LECCIÓN 3: HERO NODE */}
            <div className="flex flex-col items-center z-20 group relative my-2">
              <span className="absolute w-24 h-24 rounded-full bg-[#ff842c]/20 animate-ping"></span>
              <div className="w-22 h-22 p-1.5 rounded-full bg-[#ff842c] flex items-center justify-center relative scale-110 shadow-duo-orange">
                <div className="w-20 h-20 rounded-full bg-white flex flex-col items-center justify-center border-4 border-[#ffdbc9] text-[#9a4600]">
                  <span className="material-symbols-outlined text-3xl font-extrabold text-[#9a4600] animate-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>
                    play_arrow
                  </span>
                  <span className="text-[10px] font-extrabold text-[#9a4600] uppercase">[PNG/JPG]</span>
                </div>
                <div className="absolute -top-3 px-3 py-1 rounded-full bg-[#0e1c7b] text-white text-[11px] font-bold shadow-md uppercase border border-white">
                  ¡ACTUAL!
                </div>
              </div>

              {/* Action Card: //button[contains(., 'Continuar lección')] */}
              <div className="mt-4 bg-white border-2 border-[#ff842c] rounded-2xl p-4 shadow-xl text-center max-w-xs flex flex-col items-center">
                <span className="text-xs font-bold text-[#9a4600] uppercase tracking-wider">LECCIÓN 3 EN CURSO</span>
                <h3 className="font-display text-lg font-bold text-[#0e1c7b] mt-0.5">Achachila uka Awicha</h3>
                <p className="text-xs text-[#454652] mb-3">Los sabios abuelos y el rol protector en el Altiplano.</p>
                <button
                  onClick={() => {
                    sounds.playTap();
                    onNavigate('juegos_interactivos', 'slide_up');
                  }}
                  className="w-full py-3 px-6 rounded-xl bg-[#ff842c] hover:bg-[#e06c15] text-white text-sm font-bold flex items-center justify-center gap-2 shadow-duo-orange btn-3d cursor-pointer"
                  type="button"
                >
                  <span>Continuar lección</span>
                  <span className="bg-white/20 px-2 py-0.5 rounded-md text-xs font-extrabold">+15 Yachay</span>
                </button>
              </div>
            </div>

            {/* Nodo 2.4 Bloqueado */}
            <div className="flex flex-col items-center z-10 translate-x-6 opacity-70 cursor-not-allowed">
              <div className="w-18 h-18 p-1 rounded-full bg-[#e5e7eb] flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-[#ffe9e4] flex flex-col items-center justify-center border-2 border-[#c6c5d4] text-[#767683]">
                  <span className="material-symbols-outlined text-2xl font-bold">lock</span>
                  <span className="text-[9px] uppercase">[PNG/JPG]</span>
                </div>
              </div>
              <div className="mt-2 bg-[#fff1ed] px-3 py-1 rounded-full border border-[#c6c5d4]/40 text-center">
                <span className="text-xs font-bold text-[#767683]">2.4 Allchhi (Nietos)</span>
                <span className="text-[10px] text-[#767683] block">(Bloqueado)</span>
              </div>
            </div>

            {/* Trofeo */}
            <div className="flex flex-col items-center z-10 opacity-60">
              <div className="w-16 h-16 rounded-2xl bg-[#ffe2db] border-2 border-[#c6c5d4] flex flex-col items-center justify-center text-[#767683] shadow">
                <span className="material-symbols-outlined text-3xl">military_tech</span>
                <span className="text-[8px] uppercase">[PNG/JPG]</span>
              </div>
              <span className="text-xs font-bold text-[#767683] mt-1">Trofeo Totora de Puno</span>
            </div>
          </div>

          {/* Kusi banner */}
          <div className="w-full bg-gradient-to-r from-[#fff1ed] to-[#ffe2db] border-2 border-[#ff842c]/30 rounded-3xl p-4 flex items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-4">
              <img
                alt="Kusi Alpaca"
                className="w-20 h-20 object-contain drop-shadow-md"
                src={`${import.meta.env.BASE_URL}images/pancita.png`}
              />
              <div>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#ffdbc9] text-xs font-bold text-[#753400] mb-1">
                  🐾 Kusi te anima
                </span>
                <p className="font-display text-base font-bold text-[#0e1c7b]">
                  ¡Jikisiñkama! ¡Vamos por la lección de Aimara! 💪
                </p>
                <p className="text-xs text-[#454652]">
                  Completar esta lección te asegurará mantenerte en la división Oro de la <strong className="text-[#9a4600]">Liga Titicaca</strong>.
                </p>
              </div>
            </div>
            <div className="hidden md:flex flex-col items-end">
              <span className="text-xs text-[#767683] font-semibold">Meta de hoy</span>
              <span className="font-display text-base text-[#ff842c] font-extrabold">2 / 3 Lecciones</span>
            </div>
          </div>
        </div>

        {/* RIGHT ASIDE (4 COLS) */}
        <aside className="lg:col-span-4 flex flex-col gap-6 w-full sticky top-24">
          {/* Widget 1: Meta diaria */}
          <div className="bg-white border border-[#c6c5d4]/70 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display text-base font-bold text-[#0e1c7b] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#9a4600] font-variation-fill">target</span>
                Meta diaria
              </h3>
              <span className="text-xs font-bold text-[#ff842c] px-2 py-0.5 bg-[#ffdbc9]/50 rounded-md">
                +30 XP hoy
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-[#454652]">Tiempo de práctica en Aimara</span>
                <span className="text-[#0e1c7b] font-bold">12 / 15 min</span>
              </div>
              <div className="w-full bg-[#ffe9e4] h-2.5 rounded-full overflow-hidden">
                <div className="bg-[#2a3691] h-full rounded-full w-[80%]"></div>
              </div>
              <p className="text-xs text-[#454652] flex items-center gap-1 pt-1">
                <span className="material-symbols-outlined text-sm text-[#083200]">check_circle</span>
                ¡Estás a 1 lección corta de cumplir tu objetivo diario!
              </p>
            </div>
          </div>

          {/* Widget 2: Liga Titicaca */}
          <div className="bg-white border border-[#c6c5d4]/70 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#ffe9e4]">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#9a4600] font-bold font-variation-fill">emoji_events</span>
                  <h3 className="font-display text-base font-bold text-[#0e1c7b]">Liga Titicaca</h3>
                </div>
                <span className="text-xs text-[#767683]">División Oro • Finaliza en 2 días</span>
              </div>
              <span className="text-xs font-bold text-[#0e1c7b] px-2 py-1 bg-[#dfe0ff] rounded-lg">
                Puesto #4
              </span>
            </div>

            <ul className="space-y-2 text-sm">
              <li className="flex items-center justify-between p-2 rounded-xl bg-[#fff1ed]">
                <div className="flex items-center gap-2.5">
                  <span className="font-bold text-[#9a4600] text-sm w-4 text-center">1</span>
                  <div className="w-7 h-7 rounded-full bg-[#ffdbc9] flex items-center justify-center font-bold text-xs text-[#321200]">
                    YA
                  </div>
                  <div>
                    <p className="font-bold text-xs text-[#3b0900]">Yawar A.</p>
                    <p className="text-[10px] text-[#767683]">Puno, Perú</p>
                  </div>
                </div>
                <span className="font-bold text-xs text-[#0e1c7b]">1,420 XP</span>
              </li>

              <li className="flex items-center justify-between p-2 rounded-xl">
                <div className="flex items-center gap-2.5">
                  <span className="font-bold text-[#767683] text-sm w-4 text-center">2</span>
                  <div className="w-7 h-7 rounded-full bg-[#dfe0ff] flex items-center justify-center font-bold text-xs text-[#0e1c7b]">
                    MC
                  </div>
                  <div>
                    <p className="font-bold text-xs text-[#3b0900]">Mama Colla</p>
                    <p className="text-[10px] text-[#767683]">La Paz, Bolivia</p>
                  </div>
                </div>
                <span className="font-bold text-xs text-[#0e1c7b]">1,280 XP</span>
              </li>

              <li className="flex items-center justify-between p-2 rounded-xl">
                <div className="flex items-center gap-2.5">
                  <span className="font-bold text-[#767683] text-sm w-4 text-center">3</span>
                  <div className="w-7 h-7 rounded-full bg-[#ffe2db] flex items-center justify-center font-bold text-xs text-[#9a4600]">
                    JC
                  </div>
                  <div>
                    <p className="font-bold text-xs text-[#3b0900]">Jilata Carlos</p>
                    <p className="text-[10px] text-[#767683]">Moquegua, Perú</p>
                  </div>
                </div>
                <span className="font-bold text-xs text-[#0e1c7b]">1,150 XP</span>
              </li>

              <li className="flex items-center justify-between p-2.5 rounded-xl bg-[#dfe0ff]/40 border border-[#0e1c7b]/20">
                <div className="flex items-center gap-2.5">
                  <span className="font-bold text-[#0e1c7b] text-sm w-4 text-center">4</span>
                  <div className="w-7 h-7 rounded-full bg-[#0e1c7b] text-white flex items-center justify-center font-bold text-xs">
                    TÚ
                  </div>
                  <div>
                    <p className="font-bold text-xs text-[#0e1c7b]">Tú (Estudiante)</p>
                    <p className="text-[10px] text-[#0e1c7b]/70">Puno / En ascenso ⚡</p>
                  </div>
                </div>
                <span className="font-bold text-xs text-[#0e1c7b]">980 XP</span>
              </li>
            </ul>
            <button className="w-full mt-3 text-center text-xs text-[#0e1c7b] font-bold hover:underline py-1 cursor-pointer">
              Ver tabla completa (30 estudiantes) →
            </button>
          </div>

          {/* Widget 3: Misión del Día */}
          <div className="bg-white border border-[#c6c5d4]/70 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-[#ff842c]">campaign</span>
              <span className="text-xs font-bold text-[#9a4600] uppercase tracking-wider">MISIÓN DEL DÍA</span>
            </div>
            <h4 className="font-display text-sm font-bold text-[#0e1c7b] mb-1">
              Aprende 3 consonantes aspiradas aimaras (ph, th, kh)
            </h4>
            <p className="text-xs text-[#454652] mb-3">
              El Aimara distingue sonidos simples, aspirados y glotalizados. Practica la expulsión de aire suave en palabras como <em className="text-[#0e1c7b] font-semibold">phisi</em> (gato) y <em className="text-[#0e1c7b] font-semibold">thaya</em> (viento).
            </p>
            <div className="bg-[#fff1ed] rounded-xl p-3 border border-[#ffdbd1] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#0e1c7b] text-xl">mic</span>
                <span className="text-xs font-bold text-[#3b0900]">Progreso fonético: 2/3</span>
              </div>
              <span className="px-2 py-1 rounded bg-[#ff842c] text-white text-xs font-bold shadow-xs">
                +50 Cristales
              </span>
            </div>
          </div>

          {/* Widget 4: Cuaderno de Fonética */}
          {/* Navigation Target: //button[contains(., 'Abrir Cuaderno Interactivo')] */}
          <div className="bg-gradient-to-br from-[#2a3691] to-[#0e1c7b] text-white rounded-2xl p-4 shadow-md">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-3">
                <span className="material-symbols-outlined text-2xl text-[#ffb68c]">menu_book</span>
              </div>
              <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full font-semibold">
                Guía de Estudio
              </span>
            </div>
            <h4 className="font-display text-base font-bold mb-1">Cuaderno de Fonética Aimara</h4>
            <p className="text-xs text-[#bcc2ff] mb-4 leading-relaxed">
              Consulta la tabla oficial de 26 consonantes y 3 vocales con alargamiento vocálico. Grabado por hablantes nativos de la península de Chucuito.
            </p>
            <button
              onClick={() => {
                sounds.playTap();
                onNavigate('cuaderno_repaso', 'push');
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-white text-[#0e1c7b] hover:bg-[#fff8f6] font-bold text-xs flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-sm">volume_up</span>
              <span>Abrir Cuaderno Interactivo</span>
            </button>
          </div>
        </aside>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#fff1ed] border-t border-[#ffe2db] mt-12">
        <div className="w-full max-w-[1200px] mx-auto px-4 md:px-10 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1">
            <span className="font-bold text-[#9a4600]">Allikiwa</span>
            <p className="text-xs text-[#454652]">
              © 2024 Allikiwa. Promoviendo el Quechua Chanka y Aimara. Todos los derechos reservados.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-semibold text-[#454652]">
            <a className="hover:text-[#9a4600] transition-colors" href="#">Gramática Quechua</a>
            <a className="text-[#0e1c7b] font-medium hover:text-[#9a4600] transition-colors" href="#">Fonética Aimara</a>
            <a className="hover:text-[#9a4600] transition-colors" href="#">Diccionario Comunitario</a>
            <a className="hover:text-[#9a4600] transition-colors" href="#">Metodología Yachay</a>
            <a className="hover:text-[#9a4600] transition-colors" href="#">Políticas de Privacidad</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
