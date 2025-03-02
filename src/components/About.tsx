
import { User, Anchor, Ship } from "lucide-react";

export default function About() {
  return (
    <section className="py-20 bg-white" id="about">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-ocean-dark">About KaafuCruise</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex justify-center mb-6">
              <div className="bg-ocean/10 p-4 rounded-2xl">
                <User className="w-8 h-8 text-ocean" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-center mb-4">Experienced Team</h3>
            <p className="text-gray-600 text-center">
              Our skilled captains and crew members ensure your safety and comfort throughout the journey.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex justify-center mb-6">
              <div className="bg-ocean/10 p-4 rounded-2xl">
                <Ship className="w-8 h-8 text-ocean" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-center mb-4">Modern Fleet</h3>
            <p className="text-gray-600 text-center">
              Experience luxury and comfort with our well-maintained speedboats equipped with modern amenities.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex justify-center mb-6">
              <div className="bg-ocean/10 p-4 rounded-2xl">
                <Anchor className="w-8 h-8 text-ocean" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-center mb-4">Island Expertise</h3>
            <p className="text-gray-600 text-center">
              With years of experience navigating the Maldivian waters, we know the best routes and hidden gems.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
