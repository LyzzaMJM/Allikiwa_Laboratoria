import React from 'react';
import { ScreenId, TransitionType } from '../types';
import { sounds } from '../utils/audio';

interface AppHeaderProps {
  onNavigate?: (screen: ScreenId, transition?: TransitionType) => void;
  rightContent?: React.ReactNode;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ onNavigate, rightContent }) => {
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    sounds.playTap();
    if (onNavigate) {
      onNavigate('traductor', 'none');
    }
  };

  return (
    <header className="w-full bg-white border-b-2 border-[#e5e2da] sticky top-0 z-40 shadow-xs">
      <div className="w-full px-3 sm:px-6 md:px-10 max-w-7xl mx-auto flex justify-between items-center h-16 sm:h-20 gap-2">
        {/* Logo Allikiwa - Responsive and Consistent across ALL devices and screens */}
        <a
          className="flex items-center gap-2 sm:gap-3 group cursor-pointer select-none shrink-0"
          onClick={handleLogoClick}
          href="#allikiwa"
          title="Allikiwa - Ir al inicio"
        >
          <img
            src={`${import.meta.env.BASE_URL}images/loguitodos.png`}
            alt="Logo Allikiwa"
            className="w-10 h-10 sm:w-12 sm:h-12 object-contain rounded-full shadow-sm group-hover:scale-105 transition-transform shrink-0"
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-1 sm:gap-1.5 leading-tight">
              <span className="font-chubby text-xl sm:text-2xl font-extrabold text-[#f27a21] tracking-wide">
                Allikiwa
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase px-1.5 sm:px-2 py-0.5 rounded-full bg-[#fff3e8] text-[#f27a21] border border-[#f27a21]/30 font-extrabold tracking-wider hidden xs:inline-block">
                Perú
              </span>
            </div>
            <span className="text-[11px] sm:text-xs font-bold text-[#8c7e73] -mt-0.5 hidden sm:block truncate max-w-[200px] md:max-w-none">
              Aprende, practica y conecta con nuestras lenguas
            </span>
          </div>
        </a>

        {/* Right Content Area (Responsive container) */}
        {rightContent && (
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {rightContent}
          </div>
        )}
      </div>
    </header>
  );
};
