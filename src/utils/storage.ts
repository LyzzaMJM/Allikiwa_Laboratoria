// ----------------------------------------------------------------
// Allikiwa — LocalStorage Utilities
// Todo se guarda localmente: cuenta, grabaciones y blobs de audio
// ----------------------------------------------------------------

export interface UserAccount {
  nombre: string;
  email: string;
  targetLang: 'quechua' | 'aimara';
  dailyGoal: 'casual' | 'regular' | 'intenso';
  streak: number;
  gems: number;
  hearts: number;
  isPro: boolean;
  createdAt: string;
}

const KEYS = {
  USER: 'allikiwa_user',
  RECORDINGS: 'allikiwa_recordings',
  AUDIO_BLOB_PREFIX: 'allikiwa_audio_',
} as const;

/* ---- Cuenta de usuario ---- */

export function saveUser(user: UserAccount): void {
  try {
    localStorage.setItem(KEYS.USER, JSON.stringify(user));
  } catch {
    console.warn('No se pudo guardar usuario en localStorage');
  }
}

export function loadUser(): UserAccount | null {
  try {
    const raw = localStorage.getItem(KEYS.USER);
    return raw ? (JSON.parse(raw) as UserAccount) : null;
  } catch {
    return null;
  }
}

export function clearUser(): void {
  localStorage.removeItem(KEYS.USER);
}

export function isUserLoggedIn(): boolean {
  return loadUser() !== null;
}

/* ---- Grabaciones (metadatos, sin blob) ---- */

export function saveRecordingsMeta(recs: object[]): void {
  try {
    localStorage.setItem(KEYS.RECORDINGS, JSON.stringify(recs));
  } catch {
    console.warn('No se pudo guardar grabaciones en localStorage');
  }
}

export function loadRecordingsMeta<T>(): T[] {
  try {
    const raw = localStorage.getItem(KEYS.RECORDINGS);
    return raw ? (JSON.parse(raw) as T[]) : [];
  } catch {
    return [];
  }
}

/* ---- Audio blobs (base64) — solo grabaciones propias del usuario ---- */

export function saveAudioBlob(id: string, base64: string): void {
  try {
    localStorage.setItem(KEYS.AUDIO_BLOB_PREFIX + id, base64);
  } catch {
    console.warn('No se pudo guardar audio en localStorage (posible límite de espacio)');
  }
}

export function loadAudioBlob(id: string): string | null {
  return localStorage.getItem(KEYS.AUDIO_BLOB_PREFIX + id);
}

export function removeAudioBlob(id: string): void {
  localStorage.removeItem(KEYS.AUDIO_BLOB_PREFIX + id);
}

/** Convierte un File/Blob a base64 para guardar en localStorage */
export async function fileToBase64(file: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/** Convierte base64 a Object URL para reproducir audio */
export function base64ToObjectUrl(base64: string): string {
  const [header, data] = base64.split(',');
  const mime = header.match(/:(.*?);/)?.[1] ?? 'audio/mpeg';
  const bytes = atob(data);
  const buffer = new Uint8Array(bytes.length);
  for (let i = 0; i < bytes.length; i++) buffer[i] = bytes.charCodeAt(i);
  const blob = new Blob([buffer], { type: mime });
  return URL.createObjectURL(blob);
}
