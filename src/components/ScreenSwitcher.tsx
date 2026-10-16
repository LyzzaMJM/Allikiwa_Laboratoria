import React, { useState } from 'react';
import { ScreenId } from '../types';

interface Props {
  currentScreen: ScreenId;
  onSelect: (screen: ScreenId) => void;
}

const SCREENS: { id: ScreenId; label: string; number: number }[] = [
  { id: 'traductor', label: '1. Traductor Amigable y Mascota Andina', number: 1 },
  { id: 'perfil_registro', label: '2. Perfil, Registro e Inicio de Sesión', number: 2 },
  { id: 'pro_popup', label: '3. Pop-up de Membresía Pro (S/ 20 al mes)', number: 3 },
  { id: 'perfil_dinamico', label: '4. Perfil Dinámico (Simulación)', number: 4 },
  { id: 'juegos_interactivos', label: '5. Aprender: Juegos y Ejercicios Interactivos', number: 5 },
  { id: 'mapa_quechua', label: '6. Aprender: Mapa de Niveles (Quechua)', number: 6 },
  { id: 'ruta_aimara', label: '7. Aprender: Ruta de Aprendizaje Aimara', number: 7 },
  { id: 'ejercicio_ilustracion', label: '8. Ejercicio: Elegir la Ilustración Correcta', number: 8 },
  { id: 'ejercicio_emparejar', label: '9. Ejercicio: Emparejar Pares', number: 9 },
  { id: 'ejercicio_dictado', label: '10. Ejercicio: Dictado y Fonética por Voz', number: 10 },
  { id: 'cuaderno_repaso', label: '11. Cuaderno de Repaso y Fonética', number: 11 }
];

export const ScreenSwitcher: React.FC<Props> = ({ currentScreen, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const activeIndex = SCREENS.findIndex((s) => s.id === currentScreen);
  const activeLabel = SCREENS[activeIndex]?.label || currentScreen;

  return (
    <div className="fixed bottom-4 left-4 z-50 select-none">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-3.5 py-2 rounded-2xl bg-[#0e1c7b] hover:bg-[#2a3691] text-white text-xs font-bold shadow-xl flex items-center gap-2 border border-white/20 transition-all cursor-pointer backdrop-blur-md"
          title="Menú de Pantallas del Prototipo"
          type="button"
        >
          <span className="w-2 h-2 rounded-full bg-[#3ca21d] animate-pulse"></span>
          <span className="max-w-[200px] truncate">{activeLabel}</span>
          <span className="material-symbols-outlined text-[16px]">
            {isOpen ? 'expand_more' : 'unfold_more'}
          </span>
        </button>

        {isOpen && (
          <div className="absolute bottom-12 left-0 w-80 bg-white rounded-3xl p-3 shadow-2xl border-2 border-[#ede8df] max-h-96 overflow-y-auto animate-in fade-in slide-in-from-bottom-2 duration-150">
            <div className="flex justify-between items-center px-2 py-1 mb-2 border-b border-[#ffe9e4]">
              <span className="text-[11px] font-bold text-[#767683] uppercase tracking-wider">
                11 Pantallas del Prototipo
              </span>
              <span className="text-[10px] bg-[#dfe0ff] text-[#0e1c7b] font-extrabold px-2 py-0.5 rounded-full">
                Allikiwa
              </span>
            </div>

            <div className="space-y-1">
              {SCREENS.map((screen) => {
                const isActive = screen.id === currentScreen;
                return (
                  <button
                    key={screen.id}
                    onClick={() => {
                      onSelect(screen.id);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                      isActive
                        ? 'bg-[#0e1c7b] text-white shadow-xs'
                        : 'text-[#3b0900] hover:bg-[#fff1ed]'
                    }`}
                    type="button"
                  >
                    <span className="truncate">{screen.label}</span>
                    {isActive && (
                      <span className="material-symbols-outlined text-[16px] text-[#76de55]">
                        check_circle
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
