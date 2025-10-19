import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ExternalLink, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import bottleGumtea from "@/assets/bottle-gumtea_6_11zon.webp";
import bottleRestaurant from "@/assets/bottle-restaurant_8_11zon.webp";
import sqaure1litre from "@/assets/IMG_20251016_140748_28_11zon.webp";
import sqaure500ml from "@/assets/IMG_20251016_140450_26_11zon.webp";
import bottleDhaba from "@/assets/paramidbottle_34_11zon.webp";
import Pyramidbottle from "@/assets/IMG_20251019_000126_32_11zon.webp";
import bottleGumteaYellow from "@/assets/bottle-gumtea-yellow_7_11zon.webp";
import bottlesCollectionGumtea from "@/assets/bottles-collection-gumtea_10_11zon.webp";
import bottleRestaurantScene from "@/assets/bottle-restaurant-scene_9_11zon.webp";
import bottlesTrio from "@/assets/20250804_143613_1_11zon.webp";
import bottleDhabaSingle from "@/assets/bottle-dhaba-single_5_11zon.webp";
import bottledhabareal from "@/assets/bottle-dhaba_4_11zon.webp";
import rasoicollection from "@/assets/rasoicollection.webp";
import yourbrandyourlogo from "@/assets/yourbrandyourlogo.webp";
import { useEffect, useRef, useState } from "react";

const Products = () => {
  const [visibleSections, setVisibleSections] = useState({
    hero: true,
    products: false,
    features: false,
    cta: false
  });

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const sectionRefs = {
    products: useRef<HTMLDivElement>(null),
    features: useRef<HTMLDivElement>(null),
    cta: useRef<HTMLDivElement>(null)
  };

  const customers = [
    { img: bottlesCollectionGumtea, brand: "Gumtea Cafe" },
    { img: bottleRestaurantScene, brand: "Rasoi Indian Restaurant" },
    { img: bottleDhabaSingle, brand: "Dhaba Delight (Restaurant & Cafe)" }, 
    { img: bottleGumtea, brand: "Gumtea Collection" },
    { img: rasoicollection, brand: "Rasoi Collection" },
    { img: bottledhabareal, brand: "Dhaba Collection" },
    // { img: bottleGumteaYellow, brand: "Gumtea Collection" },
  ];

  const slidesToShow = 3;
  const totalSlides = Math.ceil(customers.length / slidesToShow);

  useEffect(() => {
    const observers = Object.entries(sectionRefs).map(([key, ref]) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => ({ ...prev, [key]: true }));
          }
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return observer;
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, totalSlides]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };
  const products = [
    {
      id: 1,
      name: "Square Shape Packaged Drinking Water - 500ml",
      description: "Perfect for cafes and restaurants. Classic design with full customization.",
      image: sqaure500ml,
      features: ["500ml capacity", "BPA-free plastic", "Full-wrap label area", "Leak-proof cap"],
      price: "Contact for pricing",
    },
    {
      id: 2,
      name: "Square Shape Packaged Drinking Water - 1L",
      description: "Ideal for hotels and events. Sleek and elegant design.",
      image: sqaure1litre,
      features: ["1 Liter capacity", "Premium finish", "Custom label design", "Recyclable material"],
      price: "Contact for pricing",
    },
    {
      id: 3,
      name: "Pyramid Shape Packaged Drinking Water  - 500ml & 1L",
      description: "Unique pyramid design for standout branding.",
      image: Pyramidbottle,
      features: ["500ml & 1 Liter capacity", "Distinctive shape", "360° branding area", "Eye-catching design"],
      price: "Contact for pricing",
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-hero text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold">Products</h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              Premium customizable water bottles for every need
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section ref={sectionRefs.products} className="py-24 bg-background">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">OUR CUSTOMISED BOTTLE TYPES</h2>
            <p className="text-xl text-muted-foreground">Choose from our premium collection of customizable water bottles</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <Card 
                key={product.id} 
                className={`overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 ${visibleSections.products ? 'animate-scale-in' : 'opacity-0'}`}
                style={{ animationDelay: visibleSections.products ? `${index * 200}ms` : '0ms' }}
              >
                <div className="relative overflow-hidden group">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </div>
                
                <div className="p-6 space-y-4">
                  <h3 className="text-2xl font-bold">{product.name}</h3>
                  <p className="text-muted-foreground">{product.description}</p>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-primary">Features:</h4>
                    <ul className="space-y-1">
                      {product.features.map((feature, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="pt-4 flex flex-col gap-3">
                    <div className="text-lg font-semibold text-primary">{product.price}</div>
                    <Button variant="hero" className="w-full" asChild>
                      <Link to="/try3d">
                        Try in Your Design <Sparkles className="ml-2" />
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <Link to="/booking">
                        Request Quote <ExternalLink className="ml-2" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Customers Section */}
      <section ref={sectionRefs.features} className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className={`text-center mb-16 ${visibleSections.features ? 'animate-zoom-in' : 'opacity-0'}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Customers</h2>
            <p className="text-xl text-muted-foreground">Trusted by top brands across the region</p>
          </div>

          {/* Slider Container */}
          <div 
            className="relative"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6 text-primary" />
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6 text-primary" />
            </button>

            {/* Slider */}
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                  <div key={slideIndex} className="w-full flex-shrink-0">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                      {customers
                        .slice(slideIndex * slidesToShow, (slideIndex + 1) * slidesToShow)
                        .map((customer, idx) => (
                          <Card 
                            key={`${slideIndex}-${idx}`}
                            className={`overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group ${visibleSections.features ? 'animate-slide-in-bounce' : 'opacity-0'}`}
                            style={{ animationDelay: visibleSections.features ? `${idx * 150}ms` : '0ms' }}
                          >
                            <div className="relative overflow-hidden">
                              <img 
                                src={customer.img} 
                                alt={customer.brand} 
                                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                            </div>
                            <div className="p-6 text-center">
                              <h3 className="text-xl font-bold">{customer.brand}</h3>
                            </div>
                          </Card>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-8 gap-2">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-primary scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Brand Showcase Section */}
      <section ref={sectionRefs.cta} className="py-24 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4">
          <div className={`text-center mb-16 ${visibleSections.cta ? 'animate-slide-in-down' : 'opacity-0'}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Your Brand, Your Logo</h2>
            <p className="text-xl text-muted-foreground">Transform your vision into reality with our premium customization services</p>
          </div>

          {/* Full Width Image Section */}
          <div className="relative overflow-hidden rounded-2xl shadow-2xl mb-16">
            <img 
              src={yourbrandyourlogo} 
              alt="Your Brand Your Logo - Custom Water Bottles" 
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-8 left-8 right-8 text-white">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">Premium Customization</h3>
              <p className="text-lg md:text-xl text-white/90 max-w-2xl">
                From concept to creation, we bring your brand to life with high-quality custom water bottles that make a lasting impression.
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Custom Design",
                description: "Professional design services to create the perfect label for your brand",
                icon: "🎨"
              },
              {
                title: "Premium Quality",
                description: "High-grade materials ensuring durability and professional appearance",
                icon: "⭐"
              },
              {
                title: "Fast Delivery",
                description: "Quick turnaround times to meet your business deadlines",
                icon: "⚡"
              },
              {
                title: "Bulk Orders",
                description: "Competitive pricing for large quantity orders with volume discounts",
                icon: "📦"
              }
            ].map((feature, idx) => (
              <Card key={idx} className={`p-6 text-center hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-primary ${visibleSections.cta ? 'animate-flip-in' : 'opacity-0'}`} style={{ animationDelay: visibleSections.cta ? `${idx * 150}ms` : '0ms' }}>
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>

          {/* Order Requirements */}
          <div className="mt-16 p-8 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-primary mb-4">Ready to Get Started?</h3>
              <p className="text-lg text-muted-foreground mb-6">
                <strong>Minimum Order:</strong> 30 Peti (after confirmation)
              </p>
              <p className="text-muted-foreground mb-8">
                Contact us for bulk pricing and custom requirements. We're here to help bring your vision to life!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" size="lg" className="text-lg h-12 px-8" asChild>
                  <Link to="/try3d">Start Customizing</Link>
                </Button>
                <Button variant="outline" size="lg" className="text-lg h-12 px-8" asChild>
                  <Link to="/contact">Get Quote</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-slide-in-elastic">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to See Your Design?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Use our 3D customization tool to visualize your bottles before ordering
            </p>
            <Button variant="accent" size="lg" className="text-lg h-14 px-8 bg-white text-primary hover:bg-white/90" asChild>
              <Link to="/try3d">Customize Now</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
