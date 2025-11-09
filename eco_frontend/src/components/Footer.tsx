export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur border-t border-gray-200 py-3">
      <div className="w-full max-w-6xl mx-auto px-4 flex justify-between items-center text-sm text-green-700">
        <p>© {new Date().getFullYear()} EcoMarket</p>
        <p className="opacity-75">Sustainable by design 🌿</p>
      </div>
    </footer>
  );
}
