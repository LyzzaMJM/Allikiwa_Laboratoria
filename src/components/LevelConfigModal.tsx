import React from 'react';
import { sounds } from '../utils/audio';

export type UserLevelType = 'desde_cero' | 'basico' | 'intermedio' | 'avanzado';

export interface LevelInfo {
  id: UserLevelType;
  title: string;
  subtitle: string;
  badge: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  description: string;
  focus: string[];
}

export const USER_LEVELS: LevelInfo[] = [
  {
    id: 'desde_cero',
    title: 'Desde cero',
    subtitle: 'No conozco la lengua',
    badge: 'Principiante',
    icon: 'school',
    iconBg: 'bg-[#e0f2fe]',
    iconColor: 'text-[#0284c7]',
    description: 'Comienza desde las bases: alfabeto oficial, fonética elemental, sonidos característicos y saludos cotidianos.',
    focus: ['Alfabeto y pronunciación', 'Saludos y cortesía básica', 'Vocabulario visual cotidiano'],
  },
  {
    id: 'basico',
    title: 'Básico',
    subtitle: 'Conozco palabras o soy oyente pasivo',
    badge: 'Elemental',
    icon: 'menu_book',
    iconBg: 'bg-[#fef9c3]',
    iconColor: 'text-[#ca8a04]',
    description: 'Reconoces términos comunes y comprendes frases sencillas en tu entorno familiar o comunal.',
    focus: ['Familia, colores y números', 'Preguntas cotidianas frecuentes', 'Estructura de oraciones simples'],
  },
  {
    id: 'intermedio',
    title: 'Intermedio',
    subtitle: 'Comprendo conversaciones cotidianas',
    badge: 'Intermedio',
    icon: 'record_voice_over',
    iconBg: 'bg-[#dcfce7]',
    iconColor: 'text-[#16a34a]',
    description: 'Puedes mantener diálogos prácticos y deseas dominar sufijos, conjugación verbal y agilidad comunicativa.',
    focus: ['Sufijos gramaticales clave', 'Conjugaciones y tiempos verbales', 'Diálogos interactivos orales'],
  },
  {
    id: 'avanzado',
    title: 'Avanzado / Fluido',
    subtitle: 'Hablo con soltura y busco perfeccionar',
    badge: 'Avanzado',
    icon: 'psychology',
    iconBg: 'bg-[#f3e8ff]',
    iconColor: 'text-[#9333ea]',
    description: 'Fluidez oral natural. Enfocado en literatura oral, relatos tradicionales, traducción y formalización académica.',
    focus: ['Discursos ceremoniales y relatos', 'Gramática formal y ortografía EIB', 'Traducción avanzada y contextual'],
  },
];

export const LEVEL_LABELS: Record<UserLevelType, string> = {
  desde_cero: 'Desde cero',
  basico: 'Básico',
  intermedio: 'Intermedio',
  avanzado: 'Avanzado / Fluido',
};

interface LevelConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLevel: UserLevelType;
  onSelectLevel: (level: UserLevelType) => void;
}

export const LevelConfigModal: React.FC<LevelConfigModalProps> = ({
  isOpen,
  onClose,
  currentLevel,
  onSelectLevel,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-xl w-full border-2 border-[#ede8df] shadow-duo-card overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#fff8f6] p-5 sm:p-6 border-b border-[#ede8df] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#2a3691]/10 border border-[#2a3691]/20 flex items-center justify-center text-[#2a3691]">
              <span className="material-symbols-outlined text-2xl font-variation-fill">tune</span>
            </div>
            <div>
              <h2 className="font-chubby text-lg sm:text-xl font-extrabold text-[#0e1c7b]">
                Configurar Nivel de Aprendizaje
              </h2>
              <p className="font-body-md text-xs sm:text-sm text-[#767683]">
                Independiente de la lengua: adapta las lecciones a tu experiencia
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sounds.playTap();
              onClose();
            }}
            className="w-9 h-9 rounded-xl bg-white hover:bg-[#fff1ed] border border-[#ede8df] text-[#454652] hover:text-[#9a4600] flex items-center justify-center transition-colors cursor-pointer"
            type="button"
            title="Cerrar"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Level List */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-3 flex-1">
          {USER_LEVELS.map((level) => {
            const isSelected = level.id === currentLevel;

            return (
              <button
                key={level.id}
                type="button"
                onClick={() => {
                  sounds.playSuccess();
                  onSelectLevel(level.id);
                  onClose();
                }}
                className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-start justify-between gap-3.5 cursor-pointer ${
                  isSelected
                    ? 'bg-[#f0f4ff] border-[#2a3691] shadow-xs'
                    : 'bg-white border-[#ede8df] hover:border-[#cbd5e1] hover:bg-[#fafafa]'
                }`}
              >
                <div className="flex items-start gap-3.5 flex-1 min-w-0">
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border border-black/5 ${level.iconBg} ${level.iconColor}`}
                  >
                    <span className="material-symbols-outlined text-2xl font-variation-fill">
                      {level.icon}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-chubby text-base font-bold text-[#0e1c7b]">
                        {level.title}
                      </h3>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#f1f5f9] text-[#475569] border border-[#cbd5e1]">
                        {level.badge}
                      </span>
                    </div>

                    <p className="text-xs font-semibold text-[#f27a21] mt-0.5">
                      {level.subtitle}
                    </p>

                    <p className="text-xs text-[#64748b] mt-1 leading-relaxed">
                      {level.description}
                    </p>

                    {/* Focus points pills */}
                    <div className="flex flex-wrap gap-1.5 mt-2.5">
                      {level.focus.map((item, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-white border border-[#e2e8f0] text-[#475569] font-medium"
                        >
                          • {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="shrink-0 pt-1">
                  {isSelected ? (
                    <span className="material-symbols-outlined text-[#2a3691] text-2xl font-variation-fill">
                      check_circle
                    </span>
                  ) : (
                    <span className="material-symbols-outlined text-[#cbd5e1] text-2xl">
                      radio_button_unchecked
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="bg-[#fff8f6] px-5 py-3.5 border-t border-[#ede8df] flex justify-between items-center">
          <span className="text-xs text-[#767683]">
            Nivel actual: <strong className="text-[#0e1c7b]">{LEVEL_LABELS[currentLevel]}</strong>
          </span>

          <button
            type="button"
            onClick={() => {
              sounds.playTap();
              onClose();
            }}
            className="btn-3d px-5 py-2 rounded-xl bg-[#2a3691] text-white hover:bg-[#202b74] font-chubby text-xs sm:text-sm font-bold shadow-xs cursor-pointer"
          >
            Listo
          </button>
        </div>
      </div>
    </div>
  );
};
