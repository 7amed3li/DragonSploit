import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

interface ReportData {
  operatorName: string;
  organizationId: string;
  timestamp: string;
  stats: {
    totalScans: number;
    activeScans: number;
    vulnerabilities: number;
    targets: number;
  };
  recentScans: any[];
  vulnerabilities: any[];
}

export const generateTacticalReport = (data: ReportData) => {
  const doc = new jsPDF();
  
  // --- Page Setup & Background ---
  doc.setFillColor(10, 10, 10);
  doc.rect(0, 0, 210, 297, 'F');

  // --- Header ---
  doc.setDrawColor(0, 255, 65);
  doc.setLineWidth(0.5);
  doc.line(10, 10, 200, 10);
  doc.line(10, 10, 10, 25);
  
  doc.setTextColor(0, 255, 65);
  doc.setFont('courier', 'bold');
  doc.setFontSize(22);
  doc.text('DRAGONSPLOIT', 15, 20);
  doc.setTextColor(255, 255, 255);
  doc.text('STRATEGIC REPORT', 85, 20);

  doc.setFontSize(8);
  doc.setTextColor(0, 255, 65);
  doc.text(`MISSION_ID: ${Math.random().toString(36).substring(7).toUpperCase()}`, 160, 17);
  doc.text(`TIMESTAMP: ${data.timestamp}`, 160, 22);

  doc.line(10, 25, 200, 25);
  doc.line(200, 10, 200, 25);

  // --- Operational Context ---
  doc.setFontSize(10);
  doc.setTextColor(150, 150, 150);
  doc.text('OPERATOR DESIGNATION:', 15, 40);
  doc.setTextColor(255, 255, 255);
  doc.text((data.operatorName || 'UNKNOWN').toUpperCase(), 65, 40);

  doc.setTextColor(150, 150, 150);
  doc.text('ORGANIZATION CODE:', 15, 46);
  doc.setTextColor(255, 255, 255);
  doc.text((data.organizationId || 'UNKNOWN').toUpperCase(), 65, 46);

  // --- Summary Grid ---
  doc.setDrawColor(50, 50, 50);
  doc.setFillColor(20, 20, 20);
  
  // Total Scans Box
  doc.rect(15, 60, 42, 25, 'FD');
  doc.setTextColor(0, 255, 65);
  doc.setFontSize(14);
  doc.text(data.stats.totalScans.toString(), 36, 75, { align: 'center' });
  doc.setFontSize(7);
  doc.text('TOTAL MISSIONS', 36, 82, { align: 'center' });

  // Active Scans Box
  doc.rect(62, 60, 42, 25, 'FD');
  doc.setTextColor(0, 255, 65);
  doc.setFontSize(14);
  doc.text(data.stats.activeScans.toString(), 83, 75, { align: 'center' });
  doc.setFontSize(7);
  doc.text('LIVE THREADS', 83, 82, { align: 'center' });

  // Vulns Box
  doc.rect(109, 60, 42, 25, 'FD');
  doc.setTextColor(255, 65, 65);
  doc.setFontSize(14);
  doc.text(data.stats.vulnerabilities.toString(), 130, 75, { align: 'center' });
  doc.setFontSize(7);
  doc.text('DETECTED FLAWS', 130, 82, { align: 'center' });

  // Targets Box
  doc.rect(156, 60, 39, 25, 'FD');
  doc.setTextColor(100, 149, 237);
  doc.setFontSize(14);
  doc.text(data.stats.targets.toString(), 175, 75, { align: 'center' });
  doc.setFontSize(7);
  doc.text('MAPPED ASSETS', 175, 82, { align: 'center' });

  // --- Intelligence Feed Table ---
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.text('CRITICAL THREAT LANDSCAPE', 15, 100);

  const vulnRows = data.vulnerabilities.map(v => [
    (v.severity || 'UNKNOWN').toUpperCase(),
    v.title || (v.description ? v.description.substring(0, 40) + '...' : 'NO_DESCRIPTION'),
    v.target?.name || 'EXTERNAL_NODE',
    v.createdAt ? new Date(v.createdAt).toLocaleDateString() : 'UNKNOWN_DATE'
  ]);

  autoTable(doc, {
    startY: 105,
    head: [['SEVERITY', 'VULNERABILITY DESCRIPTION', 'AFFECTED ASSET', 'DETECTION']],
    body: vulnRows,
    theme: 'grid',
    headStyles: { fillColor: [0, 255, 65], textColor: [0, 0, 0], font: 'courier', fontStyle: 'bold' },
    bodyStyles: { fillColor: [15, 15, 15], textColor: [200, 200, 200], font: 'courier' },
    alternateRowStyles: { fillColor: [10, 10, 10] },
    margin: { left: 15, right: 15 },
    styles: { lineColor: [50, 50, 50], lineWidth: 0.1 }
  });

  // --- Recent Operations Table ---
  const finalY = (doc as any).lastAutoTable?.finalY || 150;
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.text('RECENT DEPLOYMENT LOGS', 15, finalY + 15);

  const scanRows = data.recentScans.map(s => [
    s.target?.name || 'UNKNOWN_TARGET',
    (s.status || 'UNKNOWN').toUpperCase(),
    s.profile || 'BALANCED',
    s.createdAt ? new Date(s.createdAt).toLocaleString() : 'UNKNOWN_TIME'
  ]);

  autoTable(doc, {
    startY: finalY + 20,
    head: [['TARGET ASSET', 'STATUS', 'PROFILE', 'EXECUTION TIME']],
    body: scanRows,
    theme: 'grid',
    headStyles: { fillColor: [50, 50, 50], textColor: [0, 255, 65], font: 'courier' },
    bodyStyles: { fillColor: [15, 15, 15], textColor: [150, 150, 150], font: 'courier' },
    margin: { left: 15, right: 15 },
    styles: { lineColor: [30, 30, 30], lineWidth: 0.1 }
  });

  // --- Footer ---
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(50, 50, 50);
    doc.text(`DRAGONSPLOIT INTERNAL SECURITY DOCUMENT // CONFIDENTIAL // PAGE ${i} OF ${pageCount}`, 105, 290, { align: 'center' });
  }

  // Save the PDF
  doc.save(`DragonSploit_Tactical_Report_${Date.now()}.pdf`);
};
