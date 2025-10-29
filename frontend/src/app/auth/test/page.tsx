export default function AuthTestPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Auth Route Test</h1>
        <p className="text-gray-600">
          If you can see this page, the /auth routes are working correctly.
        </p>
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
          <p className="text-green-800 text-sm">
            ✅ Auth routes are accessible
          </p>
        </div>
      </div>
    </div>
  );
}