import React, { useState } from 'react';
import { ScreenId, TransitionType } from '../types';
import { sounds } from '../utils/audio';

interface Props {
  onNavigate: (screen: ScreenId, transition?: TransitionType) => void;
}

export const PerfilDinamicoScreen: React.FC<Props> = ({ onNavigate }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userName, setUserName] = useState('Inti Kusikuy');
  const [userLang, setUserLang] = useState<'quechua' | 'aimara'>('quechua');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const toggleSimulation = () => {
    sounds.playTap();
    if (isLoggedIn) {
      setIsLoggedIn(false);
      showToast('Sesión cerrada. Navegando como Invitado.');
    } else {
      setIsLoggedIn(true);
      sounds.playSuccess();
      showToast('¡Sumaq hamusqayki! Sesión iniciada con éxito.');
    }
  };

  return (
    <div className="bg-[#fdfbf7] text-[#3b0900] min-h-screen flex flex-col font-body-md antialiased relative">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-[#104b00] text-white px-6 py-3.5 rounded-2xl shadow-2xl border-2 border-[#76de55] flex items-center gap-3 animate-bounce">
          <span className="material-symbols-outlined text-[#76de55]">verified</span>
          <span className="font-display font-bold text-sm">{toastMessage}</span>
        </div>
      )}

      {/* TOP APP BAR */}
      <header className="w-full bg-white shadow-sm border-b border-[#ede8df] sticky top-0 z-50">
        <div className="flex justify-between items-center w-full px-4 md:px-10 max-w-[1200px] mx-auto h-20">
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
                className="w-12 h-12 object-contain rounded-2xl drop-shadow-sm group-hover:rotate-6 transition-transform duration-200"
                src="/images/logo.png"
              />
              <span className="font-display text-[26px] font-bold text-[#f27a21] tracking-tight">Allikiwa</span>
            </a>
            <div className="hidden lg:block h-6 w-[2px] bg-[#c6c5d4]/30 mx-1"></div>
            <span className="hidden lg:inline-block font-body-sm font-semibold text-[#454652] text-xs max-w-[260px] leading-tight">
              Aprende, practica y conecta con nuestras lenguas
            </span>
          </div>

          {/* Navigation Links: SPEC targets */}
          <nav className="flex items-center gap-6 sm:gap-8">
            <a
              className="text-[#454652] font-semibold text-sm sm:text-base hover:text-[#0e1c7b] transition-colors flex items-center gap-1.5 py-1 cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                sounds.playTap();
                onNavigate('traductor', 'push_back');
              }}
              href="#traductor"
            >
              <span className="material-symbols-outlined text-[20px]">translate</span>
              <span>Traductor</span>
            </a>
            <a
              className="text-[#454652] font-semibold text-sm sm:text-base hover:text-[#0e1c7b] transition-colors flex items-center gap-1.5 py-1 cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                sounds.playTap();
                onNavigate('mapa_quechua', 'push');
              }}
              href="#aprender"
            >
              <span className="material-symbols-outlined text-[20px]">school</span>
              <span>Aprender</span>
            </a>
          </nav>

          {/* Trailing Active Stats */}
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold bg-[#ffe2db] text-[#9a4600]">
              <span className="material-symbols-outlined material-symbols-fill text-[#f27a21] text-[20px]">
                local_fire_department
              </span>
              <span className="text-sm font-black text-[#9a4600]">{isLoggedIn ? '5' : '0'}</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold bg-[#eef3ff] text-[#2a3691] border border-[#d6e2ff]">
              <span className="material-symbols-outlined material-symbols-fill text-[#2a3691] text-[18px]">diamond</span>
              <span className="text-sm font-black text-[#2a3691]">{isLoggedIn ? '320' : '0'}</span>
            </div>
            <div className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full border border-[#ede8df] bg-[#fff8f6]">
              <div className="w-8 h-8 rounded-full bg-[#ff842c] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                <span className="material-symbols-outlined text-sm">person</span>
              </div>
              <span className="text-sm font-bold text-[#0e1c7b] hidden sm:inline">
                {isLoggedIn ? userName.split(' ')[0] : 'Invitado'}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CANVAS */}
      <main className="flex-grow max-w-[1200px] w-full mx-auto px-4 md:px-10 py-6 md:py-10">
        {/* Banner with Simulation Toggle */}
        <div className="mb-6 bg-gradient-to-r from-[#2a3691]/10 via-[#ff842c]/10 to-[#3ca21d]/10 rounded-3xl p-4 md:p-6 border border-[#ede8df] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-[#ede8df] flex items-center justify-center text-[#f27a21] shrink-0 mx-auto md:mx-0">
              <span className="material-symbols-outlined material-symbols-fill text-2xl">waving_hand</span>
            </div>
            <div>
              <h1 className="font-display text-2xl md:text-3xl font-bold text-[#0e1c7b] tracking-tight">
                ¡Sumaq hamusqayki! <span className="text-[#f27a21]">Bienvenido a Allikiwa</span>
              </h1>
              <p className="text-[#454652] text-sm mt-0.5">
                {isLoggedIn
                  ? 'Tu perfil andino está activo con estadísticas y medallas sincronizadas.'
                  : 'Únete a más de 12,500 estudiantes revitalizando el Quechua Chanka y el Aimara.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={toggleSimulation}
              className="px-4 py-2 bg-white hover:bg-[#fff9f6] rounded-2xl border-2 border-[#ede8df] text-[#0e1c7b] font-display font-bold text-xs shadow-sm flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px] text-[#f27a21]">swap_horiz</span>
              <span>{isLoggedIn ? 'Simular: Cerrar Sesión' : 'Simular: Iniciar Sesión'}</span>
            </button>
            <span className="px-3 py-1 bg-white/90 text-[#2a3691] text-xs rounded-full border border-[#2a3691]/20 font-bold uppercase tracking-wider hidden sm:flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#3ca21d] animate-pulse"></span>
              PLATAFORMA ABIERTA 2024
            </span>
          </div>
        </div>

        {/* Dual Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COL: Account settings / Form */}
          <section className="lg:col-span-7 bg-white rounded-3xl p-6 md:p-8 border-2 border-[#ede8df] shadow-sm">
            {isLoggedIn ? (
              <div>
                <div className="mb-6 p-4 rounded-2xl bg-[#eef8eb] border-2 border-[#c3e8b7] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-xl bg-[#3ca21d] text-white flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-xl">check</span>
                    </span>
                    <div>
                      <div className="font-display font-bold text-sm text-[#083200]">Sesión iniciada activamente</div>
                      <div className="text-xs text-[#125200]">Tu progreso y racha están guardados en la nube.</div>
                    </div>
                  </div>
                  <button
                    onClick={toggleSimulation}
                    className="px-3 py-1.5 rounded-xl bg-white border border-[#c3e8b7] text-[#ba1a1a] font-display font-bold text-xs hover:bg-[#ffdad6] transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">logout</span>
                    <span>Cerrar sesión</span>
                  </button>
                </div>

                <div className="space-y-4">
                  <h3 className="font-display text-lg font-bold text-[#0e1c7b]">Ajustes de tu Perfil de Aventurero</h3>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-[#767683] uppercase tracking-wider">
                      Nombre de aventurero
                    </label>
                    <input
                      className="w-full px-4 py-3 bg-[#fff1ed]/60 rounded-2xl border-2 border-[#ede8df] font-semibold text-base"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-[#767683] uppercase tracking-wider">
                      Lengua Originaria Principal
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setUserLang('quechua')}
                        className={`p-3 rounded-2xl border-2 text-left flex items-center gap-2 cursor-pointer ${
                          userLang === 'quechua' ? 'border-[#2a3691] bg-[#ebedfa]' : 'border-[#ede8df]'
                        }`}
                      >
                        <span className="w-8 h-8 rounded-xl bg-[#2a3691] text-white flex items-center justify-center font-bold text-xs">
                          Q
                        </span>
                        <div>
                          <div className="font-bold text-xs text-[#0e1c7b]">Quechua Chanka</div>
                          <div className="text-[10px] text-[#454652]">Ayacucho</div>
                        </div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setUserLang('aimara')}
                        className={`p-3 rounded-2xl border-2 text-left flex items-center gap-2 cursor-pointer ${
                          userLang === 'aimara' ? 'border-[#3ca21d] bg-[#e9f7e5]' : 'border-[#ede8df]'
                        }`}
                      >
                        <span className="w-8 h-8 rounded-xl bg-[#3ca21d] text-white flex items-center justify-center font-bold text-xs">
                          A
                        </span>
                        <div>
                          <div className="font-bold text-xs text-[#083200]">Aimara Central</div>
                          <div className="text-[10px] text-[#454652]">Puno</div>
                        </div>
                      </button>
                    </div>
                  </div>

                  <div className="pt-4 flex gap-3">
                    <button
                      onClick={() => {
                        sounds.playSuccess();
                        showToast('Ajustes guardados correctamente.');
                      }}
                      className="px-6 py-3 rounded-2xl bg-[#3ca21d] hover:bg-[#2d7d15] text-white font-chubby font-bold text-sm shadow-duo-green btn-3d cursor-pointer"
                    >
                      Guardar Cambios
                    </button>
                    <button
                      onClick={() => onNavigate('mapa_quechua', 'push')}
                      className="px-6 py-3 rounded-2xl bg-[#2a3691] hover:bg-[#1a2260] text-white font-chubby font-bold text-sm shadow-duo-blue btn-3d cursor-pointer"
                    >
                      Ir a mi Ruta de Aprendizaje
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-center font-bold text-[#454652] py-8">
                  Actualmente estás navegando como invitado. Presiona el botón de arriba &quot;Simular: Iniciar Sesión&quot; para activar tu perfil.
                </p>
              </div>
            )}
          </section>

          {/* RIGHT COL: Live Profile Preview Card */}
          <section className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 border-2 border-[#ede8df] shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-24 h-24 shrink-0 relative">
                  <img
                    alt="Kusi Alpaca"
                    className="w-full h-full object-contain filter drop-shadow-md"
                    src="/images/pancita.png"
                  />
                  <span className="absolute -bottom-1 -right-1 bg-[#ff842c] text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                    Yachaq
                  </span>
                </div>
                <div className="flex-1 bg-[#fff8f6] p-4 rounded-2xl border-2 border-[#ffdbd1]">
                  <div className="flex items-center gap-1.5 mb-1 text-[#f27a21]">
                    <span className="material-symbols-outlined text-[18px]">record_voice_over</span>
                    <span className="font-display font-bold text-xs uppercase">Kusi te dice:</span>
                  </div>
                  <p className="text-sm font-semibold text-[#0e1c7b]">
                    «¡Allillanchu! Crea tu perfil para guardar tu racha de días, ganar medallas Yachay y aprender con nosotros.»
                  </p>
                </div>
              </div>
            </div>

            {/* Profile Card */}
            <div className="bg-white rounded-3xl p-6 border-2 border-[#ede8df] shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-[#ffe9e4]">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#2a3691]">id_card</span>
                  <h2 className="font-display font-bold text-base text-[#0e1c7b]">Previsualización de Perfil</h2>
                </div>
                <span className="bg-[#eef8eb] text-[#3ca21d] text-xs font-bold px-2.5 py-1 rounded-full border border-[#c3e8b7] flex items-center gap-1">
                  Nivel Chanka Kallpa 1
                </span>
              </div>

              {/* Avatar & EXP */}
              <div className="flex items-center gap-4 py-4">
                <div className="relative">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-[#ffe9e4] border-2 border-[#f27a21] p-1 flex items-center justify-center overflow-hidden">
                    <img
                      alt="Avatar"
                      className="w-full h-full object-contain"
                      src="/images/logo.png"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display font-bold text-lg text-[#0e1c7b]">{userName}</h3>
                    <span className="material-symbols-outlined text-[#3ca21d] text-[18px]">verified</span>
                  </div>
                  <p className="text-xs text-[#454652] font-medium">
                    Estudiante de {userLang === 'quechua' ? 'Quechua Chanka' : 'Aimara Central'}
                  </p>
                  <div className="mt-2">
                    <div className="flex justify-between text-[11px] font-bold text-[#454652] mb-1">
                      <span>EXP para Nivel 2</span>
                      <span className="text-[#0e1c7b] font-black">480 / 600 pts</span>
                    </div>
                    <div className="w-full h-3 bg-[#ffe2db] rounded-full overflow-hidden p-0.5">
                      <div className="h-full bg-gradient-to-r from-[#3ca21d] to-[#76de55] rounded-full w-[80%]"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Counters */}
              <div className="grid grid-cols-3 gap-2.5 py-3 border-t border-b border-[#ffe9e4] my-1">
                <div className="bg-[#fff9f4] p-3 rounded-2xl border border-[#ffe4d4] text-center">
                  <div className="flex items-center justify-center text-[#f27a21] mb-1">
                    <span className="material-symbols-outlined material-symbols-fill text-[20px]">
                      local_fire_department
                    </span>
                  </div>
                  <div className="font-display font-bold text-base text-[#9a4600]">5 Días</div>
                  <div className="text-[10px] font-bold text-[#454652] uppercase">Racha de Sol</div>
                </div>
                <div className="bg-[#f4f6ff] p-3 rounded-2xl border border-[#dfe4ff] text-center">
                  <div className="flex items-center justify-center text-[#2a3691] mb-1">
                    <span className="material-symbols-outlined material-symbols-fill text-[20px]">diamond</span>
                  </div>
                  <div className="font-display font-bold text-base text-[#2a3691]">320</div>
                  <div className="text-[10px] font-bold text-[#454652] uppercase">Puntos Yachay</div>
                </div>
                <div className="bg-[#f2faf0] p-3 rounded-2xl border border-[#d6edd1] text-center">
                  <div className="flex items-center justify-center text-[#3ca21d] mb-1">
                    <span className="material-symbols-outlined material-symbols-fill text-[20px]">check_circle</span>
                  </div>
                  <div className="font-display font-bold text-base text-[#104b00]">14</div>
                  <div className="text-[10px] font-bold text-[#454652] uppercase">Lecciones</div>
                </div>
              </div>

              {/* Vitrina de Medallas */}
              <div className="pt-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-display font-bold text-xs uppercase tracking-wider text-[#0e1c7b] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#f27a21] text-[18px]">military_tech</span>
                    Vitrina de Medallas Andinas
                  </h4>
                  <span className="text-[11px] font-bold text-[#f27a21]">Ver todas (8)</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="flex flex-col items-center p-2.5 rounded-2xl bg-[#fdfbf7] border-2 border-[#3ca21d]/30 text-center">
                    <div className="w-12 h-12 rounded-2xl bg-[#3ca21d]/15 text-[#3ca21d] flex items-center justify-center mb-1">
                      <span className="material-symbols-outlined text-2xl">sentiment_satisfied</span>
                    </div>
                    <span className="font-display font-bold text-[11px] text-[#0e1c7b] leading-tight">Primer Saludo</span>
                    <span className="text-[9px] font-black text-[#3ca21d] uppercase mt-0.5">¡GANADA!</span>
                  </div>

                  <div className="flex flex-col items-center p-2.5 rounded-2xl bg-[#fdfbf7] border-2 border-[#2a3691]/30 text-center">
                    <div className="w-12 h-12 rounded-2xl bg-[#2a3691]/15 text-[#2a3691] flex items-center justify-center mb-1">
                      <span className="material-symbols-outlined text-2xl">psychology</span>
                    </div>
                    <span className="font-display font-bold text-[11px] text-[#0e1c7b] leading-tight">Sabio del Ayllu</span>
                    <span className="text-[9px] font-black text-[#2a3691] uppercase mt-0.5">¡GANADA!</span>
                  </div>

                  <div className="flex flex-col items-center p-2.5 rounded-2xl bg-[#fff1ed]/50 border-2 border-dashed border-[#c6c5d4] text-center opacity-80">
                    <div className="w-12 h-12 rounded-2xl bg-[#b43f1d]/10 text-[#b43f1d] flex items-center justify-center mb-1 relative">
                      <span className="material-symbols-outlined text-2xl">nature_people</span>
                      <span className="material-symbols-outlined absolute -bottom-1 -right-1 text-xs text-[#767683] bg-white rounded-full p-0.5">lock</span>
                    </div>
                    <span className="font-display font-bold text-[11px] text-[#454652] leading-tight">Guardián Tierra</span>
                    <span className="text-[9px] font-semibold text-[#767683] uppercase mt-0.5">NIVEL 3 REQ.</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
