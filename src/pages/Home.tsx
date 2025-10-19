import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Sparkles, Shield, Leaf, Award, Apple, ShieldCheck, Droplet, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import heroBottles from "@/assets/hero-bottles_21_11zon.webp";
// import bottleGumtea from "@/assets/bottle-gumtea_6_11zon.webp";
// import bottleRestaurant from "@/assets/bottle-restaurant_8_11zon.webp";
// import bottleDhaba from "@/assets/bottle-dhaba_4_11zon.webp";
import bottleRestaurant from "@/assets/IMG_20251019_000015_30_11zon.webp";
import bottleDhaba from "@/assets/IMG_20251016_140450_26_11zon.webp";
import bottleGumtea from "@/assets/IMG_20251019_000126_32_11zon.webp";
import bottleGumteaYellow from "@/assets/bottle-gumtea-yellow_7_11zon.webp";
import bottlesCollectionGumtea from "@/assets/bottles-collection-gumtea_10_11zon.webp";
import bottleWaterfall from "@/assets/bottle-waterfall_12_11zon.webp";
import bottleRestaurantScene from "@/assets/bottle-restaurant-scene_9_11zon.webp";
import bottlesTrio from "@/assets/bottles-trio_11_11zon.webp";
import bottleDhabaSingle from "@/assets/bottle-dhaba-single_5_11zon.webp";
import nutritionBottle from "@/assets/Gemini_Generated_Image_y7p55iy7p55iy7p5_19_11zon.webp";
import removeBackgroundImage from "@/assets/removebackgroundimage_37_11zon.webp";
import rotationbottle from "@/assets/IMG_20251016_140424.png";
import premiumbottle from "@/assets/premiumbottledesign111.webp";
import submitquote from "@/assets/submitquote.webp";
import designready from "@/assets/designready.webp";
import productdelivery from "@/assets/productdelivery.webp";
import naturalbottle from "@/assets/IMG_20251019_000126_32_11zon.webp";

const Home = () => {
  const [visibleSections, setVisibleSections] = useState({
    features: false,
    about: false,
    howToOrder: false,
    rotatingBottle: false,
    nutrition: false,
    collection: false,
    testimonials: false
  });

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const [slidesToShow, setSlidesToShow] = useState(3);

  const sectionRefs = {
    features: useRef<HTMLDivElement>(null),
    about: useRef<HTMLDivElement>(null),
    howToOrder: useRef<HTMLDivElement>(null),
    rotatingBottle: useRef<HTMLDivElement>(null),
    nutrition: useRef<HTMLDivElement>(null),
    collection: useRef<HTMLDivElement>(null),
    testimonials: useRef<HTMLDivElement>(null)
  };

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

  // Responsive slides logic
  useEffect(() => {
    const updateSlidesToShow = () => {
      if (window.innerWidth < 768) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };

    updateSlidesToShow();
    window.addEventListener('resize', updateSlidesToShow);
    return () => window.removeEventListener('resize', updateSlidesToShow);
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % (6 - slidesToShow + 1));
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, slidesToShow]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % (6 - slidesToShow + 1));
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + (6 - slidesToShow + 1)) % (6 - slidesToShow + 1));
    setIsAutoPlaying(false);
  };

  return <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero pt-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                Customize Your Water Bottle for Your Brand
              </h1>
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                Get a 3D model view of your design on the bottle. Apply your design and see how it looks in real-time!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button variant="hero" size="lg" className="text-lg h-14 px-8 shadow-2xl" asChild>
                  <Link to="/booking">
                    Get Quote <ArrowRight className="ml-2" />
                  </Link>
                </Button>
                <Button variant="accent" size="lg" className="text-lg h-14 px-8 shadow-2xl" asChild>
                  <Link to="/try3d">
                    Personalize Bottle <Sparkles className="ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="relative animate-float">
              <div className="absolute inset-0 bg-gradient-primary rounded-full blur-3xl opacity-30 animate-glow"></div>
              <img src={heroBottles} alt="Customized Water Bottles" className="relative z-10 rounded-3xl shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={sectionRefs.features} className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className={`text-center mb-16 ${visibleSections.features ? 'animate-slide-in-down' : 'opacity-0'}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Why Choose Aqua2Promo?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Refresh your style with custom-labeled water bottles designed for excellence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[{
            icon: Award,
            title: "Premium Quality",
            description: "Best quality bottles with superior durability and design",
            animation: "animate-slide-in-left"
          }, {
            icon: Sparkles,
            title: "Custom Designs",
            description: "Fully customizable labels to match your brand identity",
            animation: "animate-fade-in-up"
          }, {
            icon: Leaf,
            title: "100% Recyclable",
            description: "Eco-friendly materials, preservative-free water",
            animation: "animate-fade-in-up"
          }, {
            icon: Shield,
            title: "Trusted Brand",
            description: "Lucknow's #1 customized water bottle provider",
            animation: "animate-slide-in-right"
          }].map((feature, index) => <Card key={index} className={`p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-primary ${visibleSections.features ? feature.animation : 'opacity-0'}`} style={{
            animationDelay: visibleSections.features ? `${index * 200}ms` : '0ms'
          }}>
                <feature.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>)}
          </div>
        </div>
      </section>

      {/* About Section */}
       <section ref={sectionRefs.about} className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
              <div className={`space-y-6 text-center lg:text-left ${visibleSections.about ? 'animate-fade-in-left' : 'opacity-0'}`}>
               <div className="flex items-center gap-3 mb-4">
                 <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                   <Sparkles className="w-6 h-6 text-white" />
                 </div>
                 <h2 className="text-3xl md:text-4xl font-bold">
                About <span className="bg-gradient-primary bg-clip-text text-transparent">Aqua2Promo</span>
              </h2>
               </div>
               
               <div className="space-y-4">
                 <p className="text-base text-muted-foreground leading-relaxed">
                We are Lucknow's premier customized water bottle brand, dedicated to delivering premium quality bottles with personalized branding solutions.
              </p>
                 <p className="text-base text-muted-foreground leading-relaxed">
                Our mission is to help hotels, cafes, restaurants, and events stand out with beautifully designed, eco-friendly water bottles that carry your brand with pride.
              </p>
               </div>

               {/* Stats Cards */}
               <div className="grid grid-cols-2 gap-4 my-6">
                 <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105">
                   <div className="text-2xl font-bold text-primary">500+</div>
                   <div className="text-sm text-muted-foreground">Happy Clients</div>
                 </div>
                 <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105">
                   <div className="text-2xl font-bold text-primary">100%</div>
                   <div className="text-sm text-muted-foreground">Eco-Friendly</div>
                 </div>
               </div>

               {/* Feature Highlights */}
               <div className="space-y-3">
                 <div className="flex items-center gap-3 text-sm">
                   <div className="w-2 h-2 bg-primary rounded-full"></div>
                   <span className="text-muted-foreground">Premium Quality Materials</span>
                 </div>
                 <div className="flex items-center gap-3 text-sm">
                   <div className="w-2 h-2 bg-primary rounded-full"></div>
                   <span className="text-muted-foreground">3D Visualization Technology</span>
                 </div>
                 <div className="flex items-center gap-3 text-sm">
                   <div className="w-2 h-2 bg-primary rounded-full"></div>
                   <span className="text-muted-foreground">Fast Delivery & Support</span>
                 </div>
               </div>

               <Button variant="default" size="lg" asChild className="w-full sm:w-auto">
                <Link to="/about">Learn More About Us <ArrowRight className="ml-2" /></Link>
              </Button>
            </div>
            <div className={`grid grid-cols-2 gap-2 max-w-md mx-auto ${visibleSections.about ? 'animate-fade-in-right' : 'opacity-0'}`} style={{ animationDelay: visibleSections.about ? '300ms' : '0ms' }}>
              {[
                { img: naturalbottle, span: 'col-span-2' },
                { img: bottleDhaba, span: '' },
                { img: bottleRestaurant, span: '' },
              ].map((item, idx) => (
                <img 
                  key={idx} 
                  src={item.img} 
                  alt={`Customized bottle ${idx + 1}`} 
                  className={`rounded-md shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 ${item.span}`} 
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How to Order Section */}
      <section ref={sectionRefs.howToOrder} className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className={`text-center mb-16 ${visibleSections.howToOrder ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">How to Order</h2>
            <p className="text-xl text-muted-foreground">Simple steps to get your custom bottles</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[{
            step: "01",
            title: "Submit Quote",
            desc: "Share your brand requirements and quantity",
            image: submitquote,
            animation: "animate-slide-in-left"
          }, {
            step: "02",
            title: "Approve Design",
            desc: "Review and approve your custom label design",
            image: designready,
            animation: "animate-slide-in-center"
          }, {
            step: "03",
            title: "Place Order",
            desc: "Confirm order and receive premium bottles",
            image: productdelivery,
            animation: "animate-slide-in-right"
          }].map((item, idx) => <div key={idx} className={`text-center space-y-4 group ${visibleSections.howToOrder ? item.animation : 'opacity-0'}`} style={{
            animationDelay: visibleSections.howToOrder ? `${idx * 200}ms` : '0ms'
          }}>
                <div className="relative mb-6">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-72 h-72 circular-image shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:scale-95 mx-auto"
                  />
                  <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-gradient-primary text-white flex items-center justify-center text-3xl font-bold shadow-lg group-hover:scale-110 transition-transform">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-2xl font-semibold">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* Rotating Bottle Section */}
      <section ref={sectionRefs.rotatingBottle} className="py-24 bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className={`text-center mb-16 ${visibleSections.rotatingBottle ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">Premium Water Bottles</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the perfect blend of quality and design with our rotating bottle showcase
            </p>
          </div>

          <div className={`flex justify-center items-center ${visibleSections.rotatingBottle ? 'animate-scale-in' : 'opacity-0'}`} style={{ animationDelay: visibleSections.rotatingBottle ? '300ms' : '0ms' }}>
            <div className="relative">
              {/* Rotating Bottle */}
              <div className={`${visibleSections.rotatingBottle ? 'animate-spin-slow' : ''}`}>
                <img
                  src={rotationbottle}
                  alt="Rotating Water Bottle"
                  className="w-90 h-96 object-contain drop-shadow-2xl bg-removed"
                />
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-500 rounded-full animate-bounce opacity-60"></div>
              <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-indigo-500 rounded-full animate-bounce opacity-60" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute top-1/2 -left-8 w-4 h-4 bg-cyan-500 rounded-full animate-bounce opacity-60" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-1/2 -right-8 w-5 h-5 bg-blue-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '1.5s' }}></div>
            </div>
          </div>

          {/* Features around the bottle */}
          <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
            <div className={`text-center ${visibleSections.rotatingBottle ? 'animate-slide-in-left' : 'opacity-0'}`} style={{ animationDelay: visibleSections.rotatingBottle ? '600ms' : '0ms' }}>
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">360° Design</h3>
              <p className="text-gray-600">Full rotation view of our premium bottles</p>
            </div>
            
            <div className={`text-center ${visibleSections.rotatingBottle ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: visibleSections.rotatingBottle ? '700ms' : '0ms' }}>
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
              <p className="text-gray-600">High-grade materials and craftsmanship</p>
            </div>
            
            <div className={`text-center ${visibleSections.rotatingBottle ? 'animate-slide-in-right' : 'opacity-0'}`} style={{ animationDelay: visibleSections.rotatingBottle ? '800ms' : '0ms' }}>
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Durable</h3>
              <p className="text-gray-600">Built to last with superior durability</p>
            </div>
          </div>
        </div>
      </section>

      {/* Nutrition Rich Water Section */}
      <section ref={sectionRefs.nutrition} className="w-full bg-white py-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className={`text-center mb-12 ${visibleSections.nutrition ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <p className="text-blue-600 font-semibold tracking-wide uppercase">What We Offer</p>
            <h2 className="text-4xl font-bold mt-2">Nutrition Rich Water</h2>
          </div>

          {/* Main Content with Left-Right Layout */}
          <div className={`flex flex-wrap justify-center items-center gap-16 px-6 ${visibleSections.nutrition ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: visibleSections.nutrition ? '200ms' : '0ms' }}>
            {/* Left Side */}
            <div className="flex flex-col gap-12">
              {/* Vitamin B12 */}
              <div className={`flex items-start gap-4 max-w-sm ${visibleSections.nutrition ? 'animate-slide-in-left' : 'opacity-0'}`} style={{ animationDelay: visibleSections.nutrition ? '400ms' : '0ms' }}>
                <div className="bg-blue-600 p-4 rounded-md">
                  <Apple size={40} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Vitamin B12</h3>
                  <p className="text-gray-600 text-sm">infusion and other minerals to make sure your health is taken care of.</p>
                </div>
              </div>
              
              {/* Ozonised */}
              <div className={`flex items-start gap-4 max-w-sm ${visibleSections.nutrition ? 'animate-slide-in-left' : 'opacity-0'}`} style={{ animationDelay: visibleSections.nutrition ? '600ms' : '0ms' }}>
                <div className="bg-blue-600 p-4 rounded-md">
                  <Droplet size={40} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Ozonised</h3>
                  <p className="text-gray-600 text-sm">to keep everything natural and healthy for you.</p>
                </div>
                    </div>
            </div>
            
            {/* Center Bottle */}
            <div className={`flex justify-center ${visibleSections.nutrition ? 'animate-zoom-in' : 'opacity-0'}`} style={{ animationDelay: visibleSections.nutrition ? '300ms' : '0ms' }}>
              <img
                src={premiumbottle}
                alt="Water Bottle"
                className="w-96 drop-shadow-lg transform transition-all duration-1000 bg-removed-alt"
                style={{ 
                  transform: visibleSections.nutrition ? 'scale(1)' : 'scale(0.3)',
                  transition: 'transform 0.8s ease-out'
                }}
              />
            </div>

            {/* Right Side */}
            <div className="flex flex-col gap-12">
              {/* EMF */}
              <div className={`flex items-start gap-4 max-w-sm ${visibleSections.nutrition ? 'animate-slide-in-right' : 'opacity-0'}`} style={{ animationDelay: visibleSections.nutrition ? '500ms' : '0ms' }}>
                <div>
                  <h3 className="text-lg font-semibold">EMF</h3>
                  <p className="text-gray-600 text-sm">EMF to keep the product fresh and safe from germs and bacteria.</p>
                </div>
                <div className="bg-blue-600 p-4 rounded-md">
                  <ShieldCheck size={40} className="text-white" />
                </div>
              </div>
              
              {/* GAC */}
              <div className={`flex items-start gap-4 max-w-sm ${visibleSections.nutrition ? 'animate-slide-in-right' : 'opacity-0'}`} style={{ animationDelay: visibleSections.nutrition ? '700ms' : '0ms' }}>
                <div>
                  <h3 className="text-lg font-semibold">GAC</h3>
                  <p className="text-gray-600 text-sm">to ensure that all harmful substances are removed from the product.</p>
                </div>
                <div className="bg-blue-600 p-4 rounded-md">
                  <Leaf size={40} className="text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Collection of Bottles Section */}
      <section ref={sectionRefs.collection} className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className={`text-center mb-16 ${visibleSections.collection ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Bottle Collection</h2>
            <p className="text-xl text-muted-foreground">Diverse designs for every brand identity</p>
          </div>

          {/* Slider Container */}
          <div className="relative max-w-6xl mx-auto">
            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>

            {/* Slider */}
            <div className="overflow-hidden rounded-2xl">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ 
                  transform: `translateX(-${currentSlide * (100 / slidesToShow)}%)` 
                }}
              >
            {[
              { img: bottlesCollectionGumtea, name: "Gumtea Collection" },
              { img: bottleGumteaYellow, name: "Premium Single Bottle" },
              { img: bottleRestaurantScene, name: "Restaurant Series" },
              { img: bottlesTrio, name: "Trio Collection" },
              { img: bottleDhabaSingle, name: "Dhaba Delight Special" },
              { img: bottleWaterfall, name: "Nature Edition" },
            ].map((item, idx) => (
                  <div key={idx} className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-4">
                    <Card className={`overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group ${visibleSections.collection ? 'animate-scale-in' : 'opacity-0'}`}>
                <div className="relative overflow-hidden">
                  <img 
                    src={item.img} 
                    alt={item.name} 
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-center">{item.name}</h3>
                </div>
              </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: 6 - slidesToShow + 1 }).map((_, dot) => (
                <button
                  key={dot}
                  onClick={() => {
                    setCurrentSlide(dot);
                    setIsAutoPlaying(false);
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentSlide === dot ? 'bg-primary scale-125' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={sectionRefs.testimonials} className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className={`text-center mb-16 ${visibleSections.testimonials ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-xl text-muted-foreground">Trusted by leading brands across Lucknow</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[{
            name: "Gumtea Cafe",
            feedback: "Outstanding quality and amazing customization options!",
            logo: bottleGumtea,
            rating: 5
          }, {
            name: "Dhaba Delight",
            feedback: "Perfect branding solution for our restaurant.",
            logo: bottleDhaba,
            rating: 5
          }, {
            name: "Hotel Premium",
            feedback: "Professional service and premium bottles that impress our guests.",
            logo: bottleRestaurant,
            rating: 5
          }].map((testimonial, idx) => <Card key={idx} className={`p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-primary ${visibleSections.testimonials ? 'animate-slide-in-elastic' : 'opacity-0'}`} style={{ animationDelay: visibleSections.testimonials ? `${idx * 200}ms` : '0ms' }}>
                <div className="flex items-center gap-4 mb-6">
                  <img 
                    src={testimonial.logo} 
                    alt={testimonial.name} 
                    className="w-16 h-16 rounded-full object-cover border-2 border-primary"
                  />
                  <div>
                    <p className="font-bold text-lg">{testimonial.name}</p>
                    <div className="flex gap-1 mt-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Award key={i} className="w-4 h-4 fill-primary text-primary" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-lg italic text-muted-foreground">"{testimonial.feedback}"</p>
              </Card>)}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-slide-in-up-slow">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Customize Your Bottles?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get started today and see your brand come to life on premium water bottles
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" className="text-lg h-14 px-8" asChild>
              <Link to="/booking">Book Appointment</Link>
            </Button>
            <Button variant="secondary" size="lg" className="text-lg h-14 px-8" asChild>
              <Link to="/products">View Products</Link>
            </Button>
            </div>
          </div>
        </div>
      </section>
    </div>;
};
export default Home;