import React from 'react';
import { Language } from '../types';
import { Mic, FileSpreadsheet, Volume2, VolumeX } from 'lucide-react';
import { speechService } from '../services/speechService';

interface HeaderProps {
  currentScreen: 'voice-accessible' | 'transcriptor';
  onSelectScreen: (screen: 'voice-accessible' | 'transcriptor') => void;
  selectedLanguage: Language;
  onSelectLanguage: (lang: Language) => void;
  voiceGuideEnabled: boolean;
  onToggleVoiceGuide: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onSelectScreen,
  selectedLanguage,
  onSelectLanguage,
  voiceGuideEnabled,
  onToggleVoiceGuide,
}) => {
  const handleNavClick = (screen: 'voice-accessible' | 'transcriptor') => {
    speechService.playFeedbackSound('tap');
    onSelectScreen(screen);
    if (voiceGuideEnabled) {
      if (screen === 'voice-accessible') {
        speechService.speak(
          selectedLanguage === 'quechua'
            ? "Rimaylla kawsay. Rimanaykipaq ñit'iy."
            : selectedLanguage === 'aimara'
            ? "Arusuña pacha. Aka botona limt'ama."
            : 'Modo Accesible Cien por ciento Voz para comunicarse sin leer ni escribir.',
          selectedLanguage,
        );
      } else {
        speechService.speak(
          selectedLanguage === 'quechua'
            ? 'Huñusqa grabacionkuna hinallataq transcriptor.'
            : selectedLanguage === 'aimara'
            ? 'Aru qillqañampi grabacionanaka.'
            : 'Pantalla de grabaciones y transcriptor fonético con exportación a PDF.',
          selectedLanguage,
        );
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#fff8f6]/95 backdrop-blur-md border-b border-[#ede8df] shadow-xs">
      {/* Logo and title */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2">
          <div
            onClick={() => handleNavClick('voice-accessible')}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group select-none"
            role="button"
            tabIndex={0}
            title="Allikiwa EdTech - Ir a pantalla principal"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#2a3691] text-white flex items-center justify-center shadow-md shadow-[#2a3691]/20 group-hover:scale-105 transition-transform duration-200">
              <img
                alt="Allikiwa logo"
                src={`${import.meta.env.BASE_URL}images/loguitodos.png`}
                className="w-8 h-8"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-extrabold text-lg sm:text-2xl text-[#0e1c7b] tracking-tight">
                  Allikiwa
                </span>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#f27a21] text-white shadow-xs">
                  EdTech
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] font-medium text-[#9a4600] hidden sm:block">
                Aprende, practica y conecta con nuestras lenguas
              </p>
            </div>
          </div>

          {/* Navigation switcher */}
          <nav className="flex items-center p-1 bg-[#ffe9e4]/80 rounded-2xl border border-[#ede8df]" aria-label="Navegación de pantallas">
            <button
              onClick={() => handleNavClick('voice-accessible')}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                currentScreen === 'voice-accessible'
                  ? 'bg-[#2a3691] text-white shadow-md shadow-[#2a3691]/25 translate-y-[-1px]'
                  : 'text-[#0e1c7b] hover:bg-white/60'
              }`}
              aria-current={currentScreen === 'voice-accessible' ? 'page' : undefined}
            >
              <Mic className={`w-4 h-4 ${currentScreen === 'voice-accessible' ? 'text-[#ff842c]' : 'text-[#2a3691]'}`} />
              <span className="whitespace-nowrap">
                <span className="sm:hidden">100% Voz</span>
                <span className="hidden sm:inline">Modo 100% Voz (No Alfabetizados)</span>
              </span>
            </button>
            <button
              onClick={() => handleNavClick('transcriptor')}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                currentScreen === 'transcriptor'
                  ? 'bg-[#2a3691] text-white shadow-md shadow-[#2a3691]/25 translate-y-[-1px]'
                  : 'text-[#0e1c7b] hover:bg-white/60'
              }`}
              aria-current={currentScreen === 'transcriptor' ? 'page' : undefined}
            >
              <FileSpreadsheet className={`w-4 h-4 ${currentScreen === 'transcriptor' ? 'text-[#ff842c]' : 'text-[#2a3691]'}`} />
              <span className="whitespace-nowrap">
                <span className="sm:hidden">Transcriptor</span>
                <span className="hidden sm:inline">Grabaciones y Transcriptor (PDF)</span>
              </span>
            </button>
          </nav>

          {/* Language selector and voice guide */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="flex items-center bg-white rounded-xl border border-[#ede8df] p-0.5 shadow-2xs">
              <button
                onClick={() => { speechService.playFeedbackSound('tap'); onSelectLanguage('quechua'); }}
                className={`px-2 sm:px-2.5 py-1 text-[11px] sm:text-xs font-semibold rounded-lg transition-colors ${
                  selectedLanguage === 'quechua' ? 'bg-[#0e1c7b] text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
                }`}
                title="Runa Simi (Quechua Chanka)"
              >
                Quechua
              </button>
              <button
                onClick={() => { speechService.playFeedbackSound('tap'); onSelectLanguage('aimara'); }}
                className={`px-2 sm:px-2.5 py-1 text-[11px] sm:text-xs font-semibold rounded-lg transition-colors ${
                  selectedLanguage === 'aimara' ? 'bg-[#0e1c7b] text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
                }`}
                title="Aymar Aru (Aimara)"
              >
                Aimara
              </button>
              <button
                onClick={() => { speechService.playFeedbackSound('tap'); onSelectLanguage('castellano'); }}
                className={`px-2 sm:px-2.5 py-1 text-[11px] sm:text-xs font-semibold rounded-lg transition-colors ${
                  selectedLanguage === 'castellano' ? 'bg-[#0e1c7b] text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
                }`}
                title="Castellano"
              >
                Español
              </button>
            </div>
            <button
              onClick={() => { speechService.playFeedbackSound('tap'); onToggleVoiceGuide(); }}
              className={`p-2 rounded-xl border transition-colors flex items-center gap-1 ${
                voiceGuideEnabled ? 'bg-[#3ca21d]/10 border-[#3ca21d] text-[#3ca21d]' : 'bg-white border-[#ede8df] text-stone-400 hover:text-stone-600'
              }`}
              title={voiceGuideEnabled ? 'Voz guía activada (asistente hablado)' : 'Activar voz guía hablada'}
              aria-label="Voz guía hablada"
            >
              {voiceGuideEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span className="hidden md:inline text-[11px] font-semibold">
                {voiceGuideEnabled ? 'Voz Guía ON' : 'Voz OFF'}
              </span>
            </button>
          </div>
        </div>
      </div>
      {/* Accent line */}
      <div className="h-0.5 bg-gradient-to-r from-[#2a3691] via-[#f27a21] to-[#3ca21d]" />
    </header>
  );
};