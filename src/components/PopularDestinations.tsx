import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const destinations = [
  {
    id: 1,
    name: "Velana International Airport",
    description: "Velana International Airport, located on Hulhulé Island in the Maldives, is the main international gateway to the country.",
    image: "images/airport.jpg",
    distance: "",
  },
  {
    id: 2,
    name: "Malé",
    description: "The vibrant capital city of Maldives",
    image: "images/male.jpg",
    distance: "2 km from Velana International Airport",
  },
  {
    id: 3,
    name: "Hulhumalé",
    description: "A modern city built on reclaimed land",
    image: "images/hulhumale.jpg",
    distance: "5 km from Velana International Airport",
  },
  {
    id: 4,
    name: "Maafushi",
    description: "Popular local island with beautiful beaches",
    image: "images/maafushi.jpg",
    distance: "27 km from Velana International Airport",
  },
  {
    id: 5,
    name: "Huraa",
    description: "A charming local island known for its lush greenery and traditional Maldivian culture.",
    image: "images/huraa.webp",
    distance: "20 km from Velana International Airport",
  },
  {
    id: 6,
    name: "Himmafushi",
    description: "A small, vibrant island famous for its surfing spots and water sports.",
    image: "images/himmafushi.jpg",
    distance: "18 km from Velana International Airport",
  },
  {
    id: 7,
    name: "Thulusdhoo",
    description: "Renowned for its surfing breaks, Coca-Cola factory, and stunning beaches.",
    image: "images/thulusdhoo.jpg",
    distance: "28 km from Velana International Airport",
  },
  {
    id: 8,
    name: "Guraidhoo",
    description: "A picturesque island with beautiful beaches and a thriving local community.",
    image: "images/guraidhoo.jpg",
    distance: "35 km from Velana International Airport",
  },
  {
    id: 9,
    name: "Gulhi",
    description: "A small, tranquil island known for its pristine beaches and excellent snorkeling.",
    image: "images/gulhi.jpg",
    distance: "25 km from Velana International Airport",
  },
  {
    id: 10,
    name: "Dhiffushi",
    description: "A small island near Male, Dhiffushi is known for its beautiful bikini beach and clear turquoise lagoon, perfect for snorkeling and water sports",
    image: "images/dhiffushi.jpg",
    distance: "35 km from Velana International Airport",
  },
  {
    id: 11,
    name: "Cross Road Maldives",
    description: "Crossroads Maldives is the first integrated resort destination in the Maldives",
    image: "images/cross-road.jpg",
    distance: "9 km from Velana International Airport",
  },
  {
    id: 12,
    name: "Fihalhi Island Resort",
    description: "Home to Fihalhohi Island Resort, this island offers a variety of activities and amenities for guests, including water sports, diving, and snorkeling",
    image: "images/fihalhohi.jpg",
    distance: "39 km from Velana International Airport",
  },
  
];

export default function PopularDestinations() {
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [visibleDestinations, setVisibleDestinations] = useState<Set<number>>(new Set());
  const destinationRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleImageLoad = (id: number) => {
    setLoadedImages(prev => new Set([...prev, id]));
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = Number(entry.target.getAttribute("data-id"));
            setVisibleDestinations(prev => new Set([...prev, id]));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    destinationRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id ="destinations" className="py-20 bg-gradient-to-b from-white to-[#e7f0fd]">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4 text-ocean-dark">
            Explore Kaafu Atoll's Must-Visit Destinations
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover the beauty of these incredible locations, each offering unique experiences and unforgettable memories.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {destinations.map((destination, index) => (
            <motion.div
              key={destination.id}
              ref={el => destinationRefs.current[index] = el}
              data-id={destination.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group relative h-96 overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="absolute inset-0">
                {!visibleDestinations.has(destination.id) ? (
                  <Skeleton className="w-full h-full rounded-lg" />
                ) : (
                  <>
                    {!loadedImages.has(destination.id) && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
                        <div className="w-8 h-8 border-4 border-ocean border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}
                    <img
                      src={destination.image}
                      alt={destination.name}
                      loading="lazy"
                      onLoad={() => handleImageLoad(destination.id)}
                      className={`object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-110 rounded-lg ${
                        loadedImages.has(destination.id) ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  </>
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 flex flex-col justify-end text-white">
                <motion.h3 
                  className="text-xl font-bold mb-2"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {destination.name}
                </motion.h3>
                <p className="text-sm opacity-90 transform transition-all duration-300 group-hover:opacity-100">
                  {destination.description}
                </p>
                <p className="text-xs opacity-80 mt-1">
                  {destination.distance}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}