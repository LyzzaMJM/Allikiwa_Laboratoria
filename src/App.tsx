import React, { useState } from 'react';
import { Language, RecordingItem, ScreenId, TransitionType } from './types';
import { INITIAL_RECORDINGS } from './data/mockRecordings';

// 4 Pantallas Principales
import { TraductorScreen } from './screens/TraductorScreen';
import { AprenderScreen } from './screens/AprenderScreen';
import { TranscriptorScreen } from './components/TranscriptorScreen';
import { PerfilScreen } from './screens/PerfilScreen';

// Ejercicios y Modales (Overlays secundarios)
import { EjercicioIlustracionScreen } from './screens/EjercicioIlustracionScreen';
import { EjercicioEmparejarScreen } from './screens/EjercicioEmparejarScreen';
import { EjercicioDictadoScreen } from './screens/EjercicioDictadoScreen';
import { JuegosInteractivosScreen } from './screens/JuegosInteractivosScreen';
import { ProModalScreen } from './screens/ProModalScreen';

// Navegación Inferior Unificada (Estilo Duolingo)
import { BottomNav } from './components/BottomNav';

type MainTab = 'traductor' | 'aprender' | 'transcriptor_pdf' | 'perfil';

export default function App() {
  const [currentTab, setCurrentTab] = useState<MainTab>('traductor');
  const [activeOverlay, setActiveOverlay] = useState<ScreenId | null>(null);
  const [transition, setTransition] = useState<TransitionType>('none');
  const [voiceModeActive, setVoiceModeActive] = useState<boolean>(false);

  // Estado compartido de grabaciones y configuración
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('quechua');
  const [voiceGuideEnabled, setVoiceGuideEnabled] = useState<boolean>(true);
  const [recordings, setRecordings] = useState<RecordingItem[]>(INITIAL_RECORDINGS);

  const handleAddNewRecording = (newRec: RecordingItem) => {
    setRecordings((prev) => [newRec, ...prev]);
  };

  /**
   * Enrutador central inteligente:
   * Determina si la navegación es un cambio de tab principal o un modal/overlay de ejercicio.
   */
  const handleNavigate = (nextScreen: ScreenId, nextTransition: TransitionType = 'none') => {
    setTransition(nextTransition);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // 1. Si se solicita Modo Voz, se activa el toggle del Traductor sin cambiar de app
    if (nextScreen === 'voz_accesible') {
      setVoiceModeActive(true);
      setCurrentTab('traductor');
      setActiveOverlay(null);
      return;
    }

    // 2. Modales y Overlays de ejercicios
    if (
      nextScreen === 'ejercicio_ilustracion' ||
      nextScreen === 'ejercicio_emparejar' ||
      nextScreen === 'ejercicio_dictado' ||
      nextScreen === 'juegos_interactivos' ||
      nextScreen === 'pro_popup'
    ) {
      setActiveOverlay(nextScreen);
      return;
    }

    // 3. Si venía de un overlay y vuelve a una pantalla regular, cerramos el overlay
    setActiveOverlay(null);

    // 4. Mapeo a las 4 Pantallas Principales
    if (nextScreen === 'traductor') {
      setCurrentTab('traductor');
    } else if (
      nextScreen === 'aprender' ||
      nextScreen === 'mapa_quechua' ||
      nextScreen === 'ruta_aimara' ||
      nextScreen === 'cuaderno_repaso'
    ) {
      setCurrentTab('aprender');
    } else if (nextScreen === 'transcriptor_pdf') {
      setCurrentTab('transcriptor_pdf');
    } else if (
      nextScreen === 'perfil' ||
      nextScreen === 'perfil_registro' ||
      nextScreen === 'perfil_dinamico'
    ) {
      setCurrentTab('perfil');
    }
  };

  const getTransitionClass = () => {
    switch (transition) {
      case 'slide_up':
        return 'animate-in slide-in-from-bottom duration-250 ease-out';
      case 'push':
        return 'animate-in slide-in-from-right duration-200 ease-out';
      case 'push_back':
        return 'animate-in slide-in-from-left duration-200 ease-out';
      case 'none':
      default:
        return '';
    }
  };

  /* Render de las 4 pantallas principales */
  const renderCurrentTab = () => {
    switch (currentTab) {
      case 'traductor':
        return (
          <TraductorScreen
            onNavigate={handleNavigate}
            onSaveRecording={handleAddNewRecording}
            isVoiceMode={voiceModeActive}
            onToggleVoiceMode={() => setVoiceModeActive((prev) => !prev)}
          />
        );
      case 'aprender':
        return <AprenderScreen onNavigate={handleNavigate} />;
      case 'transcriptor_pdf':
        return (
          <div className="pb-20">
            <TranscriptorScreen
              recordings={recordings}
              selectedLanguage={selectedLanguage}
              onNavigateToVoiceMode={() => handleNavigate('voz_accesible')}
              onAddNewRecording={handleAddNewRecording}
              onNavigate={handleNavigate}
            />
          </div>
        );
      case 'perfil':
        return (
          <PerfilScreen
            onNavigate={handleNavigate}
            voiceGuideEnabled={voiceGuideEnabled}
            onToggleVoiceGuide={() => setVoiceGuideEnabled((prev) => !prev)}
          />
        );
      default:
        return (
          <TraductorScreen
            onNavigate={handleNavigate}
            onSaveRecording={handleAddNewRecording}
            isVoiceMode={voiceModeActive}
            onToggleVoiceMode={() => setVoiceModeActive((prev) => !prev)}
          />
        );
    }
  };

  /* Render de ejercicios / popups como overlay fullscreen */
  const renderOverlay = () => {
    if (!activeOverlay) return null;

    return (
      <div className="fixed inset-0 z-50 bg-[#fff8f6] overflow-y-auto animate-in slide-in-from-bottom duration-250">
        {activeOverlay === 'ejercicio_ilustracion' && (
          <EjercicioIlustracionScreen onNavigate={handleNavigate} />
        )}
        {activeOverlay === 'ejercicio_emparejar' && (
          <EjercicioEmparejarScreen onNavigate={handleNavigate} />
        )}
        {activeOverlay === 'ejercicio_dictado' && (
          <EjercicioDictadoScreen onNavigate={handleNavigate} />
        )}
        {activeOverlay === 'juegos_interactivos' && (
          <JuegosInteractivosScreen onNavigate={handleNavigate} />
        )}
        {activeOverlay === 'pro_popup' && (
          <ProModalScreen onNavigate={handleNavigate} />
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#fbf7ee] flex flex-col relative overflow-x-hidden">
      {/* Contenido de la Pantalla Principal Activa */}
      <div key={currentTab} className={`flex-1 flex flex-col ${getTransitionClass()}`}>
        {renderCurrentTab()}
      </div>

      {/* Overlay modal para ejercicios / popups (sin distracciones, oculta la barra inferior) */}
      {renderOverlay()}

      {/* Barra de Navegación Inferior Unificada (Visible cuando no hay ejercicio activo) */}
      {!activeOverlay && (
        <BottomNav currentTab={currentTab} onSelectTab={(tab) => handleNavigate(tab, 'none')} />
      )}
    </div>
  );
}
