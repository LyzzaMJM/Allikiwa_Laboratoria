export type ScreenId =
  | 'traductor' // 1. Allikiwa - Traductor Amigable y Mascota Andina
  | 'perfil_registro' // 2. Allikiwa - Perfil, Registro e Inicio de Sesión
  | 'pro_popup' // 3. Allikiwa - Pop-up de Membresía Pro (S/ 20 al mes)
  | 'perfil_dinamico' // 4. Allikiwa - Perfil, Registro e Inicio de Sesión (Simulación Dinámica)
  | 'juegos_interactivos' // 5. Allikiwa - Aprender: Juegos y Ejercicios Interactivos
  | 'mapa_quechua' // 6. Allikiwa - Aprender: Mapa de Niveles y Ruta Lúdica
  | 'ruta_aimara' // 7. Allikiwa - Aprender: Ruta de Aprendizaje Aimara
  | 'ejercicio_ilustracion' // 8. Allikiwa - Ejercicio: Elegir la Ilustración Correcta
  | 'ejercicio_emparejar' // 9. Allikiwa - Ejercicio: Emparejar Pares
  | 'ejercicio_dictado' // 10. Allikiwa - Ejercicio: Dictado y Fonética por Voz
  | 'cuaderno_repaso'; // 11. Allikiwa - Cuaderno de Repaso y Fonética

export type TransitionType = 'none' | 'push' | 'push_back' | 'slide_up';

export interface UserStats {
  streak: number;
  gems: number;
  hearts: number;
  name: string;
  isLoggedIn: boolean;
  activeLanguage: 'quechua' | 'aimara';
}
