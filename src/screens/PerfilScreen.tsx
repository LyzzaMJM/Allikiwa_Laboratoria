import React, { useState, useEffect } from 'react';
import { ScreenId, TransitionType } from '../types';
import { sounds } from '../utils/audio';
import { loadUser, saveUser, clearUser, UserAccount } from '../utils/storage';
import { AppHeader } from '../components/AppHeader';

interface Props {
  onNavigate: (screen: ScreenId, transition?: TransitionType) => void;
  voiceGuideEnabled?: boolean;
  onToggleVoiceGuide?: () => void;
}

export const PerfilScreen: React.FC<Props> = ({
  onNavigate,
  voiceGuideEnabled = true,
  onToggleVoiceGuide,
}) => {
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(null);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('register');
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form states
  const [nombre, setNombre] = useState('Inti Kusikuy');
  const [email, setEmail] = useState('yachachiq@allikiwa.pe');
  const [password, setPassword] = useState('');
  const [targetLang, setTargetLang] = useState<'quechua' | 'aimara'>('quechua');
  const [dailyGoal, setDailyGoal] = useState<'casual' | 'regular' | 'intenso'>('regular');

  useEffect(() => {
    const user = loadUser();
    if (user) {
      setCurrentUser(user);
      setNombre(user.nombre);
      setEmail(user.email);
      setTargetLang(user.targetLang);
      setDailyGoal(user.dailyGoal);
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleRegisterOrLogin = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playSuccess();

    const newUser: UserAccount = {
      nombre: nombre.trim() || 'Estudiante Allikiwa',
      email: email.trim() || 'estudiante@allikiwa.pe',
      targetLang,
      dailyGoal,
      streak: currentUser?.streak || 5,
      gems: currentUser?.gems || 480,
      hearts: currentUser?.hearts || 5,
      isPro: currentUser?.isPro || false,
      createdAt: currentUser?.createdAt || new Date().toISOString(),
    };

    saveUser(newUser);
    setCurrentUser(newUser);

    if (authMode === 'register') {
      showToast('¡Cuenta creada exitosamente en tu almacenamiento local!');
      onNavigate('pro_popup', 'slide_up');
    } else {
      showToast('¡Sesión iniciada con éxito!');
    }
  };

  const handleLogout = () => {
    sounds.playTap();
    clearUser();
    setCurrentUser(null);
    setAuthMode('login');
    showToast('Sesión cerrada. Ahora estás navegando como invitado.');
  };

  return (
    <div className="bg-[#fdfbf7] text-[#3b0900] min-h-screen flex flex-col font-body-md antialiased pb-24">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[#104b00] text-white px-6 py-3.5 rounded-2xl shadow-2xl border-2 border-[#76de55] flex items-center gap-3 animate-bounce">
          <span className="material-symbols-outlined text-[#76de55]">verified</span>
          <span className="font-chubby font-bold text-sm">{toastMessage}</span>
        </div>
      )}

      {/* TOP HEADER */}
      <AppHeader
        onNavigate={onNavigate}
        rightContent={
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => {
                sounds.playTap();
                onNavigate('pro_popup', 'slide_up');
              }}
              className="btn-3d px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-[#f27a21] text-white border-b-2 border-[#c95c10] font-chubby text-xs sm:text-sm font-bold flex items-center gap-1 shadow-xs cursor-pointer shrink-0"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">bolt</span>
              <span>Allikiwa Pro</span>
            </button>

            <button
              onClick={() => {
                sounds.playTap();
                setShowConfigModal(true);
              }}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#f5f1ea] hover:bg-[#ebedfa] text-[#2a3691] border border-[#ede8df] flex items-center justify-center font-bold transition-colors cursor-pointer shrink-0"
              title="Configuración"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px] sm:text-[22px]">settings</span>
            </button>
          </div>
        }
      />

      {/* MAIN CONTENT */}
      <main className="max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 flex-1">
        {currentUser ? (
          /* ================= LOGGED IN PROFILE VIEW ================= */
          <div className="space-y-6">
            {/* User Profile Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#ede8df] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left">
                <div className="relative">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-[#2a3691] to-[#f27a21] p-1 shadow-md">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                      <span className="material-symbols-outlined text-[#2a3691] text-[48px] sm:text-[54px]">
                        face_6
                      </span>
                    </div>
                  </div>
                  <span className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-[#3ca21d] border-2 border-white flex items-center justify-center text-white text-[12px] font-bold">
                    ✓
                  </span>
                </div>

                <div>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                    <h1 className="font-chubby text-2xl sm:text-3xl font-extrabold text-[#2a3691]">
                      {currentUser.nombre}
                    </h1>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#e9f7e5] text-[#2d7d15] font-bold text-xs border border-[#3ca21d]/30">
                      Activo
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-[#8c7e73] mb-2">{currentUser.email}</p>
                  <p className="text-xs font-bold text-[#f27a21] bg-[#fff3e8] px-3 py-1 rounded-xl inline-block border border-[#f27a21]/20">
                    Estudiando: {currentUser.targetLang === 'quechua' ? 'Quechua Chanka' : 'Aimara'}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex sm:flex-col gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setShowConfigModal(true)}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-2xl bg-[#ebedfa] text-[#2a3691] font-chubby text-xs sm:text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#dbe0f7] transition-all cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">tune</span>
                  <span>Ajustes</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-2xl bg-[#fff1ed] text-[#b43f1d] hover:bg-[#ffe2db] font-chubby text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">logout</span>
                  <span>Cerrar sesión</span>
                </button>
              </div>
            </div>

            {/* Gamified Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-[#ede8df] text-center shadow-xs">
                <span className="material-symbols-outlined text-[#f27a21] text-[32px] mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>
                  local_fire_department
                </span>
                <p className="font-chubby text-2xl font-extrabold text-[#2a3691]">{currentUser.streak}</p>
                <p className="text-xs font-bold text-[#8c7e73]">Días de racha</p>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-[#ede8df] text-center shadow-xs">
                <span className="material-symbols-outlined text-[#1cb0f6] text-[32px] mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>
                  diamond
                </span>
                <p className="font-chubby text-2xl font-extrabold text-[#2a3691]">{currentUser.gems}</p>
                <p className="text-xs font-bold text-[#8c7e73]">Gemas ganadas</p>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-[#ede8df] text-center shadow-xs">
                <span className="material-symbols-outlined text-[#ff4b4b] text-[32px] mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>
                  favorite
                </span>
                <p className="font-chubby text-2xl font-extrabold text-[#2a3691]">{currentUser.hearts}/5</p>
                <p className="text-xs font-bold text-[#8c7e73]">Vidas disponibles</p>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-[#ede8df] text-center shadow-xs">
                <span className="material-symbols-outlined text-[#3ca21d] text-[32px] mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>
                  verified
                </span>
                <p className="font-chubby text-2xl font-extrabold text-[#2a3691]">Local</p>
                <p className="text-xs font-bold text-[#8c7e73]">Almacenamiento</p>
              </div>
            </div>

            {/* Quick Access to Learning and Recordings */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                onClick={() => onNavigate('aprender', 'push')}
                className="bg-gradient-to-br from-[#ebedfa] to-white p-5 rounded-3xl border-2 border-[#2a3691]/20 hover:border-[#2a3691] transition-all cursor-pointer shadow-xs group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-[#2a3691] text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-[20px]">school</span>
                  </div>
                  <h3 className="font-chubby text-lg font-bold text-[#2a3691]">Continuar Aprendiendo</h3>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-[#695d52]">
                  Avanza en tu ruta de Quechua Chanka o Aimara con lecciones guiadas y ejercicios.
                </p>
              </div>

              <div
                onClick={() => onNavigate('transcriptor_pdf', 'push')}
                className="bg-gradient-to-br from-[#fff3e8] to-white p-5 rounded-3xl border-2 border-[#f27a21]/20 hover:border-[#f27a21] transition-all cursor-pointer shadow-xs group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-[#f27a21] text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-[20px]">graphic_eq</span>
                  </div>
                  <h3 className="font-chubby text-lg font-bold text-[#f27a21]">Mis Grabaciones y PDF</h3>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-[#695d52]">
                  Revisa tus grabaciones orales en fonética con transcripción y opción de exportar a PDF.
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* ================= NOT LOGGED IN (REGISTER / LOGIN) VIEW ================= */
          <div className="max-w-lg mx-auto bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#ede8df] shadow-sm">
            {/* Header Switcher */}
            <div className="text-center mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ebedfa] text-[#2a3691] font-bold text-xs mb-2">
                Tu cuenta se guarda 100% en tu navegador
              </span>
              <h2 className="font-chubby text-2xl sm:text-3xl font-extrabold text-[#2a3691]">
                {authMode === 'register' ? 'Crea tu cuenta de aprendizaje' : 'Inicia sesión en Allikiwa'}
              </h2>
              <p className="text-xs sm:text-sm font-semibold text-[#8c7e73] mt-1">
                {authMode === 'register'
                  ? 'Guarda tu progreso, racha y grabaciones sin servidores externos.'
                  : 'Recupera tus estadísticas y continúa donde te quedaste.'}
              </p>
            </div>

            {/* Toggle tabs */}
            <div className="flex bg-[#f5f1ea] p-1 rounded-2xl mb-6 border border-[#ede8df]">
              <button
                type="button"
                onClick={() => setAuthMode('register')}
                className={`flex-1 py-2 rounded-xl font-chubby text-xs sm:text-sm font-bold transition-all ${authMode === 'register'
                    ? 'bg-[#2a3691] text-white shadow-xs'
                    : 'text-[#6b5f55] hover:text-[#2a3691]'
                  }`}
              >
                Registrarme
              </button>
              <button
                type="button"
                onClick={() => setAuthMode('login')}
                className={`flex-1 py-2 rounded-xl font-chubby text-xs sm:text-sm font-bold transition-all ${authMode === 'login'
                    ? 'bg-[#2a3691] text-white shadow-xs'
                    : 'text-[#6b5f55] hover:text-[#2a3691]'
                  }`}
              >
                Ya tengo cuenta
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleRegisterOrLogin} className="space-y-4">
              <div>
                <label className="block font-chubby text-xs font-bold text-[#6b5f55] uppercase tracking-wider mb-1">
                  Tu Nombre o Apodo
                </label>
                <input
                  type="text"
                  required
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Ej: Inti Kusikuy"
                  className="w-full px-4 py-3 rounded-2xl border-2 border-[#ede8df] focus:border-[#2a3691] font-bold text-sm text-[#2b201a] outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block font-chubby text-xs font-bold text-[#6b5f55] uppercase tracking-wider mb-1">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ejemplo@allikiwa.pe"
                  className="w-full px-4 py-3 rounded-2xl border-2 border-[#ede8df] focus:border-[#2a3691] font-bold text-sm text-[#2b201a] outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block font-chubby text-xs font-bold text-[#6b5f55] uppercase tracking-wider mb-1">
                  Contraseña (opcional para almacenamiento local)
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-4 py-3 rounded-2xl border-2 border-[#ede8df] focus:border-[#2a3691] font-bold text-sm text-[#2b201a] outline-none transition-colors"
                />
              </div>

              {authMode === 'register' && (
                <>
                  <div>
                    <label className="block font-chubby text-xs font-bold text-[#6b5f55] uppercase tracking-wider mb-1">
                      ¿Qué lengua originaria deseas aprender primero?
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setTargetLang('quechua')}
                        className={`p-3 rounded-2xl border-2 font-chubby text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all ${targetLang === 'quechua'
                            ? 'border-[#2a3691] bg-[#ebedfa] text-[#2a3691]'
                            : 'border-[#ede8df] text-[#6b5f55]'
                          }`}
                      >
                        <span>Quechua Chanka</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setTargetLang('aimara')}
                        className={`p-3 rounded-2xl border-2 font-chubby text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all ${targetLang === 'aimara'
                            ? 'border-[#f27a21] bg-[#fff3e8] text-[#f27a21]'
                            : 'border-[#ede8df] text-[#6b5f55]'
                          }`}
                      >
                        <span>Aimara</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block font-chubby text-xs font-bold text-[#6b5f55] uppercase tracking-wider mb-1">
                      Meta de estudio diario
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['casual', 'regular', 'intenso'] as const).map((goal) => (
                        <button
                          key={goal}
                          type="button"
                          onClick={() => setDailyGoal(goal)}
                          className={`p-2.5 rounded-2xl border-2 font-chubby text-xs font-bold capitalize transition-all ${dailyGoal === goal
                              ? 'border-[#3ca21d] bg-[#e9f7e5] text-[#2d7d15]'
                              : 'border-[#ede8df] text-[#6b5f55]'
                            }`}
                        >
                          {goal}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-[#f27a21] text-white border-b-4 border-[#c95c10] shadow-duo-orange font-chubby text-base font-bold btn-3d cursor-pointer hover:brightness-105 transition-all mt-4"
              >
                {authMode === 'register' ? 'Crear cuenta y comenzar' : 'Iniciar sesión'}
              </button>
            </form>
          </div>
        )}
      </main>

      {/* ================= CONFIGURATION & ACCESSIBILITY MODAL ================= */}
      {showConfigModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2b201a]/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border-4 border-[#ede8df] shadow-2xl max-w-md w-full p-6 relative">
            <div className="flex justify-between items-center pb-3 border-b-2 border-[#ede8df] mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#ebedfa] text-[#2a3691] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[22px]">settings</span>
                </div>
                <h3 className="font-chubby text-lg font-bold text-[#2a3691]">Configuración y Accesibilidad</h3>
              </div>
              <button
                onClick={() => setShowConfigModal(false)}
                className="w-9 h-9 rounded-xl bg-[#f5f1ea] text-[#6b5f55] hover:text-[#b43f1d] flex items-center justify-center font-bold cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="space-y-4">
              {/* Voice Guide Toggle */}
              <div className="p-4 rounded-2xl bg-[#fffcf5] border-2 border-[#ede8df] flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#3ca21d]/10 text-[#3ca21d] flex items-center justify-center">
                    <span className="material-symbols-outlined text-[22px]">record_voice_over</span>
                  </div>
                  <div>
                    <h4 className="font-chubby text-sm font-bold text-[#2a3691]">Modo 100% Voz Accesible</h4>
                    <p className="text-xs text-[#8c7e73] font-semibold">Para comunicarse sin necesidad de leer o escribir</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    sounds.playTap();
                    if (onToggleVoiceGuide) onToggleVoiceGuide();
                  }}
                  className={`w-12 h-7 rounded-full p-1 transition-colors cursor-pointer ${voiceGuideEnabled ? 'bg-[#3ca21d]' : 'bg-[#d6d1c4]'
                    }`}
                  type="button"
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white transition-transform ${voiceGuideEnabled ? 'translate-x-5' : 'translate-x-0'
                      }`}
                  />
                </button>
              </div>

              {/* Direct Link to Voice Accessible Screen */}
              <button
                onClick={() => {
                  setShowConfigModal(false);
                  onNavigate('voz_accesible', 'push');
                }}
                className="w-full p-3 rounded-2xl bg-[#ebedfa] hover:bg-[#dbe0f7] text-[#2a3691] font-chubby text-xs sm:text-sm font-bold flex items-center justify-between cursor-pointer transition-all"
                type="button"
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px]">hearing</span>
                  <span>Abrir pantalla de modo accesible</span>
                </div>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>

              {/* Membership Pro */}
              <button
                onClick={() => {
                  setShowConfigModal(false);
                  onNavigate('pro_popup', 'slide_up');
                }}
                className="w-full p-3 rounded-2xl bg-[#fff3e8] hover:bg-[#ffe2db] text-[#f27a21] border border-[#f27a21]/30 font-chubby text-xs sm:text-sm font-bold flex items-center justify-between cursor-pointer transition-all"
                type="button"
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px]">bolt</span>
                  <span>Membresía Allikiwa Pro (S/ 20/mes)</span>
                </div>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>

              {/* Storage Info */}
              <div className="p-3 rounded-xl bg-[#f5f1ea] text-[11px] text-[#6b5f55] font-semibold flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#3ca21d]">cloud_off</span>
                <span>Datos y grabaciones 100% locales en tu dispositivo.</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

