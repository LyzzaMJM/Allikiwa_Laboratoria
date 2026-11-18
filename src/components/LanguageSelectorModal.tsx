import React from 'react';
import { sounds } from '../utils/audio';

export type SupportedLanguage = 'quechua' | 'aimara' | 'awajun' | 'repaso';

export interface LanguageOption {
  id: SupportedLanguage;
  variant?: string;
  name: string;
  nativeName?: string;
  region: string;
  badge?: string;
  badgeColor?: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  isAvailable: boolean;
  description: string;
}

export const AVAILABLE_LANGUAGES: LanguageOption[] = [
  {
    id: 'quechua',
    variant: 'chanka',
    name: 'Quechua Chanka',
    nativeName: 'Runa Simi (Chanka)',
    region: 'Ayacucho, Huancavelica, Apurímac',
    badge: 'Disponible',
    badgeColor: 'bg-[#e8f5e9] text-[#1b5e20] border-[#c8e6c9]',
    icon: 'eco',
    iconBg: 'bg-[#2a3691]/10',
    iconColor: 'text-[#2a3691]',
    isAvailable: true,
    description: 'Variante pentavocálica central-sur. Gramática regularizada con alfabeto normalizado.',
  },
  {
    id: 'quechua',
    variant: 'collao',
    name: 'Quechua Collao',
    nativeName: 'Qhichwa Simi (Qullaw)',
    region: 'Cusco, Puno, Arequipa, Moquegua',
    badge: 'Disponible',
    badgeColor: 'bg-[#e8f5e9] text-[#1b5e20] border-[#c8e6c9]',
    icon: 'mountain_flag',
    iconBg: 'bg-[#2a3691]/10',
    iconColor: 'text-[#2a3691]',
    isAvailable: true,
    description: 'Variante surandina caracterizada por fonemas oclusivos glotalizados y aspirados.',
  },
  {
    id: 'aimara',
    variant: 'central',
    name: 'Aimara Central',
    nativeName: 'Aymar Aru (Puno)',
    region: 'Puno (Cuenca del Lago Titicaca)',
    badge: 'Disponible',
    badgeColor: 'bg-[#fff3e0] text-[#e65100] border-[#ffe0b2]',
    icon: 'landscape',
    iconBg: 'bg-[#f27a21]/15',
    iconColor: 'text-[#f27a21]',
    isAvailable: true,
    description: 'Variante viva con rica tradición oral del altiplano y fonética glotalizada.',
  },
  {
    id: 'aimara',
    variant: 'lupaca',
    name: 'Aimara Lupaca',
    nativeName: 'Lupaq Aymar Aru',
    region: 'Chucuito, Ilave, Yunguyo',
    badge: 'Disponible',
    badgeColor: 'bg-[#fff3e0] text-[#e65100] border-[#ffe0b2]',
    icon: 'wb_sunny',
    iconBg: 'bg-[#f27a21]/15',
    iconColor: 'text-[#f27a21]',
    isAvailable: true,
    description: 'Dialecto histórico de los señoríos Lupaca con matices léxicos tradicionales.',
  },
  {
    id: 'awajun',
    name: 'Awajún',
    nativeName: 'Iñagke Awajún',
    region: 'Amazonas, Loreto, Cajamarca, San Martín',
    badge: 'En desarrollo',
    badgeColor: 'bg-[#fef9c3] text-[#854d0e] border-[#fde047]',
    icon: 'forest',
    iconBg: 'bg-[#00604f]/15',
    iconColor: 'text-[#00604f]',
    isAvailable: true,
    description: 'Pueblo originario de la cuenca del Marañón. Fonética y vocabulario en proceso de recopilación.',
  },
  {
    id: 'repaso',
    name: 'Cuaderno de Repaso',
    region: 'Práctica transversal',
    badge: 'Herramienta',
    badgeColor: 'bg-[#e0f2fe] text-[#0369a1] border-[#bae6fd]',
    icon: 'auto_stories',
    iconBg: 'bg-[#3ca21d]/15',
    iconColor: 'text-[#3ca21d]',
    isAvailable: true,
    description: 'Refuerza términos con fonética glotalizada, audios nativos y tarjetas de memoria.',
  },
];

interface LanguageSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: SupportedLanguage;
  currentVariant?: string;
  onSelectLanguage: (language: SupportedLanguage, variant?: string) => void;
}

export const LanguageSelectorModal: React.FC<LanguageSelectorModalProps> = ({
  isOpen,
  onClose,
  currentLanguage,
  currentVariant,
  onSelectLanguage,
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
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#ff842c]/20 border border-[#ff842c]/30 flex items-center justify-center text-[#9a4600]">
              <span className="material-symbols-outlined text-2xl font-variation-fill">translate</span>
            </div>
            <div>
              <h2 className="font-chubby text-lg sm:text-xl font-extrabold text-[#0e1c7b]">
                Cambiar Lengua de Estudio
              </h2>
              <p className="font-body-md text-xs sm:text-sm text-[#767683]">
                Selecciona la lengua o variante que deseas practicar
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

        {/* Language Options List */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-3 flex-1">
          {AVAILABLE_LANGUAGES.map((lang) => {
            const isSelected =
              lang.id === currentLanguage &&
              (!lang.variant || lang.variant === currentVariant);

            return (
              <button
                key={`${lang.id}-${lang.variant || 'default'}`}
                type="button"
                onClick={() => {
                  sounds.playTap();
                  onSelectLanguage(lang.id, lang.variant);
                  onClose();
                }}
                className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-start justify-between gap-3 cursor-pointer ${
                  isSelected
                    ? 'bg-[#fff5ee] border-[#f27a21] shadow-xs'
                    : 'bg-white border-[#ede8df] hover:border-[#ffcbb8] hover:bg-[#fffbf9]'
                }`}
              >
                <div className="flex items-start gap-3.5 flex-1 min-w-0">
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border border-black/5 ${lang.iconBg} ${lang.iconColor}`}
                  >
                    <span className="material-symbols-outlined text-2xl font-variation-fill">
                      {lang.icon}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-chubby text-base font-bold text-[#0e1c7b]">
                        {lang.name}
                      </h3>
                      {lang.badge && (
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${lang.badgeColor}`}
                        >
                          {lang.badge}
                        </span>
                      )}
                    </div>

                    {lang.nativeName && (
                      <p className="text-xs font-semibold text-[#f27a21] italic mt-0.5">
                        {lang.nativeName}
                      </p>
                    )}

                    <p className="text-xs text-[#6b7280] mt-1 line-clamp-2">
                      {lang.description}
                    </p>

                    <p className="text-[11px] text-[#9ca3af] mt-1 flex items-center gap-1 font-medium">
                      <span className="material-symbols-outlined text-[13px]">location_on</span>
                      <span>{lang.region}</span>
                    </p>
                  </div>
                </div>

                <div className="shrink-0 pt-1">
                  {isSelected ? (
                    <span className="material-symbols-outlined text-[#f27a21] text-2xl font-variation-fill">
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
        <div className="bg-[#fff8f6] px-5 py-3.5 border-t border-[#ede8df] flex justify-end">
          <button
            type="button"
            onClick={() => {
              sounds.playTap();
              onClose();
            }}
            className="btn-3d px-5 py-2 rounded-xl bg-white border border-[#ede8df] text-[#454652] hover:bg-[#fff1ed] font-chubby text-xs sm:text-sm font-bold cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
