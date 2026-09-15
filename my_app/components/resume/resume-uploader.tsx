"use client";

import { useState } from "react";

export default function ResumeUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setScore(null);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);
    setScore(null);

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await fetch("/api/upload-resume", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to upload and score resume");
      }

      setScore(data.score);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">AI Resume Scorer</h2>
      
      <div className="mb-6">
        <label 
          htmlFor="resume-upload" 
          className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-blue-300 rounded-lg cursor-pointer bg-blue-50 hover:bg-blue-100 transition-colors"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-10 h-10 mb-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
            </svg>
            <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-gray-500">PDF files only (Max 5MB)</p>
          </div>
          <input 
            id="resume-upload" 
            type="file" 
            accept=".pdf" 
            className="hidden" 
            onChange={handleFileChange}
          />
        </label>
      </div>

      {file && (
        <div className="mb-6 p-3 bg-gray-50 rounded-lg flex items-center justify-between">
          <span className="text-sm text-gray-700 truncate max-w-[200px]">{file.name}</span>
          <span className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
        </div>
      )}

      {error && (
        <div className="mb-6 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-200">
          {error}
        </div>
      )}

      {score !== null && (
        <div className="mb-6 text-center p-6 bg-green-50 rounded-lg border border-green-200 animate-pulse-once">
          <h3 className="text-lg font-medium text-green-800 mb-2">Your AI Score</h3>
          <div className="text-5xl font-extrabold text-green-600">{score}<span className="text-2xl text-green-400">/100</span></div>
          <p className="text-sm text-green-700 mt-3">Based on keyword matching and analysis.</p>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={!file || loading}
        className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all ${
          !file || loading 
            ? 'bg-blue-300 cursor-not-allowed' 
            : 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg active:transform active:scale-95'
        }`}
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Analyzing Resume...
          </span>
        ) : (
          "Upload & Get Score"
        )}
      </button>
    </div>
  );
}
