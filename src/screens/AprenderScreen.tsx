import React, { useState } from 'react';
import { ScreenId, TransitionType } from '../types';
import { MapaQuechuaScreen } from './MapaQuechuaScreen';
import { RutaAimaraScreen } from './RutaAimaraScreen';
import { CuadernoRepasoScreen } from './CuadernoRepasoScreen';

interface Props {
  onNavigate: (screen: ScreenId, transition?: TransitionType) => void;
  initialTab?: 'quechua' | 'aimara' | 'repaso';
}

export const AprenderScreen: React.FC<Props> = ({ onNavigate, initialTab = 'quechua' }) => {
  const [activeTab, setActiveTab] = useState<'quechua' | 'aimara' | 'repaso'>(initialTab);

  // Custom onNavigate wrapper to handle tab switches within Aprender seamlessly
  const handleChildNavigate = (screen: ScreenId, transition?: TransitionType) => {
    if (screen === 'mapa_quechua') {
      setActiveTab('quechua');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (screen === 'ruta_aimara') {
      setActiveTab('aimara');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (screen === 'cuaderno_repaso') {
      setActiveTab('repaso');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    // All other navigations (exercises, overlays, profile, etc.) are delegated
    onNavigate(screen, transition);
  };

  return (
    <div className="min-h-screen bg-[#fff8f6] flex flex-col pb-20">
      {/* Main Tab Content */}
      <div className="flex-1">
        {activeTab === 'quechua' && <MapaQuechuaScreen onNavigate={handleChildNavigate} />}
        {activeTab === 'aimara' && <RutaAimaraScreen onNavigate={handleChildNavigate} />}
        {activeTab === 'repaso' && <CuadernoRepasoScreen onNavigate={handleChildNavigate} />}
      </div>
    </div>
  );
};

