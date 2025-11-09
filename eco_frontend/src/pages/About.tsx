export default function About() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-12">

      <h2 className="text-3xl font-bold text-green-800 mb-4">
        About EcoMarket
      </h2>

      <p className="text-gray-700 leading-relaxed mb-4">
        EcoMarket is an initiative focused on sustainability, mindful consumption,
        and eco-friendly living. Our mission is to create a marketplace where
        buyers and sellers connect through environmentally conscious products.
      </p>

      <p className="text-gray-700 leading-relaxed mb-4">
        We believe that even small changes — choosing reusable materials, reducing
        waste, or supporting green businesses — help create a healthier planet.
      </p>

      <div className="mt-8 p-5 rounded-xl bg-white/80 border border-gray-200">
        <h3 className="text-xl font-semibold text-green-700 mb-2">
          Why Choose EcoMarket?
        </h3>

        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Curated eco-friendly products</li>
          <li>Promotes community-driven sustainability</li>
          <li>Quality checks for environmental impact</li>
          <li>Support for small and green businesses</li>
        </ul>
      </div>
    </div>
  );
}
