import React, { useState, useEffect, useRef } from 'react';
import { RecordingItem, TranscriptSegment, Language, ScreenId, TransitionType } from '../types';
import { exportRecordingToPDF } from '../services/pdfExportService';
import { speechService } from '../services/speechService';
import { AudioWaveform } from './AudioWaveform';
import { PdfPreviewModal } from './PdfPreviewModal';
import { ChakanaIcon } from './ChakanaIcon';
import { AppHeader } from './AppHeader';
import {
  FileText,
  Download,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  Search,
  Plus,
  Mic,
  MicOff,
  Clock,
  User,
  MapPin,
  Tag,
  Share2,
  Check,
  Eye,
  Filter,
  Sparkles,
  BookOpen
} from 'lucide-react';

interface TranscriptorScreenProps {
  recordings: RecordingItem[];
  selectedLanguage: Language;
  onNavigateToVoiceMode?: () => void;
  onAddNewRecording: (rec: RecordingItem) => void;
  onNavigate?: (screen: ScreenId, transition?: TransitionType) => void;
}

export const TranscriptorScreen: React.FC<TranscriptorScreenProps> = ({
  recordings,
  selectedLanguage,
  onNavigateToVoiceMode,
  onAddNewRecording,
  onNavigate
}) => {
  const [selectedRecording, setSelectedRecording] = useState<RecordingItem>(recordings[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [languageFilter, setLanguageFilter] = useState<'all' | 'quechua' | 'aimara'>('all');

  // Audio Player State
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackTime, setPlaybackTime] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [activeSegmentIndex, setActiveSegmentIndex] = useState<number | null>(0);

  // PDF Preview Modal
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Live in-studio Recording modal/panel
  const [isStudioRecording, setIsStudioRecording] = useState(false);
  const [studioRecordTime, setStudioRecordTime] = useState(0);
  const [newTitle, setNewTitle] = useState('');
  const [newSpeaker, setNewSpeaker] = useState('');
  const [newCommunity, setNewCommunity] = useState('');
  const [newLang, setNewLang] = useState<'Quechua Chanka' | 'Aimara' | 'Bilingüe Quechua-Castellano'>('Quechua Chanka');
  const [showAddModal, setShowAddModal] = useState(false);

  // Playback timer ticker
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setPlaybackTime((prev) => {
          const next = prev + 1 * playbackSpeed;
          if (next >= selectedRecording.durationSeconds) {
            setIsPlaying(false);
            return 0;
          }
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed, selectedRecording]);

  // Sync active segment highlight with playback time
  useEffect(() => {
    const idx = selectedRecording.segments.findIndex((seg, i, arr) => {
      const nextSeg = arr[i + 1];
      if (nextSeg) {
        return playbackTime >= seg.seconds && playbackTime < nextSeg.seconds;
      }
      return playbackTime >= seg.seconds;
    });
    if (idx !== -1) {
      setActiveSegmentIndex(idx);
    }
  }, [playbackTime, selectedRecording]);

  // Studio recording timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isStudioRecording) {
      interval = setInterval(() => {
        setStudioRecordTime((prev) => prev + 1);
      }, 1000);
    } else {
      setStudioRecordTime(0);
    }
    return () => clearInterval(interval);
  }, [isStudioRecording]);

  const handleTogglePlay = () => {
    speechService.playFeedbackSound('tap');
    if (isPlaying) {
      setIsPlaying(false);
      speechService.stopSpeaking();
    } else {
      setIsPlaying(true);
      // Speak the current segment
      const currentSeg = selectedRecording.segments[activeSegmentIndex || 0];
      if (currentSeg) {
        speechService.speak(currentSeg.originalText, 'castellano');
      }
    }
  };

  const handlePlaySegment = (seg: TranscriptSegment, index: number) => {
    speechService.playFeedbackSound('tap');
    setPlaybackTime(seg.seconds);
    setActiveSegmentIndex(index);
    setIsPlaying(true);
    speechService.speak(seg.originalText, 'castellano', () => {
      // after finishing original, play translation if desired
    });
  };

  const handleSeek = (ratio: number) => {
    const newTime = Math.floor(ratio * selectedRecording.durationSeconds);
    setPlaybackTime(newTime);
  };

  const handleExportPDF = (recording: RecordingItem = selectedRecording) => {
    speechService.playFeedbackSound('success');
    exportRecordingToPDF(recording);
  };

  const handleCopyTranscript = (seg: TranscriptSegment) => {
    const text = `[${seg.timestamp}] ${seg.speaker}: "${seg.originalText}" -> "${seg.translatedText}"`;
    navigator.clipboard.writeText(text);
    setCopiedId(seg.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filter recordings
  const filteredRecordings = recordings.filter((rec) => {
    const matchesSearch =
      rec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.informant.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.community.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.segments.some(
        (s) =>
          s.originalText.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.translatedText.toLowerCase().includes(searchQuery.toLowerCase())
      );

    if (!matchesSearch) return false;

    if (languageFilter === 'quechua') {
      return rec.language.includes('Quechua');
    }
    if (languageFilter === 'aimara') {
      return rec.language.includes('Aimara');
    }
    return true;
  });

  // Handle Save New Studio Recording
  const handleSaveStudioRecording = () => {
    if (!newTitle.trim()) return;

    speechService.playFeedbackSound('success');
    setIsStudioRecording(false);
    setShowAddModal(false);

    const newRec: RecordingItem = {
      id: `rec-${Date.now()}`,
      title: newTitle.trim(),
      description: `Registro lingüístico comunitario grabado en vivo.`,
      date: new Date().toLocaleDateString('es-PE', { day: '2-digit', month: 'long', year: 'numeric' }),
      community: newCommunity.trim() || 'Comunidad Campesina',
      duration: `00:${studioRecordTime < 10 ? '0' : ''}${studioRecordTime || 12}`,
      durationSeconds: studioRecordTime || 12,
      language: newLang,
      informant: newSpeaker.trim() || 'Hablante Comunitario',
      transcriber: 'Allikiwa Transcriptor EIB',
      isUserRecording: true,
      tags: [newLang, 'En Vivo', 'Transcripción'],
      segments: [
        {
          id: `seg-live-1`,
          timestamp: '00:03',
          seconds: 3,
          speaker: newSpeaker.trim() || 'Hablante Originario',
          role: 'hablante',
          originalText: newLang.includes('Quechua')
            ? 'Rimaykullayki llapa wawqikunata panikunata. Kunan punchawmi huñunakunchik allin kawsanapaq.'
            : 'Kamisaraki taqpacha jilatanaka kullakanaka. Jichhurux sumankañatakiw tantachastanxa.',
          translatedText: 'Saludos a todos los hermanos y hermanas. Hoy nos reunimos para el buen vivir comunitario.',
          phonetics: '[ri-maj-kul-laj-ki ʎa-pa waw-qi-ku-na-ta pa-ni-ku-na-ta]',
          culturalNote: 'Fórmula protocolar de saludo y apertura en asamblea andina.',
          linguisticTag: newLang.includes('Quechua') ? 'Chanka' : 'Aimara Central'
        }
      ]
    };

    onAddNewRecording(newRec);
    setSelectedRecording(newRec);
    setNewTitle('');
    setNewSpeaker('');
    setNewCommunity('');
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-[#fff8f6] pb-20">

      {/* Top Navigation Header - Consistent across all screens */}
      <AppHeader
        onNavigate={onNavigate}
        rightContent={
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-white border-2 border-[#2a3691] text-[#2a3691] hover:bg-indigo-50/50 text-xs sm:text-sm font-chubby font-bold shadow-2xs transition-all active:scale-95 cursor-pointer shrink-0"
              type="button"
            >
              <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden xs:inline">Nueva Grabación</span>
              <span className="xs:hidden">Nueva</span>
            </button>

            <button
              onClick={() => setIsPdfModalOpen(true)}
              className="btn-3d flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-[#f27a21] hover:bg-[#d96614] border-b-2 border-[#c95c10] text-white text-xs sm:text-sm font-chubby font-extrabold shadow-md transition-all active:scale-95 cursor-pointer shrink-0"
              title="Exportar acta y transcripción en PDF para imprimir o guardar"
              type="button"
            >
              <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Exportar PDF</span>
            </button>
          </div>
        }
      />

      {/* Screen Title & Description */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 mt-6 sm:mt-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold font-chubby text-[#0e1c7b] tracking-tight">
          Grabaciones y Transcriptor Fonético
        </h1>
        <p className="text-xs sm:text-sm text-[#6b5f55] mt-1 max-w-2xl font-medium">
          Biblioteca de registros orales comunitarios con transcripción bilingüe paralela, fonética y exportación a documentos PDF oficiales.
        </p>
      </div>

      {/* Main Studio Body: 2 Columns on desktop */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* LEFT COLUMN (4 cols): Recordings Archive List */}
        <div className="lg:col-span-4 space-y-4">

          <div className="bg-white rounded-2xl p-4 border border-[#ede8df] shadow-xs space-y-3">

            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Buscar por palabra, pueblo, sabio..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#fff8f6] border border-[#ede8df] text-xs text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#2a3691]"
              />
            </div>

            {/* Language Filters */}
            <div className="flex items-center gap-1.5 text-xs">
              <button
                onClick={() => setLanguageFilter('all')}
                className={`px-3 py-1 rounded-lg font-semibold transition-colors ${languageFilter === 'all'
                    ? 'bg-[#0e1c7b] text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
              >
                Todas ({recordings.length})
              </button>
              <button
                onClick={() => setLanguageFilter('quechua')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-colors ${languageFilter === 'quechua'
                    ? 'bg-[#0e1c7b] text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
              >
                Quechua
              </button>
              <button
                onClick={() => setLanguageFilter('aimara')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-colors ${languageFilter === 'aimara'
                    ? 'bg-[#0e1c7b] text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
              >
                Aimara
              </button>
            </div>
          </div>

          {/* Recordings List */}
          <div className="space-y-3 max-h-[620px] overflow-y-auto pr-1">
            {filteredRecordings.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-2xl border border-[#ede8df] text-xs text-stone-500">
                No se encontraron grabaciones que coincidan con la búsqueda.
              </div>
            ) : (
              filteredRecordings.map((rec) => {
                const isSelected = selectedRecording.id === rec.id;

                return (
                  <div
                    key={rec.id}
                    onClick={() => {
                      speechService.playFeedbackSound('tap');
                      setSelectedRecording(rec);
                      setPlaybackTime(0);
                      setIsPlaying(false);
                      setActiveSegmentIndex(0);
                    }}
                    role="button"
                    tabIndex={0}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer select-none text-left ${isSelected
                        ? 'bg-white border-[#2a3691] shadow-md ring-2 ring-[#2a3691]/10'
                        : 'bg-white/80 hover:bg-white border-[#ede8df] hover:border-stone-300'
                      }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${rec.language.includes('Quechua')
                          ? 'bg-[#dfe0ff] text-[#000b62]'
                          : rec.language.includes('Aimara')
                            ? 'bg-[#ffdbc9] text-[#753400]'
                            : 'bg-emerald-100 text-emerald-900'
                        }`}>
                        {rec.language}
                      </span>

                      <span className="text-[11px] font-mono font-semibold text-stone-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {rec.duration}
                      </span>
                    </div>

                    <h3 className="font-heading font-bold text-sm text-[#0e1c7b] line-clamp-1 mb-1">
                      {rec.title}
                    </h3>

                    <p className="text-xs text-stone-600 line-clamp-2 mb-2">
                      {rec.description}
                    </p>

                    <div className="flex items-center justify-between text-[11px] text-stone-500 border-t border-[#ede8df] pt-2">
                      <span className="truncate max-w-[170px] font-medium">
                        {rec.informant}
                      </span>
                      <span className="text-[#f27a21] font-semibold text-[10px] flex items-center gap-1">
                        {rec.segments.length} turnos
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

        </div>

        {/* RIGHT COLUMN (8 cols): Recording Detail, Audio Waveform Player, and Bilingual Transcripts */}
        <div className="lg:col-span-8 space-y-6">

          {/* Current Recording Player Card */}
          <div className="bg-white rounded-3xl p-5 sm:p-7 border border-[#ede8df] shadow-md space-y-5">

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-[#0e1c7b] bg-[#dfe0ff] px-2.5 py-0.5 rounded-full">
                    {selectedRecording.language}
                  </span>
                  <span className="text-xs text-stone-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#f27a21]" />
                    {selectedRecording.community}
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold font-heading text-[#0e1c7b]">
                  {selectedRecording.title}
                </h2>
              </div>

              {/* Direct PDF Export Button on Player */}
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <button
                  onClick={() => setIsPdfModalOpen(true)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#2a3691] hover:bg-[#0e1c7b] text-white text-xs font-bold transition-all shadow-xs active:scale-95"
                  title="Ver y exportar PDF con actas y firmas"
                >
                  <Eye className="w-4 h-4 text-[#ff842c]" />
                  <span>Ver Acta / Exportar PDF</span>
                </button>
                <button
                  onClick={() => handleExportPDF()}
                  className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
                  title="Descargar archivo PDF directo"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Audio Waveform Scrub Bar */}
            <div className="space-y-2">
              <AudioWaveform
                isPlaying={isPlaying}
                currentTime={playbackTime}
                duration={selectedRecording.durationSeconds}
                color="#2a3691"
                barCount={48}
                onSeek={handleSeek}
              />

              <div className="flex items-center justify-between text-xs font-mono text-stone-500 px-1">
                <span>
                  {Math.floor(playbackTime / 60)}:{(playbackTime % 60).toString().padStart(2, '0')}
                </span>
                <span>
                  {selectedRecording.duration}
                </span>
              </div>
            </div>

            {/* Controls Bar: Play, Speed, Reset */}
            <div className="flex items-center justify-between pt-2 border-t border-[#ede8df]">

              <div className="flex items-center gap-3">
                <button
                  onClick={handleTogglePlay}
                  className="w-12 h-12 rounded-2xl bg-[#f27a21] hover:bg-[#d96614] text-white flex items-center justify-center shadow-md active:scale-95 transition-all"
                  aria-label={isPlaying ? 'Pausar audio' : 'Reproducir audio'}
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                </button>

                <button
                  onClick={() => {
                    speechService.playFeedbackSound('tap');
                    setPlaybackTime(0);
                    setActiveSegmentIndex(0);
                  }}
                  className="p-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors"
                  title="Reiniciar reproducción"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <div className="text-xs text-stone-600 hidden sm:block">
                  <span className="font-semibold text-stone-800">Hablante: </span>
                  {selectedRecording.informant}
                </div>
              </div>

              {/* Speed Multiplier Pill */}
              <div className="flex items-center gap-1 bg-[#fff8f6] p-1 rounded-xl border border-[#ede8df]">
                {[0.75, 1, 1.25, 1.5].map((speed) => (
                  <button
                    key={speed}
                    onClick={() => {
                      speechService.playFeedbackSound('tap');
                      setPlaybackSpeed(speed);
                    }}
                    className={`px-2 py-1 text-[11px] font-bold rounded-lg transition-colors ${playbackSpeed === speed
                        ? 'bg-[#2a3691] text-white'
                        : 'text-stone-600 hover:text-stone-900'
                      }`}
                  >
                    {speed}x
                  </button>
                ))}
              </div>

            </div>

          </div>

          {/* Bilingual Transcript Segments List */}
          <div className="bg-white rounded-3xl p-5 sm:p-7 border border-[#ede8df] shadow-md space-y-4">

            <div className="flex items-center justify-between border-b border-[#ede8df] pb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#2a3691]" />
                <h3 className="text-base font-bold font-heading text-[#0e1c7b]">
                  Transcripción Fonética y Análisis Bilingüe
                </h3>
              </div>

              <span className="text-xs text-stone-500 font-medium">
                {selectedRecording.segments.length} turnos de habla
              </span>
            </div>

            {/* Segments Stream */}
            <div className="space-y-4">
              {selectedRecording.segments.map((seg, idx) => {
                const isActive = activeSegmentIndex === idx;

                return (
                  <div
                    key={seg.id}
                    onClick={() => handlePlaySegment(seg, idx)}
                    className={`p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer select-none space-y-3 ${isActive
                        ? 'bg-[#fff8f6] border-[#2a3691] ring-2 ring-[#2a3691]/15 shadow-sm'
                        : 'bg-[#fdfbf7] hover:bg-white border-[#ede8df]'
                      }`}
                  >
                    {/* Segment Header */}
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#0e1c7b] bg-[#dfe0ff] px-2 py-0.5 rounded-md">
                          {seg.timestamp}
                        </span>
                        <span className="font-bold text-stone-900">
                          {seg.speaker}
                        </span>
                        <span className="text-[10px] text-stone-500 font-medium capitalize">
                          ({seg.role})
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {seg.linguisticTag && (
                          <span className="text-[10px] font-semibold bg-indigo-50 text-[#2a3691] border border-indigo-200 px-2 py-0.5 rounded-full">
                            {seg.linguisticTag}
                          </span>
                        )}

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopyTranscript(seg);
                          }}
                          className="p-1 rounded text-stone-400 hover:text-stone-700 hover:bg-stone-100"
                          title="Copiar turno de transcripción"
                        >
                          {copiedId === seg.id ? (
                            <Check className="w-3.5 h-3.5 text-[#3ca21d]" />
                          ) : (
                            <Share2 className="w-3.5 h-3.5" />
                          )}
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePlaySegment(seg, idx);
                          }}
                          className="p-1.5 rounded-lg bg-[#2a3691] text-white hover:bg-[#0e1c7b]"
                          title="Escuchar audio de este turno"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Original Native text */}
                    <div>
                      <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider block">
                        Texto Originario:
                      </span>
                      <p className="text-base font-bold text-stone-900 font-heading">
                        "{seg.originalText}"
                      </p>
                    </div>

                    {/* Phonetic Breakdown */}
                    {seg.phonetics && (
                      <div className="text-xs font-mono text-stone-600 bg-white p-2 rounded-xl border border-stone-200">
                        <span className="text-[10px] font-sans text-stone-400 block font-semibold">
                          Guía Fonética IPA:
                        </span>
                        {seg.phonetics}
                      </div>
                    )}

                    {/* Spanish Translation */}
                    <div>
                      <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider block">
                        Traducción al Castellano:
                      </span>
                      <p className="text-xs sm:text-sm text-stone-700">
                        {seg.translatedText}
                      </p>
                    </div>

                    {/* Cultural / Etymology Note (Terracotta design badge) */}
                    {seg.culturalNote && (
                      <div className="p-3 bg-[#ffede8] border-l-4 border-[#b43f1d] rounded-r-xl text-xs text-[#b43f1d] space-y-0.5">
                        <span className="font-bold text-[11px] uppercase tracking-wide block">
                          Nota Cultural / Etimológica:
                        </span>
                        <p>{seg.culturalNote}</p>
                      </div>
                    )}

                  </div>
                );
              })}
            </div>

            {/* Bottom Export Callout Bar */}
            <div className="pt-4 border-t border-[#ede8df] flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#fff8f6] p-4 rounded-2xl">
              <div>
                <h4 className="text-xs font-bold text-[#0e1c7b]">
                  ¿Deseas imprimir o archivar esta acta completa?
                </h4>
                <p className="text-[11px] text-stone-600">
                  Genera el documento oficial en PDF con encabezado cultural, tabla fonética y líneas de firma comunal.
                </p>
              </div>

              <button
                onClick={() => setIsPdfModalOpen(true)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#f27a21] hover:bg-[#d96614] text-white text-xs font-bold shadow-md whitespace-nowrap active:scale-95 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Exportar PDF Ahora</span>
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* MODAL: Nueva Grabación en Estudio */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-[#ede8df] shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-[#ede8df] pb-3">
              <div className="flex items-center gap-2">
                <ChakanaIcon className="w-6 h-6 text-[#2a3691]" />
                <h3 className="text-base font-bold font-heading text-[#0e1c7b]">
                  Nueva Grabación Comunitaria
                </h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-stone-400 hover:text-stone-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-stone-700 block mb-1">
                  Título del Registro Oral:
                </label>
                <input
                  type="text"
                  placeholder="Ej. Diálogo sobre saberes del clima y heladas"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#2a3691]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">
                    Hablante Originario:
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. Tata Melchor Condori"
                    value={newSpeaker}
                    onChange={(e) => setNewSpeaker(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#2a3691]"
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-700 block mb-1">
                    Comunidad / Lugar:
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. Cangallo, Ayacucho"
                    value={newCommunity}
                    onChange={(e) => setNewCommunity(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#2a3691]"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">
                  Lengua Principal:
                </label>
                <select
                  value={newLang}
                  onChange={(e) => setNewLang(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#2a3691]"
                >
                  <option value="Quechua Chanka">Quechua Chanka</option>
                  <option value="Aimara">Aimara</option>
                  <option value="Bilingüe Quechua-Castellano">Bilingüe Quechua-Castellano</option>
                </select>
              </div>

              {/* Live Mic Recording Simulation in Studio */}
              <div className="p-4 bg-[#fff8f6] rounded-2xl border border-[#ede8df] text-center space-y-3">
                <button
                  onClick={() => {
                    if (isStudioRecording) {
                      speechService.playFeedbackSound('stop-record');
                      setIsStudioRecording(false);
                    } else {
                      speechService.playFeedbackSound('start-record');
                      setIsStudioRecording(true);
                    }
                  }}
                  className={`w-14 h-14 rounded-full mx-auto flex items-center justify-center text-white transition-all shadow-md ${isStudioRecording ? 'bg-[#ba1a1a] animate-pulse ring-4 ring-rose-200' : 'bg-[#f27a21]'
                    }`}
                >
                  {isStudioRecording ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                </button>
                <p className="text-[11px] font-semibold text-stone-600">
                  {isStudioRecording
                    ? `Grabando en vivo... (${studioRecordTime}s)`
                    : 'Presiona para registrar audio del micrófono'}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-xl border border-stone-300 text-stone-600 text-xs font-semibold hover:bg-stone-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveStudioRecording}
                disabled={!newTitle.trim()}
                className="px-5 py-2 rounded-xl bg-[#2a3691] hover:bg-[#0e1c7b] disabled:opacity-50 text-white text-xs font-bold shadow-md transition-all"
              >
                Guardar y Transcribir
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PDF Document Preview & Export Modal */}
      <PdfPreviewModal
        recording={selectedRecording}
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
      />

    </div>
  );
};
