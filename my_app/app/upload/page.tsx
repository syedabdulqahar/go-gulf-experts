import ResumeUploader from "@/components/resume/resume-uploader";

export default function UploadPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-8">
        <h1 className="text-center text-3xl font-extrabold text-gray-900">
          Resume Analysis Portal
        </h1>
        <p className="mt-2 text-center text-sm text-gray-600">
          Upload your resume to get an instant AI score
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <ResumeUploader />
      </div>
    </main>
  );
}
