function decodePdfString(value: string): string {
  return value
    .replace(/\\([\\()\\])/g, '$1')
    .replace(/\\n/g, '\n')
    .replace(/\\r/g, '\r')
    .replace(/\\t/g, '\t');
}

function fallbackExtractPdfTextFromBuffer(buffer: ArrayBuffer): string {
  try {
    const source = new TextDecoder('latin1').decode(buffer);
    const textParts: string[] = [];
    const stringPattern = /\((?:\\.|[^\\)])*\)\s*T[Jj]/g;
    const hexPattern = /<([0-9a-fA-F\s]+)>\s*T[Jj]/g;

    for (const match of source.matchAll(stringPattern)) {
      const value = match[0].replace(/\)\s*T[Jj]$/, '').slice(1);
      textParts.push(decodePdfString(value));
    }

    for (const match of source.matchAll(hexPattern)) {
      const hex = match[1].replace(/\s/g, '');
      let value = '';
      for (let index = 0; index < hex.length; index += 2) {
        value += String.fromCharCode(Number.parseInt(hex.slice(index, index + 2), 16));
      }
      textParts.push(value);
    }

    return textParts.join(' ').replace(/\s+/g, ' ').trim();
  } catch {
    return '';
  }
}

async function extractPdfText(buffer: ArrayBuffer): Promise<string> {
  try {
    // Dynamic import to keep initial bundle size minimal
    const pdfjsLib = await import('pdfjs-dist');
    
    // Configure worker
    if (!pdfjsLib.GlobalWorkerOptions.workerSrc) {
      pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
        'pdfjs-dist/build/pdf.worker.min.mjs',
        import.meta.url
      ).toString();
    }

    const loadingTask = pdfjsLib.getDocument({
      data: new Uint8Array(buffer),
      useWorkerFetch: true,
      useSystemFonts: true,
    });

    const pdf = await loadingTask.promise;
    const pageTexts: string[] = [];

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      const pageStrings = textContent.items
        .map((item) => ('str' in item ? item.str : ''))
        .filter(Boolean);
      pageTexts.push(pageStrings.join(' '));
    }

    const fullText = pageTexts.join('\n\n').replace(/[ \t]+/g, ' ').trim();
    if (fullText.length >= 20) {
      return fullText;
    }
  } catch (err) {
    console.warn('PDF.js dynamic parsing failed, attempting fallback...', err);
  }

  // Fallback if worker/PDF.js fails
  const fallback = fallbackExtractPdfTextFromBuffer(buffer);
  if (fallback && fallback.trim().length >= 20) {
    return fallback;
  }

  throw new Error(
    'Could not extract readable text from this PDF. Please ensure it is a text-based document or upload a DOCX/TXT format.'
  );
}

async function extractDocxText(buffer: ArrayBuffer): Promise<string> {
  try {
    const mammoth = await import('mammoth');
    const result = await mammoth.extractRawText({ arrayBuffer: buffer });
    if (result.value && result.value.trim().length >= 20) {
      return result.value.trim();
    }
  } catch (err) {
    console.error('Mammoth docx extraction error:', err);
  }
  throw new Error('Could not extract text from this Word document (.docx). Please verify file integrity.');
}

export async function extractResumeText(file: File): Promise<string> {
  const lowerName = file.name.toLowerCase();
  const isPdf = file.type === 'application/pdf' || lowerName.endsWith('.pdf');
  const isDocx =
    file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    lowerName.endsWith('.docx');
  const isText = file.type === 'text/plain' || lowerName.endsWith('.txt');

  if (isText) {
    return file.text();
  }

  if (isDocx) {
    const buffer = await file.arrayBuffer();
    return extractDocxText(buffer);
  }

  if (isPdf) {
    const buffer = await file.arrayBuffer();
    return extractPdfText(buffer);
  }

  throw new Error('Please upload a PDF (.pdf), Word Document (.docx), or Plain Text (.txt) resume.');
}


