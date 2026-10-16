import React from 'react';
import { ScreenId, TransitionType } from '../types';
import { sounds } from '../utils/audio';

interface Props {
  onNavigate: (screen: ScreenId, transition?: TransitionType) => void;
}

export const MapaQuechuaScreen: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="bg-[#fff8f6] text-[#3b0900] font-body-md antialiased min-h-screen flex flex-col selection:bg-[#ffdbc9]">
      {/* ==================== TOP NAV BAR ==================== */}
      <header className="bg-white border-b border-[#ffe9e4] shadow-sm sticky top-0 z-50">
        <div className="flex justify-between items-center w-full px-4 md:px-10 max-w-[1200px] mx-auto h-20">
          {/* Logo brand and slogan */}
          <div className="flex items-center gap-3">
            <a
              className="flex items-center gap-3 group cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                sounds.playTap();
                onNavigate('traductor', 'push_back');
              }}
              href="#traductor"
            >
              <img
                alt="Logo Allikiwa"
                className="w-12 h-12 object-contain rounded-2xl p-0.5 border-2 border-[#2a3691]/10 shadow-xs transition-transform group-hover:scale-105 duration-200"
                src={`${import.meta.env.BASE_URL}images/logo.png`}
              />
              <div className="flex flex-col">
                <span className="font-playful text-2xl md:text-3xl font-bold tracking-tight text-[#f27a21] leading-tight">
                  Allikiwa
                </span>
                <span className="text-[10px] md:text-xs font-semibold text-[#0e1c7b] hidden sm:block">
                  Aprende, practica y conecta con nuestras lenguas
                </span>
              </div>
            </a>
          </div>

          {/* Navigation Links (Traductor vs Aprender) */}
          <nav className="flex items-center gap-6 sm:gap-8">
            {/* XPath: //nav//a[contains(., 'Traductor')] */}
            <a
              className="text-[#454652] font-semibold text-sm sm:text-base hover:text-[#0e1c7b] transition-colors flex items-center gap-1.5 pb-1 cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                sounds.playTap();
                onNavigate('traductor', 'push_back');
              }}
              href="#traductor"
            >
              <span className="material-symbols-outlined text-xl">translate</span>
              <span>Traductor</span>
            </a>
            <a
              className="border-b-2 border-[#0e1c7b] text-[#0e1c7b] font-bold text-sm sm:text-base pb-1 flex items-center gap-1.5 cursor-pointer"
              href="#aprender"
            >
              <span className="material-symbols-outlined text-xl font-variation-fill">school</span>
              <span>Aprender</span>
            </a>
          </nav>

          {/* Gamified Status Counters & Profile */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Streak */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#fff1ed] border border-[#ffe2db] shadow-xs">
              <span className="material-symbols-outlined text-[#f27a21] font-variation-fill text-xl md:text-2xl">
                local_fire_department
              </span>
              <span className="font-bold text-sm md:text-base text-[#9a4600]">5</span>
              <span className="text-[11px] font-semibold text-[#9a4600] hidden lg:inline">días</span>
            </div>

            {/* Crystals */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#fff1ed] border border-[#ffe2db] shadow-xs">
              <span className="material-symbols-outlined text-[#1cb0f6] font-variation-fill text-xl md:text-2xl">
                diamond
              </span>
              <span className="font-bold text-sm md:text-base text-[#0e1c7b]">480</span>
            </div>

            {/* Hearts */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#fff1ed] border border-[#ffe2db] shadow-xs">
              <span className="material-symbols-outlined text-[#ff4b4b] font-variation-fill text-xl md:text-2xl">
                favorite
              </span>
              <span className="font-bold text-sm md:text-base text-[#d83a3a]">5/5</span>
            </div>

            {/* Navigation Target: //header//a[contains(@href, '#') and .//span[contains(text(), 'person')]] */}
            <a
              className="ml-1 p-1 rounded-full border-2 border-[#f27a21] hover:shadow-md transition-all cursor-pointer"
              href="#perfil"
              onClick={(e) => {
                e.preventDefault();
                sounds.playTap();
                onNavigate('perfil_dinamico', 'push');
              }}
              title="Mi Perfil"
            >
              <div className="w-9 h-9 rounded-full bg-[#2a3691] text-white flex items-center justify-center font-bold text-sm shadow-inner overflow-hidden">
                <span className="material-symbols-outlined text-xl">person</span>
              </div>
            </a>
          </div>
        </div>
      </header>

      {/* ==================== MAIN CONTENT CANVAS ==================== */}
      <main className="flex-grow w-full max-w-[1200px] mx-auto px-4 md:px-10 py-6">
        {/* Language Ribbon */}
        <section className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-3xl border border-[#ffe9e4] shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#ff842c]/20 flex items-center justify-center text-[#9a4600] border border-[#ff842c]/30">
              <span className="material-symbols-outlined text-2xl font-variation-fill">auto_stories</span>
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#767683]">Lengua de Estudio Actual</span>
              <div className="flex items-center gap-2">
                <h1 className="font-playful text-xl md:text-2xl font-bold text-[#0e1c7b]">Quechua Chanka (Ayacucho)</h1>
                <span className="bg-[#91fb6e] text-[#042100] text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                  ACTIVO
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Navigation Target: //button[contains(., 'Cambiar a') and contains(., 'Aimara')] */}
            <button
              onClick={() => {
                sounds.playTap();
                onNavigate('ruta_aimara', 'none');
              }}
              className="btn-3d bg-[#fff1ed] hover:bg-[#ffe9e4] border border-[#ffe2db] text-[#0e1c7b] font-bold text-sm px-4 py-2.5 rounded-2xl flex items-center gap-2 shadow-xs transition-all cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-lg text-[#9a4600]">cached</span>
              <span>Cambiar a <strong>Aimara</strong></span>
            </button>
            <button
              className="btn-3d bg-[#fff1ed] hover:bg-[#ffe9e4] border border-[#ffe2db] text-[#454652] p-2.5 rounded-2xl cursor-pointer"
              title="Configuración de nivel"
              type="button"
            >
              <span className="material-symbols-outlined text-lg">tune</span>
            </button>
          </div>
        </section>

        {/* Bento Grid: Pathway (Left) + Widgets (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: DUOLINGO PATH */}
          <div className="lg:col-span-8 flex flex-col items-center relative">
            {/* UNIDAD 1 */}
            <div className="w-full mb-8">
              <div className="bg-gradient-to-r from-[#2a3691] to-[#3b4ab8] text-white p-5 rounded-3xl shadow-sm border border-[#2a3691]/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white border border-white/20">
                    <span className="material-symbols-outlined text-2xl font-variation-fill text-[#ffc800]">military_tech</span>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#dfe0ff] uppercase tracking-wider">Unidad 1 • COMPLETADA</span>
                    <h2 className="font-playful text-xl md:text-2xl font-bold">Napaykuna – Saludos y Cortesía</h2>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-white/20 px-3 py-1.5 rounded-2xl font-playful text-sm font-bold">
                  <span className="material-symbols-outlined text-[#ffc800] text-lg font-variation-fill">star</span>
                  <span>★ 3/3</span>
                </div>
              </div>
            </div>

            {/* Sinuous Path Nodes for Unit 1 */}
            <div className="w-full max-w-md flex flex-col items-center gap-6 relative py-2">
              <div className="flex flex-col items-center z-10">
                <button
                  onClick={() => {
                    sounds.playSuccess();
                  }}
                  className="btn-3d w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-[#ffc800] border-4 border-white shadow-duo-neutral flex flex-col items-center justify-center text-[#321200] font-bold cursor-pointer"
                >
                  <span className="material-symbols-outlined text-2xl font-variation-fill">check</span>
                  <span className="text-[10px]">1.1</span>
                </button>
                <span className="mt-1.5 text-[11px] font-bold text-[#753400] bg-[#ffdbc9]/60 px-2.5 py-0.5 rounded-full">
                  Saludos básicos
                </span>
              </div>

              {/* Sinuous Path Curve */}
              <svg className="w-48 h-12 -my-2 overflow-visible" viewBox="0 0 100 40">
                <path d="M 50,0 Q 85,20 60,40" fill="none" stroke="#ffc800" strokeDasharray="6,6" strokeLinecap="round" strokeWidth="6" />
              </svg>

              <div className="flex flex-col items-center translate-x-12 z-10">
                <button
                  onClick={() => sounds.playSuccess()}
                  className="btn-3d w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-[#ffc800] border-4 border-white shadow-duo-neutral flex flex-col items-center justify-center text-[#321200] font-bold cursor-pointer"
                >
                  <span className="material-symbols-outlined text-2xl font-variation-fill">star</span>
                  <span className="text-[10px]">1.2</span>
                </button>
                <span className="mt-1.5 text-[11px] font-bold text-[#753400] bg-[#ffdbc9]/60 px-2.5 py-0.5 rounded-full">
                  Despedidas
                </span>
              </div>

              <svg className="w-48 h-12 -my-2 overflow-visible" viewBox="0 0 100 40">
                <path d="M 60,0 Q 25,20 40,40" fill="none" stroke="#ffc800" strokeDasharray="6,6" strokeLinecap="round" strokeWidth="6" />
              </svg>

              <div className="flex flex-col items-center -translate-x-8 z-10">
                <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-3xl bg-[#f27a21] border-4 border-white shadow-duo-orange flex flex-col items-center justify-center text-white font-bold cursor-pointer">
                  <span className="material-symbols-outlined text-2xl font-variation-fill">redeem</span>
                  <span className="text-[9px] mt-0.5">Cofre</span>
                </div>
                <span className="mt-1.5 text-[11px] font-bold text-[#9a4600] bg-[#ffe9e4] px-2.5 py-0.5 rounded-full">
                  Vocabulario
                </span>
              </div>

              <svg className="w-48 h-14 -my-2 overflow-visible" viewBox="0 0 100 40">
                <path d="M 40,0 Q 50,20 50,40" fill="none" stroke="#58cc02" strokeDasharray="6,6" strokeLinecap="round" strokeWidth="6" />
              </svg>
            </div>

            {/* UNIDAD 2 (ACTIVE) */}
            <div className="w-full my-8">
              <div className="bg-gradient-to-r from-[#f27a21] to-[#ff842c] text-white p-5 rounded-3xl shadow-md border-2 border-[#d66412] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-white border border-white/30">
                    <span className="material-symbols-outlined text-2xl font-variation-fill">diversity_3</span>
                  </div>
                  <div>
                    <span className="text-xs font-extrabold uppercase tracking-wider text-[#ffdbc9]">
                      EN PROGRESO • LECCIÓN 3 DE 5
                    </span>
                    <h2 className="font-playful text-xl md:text-2xl font-bold">Ayllu – Familia y Vínculos</h2>
                  </div>
                </div>
                <span className="bg-white text-[#9a4600] font-bold text-xs uppercase px-4 py-2 rounded-2xl shadow-xs hidden sm:block">
                  NIVEL ACTUAL
                </span>
              </div>
            </div>

            {/* Path Nodes for Unit 2 */}
            <div className="w-full max-w-xl flex flex-col items-center gap-6 relative py-4">
              <div className="flex flex-col items-center z-10">
                <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-[#58cc02] border-4 border-white shadow-duo-green flex flex-col items-center justify-center text-white font-bold cursor-pointer">
                  <span className="material-symbols-outlined text-2xl font-variation-fill">check</span>
                  <span className="text-[10px]">2.1</span>
                </div>
                <span className="mt-1.5 text-[11px] font-bold text-[#104b00] bg-[#91fb6e]/40 px-2.5 py-0.5 rounded-full">
                  Padres
                </span>
              </div>

              <svg className="w-48 h-12 -my-2 overflow-visible" viewBox="0 0 100 40">
                <path d="M 50,0 Q 20,20 40,40" fill="none" stroke="#58cc02" strokeDasharray="6,6" strokeLinecap="round" strokeWidth="6" />
              </svg>

              <div className="flex flex-col items-center -translate-x-12 z-10">
                <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-[#58cc02] border-4 border-white shadow-duo-green flex flex-col items-center justify-center text-white font-bold cursor-pointer">
                  <span className="material-symbols-outlined text-2xl font-variation-fill">check</span>
                  <span className="text-[10px]">2.2</span>
                </div>
                <span className="mt-1.5 text-[11px] font-bold text-[#104b00] bg-[#91fb6e]/40 px-2.5 py-0.5 rounded-full">
                  Hermanos
                </span>
              </div>

              <svg className="w-48 h-14 -my-2 overflow-visible" viewBox="0 0 100 40">
                <path d="M 40,0 Q 75,20 50,40" fill="none" stroke="#f27a21" strokeDasharray="6,6" strokeLinecap="round" strokeWidth="6" />
              </svg>

              {/* LEVEL 2.3 ACTIVE HERO NODE WITH MASCOT */}
              <div className="relative w-full flex items-center justify-center py-4">
                <div className="absolute -right-2 sm:right-6 md:-right-4 -top-16 z-30 flex flex-col items-center group pointer-events-none">
                  <div className="relative bg-white text-[#0e1c7b] border-2 border-[#ff842c] rounded-2xl px-3 py-2 shadow-md font-bold text-xs max-w-[150px] mb-1.5 text-center leading-snug">
                    ¡Vamos por la lección 3!<br />
                    <span className="text-[#f27a21]">¡Tú puedes!</span> 💪
                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b-2 border-r-2 border-[#ff842c] transform rotate-45"></div>
                  </div>
                  <img
                    alt="Mascota Allikiwa Alpacata"
                    className="w-24 h-24 sm:w-28 sm:h-28 object-contain drop-shadow-lg"
                    src={`${import.meta.env.BASE_URL}images/pancita.png`}
                  />
                </div>

                <div className="flex flex-col items-center z-20">
                  <div className="relative">
                    <button
                      onClick={() => {
                        sounds.playTap();
                        onNavigate('juegos_interactivos', 'slide_up');
                      }}
                      className="relative btn-3d w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#f27a21] border-4 border-white shadow-duo-orange flex flex-col items-center justify-center text-white cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-3xl sm:text-4xl font-variation-fill">play_arrow</span>
                      <span className="text-[11px] font-extrabold uppercase">Lección 3</span>
                    </button>
                  </div>
                  <span className="mt-2 text-xs font-bold text-[#f27a21] bg-[#ffdbc9]/60 px-3.5 py-1 rounded-full">
                    Parentescos (Ayllu)
                  </span>
                </div>
              </div>

              {/* Action Button: //button[contains(., 'Continuar lección')] */}
              <div className="w-full max-w-sm mt-2 z-20">
                <button
                  onClick={() => {
                    sounds.playTap();
                    onNavigate('juegos_interactivos', 'slide_up');
                  }}
                  className="btn-3d w-full py-4 rounded-2xl bg-[#f27a21] hover:bg-[#e06c15] text-white font-bold text-lg flex items-center justify-center gap-3 shadow-duo-orange border-2 border-white cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-2xl font-variation-fill">play_circle</span>
                  <span>Continuar lección (+15 Yachay)</span>
                </button>
              </div>

              <svg className="w-48 h-12 -my-2 overflow-visible" viewBox="0 0 100 40">
                <path d="M 50,0 Q 25,20 35,40" fill="none" stroke="#c6c5d4" strokeDasharray="6,6" strokeLinecap="round" strokeWidth="6" />
              </svg>

              <div className="flex flex-col items-center -translate-x-12 z-10 opacity-75">
                <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-[#e5e5e5] border-4 border-white flex flex-col items-center justify-center text-[#767683] cursor-not-allowed">
                  <span className="material-symbols-outlined text-2xl">lock</span>
                  <span className="text-[10px] font-bold">2.4</span>
                </div>
                <span className="mt-1.5 text-[11px] font-bold text-[#767683] bg-[#ffe2db] px-2.5 py-0.5 rounded-full">
                  Abuelos
                </span>
              </div>
            </div>

            {/* UNIDAD 3 */}
            <div className="w-full my-8">
              <div className="bg-[#fff1ed] text-[#454652] p-5 rounded-3xl border border-[#ffe9e4] flex items-center justify-between opacity-80">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#ffe9e4] flex items-center justify-center text-[#767683]">
                    <span className="material-symbols-outlined text-2xl">lock</span>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#767683] uppercase tracking-wider">Unidad 3 • PRÓXIMAMENTE</span>
                    <h2 className="font-playful text-xl font-bold text-[#3b0900]/80">Pachamama – Animales y Naturaleza</h2>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[#767683] text-2xl">pets</span>
              </div>
            </div>

            <div className="w-full max-w-md bg-white border border-dashed border-[#c6c5d4] p-4 rounded-2xl text-center mb-10">
              <span className="text-xs font-bold text-[#767683] uppercase tracking-wide">
                UNIDAD 4: RIKCHAYKUNA Y MERCADO ANDINO
              </span>
              <p className="text-xs text-[#454652] mt-1">
                Completa las unidades previas para descubrir el trueque y las compras tradicionales.
              </p>
            </div>
          </div>

          {/* RIGHT ASIDE WIDGETS */}
          <aside className="lg:col-span-4 flex flex-col gap-6 w-full sticky top-24">
            {/* Widget 1: Meta Diaria */}
            <div className="bg-white p-5 rounded-3xl border border-[#ffe9e4] shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-playful text-lg font-bold text-[#0e1c7b] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#ffc800] font-variation-fill">emoji_events</span>
                  <span>Meta Diaria</span>
                </h3>
                <span className="text-xs font-bold text-[#9a4600] bg-[#ffe9e4] px-2.5 py-1 rounded-full">
                  3 / 4 Lecciones
                </span>
              </div>
              <p className="text-xs text-[#454652] mb-3">¡Solo una lección más para mantener encendida tu racha de 5 días!</p>
              <div className="w-full bg-[#ffe9e4] h-4 rounded-full overflow-hidden p-0.5">
                <div className="bg-gradient-to-r from-[#58cc02] to-[#46a302] h-full rounded-full w-[75%]"></div>
              </div>
            </div>

            {/* Widget 2: Liga Cóndor */}
            <div className="bg-white p-5 rounded-3xl border border-[#ffe9e4] shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-[#ffdbc9] flex items-center justify-center text-[#9a4600] font-bold">
                    <span className="material-symbols-outlined text-2xl font-variation-fill">shield</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-[#9a4600]">TORNEO ANDINO</span>
                    <h3 className="font-playful text-base font-bold text-[#0e1c7b]">Liga Cóndor</h3>
                  </div>
                </div>
                <span className="text-xs font-semibold text-[#767683]">Quedan 2d</span>
              </div>

              <div className="space-y-2.5">
                <div className="flex items-center justify-between p-2 rounded-2xl bg-[#fff1ed] border border-[#ffe9e4]">
                  <div className="flex items-center gap-2.5">
                    <span className="font-bold text-sm text-[#d99300] w-4 text-center">1</span>
                    <div className="w-8 h-8 rounded-full bg-[#ffc800] text-[#753400] flex items-center justify-center text-xs font-bold">
                      YR
                    </div>
                    <div>
                      <span className="font-semibold text-xs text-[#3b0900] block leading-tight">Yuri R.</span>
                      <span className="text-[10px] text-[#767683]">Cusco</span>
                    </div>
                  </div>
                  <span className="font-bold text-xs text-[#0e1c7b]">920 XP</span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-2xl bg-[#ffdbc9]/50 border-2 border-[#f27a21]">
                  <div className="flex items-center gap-2.5">
                    <span className="font-bold text-sm text-[#f27a21] w-4 text-center">2</span>
                    <div className="w-8 h-8 rounded-full bg-[#f27a21] text-white flex items-center justify-center text-xs font-bold">
                      TÚ
                    </div>
                    <div>
                      <span className="font-bold text-xs text-[#3b0900] block leading-tight">Tú (Explorador)</span>
                      <span className="text-[10px] text-[#9a4600] font-semibold">¡Zona de Ascenso!</span>
                    </div>
                  </div>
                  <span className="font-bold text-xs text-[#9a4600]">845 XP</span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-2xl bg-[#fff1ed] border border-[#ffe9e4]">
                  <div className="flex items-center gap-2.5">
                    <span className="font-bold text-sm text-[#767683] w-4 text-center">3</span>
                    <div className="w-8 h-8 rounded-full bg-[#c6c5d4] text-[#454652] flex items-center justify-center text-xs font-bold">
                      MA
                    </div>
                    <div>
                      <span className="font-semibold text-xs text-[#3b0900] block leading-tight">Mama Alicia</span>
                      <span className="text-[10px] text-[#767683]">Ayacucho</span>
                    </div>
                  </div>
                  <span className="font-bold text-xs text-[#0e1c7b]">780 XP</span>
                </div>
              </div>
              <button className="w-full mt-3 py-2 text-xs font-bold text-[#0e1c7b] hover:text-[#9a4600] text-center block cursor-pointer">
                Ver tabla completa de clasificación →
              </button>
            </div>

            {/* Widget 3: Misión del Día */}
            <div className="bg-white p-5 rounded-3xl border border-[#ffe9e4] shadow-xs">
              <div className="flex items-center gap-3 mb-2">
                <span className="material-symbols-outlined text-[#58cc02] font-variation-fill text-2xl">target</span>
                <h3 className="font-playful text-base font-bold text-[#0e1c7b]">Misión del Día</h3>
              </div>
              <p className="text-xs text-[#3b0900] mb-3 font-medium">
                Aprende y pronuncia correctamente <strong>3 palabras nuevas</strong> en Quechua.
              </p>
              <div className="flex items-center justify-between text-xs font-bold text-[#767683] mb-1">
                <span>Progreso</span>
                <span>2 / 3</span>
              </div>
              <div className="w-full bg-[#ffe9e4] h-3 rounded-full overflow-hidden p-0.5">
                <div className="bg-[#1cb0f6] h-full rounded-full w-[66%]"></div>
              </div>
              <div className="mt-3 flex items-center justify-between text-[11px] text-[#9a4600] font-semibold bg-[#ffdbc9]/40 p-2 rounded-xl">
                <span>Recompensa:</span>
                <span className="flex items-center gap-1 font-bold">
                  <span className="material-symbols-outlined text-sm font-variation-fill text-[#1cb0f6]">diamond</span> +20 Cristales
                </span>
              </div>
            </div>

            {/* Widget 4: Cuaderno de Repaso */}
            {/* Navigation Target: //button[contains(., 'Practicar Fonética')] */}
            <div className="bg-gradient-to-br from-[#fff1ed] to-[#ffe9e4] p-5 rounded-3xl border border-[#ffdbd1] shadow-xs">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-2xl bg-[#ff4b4b] text-white">
                  <span className="material-symbols-outlined text-xl font-variation-fill">psychology</span>
                </div>
                <div>
                  <h4 className="font-playful font-bold text-sm text-[#0e1c7b]">Cuaderno de Repaso</h4>
                  <p className="text-xs text-[#454652] mt-0.5">Tienes 4 términos con fonética glotalizada por reforzar.</p>
                </div>
              </div>
              <button
                onClick={() => {
                  sounds.playTap();
                  onNavigate('cuaderno_repaso', 'push');
                }}
                className="btn-3d w-full mt-4 py-2.5 rounded-2xl bg-[#1cb0f6] hover:bg-[#1899d6] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-duo-blue cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-base">hearing</span>
                <span>PRACTICAR FONÉTICA</span>
              </button>
            </div>
          </aside>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#fff1ed] border-t border-[#ffe2db] mt-16">
        <div className="w-full max-w-[1200px] mx-auto px-4 md:px-10 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col items-center md:items-start gap-1 text-center md:text-left">
            <span className="font-bold text-[#9a4600]">Allikiwa</span>
            <p className="text-xs text-[#454652]">
              © 2024 Allikiwa. Promoviendo el Quechua Chanka y Aimara. Todos los derechos reservados.
            </p>
          </div>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-semibold text-[#454652]">
            <a className="hover:text-[#9a4600] transition-colors" href="#">Gramática Quechua</a>
            <a className="hover:text-[#9a4600] transition-colors" href="#">Fonética Aimara</a>
            <a className="hover:text-[#9a4600] transition-colors" href="#">Diccionario Comunitario</a>
            <a className="hover:text-[#9a4600] transition-colors" href="#">Metodología Yachay</a>
            <a className="hover:text-[#9a4600] transition-colors" href="#">Políticas de Privacidad</a>
          </nav>
        </div>
      </footer>
    </div>
  );
};
