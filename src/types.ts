/* ------------------------------------------------------------------ */
/* NAVEGACIÓN                                                          */
/* ------------------------------------------------------------------ */

export type ScreenId =
  | 'traductor' // 1. Principal: Traductor Amigable y Mascota Andina
  | 'aprender' // 2. Principal: Módulo Unificado de Aprendizaje (Quechua / Aimara / Repaso)
  | 'transcriptor_pdf' // 3. Principal: Grabaciones y Transcriptor (Exportar PDF)
  | 'perfil' // 4. Principal: Perfil y Configuración unificada
  // Sub-pantallas y ejercicios (lanzados como overlays / modales)
  | 'perfil_registro'
  | 'perfil_dinamico'
  | 'pro_popup'
  | 'juegos_interactivos'
  | 'mapa_quechua'
  | 'ruta_aimara'
  | 'ejercicio_ilustracion'
  | 'ejercicio_emparejar'
  | 'ejercicio_dictado'
  | 'cuaderno_repaso'
  | 'voz_accesible';

export type TransitionType = 'none' | 'push' | 'push_back' | 'slide_up';

/* ------------------------------------------------------------------ */
/* PERFIL Y ESTADÍSTICAS                                               */
/* ------------------------------------------------------------------ */

export interface UserStats {
  streak: number;
  gems: number;
  hearts: number;
  name: string;
  isLoggedIn: boolean;
  activeLanguage: 'quechua' | 'aimara';
}

/* ------------------------------------------------------------------ */
/* MODO ACCESIBLE POR VOZ Y TRANSCRIPTOR                               */
/* ------------------------------------------------------------------ */

export type Language = 'quechua' | 'aimara' | 'castellano';

export interface PictorialPrompt {
  id: string;
  iconName: string;
  category: 'salud' | 'chacra' | 'ayllu' | 'qhatu' | 'auxilio' | 'familia';
  color: string;
  bgGradient: string;
  quechua: {
    title: string;
    phonetic: string;
    spokenPrompt: string;
    phrase: string;
    translation: string;
  };
  aimara: {
    title: string;
    phonetic: string;
    spokenPrompt: string;
    phrase: string;
    translation: string;
  };
  castellano: {
    title: string;
    phonetic: string;
    spokenPrompt: string;
    phrase: string;
    translation: string;
  };
}

export interface TranscriptSegment {
  id: string;
  timestamp: string;
  seconds: number;
  speaker: string;
  role: 'hablante' | 'traductor' | 'promotor' | 'comunero';
  originalText: string;
  translatedText: string;
  phonetics?: string;
  culturalNote?: string;
  linguisticTag?: 'Chanka' | 'Collao' | 'Aimara Central' | 'Lupaca' | 'Fonética';
}

export interface RecordingItem {
  id: string;
  title: string;
  description: string;
  date: string;
  community: string;
  duration: string;
  durationSeconds: number;
  language: 'Quechua Chanka' | 'Aimara' | 'Bilingüe Quechua-Castellano' | 'Bilingüe Aimara-Castellano';
  informant: string;
  transcriber: string;
  audioUrl?: string;
  isUserRecording?: boolean;
  segments: TranscriptSegment[];
  tags: string[];
}