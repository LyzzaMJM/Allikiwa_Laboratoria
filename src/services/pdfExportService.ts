import { jsPDF } from 'jspdf';
import { RecordingItem } from '../types';

export const exportRecordingToPDF = (recording: RecordingItem): void => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 16;
  let cursorY = margin;

  // Header Banner Background (Deep Indigo #2a3691)
  doc.setFillColor(42, 54, 145);
  doc.rect(0, 0, pageWidth, 28, 'F');

  // Decorative Accent bar (Sun Orange #f27a21)
  doc.setFillColor(242, 122, 33);
  doc.rect(0, 28, pageWidth, 2.5, 'F');

  // Decorative Terracotta accent bar
  doc.setFillColor(180, 63, 29);
  doc.rect(0, 30.5, pageWidth, 1.5, 'F');

  // Header Text
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('ALLIKIWA EDTECH', margin, 12);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text('Archivo Comunitario de Lenguas Originarias: Quechua Chanka y Aimara', margin, 18);
  doc.text('Registro Fonético Oficial y Transcripción Bilingüe', margin, 23);

  cursorY = 40;

  // Title of the recording
  doc.setTextColor(14, 28, 123); // #0e1c7b
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  const titleLines = doc.splitTextToSize(recording.title, pageWidth - (margin * 2));
  doc.text(titleLines, margin, cursorY);
  cursorY += (titleLines.length * 6) + 4;

  // Metadata Card Box
  doc.setFillColor(255, 248, 246); // Surface tint #fff8f6
  doc.setDrawColor(230, 220, 215);
  doc.roundedRect(margin, cursorY, pageWidth - (margin * 2), 26, 3, 3, 'FD');

  doc.setFontSize(8.5);
  doc.setTextColor(60, 20, 10);

  // Column 1
  doc.setFont('helvetica', 'bold');
  doc.text('Lengua:', margin + 4, cursorY + 6);
  doc.setFont('helvetica', 'normal');
  doc.text(recording.language, margin + 22, cursorY + 6);

  doc.setFont('helvetica', 'bold');
  doc.text('Comunidad:', margin + 4, cursorY + 12);
  doc.setFont('helvetica', 'normal');
  doc.text(recording.community, margin + 26, cursorY + 12);

  doc.setFont('helvetica', 'bold');
  doc.text('Hablante:', margin + 4, cursorY + 18);
  doc.setFont('helvetica', 'normal');
  doc.text(recording.informant, margin + 22, cursorY + 18);

  // Column 2
  const col2X = margin + 105;
  doc.setFont('helvetica', 'bold');
  doc.text('Fecha:', col2X, cursorY + 6);
  doc.setFont('helvetica', 'normal');
  doc.text(recording.date, col2X + 16, cursorY + 6);

  doc.setFont('helvetica', 'bold');
  doc.text('Duración:', col2X, cursorY + 12);
  doc.setFont('helvetica', 'normal');
  doc.text(recording.duration, col2X + 18, cursorY + 12);

  doc.setFont('helvetica', 'bold');
  doc.text('Transcriptor:', col2X, cursorY + 18);
  doc.setFont('helvetica', 'normal');
  doc.text(recording.transcriber, col2X + 22, cursorY + 18);

  cursorY += 34;

  // Section: Transcripción Fonética y Traducción
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(42, 54, 145);
  doc.text('TRANSCRIPCIÓN BILINGÜE PARALELA Y ANOTACIONES CULTURALES', margin, cursorY);
  
  // Underline
  doc.setDrawColor(42, 54, 145);
  doc.setLineWidth(0.5);
  doc.line(margin, cursorY + 2, pageWidth - margin, cursorY + 2);

  cursorY += 8;

  // Loop over transcript segments
  recording.segments.forEach((seg, index) => {
    // Check for page break
    if (cursorY > pageHeight - 45) {
      doc.addPage();
      cursorY = margin;
      
      // Page Mini Header
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(8);
      doc.setTextColor(120, 120, 120);
      doc.text(`Allikiwa EdTech - ${recording.title} (Continuación)`, margin, cursorY);
      cursorY += 8;
    }

    // Segment Card Box
    const segmentBoxY = cursorY;
    
    // Speaker & Timestamp Header
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(14, 28, 123);
    doc.text(`[${seg.timestamp}]  ${seg.speaker}`, margin + 2, cursorY + 4);

    if (seg.linguisticTag) {
      doc.setFillColor(223, 224, 255);
      doc.setTextColor(0, 11, 98);
      doc.setFontSize(7.5);
      doc.rect(pageWidth - margin - 28, cursorY, 26, 5, 'F');
      doc.text(seg.linguisticTag, pageWidth - margin - 26, cursorY + 3.8);
    }

    cursorY += 8;

    // Original Text (Quechua / Aimara)
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(30, 41, 59);
    const origLines = doc.splitTextToSize(`Texto Originario: "${seg.originalText}"`, pageWidth - (margin * 2) - 4);
    doc.text(origLines, margin + 2, cursorY);
    cursorY += (origLines.length * 4.8);

    // Phonetics
    if (seg.phonetics) {
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(8);
      doc.setTextColor(90, 70, 60);
      const phoneLines = doc.splitTextToSize(`Fonética IPA: ${seg.phonetics}`, pageWidth - (margin * 2) - 4);
      doc.text(phoneLines, margin + 2, cursorY);
      cursorY += (phoneLines.length * 4.2);
    }

    // Spanish Translation
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(40, 40, 40);
    const transLines = doc.splitTextToSize(`Traducción: ${seg.translatedText}`, pageWidth - (margin * 2) - 4);
    doc.text(transLines, margin + 2, cursorY);
    cursorY += (transLines.length * 4.6);

    // Cultural note if present
    if (seg.culturalNote) {
      doc.setFillColor(255, 237, 232); // light terracotta
      doc.setDrawColor(230, 190, 180);
      const noteLines = doc.splitTextToSize(`Nota Cultural / Etimología: ${seg.culturalNote}`, pageWidth - (margin * 2) - 8);
      const boxH = (noteLines.length * 4) + 4;
      doc.roundedRect(margin + 2, cursorY + 1, pageWidth - (margin * 2) - 4, boxH, 1.5, 1.5, 'FD');
      
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(180, 63, 29); // Terracotta
      doc.text(noteLines, margin + 5, cursorY + 4.5);
      cursorY += boxH + 4;
    }

    // Divider line between segments
    doc.setDrawColor(235, 230, 225);
    doc.setLineWidth(0.3);
    doc.line(margin, cursorY + 2, pageWidth - margin, cursorY + 2);

    cursorY += 6;
  });

  // Check space for signature block
  if (cursorY > pageHeight - 38) {
    doc.addPage();
    cursorY = margin + 10;
  } else {
    cursorY += 8;
  }

  // Signature Block
  const sigY = cursorY + 16;
  const colW = (pageWidth - (margin * 2) - 20) / 2;

  doc.setDrawColor(120, 120, 120);
  doc.setLineWidth(0.4);
  
  // Line 1
  doc.line(margin + 10, sigY, margin + 10 + colW, sigY);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(80, 80, 80);
  doc.text('Firma / Huella del Hablante Originario', margin + 14, sigY + 5);
  doc.text(recording.informant, margin + 14, sigY + 9);

  // Line 2
  const sig2X = margin + 10 + colW + 20;
  doc.line(sig2X, sigY, sig2X + colW, sigY);
  doc.text('Validador Lingüístico / Autoridad Comunal', sig2X + 6, sigY + 5);
  doc.text(recording.transcriber, sig2X + 6, sigY + 9);

  // Footer text
  doc.setFontSize(7.5);
  doc.setTextColor(150, 150, 150);
  doc.text(
    `Documento generado por Allikiwa EdTech • Licencia de preservación cultural • ${new Date().toLocaleDateString('es-PE')}`,
    margin,
    pageHeight - 8
  );

  // Save the PDF
  const safeFilename = `Allikiwa_${recording.title.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 30)}.pdf`;
  doc.save(safeFilename);
};
