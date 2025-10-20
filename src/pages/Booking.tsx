import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, Clock, Users, FileText } from "lucide-react";
import { useState } from "react";

const Booking = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    meetingType: '',
    businessType: '',
    estimatedQuantity: '',
    bottlePreferences: [],
    additionalRequirements: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        bottlePreferences: checked 
          ? [...prev.bottlePreferences, value]
          : prev.bottlePreferences.filter(item => item !== value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      const apiUrl = import.meta.env.PROD ? 'https://aiwillendjobs.com/api' : 'http://localhost:5000';
      console.log('Sending booking request to:', `${apiUrl}/booking`);
      console.log('Form data:', formData);
      
      const response = await fetch(`${apiUrl}/booking`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          fullName: '',
          companyName: '',
          email: '',
          phone: '',
          preferredDate: '',
          preferredTime: '',
          meetingType: '',
          businessType: '',
          estimatedQuantity: '',
          bottlePreferences: [],
          additionalRequirements: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting booking form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-hero text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold">Book an Appointment</h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              Schedule a consultation to discuss your customization needs
            </p>
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 md:p-12">
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-4">Schedule Your Consultation</h2>
                <p className="text-muted-foreground text-lg">
                  Fill out the form below and our team will get back to you within 24 hours to confirm your appointment.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
                    ✅ Thank you! Your appointment has been booked. We'll contact you within 24 hours to confirm.
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                    ❌ Something went wrong. Please try again.
                  </div>
                )}
                {/* Personal Information */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    Personal Information
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Full Name *</label>
                      <input 
                        type="text" 
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="John Doe" 
                        required
                        className="w-full px-4 py-3 rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Company Name *</label>
                      <input 
                        type="text" 
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        placeholder="Acme Hotels" 
                        required
                        className="w-full px-4 py-3 rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Email Address *</label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com" 
                        required
                        className="w-full px-4 py-3 rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Phone Number *</label>
                      <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 XXX XXX XXXX" 
                        required
                        className="w-full px-4 py-3 rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Appointment Details */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    Appointment Details
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Preferred Date *</label>
                      <input 
                        type="date" 
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Preferred Time *</label>
                      <select 
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors"
                      >
                        <option value="">Select time</option>
                        <option value="9:00">9:00 AM</option>
                        <option value="10:00">10:00 AM</option>
                        <option value="11:00">11:00 AM</option>
                        <option value="12:00">12:00 PM</option>
                        <option value="14:00">2:00 PM</option>
                        <option value="15:00">3:00 PM</option>
                        <option value="16:00">4:00 PM</option>
                        <option value="17:00">5:00 PM</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Meeting Type *</label>
                    <select 
                      name="meetingType"
                      value={formData.meetingType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors"
                    >
                      <option value="">Select meeting type</option>
                      <option value="in-person">In-Person Meeting</option>
                      <option value="phone">Phone Call</option>
                      <option value="video">Video Conference</option>
                    </select>
                  </div>
                </div>

                {/* Project Details */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    Project Details
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Business Type *</label>
                      <select 
                        name="businessType"
                        value={formData.businessType}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors"
                      >
                        <option value="">Select business type</option>
                        <option value="hotel">Hotel</option>
                        <option value="cafe">Cafe/Restaurant</option>
                        <option value="event">Event Company</option>
                        <option value="corporate">Corporate</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Estimated Quantity *</label>
                      <input 
                        type="number" 
                        name="estimatedQuantity"
                        value={formData.estimatedQuantity}
                        onChange={handleInputChange}
                        placeholder="1000" 
                        required
                        className="w-full px-4 py-3 rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Bottle Preference</label>
                    <div className="grid grid-cols-3 gap-3">
                      {['Standard', 'Pyramid', 'Square'].map((shape) => (
                        <label key={shape} className="flex items-center gap-2 p-3 border-2 border-border rounded-lg hover:border-primary transition-colors cursor-pointer">
                          <input 
                            type="checkbox" 
                            value={shape}
                            checked={formData.bottlePreferences.includes(shape)}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-primary" 
                          />
                          <span className="text-sm font-medium">{shape}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Additional Requirements</label>
                    <textarea 
                      rows={5}
                      name="additionalRequirements"
                      value={formData.additionalRequirements}
                      onChange={handleInputChange}
                      placeholder="Tell us more about your project requirements, deadlines, special requests, etc..." 
                      className="w-full px-4 py-3 rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors resize-none"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <Button 
                    variant="hero" 
                    size="lg" 
                    className="w-full text-lg h-14" 
                    type="submit"
                    disabled={isSubmitting}
                  >
                    <Clock className="mr-2" />
                    {isSubmitting ? 'Booking...' : 'Book Appointment'}
                  </Button>
                </div>
              </form>
            </Card>

            {/* Additional Information */}
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              {[
                {
                  icon: Calendar,
                  title: "Flexible Scheduling",
                  description: "Choose a time that works best for you",
                },
                {
                  icon: Users,
                  title: "Expert Consultation",
                  description: "Talk with our design specialists",
                },
                {
                  icon: FileText,
                  title: "Custom Quote",
                  description: "Get a detailed quote for your project",
                },
              ].map((item, idx) => (
                <Card key={idx} className="p-6 text-center hover:shadow-lg transition-all">
                  <item.icon className="w-10 h-10 text-primary mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Have Questions?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Feel free to contact us directly for immediate assistance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="accent" size="lg" className="text-lg h-14 px-8 bg-white text-primary hover:bg-white/90" asChild>
              <a href="/contact">Contact Us</a>
            </Button>
            <Button variant="secondary" size="lg" className="text-lg h-14 px-8" asChild>
              <a href="tel:+918858146872">Call Now</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Booking;
