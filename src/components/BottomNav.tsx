import React from 'react';
import { ScreenId } from '../types';
import { sounds } from '../utils/audio';

interface BottomNavProps {
  currentTab: 'traductor' | 'aprender' | 'transcriptor_pdf' | 'perfil';
  onSelectTab: (tab: ScreenId) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onSelectTab }) => {
  const tabs = [
    {
      id: 'traductor' as const,
      label: 'Traductor',
      icon: 'g_translate',
      badge: null,
    },
    {
      id: 'aprender' as const,
      label: 'Aprender',
      icon: 'school',
      badge: 'Niveles',
    },
    {
      id: 'transcriptor_pdf' as const,
      label: 'Transcriptor',
      icon: 'graphic_eq',
      badge: null,
    },
    {
      id: 'perfil' as const,
      label: 'Perfil',
      icon: 'person',
      badge: null,
    },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t-2 border-[#ede8df] px-2 py-1.5 sm:py-2 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] select-none safe-area-pb"
      aria-label="Navegación principal"
    >
      <div className="max-w-md mx-auto flex items-center justify-around gap-1">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                sounds.playTap();
                onSelectTab(tab.id);
              }}
              type="button"
              className={`flex-1 py-1.5 sm:py-2 px-2 rounded-2xl flex flex-col items-center justify-center transition-all duration-200 cursor-pointer relative group ${
                isActive
                  ? 'text-[#2a3691] font-extrabold scale-105'
                  : 'text-[#8c7e73] hover:text-[#2a3691] font-bold hover:bg-[#fff7f2]'
              }`}
            >
              {/* Active indicator dot or pill */}
              <div
                className={`w-10 h-7 sm:w-12 sm:h-8 rounded-xl flex items-center justify-center transition-all duration-200 mb-0.5 ${
                  isActive ? 'bg-[#ebedfa] text-[#2a3691] shadow-xs' : 'text-[#8c7e73] group-hover:text-[#2a3691]'
                }`}
              >
                <span
                  className="material-symbols-outlined text-[22px] sm:text-[24px]"
                  style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                >
                  {tab.icon}
                </span>
              </div>

              <span className="font-chubby text-[11px] sm:text-xs tracking-tight leading-none">
                {tab.label}
              </span>

              {tab.badge && (
                <span className="hidden sm:inline-block absolute top-1 right-2 text-[9px] bg-[#f27a21] text-white px-1.5 py-0.2 rounded-full font-extrabold uppercase scale-90">
                  {tab.badge}
                </span>
              )}

              {isActive && (
                <span className="absolute -bottom-1 w-5 h-1 bg-[#2a3691] rounded-full animate-in fade-in zoom-in duration-150" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

