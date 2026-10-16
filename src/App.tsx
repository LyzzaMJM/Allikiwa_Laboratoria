import React, { useState } from 'react';
import { ScreenId, TransitionType } from './types';
import { TraductorScreen } from './screens/TraductorScreen';
import { PerfilRegistroScreen } from './screens/PerfilRegistroScreen';
import { ProModalScreen } from './screens/ProModalScreen';
import { PerfilDinamicoScreen } from './screens/PerfilDinamicoScreen';
import { JuegosInteractivosScreen } from './screens/JuegosInteractivosScreen';
import { MapaQuechuaScreen } from './screens/MapaQuechuaScreen';
import { RutaAimaraScreen } from './screens/RutaAimaraScreen';
import { EjercicioIlustracionScreen } from './screens/EjercicioIlustracionScreen';
import { EjercicioEmparejarScreen } from './screens/EjercicioEmparejarScreen';
import { EjercicioDictadoScreen } from './screens/EjercicioDictadoScreen';
import { CuadernoRepasoScreen } from './screens/CuadernoRepasoScreen';
import { ScreenSwitcher } from './components/ScreenSwitcher';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('traductor');
  const [transition, setTransition] = useState<TransitionType>('none');

  const handleNavigate = (nextScreen: ScreenId, nextTransition: TransitionType = 'none') => {
    setTransition(nextTransition);
    setCurrentScreen(nextScreen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getTransitionClass = () => {
    switch (transition) {
      case 'slide_up':
        return 'animate-in slide-in-from-bottom duration-250 ease-out';
      case 'push':
        return 'animate-in slide-in-from-right duration-200 ease-out';
      case 'push_back':
        return 'animate-in slide-in-from-left duration-200 ease-out';
      case 'none':
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-[#fbf7ee] flex flex-col relative overflow-x-hidden">
      <div key={currentScreen} className={`flex-1 flex flex-col ${getTransitionClass()}`}>
        {currentScreen === 'traductor' && <TraductorScreen onNavigate={handleNavigate} />}
        {currentScreen === 'perfil_registro' && <PerfilRegistroScreen onNavigate={handleNavigate} />}
        {currentScreen === 'pro_popup' && <ProModalScreen onNavigate={handleNavigate} />}
        {currentScreen === 'perfil_dinamico' && <PerfilDinamicoScreen onNavigate={handleNavigate} />}
        {currentScreen === 'juegos_interactivos' && <JuegosInteractivosScreen onNavigate={handleNavigate} />}
        {currentScreen === 'mapa_quechua' && <MapaQuechuaScreen onNavigate={handleNavigate} />}
        {currentScreen === 'ruta_aimara' && <RutaAimaraScreen onNavigate={handleNavigate} />}
        {currentScreen === 'ejercicio_ilustracion' && <EjercicioIlustracionScreen onNavigate={handleNavigate} />}
        {currentScreen === 'ejercicio_emparejar' && <EjercicioEmparejarScreen onNavigate={handleNavigate} />}
        {currentScreen === 'ejercicio_dictado' && <EjercicioDictadoScreen onNavigate={handleNavigate} />}
        {currentScreen === 'cuaderno_repaso' && <CuadernoRepasoScreen onNavigate={handleNavigate} />}
      </div>

      {/* Floating Screen Switcher Drawer for seamless evaluation & browsing */}
      <ScreenSwitcher currentScreen={currentScreen} onSelect={(s) => handleNavigate(s, 'none')} />
    </div>
  );
}
