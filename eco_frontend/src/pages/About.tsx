function About() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-emerald-100">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-6">
            About EcoMarket
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              EcoMarket is a revolutionary platform that aggregates eco-friendly products from multiple sustainable
              marketplaces across the web. We believe in making sustainable shopping accessible, convenient, and transparent.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              To empower conscious consumers by providing a unified search experience across trusted eco-friendly
              retailers. We don't sell products directly—instead, we connect you with verified sustainable sellers
              who share our commitment to the planet.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">How It Works</h2>
            <div className="space-y-4 mb-6">
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Search</h3>
                  <p className="text-gray-600">Enter what you're looking for in our search bar</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Discover</h3>
                  <p className="text-gray-600">We fetch results from multiple eco-friendly marketplaces</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Shop</h3>
                  <p className="text-gray-600">Click through to the seller's website to complete your purchase</p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Values</h2>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <span className="text-emerald-600 font-bold text-xl">✓</span>
                <span className="text-gray-700">Environmental sustainability and carbon neutrality</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-600 font-bold text-xl">✓</span>
                <span className="text-gray-700">Ethical sourcing and fair trade practices</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-600 font-bold text-xl">✓</span>
                <span className="text-gray-700">Transparency in product origins and certifications</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-600 font-bold text-xl">✓</span>
                <span className="text-gray-700">Supporting small businesses and local communities</span>
              </li>
            </ul>

            <div className="mt-12 p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200">
              <p className="text-gray-700 text-center leading-relaxed">
                <strong className="text-emerald-700">Join us in making a difference.</strong> Every purchase from a sustainable
                seller is a vote for a healthier planet. Together, we can create lasting change.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
