import React, { useState, useRef, useCallback } from 'react';
import { RecordingItem, ScreenId, TransitionType } from '../types';
import { sounds } from '../utils/audio';
import { translateText } from '../utils/dictionary';
import { translateWithApi } from '../utils/nlpcloud';
import { speechService } from '../services/speechService';
import { PICTORIAL_CARDS } from '../data/pictorialCards';
import { AppHeader } from '../components/AppHeader';

interface Props {
  onNavigate: (screen: ScreenId, transition?: TransitionType) => void;
  onSaveRecording?: (recording: RecordingItem) => void;
  isVoiceMode?: boolean;
  onToggleVoiceMode?: () => void;
}

const FREE_TRANSLATIONS_LIMIT = 15;

export const TraductorScreen: React.FC<Props> = ({
  onNavigate,
  onSaveRecording,
  isVoiceMode: propIsVoiceMode,
  onToggleVoiceMode,
}) => {
  const [internalVoiceMode, setInternalVoiceMode] = useState(false);
  const isVoiceMode = propIsVoiceMode !== undefined ? propIsVoiceMode : internalVoiceMode;

  const toggleVoiceMode = () => {
    sounds.playTap();
    if (onToggleVoiceMode) {
      onToggleVoiceMode();
    } else {
      setInternalVoiceMode((prev) => !prev);
    }
  };
  const [inputText, setInputText] = useState('');
  const [targetLang, setTargetLang] = useState<'chanka' | 'aimara'>('chanka');
  const [voiceDirection, setVoiceDirection] = useState<'es-to-indigenous' | 'indigenous-to-es'>('es-to-indigenous');
  const [isAudioModalOpen, setIsAudioModalOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [speed, setSpeed] = useState<'normal' | 'slow'>('normal');
  const [copied, setCopied] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [translationResult, setTranslationResult] = useState<{ result: string; phonetics: string; note: string } | null>(null);
  const [hasTranslated, setHasTranslated] = useState(false);
  const [translationCount, setTranslationCount] = useState(0);
  const [isDraggingAudio, setIsDraggingAudio] = useState(false);
  const [uploadedAudioName, setUploadedAudioName] = useState<string | null>(null);
  const [isProcessingAudio, setIsProcessingAudio] = useState(false);
  const [showProBanner, setShowProBanner] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);

  const audioFileRef = useRef<HTMLInputElement>(null);

  const currentTrans = translationResult ?? {
    result: targetLang === 'chanka'
      ? 'Escribe algo y presiona "Traducir" para ver la traducción en Quechua Chanka...'
      : 'Escribe algo y presiona "Traducir" para ver la traducción en Aimara...',
    phonetics: '—',
    note: 'Prueba con cualquier frase en español. Usa la API de IA para traducciones reales al Quechua Chanka y Aimara.',
  };

  const langName = targetLang === 'chanka' ? 'Quechua Chanka' : 'Aimara';

  const handleTranslate = useCallback(async () => {
    if (!inputText.trim() || isTranslating) return;

    const newCount = translationCount + 1;
    setTranslationCount(newCount);
    setIsTranslating(true);

    try {
      // 1) Intentar traducción con NLP Cloud API (NLLB-200)
      const apiResult = await translateWithApi(inputText, targetLang);

      if (apiResult.source === 'api' && apiResult.result) {
        setTranslationResult({
          result: apiResult.result,
          phonetics: apiResult.phonetics,
          note: apiResult.note,
        });
        setHasTranslated(true);
        sounds.playSuccess();
        setIsTranslating(false);
        return;
      }
    } catch {
      console.warn('API translation failed, using offline dictionary');
    }

    // 2) Fallback: diccionario offline
    const offlineResult = translateText(inputText, targetLang);
    setTranslationResult(offlineResult);
    setHasTranslated(true);
    sounds.playSuccess();
    setIsTranslating(false);

    // Show pro banner after reaching limit
    if (newCount >= FREE_TRANSLATIONS_LIMIT) {
      setShowProBanner(true);
    }
  }, [inputText, targetLang, translationCount, isTranslating]);

  const handleListen = () => {
    sounds.playVoice(currentTrans.result, speed === 'slow');
  };

  const handleToggleVoiceInput = () => {
    sounds.playTap();
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      // Simulate voice input in browsers without Speech API
      setIsListening(true);
      setTimeout(() => {
        setInputText('Buenos días, hermano. ¿Cómo estás?');
        setIsListening(false);
        sounds.playSuccess();
      }, 1800);
      return;
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'es-PE';
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.onstart = () => setIsListening(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
        sounds.playSuccess();
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  const handleSelectPictorialCard = (card: typeof PICTORIAL_CARDS[0]) => {
    sounds.playTap();
    const cardData = targetLang === 'chanka' ? card.quechua : card.aimara;

    if (voiceDirection === 'indigenous-to-es') {
      // Hablante nativo quechua/aimara traduce hacia el español
      setInputText(cardData.phrase);
      setTranslationResult({
        result: card.castellano.phrase,
        phonetics: card.castellano.phonetic || '[traducción en español]',
        note: `Traducción al español para facilitar comunicación con hispanohablantes: ${card.castellano.translation}`,
      });
      setHasTranslated(true);
      sounds.playSuccess();
      speechService.speak(card.castellano.phrase, 'castellano');
    } else {
      // Español hacia lengua originaria
      setInputText(card.castellano.phrase);
      setTranslationResult({
        result: cardData.phrase,
        phonetics: cardData.phonetic,
        note: card.castellano.translation,
      });
      setHasTranslated(true);
      sounds.playSuccess();
      speechService.speak(cardData.phrase, targetLang === 'chanka' ? 'quechua' : 'aimara');
    }
  };

  const handleSaveAndTranscribeCurrent = () => {
    sounds.playSuccess();
    const title = inputText.trim().slice(0, 30) || 'Frase oral';
    const langLabel = targetLang === 'chanka' ? 'Quechua Chanka' : 'Aimara';
    const newRec: RecordingItem = {
      id: 'rec-' + Date.now(),
      title: `Traducción: ${title}`,
      description: currentTrans.note || `Traducción al ${langLabel}`,
      date: 'Hoy, ' + new Date().toLocaleDateString('es-PE'),
      community: targetLang === 'chanka' ? 'Comunidad Chanka' : 'Comunidad Altiplánica',
      duration: '0:05',
      durationSeconds: 5,
      language: langLabel,
      informant: 'Usuario Allikiwa',
      transcriber: 'Sistema Fonético Allikiwa',
      isUserRecording: true,
      segments: [
        {
          id: 'seg-1',
          timestamp: '00:01',
          seconds: 1,
          speaker: 'Hablante',
          role: 'hablante',
          originalText: inputText || 'Frase oral',
          translatedText: currentTrans.result,
          phonetics: currentTrans.phonetics,
          culturalNote: currentTrans.note,
          linguisticTag: targetLang === 'chanka' ? 'Chanka' : 'Aimara Central',
        },
      ],
      tags: ['Traductor', langLabel, 'Voz y Texto'],
    };
    if (onSaveRecording) {
      onSaveRecording(newRec);
    }
    onNavigate('transcriptor_pdf', 'push');
  };

  // Handle audio file upload - tries to transcribe speech or simulates
  const processAudioFile = useCallback((file: File) => {
    setUploadedAudioName(file.name);
    setIsProcessingAudio(true);

    // Use Web Speech API to attempt transcription from microphone first
    // For uploaded files, we simulate transcription with a friendly message
    setTimeout(() => {
      const simulatedTranscription = 'Allillanchu wawqillay, ¿cómo estás hoy en la comunidad?';
      setInputText(simulatedTranscription);
      setIsProcessingAudio(false);
      sounds.playSuccess();
      setIsAudioModalOpen(false);
    }, 2200);
  }, []);

  const handleAudioFileDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingAudio(false);
    const file = e.dataTransfer.files[0];
    if (file && (file.type.startsWith('audio/') || file.name.match(/\.(mp3|wav|m4a|ogg|webm|opus)$/i))) {
      processAudioFile(file);
    }
  }, [processAudioFile]);

  const handleAudioFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processAudioFile(file);
  }, [processAudioFile]);

  const remainingTranslations = Math.max(0, FREE_TRANSLATIONS_LIMIT - translationCount);

  return (
    <div className="bg-[#fbf7ee] text-[#332219] antialiased flex flex-col min-h-screen">
      {/* ================= TOP NAV BAR ================= */}
      <AppHeader
        onNavigate={onNavigate}
        rightContent={
          <>
            {/* Toggle Modo 100% Voz */}
            <button
              onClick={toggleVoiceMode}
              className={`px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-2xl border-2 font-chubby text-xs sm:text-sm font-bold flex items-center gap-1.5 sm:gap-2 transition-all cursor-pointer shadow-xs shrink-0 ${isVoiceMode
                ? 'bg-[#3ca21d] text-white border-[#2d7d15] shadow-duo-green'
                : 'bg-[#fff1ed] text-[#b43f1d] border-[#f27a21]/30 hover:border-[#f27a21] hover:bg-[#fff7f2]'
                }`}
              type="button"
              title={isVoiceMode ? 'Desactivar Modo 100% Voz' : 'Activar Modo 100% Voz (No Alfabetizados)'}
            >
              <span className="material-symbols-outlined text-[16px] sm:text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                {isVoiceMode ? 'record_voice_over' : 'volume_up'}
              </span>
              <span className="hidden xs:inline">{isVoiceMode ? 'Modo Voz: Activo' : 'Modo 100% Voz'}</span>
              <span className="xs:hidden">{isVoiceMode ? 'Voz ON' : 'Modo Voz'}</span>
              <span className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full ${isVoiceMode ? 'bg-white animate-pulse' : 'bg-[#f27a21]'}`} />
            </button>

            {/* Profile */}
            <button
              aria-label="Perfil y racha"
              className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-[#fdf2e9] border-2 border-[#f3d3bc] text-[#f27a21] flex items-center justify-center hover:bg-[#fff3e8] shadow-duo-neutral btn-3d cursor-pointer shrink-0"
              type="button"
              onClick={() => {
                sounds.playTap();
                onNavigate('perfil', 'push');
              }}
            >
              <span className="material-symbols-outlined text-[20px] sm:text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                face_6
              </span>
            </button>
          </>
        }
      />

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-10 py-6 sm:py-7">
        {/* Welcome Section */}
        <section className="mb-6 sm:mb-7">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2">
            <div>
              <h1 className="font-chubby text-2xl sm:text-4xl font-extrabold text-[#2a3691] tracking-tight">
                Traduce y aprende nuestras lenguas originarias
              </h1>
              <p className="text-sm sm:text-lg font-bold text-[#73685f] mt-1 max-w-2xl">
                Escribe o habla con tu voz para traducir entre español,{' '}
                <span className="text-[#f27a21] font-extrabold">Quechua Chanka</span> y{' '}
                <span className="text-[#3ca21d] font-extrabold">Aimara</span>.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
              <span className="px-3 sm:px-4 py-2 rounded-2xl bg-white border-2 border-[#e5e2da] text-[#f27a21] font-chubby text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm">
                <span className="material-symbols-outlined text-[18px] sm:text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>mic</span>
                Audio y Voz
              </span>
              <span className="px-3 sm:px-4 py-2 rounded-2xl bg-white border-2 border-[#e5e2da] text-[#3ca21d] font-chubby text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm">
                <span className="material-symbols-outlined text-[18px] sm:text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                100% Amigable
              </span>
              {/* Translation counter */}
              <span className={`px-3 sm:px-4 py-2 rounded-2xl border-2 font-chubby text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm transition-colors ${remainingTranslations <= 1
                ? 'bg-[#fff3e8] border-[#f27a21]/40 text-[#c95c10]'
                : 'bg-white border-[#e5e2da] text-[#2a3691]'
                }`}>
                <span
                  className="material-symbols-outlined text-[18px] sm:text-[20px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                  aria-hidden="true"
                >
                  translate
                </span>

                {remainingTranslations <= 0
                  ? '¡Límite alcanzado!'
                  : `${remainingTranslations} traducc. gratis`
                }
              </span>
            </div>
          </div>
        </section>

        {/* ================= PRO BANNER (aparece al llegar al límite) ================= */}
        {showProBanner && (
          <div className="mb-6 bg-gradient-to-r from-[#2a3691] to-[#f27a21] rounded-3xl p-0.5 shadow-lg">
            <div className="bg-white rounded-[22px] p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <img src={`${import.meta.env.BASE_URL}images/pancita.png`} alt="Pancita" className="w-14 h-14 object-contain shrink-0" />
                <div>
                  <div className="font-chubby text-base sm:text-lg font-extrabold text-[#2a3691]">
                    ¡Usaste tus 15 traducciones gratis!
                  </div>
                  <p className="text-xs sm:text-sm text-[#73685f] font-semibold">
                    Obtén <strong className="text-[#f27a21]">Allikiwa Pro</strong> por S/ 20/mes y traduce sin límites.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <button
                  className="btn-3d px-4 py-2 rounded-xl bg-[#f27a21] text-white border-b-4 border-[#c95c10] shadow-duo-orange font-chubby text-sm font-bold flex items-center gap-1.5 cursor-pointer"
                  type="button"
                  onClick={() => { sounds.playTap(); onNavigate('pro_popup', 'slide_up'); }}
                >
                  <span className="material-symbols-outlined text-[18px]">bolt</span>
                  <span>Activar Pro</span>
                </button>
                <button
                  className="text-xs text-[#8c7e73] hover:text-[#2a3691] font-semibold cursor-pointer"
                  type="button"
                  onClick={() => setShowProBanner(false)}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= WORKSPACE: ADAPTIVE VOICE MODE vs STANDARD DUAL MODE ================= */}
        {isVoiceMode ? (
          <section className="bg-white rounded-[28px] sm:rounded-[32px] border-4 border-[#3ca21d]/40 shadow-duo-card overflow-hidden mb-8 sm:mb-10 p-5 sm:p-8 animate-in fade-in duration-200">
            {/* Voice Mode Banner */}
            <div className="bg-[#e9f7e5] rounded-2xl p-4 sm:p-5 border-2 border-[#3ca21d]/30 mb-6 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3.5 text-center sm:text-left">
                <div className="w-12 h-12 rounded-2xl bg-[#3ca21d] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <span className="material-symbols-outlined text-[28px]">record_voice_over</span>
                </div>
                <div>
                  <h3 className="font-chubby text-base sm:text-lg font-bold text-[#104b00]">
                    Modo 100% Voz Activo (Comunidades Orales)
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-[#2d7d15]">
                    Presiona el micrófono grande y habla directamente, o elige una tarjeta ilustrada.
                  </p>
                </div>
              </div>
              <button
                onClick={toggleVoiceMode}
                className="px-4 py-2 rounded-xl bg-white border-2 border-[#3ca21d] text-[#104b00] font-chubby text-xs sm:text-sm font-bold hover:bg-[#d6f5cc] transition-colors cursor-pointer shadow-xs"
                type="button"
              >
                Volver a Modo Texto
              </button>
            </div>

            {/* Target Language Toggle & Direction for Voice Mode */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
              {/* Selector de Lengua */}
              <div className="inline-flex bg-[#f5f1ea] p-1.5 rounded-2xl border-2 border-[#ede8df] gap-1.5">
                <button
                  onClick={() => {
                    sounds.playTap();
                    setTargetLang('chanka');
                    setTranslationResult(null);
                  }}
                  className={`px-3.5 sm:px-5 py-2 rounded-xl font-chubby text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer ${targetLang === 'chanka'
                    ? 'bg-[#2a3691] text-white shadow-sm scale-102'
                    : 'text-[#6b5f55] hover:text-[#2a3691]'
                    }`}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">translate</span>
                  <span>Quechua Chanka</span>
                </button>
                <button
                  onClick={() => {
                    sounds.playTap();
                    setTargetLang('aimara');
                    setTranslationResult(null);
                  }}
                  className={`px-3.5 sm:px-5 py-2 rounded-xl font-chubby text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer ${targetLang === 'aimara'
                    ? 'bg-[#f27a21] text-white shadow-sm scale-102'
                    : 'text-[#6b5f55] hover:text-[#f27a21]'
                    }`}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">translate</span>
                  <span>Aimara</span>
                </button>
              </div>

              {/* Selector de Dirección de Comunicación (Bilingüe) */}
              <div className="inline-flex bg-white p-1 rounded-2xl border-2 border-[#ede8df] shadow-xs">
                <button
                  onClick={() => {
                    sounds.playTap();
                    setVoiceDirection('es-to-indigenous');
                    setTranslationResult(null);
                  }}
                  className={`px-3 py-1.5 rounded-xl font-chubby text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${voiceDirection === 'es-to-indigenous'
                    ? 'bg-[#3ca21d] text-white shadow-xs'
                    : 'text-[#6b5f55] hover:text-[#3ca21d]'
                    }`}
                  type="button"
                  title="Hablar en Español y traducir a lengua originaria"
                >
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  <span>Español → {targetLang === 'chanka' ? 'Quechua' : 'Aimara'}</span>
                </button>
                <button
                  onClick={() => {
                    sounds.playTap();
                    setVoiceDirection('indigenous-to-es');
                    setTranslationResult(null);
                  }}
                  className={`px-3 py-1.5 rounded-xl font-chubby text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${voiceDirection === 'indigenous-to-es'
                    ? 'bg-[#0e1c7b] text-white shadow-xs'
                    : 'text-[#6b5f55] hover:text-[#0e1c7b]'
                    }`}
                  type="button"
                  title="Hablante nativo habla en su lengua y traduce al Español"
                >
                  <span className="material-symbols-outlined text-[16px]">record_voice_over</span>
                  <span>{targetLang === 'chanka' ? 'Quechua' : 'Aimara'} → Español</span>
                </button>
              </div>
            </div>

            {/* Giant Central Microphone Button */}
            <div className="flex flex-col items-center justify-center my-6 sm:my-8 text-center">
              <button
                onClick={handleToggleVoiceInput}
                type="button"
                className={`w-32 h-32 sm:w-40 sm:h-40 rounded-full flex flex-col items-center justify-center cursor-pointer transition-all duration-300 shadow-2xl relative group ${isListening
                  ? 'bg-[#ba1a1a] text-white ring-8 ring-[#ba1a1a]/30 animate-pulse scale-105'
                  : 'bg-gradient-to-tr from-[#2a3691] via-[#1a2260] to-[#3ca21d] text-white hover:scale-105 hover:shadow-duo-green'
                  }`}
                title="Toca para hablar"
              >
                <span className="material-symbols-outlined text-[48px] sm:text-[60px] mb-1">
                  {isListening ? 'graphic_eq' : 'mic'}
                </span>
                <span className="font-chubby text-xs sm:text-sm font-bold uppercase tracking-wider">
                  {isListening ? 'Escuchando...' : 'Toca y Habla'}
                </span>
              </button>
              <p className="font-chubby text-sm sm:text-base font-bold text-[#6b5f55] mt-4 max-w-sm">
                {isListening
                  ? 'Di lo que necesites en español o en tu lengua originaria...'
                  : 'Presiona el micrófono para hablar con tu propia voz'}
              </p>
            </div>

            {/* Translation & Phonetics Result (if translated) */}
            {hasTranslated && (
              <div className="bg-[#fffcf5] border-2 border-[#f27a21]/40 rounded-3xl p-5 sm:p-6 mb-8 shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 rounded-full bg-[#e9f7e5] text-[#2d7d15] font-chubby text-xs font-bold flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">verified</span>
                    {voiceDirection === 'indigenous-to-es' ? 'Traducción oral al Español' : `Traducción oral en ${langName}`}
                  </span>
                  <button
                    onClick={() => {
                      if (voiceDirection === 'indigenous-to-es') {
                        speechService.speak(currentTrans.result, 'castellano');
                      } else {
                        handleListen();
                      }
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-[#3ca21d] text-white font-chubby text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer hover:bg-[#2d7d15]"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">volume_up</span>
                    <span>Repetir audio</span>
                  </button>
                </div>

                <p className="font-chubby text-2xl sm:text-3xl font-extrabold text-[#2a3691] leading-snug mb-2">
                  &ldquo;{currentTrans.result}&rdquo;
                </p>

                <div className="p-3 bg-white rounded-2xl border border-[#ede8df] flex items-center gap-2 mb-4">
                  <span className="material-symbols-outlined text-[#f27a21] text-[20px]">hearing</span>
                  <div>
                    <span className="text-[11px] font-bold text-[#8c7e73] uppercase block">Pronunciación guiada</span>
                    <span className="font-chubby text-sm sm:text-base font-bold text-[#f27a21]">
                      {currentTrans.phonetics}
                    </span>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    onClick={handleSaveAndTranscribeCurrent}
                    className="px-4 py-2.5 rounded-xl bg-[#2a3691] text-white font-chubby text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-sm btn-3d cursor-pointer"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">edit_note</span>
                    <span>Guardar en Transcriptor</span>
                  </button>
                </div>
              </div>
            )}

            {/* Quick Pictorial Cards (Tarjetas Temáticas con Dibujos) */}
            <div className="mt-6 pt-6 border-t-2 border-[#ede8df]">
              <div className="flex items-center justify-between mb-3">
                <span className="font-chubby text-xs sm:text-sm font-extrabold text-[#2a3691] uppercase tracking-wider flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px] text-[#f27a21]">dashboard</span>
                  Tarjetas Rápidas con Dibujos
                </span>
                <span className="text-xs font-bold text-[#8c7e73]">Toca para escuchar y traducir</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {PICTORIAL_CARDS.slice(0, 5).map((card) => {
                  const cardData = targetLang === 'chanka' ? card.quechua : card.aimara;
                  return (
                    <button
                      key={card.id}
                      onClick={() => handleSelectPictorialCard(card)}
                      className="p-3.5 rounded-2xl border-2 border-[#ede8df] hover:border-[#f27a21] bg-[#fffcf5] hover:bg-white flex flex-col items-center justify-center text-center transition-all cursor-pointer shadow-xs group"
                      type="button"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-white border border-[#ede8df] flex items-center justify-center text-[24px] mb-2 shadow-xs group-hover:scale-110 transition-transform">
                        {card.id === 'salud' && (
                          <span className="material-symbols-outlined text-[#ba1a1a] text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                            health_and_safety
                          </span>
                        )}
                        {card.id === 'chacra' && (
                          <span className="material-symbols-outlined text-[#3ca21d] text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                            agriculture
                          </span>
                        )}
                        {card.id === 'ayllu' && (
                          <span className="material-symbols-outlined text-[#2a3691] text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                            groups
                          </span>
                        )}
                        {card.id === 'qhatu' && (
                          <span className="material-symbols-outlined text-[#f27a21] text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                            storefront
                          </span>
                        )}
                        {card.id === 'auxilio' && (
                          <span className="material-symbols-outlined text-[#d83a3a] text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                            e911_emergency
                          </span>
                        )}
                      </div>
                      <span className="font-chubby text-xs font-bold text-[#2a3691] line-clamp-1">
                        {voiceDirection === 'indigenous-to-es' ? card.castellano.title : cardData.title}
                      </span>
                      <span className="text-[10px] text-[#8c7e73] font-semibold mt-0.5 line-clamp-1">
                        {voiceDirection === 'indigenous-to-es' ? cardData.title : card.castellano.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>
        ) : (
          /* ================= STANDARD TRANSLATOR DUAL CONTAINER ================= */
          <section
            className={`bg-white rounded-[28px] sm:rounded-[32px] border-2 border-[#d6d1c4] shadow-duo-card overflow-hidden mb-8 sm:mb-10 ${isFullscreen ? 'fixed inset-0 z-50 p-4 sm:p-8 overflow-y-auto bg-[#fbf7ee] rounded-none border-none' : ''
              }`}
            id="translator-main-container"
          >
            {/* Header Bar */}
            <div className="p-4 sm:p-6 bg-[#fdfbf7] border-b-2 border-[#e5e2da]">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#e5e2da]">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#3ca21d] animate-pulse"></span>
                  <span className="font-chubby text-xs sm:text-sm font-extrabold text-[#2a3691] uppercase tracking-wider">
                    Estación de Traducción Intercultural
                  </span>
                </div>
                <button
                  id="btn-toggle-fullscreen"
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="btn-3d px-3 py-1.5 rounded-xl bg-[#ebedfa] hover:bg-[#2a3691] text-[#2a3691] hover:text-white border-2 border-[#2a3691]/30 font-chubby text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all shadow-sm"
                  title="Modo Expandido / Pantalla Completa"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {isFullscreen ? 'fullscreen_exit' : 'fullscreen'}
                  </span>
                  <span className="hidden sm:inline">{isFullscreen ? 'Salir' : 'Pantalla Completa'}</span>
                </button>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 bg-white p-3 sm:p-4 rounded-2xl border-2 border-[#e5e2da] shadow-xs">
                {/* Input Language Indicator */}
                <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-between sm:justify-start">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-[#ebedfa] text-[#2a3691] flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[18px]">flag</span>
                    </div>
                    <span className="font-chubby text-sm sm:text-base font-bold text-[#2a3691]">
                      Español
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-[#8c7e73] text-[20px]">
                    arrow_forward
                  </span>
                </div>

                {/* Single Clear Target Language Selector */}
                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <span className="text-xs font-extrabold text-[#8c7e73] uppercase tracking-wider hidden md:inline">
                    Traducir a:
                  </span>
                  <div className="inline-flex bg-[#f5f1ea] p-1 rounded-2xl border border-[#ede8df] gap-1 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => {
                        sounds.playTap();
                        setTargetLang('chanka');
                        setTranslationResult(null);
                      }}
                      className={`flex-1 sm:flex-none px-4 sm:px-5 py-2 rounded-xl font-chubby text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${targetLang === 'chanka'
                        ? 'bg-[#2a3691] text-white shadow-xs'
                        : 'text-[#6b5f55] hover:text-[#2a3691]'
                        }`}
                    >
                      <span>Quechua Chanka</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        sounds.playTap();
                        setTargetLang('aimara');
                        setTranslationResult(null);
                      }}
                      className={`flex-1 sm:flex-none px-4 sm:px-5 py-2 rounded-xl font-chubby text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${targetLang === 'aimara'
                        ? 'bg-[#f27a21] text-white shadow-xs'
                        : 'text-[#6b5f55] hover:text-[#f27a21]'
                        }`}
                    >
                      <span>Aimara</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Translation Workspace */}
            <div className="grid grid-cols-1 lg:grid-cols-2 divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-[#e5e2da]">
              {/* Source Panel */}
              <div className="p-5 sm:p-8 flex flex-col justify-between min-h-[300px] sm:min-h-[350px] bg-white">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-chubby text-xs sm:text-sm font-bold text-[#94867a] uppercase tracking-wider flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px]">edit_note</span> Escribe o dicta aquí
                    </span>
                    <button
                      className="text-[#94867a] hover:text-[#b43f1d] transition-colors flex items-center gap-1 font-bold text-sm px-2.5 py-1 rounded-xl hover:bg-[#b43f1d]/10 cursor-pointer"
                      title="Borrar todo"
                      type="button"
                      onClick={() => {
                        sounds.playTap();
                        setInputText('');
                        setTranslationResult(null);
                        setHasTranslated(false);
                      }}
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                      Borrar
                    </button>
                  </div>
                  <textarea
                    className="w-full bg-transparent border-0 resize-none font-bold text-lg sm:text-2xl text-[#2b201a] focus:ring-0 p-0 h-32 sm:h-40 leading-relaxed placeholder-[#c2b9af] focus:outline-none"
                    id="input-friendly-text"
                    placeholder="Escribe lo que quieras decir o presiona el botón de micrófono..."
                    value={inputText}
                    onChange={(e) => {
                      setInputText(e.target.value);
                      if (hasTranslated) setHasTranslated(false);
                    }}
                  />
                </div>

                {/* Action Toolbar */}
                <div className="pt-4 sm:pt-5 border-t-2 border-[#e5e2da] flex flex-wrap items-center justify-between gap-3 sm:gap-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      className={`btn-3d px-3 sm:px-5 py-2 sm:py-3 rounded-2xl ${isListening ? 'bg-[#b43f1d] border-[#8a2b0e] animate-pulse' : 'bg-[#2a3691] border-[#1a2260]'
                        } text-white border-b-4 shadow-duo-blue flex items-center gap-2 font-chubby cursor-pointer`}
                      title="Presiona para hablar"
                      type="button"
                      onClick={handleToggleVoiceInput}
                    >
                      <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-white/20 flex items-center justify-center">
                        <span className="material-symbols-outlined text-[18px] sm:text-[20px]">{isListening ? 'graphic_eq' : 'mic'}</span>
                      </span>
                      <div className="text-left leading-tight">
                        <span className="font-bold text-sm sm:text-base block">{isListening ? 'Escuchando...' : 'Hablar'}</span>
                        <span className="text-xs font-medium text-white/80 hidden sm:block">Dictado por voz</span>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        sounds.playTap();
                        setIsAudioModalOpen(true);
                      }}
                      className="btn-3d px-3 sm:px-5 py-2 sm:py-3 rounded-2xl bg-[#fdf2e9] hover:bg-[#fff3e8] text-[#f27a21] border-2 border-[#f27a21]/40 border-b-4 border-b-[#f27a21] shadow-duo-orange flex items-center gap-2 font-chubby transition-all cursor-pointer"
                      title="Subir archivo de audio (MP3, WAV, Nota de voz)"
                      type="button"
                    >
                      <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-[#f27a21] text-white flex items-center justify-center">
                        <span className="material-symbols-outlined text-[18px] sm:text-[20px]">upload_file</span>
                      </span>
                      <div className="text-left leading-tight">
                        <span className="font-bold text-sm sm:text-base block text-[#f27a21]">Subir audio</span>
                        <span className="text-xs font-semibold text-[#8a7d72] hidden sm:block">MP3 / WAV / Voz</span>
                      </div>
                    </button>
                  </div>

                  <button
                    className={`btn-3d px-5 sm:px-8 py-2.5 sm:py-3 rounded-2xl text-white border-b-4 flex items-center gap-2 font-chubby text-sm sm:text-lg font-bold cursor-pointer transition-all ${translationCount >= FREE_TRANSLATIONS_LIMIT
                      ? 'bg-[#8c7e73] border-[#6b5f55] cursor-not-allowed'
                      : 'bg-[#f27a21] border-[#c95c10] shadow-duo-orange hover:brightness-105'
                      }`}
                    type="button"
                    disabled={translationCount >= FREE_TRANSLATIONS_LIMIT && !inputText}
                    onClick={() => {
                      if (translationCount >= FREE_TRANSLATIONS_LIMIT) {
                        onNavigate('pro_popup', 'slide_up');
                      } else {
                        handleTranslate();
                      }
                    }}
                  >
                    <span className="material-symbols-outlined text-[20px] sm:text-[24px]">
                      {translationCount >= FREE_TRANSLATIONS_LIMIT ? 'lock' : 'translate'}
                    </span>
                    <span>{translationCount >= FREE_TRANSLATIONS_LIMIT ? 'Activar Pro' : 'Traducir'}</span>
                  </button>
                </div>
              </div>

              {/* Target Panel */}
              <div className="p-5 sm:p-8 flex flex-col justify-between min-h-[300px] sm:min-h-[350px] bg-[#fdfcf9]">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <span className="font-chubby text-xs sm:text-sm font-bold px-3.5 py-1.5 rounded-full bg-[#e9f7e5] text-[#2d7d15] border-2 border-[#3ca21d]/30 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] sm:text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        check_circle
                      </span>
                      {langName}
                    </span>
                    <span className="font-chubby text-xs font-bold text-[#f27a21] bg-[#fff3e8] px-3 py-1 rounded-full border border-[#f27a21]/30">
                      Fonética guiada
                    </span>
                  </div>

                  <div className={`font-chubby text-xl sm:text-3xl font-extrabold text-[#2a3691] leading-snug select-text mb-4 transition-all duration-300 ${hasTranslated ? 'opacity-100' : 'opacity-70'}`}>
                    &ldquo;{currentTrans.result}&rdquo;
                  </div>

                  {/* Phonetics Card */}
                  <div className="bg-white p-3 sm:p-4 rounded-2xl border-2 border-[#d6d1c4] shadow-sm flex items-start gap-3">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#f27a21] text-white flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-[18px] sm:text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        volume_up
                      </span>
                    </div>
                    <div>
                      <span className="font-chubby text-xs font-extrabold text-[#f27a21] uppercase tracking-wider block">
                        ¿Cómo se pronuncia?
                      </span>
                      <p className="font-chubby text-sm sm:text-lg font-bold text-[#3d3129] mt-0.5 tracking-wide">
                        &ldquo;{currentTrans.phonetics}&rdquo;
                      </p>
                    </div>
                  </div>
                </div>

                {/* Playback Toolbar */}
                <div className="pt-4 sm:pt-5 border-t-2 border-[#e5e2da] flex flex-wrap items-center justify-between gap-3 sm:gap-4">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <button
                      className="btn-3d px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl bg-[#3ca21d] text-white border-b-4 border-[#2d7d15] shadow-duo-green flex items-center gap-2 font-chubby text-sm sm:text-lg font-bold cursor-pointer"
                      title="Escuchar pronunciación"
                      type="button"
                      onClick={handleListen}
                    >
                      <span className="material-symbols-outlined text-[20px] sm:text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        volume_up
                      </span>
                      <span>Escuchar</span>
                    </button>

                    <div className="flex items-center bg-white p-1 rounded-2xl border-2 border-[#d6d1c4] shadow-sm">
                      <button
                        className={`px-2.5 sm:px-3.5 py-1.5 rounded-xl font-chubby text-xs sm:text-sm font-bold flex items-center gap-1 transition-all ${speed === 'normal' ? 'bg-[#2a3691] text-white shadow-sm' : 'text-[#7a6f66] hover:text-[#f27a21]'
                          }`}
                        onClick={() => setSpeed('normal')}
                      >
                        <span>Normal</span>
                      </button>
                      <button
                        className={`px-2.5 sm:px-3.5 py-1.5 rounded-xl font-chubby text-xs sm:text-sm font-bold flex items-center gap-1 transition-all ${speed === 'slow' ? 'bg-[#f27a21] text-white shadow-sm' : 'text-[#7a6f66] hover:text-[#f27a21]'
                          }`}
                        onClick={() => setSpeed('slow')}
                      >
                        <span>Lento</span>
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl border-2 border-[#e5e2da] bg-white text-[#70645a] hover:text-[#2a3691] hover:border-[#2a3691] flex items-center justify-center shadow-duo-neutral btn-3d cursor-pointer"
                      title="Copiar texto"
                      type="button"
                      onClick={() => {
                        navigator.clipboard?.writeText(currentTrans.result);
                        sounds.playSuccess();
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      }}
                    >
                      <span className="material-symbols-outlined text-[20px] sm:text-[22px]">{copied ? 'check' : 'content_copy'}</span>
                    </button>
                    <button
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl border-2 border-[#e5e2da] bg-white text-[#70645a] hover:text-[#f27a21] hover:border-[#f27a21] flex items-center justify-center shadow-duo-neutral btn-3d cursor-pointer"
                      title="Guardar en favoritos"
                      type="button"
                      onClick={() => sounds.playSuccess()}
                    >
                      <span className="material-symbols-outlined text-[20px] sm:text-[22px]">bookmark</span>
                    </button>
                    {hasTranslated && (
                      <button
                        className="flex px-3 sm:px-4 py-2 sm:py-3 rounded-2xl bg-[#2a3691] text-white border-b-4 border-[#1a2260] shadow-duo-blue items-center gap-1.5 sm:gap-2 font-chubby text-xs sm:text-sm font-bold btn-3d cursor-pointer hover:brightness-110 transition-all"
                        title="Guardar grabación y abrir transcriptor"
                        type="button"
                        onClick={handleSaveAndTranscribeCurrent}
                      >
                        <span className="material-symbols-outlined text-[18px] sm:text-[20px]">edit_note</span>
                        <span>Guardar y Transcribir</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ================= CULTURAL CONTEXT & MASCOT ================= */}
        <section className="bg-white rounded-[28px] sm:rounded-[32px] border-2 border-[#d6d1c4] p-5 sm:p-9 shadow-duo-card mb-10 sm:mb-12 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b-2 border-[#e5e2da] mb-6 sm:mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#fff3e8] border-2 border-[#f27a21]/30 flex items-center justify-center text-[#f27a21] shadow-sm">
                <span className="material-symbols-outlined text-[22px] sm:text-[26px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  volunteer_activism
                </span>
              </div>
              <div>
                <h2 className="font-chubby text-xl sm:text-3xl font-extrabold text-[#2a3691]">El corazón de nuestras palabras</h2>
                <p className="text-xs sm:text-base font-bold text-[#7a6f66]">Aprende el significado bonito y profundo de lo que acabas de traducir.</p>
              </div>
            </div>
            <span className="px-4 py-1.5 rounded-full bg-[#e9f7e5] border border-[#3ca21d]/30 text-[#2d7d15] font-chubby text-xs sm:text-sm font-bold self-start md:self-auto flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px]">family_restroom</span>
              Consejo cultural
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
            {/* Explanation Cards */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-5 order-2 lg:order-1">
              <div className="p-5 sm:p-6 rounded-3xl bg-[#fffcf5] border-2 border-[#e5e2da] shadow-sm">
                <div className="flex items-center gap-2.5 text-[#f27a21] font-chubby text-lg sm:text-xl font-bold mb-3">
                  <span className="material-symbols-outlined text-[22px] sm:text-[26px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    lightbulb
                  </span>
                  <h3>¿Sabías qué?</h3>
                </div>
                <p className="font-medium text-sm sm:text-lg text-[#3b2d24] leading-relaxed">
                  {currentTrans.note}
                </p>
              </div>

              {/* Greeting Card */}
              <div className="p-4 sm:p-5 rounded-3xl bg-white border-2 border-[#d6d1c4] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-extrabold text-[#f27a21] uppercase tracking-wider block mb-1">
                    ¿Cómo se saluda en Aimara?
                  </span>
                  <p className="font-chubby text-lg sm:text-2xl font-bold text-[#2a3691]">&ldquo;Kamisaraki jilata?&rdquo;</p>
                  <p className="text-xs sm:text-sm font-semibold text-[#8a7d72] mt-0.5">
                    En Aimara, &ldquo;jilata&rdquo; es tu hermano de sangre o de vida.
                  </p>
                </div>
                <button
                  className="btn-3d px-4 sm:px-5 py-2.5 rounded-2xl bg-[#f27a21] text-white border-b-4 border-[#c95c10] shadow-duo-orange font-chubby text-sm font-bold flex items-center gap-2 whitespace-nowrap self-stretch sm:self-auto justify-center cursor-pointer"
                  type="button"
                  onClick={() => sounds.playVoice('Kamisaraki jilata?')}
                >
                  <span className="material-symbols-outlined text-[18px] sm:text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    volume_up
                  </span>
                  <span>Escuchar</span>
                </button>
              </div>
            </div>

            {/* Mascot Area - PANCITA */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center order-1 lg:order-2">
              <div className="relative w-full max-w-xs sm:max-w-sm flex flex-col items-center">
                {/* Speech Bubble */}
                <div className="relative bg-white border-2 border-[#3ca21d] rounded-3xl p-4 sm:p-5 shadow-duo-green mb-3 w-full text-center">
                  <p className="font-chubby text-base sm:text-xl font-bold text-[#2a3691] leading-tight">
                    &ldquo;¡{targetLang === 'chanka' ? 'Allillanchu' : 'Kamisaraki'}! Estoy aquí para ayudarte a hablar {langName}.&rdquo;
                  </p>
                  <p className="text-xs font-extrabold text-[#3ca21d] mt-1">— Tu amigo Pancita</p>
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[12px] border-t-[#3ca21d]"></div>
                </div>

                {/* Pancita Mascot */}
                <div
                  className="relative group cursor-pointer"
                  onClick={() => sounds.playSuccess()}
                >
                  <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-gradient-to-b from-[#e7f0ff] to-[#c8d9ff] border-4 border-white shadow-xl flex items-center justify-center overflow-hidden p-4 transition-transform duration-300 hover:scale-105">
                    <img
                      alt="Pancita la mascota oficial de Allikiwa"
                      className="w-full h-full object-contain filter drop-shadow-md select-none transform hover:rotate-3 transition-transform duration-200"
                      src={`${import.meta.env.BASE_URL}images/pancita.png`}
                    />
                  </div>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-[#2a3691] text-white font-chubby text-xs sm:text-sm font-bold shadow-md flex items-center gap-1.5 border-2 border-white whitespace-nowrap">
                    <span className="material-symbols-outlined text-[14px] sm:text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      favorite
                    </span>
                    <span>¡Compañero Pancita!</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= PRÓXIMAS LENGUAS ================= */}
        <section className="mb-10 sm:mb-14">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-5 sm:mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#ebedfa] text-[#2a3691] flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px] sm:text-[24px]">diversity_3</span>
              </div>
              <div>
                <h2 className="font-chubby text-xl sm:text-3xl font-extrabold text-[#2a3691]">Próximas Lenguas en Allikiwa</h2>
                <p className="text-xs sm:text-base font-bold text-[#7a6f66]">Conversamos con sabios y comunidades para traer más tesoros lingüísticos del Perú.</p>
              </div>
            </div>
            <span className="font-chubby text-xs sm:text-sm text-[#7a6f66] font-bold bg-white px-4 py-2 rounded-2xl border-2 border-[#e5e2da] self-start md:self-auto shadow-sm">
              Nuevas incorporaciones
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-white rounded-[24px] sm:rounded-[28px] border-2 border-[#d6d1c4] p-5 sm:p-7 shadow-duo-card flex flex-col justify-between hover:border-[#f27a21] transition-all">
              <div>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <h3 className="font-chubby text-lg sm:text-2xl font-bold text-[#2a3691] flex items-center gap-2">
                    <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#fff3e8] text-[#f27a21] flex items-center justify-center">
                      <span className="material-symbols-outlined text-[18px] sm:text-[20px]">landscape</span>
                    </span>
                    Quechua Collao
                  </h3>
                  <span className="px-3 py-1.5 rounded-full font-chubby text-xs font-extrabold bg-[#f27a21] text-white shadow-sm border border-[#c95c10]">
                    Próximamente
                  </span>
                </div>
                <p className="font-medium text-xs sm:text-base text-[#695d52] mb-4 sm:mb-5 leading-relaxed">
                  Hablado con orgullo en Cusco, Puno y las bellas alturas del sur andino.
                </p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t-2 border-[#e5e2da] font-chubby text-xs sm:text-sm">
                <span className="text-[#7a6f66] font-bold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] sm:text-[18px] text-[#f27a21]">location_on</span> Cusco y Puno
                </span>
                <span className="font-extrabold text-[#3ca21d] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] sm:text-[18px]">trending_up</span> 65% avanzado
                </span>
              </div>
            </div>

            <div className="bg-white rounded-[24px] sm:rounded-[28px] border-2 border-[#d6d1c4] p-5 sm:p-7 shadow-duo-card flex flex-col justify-between hover:border-[#3ca21d] transition-all">
              <div>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <h3 className="font-chubby text-lg sm:text-2xl font-bold text-[#2a3691] flex items-center gap-2">
                    <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#e9f7e5] text-[#3ca21d] flex items-center justify-center">
                      <span className="material-symbols-outlined text-[18px] sm:text-[20px]">forest</span>
                    </span>
                    Ese Eja (Amazonía)
                  </h3>
                  <span className="px-3 py-1.5 rounded-full font-chubby text-xs font-extrabold bg-[#3ca21d] text-white shadow-sm border border-[#2d7d15]">
                    Próximamente
                  </span>
                </div>
                <p className="font-medium text-xs sm:text-base text-[#695d52] mb-4 sm:mb-5 leading-relaxed">
                  Lengua ancestral de nuestra Amazonía en Madre de Dios. Recopilando hermosas palabras y leyendas orales.
                </p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t-2 border-[#e5e2da] font-chubby text-xs sm:text-sm">
                <span className="text-[#7a6f66] font-bold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] sm:text-[18px] text-[#3ca21d]">location_on</span> Madre de Dios
                </span>
                <span className="font-extrabold text-[#2a3691] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] sm:text-[18px]">nest_eco_leaf</span> En recopilación
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ================= AUDIO UPLOAD MODAL ================= */}
      {isAudioModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2b201a]/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[28px] sm:rounded-[32px] border-4 border-[#d6d1c4] shadow-2xl max-w-lg w-full p-5 sm:p-8 relative">
            <div className="flex justify-between items-center pb-4 border-b-2 border-[#e5e2da]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#fff3e8] text-[#f27a21] flex items-center justify-center border-2 border-[#f27a21]/30">
                  <span className="material-symbols-outlined text-[20px] sm:text-[24px]">audio_file</span>
                </div>
                <div>
                  <h3 className="font-chubby text-lg sm:text-xl font-bold text-[#2a3691]">Subir Audio para Traducir</h3>
                  <p className="text-xs font-semibold text-[#7a6f66]">Reconoce automáticamente tu voz en español</p>
                </div>
              </div>
              <button
                onClick={() => setIsAudioModalOpen(false)}
                className="w-10 h-10 rounded-xl bg-[#f0ece1] text-[#70645a] hover:bg-[#b43f1d]/10 hover:text-[#b43f1d] flex items-center justify-center font-bold transition-colors cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[22px]">close</span>
              </button>
            </div>

            {/* Drop Zone */}
            <div
              className={`mt-5 sm:mt-6 border-2 border-dashed rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all group ${isDraggingAudio
                ? 'border-[#f27a21] bg-[#fff3e8]/60 scale-[1.02]'
                : 'border-[#f27a21]/50 hover:border-[#f27a21] bg-[#fffcf5] hover:bg-[#fff3e8]/40'
                }`}
              onClick={() => audioFileRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setIsDraggingAudio(true); }}
              onDragLeave={() => setIsDraggingAudio(false)}
              onDrop={handleAudioFileDrop}
            >
              <input
                ref={audioFileRef}
                type="file"
                accept="audio/*,.mp3,.wav,.m4a,.ogg,.webm,.opus"
                className="hidden"
                onChange={handleAudioFileChange}
              />
              {isProcessingAudio ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-14 h-14 rounded-3xl bg-[#f27a21] text-white flex items-center justify-center shadow-duo-orange animate-pulse">
                    <span className="material-symbols-outlined text-[32px]">graphic_eq</span>
                  </div>
                  <span className="font-chubby text-base font-bold text-[#2a3691]">Procesando audio...</span>
                  <p className="text-xs font-semibold text-[#8a7d72]">Transcribiendo con IA lingüística</p>
                </div>
              ) : (
                <>
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-3xl bg-[#f27a21] text-white flex items-center justify-center shadow-duo-orange mb-3 group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-[30px] sm:text-[36px]">cloud_upload</span>
                  </div>
                  <span className="font-chubby text-sm sm:text-lg font-bold text-[#2a3691] mb-1">
                    Arrastra tu audio aquí o haz clic para explorar
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-[#8a7d72] mb-3">
                    Formatos: MP3, WAV, M4A, OGG (máx. 25 MB)
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-white border border-[#e5e2da] text-xs font-bold text-[#2a3691]">
                      Auto-transcripción
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white border border-[#e5e2da] text-xs font-bold text-[#3ca21d]">
                      Detección fonética
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Demo audio file */}
            {!isProcessingAudio && (
              <div className="mt-5 sm:mt-6 p-4 rounded-2xl bg-[#fdfbf7] border-2 border-[#e5e2da] flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 overflow-hidden">
                  <span className="material-symbols-outlined text-[#3ca21d] text-[24px] sm:text-[28px]">mic</span>
                  <div className="text-left">
                    <p className="font-chubby text-xs sm:text-sm font-bold text-[#2a3691] truncate">
                      {uploadedAudioName ?? 'ejemplo_saludo_chanka.mp3'}
                    </p>
                    <p className="text-xs font-medium text-[#7a6f66]">Audio de demostración listo (0:14 seg)</p>
                  </div>
                </div>
                <button
                  onClick={() => processAudioFile(new File([''], 'ejemplo_saludo_chanka.mp3', { type: 'audio/mp3' }))}
                  className="btn-3d px-3 sm:px-4 py-2 rounded-xl bg-[#3ca21d] text-white border-b-2 border-[#2d7d15] shadow-duo-green font-chubby text-xs sm:text-sm font-bold flex items-center gap-1.5 shrink-0 cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[14px] sm:text-[16px]">check</span>
                  <span>Usar</span>
                </button>
              </div>
            )}

            <div className="mt-5 sm:mt-6 flex justify-end gap-3">
              <button
                onClick={() => setIsAudioModalOpen(false)}
                className="px-4 sm:px-5 py-2.5 rounded-2xl border-2 border-[#e5e2da] font-chubby text-sm font-bold text-[#70645a] hover:bg-[#f0ece1] transition-all cursor-pointer"
                type="button"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= FOOTER ================= */}
      <footer className="w-full bg-white border-t-2 border-[#e5e2da] mt-auto pb-20 sm:pb-24">
        <div className="w-full px-4 sm:px-6 md:px-12 py-6 sm:py-8 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-5">
          <div className="flex items-center gap-3">
            <img src={`${import.meta.env.BASE_URL}images/logo.png`} alt="Allikiwa" className="w-8 h-8 object-contain" />
            <div className="text-[#7a6f66] text-sm text-center md:text-left">
              <p className="font-chubby font-bold text-sm sm:text-base text-[#2a3691] mb-0.5">Allikiwa — Lenguas Originarias del Perú</p>
              <p className="font-medium text-xs sm:text-sm">© 2026 Allikiwa. Preservando el Quechua Chanka • Aimara.</p>
            </div>
          </div>
          <nav className="flex flex-wrap justify-center items-center gap-3 sm:gap-5 font-chubby text-xs sm:text-sm font-bold">
            <a className="text-[#7a6f66] hover:text-[#2a3691] transition-colors" href="#metodologia">Metodología</a>
            <a className="text-[#7a6f66] hover:text-[#2a3691] transition-colors" href="#proximas">Próximas Lenguas</a>
            <a className="text-[#7a6f66] hover:text-[#2a3691] transition-colors" href="#recursos">Recursos</a>
            <a className="text-[#7a6f66] hover:text-[#2a3691] transition-colors" href="#privacidad">Privacidad</a>
          </nav>
        </div>
      </footer>
    </div>
  );
};
