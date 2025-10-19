import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Target, Users, Award, Sparkles } from "lucide-react";
import bottle3d from "@/assets/20250804_143613_1_11zon.webp";
import clientServicesImage from "@/assets/client_services_13_11zon.webp";
import { useEffect, useRef, useState } from "react";

const About = () => {
  const [visibleSections, setVisibleSections] = useState({
    hero: true,
    mission: false,
    values: false,
    team: false,
    stats: false
  });

  const [showAllSteps, setShowAllSteps] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>("water-subscription");

  const sectionRefs = {
    mission: useRef<HTMLDivElement>(null),
    values: useRef<HTMLDivElement>(null),
    team: useRef<HTMLDivElement>(null),
    stats: useRef<HTMLDivElement>(null)
  };


  useEffect(() => {
    const observers = Object.entries(sectionRefs).map(([key, ref]) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => ({ ...prev, [key]: true }));
            
            // Show all steps at once for team section
            if (key === 'team') {
              setShowAllSteps(true);
            }
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

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section with Logo Theme */}
      <section className="py-16 bg-gradient-hero text-white">
      {/* Decorative elements */}
        <div className="absolute inset-0">
          {/* Wavy bottom border */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-white opacity-95">
            <svg className="w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M0,60 Q300,20 600,60 T1200,60 L1200,120 L0,120 Z" fill="white"/>
            </svg>
          </div>
          
          {/* Subtle bottle silhouette */}
          <div className="absolute right-10 top-1/2 transform -translate-y-1/2 opacity-20">
            <div className="w-24 h-36 bg-white/30 rounded-full border-4 border-white/40"></div>
            <div className="w-6 h-6 bg-white/40 rounded-full mx-auto -mt-1"></div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg text-white">
              About Aqua2Promo
            </h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed drop-shadow-md">
              Lucknow's Best Customized Water Bottle Brand
            </p>
            <div className="mt-6">
              <Button 
                variant="accent" 
                size="lg" 
                className="text-lg h-12 px-6 shadow-2xl bg-white text-blue-600 hover:bg-white/90 border-2 border-white/20"
                asChild
              >
                <Link to="/try3d">
                  Try Our 3D Customizer <Sparkles className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section ref={sectionRefs.mission} className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className={`space-y-4 ${visibleSections.mission ? 'animate-slide-in-diagonal' : 'opacity-0'}`}>
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                At Aqua2Promo, we believe that every brand deserves to shine. Our mission is to provide premium, customizable water bottles that not only hydrate but also elevate your brand presence.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We combine cutting-edge 3D visualization technology with traditional craftsmanship to deliver bottles that perfectly represent your vision. From hotels to cafes, restaurants to events, we help businesses make a lasting impression.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <Card className="p-4 text-center border-2 border-blue-200 hover:border-blue-500 transition-colors bg-blue-50/50">
                  <div className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-1">500+</div>
                  <div className="text-muted-foreground text-sm">Happy Clients</div>
                </Card>
                <Card className="p-4 text-center border-2 border-blue-200 hover:border-blue-500 transition-colors bg-blue-50/50">
                  <div className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-1">100%</div>
                  <div className="text-muted-foreground text-sm">Recyclable</div>
                </Card>
              </div>
            </div>
            
            <div className={`relative ${visibleSections.mission ? 'animate-fade-in-right' : 'opacity-0'}`} style={{ animationDelay: visibleSections.mission ? '300ms' : '0ms' }}>
              <div className="absolute inset-0 bg-gradient-primary rounded-3xl blur-3xl opacity-20 animate-glow"></div>
              <img 
                src={bottle3d} 
                alt="3D Bottle Preview" 
                className="relative z-10 rounded-3xl shadow-2xl animate-float w-full h-full object-cover mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section ref={sectionRefs.values} className="py-16 bg-blue-50/30">
        <div className="container mx-auto px-4">
          <div className={`text-center mb-12 ${visibleSections.values ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">Our Values</h2>
            <p className="text-xl text-muted-foreground">What drives us every day</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Award,
                title: "Premium Quality",
                description: "We never compromise on the quality of our bottles and printing",
              },
              {
                icon: Sparkles,
                title: "Innovation",
                description: "Using 3D technology to revolutionize bottle customization",
              },
              {
                icon: Users,
                title: "Customer First",
                description: "Your satisfaction and brand success is our top priority",
              },
              {
                icon: Target,
                title: "Sustainability",
                description: "100% recyclable materials for a greener tomorrow",
              },
            ].map((value, index) => (
              <Card 
                key={index} 
                className={`p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-blue-200 hover:border-blue-500 bg-white/80 ${visibleSections.values ? 'animate-wave-in' : 'opacity-0'}`}
                style={{ animationDelay: visibleSections.values ? `${index * 200}ms` : '0ms' }}
              >
                <value.icon className="w-10 h-10 text-blue-600 mb-3" />
                <h3 className="text-lg font-semibold mb-2 text-gray-800">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Client Services Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Right Side - Single Image */}
                        <div className="relative">
              <div className="flex justify-center">
                <div className="relative">
                  <img 
                    src={clientServicesImage} 
                    alt="Client Services" 
                    className="w-full h-auto rounded-2xl shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                </div>
              </div>
            </div>

            {/* Left Side - Services Menu */}
            <div className="space-y-6">
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <div className="w-1 h-8 bg-gradient-primary mr-4"></div>
                  <span className="text-blue-600 font-semibold text-lg">EFFECTIVE</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Client Services</h2>
                <p className="text-lg text-gray-600">Comprehensive solutions for your bottled water branding needs</p>
              </div>

              {/* Services Accordion */}
              <div className="space-y-4">
                {/* Store and Ship Service */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <button 
                    onClick={() => setOpenAccordion(openAccordion === "store-ship" ? null : "store-ship")}
                    className="w-full px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex items-center justify-between text-left"
                  >
                    <span className="font-semibold text-gray-700">STORE & SHIP SERVICE</span>
                    <svg className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${openAccordion === "store-ship" ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openAccordion === "store-ship" && (
                    <div className="px-6 py-4 bg-gray-50">
                      <p className="text-gray-600 leading-relaxed">
                        We handle your entire production, securely store it at our facility, and ship it whenever you need — whether it's a single case or a full truckload. You only pay for shipping and handling, and we take care of the rest.
                      </p>
                    </div>
                  )}
                </div>

                {/* Water Subscription */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <button 
                    onClick={() => setOpenAccordion(openAccordion === "water-subscription" ? null : "water-subscription")}
                    className="w-full px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex items-center justify-between text-left"
                  >
                    <span className="font-semibold text-gray-700">WATER SUBSCRIPTION</span>
                    <svg className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${openAccordion === "water-subscription" ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openAccordion === "water-subscription" && (
                    <div className="px-6 py-4 bg-gray-50">
                      <p className="text-gray-600 leading-relaxed">
                        Our flexible bottled water subscription makes it easy to manage your supply. Simply prepay for your desired quantity, schedule your delivery dates, and we'll ensure timely shipments according to your plan.
                      </p>
                    </div>
                  )}
                </div>

                {/* Distribution and Co-package */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <button 
                    onClick={() => setOpenAccordion(openAccordion === "distribution" ? null : "distribution")}
                    className="w-full px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex items-center justify-between text-left"
                  >
                    <span className="font-semibold text-gray-700">DISTRIBUTION & CO-PACKAGING</span>
                    <svg className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${openAccordion === "distribution" ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openAccordion === "distribution" && (
                    <div className="px-6 py-4 bg-gray-50">
                      <p className="text-gray-600 leading-relaxed">
                        We proudly collaborate with promotional distributors, bottlers, and fulfillment centers nationwide. Whether it's a one-time bulk order, weekly auto-shipment, or monthly replenishment, we offer a range of distribution options to keep your clients consistently stocked with their custom-branded water.
                      </p>
                    </div>
                  )}
                </div>

                {/* Powerful Branding */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <button 
                    onClick={() => setOpenAccordion(openAccordion === "branding" ? null : "branding")}
                    className="w-full px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex items-center justify-between text-left"
                  >
                    <span className="font-semibold text-gray-700">POWERFUL BRANDING</span>
                    <svg className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${openAccordion === "branding" ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openAccordion === "branding" && (
                    <div className="px-6 py-4 bg-gray-50">
                      <p className="text-gray-600 leading-relaxed">
                        Custom-labeled bottled water is an excellent promotional product that reinforces brand visibility. Partnering with us provides your organization with a profitable, high-margin branding solution that leaves a lasting impression.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section ref={sectionRefs.team} className="py-24 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-200/30 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-indigo-200/30 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className={`text-center mb-20 ${visibleSections.team ? 'animate-slide-in-down' : 'opacity-0'}`}>
            <div className="inline-block mb-6">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Our Process
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              From design to delivery - a seamless journey to your perfect bottle
            </p>
            
            {/* Process Overview */}
            <div className="max-w-md mx-auto">
              <div className="flex justify-center items-center mb-4">
                <span className="text-lg font-semibold text-gray-700">6 Simple Steps</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div 
                  className="h-full bg-gradient-primary rounded-full transition-all duration-1000 ease-out"
                  style={{ width: showAllSteps ? '100%' : '0%' }}
                ></div>
              </div>
            </div>
          </div>

          {/* Process Steps - Direct Fast Animation */}
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { 
                  title: "Design Pickup", 
                  desc: "Share your brand logo and requirements with our team",
                  icon: "📋",
                  color: "from-blue-500 to-cyan-500",
                  delay: "200ms",
                  position: "top-left"
                },
                { 
                  title: "Label Design", 
                  desc: "Our designers create a custom label that matches your vision",
                  icon: "🎨",
                  color: "from-blue-600 to-indigo-500",
                  delay: "400ms",
                  position: "top-center"
                },
                { 
                  title: "3D Preview", 
                  desc: "See your design on a 3D bottle model before production",
                  icon: "🔍",
                  color: "from-cyan-500 to-blue-500",
                  delay: "600ms",
                  position: "top-right"
                },
                { 
                  title: "Label Printing", 
                  desc: "High-quality printing on premium waterproof material",
                  icon: "🖨️",
                  color: "from-indigo-500 to-blue-600",
                  delay: "800ms",
                  position: "bottom-right"
                },
                { 
                  title: "Packaging", 
                  desc: "Careful packaging to ensure safe delivery",
                  icon: "📦",
                  color: "from-blue-500 to-cyan-500",
                  delay: "1000ms",
                  position: "bottom-center"
                },
                { 
                  title: "Shipping", 
                  desc: "Fast and reliable delivery to your location",
                  icon: "🚚",
                  color: "from-cyan-500 to-blue-500",
                  delay: "1200ms",
                  position: "bottom-left"
                },
            ].map((step, idx) => (
                <div 
                  key={idx} 
                  className={`group relative transition-all duration-700 ease-out ${
                    showAllSteps 
                      ? 'opacity-100 scale-100 translate-y-0' 
                      : 'opacity-0 scale-95 translate-y-8'
                  }`} 
                  style={{ 
                    animationDelay: showAllSteps ? `${idx * 100}ms` : '0ms'
                  }}
                >
                  {/* Card with Enhanced Animation */}
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-3 border border-white/20 relative z-20">
                    {/* Step Number */}
                    <div className="absolute -top-4 -right-4 w-14 h-14 bg-gradient-primary text-white rounded-full flex items-center justify-center text-xl font-bold shadow-2xl group-hover:scale-125 transition-all duration-300">
                      {idx + 1}
                    </div>
                    
                    {/* Icon */}
                    <div className={`w-24 h-24 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center text-5xl mb-6 mx-auto group-hover:scale-125 transition-all duration-500 shadow-2xl`}>
                      {step.icon}
                    </div>
                    
                    {/* Content */}
                    <div className="text-center">
                      <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-primary transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                </div>
              </div>
            ))}
            </div>
            
            {/* Progress Bar */}
            <div className={`mt-16 ${visibleSections.team ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: visibleSections.team ? '500ms' : '0ms' }}>
              <div className="bg-white/60 backdrop-blur-sm rounded-full p-4 shadow-lg">
                <div className="flex items-center justify-between text-sm font-semibold text-gray-700 mb-2">
                  <span>Start</span>
                  <span>Complete</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Let's Create Something Amazing</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Ready to see your brand on premium customized water bottles?
          </p>
          <Button variant="accent" size="lg" className="text-lg h-14 px-8 bg-white text-primary hover:bg-white/90" asChild>
            <Link to="/booking">Get Started Today</Link>
          </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
