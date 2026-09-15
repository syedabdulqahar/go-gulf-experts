const MAX_RESUME_SIZE = 10 * 1024 * 1024;

export async function parseResumeFile(file: File) {
  if (file.size > MAX_RESUME_SIZE) {
    throw new Error("Resume files must be 10 MB or smaller.");
  }

  const extension = file.name.toLowerCase().split(".").pop();
  if (!extension || !["pdf", "docx", "txt"].includes(extension)) {
    throw new Error("Upload a PDF, DOCX, or TXT resume.");
  }

  if (extension === "txt") {
    return file.text();
  }

  const buffer = await file.arrayBuffer();
  if (extension === "docx") {
    const mammoth = await import("mammoth");
    const result = await mammoth.extractRawText({ arrayBuffer: buffer });
    return result.value.trim();
  }

  const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
  pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/legacy/build/pdf.worker.mjs", import.meta.url).toString();
  const pdf = await pdfjs.getDocument({ data: buffer } as Parameters<typeof pdfjs.getDocument>[0]).promise;
  const pages: string[] = [];
  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const content = await page.getTextContent();
    pages.push(content.items.map(item => "str" in item ? item.str : "").join(" "));
  }
  return pages.join("\n").trim();
}
