import type { QuizItem, Language } from '../types';
import { locales } from '../constants';

declare const jspdf: any;

export const downloadQuizAsPdf = async (quiz: QuizItem[], title: string, language: Language) => {
  const { jsPDF } = jspdf;
  const doc = new jsPDF();
  const currentLocale = locales[language];

  const isMalayalam = language === 'ml';
  
  if (isMalayalam) {
    try {
      // Load Noto Sans Malayalam font
      const fontUrl = 'https://cdn.jsdelivr.net/gh/googlefonts/noto-fonts@main/hinted/ttf/NotoSansMalayalam/NotoSansMalayalam-Regular.ttf';
      const fontBytes = await fetch(fontUrl).then(res => res.arrayBuffer());
      const fontBase64 = arrayBufferToBase64(fontBytes);
      
      // Add the font to jsPDF
      doc.addFileToVFS('NotoSansMalayalam-Regular.ttf', fontBase64);
      doc.addFont('NotoSansMalayalam-Regular.ttf', 'NotoSansMalayalam', 'normal');
      doc.setFont('NotoSansMalayalam');
    } catch (error) {
      console.error('Failed to load Malayalam font:', error);
      // Fallback to default font
      doc.setFont('helvetica');
    }
  } else {
    doc.setFont('helvetica');
  }

  doc.setFontSize(16);
  doc.text(currentLocale.quizTitle, 14, 15);

  const tableColumn = [currentLocale.question, currentLocale.answer];
  const tableRows: string[][] = [];

  quiz.forEach(item => {
    const row = [item.question, item.answer];
    tableRows.push(row);
  });
  
  const fontName = isMalayalam ? 'NotoSansMalayalam' : 'helvetica';
  
  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 25,
    theme: 'grid',
    styles: {
      font: fontName,
      fontStyle: 'normal',
      fontSize: 10,
      cellPadding: 5,
    },
    headStyles: {
      fillColor: [41, 128, 185],
      textColor: 255,
      font: fontName,
      fontStyle: 'normal',
      fontSize: 11,
    },
    columnStyles: {
      0: { cellWidth: 80 },
      1: { cellWidth: 100 },
    },
  });

  doc.save(`${title}_quiz.pdf`);
};

// Helper function to convert ArrayBuffer to Base64
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}