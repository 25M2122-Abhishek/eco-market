function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 text-white">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200')] bg-cover bg-center opacity-10"></div>

      <div className="relative container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-6 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
            🌱 Sustainable Shopping Made Easy
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Discover Eco-Friendly Products
            <span className="block mt-2 bg-gradient-to-r from-yellow-300 to-green-300 bg-clip-text text-transparent">
              From Trusted Sellers
            </span>
          </h1>

          <p className="text-xl md:text-2xl mb-10 text-emerald-50 max-w-2xl mx-auto leading-relaxed">
            Search across multiple sustainable marketplaces to find the perfect eco-conscious products.
            Shop responsibly, live sustainably.
          </p>

          <div className="flex flex-wrap gap-4 justify-center items-center">
            <div className="flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur rounded-xl">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl">
                🌍
              </div>
              <div className="text-left">
                <p className="text-sm text-emerald-100">Carbon Neutral</p>
                <p className="font-bold">Shipping</p>
              </div>
            </div>

            <div className="flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur rounded-xl">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl">
                ♻️
              </div>
              <div className="text-left">
                <p className="text-sm text-emerald-100">100% Recyclable</p>
                <p className="font-bold">Packaging</p>
              </div>
            </div>

            <div className="flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur rounded-xl">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl">
                🌿
              </div>
              <div className="text-left">
                <p className="text-sm text-emerald-100">Ethically</p>
                <p className="font-bold">Sourced</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="rgb(236, 253, 245)" />
        </svg>
      </div>
    </section>
  )
}

export default HeroBanner
