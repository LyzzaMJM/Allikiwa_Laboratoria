import React, { useState } from 'react';
import { ScreenId, TransitionType } from '../types';
import { AppHeader } from '../components/AppHeader';
import { MapaQuechuaScreen } from './MapaQuechuaScreen';
import { RutaAimaraScreen } from './RutaAimaraScreen';
import { CuadernoRepasoScreen } from './CuadernoRepasoScreen';
import {
  LanguageSelectorModal,
  SupportedLanguage,
} from '../components/LanguageSelectorModal';
import {
  LevelConfigModal,
  UserLevelType,
  LEVEL_LABELS,
} from '../components/LevelConfigModal';
import { sounds } from '../utils/audio';

interface Props {
  onNavigate: (screen: ScreenId, transition?: TransitionType) => void;
  initialTab?: SupportedLanguage;
}

export const AprenderScreen: React.FC<Props> = ({ onNavigate, initialTab = 'quechua' }) => {
  const [activeTab, setActiveTab] = useState<SupportedLanguage>(initialTab);
  const [previousLanguageTab, setPreviousLanguageTab] = useState<SupportedLanguage>('quechua');

  // Nivel de conocimiento del usuario (Independiente de la lengua)
  const [userLevel, setUserLevel] = useState<UserLevelType>('desde_cero');

  // Variantes lingüísticas
  const [quechuaVariant, setQuechuaVariant] = useState<'chanka' | 'collao'>('chanka');
  const [aimaraVariant, setAimaraVariant] = useState<'central' | 'lupaca'>('central');

  // Modales
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState<boolean>(false);
  const [isLevelModalOpen, setIsLevelModalOpen] = useState<boolean>(false);

  // Manejador central de selección de lengua desde el modal
  const handleSelectLanguage = (lang: SupportedLanguage, variant?: string) => {
    if (lang === 'quechua') {
      setActiveTab('quechua');
      setPreviousLanguageTab('quechua');
      if (variant === 'collao' || variant === 'chanka') {
        setQuechuaVariant(variant);
      }
    } else if (lang === 'aimara') {
      setActiveTab('aimara');
      setPreviousLanguageTab('aimara');
      if (variant === 'lupaca' || variant === 'central') {
        setAimaraVariant(variant);
      }
    } else if (lang === 'awajun') {
      setActiveTab('awajun');
      setPreviousLanguageTab('awajun');
    } else if (lang === 'repaso') {
      setActiveTab('repaso');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Custom onNavigate wrapper to handle tab switches within Aprender seamlessly
  const handleChildNavigate = (screen: ScreenId, transition?: TransitionType) => {
    if (screen === 'mapa_quechua') {
      setActiveTab('quechua');
      setPreviousLanguageTab('quechua');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (screen === 'ruta_aimara') {
      setActiveTab('aimara');
      setPreviousLanguageTab('aimara');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (screen === 'cuaderno_repaso') {
      setActiveTab('repaso');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    // All other navigations (exercises, overlays, profile, etc.) are delegated
    onNavigate(screen, transition);
  };

  // Etiqueta de la lengua actual visible en el navbar
  const getCurrentLanguageLabel = () => {
    if (activeTab === 'quechua') {
      return quechuaVariant === 'collao' ? 'Quechua Collao' : 'Quechua Chanka';
    }
    if (activeTab === 'aimara') {
      return aimaraVariant === 'lupaca' ? 'Aimara Lupaca' : 'Aimara Central';
    }
    if (activeTab === 'awajun') {
      return 'Awajún';
    }
    return 'Cuaderno de Repaso';
  };

  return (
    <div className="min-h-screen bg-[#fff8f6] flex flex-col pb-20">
      {/* ========================================================================= */}
      {/* NAVBAR UNIFICADO Y LIMPIO: LOGO + LENGUA ACTUAL + BOTÓN CAMBIAR LENGUA     */}
      {/* ========================================================================= */}
      <AppHeader
        onNavigate={onNavigate}
        leftContent={
          activeTab === 'repaso' ? (
            <button
              onClick={() => {
                sounds.playTap();
                setActiveTab(previousLanguageTab);
              }}
              className="btn-3d flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#fff1ed] hover:bg-[#ffe9e4] border border-[#ffe2db] text-[#2a3691] font-chubby text-xs sm:text-sm font-bold cursor-pointer"
              title="Volver a la ruta de aprendizaje"
              type="button"
            >
              <span className="material-symbols-outlined text-base">arrow_back</span>
              <span>← Volver</span>
            </button>
          ) : undefined
        }
        rightContent={
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* 1. Nombre de la lengua actual (Chip estilizado) */}
            <div
              onClick={() => {
                sounds.playTap();
                setIsLanguageModalOpen(true);
              }}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-2xl bg-[#fff1ed] border border-[#ffe2db] text-[#0e1c7b] hover:bg-[#ffe9e4] transition-colors cursor-pointer select-none"
              title="Lengua actual de estudio"
            >
              <span className="material-symbols-outlined text-base text-[#f27a21]">translate</span>
              <span className="font-chubby font-bold text-xs sm:text-sm">
                {getCurrentLanguageLabel()}
              </span>
            </div>

            {/* 2. Botón Cambiar lengua */}
            <button
              onClick={() => {
                sounds.playTap();
                setIsLanguageModalOpen(true);
              }}
              className="btn-3d flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-2xl bg-[#2a3691] hover:bg-[#202b74] text-white font-chubby text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer"
              type="button"
              title="Abrir selector de lenguas"
            >
              <span className="material-symbols-outlined text-base sm:text-lg">swap_horiz</span>
              <span className="hidden xs:inline">Cambiar lengua</span>
            </button>

            {/* 3. Icono de Configuración de Nivel (Engranaje) */}
            <button
              onClick={() => {
                sounds.playTap();
                setIsLevelModalOpen(true);
              }}
              className="btn-3d w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-[#fff1ed] hover:bg-[#ffe9e4] border border-[#ffe2db] text-[#454652] hover:text-[#0e1c7b] flex items-center justify-center transition-colors cursor-pointer"
              title={`Configurar nivel (Nivel actual: ${LEVEL_LABELS[userLevel]})`}
              type="button"
            >
              <span className="material-symbols-outlined text-lg sm:text-xl">settings</span>
            </button>

            {/* 4. Gamificación: Racha, Cristales, Vidas (Visibles en pantallas medianas+) */}
            <div className="hidden md:flex items-center gap-2 pl-2 border-l border-[#ede8df]">
              {/* Racha */}
              <div
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-[#fff1ed] border border-[#ffe2db] shadow-xs"
                title="Días de racha de estudio"
              >
                <span className="material-symbols-outlined text-[#f27a21] font-variation-fill text-base">
                  local_fire_department
                </span>
                <span className="font-bold text-xs text-[#9a4600]">5</span>
              </div>

              {/* Cristales */}
              <div
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-[#fff1ed] border border-[#ffe2db] shadow-xs"
                title="Cristales de sabiduría"
              >
                <span className="material-symbols-outlined text-[#1cb0f6] font-variation-fill text-base">
                  diamond
                </span>
                <span className="font-bold text-xs text-[#0e1c7b]">480</span>
              </div>

              {/* Vidas */}
              <div
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-[#fff1ed] border border-[#ffe2db] shadow-xs"
                title="Vidas restantes"
              >
                <span className="material-symbols-outlined text-[#ff4b4b] font-variation-fill text-base">
                  favorite
                </span>
                <span className="font-bold text-xs text-[#d83a3a]">5/5</span>
              </div>
            </div>
          </div>
        }
      />

      {/* ========================================================================= */}
      {/* CONTENIDO PRINCIPAL SEGÚN LA LENGUA O PANTALLA ACTIVA                     */}
      {/* ========================================================================= */}
      <div className="flex-1">
        {/* QUECHUA */}
        {activeTab === 'quechua' && (
          <MapaQuechuaScreen
            onNavigate={handleChildNavigate}
            userLevel={userLevel}
            variant={quechuaVariant}
            onOpenLanguageModal={() => setIsLanguageModalOpen(true)}
            onOpenLevelModal={() => setIsLevelModalOpen(true)}
            showHeader={false}
          />
        )}

        {/* AIMARA */}
        {activeTab === 'aimara' && (
          <RutaAimaraScreen
            onNavigate={handleChildNavigate}
            userLevel={userLevel}
            variant={aimaraVariant}
            onOpenLanguageModal={() => setIsLanguageModalOpen(true)}
            onOpenLevelModal={() => setIsLevelModalOpen(true)}
            showHeader={false}
          />
        )}

        {/* CUADERNO DE REPASO */}
        {activeTab === 'repaso' && (
          <CuadernoRepasoScreen
            onNavigate={handleChildNavigate}
            onBackToLearn={() => setActiveTab(previousLanguageTab)}
            showHeader={false}
          />
        )}

        {/* LENGUA AWAJÚN (EN CONSTRUCCIÓN) */}
        {activeTab === 'awajun' && (
          <main className="flex-grow w-full max-w-[900px] mx-auto px-4 md:px-10 py-10">
            <div className="bg-white rounded-3xl border-2 border-[#86efac] p-6 sm:p-10 shadow-duo-card text-center relative overflow-hidden">
              
              {/* Badge superior */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f0fdf4] border border-[#86efac] text-[#00604f] font-chubby text-xs sm:text-sm font-bold mb-6">
                <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e] animate-ping" />
                <span>Pueblo Originario Awajún • Amazonía del Perú</span>
              </div>

              {/* Ícono de construcción */}
              <div className="w-28 h-28 sm:w-36 sm:h-36 mx-auto rounded-full bg-gradient-to-tr from-[#dcfce7] to-[#bbf7d0] border-4 border-white shadow-lg flex items-center justify-center p-4 mb-6">
                <span className="material-symbols-outlined text-[64px] sm:text-[80px] text-[#00604f]">
                  construction
                </span>
              </div>

              <h1 className="font-chubby text-2xl sm:text-4xl font-extrabold text-[#00604f] tracking-tight mb-3">
                ¡Estamos trabajando en la lengua Awajún!
              </h1>
              
              <p className="font-body-md text-sm sm:text-base text-[#4b5563] max-w-xl mx-auto leading-relaxed mb-8">
                Actualmente estamos coordinando y recopilando registros orales, fonética y vocabulario cultural
                junto con sabios y docentes bilingües de las comunidades Awajún de Amazonas, Loreto, Cajamarca y San Martín.
              </p>

              {/* Tarjetas informativas del avance */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl mx-auto mb-8 text-left">
                <div className="bg-[#f0fdf4] p-4 rounded-2xl border border-[#bbf7d0]">
                  <span className="material-symbols-outlined text-[#00604f] text-2xl mb-1">record_voice_over</span>
                  <h3 className="font-chubby text-sm font-bold text-[#00604f]">Vocabulario Oral</h3>
                  <p className="text-xs text-[#4b5563] mt-0.5">En proceso de validación fonética con hablantes nativos.</p>
                </div>

                <div className="bg-[#f0fdf4] p-4 rounded-2xl border border-[#bbf7d0]">
                  <span className="material-symbols-outlined text-[#00604f] text-2xl mb-1">menu_book</span>
                  <h3 className="font-chubby text-sm font-bold text-[#00604f]">Alfabeto Oficial</h3>
                  <p className="text-xs text-[#4b5563] mt-0.5">Basado en la resolución ministerial de normalización lingüística.</p>
                </div>

                <div className="bg-[#f0fdf4] p-4 rounded-2xl border border-[#bbf7d0]">
                  <span className="material-symbols-outlined text-[#00604f] text-2xl mb-1">diversity_3</span>
                  <h3 className="font-chubby text-sm font-bold text-[#00604f]">Comunidad EIB</h3>
                  <p className="text-xs text-[#4b5563] mt-0.5">Construido con enfoque de Educación Intercultural Bilingüe.</p>
                </div>
              </div>

              {/* Botones para alternar de lengua */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    sounds.playTap();
                    setActiveTab('quechua');
                  }}
                  className="btn-3d px-6 py-3 rounded-2xl bg-[#2a3691] text-white font-chubby text-sm font-bold shadow-duo-blue flex items-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-lg">eco</span>
                  <span>Practicar Quechua mientras tanto</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    sounds.playTap();
                    setActiveTab('aimara');
                  }}
                  className="btn-3d px-6 py-3 rounded-2xl bg-[#f27a21] text-white font-chubby text-sm font-bold shadow-duo-orange flex items-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-lg">landscape</span>
                  <span>Practicar Aimara</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    sounds.playTap();
                    setIsLanguageModalOpen(true);
                  }}
                  className="btn-3d px-5 py-3 rounded-2xl bg-white border-2 border-[#ede8df] text-[#454652] hover:bg-[#fff1ed] font-chubby text-sm font-bold flex items-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-lg">swap_horiz</span>
                  <span>Ver todas las lenguas</span>
                </button>
              </div>

            </div>
          </main>
        )}
      </div>

      {/* ========================================================================= */}
      {/* MODAL SELECTOR DE LENGUAS DISPONIBLES                                     */}
      {/* ========================================================================= */}
      <LanguageSelectorModal
        isOpen={isLanguageModalOpen}
        onClose={() => setIsLanguageModalOpen(false)}
        currentLanguage={activeTab}
        currentVariant={activeTab === 'quechua' ? quechuaVariant : activeTab === 'aimara' ? aimaraVariant : undefined}
        onSelectLanguage={handleSelectLanguage}
      />

      {/* ========================================================================= */}
      {/* MODAL DE CONFIGURACIÓN DE NIVEL DEL USUARIO (INDEPENDIENTE DE LA LENGUA)   */}
      {/* ========================================================================= */}
      <LevelConfigModal
        isOpen={isLevelModalOpen}
        onClose={() => setIsLevelModalOpen(false)}
        currentLevel={userLevel}
        onSelectLevel={(level) => setUserLevel(level)}
      />
    </div>
  );
};
