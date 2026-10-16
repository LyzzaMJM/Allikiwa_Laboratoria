import React, { useState } from 'react';
import { ScreenId, TransitionType } from '../types';
import { sounds } from '../utils/audio';

interface Props {
  onNavigate: (screen: ScreenId, transition?: TransitionType) => void;
}

export const PerfilRegistroScreen: React.FC<Props> = ({ onNavigate }) => {
  const [authMode, setAuthMode] = useState<'register' | 'login'>('register');
  const [nombre, setNombre] = useState('Inti Kusikuy');
  const [email, setEmail] = useState('yachachiq@allikiwa.pe');
  const [password, setPassword] = useState('••••••••••••');
  const [targetLang, setTargetLang] = useState<'quechua' | 'aimara'>('quechua');
  const [dailyGoal, setDailyGoal] = useState<'casual' | 'regular' | 'intenso'>('regular');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playSuccess();
    onNavigate('perfil_dinamico', 'push');
  };

  return (
    <div className="bg-[#fdfbf7] text-[#3b0900] min-h-screen flex flex-col font-body-md antialiased">
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
                className="w-10 h-10 sm:w-12 sm:h-12 object-contain rounded-2xl drop-shadow-sm group-hover:rotate-6 transition-transform duration-200"
                src="/images/logo.png"
              />
              <span className="font-display text-[26px] font-bold text-[#f27a21] tracking-tight">Allikiwa</span>
            </a>
            <div className="hidden lg:block h-6 w-[2px] bg-[#c6c5d4]/30 mx-1"></div>
            <span className="hidden lg:inline-block font-body-sm font-semibold text-[#454652] text-xs max-w-[260px] leading-tight">
              Aprende, practica y conecta con nuestras lenguas
            </span>
          </div>

          {/* Navigation Links */}
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

          {/* Trailing Stats */}
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold bg-[#ffe2db] text-[#9a4600]">
              <span className="material-symbols-outlined material-symbols-fill text-[#f27a21] text-[20px]">
                local_fire_department
              </span>
              <span className="text-sm font-black text-[#9a4600]">0</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold bg-[#eef3ff] text-[#2a3691] border border-[#d6e2ff]">
              <span className="material-symbols-outlined material-symbols-fill text-[#2a3691] text-[18px]">diamond</span>
              <span className="text-sm font-black text-[#2a3691]">0</span>
            </div>
            <button
              aria-label="Perfil y racha"
              onClick={() => onNavigate('perfil_dinamico', 'push')}
              className="border-b-2 border-[#0e1c7b] text-[#0e1c7b] font-bold text-sm flex items-center gap-2 py-1 pl-1 cursor-pointer"
            >
              <div className="w-9 h-9 rounded-2xl bg-[#ffe2db] border-2 border-dashed border-[#c6c5d4] p-0.5 flex items-center justify-center text-[#767683]">
                <span className="material-symbols-outlined text-[20px]">account_circle</span>
              </div>
              <span className="hidden sm:inline">Invitado</span>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CANVAS */}
      <main className="flex-grow max-w-[1200px] w-full mx-auto px-4 md:px-10 py-6 md:py-10">
        {/* Banner with PRO CTA link */}
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
                Únete a más de 12,500 estudiantes revitalizando el Quechua Chanka y el Aimara con métodos interactivos.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            {/* The spec requires //a[@href='#activar-pro'] */}
            <a
              href="#activar-pro"
              onClick={(e) => {
                e.preventDefault();
                sounds.playTap();
                onNavigate('pro_popup', 'slide_up');
              }}
              className="px-4 py-2 rounded-2xl bg-[#f27a21] hover:bg-[#e06c15] text-white font-chubby font-bold text-sm shadow-duo-orange btn-3d flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">bolt</span>
              <span>Membresía Pro (S/ 20/mes)</span>
            </a>
            <span className="px-3 py-1 bg-white/90 text-[#2a3691] text-xs rounded-full border border-[#2a3691]/20 font-bold uppercase tracking-wider hidden sm:flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#3ca21d] animate-pulse"></span>
              Plataforma Abierta 2024
            </span>
          </div>
        </div>

        {/* Dual Column Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COL: AUTH FORM */}
          <section className="lg:col-span-7 bg-white rounded-3xl p-6 md:p-8 border-2 border-[#ede8df] shadow-[0_4px_20px_-4px_rgba(42,54,145,0.07)] relative">
            <div className="flex p-1.5 bg-[#fff1ed] rounded-2xl border border-[#ede8df] mb-6">
              <button
                className={`flex-1 py-3 text-center rounded-xl font-display font-bold text-sm md:text-base transition-all ${
                  authMode === 'register' ? 'bg-white text-[#0e1c7b] shadow-sm' : 'text-[#454652] hover:text-[#0e1c7b]'
                }`}
                onClick={() => setAuthMode('register')}
                type="button"
              >
                Crear cuenta nueva
              </button>
              <button
                className={`flex-1 py-3 text-center rounded-xl font-display font-bold text-sm md:text-base transition-all ${
                  authMode === 'login' ? 'bg-white text-[#0e1c7b] shadow-sm' : 'text-[#454652] hover:text-[#0e1c7b]'
                }`}
                onClick={() => setAuthMode('login')}
                type="button"
              >
                Iniciar sesión
              </button>
            </div>

            {/* Social Logins */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                className="py-3 px-4 rounded-2xl border-2 border-[#ede8df] bg-white hover:bg-[#fff9f6] flex items-center justify-center gap-2 font-display text-sm font-bold text-[#3b0900] shadow-sm cursor-pointer"
                onClick={() => onNavigate('perfil_dinamico', 'push')}
                type="button"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z" fill="#4285F4" />
                  <path d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.25 21.36 7.34 24 12 24z" fill="#34A853" />
                  <path d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.17 0 9.97 0 12s.45 3.83 1.25 5.42l4.03-3.15z" fill="#FBBC05" />
                  <path d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.25 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" fill="#EA4335" />
                </svg>
                <span>Google</span>
              </button>
              <button
                className="py-3 px-4 rounded-2xl border-2 border-[#ede8df] bg-white hover:bg-[#fff9f6] flex items-center justify-center gap-2 font-display text-sm font-bold text-[#3b0900] shadow-sm cursor-pointer"
                onClick={() => onNavigate('perfil_dinamico', 'push')}
                type="button"
              >
                <span className="material-symbols-outlined text-[20px] text-[#2a3691]">hub</span>
                <span>Ayllu ID</span>
              </button>
            </div>

            <div className="relative flex py-2 items-center mb-6">
              <div className="flex-grow border-t border-[#ffe2db]"></div>
              <span className="flex-shrink mx-4 text-xs font-bold text-[#767683] uppercase tracking-widest bg-white px-2">
                o con tu correo
              </span>
              <div className="flex-grow border-t border-[#ffe2db]"></div>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              {authMode === 'register' && (
                <div className="space-y-1.5">
                  <label className="block font-display text-sm font-bold text-[#0e1c7b] flex items-center justify-between">
                    <span>Nombre de aventurero</span>
                    <span className="text-xs font-normal text-[#454652]">Tu apodo en la comunidad</span>
                  </label>
                  <div className="relative rounded-2xl overflow-hidden">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#767683]">badge</span>
                    <input
                      className="w-full pl-12 pr-4 py-3.5 bg-[#fff1ed]/60 rounded-2xl border-2 border-[#ede8df] focus:border-[#ff842c] focus:bg-white text-[#3b0900] font-semibold text-base transition-all"
                      placeholder="Ej. Kusi, Wayra o Mayu"
                      type="text"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="block font-display text-sm font-bold text-[#0e1c7b]">
                  Correo electrónico
                </label>
                <div className="relative rounded-2xl overflow-hidden">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#767683]">alternate_email</span>
                  <input
                    className="w-full pl-12 pr-4 py-3.5 bg-[#fff1ed]/60 rounded-2xl border-2 border-[#ede8df] focus:border-[#ff842c] focus:bg-white text-[#3b0900] font-semibold text-base transition-all"
                    placeholder="tu_correo@ejemplo.com"
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block font-display text-sm font-bold text-[#0e1c7b] flex items-center justify-between">
                  <span>Contraseña secreta</span>
                  <a className="text-xs font-bold text-[#f27a21] hover:underline" href="#">¿Olvidaste tu clave?</a>
                </label>
                <div className="relative rounded-2xl overflow-hidden">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#767683]">lock</span>
                  <input
                    className="w-full pl-12 pr-12 py-3.5 bg-[#fff1ed]/60 rounded-2xl border-2 border-[#ede8df] focus:border-[#ff842c] focus:bg-white text-[#3b0900] font-semibold text-base transition-all"
                    placeholder="Mínimo 8 caracteres"
                    required
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button className="absolute right-4 top-1/2 -translate-y-1/2 text-[#767683]" type="button">
                    <span className="material-symbols-outlined text-[20px]">visibility</span>
                  </button>
                </div>
              </div>

              {authMode === 'register' && (
                <>
                  <div className="space-y-2 pt-1">
                    <label className="block font-display text-sm font-bold text-[#0e1c7b]">
                      ¿Qué lengua originaria deseas aprender primero?
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <label className="cursor-pointer relative" onClick={() => setTargetLang('quechua')}>
                        <div className={`p-3.5 rounded-2xl border-2 transition-all flex items-center gap-3 ${
                          targetLang === 'quechua' ? 'border-[#2a3691] bg-[#2a3691]/5 shadow-sm' : 'border-[#ede8df]'
                        }`}>
                          <div className="w-9 h-9 rounded-xl bg-[#2a3691] text-white flex items-center justify-center font-black text-sm">
                            Q
                          </div>
                          <div>
                            <div className="font-display font-bold text-sm text-[#0e1c7b]">Quechua Chanka</div>
                            <div className="text-[11px] font-semibold text-[#454652]">Ayacucho / Apurímac</div>
                          </div>
                        </div>
                      </label>
                      <label className="cursor-pointer relative" onClick={() => setTargetLang('aimara')}>
                        <div className={`p-3.5 rounded-2xl border-2 transition-all flex items-center gap-3 ${
                          targetLang === 'aimara' ? 'border-[#3ca21d] bg-[#3ca21d]/5 shadow-sm' : 'border-[#ede8df]'
                        }`}>
                          <div className="w-9 h-9 rounded-xl bg-[#3ca21d] text-white flex items-center justify-center font-black text-sm">
                            A
                          </div>
                          <div>
                            <div className="font-display font-bold text-sm text-[#083200]">Aimara Central</div>
                            <div className="text-[11px] font-semibold text-[#454652]">Puno / Lago Titicaca</div>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-2 pt-1">
                    <label className="block font-display text-sm font-bold text-[#0e1c7b] flex items-center justify-between">
                      <span>Elige tu meta diaria de aprendizaje</span>
                      <span className="text-xs font-semibold text-[#f27a21]">¡Ganas 2x gemas!</span>
                    </label>
                    <div className="grid grid-cols-3 gap-2.5">
                      {(['casual', 'regular', 'intenso'] as const).map((g) => (
                        <div
                          key={g}
                          onClick={() => setDailyGoal(g)}
                          className={`p-2.5 text-center rounded-2xl border-2 cursor-pointer transition-all ${
                            dailyGoal === g ? 'border-[#ff842c] bg-[#fff5ee] shadow-sm' : 'border-[#ede8df]'
                          }`}
                        >
                          <div className="font-display font-bold text-xs text-[#ff842c] capitalize">{g}</div>
                          <div className="font-black text-sm text-[#3b0900]">
                            {g === 'casual' ? '5 min' : g === 'regular' ? '10 min' : '15 min'}
                            <span className="text-[10px] font-normal text-[#454652]">/día</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <div className="pt-3">
                <button
                  className="w-full py-4 px-6 rounded-2xl text-white font-display font-bold text-lg tracking-wide uppercase flex items-center justify-center gap-2 cursor-pointer bg-[#f27a21] hover:bg-[#e06c15] shadow-duo-orange btn-3d"
                  type="submit"
                >
                  <span>{authMode === 'register' ? '¡COMENZAR MI AVENTURA!' : 'INICIAR SESIÓN'}</span>
                  <span className="material-symbols-outlined material-symbols-fill text-2xl">
                    {authMode === 'register' ? 'rocket_launch' : 'login'}
                  </span>
                </button>
              </div>

              <p className="text-center font-body-sm text-[12px] text-[#454652]/80 pt-1">
                Al registrarte en Allikiwa, aceptas nuestras{' '}
                <a className="underline text-[#0e1c7b] font-semibold" href="#">Condiciones de Aprendizaje</a> y{' '}
                <a className="underline text-[#0e1c7b] font-semibold" href="#">Políticas del Ayllu</a>.
              </p>
            </form>
          </section>

          {/* RIGHT COL: MASCOT & BENEFITS / PRO TEASER */}
          <section className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 border-2 border-[#ede8df] shadow-[0_4px_20px_-4px_rgba(42,54,145,0.06)] relative overflow-hidden">
              <div className="flex items-start gap-4">
                <div className="w-28 h-28 md:w-32 md:h-32 shrink-0 relative">
                  <img
                    alt="Pancita la mascota oficial de Allikiwa"
                    className="w-full h-full object-contain filter drop-shadow-md hover:scale-105 transition-transform duration-300"
                    src="/images/pancita.png"
                  />
                  <span className="absolute -bottom-1 -right-1 bg-[#ff842c] text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Yachaq
                  </span>
                </div>
                <div className="flex-1 bg-[#fff8f6] p-4 rounded-2xl border-2 border-[#ffdbd1] relative">
                  <div className="flex items-center gap-1.5 mb-1 text-[#f27a21]">
                    <span className="material-symbols-outlined material-symbols-fill text-[18px]">record_voice_over</span>
                    <span className="font-display font-bold text-xs uppercase tracking-wider">Kusi te dice:</span>
                  </div>
                  <p className="font-body-md text-sm font-semibold text-[#0e1c7b] leading-snug">
                    «¡Allillanchu! Crea tu perfil para guardar tu racha de días, ganar medallas Yachay y aprender con nosotros.»
                  </p>
                </div>
              </div>
            </div>

            {/* Benefits & Pro Hook */}
            <div className="bg-white rounded-3xl p-6 border-2 border-[#ede8df] shadow-[0_4px_20px_-4px_rgba(42,54,145,0.06)] relative">
              <div className="flex items-center justify-between pb-4 border-b border-[#ffe9e4]">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#f27a21]">stars</span>
                  <h2 className="font-display font-bold text-base text-[#0e1c7b]">¿Por qué tener tu cuenta en Allikiwa?</h2>
                </div>
                <span className="bg-[#fff0e6] text-[#b44f0b] text-xs font-bold px-2.5 py-1 rounded-full border border-[#ffd2b3] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">lock</span>
                  Perfil bloqueado
                </span>
              </div>

              <div className="py-4 space-y-3.5">
                <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#fff9f4] border border-[#ffe4d4]">
                  <div className="w-10 h-10 rounded-xl bg-[#ff842c]/15 text-[#f27a21] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined material-symbols-fill text-2xl">local_fire_department</span>
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-[#9a4600]">Guarda tu Racha de Sol</h4>
                    <p className="text-xs text-[#454652]">No pierdas tus días continuos de práctica. Mantén el hábito vivo cada día.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#f4f6ff] border border-[#dfe4ff]">
                  <div className="w-10 h-10 rounded-xl bg-[#2a3691]/15 text-[#2a3691] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined material-symbols-fill text-2xl">military_tech</span>
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-[#2a3691]">Colecciona Medallas y Gemas Yachay</h4>
                    <p className="text-xs text-[#454652]">Desbloquea insignias culturales y sube de nivel Kallpa completando lecciones.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#f2faf0] border border-[#d6edd1]">
                  <div className="w-10 h-10 rounded-xl bg-[#3ca21d]/15 text-[#3ca21d] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined material-symbols-fill text-2xl">sync_saved_locally</span>
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-[#104b00]">Sincroniza Quechua y Aimara</h4>
                    <p className="text-xs text-[#454652]">Tu progreso fonético, vocabulario y notas comunitarias seguras en cualquier dispositivo.</p>
                  </div>
                </div>
              </div>

              {/* Callout with link to Pro Pop-up */}
              <div className="mt-2 p-4 rounded-2xl bg-gradient-to-r from-[#ffe9e4] to-white border-2 border-[#f27a21] flex items-center justify-between">
                <div>
                  <div className="font-display font-bold text-sm text-[#2a3691]">¿Quieres traducciones ilimitadas?</div>
                  <div className="text-xs text-[#753400]">Desbloquea Allikiwa Pro por S/ 20 al mes</div>
                </div>
                <a
                  href="#activar-pro"
                  onClick={(e) => {
                    e.preventDefault();
                    sounds.playTap();
                    onNavigate('pro_popup', 'slide_up');
                  }}
                  className="px-4 py-2 rounded-xl bg-[#f27a21] hover:bg-[#e06c15] text-white font-display font-bold text-xs shadow-sm flex items-center gap-1 cursor-pointer"
                >
                  <span>Ver Pro</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* CULTURAL FOOTER */}
      <footer className="bg-[#fff1ed] border-t border-[#ffe2db] mt-10">
        <div className="w-full max-w-[1200px] mx-auto px-4 md:px-10 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col md:flex-row items-center gap-3 text-center md:text-left">
            <span className="font-headline-sm text-headline-sm font-bold text-[#9a4600]">Allikiwa</span>
            <span className="hidden md:inline text-[#c6c5d4]">•</span>
            <p className="text-xs text-[#454652]">
              © 2024 Allikiwa. Promoviendo el Quechua Chanka y Aimara. Todos los derechos reservados.
            </p>
          </div>
          <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs font-semibold text-[#454652]">
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
