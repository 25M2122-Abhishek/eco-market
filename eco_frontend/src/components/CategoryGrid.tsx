const categories = [
  {
    name: 'Organic Food',
    icon: '🥬',
    description: 'Farm-fresh, pesticide-free produce',
    color: 'from-green-400 to-emerald-500'
  },
  {
    name: 'Sustainable Fashion',
    icon: '👕',
    description: 'Ethical clothing and accessories',
    color: 'from-blue-400 to-cyan-500'
  },
  {
    name: 'Zero Waste',
    icon: '♻️',
    description: 'Reusable and plastic-free items',
    color: 'from-teal-400 to-green-500'
  },
  {
    name: 'Natural Beauty',
    icon: '🧴',
    description: 'Organic skincare and cosmetics',
    color: 'from-pink-400 to-rose-500'
  },
  {
    name: 'Home & Living',
    icon: '🏠',
    description: 'Eco-friendly home essentials',
    color: 'from-amber-400 to-orange-500'
  },
  {
    name: 'Clean Energy',
    icon: '⚡',
    description: 'Solar and renewable products',
    color: 'from-yellow-400 to-amber-500'
  }
]

function CategoryGrid() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our curated collection of sustainable products across various categories
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.name}
              className="group relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-emerald-100 overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity`}></div>

              <div className="relative">
                <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {category.name}
                </h3>
                <p className="text-gray-600 text-sm">
                  {category.description}
                </p>
                <div className="mt-4 flex items-center text-emerald-600 font-medium text-sm group-hover:translate-x-2 transition-transform">
                  Explore
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategoryGrid
