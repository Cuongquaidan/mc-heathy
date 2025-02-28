export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-12 h-12 border-4 border-white rounded-full border-t-transparent animate-spin"></div>
    </div>
  );
}
