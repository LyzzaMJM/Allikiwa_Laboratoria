import React, { useState } from 'react';
import { ScreenId, TransitionType } from '../types';
import { sounds } from '../utils/audio';

interface Props {
  onNavigate: (screen: ScreenId, transition?: TransitionType) => void;
}

export const CuadernoRepasoScreen: React.FC<Props> = ({ onNavigate }) => {
  const [selectedWord, setSelectedWord] = useState<'pitiy' | 'tanta' | 'chaska'>('pitiy');
  const [isRecording, setIsRecording] = useState(false);

  const words = {
    pitiy: {
      term: "p'itiy",
      meaning: 'Romper hilo o cordel de golpe / Cortar bruscamente',
      lang: 'Quechua Chanka',
      ipa: "[p'i.tɪj]",
      note: "Cierre glotal explosivo al inicio (p')"
    },
    tanta: {
      term: "t'anta",
      meaning: 'Pan andino tradicional / Alimento horneado',
      lang: 'Quechua Chanka',
      ipa: "[ˈtʼan.ta]",
      note: "Explosión glotal alveolar (t')"
    },
    chaska: {
      term: "ch'aska",
      meaning: 'Estrella grande / Lucero del alba (Venus)',
      lang: 'Quechua Chanka',
      ipa: "[ˈt͡ʃʼas.ka]",
      note: "Africada eyectiva postalveolar (ch')"
    }
  };

  const current = words[selectedWord];

  const handlePlayWord = (slow = false) => {
    sounds.playVoice(current.term, slow);
  };

  const handleRecord = () => {
    sounds.playTap();
    setIsRecording(!isRecording);
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        sounds.playSuccess();
      }, 1500);
    }
  };

  return (
    <div className="bg-[#fff8f6] text-[#3b0900] min-h-screen flex flex-col font-body-md antialiased selection:bg-[#ffdbc9]">
      {/* TopNavBar */}
      <header className="bg-white border-b border-[#ffe9e4] shadow-sm sticky top-0 z-50">
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
                alt="Logo Allikiwa"
                className="w-10 h-10 object-contain group-hover:scale-105 transition-transform"
                src={`${import.meta.env.BASE_URL}images/logo.png`}
              />
              <div className="flex flex-col">
                <span className="font-display text-xl font-bold text-[#f27a21] leading-none">Allikiwa</span>
                <span className="text-[10px] text-[#454652] hidden lg:inline-block mt-0.5">
                  Aprende, practica y conecta con nuestras lenguas
                </span>
              </div>
            </a>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center gap-6 sm:gap-8">
            {/* Target: //nav//a[contains(., 'Traductor')] */}
            <a
              className="text-[#454652] text-sm sm:text-base font-semibold hover:text-[#0e1c7b] transition-colors flex items-center gap-1.5 pb-1 cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                sounds.playTap();
                onNavigate('traductor', 'push_back');
              }}
              href="#traductor"
            >
              <span className="material-symbols-outlined text-lg">g_translate</span>
              <span>Traductor</span>
            </a>

            {/* Target: //nav//a[contains(., 'Aprender')] */}
            <a
              className="border-b-2 border-[#0e1c7b] text-[#0e1c7b] font-bold text-sm sm:text-base pb-1 flex items-center gap-1.5 cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                sounds.playTap();
                onNavigate('mapa_quechua', 'push_back');
              }}
              href="#aprender"
            >
              <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                menu_book
              </span>
              <span>Aprender</span>
            </a>
          </nav>

          {/* Trailing Badges & Profile */}
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-1.5 bg-[#fff1ed] px-3 py-1.5 rounded-full border border-[#ffdbc9]">
              <span className="material-symbols-outlined text-[#ff842c] text-lg font-variation-fill">
                local_fire_department
              </span>
              <span className="font-bold text-sm text-[#9a4600]">5</span>
            </div>

            <div className="flex items-center gap-1.5 bg-[#fff1ed] px-3 py-1.5 rounded-full border border-[#dfe0ff]">
              <span className="material-symbols-outlined text-[#2a3691] text-lg font-variation-fill">diamond</span>
              <span className="font-bold text-sm text-[#0e1c7b]">480</span>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 bg-[#fff1ed] px-3 py-1.5 rounded-full border border-[#ffdad6]">
              <span className="material-symbols-outlined text-[#ba1a1a] text-lg font-variation-fill">favorite</span>
              <span className="font-bold text-sm text-[#ba1a1a]">5/5</span>
            </div>

            {/* Target: //header//button[contains(., 'Perfil')] */}
            <button
              onClick={() => {
                sounds.playTap();
                onNavigate('perfil_dinamico', 'push');
              }}
              className="flex items-center gap-2 p-1 pl-2 pr-3 rounded-full hover:bg-[#ffe9e4] transition-colors border border-[#c6c5d4]/50 cursor-pointer"
              type="button"
            >
              <div className="w-8 h-8 rounded-full bg-[#ffdbc9] flex items-center justify-center text-[#753400] font-bold text-xs ring-2 ring-[#2a3691]/20">
                PA
              </div>
              <span className="font-bold text-sm text-[#0e1c7b] hidden sm:inline">Perfil</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Canvas */}
      <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 md:px-10 py-6 md:py-10 flex flex-col gap-8">
        {/* 1. Bento Header Motivador con Kusi */}
        <section className="bg-white rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border-2 border-[#ede8df] shadow-duo-card relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center gap-6 z-10 text-center md:text-left">
            <div className="relative shrink-0">
              <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-[#fdfaf5] flex items-center justify-center p-1 border-4 border-[#ffe9e4] shadow-md">
                <img
                  alt="Mascota Kusi"
                  className="w-full h-full object-contain filter drop-shadow hover:scale-105 transition-transform duration-200"
                  src={`${import.meta.env.BASE_URL}images/pancita.png`}
                />
              </div>
              <span className="absolute -bottom-1 -right-1 bg-[#91fb6e] text-[#042100] text-xs px-2.5 py-0.5 rounded-full border border-[#104b00] font-bold flex items-center gap-0.5">
                <span className="material-symbols-outlined text-xs font-variation-fill">verified</span>
                Yachachiq
              </span>
            </div>

            <div className="flex flex-col">
              <div className="inline-flex items-center gap-2 self-center md:self-start bg-[#ffdbc9]/50 px-3 py-1 rounded-full text-[#9a4600] text-xs font-bold mb-1">
                <span className="material-symbols-outlined text-sm">auto_stories</span>
                Yachay Repaso & Fonética
              </div>
              <h1 className="font-display text-2xl md:text-3xl font-bold text-[#0e1c7b] tracking-tight">
                Cuaderno de Repaso Personalizado
              </h1>
              <p className="text-sm md:text-base text-[#454652] max-w-xl mt-1">
                <span className="font-bold text-[#632b00]">Kusi dice:</span> &ldquo;¡Reforcemos juntos las palabras difíciles antes de seguir avanzando! Cada error es un escalón hacia la fluidez.&rdquo;
              </p>
            </div>
          </div>

          {/* Action Button: //button[contains(., 'Sesión de Repaso Rápido')] */}
          <div className="z-10 w-full md:w-auto shrink-0 flex flex-col items-center">
            <button
              onClick={() => {
                sounds.playTap();
                onNavigate('ejercicio_dictado', 'slide_up');
              }}
              className="w-full md:w-auto px-6 py-3.5 rounded-2xl bg-[#f27a21] hover:bg-[#e06c15] text-white font-bold text-base shadow-duo-orange btn-3d flex items-center justify-center gap-2 cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined font-variation-fill">bolt</span>
              <span>Sesión de Repaso Rápido (+20 XP)</span>
            </button>
            <span className="text-xs text-[#454652] mt-2 flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-[#f27a21]">rewarded_ads</span>
              Otorga +15 Gemas Yachay de bonificación
            </span>
          </div>
        </section>

        {/* 2. Métricas de Repaso & Dominio */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Métrica 1 */}
          <div className="bg-white rounded-3xl p-5 border-2 border-[#ede8df] shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold text-[#767683] uppercase tracking-wider">Dominio de Vocabulario</span>
              <span className="material-symbols-outlined text-[#3ca21d] font-variation-fill">check_circle</span>
            </div>
            <div className="my-3">
              <div className="flex items-baseline gap-2">
                <span className="font-display text-3xl font-bold text-[#0e1c7b]">18</span>
                <span className="text-sm text-[#767683]">/ 24 palabras dominadas</span>
              </div>
              <div className="w-full bg-[#ffe9e4] h-3.5 rounded-full overflow-hidden mt-2 p-0.5">
                <div className="bg-[#3ca21d] h-full rounded-full w-[75%]"></div>
              </div>
            </div>
            <span className="text-xs font-bold text-[#3ca21d]">75% del módulo Ayllu consolidado</span>
          </div>

          {/* Métrica 2 */}
          <div className="bg-white rounded-3xl p-5 border-2 border-[#ede8df] shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold text-[#767683] uppercase tracking-wider">Fonética Glotalizada</span>
              <span className="material-symbols-outlined text-[#ff842c] font-variation-fill">graphic_eq</span>
            </div>
            <div className="my-3">
              <div className="flex items-baseline gap-2">
                <span className="font-display text-3xl font-bold text-[#ff842c]">4</span>
                <span className="text-sm text-[#767683]">términos por pulir</span>
              </div>
              <div className="flex gap-1.5 mt-2">
                <span className="px-2 py-0.5 bg-[#fff1ed] border border-[#ffdbc9] rounded-lg text-xs font-bold text-[#9a4600]">p&apos;</span>
                <span className="px-2 py-0.5 bg-[#fff1ed] border border-[#ffdbc9] rounded-lg text-xs font-bold text-[#9a4600]">t&apos;</span>
                <span className="px-2 py-0.5 bg-[#fff1ed] border border-[#ffdbc9] rounded-lg text-xs font-bold text-[#9a4600]">ch&apos;</span>
                <span className="px-2 py-0.5 bg-[#fff1ed] border border-[#ffdbc9] rounded-lg text-xs font-bold text-[#9a4600]">k&apos;</span>
              </div>
            </div>
            <span className="text-xs font-bold text-[#ff842c]">Requieren distinción de aspiradas (ph, th)</span>
          </div>

          {/* Métrica 3 */}
          <div className="bg-white rounded-3xl p-5 border-2 border-[#ede8df] shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold text-[#767683] uppercase tracking-wider">Próximo Vencimiento Yachay</span>
              <span className="material-symbols-outlined text-[#2a3691] font-variation-fill">update</span>
            </div>
            <div className="my-3">
              <div className="flex items-baseline gap-2">
                <span className="font-display text-3xl font-bold text-[#0e1c7b]">Hoy</span>
                <span className="text-sm text-[#767683]">a las 20:00 hrs</span>
              </div>
              <p className="text-xs text-[#454652] mt-1 leading-snug">
                Algoritmo de repetición espaciada: 6 fichas listas para retención a largo plazo.
              </p>
            </div>
            <span className="text-xs font-bold text-[#0e1c7b] flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">notifications_active</span> Notificación activada
            </span>
          </div>
        </section>

        {/* 3. Pestañas */}
        <section className="flex flex-col gap-5">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-[#ffe9e4]">
            <button
              className="px-5 py-2.5 rounded-2xl font-bold text-xs sm:text-sm bg-[#0e1c7b] text-white shadow-sm flex items-center gap-2 shrink-0 cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-sm font-variation-fill">record_voice_over</span>
              Fonética Glotalizada y Sufijos (Chanka / Aimara)
            </button>
            <button
              className="px-5 py-2.5 rounded-2xl font-bold text-xs sm:text-sm bg-white text-[#454652] hover:text-[#0e1c7b] border border-[#c6c5d4]/40 flex items-center gap-2 shrink-0 cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-sm">history_edu</span>
              Errores Recientes en Lecciones (3)
            </button>
            <button
              className="px-5 py-2.5 rounded-2xl font-bold text-xs sm:text-sm bg-white text-[#454652] hover:text-[#0e1c7b] border border-[#c6c5d4]/40 flex items-center gap-2 shrink-0 cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-sm">diversity_3</span>
              Vocabulario Clave del Ayllu (15)
            </button>
          </div>

          {/* 4. Grid de Repaso */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Card: 7 cols */}
            <div className="lg:col-span-7 bg-white rounded-3xl border-2 border-[#2a3691] p-6 shadow-duo-card flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span className="px-3 py-1 bg-[#2a3691]/10 text-[#0e1c7b] rounded-full text-xs font-bold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm">mic_external_on</span>
                  Entrenamiento de Emisión Acústica Glotal
                </span>
                <span className="text-xs font-bold text-[#ff842c]">Nivel Intermedio</span>
              </div>

              {/* Selector */}
              <div className="flex gap-2">
                {(['pitiy', 'tanta', 'chaska'] as const).map((key) => {
                  const item = words[key];
                  const isAct = selectedWord === key;
                  return (
                    <button
                      key={key}
                      onClick={() => {
                        sounds.playTap();
                        setSelectedWord(key);
                      }}
                      className={`px-3.5 py-1.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                        isAct
                          ? 'bg-[#0e1c7b] text-white shadow-sm'
                          : 'bg-[#fff1ed] text-[#454652] hover:bg-[#ffe9e4]'
                      }`}
                      type="button"
                    >
                      {item.term}
                    </button>
                  );
                })}
              </div>

              {/* Word Details */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-[#fffcf5] p-5 rounded-2xl border border-[#ede8df]">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-display text-3xl font-extrabold text-[#0e1c7b]">{current.term}</h2>
                    <span className="material-symbols-outlined text-[#2a3691] text-xl" title="Glotal oclusiva">info</span>
                  </div>
                  <p className="text-sm text-[#454652] mt-0.5">
                    Significado: <strong className="text-[#3b0900]">{current.meaning}</strong>
                  </p>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-[11px] px-2 py-0.5 rounded bg-[#dfe0ff] text-[#0e1c7b] font-bold">
                      {current.lang}
                    </span>
                    <span className="text-[11px] text-[#767683]">Transcripción: {current.ipa}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-3 sm:mt-0">
                  <button
                    onClick={() => handlePlayWord(false)}
                    className="w-11 h-11 rounded-2xl bg-white border-2 border-[#ede8df] hover:border-[#0e1c7b] text-[#0e1c7b] flex items-center justify-center shadow-duo-neutral btn-3d cursor-pointer"
                    title="Escuchar audio"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-2xl">volume_up</span>
                  </button>
                  <button
                    onClick={() => handlePlayWord(true)}
                    className="w-11 h-11 rounded-2xl bg-white border-2 border-[#ede8df] hover:border-[#ff842c] text-[#ff842c] flex items-center justify-center shadow-duo-neutral btn-3d cursor-pointer"
                    title="Audio lento"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-2xl">slow_motion_video</span>
                  </button>
                </div>
              </div>

              {/* Waveform */}
              <div className="bg-[#fff1ed] p-4 rounded-2xl border border-[#ffe2db] flex flex-col gap-3">
                <div className="flex justify-between items-center text-xs text-[#767683]">
                  <span className="flex items-center gap-1 font-bold text-[#0e1c7b]">
                    <span className="w-2 h-2 rounded-full bg-[#3ca21d] animate-pulse"></span>
                    Onda Acústica del Hablante Nativo (Andamarca, Ayacucho)
                  </span>
                  <span>{current.note}</span>
                </div>

                <div className="h-14 flex items-center justify-between gap-1 px-3 bg-white rounded-xl border border-[#ffe2db]">
                  <div className="w-1.5 h-3 bg-[#0e1c7b]/40 rounded-full"></div>
                  <div className="w-1.5 h-4 bg-[#0e1c7b]/40 rounded-full"></div>
                  <div className="w-1.5 h-11 bg-[#0e1c7b] rounded-full animate-pulse"></div>
                  <div className="w-1.5 h-13 bg-[#f27a21] rounded-full"></div>
                  <div className="w-1.5 h-8 bg-[#0e1c7b] rounded-full"></div>
                  <div className="w-1.5 h-2 bg-[#0e1c7b]/30 rounded-full"></div>
                  <div className="w-1.5 h-1 bg-[#c6c5d4] rounded-full"></div>
                  <div className="w-1.5 h-2 bg-[#0e1c7b]/30 rounded-full"></div>
                  <div className="w-1.5 h-8 bg-[#0e1c7b] rounded-full"></div>
                  <div className="w-1.5 h-10 bg-[#0e1c7b] rounded-full"></div>
                  <div className="w-1.5 h-6 bg-[#0e1c7b]/60 rounded-full"></div>
                  <div className="w-1.5 h-3 bg-[#0e1c7b]/30 rounded-full"></div>
                  <div className="w-1.5 h-1 bg-[#c6c5d4] rounded-full"></div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
                  <p className="text-xs text-[#454652] text-center sm:text-left">
                    Presiona el micrófono y pronuncia con fuerza explosiva desde los labios sin expulsar aire soplado.
                  </p>
                  <button
                    onClick={handleRecord}
                    className={`w-full sm:w-auto px-5 py-2.5 rounded-2xl ${
                      isRecording ? 'bg-[#ba1a1a] animate-pulse' : 'bg-[#2a3691] hover:bg-[#0e1c7b]'
                    } text-white text-xs font-bold flex items-center justify-center gap-2 shadow-duo-blue btn-3d cursor-pointer shrink-0`}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-lg font-variation-fill">mic</span>
                    <span>{isRecording ? 'Grabando...' : 'Grabar y Comparar'}</span>
                  </button>
                </div>
              </div>

              {/* Mnemonic Rule */}
              <div className="p-3.5 bg-[#fff4ed] rounded-2xl border border-[#ffdbc9] flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[#b43f1d] shrink-0 mt-0.5">lightbulb</span>
                <p className="text-xs text-[#753400] leading-relaxed">
                  <strong>Regla mnemotécnica Yachay:</strong> Las consonantes glotalizadas (con apóstrofo como <em>p&apos;</em>) producen un chasquido seco. No confundir con <em>piti</em> (trozo menudo) sin apóstrofo.
                </p>
              </div>
            </div>

            {/* Right Column: Key Saved Terms (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <h3 className="font-display text-base font-bold text-[#0e1c7b]">Términos Clave Guardados</h3>
                <span className="text-xs text-[#767683]">3 pendientes hoy</span>
              </div>

              {/* Term 1: t'anta */}
              <div className="bg-white rounded-3xl border-2 border-[#ede8df] p-4 flex flex-col gap-2 shadow-sm hover:border-[#0e1c7b] transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-display text-base font-bold text-[#0e1c7b]">t&apos;anta</h4>
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#ffdbc9] text-[#753400]">
                        Glotal T&apos;
                      </span>
                    </div>
                    <p className="text-xs text-[#3b0900]">Pan andino tradicional / Alimento horneado</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => sounds.playVoice("t'anta")}
                      className="p-1.5 rounded-lg hover:bg-[#ffe9e4] text-[#0e1c7b] cursor-pointer"
                      title="Audio normal"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-lg">volume_up</span>
                    </button>
                    <button
                      onClick={() => sounds.playVoice("t'anta", true)}
                      className="p-1.5 rounded-lg hover:bg-[#ffe9e4] text-[#ff842c] cursor-pointer"
                      title="Modo tortuga"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-lg">slow_motion_video</span>
                    </button>
                  </div>
                </div>
                <div className="bg-[#fff1ed] p-2.5 rounded-xl text-xs text-[#454652]">
                  <em>&ldquo;Mamayqa misk&apos;i <strong>t&apos;antatam</strong> ruran.&rdquo;</em> (Mi madre prepara pan dulce).
                </div>
                <div className="flex justify-between items-center pt-1">
                  <span className="text-[11px] text-[#ba1a1a] font-medium flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">history</span> Fallado hace 2 días
                  </span>
                  <button
                    onClick={() => {
                      sounds.playTap();
                      onNavigate('ejercicio_dictado', 'slide_up');
                    }}
                    className="text-xs font-bold text-[#0e1c7b] hover:underline cursor-pointer"
                    type="button"
                  >
                    Practicar ahora →
                  </button>
                </div>
              </div>

              {/* Term 2: ch'aska */}
              <div className="bg-white rounded-3xl border-2 border-[#ede8df] p-4 flex flex-col gap-2 shadow-sm hover:border-[#0e1c7b] transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-display text-base font-bold text-[#0e1c7b]">ch&apos;aska</h4>
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#dfe0ff] text-[#0e1c7b]">
                        Astronomía
                      </span>
                    </div>
                    <p className="text-xs text-[#3b0900]">Estrella grande / Lucero del alba (Venus)</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => sounds.playVoice("ch'aska")}
                      className="p-1.5 rounded-lg hover:bg-[#ffe9e4] text-[#0e1c7b] cursor-pointer"
                      title="Audio normal"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-lg">volume_up</span>
                    </button>
                    <button
                      onClick={() => sounds.playVoice("ch'aska", true)}
                      className="p-1.5 rounded-lg hover:bg-[#ffe9e4] text-[#ff842c] cursor-pointer"
                      title="Modo tortuga"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-lg">slow_motion_video</span>
                    </button>
                  </div>
                </div>
                <div className="bg-[#fff1ed] p-2.5 rounded-xl text-xs text-[#454652]">
                  <em>&ldquo;Tutapi <strong>ch&apos;askakuna</strong> kanchirillan.&rdquo;</em> (En la noche las estrellas brillan).
                </div>
                <div className="flex justify-between items-center pt-1">
                  <span className="text-[11px] text-[#3ca21d] font-medium flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">done</span> 85% de acierto
                  </span>
                  <button className="text-xs font-bold text-[#0e1c7b] hover:underline cursor-pointer" type="button">
                    Revisar matices →
                  </button>
                </div>
              </div>

              {/* Term 3: ayllu */}
              <div className="bg-white rounded-3xl border-2 border-[#ede8df] p-4 flex flex-col gap-2 shadow-sm hover:border-[#0e1c7b] transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-display text-base font-bold text-[#0e1c7b]">ayllu</h4>
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#ffe2db] text-[#9a4600]">
                        Comunidad
                      </span>
                    </div>
                    <p className="text-xs text-[#3b0900]">Comunidad extendida / Familia ancestral territorial</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => sounds.playVoice('ayllu')}
                      className="p-1.5 rounded-lg hover:bg-[#ffe9e4] text-[#0e1c7b] cursor-pointer"
                      title="Audio normal"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-lg">volume_up</span>
                    </button>
                    <button
                      onClick={() => sounds.playVoice('ayllu', true)}
                      className="p-1.5 rounded-lg hover:bg-[#ffe9e4] text-[#ff842c] cursor-pointer"
                      title="Modo tortuga"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-lg">slow_motion_video</span>
                    </button>
                  </div>
                </div>
                <div className="bg-[#fff1ed] p-2.5 rounded-xl text-xs text-[#454652]">
                  <em>&ldquo;Llapallanchik <strong>ayllunchikpaq</strong> llamk&apos;anchik.&rdquo;</em> (Todos trabajamos por nuestra comunidad).
                </div>
                <div className="flex justify-between items-center pt-1">
                  <span className="text-[11px] text-[#3ca21d] font-medium flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">verified</span> Dominada
                  </span>
                  <button className="text-xs font-bold text-[#767683] hover:text-[#0e1c7b] cursor-pointer" type="button">
                    Ver sufijos (-wan, -pi) →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Banner de Llamado a la Acción 3D */}
        <section className="bg-gradient-to-r from-[#2a3691] via-[#0e1c7b] to-[#2a3691] text-white rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          <div className="flex flex-col gap-2 max-w-xl z-10 text-center md:text-left">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold self-center md:self-start w-fit">
              Desafío Diario de Repetición Espaciada
            </span>
            <h2 className="font-display text-xl sm:text-2xl font-bold">
              ¿Listo para blindar tu pronunciación Chanka y Aimara?
            </h2>
            <p className="text-xs sm:text-sm text-[#dfe0ff]">
              Completa los 5 ejercicios rápidos de hoy. Entrenarás tu oído con hablantes nativos de Ayacucho y Puno.
            </p>
          </div>

          {/* Navigation Target: //button[contains(., 'Iniciar Repaso Ahora')] */}
          <div className="z-10 w-full md:w-auto">
            <button
              onClick={() => {
                sounds.playSuccess();
                onNavigate('juegos_interactivos', 'slide_up');
              }}
              className="w-full md:w-auto px-8 py-4 rounded-2xl bg-[#3ca21d] hover:bg-[#2d7d15] text-white font-chubby font-bold text-base shadow-duo-green btn-3d flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
              type="button"
            >
              <span className="material-symbols-outlined font-variation-fill">play_arrow</span>
              <span>Iniciar Repaso Ahora</span>
            </button>
          </div>
        </section>
      </main>

      {/* Cultural Footer */}
      <footer className="bg-[#fff1ed] border-t border-[#ffe2db] mt-8">
        <div className="w-full max-w-[1200px] mx-auto px-4 md:px-10 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col items-center md:items-start gap-1">
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
