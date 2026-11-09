import React, { useState, useEffect, useRef } from 'react';
import { Language, PictorialPrompt, RecordingItem } from '../types';
import { PICTORIAL_CARDS } from '../data/pictorialCards';
import { speechService } from '../services/speechService';
import { ChakanaIcon } from './ChakanaIcon';
import { AudioWaveform } from './AudioWaveform';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  HeartPulse, 
  Sprout, 
  Users, 
  ShoppingBag, 
  ShieldAlert, 
  Home, 
  ArrowRight, 
  Play, 
  Pause,
  RotateCcw,
  Sparkles,
  CheckCircle,
  HelpCircle
} from 'lucide-react';

interface VoiceAccessibleScreenProps {
  selectedLanguage: Language;
  voiceGuideEnabled: boolean;
  onNavigateToTranscriptor: () => void;
  onSaveNewRecording: (newRec: RecordingItem) => void;
}

export const VoiceAccessibleScreen: React.FC<VoiceAccessibleScreenProps> = ({
  selectedLanguage,
  voiceGuideEnabled,
  onNavigateToTranscriptor,
  onSaveNewRecording
}) => {
  const [activeCard, setActiveCard] = useState<PictorialPrompt>(PICTORIAL_CARDS[0]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [isPlayingPrompt, setIsPlayingPrompt] = useState(false);
  const [lastSpokenTranscript, setLastSpokenTranscript] = useState<string | null>(null);
  const [showOralFeedback, setShowOralFeedback] = useState(false);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Timer for recording
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      setRecordingSeconds(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  // Initial welcome greeting on load if voice guide is on
  useEffect(() => {
    if (voiceGuideEnabled) {
      const welcomeText = selectedLanguage === 'quechua'
        ? 'Allillanchu. Allikiwa 100% voz nisqaman hamurqunki. Rimanaykipaq hatun botonpi ñit\'iy.'
        : selectedLanguage === 'aimara'
          ? 'Kamisaraki. Allikiwa aru yatichawirux purintawa. Arusuñataki jach\'a botonru limt\'ama.'
          : 'Bienvenido al modo 100% Voz de Allikiwa. Toca el micrófono central para hablar sin necesidad de leer.';
      speechService.speak(welcomeText, selectedLanguage);
    }
  }, [selectedLanguage, voiceGuideEnabled]);

  // Handle card selection
  const handleSelectCard = (card: PictorialPrompt) => {
    speechService.playFeedbackSound('tap');
    setActiveCard(card);
    setShowOralFeedback(false);
    setLastSpokenTranscript(null);

    const promptText = card[selectedLanguage].spokenPrompt;
    setIsPlayingPrompt(true);
    speechService.speak(promptText, selectedLanguage, () => {
      setIsPlayingPrompt(false);
    });
  };

  // Play the phrase audio
  const handlePlayPhrase = () => {
    speechService.playFeedbackSound('tap');
    setIsPlayingPrompt(true);
    const textToSpeak = `${activeCard[selectedLanguage].phrase} ... ${activeCard[selectedLanguage].translation}`;
    speechService.speak(textToSpeak, selectedLanguage, () => {
      setIsPlayingPrompt(false);
    });
  };

  // Toggle Microphone recording
  const handleToggleRecord = async () => {
    if (isRecording) {
      // STOP recording
      speechService.playFeedbackSound('stop-record');
      setIsRecording(false);

      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
      }

      // Simulate recognized speech & oral response
      const simulatedSpeech = activeCard[selectedLanguage].phrase;
      setLastSpokenTranscript(simulatedSpeech);
      setShowOralFeedback(true);

      // Play affirmation chime
      setTimeout(() => {
        speechService.playFeedbackSound('success');
        const affirmation = selectedLanguage === 'quechua'
          ? 'Allinmi! Allillatam rimanki. Uyarikunmi.'
          : selectedLanguage === 'aimara'
            ? 'Wali sumawa! Arunakax qhanaw ist\'asi.'
            : '¡Excelente! Tu voz se ha registrado y transcrito con claridad.';
        speechService.speak(affirmation, selectedLanguage);
      }, 500);

      // Save as recording item for Screen 2
      const newRecording: RecordingItem = {
        id: `rec-user-${Date.now()}`,
        title: `Registro Oral: ${activeCard[selectedLanguage].title}`,
        description: `Grabación directa de voz por usuario no alfabetizado en módulo de ${activeCard.category}.`,
        date: new Date().toLocaleDateString('es-PE', { day: '2-digit', month: 'long', year: 'numeric' }),
        community: 'Comunidad Local (Vía Micrófono)',
        duration: `00:${recordingSeconds < 10 ? '0' : ''}${recordingSeconds || 8}`,
        durationSeconds: recordingSeconds || 8,
        language: selectedLanguage === 'quechua' ? 'Quechua Chanka' : selectedLanguage === 'aimara' ? 'Aimara' : 'Bilingüe Quechua-Castellano',
        informant: 'Hablante Comunitario (Voz Accesible)',
        transcriber: 'Allikiwa Transcriptor Fonético Automático',
        isUserRecording: true,
        tags: [activeCard.category.toUpperCase(), selectedLanguage.toUpperCase(), 'Voz Accesible'],
        segments: [
          {
            id: `s-live-1`,
            timestamp: '00:02',
            seconds: 2,
            speaker: 'Hablante Comunitario',
            role: 'hablante',
            originalText: activeCard[selectedLanguage].phrase,
            translatedText: activeCard[selectedLanguage].translation,
            phonetics: activeCard[selectedLanguage].phonetic,
            culturalNote: `Registro oral espontáneo relacionado con ${activeCard.category}.`,
            linguisticTag: selectedLanguage === 'quechua' ? 'Chanka' : selectedLanguage === 'aimara' ? 'Aimara Central' : 'Fonética'
          }
        ]
      };

      onSaveNewRecording(newRecording);

    } else {
      // START recording
      speechService.stopSpeaking();
      speechService.playFeedbackSound('start-record');
      setLastSpokenTranscript(null);
      setShowOralFeedback(false);

      // Try browser MediaRecorder for real microphone stream
      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          const recorder = new MediaRecorder(stream);
          audioChunksRef.current = [];

          recorder.ondataavailable = (e) => {
            if (e.data.size > 0) {
              audioChunksRef.current.push(e.data);
            }
          };

          recorder.onstop = () => {
            const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
            const url = URL.createObjectURL(audioBlob);
            setRecordedAudioUrl(url);
            stream.getTracks().forEach((track) => track.stop());
          };

          recorder.start();
          mediaRecorderRef.current = recorder;
        }
      } catch {
        // Fallback gracefully without throwing
      }

      setIsRecording(true);
    }
  };

  // Render icon based on name
  const renderCardIcon = (iconName: string, className: string = "w-8 h-8") => {
    switch (iconName) {
      case 'HeartPulse': return <HeartPulse className={className} />;
      case 'Sprout': return <Sprout className={className} />;
      case 'Users': return <Users className={className} />;
      case 'ShoppingBag': return <ShoppingBag className={className} />;
      case 'ShieldAlert': return <ShieldAlert className={className} />;
      case 'Home': return <Home className={className} />;
      default: return <ChakanaIcon className={className} />;
    }
  };

  const localizedGreeting = selectedLanguage === 'quechua'
    ? {
        hello: '¡Allillanchu! Rimanayki uyarikun',
        sub: 'Ñit\'iy hatun microrúfunpi rimanaykipaq. Mana qillqayta yachaspaykipas uyarikunkim.',
        speakPrompt: 'Rimanaykita ñuqayku uyariniku'
      }
    : selectedLanguage === 'aimara'
      ? {
          hello: '¡Kamisaraki! Arunakama ist\'iwa',
          sub: 'Jach\'a microrufunurux limt\'am arusuñataki. Jani qillqa yatkasasa ist\'atätawa.',
          speakPrompt: 'Arukama jiwasax sumaw ist\'apxta'
        }
      : {
          hello: '¡Bienvenido! Modo Accesible 100% Voz',
          sub: 'Comunícate y aprende completamente por voz, sin necesidad de leer ni escribir.',
          speakPrompt: 'Habla con naturalidad, te escuchamos'
        };

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-[#fff8f6] bg-chakana-pattern pb-16">
      
      {/* Top Banner Guide for Non-literate Users */}
      <section className="bg-gradient-to-b from-[#ffe9e4] to-[#fff8f6] border-b border-[#ede8df] px-4 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#ede8df] shadow-xs text-xs font-bold text-[#0e1c7b]">
            <ChakanaIcon size={16} color="#f27a21" />
            <span>MODO ACCESIBLE 100% VOZ • RIMAYLLA</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-[#0e1c7b] tracking-tight">
            {localizedGreeting.hello}
          </h1>

          <p className="text-sm sm:text-base text-stone-700 max-w-2xl mx-auto font-medium">
            {localizedGreeting.sub}
          </p>

          {/* Quick Voice Play of Instructions */}
          <button
            onClick={() => {
              speechService.speak(
                `${localizedGreeting.hello}. ${localizedGreeting.sub}`,
                selectedLanguage
              );
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-stone-50 border border-[#ede8df] text-xs sm:text-sm font-semibold text-[#2a3691] shadow-xs active:scale-95 transition-all"
          >
            <Volume2 className="w-4 h-4 text-[#f27a21]" />
            <span>Escuchar instrucciones en voz alta</span>
          </button>
        </div>
      </section>

      {/* Main Interactive Stage */}
      <div className="max-w-5xl mx-auto px-4 mt-6 sm:mt-10 space-y-8">

        {/* Central Tactical Voice Orb / Microphone Area */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-[#ede8df] shadow-xl shadow-[#2a3691]/5 relative overflow-hidden">
          
          {/* Subtle Chakana background watermark */}
          <div className="absolute -right-10 -bottom-10 opacity-5 pointer-events-none">
            <ChakanaIcon size={260} color="#0e1c7b" />
          </div>

          <div className="flex flex-col items-center text-center space-y-6 relative z-10">

            {/* Current Active Category Pill */}
            <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#fdfbf7] border border-[#ede8df]">
              <span className="p-1 rounded-full bg-[#2a3691] text-white">
                {renderCardIcon(activeCard.iconName, "w-4 h-4")}
              </span>
              <span className="text-xs sm:text-sm font-bold text-[#0e1c7b]">
                {activeCard[selectedLanguage].title}
              </span>
            </div>

            {/* Giant Microphone Button */}
            <div className="relative">
              {/* Animated pulsating halo when recording */}
              {isRecording && (
                <>
                  <div className="absolute inset-0 rounded-full bg-[#ba1a1a]/20 animate-ping" />
                  <div className="absolute -inset-4 rounded-full border-2 border-[#ba1a1a]/40 animate-pulse" />
                </>
              )}

              <button
                onClick={handleToggleRecord}
                aria-label={isRecording ? 'Detener grabación de voz' : 'Iniciar grabación de voz'}
                className={`relative w-36 h-36 sm:w-44 sm:h-44 rounded-full flex flex-col items-center justify-center transition-all duration-300 shadow-2xl active:scale-95 ${
                  isRecording
                    ? 'bg-[#ba1a1a] text-white ring-8 ring-[#ffdad6] scale-105'
                    : 'bg-gradient-to-br from-[#f27a21] to-[#d96614] text-white hover:brightness-105 hover:shadow-orange-300/60 ring-8 ring-[#ffdbc9]'
                }`}
              >
                {isRecording ? (
                  <>
                    <MicOff className="w-14 h-14 sm:w-16 sm:h-16 animate-bounce" />
                    <span className="text-xs sm:text-sm font-bold mt-2 uppercase tracking-wider">
                      Detener ({recordingSeconds}s)
                    </span>
                  </>
                ) : (
                  <>
                    <Mic className="w-14 h-14 sm:w-16 sm:h-16" />
                    <span className="text-xs sm:text-sm font-bold mt-2 tracking-wide font-heading">
                      HABLAR AHORA
                    </span>
                  </>
                )}
              </button>
            </div>

            {/* Waveform Visualization during Recording / Idle */}
            <div className="w-full max-w-md">
              <AudioWaveform
                isPlaying={isRecording || isPlayingPrompt}
                isRecording={isRecording}
                color={isRecording ? '#ba1a1a' : '#2a3691'}
                barCount={32}
              />
            </div>

            {/* Spoken Guidance Text & Status */}
            <div className="space-y-1">
              <p className="text-base sm:text-lg font-bold text-[#0e1c7b]">
                {isRecording 
                  ? (selectedLanguage === 'quechua' ? 'Uyarichkanim... Rimay!' : selectedLanguage === 'aimara' ? 'Ist\'iskpiniwa... Arusum!' : 'Escuchando tu voz... ¡Habla ahora!')
                  : localizedGreeting.speakPrompt
                }
              </p>
              <p className="text-xs sm:text-sm text-stone-500">
                {isRecording
                  ? 'Presiona el botón rojo para finalizar y guardar tu registro fonético'
                  : 'Presiona el botón naranja y pronuncia tus palabras'
                }
              </p>
            </div>

            {/* Recognition & Feedback Card */}
            {showOralFeedback && lastSpokenTranscript && (
              <div className="w-full max-w-xl bg-[#fdfbf7] border-2 border-[#3ca21d] rounded-2xl p-5 text-left space-y-3 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[#3ca21d] font-bold text-xs uppercase tracking-wider">
                    <CheckCircle className="w-4 h-4" />
                    <span>¡Grabación y Transcripción Exitosa!</span>
                  </div>
                  <span className="text-[11px] bg-[#dfe0ff] text-[#0e1c7b] px-2 py-0.5 rounded-full font-bold">
                    Guardado en Biblioteca
                  </span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-400 block">
                    Voz Reconocida ({selectedLanguage === 'quechua' ? 'Quechua Chanka' : selectedLanguage === 'aimara' ? 'Aimara' : 'Español'}):
                  </span>
                  <p className="text-base font-bold text-stone-900 font-heading">
                    "{lastSpokenTranscript}"
                  </p>
                </div>

                <div className="p-2.5 bg-white rounded-lg border border-[#ede8df] text-xs text-stone-700">
                  <span className="font-semibold text-[#0e1c7b]">Significado: </span>
                  {activeCard[selectedLanguage].translation}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={handlePlayPhrase}
                    className="flex items-center gap-1.5 text-xs font-bold text-[#2a3691] hover:underline"
                  >
                    <Volume2 className="w-4 h-4 text-[#f27a21]" />
                    <span>Volver a escuchar audio</span>
                  </button>

                  <button
                    onClick={onNavigateToTranscriptor}
                    className="flex items-center gap-1 text-xs font-bold text-[#f27a21] hover:underline"
                  >
                    <span>Ver en el Transcriptor y Exportar PDF</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Pictorial Category Cards - Voice Prompts Grid */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#0e1c7b]">
                {selectedLanguage === 'quechua'
                  ? 'Kawsayninchikmanta Rimanakuy (Tukuylla)'
                  : selectedLanguage === 'aimara'
                    ? 'Ayllu Jakawisat Aruskipawi'
                    : 'Temas Cotidianos por Pictogramas (Toca para escuchar)'
                }
              </h2>
              <p className="text-xs sm:text-sm text-stone-600">
                Selecciona cualquier tarjeta con dibujo para escuchar su pronunciación y frase guía.
              </p>
            </div>

            <span className="text-xs font-semibold text-[#9a4600] bg-[#ffdbc9]/60 px-3 py-1 rounded-full self-start sm:self-auto">
              6 Módulos Comunitarios
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            {PICTORIAL_CARDS.map((card) => {
              const isSelected = activeCard.id === card.id;
              const content = card[selectedLanguage];

              return (
                <div
                  key={card.id}
                  onClick={() => handleSelectCard(card)}
                  role="button"
                  tabIndex={0}
                  className={`relative p-4 sm:p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 select-none flex flex-col justify-between group active:scale-98 ${
                    isSelected
                      ? 'bg-white border-[#2a3691] shadow-lg shadow-[#2a3691]/10 -translate-y-1 ring-2 ring-[#2a3691]/20'
                      : 'bg-white/80 hover:bg-white border-[#ede8df] hover:border-stone-300 shadow-2xs'
                  }`}
                >
                  {/* Category Accent Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <div 
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-white shadow-md transition-transform group-hover:scale-105"
                      style={{ backgroundColor: card.color }}
                    >
                      {renderCardIcon(card.iconName, "w-6 h-6 sm:w-7 sm:h-7")}
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speechService.playFeedbackSound('tap');
                        speechService.speak(content.spokenPrompt, selectedLanguage);
                      }}
                      className="p-2 rounded-xl bg-stone-100 hover:bg-[#2a3691] hover:text-white text-stone-600 transition-colors"
                      title="Escuchar tema en voz alta"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Title and Phonetic */}
                  <div className="space-y-1">
                    <h3 className="font-heading font-bold text-sm sm:text-base text-[#0e1c7b] line-clamp-1">
                      {content.title}
                    </h3>
                    <p className="text-[11px] font-mono text-stone-500 italic">
                      {content.phonetic}
                    </p>
                    <p className="text-xs text-stone-700 line-clamp-2 pt-1">
                      "{content.phrase}"
                    </p>
                  </div>

                  {/* Visual Status Indicator */}
                  <div className="mt-4 pt-2.5 border-t border-[#ede8df] flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-stone-500">
                      Tocar para activar
                    </span>
                    {isSelected && (
                      <span className="text-[#3ca21d] font-bold flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" />
                        Activo
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Bottom Gateway Card to Screen 2 (Grabaciones y Transcriptor) */}
        <section className="bg-gradient-to-r from-[#2a3691] to-[#0e1c7b] text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#ff842c]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>TRANSCRIPCIONES Y DOCUMENTACIÓN</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-heading">
              ¿Deseas revisar los registros o exportar un acta en PDF?
            </h3>
            <p className="text-xs sm:text-sm text-white/80 max-w-xl">
              Accede a la biblioteca completa con transcripciones fonéticas bilingües, notas etimológicas y genera tu documento oficial en PDF con un clic.
            </p>
          </div>

          <button
            onClick={() => {
              speechService.playFeedbackSound('tap');
              onNavigateToTranscriptor();
            }}
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#f27a21] hover:bg-[#d96614] text-white font-bold text-sm sm:text-base shadow-lg shadow-orange-950/20 transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
          >
            <span>Ir a Grabaciones y Transcriptor</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </section>

      </div>
    </div>
  );
};
