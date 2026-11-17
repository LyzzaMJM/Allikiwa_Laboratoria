import React, { useState } from 'react';
import { ScreenId, TransitionType } from '../types';
import { MapaQuechuaScreen } from './MapaQuechuaScreen';
import { RutaAimaraScreen } from './RutaAimaraScreen';
import { CuadernoRepasoScreen } from './CuadernoRepasoScreen';
import { sounds } from '../utils/audio';

interface Props {
  onNavigate: (screen: ScreenId, transition?: TransitionType) => void;
  initialTab?: 'quechua' | 'aimara' | 'repaso' | 'awajun';
}

export type UserLevel = 'principiante' | 'intermedio' | 'avanzado';

export const AprenderScreen: React.FC<Props> = ({ onNavigate, initialTab = 'quechua' }) => {
  const [activeTab, setActiveTab] = useState<'quechua' | 'aimara' | 'repaso' | 'awajun'>(initialTab);
  
  // Nivel de conocimiento del usuario: Cuando NO sabe la lengua vs Cuando SÍ sabe
  const [userLevel, setUserLevel] = useState<UserLevel>('principiante');
  
  // Selector de variantes disponibles
  const [quechuaVariant, setQuechuaVariant] = useState<'chanka' | 'collao'>('chanka');
  const [aimaraVariant, setAimaraVariant] = useState<'central' | 'lupaca'>('central');

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
      {/* ============================================================== */}
      {/* PANEL SUPERIOR DE APRENDIZAJE: LENGUAS, NIVELES Y VARIANTES    */}
      {/* ============================================================== */}
      <section className="bg-white border-b-2 border-[#ede8df] px-3 sm:px-6 py-4 shadow-xs sticky top-16 sm:top-20 z-30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3 sm:gap-4">
          
          {/* Selector de Lenguas: Quechua, Aimara, Repaso, Awajún */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => {
                sounds.playTap();
                setActiveTab('quechua');
              }}
              className={`px-3 sm:px-4 py-2 rounded-2xl font-chubby text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'quechua'
                  ? 'bg-[#2a3691] text-white shadow-sm scale-102'
                  : 'bg-[#fff1ed] text-[#454652] hover:bg-[#ffe9e4]'
              }`}
            >
              <span className="material-symbols-outlined text-base">eco</span>
              <span>Quechua</span>
            </button>

            <button
              type="button"
              onClick={() => {
                sounds.playTap();
                setActiveTab('aimara');
              }}
              className={`px-3 sm:px-4 py-2 rounded-2xl font-chubby text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'aimara'
                  ? 'bg-[#f27a21] text-white shadow-sm scale-102'
                  : 'bg-[#fff1ed] text-[#454652] hover:bg-[#ffe9e4]'
              }`}
            >
              <span className="material-symbols-outlined text-base">landscape</span>
              <span>Aimara</span>
            </button>

            <button
              type="button"
              onClick={() => {
                sounds.playTap();
                setActiveTab('repaso');
              }}
              className={`px-3 sm:px-4 py-2 rounded-2xl font-chubby text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'repaso'
                  ? 'bg-[#3ca21d] text-white shadow-sm scale-102'
                  : 'bg-[#fff1ed] text-[#454652] hover:bg-[#ffe9e4]'
              }`}
            >
              <span className="material-symbols-outlined text-base">auto_stories</span>
              <span>Cuaderno de Repaso</span>
            </button>

            {/* LENGUA AWAJÚN - ESTAMOS TRABAJANDO EN ELLO */}
            <button
              type="button"
              onClick={() => {
                sounds.playTap();
                setActiveTab('awajun');
              }}
              className={`px-3 sm:px-4 py-2 rounded-2xl font-chubby text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer border-2 border-dashed ${
                activeTab === 'awajun'
                  ? 'bg-[#00604f] text-white border-[#00604f] shadow-sm'
                  : 'bg-[#f0fdf4] text-[#00604f] border-[#86efac] hover:bg-[#dcfce7]'
              }`}
              title="Lengua originaria amazónica Awajún"
            >
              <span className="material-symbols-outlined text-base">forest</span>
              <span>Awajún</span>
              <span className="text-[10px] uppercase font-extrabold px-1.5 py-0.5 rounded-full bg-[#fef08a] text-[#854d0e] tracking-tight">
                En desarrollo
              </span>
            </button>
          </div>

          {/* Configuración de Nivel y Variante (Para Quechua y Aimara) */}
          {(activeTab === 'quechua' || activeTab === 'aimara') && (
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full md:w-auto pt-2 md:pt-0 border-t md:border-t-0 border-[#ede8df]">
              
              {/* Nivel: Si sabe o no sabe la lengua */}
              <div className="flex items-center gap-1 bg-[#f5f1ea] p-1 rounded-2xl border border-[#ede8df]">
                <span className="text-[11px] font-bold text-[#6b5f55] px-2 hidden sm:inline">Nivel:</span>
                <button
                  type="button"
                  onClick={() => {
                    sounds.playTap();
                    setUserLevel('principiante');
                  }}
                  className={`px-2.5 sm:px-3 py-1 rounded-xl text-xs font-chubby font-bold transition-all cursor-pointer ${
                    userLevel === 'principiante'
                      ? 'bg-white text-[#2a3691] shadow-xs'
                      : 'text-[#6b5f55] hover:text-[#2a3691]'
                  }`}
                  title="Para quienes empiezan desde cero (no saben la lengua)"
                >
                  Desde cero (No sé)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    sounds.playTap();
                    setUserLevel('intermedio');
                  }}
                  className={`px-2.5 sm:px-3 py-1 rounded-xl text-xs font-chubby font-bold transition-all cursor-pointer ${
                    userLevel === 'intermedio'
                      ? 'bg-white text-[#f27a21] shadow-xs'
                      : 'text-[#6b5f55] hover:text-[#f27a21]'
                  }`}
                  title="Para quienes ya conocen palabras básicas o entienden parte de la lengua"
                >
                  Entiendo / Sé básico
                </button>
                <button
                  type="button"
                  onClick={() => {
                    sounds.playTap();
                    setUserLevel('avanzado');
                  }}
                  className={`px-2.5 sm:px-3 py-1 rounded-xl text-xs font-chubby font-bold transition-all cursor-pointer ${
                    userLevel === 'avanzado'
                      ? 'bg-white text-[#3ca21d] shadow-xs'
                      : 'text-[#6b5f55] hover:text-[#3ca21d]'
                  }`}
                  title="Para hablantes con fluidez que desean perfeccionar gramática y fonética"
                >
                  Fluido (Perfeccionar)
                </button>
              </div>

              {/* Selector de Variante Lingüística disponible */}
              {activeTab === 'quechua' && (
                <div className="flex items-center gap-1 bg-[#fff1ed] p-1 rounded-2xl border border-[#ffe2db]">
                  <span className="text-[11px] font-bold text-[#9a4600] px-2 hidden sm:inline">Variante:</span>
                  <button
                    type="button"
                    onClick={() => {
                      sounds.playTap();
                      setQuechuaVariant('chanka');
                    }}
                    className={`px-2.5 py-1 rounded-xl text-xs font-chubby font-bold transition-all cursor-pointer ${
                      quechuaVariant === 'chanka'
                        ? 'bg-[#2a3691] text-white shadow-xs'
                        : 'text-[#6b5f55] hover:text-[#2a3691]'
                    }`}
                    title="Variante Quechua Chanka (Ayacucho, Huancavelica, Apurímac)"
                  >
                    Chanka (Ayacucho)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      sounds.playTap();
                      setQuechuaVariant('collao');
                    }}
                    className={`px-2.5 py-1 rounded-xl text-xs font-chubby font-bold transition-all cursor-pointer ${
                      quechuaVariant === 'collao'
                        ? 'bg-[#2a3691] text-white shadow-xs'
                        : 'text-[#6b5f55] hover:text-[#2a3691]'
                    }`}
                    title="Variante Quechua Collao (Cusco, Puno)"
                  >
                    Collao (Cusco/Puno)
                  </button>
                </div>
              )}

              {activeTab === 'aimara' && (
                <div className="flex items-center gap-1 bg-[#fff1ed] p-1 rounded-2xl border border-[#ffe2db]">
                  <span className="text-[11px] font-bold text-[#9a4600] px-2 hidden sm:inline">Variante:</span>
                  <button
                    type="button"
                    onClick={() => {
                      sounds.playTap();
                      setAimaraVariant('central');
                    }}
                    className={`px-2.5 py-1 rounded-xl text-xs font-chubby font-bold transition-all cursor-pointer ${
                      aimaraVariant === 'central'
                        ? 'bg-[#f27a21] text-white shadow-xs'
                        : 'text-[#6b5f55] hover:text-[#f27a21]'
                    }`}
                    title="Aimara Central (Lago Titicaca / Puno)"
                  >
                    Central (Puno)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      sounds.playTap();
                      setAimaraVariant('lupaca');
                    }}
                    className={`px-2.5 py-1 rounded-xl text-xs font-chubby font-bold transition-all cursor-pointer ${
                      aimaraVariant === 'lupaca'
                        ? 'bg-[#f27a21] text-white shadow-xs'
                        : 'text-[#6b5f55] hover:text-[#f27a21]'
                    }`}
                    title="Variante Lupaca (Sur de Puno)"
                  >
                    Lupaca (Chucuito)
                  </button>
                </div>
              )}

            </div>
          )}

        </div>
      </section>

      {/* Main Tab Content */}
      <div className="flex-1">
        {activeTab === 'quechua' && (
          <MapaQuechuaScreen
            onNavigate={handleChildNavigate}
            userLevel={userLevel}
            variant={quechuaVariant}
          />
        )}
        {activeTab === 'aimara' && (
          <RutaAimaraScreen
            onNavigate={handleChildNavigate}
            userLevel={userLevel}
            variant={aimaraVariant}
          />
        )}
        {activeTab === 'repaso' && <CuadernoRepasoScreen onNavigate={handleChildNavigate} />}

        {/* PANTALLA ESPECIAL: LENGUA AWAJÚN (EN CONSTRUCCIÓN) */}
        {activeTab === 'awajun' && (
          <main className="flex-grow w-full max-w-[900px] mx-auto px-4 md:px-10 py-10">
            <div className="bg-white rounded-3xl border-2 border-[#86efac] p-6 sm:p-10 shadow-duo-card text-center relative overflow-hidden">
              
              {/* Badge superior */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f0fdf4] border border-[#86efac] text-[#00604f] font-chubby text-xs sm:text-sm font-bold mb-6">
                <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e] animate-ping" />
                <span>Pueblo Originario Awajún • Amazonía del Perú</span>
              </div>

              {/* Mascota / Ícono de construcción */}
              <div className="w-28 h-28 sm:w-36 sm:h-36 mx-auto rounded-full bg-gradient-to-tr from-[#dcfce7] to-[#bbf7d0] border-4 border-white shadow-lg flex items-center justify-center p-4 mb-6">
                <span className="material-symbols-outlined text-[64px] sm:text-[80px] text-[#00604f]">
                  construction
                </span>
              </div>

              <h1 className="font-chubby text-2xl sm:text-4xl font-extrabold text-[#00604f] tracking-tight mb-3">
                ¡Estamos trabajando en la lengua Awajún!
              </h1>
              
              <p className="font-body-md text-sm sm:text-base text-[#4b5563] max-w-xl mx-auto leading-relaxed mb-8">
                Actualmente estamos coordinando y recopilando registros orales, fonética y vocabulario cultural
                junto con sabios y docentes bilingües de las comunidades Awajún de Amazonas, Loreto, Cajamarca y San Martín.
              </p>

              {/* Tarjeta informativa del avance */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl mx-auto mb-8 text-left">
                <div className="bg-[#f0fdf4] p-4 rounded-2xl border border-[#bbf7d0]">
                  <span className="material-symbols-outlined text-[#00604f] text-2xl mb-1">record_voice_over</span>
                  <h3 className="font-chubby text-sm font-bold text-[#00604f]">Vocabulario Oral</h3>
                  <p className="text-xs text-[#4b5563] mt-0.5">En proceso de validación fonética con hablantes nativos.</p>
                </div>

                <div className="bg-[#f0fdf4] p-4 rounded-2xl border border-[#bbf7d0]">
                  <span className="material-symbols-outlined text-[#00604f] text-2xl mb-1">menu_book</span>
                  <h3 className="font-chubby text-sm font-bold text-[#00604f]">Alfabeto Oficial</h3>
                  <p className="text-xs text-[#4b5563] mt-0.5">Basado en la resolución ministerial de normalización lingüística.</p>
                </div>

                <div className="bg-[#f0fdf4] p-4 rounded-2xl border border-[#bbf7d0]">
                  <span className="material-symbols-outlined text-[#00604f] text-2xl mb-1">diversity_3</span>
                  <h3 className="font-chubby text-sm font-bold text-[#00604f]">Comunidad EIB</h3>
                  <p className="text-xs text-[#4b5563] mt-0.5">Construido con enfoque de Educación Intercultural Bilingüe.</p>
                </div>
              </div>

              {/* Botón para volver a Quechua o Aimara */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    sounds.playTap();
                    setActiveTab('quechua');
                  }}
                  className="btn-3d px-6 py-3 rounded-2xl bg-[#2a3691] text-white font-chubby text-sm font-bold shadow-duo-blue flex items-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-lg">eco</span>
                  <span>Practicar Quechua mientras tanto</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    sounds.playTap();
                    setActiveTab('aimara');
                  }}
                  className="btn-3d px-6 py-3 rounded-2xl bg-[#f27a21] text-white font-chubby text-sm font-bold shadow-duo-orange flex items-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-lg">landscape</span>
                  <span>Practicar Aimara</span>
                </button>
              </div>

            </div>
          </main>
        )}
      </div>
    </div>
  );
};
