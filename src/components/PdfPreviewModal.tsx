import React from 'react';
import { RecordingItem } from '../types';
import { exportRecordingToPDF } from '../services/pdfExportService';
import { ChakanaIcon } from './ChakanaIcon';
import { Download, Printer, X, FileText, CheckCircle2 } from 'lucide-react';

interface PdfPreviewModalProps {
  recording: RecordingItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PdfPreviewModal: React.FC<PdfPreviewModalProps> = ({
  recording,
  isOpen,
  onClose
}) => {
  if (!isOpen || !recording) return null;

  const handleDownloadPdf = () => {
    exportRecordingToPDF(recording);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div 
        className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-[#ede8df] flex flex-col max-h-[92vh] overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
        aria-label="Vista Previa de Acta de Transcripción PDF"
      >
        {/* Modal Toolbar (hidden in print) */}
        <div className="no-print flex items-center justify-between px-5 py-3.5 bg-[#0e1c7b] text-white border-b border-[#2a3691]">
          <div className="flex items-center gap-2.5">
            <ChakanaIcon className="w-6 h-6 text-[#ff842c]" />
            <div>
              <h2 className="text-base font-semibold font-heading tracking-wide">
                Exportar Acta y Transcripción en PDF
              </h2>
              <p className="text-xs text-white/80">
                Documento bilingüe oficial con glosa fonética y valor comunitario
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadPdf}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#f27a21] hover:bg-[#d96614] text-white text-xs font-semibold shadow-sm transition-colors active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>Descargar .PDF</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors"
              title="Imprimir directamente"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Imprimir</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors ml-1"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Preview Area */}
        <div className="p-4 sm:p-8 overflow-y-auto bg-stone-100 flex-1 flex justify-center">
          <div className="bg-white w-full max-w-[760px] p-6 sm:p-10 rounded-xl shadow-md border border-stone-200 text-[#1e293b] text-sm leading-relaxed font-sans">
            
            {/* Header Brand Banner */}
            <div className="border-b-4 border-[#2a3691] pb-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#2a3691] text-white flex items-center justify-center font-bold">
                    <ChakanaIcon size={24} color="#ffffff" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold font-heading text-[#0e1c7b] tracking-tight">
                      ALLIKIWA EDTECH
                    </h1>
                    <p className="text-xs font-medium text-stone-500 uppercase tracking-wider">
                      Archivo de Lenguas Originarias del Perú • Quechua Chanka y Aimara
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="inline-block px-2.5 py-1 bg-[#2a3691]/10 text-[#2a3691] text-[11px] font-bold rounded-full border border-[#2a3691]/20">
                    ACTA REGISTRADA
                  </span>
                  <p className="text-[10px] text-stone-400 mt-1">
                    Doc ID: {recording.id.toUpperCase()}
                  </p>
                </div>
              </div>
            </div>

            {/* Document Title */}
            <div className="mb-5">
              <h2 className="text-lg font-bold text-[#0e1c7b] font-heading mb-1">
                {recording.title}
              </h2>
              <p className="text-xs text-stone-600 italic">
                {recording.description}
              </p>
            </div>

            {/* Metadata Box */}
            <div className="bg-[#fff8f6] border border-[#ede8df] rounded-lg p-3.5 mb-6 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <span className="text-stone-500 block text-[11px]">Lengua Originaria:</span>
                <span className="font-semibold text-[#0e1c7b]">{recording.language}</span>
              </div>
              <div>
                <span className="text-stone-500 block text-[11px]">Comunidad / Territorio:</span>
                <span className="font-semibold text-stone-800">{recording.community}</span>
              </div>
              <div>
                <span className="text-stone-500 block text-[11px]">Fecha de Registro:</span>
                <span className="font-semibold text-stone-800">{recording.date}</span>
              </div>
              <div>
                <span className="text-stone-500 block text-[11px]">Hablante / Sabio(a):</span>
                <span className="font-semibold text-[#9a4600]">{recording.informant}</span>
              </div>
              <div>
                <span className="text-stone-500 block text-[11px]">Transcriptor / Lingüista:</span>
                <span className="font-semibold text-stone-800">{recording.transcriber}</span>
              </div>
              <div>
                <span className="text-stone-500 block text-[11px]">Duración:</span>
                <span className="font-semibold text-stone-800">{recording.duration} ({recording.segments.length} turnos)</span>
              </div>
            </div>

            {/* Transcripts List */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3 border-b pb-1.5 border-stone-200">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#2a3691] flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" />
                  Transcripción Fonética y Traducción Paralela
                </h3>
                <span className="text-[11px] text-stone-500">
                  Norma oficial MINEDU R.M. 1218
                </span>
              </div>

              <div className="space-y-4">
                {recording.segments.map((seg) => (
                  <div 
                    key={seg.id} 
                    className="p-3.5 rounded-lg border border-[#ede8df] bg-[#fdfbf7] space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px] font-bold text-[#0e1c7b] bg-[#dfe0ff] px-1.5 py-0.5 rounded">
                          {seg.timestamp}
                        </span>
                        <span className="font-bold text-stone-900">
                          {seg.speaker}
                        </span>
                        <span className="text-[10px] text-stone-500 capitalize">
                          ({seg.role})
                        </span>
                      </div>
                      {seg.linguisticTag && (
                        <span className="text-[10px] bg-indigo-50 text-[#2a3691] border border-indigo-200 px-2 py-0.5 rounded-full font-medium">
                          {seg.linguisticTag}
                        </span>
                      )}
                    </div>

                    {/* Original Native text */}
                    <div>
                      <span className="text-[10px] font-semibold text-stone-500 block uppercase">
                        Lengua Originaria:
                      </span>
                      <p className="font-semibold text-stone-900 text-sm">
                        "{seg.originalText}"
                      </p>
                    </div>

                    {/* Phonetics */}
                    {seg.phonetics && (
                      <div className="text-stone-600 text-xs font-mono bg-white/80 px-2.5 py-1 rounded border border-stone-200">
                        <span className="text-[10px] text-stone-500 not-italic block font-sans">Fonética aproximada:</span>
                        {seg.phonetics}
                      </div>
                    )}

                    {/* Spanish Translation */}
                    <div>
                      <span className="text-[10px] font-semibold text-stone-500 block uppercase">
                        Traducción al Castellano:
                      </span>
                      <p className="text-stone-700 text-xs">
                        {seg.translatedText}
                      </p>
                    </div>

                    {/* Cultural Note */}
                    {seg.culturalNote && (
                      <div className="p-2 bg-[#ffede8] border-l-3 border-[#b43f1d] rounded text-[11px] text-[#b43f1d]">
                        <strong>Nota Cultural / Etimología: </strong>
                        {seg.culturalNote}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Validation Signatures */}
            <div className="pt-6 border-t-2 border-stone-200 mt-8">
              <div className="grid grid-cols-2 gap-8 text-center text-xs">
                <div>
                  <div className="h-14 border-b border-stone-400 mx-auto max-w-[200px]" />
                  <p className="font-semibold text-stone-800 mt-2">
                    {recording.informant}
                  </p>
                  <p className="text-[10px] text-stone-500">
                    Hablante Originario / Huella Comunal
                  </p>
                </div>

                <div>
                  <div className="h-14 border-b border-stone-400 mx-auto max-w-[200px]" />
                  <p className="font-semibold text-stone-800 mt-2">
                    {recording.transcriber}
                  </p>
                  <p className="text-[10px] text-stone-500">
                    Transcriptor(a) / Lingüista Validador
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] text-stone-400 mt-8 pt-3 border-t border-stone-100">
                <span className="flex items-center gap-1 text-[#3ca21d] font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Validado por la plataforma Allikiwa EdTech
                </span>
                <span>
                  Generado el {new Date().toLocaleDateString('es-PE')} • Derechos comunitarios reservados
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Modal Bottom Action Bar (hidden in print) */}
        <div className="no-print p-4 bg-[#fff8f6] border-t border-[#ede8df] flex items-center justify-between">
          <p className="text-xs text-stone-600 hidden sm:block">
            El archivo PDF exportado incluye metadatos, tabla fonética completa y espacio para firmas de validación comunal.
          </p>

          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-100 text-xs font-semibold transition-colors"
            >
              Volver
            </button>
            <button
              onClick={handleDownloadPdf}
              className="px-5 py-2 rounded-xl bg-[#f27a21] hover:bg-[#d96614] text-white text-xs font-bold shadow-md flex items-center gap-2 transition-all active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>Guardar PDF Oficial</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
