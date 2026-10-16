import React, { useState } from 'react';
import { ScreenId, TransitionType } from '../types';
import { sounds } from '../utils/audio';

interface Props {
  onNavigate: (screen: ScreenId, transition?: TransitionType) => void;
}

export const EjercicioDictadoScreen: React.FC<Props> = ({ onNavigate }) => {
  const [speed, setSpeed] = useState<'normal' | 'slow'>('normal');
  const [activeTab, setActiveTab] = useState<'voice' | 'text'>('voice');
  const [isRecording, setIsRecording] = useState(false);
  const [dictationText, setDictationText] = useState("T'anta");

  const handlePlayNative = () => {
    sounds.playVoice("T'anta", speed === 'slow');
  };

  const handleMicPress = () => {
    sounds.playTap();
    setIsRecording(!isRecording);
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        sounds.playSuccess();
      }, 1500);
    }
  };

  const addPhoneticChar = (char: string) => {
    sounds.playTap();
    setDictationText((prev) => prev + char);
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

          {/* Progress Bar (80%) */}
          <div className="flex-1 max-w-xl mx-2">
            <div className="flex items-center justify-between mb-1.5 px-0.5">
              <span className="text-xs text-[#454652] flex items-center gap-1 font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#2a3691] inline-block animate-pulse"></span>
                Fonética Quechua Chanka • Nivel Avanzado
              </span>
              <span className="text-xs text-[#0e1c7b] font-bold">80%</span>
            </div>
            <div className="w-full h-3.5 bg-[#ffe9e4] rounded-full overflow-hidden p-0.5 shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-[#ff842c] to-[#ffb68c] rounded-full transition-all duration-500 shadow-sm"
                style={{ width: '80%' }}
              ></div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#fff1ed] rounded-xl border border-[#ffe2db]">
              <span className="material-symbols-outlined text-[#ba1a1a] text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                favorite
              </span>
              <span className="font-bold text-sm text-[#3b0900]">5/5</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#ffdbc9] rounded-xl border border-[#ffb68c]">
              <span className="material-symbols-outlined text-[#9a4600] text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                local_fire_department
              </span>
              <span className="font-bold text-sm text-[#753400]">14</span>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#dfe0ff] rounded-xl border border-[#bcc2ff]">
              <span className="material-symbols-outlined text-[#0e1c7b] text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                diamond
              </span>
              <span className="font-bold text-sm text-[#000b62]">420</span>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="w-full max-w-[1200px] mx-auto px-4 md:px-10 py-6 flex-1 flex flex-col justify-center">
        {/* Instruction Prompt */}
        <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 rounded-lg bg-[#dfe0ff] text-[#0e1c7b] text-xs font-bold">
                Fonética Glotalizada
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-[#ffe9e4] text-[#9a4600] text-xs font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">record_voice_over</span> Oclusiva eyectiva
              </span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#3b0900] tracking-tight">
              Escucha con atención y escribe o pronuncia la consonante glotalizada
            </h1>
            <p className="text-sm text-[#454652] mt-1">
              Identifica la explosión glotal anterior a la vocal en la palabra nativa andina.
            </p>
          </div>

          {/* Speed Pills */}
          <div className="flex items-center gap-2 bg-[#fff1ed] p-1.5 rounded-xl border border-[#ffe9e4]">
            <button
              onClick={() => {
                sounds.playTap();
                setSpeed('normal');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                speed === 'normal'
                  ? 'bg-white text-[#0e1c7b] shadow-sm border border-[#c6c5d4]/30'
                  : 'text-[#454652] hover:text-[#0e1c7b]'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">play_arrow</span>
              Velocidad normal (1x)
            </button>
            <button
              onClick={() => {
                sounds.playTap();
                setSpeed('slow');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                speed === 'slow'
                  ? 'bg-white text-[#0e1c7b] shadow-sm border border-[#c6c5d4]/30'
                  : 'text-[#454652] hover:text-[#0e1c7b]'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">pest_control</span>
              Lenta (0.75x)
            </button>
          </div>
        </div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-6">
          {/* Left Bento: Audio & Waveform */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            <div className="bg-white rounded-3xl border border-[#ffe9e4] p-6 shadow-sm flex flex-col items-center justify-center relative overflow-hidden">
              <div className="w-full flex items-center justify-between mb-4 z-10">
                <span className="text-xs font-bold text-[#767683] uppercase tracking-wide">
                  MUESTRA DE AUDIO NATIVO
                </span>
                <span className="text-xs font-bold text-[#9a4600] bg-[#ffe9e4] px-2 py-0.5 rounded-md">
                  Región: Ayacucho Chanka
                </span>
              </div>

              {/* Giant Play Button */}
              <div className="relative my-4 flex items-center justify-center">
                <div className="absolute w-36 h-36 rounded-full bg-[#dfe0ff] opacity-40 animate-ping pointer-events-none"></div>
                <div className="absolute w-28 h-28 rounded-full bg-[#bcc2ff]/60 pointer-events-none"></div>
                <button
                  onClick={handlePlayNative}
                  className="relative z-10 w-24 h-24 rounded-full bg-[#2a3691] hover:bg-[#0e1c7b] text-white flex items-center justify-center shadow-lg active:translate-y-1 transition-all duration-150 border-4 border-white cursor-pointer group"
                  type="button"
                  title="Reproducir audio nativo"
                >
                  <span className="material-symbols-outlined text-[48px] ml-1 group-hover:scale-110 transition-transform">
                    volume_up
                  </span>
                </button>
              </div>

              <div className="text-center z-10 mt-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fff1ed] border border-[#ffe9e4]">
                  <span className="w-2 h-2 rounded-full bg-[#ff842c]"></span>
                  <span className="font-display text-xl font-bold text-[#3b0900]">T&apos;anta</span>
                  <span className="text-[#767683] text-sm italic">[ˈtʼan.ta]</span>
                </div>
                <p className="text-xs text-[#454652] mt-1.5">
                  Significado: <span className="font-semibold text-[#3b0900]">Pan tradicional andino de trigo y maíz</span>
                </p>
              </div>

              {/* Waveform visualizer */}
              <div className="w-full mt-6 pt-5 border-t border-[#ffe9e4]">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#2a3691] text-[20px]">graphic_eq</span>
                    <span className="text-xs font-bold text-[#3b0900]">
                      Espectro Fonético: Onda Nativa vs Estudiante
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-[#104b00] bg-[#91fb6e]/30 px-2 py-0.5 rounded">
                    Explosión Glotal /tʼ/
                  </span>
                </div>

                <div className="w-full bg-[#fff1ed] rounded-2xl p-4 border border-[#ffe9e4]">
                  {/* Native Target */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-[11px] font-bold text-[#454652] mb-1">
                      <span className="text-[#0e1c7b] flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-[#2a3691]"></span> Audio Nativo (Chanka)
                      </span>
                      <span>Burst Duration: 42ms</span>
                    </div>
                    <div className="h-8 flex items-center gap-1 w-full justify-between px-1">
                      <div className="w-1.5 h-2 bg-[#2a3691]/40 rounded-full"></div>
                      <div className="w-1.5 h-3 bg-[#2a3691]/60 rounded-full"></div>
                      <div className="w-1.5 h-7 bg-[#ff842c] rounded-full animate-pulse shadow-sm"></div>
                      <div className="w-1.5 h-8 bg-[#ff842c] rounded-full animate-pulse"></div>
                      <div className="w-1.5 h-5 bg-[#2a3691] rounded-full"></div>
                      <div className="w-1.5 h-4 bg-[#2a3691]/70 rounded-full"></div>
                      <div className="w-1.5 h-6 bg-[#2a3691] rounded-full"></div>
                      <div className="w-1.5 h-3 bg-[#2a3691]/50 rounded-full"></div>
                      <div className="w-1.5 h-2 bg-[#2a3691]/40 rounded-full"></div>
                      <div className="w-1.5 h-5 bg-[#2a3691]/80 rounded-full"></div>
                      <div className="w-1.5 h-7 bg-[#2a3691] rounded-full"></div>
                      <div className="w-1.5 h-6 bg-[#2a3691]/90 rounded-full"></div>
                      <div className="w-1.5 h-3 bg-[#2a3691]/50 rounded-full"></div>
                      <div className="w-1.5 h-2 bg-[#2a3691]/30 rounded-full"></div>
                    </div>
                  </div>

                  {/* Student */}
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-bold text-[#454652] mb-1">
                      <span className="text-[#104b00] flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-[#76de55]"></span> Tu Pronunciación Detectada
                      </span>
                      <span className="text-[#104b00] font-bold">Similitud: 92%</span>
                    </div>
                    <div className="h-8 flex items-center gap-1 w-full justify-between px-1">
                      <div className="w-1.5 h-1.5 bg-[#104b00]/30 rounded-full"></div>
                      <div className="w-1.5 h-2.5 bg-[#104b00]/50 rounded-full"></div>
                      <div className="w-1.5 h-6 bg-[#76de55] rounded-full shadow-sm"></div>
                      <div className="w-1.5 h-7 bg-[#76de55] rounded-full"></div>
                      <div className="w-1.5 h-4 bg-[#104b00]/70 rounded-full"></div>
                      <div className="w-1.5 h-3.5 bg-[#104b00]/60 rounded-full"></div>
                      <div className="w-1.5 h-5 bg-[#104b00]/80 rounded-full"></div>
                      <div className="w-1.5 h-2.5 bg-[#104b00]/40 rounded-full"></div>
                      <div className="w-1.5 h-2 bg-[#104b00]/30 rounded-full"></div>
                      <div className="w-1.5 h-4 bg-[#104b00]/70 rounded-full"></div>
                      <div className="w-1.5 h-6.5 bg-[#76de55] rounded-full"></div>
                      <div className="w-1.5 h-5 bg-[#104b00]/80 rounded-full"></div>
                      <div className="w-1.5 h-2 bg-[#104b00]/40 rounded-full"></div>
                      <div className="w-1.5 h-1.5 bg-[#104b00]/20 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Bento: Response Mode & Feedback */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <div className="bg-white rounded-3xl border border-[#ffe9e4] p-5 shadow-sm flex flex-col flex-1">
              {/* Tabs */}
              <div className="flex items-center p-1 bg-[#ffe9e4] rounded-2xl mb-4">
                <button
                  onClick={() => setActiveTab('voice')}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    activeTab === 'voice'
                      ? 'bg-white text-[#0e1c7b] shadow-sm'
                      : 'text-[#454652] hover:text-[#0e1c7b]'
                  }`}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">mic</span>
                  Voz y Fonética
                </button>
                <button
                  onClick={() => setActiveTab('text')}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    activeTab === 'text'
                      ? 'bg-white text-[#0e1c7b] shadow-sm'
                      : 'text-[#454652] hover:text-[#0e1c7b]'
                  }`}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">edit_note</span>
                  Dictado Escrito
                </button>
              </div>

              {/* Mode 1: Voice */}
              {activeTab === 'voice' && (
                <div className="flex flex-col items-center justify-center py-4 flex-1">
                  <p className="text-xs text-[#454652] text-center mb-4">
                    Presiona el botón, pronuncia la palabra <span className="font-bold text-[#3b0900]">&ldquo;T&apos;anta&rdquo;</span> marcando el corte en la garganta.
                  </p>

                  <div className="relative my-2">
                    <button
                      onClick={handleMicPress}
                      className={`w-28 h-28 rounded-full ${
                        isRecording ? 'bg-[#b43f1d] animate-pulse' : 'bg-[#ff842c] hover:bg-[#e06c15]'
                      } text-white flex flex-col items-center justify-center shadow-duo-orange active:translate-y-1 transition-all border-4 border-white cursor-pointer`}
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[44px]">mic</span>
                      <span className="text-[10px] uppercase font-bold tracking-wider mt-0.5">
                        {isRecording ? 'GRABANDO' : 'HABLAR'}
                      </span>
                    </button>
                  </div>

                  <div className="mt-4 flex items-center gap-2 bg-[#fff1ed] px-4 py-2 rounded-full border border-[#ffe9e4]">
                    <span className="material-symbols-outlined text-[#104b00] text-[18px]">verified</span>
                    <span className="text-xs text-[#3b0900]">
                      Similitud fonética: <strong className="text-[#104b00] font-bold">92%</strong> (Ayacucho / Chanka)
                    </span>
                  </div>
                </div>
              )}

              {/* Mode 2: Text Dictation */}
              {activeTab === 'text' && (
                <div className="flex flex-col gap-3 flex-1 py-2">
                  <label className="text-xs text-[#454652] font-semibold">
                    Escribe lo que escuchas con precisión ortográfica andina:
                  </label>
                  <div className="relative">
                    <input
                      className="w-full px-4 py-3 rounded-2xl bg-[#fff1ed] border border-[#ffe9e4] focus:border-[#0e1c7b] text-[#3b0900] font-bold text-base outline-none"
                      value={dictationText}
                      onChange={(e) => setDictationText(e.target.value)}
                    />
                    <button
                      onClick={() => setDictationText('')}
                      className="absolute right-3 top-3 text-[#767683] hover:text-[#0e1c7b] cursor-pointer"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[20px]">backspace</span>
                    </button>
                  </div>

                  {/* Andean Virtual Keypad */}
                  <div className="mt-2">
                    <span className="text-[11px] text-[#767683] uppercase tracking-wider block mb-1.5 font-bold">
                      Caracteres Glotalizados y Aspirados:
                    </span>
                    <div className="grid grid-cols-5 gap-1.5">
                      {["ch'", "p'", "t'", "k'", "q'", 'ph', 'th', 'kh', 'qh', 'ñ'].map((c) => (
                        <button
                          key={c}
                          onClick={() => addPhoneticChar(c)}
                          className="py-2 rounded-xl bg-[#ffe9e4] hover:bg-[#0e1c7b] hover:text-white font-bold text-xs text-[#3b0900] border border-[#ffdbd1] transition-colors shadow-xs active:translate-y-0.5 cursor-pointer"
                          type="button"
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Mascot Kusi Advice Card */}
            <div className="bg-white rounded-3xl border border-[#ffe9e4] p-4 shadow-sm flex items-center gap-4">
              <div className="w-18 h-18 flex-shrink-0 relative">
                <img
                  className="w-full h-full object-contain filter drop-shadow-md rounded-2xl"
                  alt="Pancita mascota de Allikiwa"
                  src="/images/pancita.png"
                />
              </div>
              <div className="flex-1 bg-[#fff1ed] p-3 rounded-2xl border border-[#ffe9e4]">
                <div className="flex items-center gap-1.5 mb-1 text-[#9a4600] font-bold text-xs">
                  <span className="material-symbols-outlined text-[16px]">tips_and_updates</span>
                  Consejo de Kusi:
                </div>
                <p className="text-xs text-[#3b0900] leading-snug">
                  &ldquo;¡Buen intento! Recuerda no expulsar aire al pronunciar la <strong>t&apos;</strong> glotalizada; retén un milisegundo el aliento en la laringe antes de abrir la vocal.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="w-full bg-white border-t border-[#ffe2db] py-4 px-4 md:px-10 sticky bottom-0 z-30 shadow-lg">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-4">
          {/* Navigation Target: //footer//button[contains(., 'Saltar ejercicio')] */}
          <button
            onClick={() => {
              sounds.playTap();
              onNavigate('cuaderno_repaso', 'push');
            }}
            className="px-5 py-3 rounded-xl border border-[#c6c5d4] text-xs font-bold text-[#454652] hover:bg-[#ffe9e4] cursor-pointer"
            type="button"
          >
            Saltar ejercicio
          </button>

          {/* Navigation Target: //footer//button[contains(., 'Comprobar fonética')] */}
          <button
            onClick={() => {
              sounds.playSuccess();
              onNavigate('cuaderno_repaso', 'push');
            }}
            className="px-8 py-3.5 rounded-2xl bg-[#104b00] hover:bg-[#083200] text-white font-bold text-sm shadow-duo-green btn-3d flex items-center gap-2 cursor-pointer"
            type="button"
          >
            <span>Comprobar fonética</span>
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </button>
        </div>
      </footer>
    </div>
  );
};
