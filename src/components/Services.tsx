import { Plane, Ship, Sailboat, Car, TreePalm, ShipWheel } from "lucide-react";
import { motion } from "framer-motion";
const services = [
  {
    title: "Airport Transfers",
    description: "Swift and hassle-free transfers between Velana International Airport and Malé City, Hulhumalé, and islands.",
    icon: Plane,
  },
  {
    title: "Resort Transfers",
    description: "Travel in style with our speedboat transfers to your dream resort destination. Comfort, safety, and efficiency guaranteed.",
    icon: TreePalm,
  },
  {
    title: "Island Hopping",
    description: "Discover the beauty of the Maldives! Our island-hopping service lets you explore multiple islands effortlessly",
    icon: Ship,
  },
  {
    title: "Private Charters",
    description: "Exclusive private boat charters for a personalized experience",
    icon: ShipWheel,
  },
];
export default function Services() {
  return (
    <section className="py-20 bg-white" id="services">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-ocean-dark mb-4">Our Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experience the best of Maldives with our comprehensive transfer services
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="bg-ocean/10 p-4 rounded-2xl">
                  <service.icon className="w-8 h-8 text-ocean" />
                </div>
                <h3 className="text-xl font-semibold text-ocean-dark">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}