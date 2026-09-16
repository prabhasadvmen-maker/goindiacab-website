export default function Loading() {
  return (
    <div className="fixed inset-0 bg-white z-[100] flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
        <p className="mt-6 text-lg font-medium text-dark animate-pulse">Loading GoIndiaCab...</p>
      </div>
    </div>
  );
}
