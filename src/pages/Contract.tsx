import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { FileText, Download, Upload, PenTool, X, ChevronDown, ChevronUp, Plus, Minus, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import jsPDF from 'jspdf';

interface ContractFormData {
  fullName: string;
  designation: string;
  companyName: string;
  registeredAddress: string;
  mobileNumber: string;
  emailId: string;
  dateOfAgreement: string;
  digitalSignature: string;
  digitalSignatureName: string;
  digitalSignatureDate: string;
  termsAccepted: boolean;
}

const Contract = () => {
  const { currentUser, userData } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showPinDialog, setShowPinDialog] = useState(false);
  const [pin, setPin] = useState('');
  const [signatureMode, setSignatureMode] = useState<'draw' | 'upload'>('draw');
  const [signatureData, setSignatureData] = useState('');
  const [isDrawing, setIsDrawing] = useState(false);
  const [isContractOpen, setIsContractOpen] = useState(true);
  const [openSections, setOpenSections] = useState<{[key: string]: boolean}>({
    purpose: true,
    logo: false,
    ordering: false,
    inventory: false,
    delivery: false,
    payment: false,
    liability: false,
    duration: false,
    acceptance: false,
    event: false
  });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Page loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas properties
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000000';
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Set canvas size for better responsiveness
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (container) {
        const containerWidth = container.clientWidth;
        const aspectRatio = 400 / 150;
        const newWidth = Math.min(containerWidth - 20, 400);
        const newHeight = newWidth / aspectRatio;
        
        canvas.style.width = `${newWidth}px`;
        canvas.style.height = `${newHeight}px`;
      }
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  const [formData, setFormData] = useState<ContractFormData>({
    fullName: userData?.name || '',
    designation: '',
    companyName: userData?.businessName || '',
    registeredAddress: '',
    mobileNumber: userData?.mobile || '',
    emailId: userData?.email || '',
    dateOfAgreement: new Date().toISOString().split('T')[0],
    digitalSignature: '',
    digitalSignatureName: '',
    digitalSignatureDate: new Date().toISOString().split('T')[0],
    termsAccepted: false
  });

  // Redirect to login if not authenticated
  if (!currentUser) {
    navigate('/login');
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleSection = (sectionKey: string) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  // Form validation
  const validateForm = () => {
    const requiredFields = [
      { key: 'fullName', label: 'Full Name' },
      { key: 'designation', label: 'Designation' },
      { key: 'companyName', label: 'Company Name' },
      { key: 'registeredAddress', label: 'Registered Address' },
      { key: 'mobileNumber', label: 'Mobile Number' },
      { key: 'emailId', label: 'Email ID' },
      { key: 'dateOfAgreement', label: 'Date of Agreement' },
      { key: 'digitalSignatureName', label: 'Digital Signature Name' }
    ];

    const missingFields = requiredFields.filter(field => !formData[field.key as keyof ContractFormData]?.trim());
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing Required Fields",
        description: `Please fill in: ${missingFields.map(f => f.label).join(', ')}`,
        variant: "destructive",
      });
      return false;
    }

    if (!signatureData) {
      toast({
        title: "Digital Signature Required",
        description: "Please provide a digital signature",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.termsAccepted) {
      toast({
        title: "Terms and Conditions",
        description: "Please accept the terms and conditions",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      termsAccepted: checked
    }));
  };

  // Digital Signature Drawing
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set line properties
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000000';
    
    // Calculate coordinates relative to canvas
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Calculate coordinates relative to canvas
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    setSignatureData(canvas.toDataURL());
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas and set white background
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Reset line properties
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000000';
    
    setSignatureData('');
  };

  // File Upload for Signature
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      setSignatureData(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const generatePDF = async () => {
    const pdf = new jsPDF();
    let yPosition = 20;
    let pageNumber = 1;
    const maxY = 280; // Maximum Y position before new page
    
    // Helper function to add new page if needed
    const checkNewPage = (requiredSpace = 20) => {
      if (yPosition + requiredSpace > maxY) {
        pdf.addPage();
        yPosition = 20;
        pageNumber++;
      }
    };
    
    // Add contract content with better formatting
    pdf.setTextColor(0, 119, 182); // Blue color
    pdf.setFontSize(18);
    pdf.text('AQUA2PROMO E-CONTRACT AGREEMENT', 20, yPosition);
    yPosition += 20;
    
    pdf.setTextColor(0, 0, 0); // Black color
    pdf.setFontSize(12);
    pdf.text('Between:', 20, yPosition);
    yPosition += 8;
    pdf.text('Aqua2Promo (White Labelling Company)', 20, yPosition);
    yPosition += 8;
    pdf.text('and', 20, yPosition);
    yPosition += 8;
    pdf.text('Partner Business (Café / Restaurant / Event / Shop)', 20, yPosition);
    yPosition += 20;
    
    // Partner Information
    checkNewPage(30);
    pdf.setFontSize(14);
    pdf.setTextColor(0, 119, 182);
    pdf.text('1. Partner Information', 20, yPosition);
    yPosition += 12;
    
    pdf.setFontSize(11);
    pdf.setTextColor(0, 0, 0);
    pdf.text(`Full Name: ${formData.fullName}`, 20, yPosition);
    yPosition += 6;
    pdf.text(`Designation: ${formData.designation}`, 20, yPosition);
    yPosition += 6;
    pdf.text(`Company: ${formData.companyName}`, 20, yPosition);
    yPosition += 6;
    pdf.text(`Registered Address: ${formData.registeredAddress}`, 20, yPosition);
    yPosition += 6;
    pdf.text(`Mobile Number: ${formData.mobileNumber}`, 20, yPosition);
    yPosition += 6;
    pdf.text(`Email ID: ${formData.emailId}`, 20, yPosition);
    yPosition += 6;
    pdf.text(`Date of Agreement: ${formData.dateOfAgreement}`, 20, yPosition);
    yPosition += 15;
    
    // Purpose of Agreement
    checkNewPage(20);
    pdf.setFontSize(14);
    pdf.setTextColor(0, 119, 182);
    pdf.text('2. Purpose of the Agreement', 20, yPosition);
    yPosition += 12;
    pdf.setFontSize(11);
    pdf.setTextColor(0, 0, 0);
    pdf.text('This e-contract establishes the understanding between Aqua2Promo and the Partner', 20, yPosition);
    yPosition += 6;
    pdf.text('Business for the supply of customized and white-labelled water bottles or similar', 20, yPosition);
    yPosition += 6;
    pdf.text('promotional products under the Partner\'s brand name.', 20, yPosition);
    yPosition += 15;
    
    // Logo and Trademark Usage
    checkNewPage(25);
    pdf.setFontSize(14);
    pdf.setTextColor(0, 119, 182);
    pdf.text('3. Logo and Trademark Usage', 20, yPosition);
    yPosition += 12;
    pdf.setFontSize(11);
    pdf.setTextColor(0, 0, 0);
    pdf.text('• The Partner agrees to share their official logo, trademark, and design for product branding.', 20, yPosition);
    yPosition += 6;
    pdf.text('• The Partner confirms that they own the full rights to the provided logo/trademark', 20, yPosition);
    yPosition += 6;
    pdf.text('  and that it does not violate any third-party rights.', 20, yPosition);
    yPosition += 6;
    pdf.text('• Aqua2Promo is not responsible or liable for any disputes regarding trademark', 20, yPosition);
    yPosition += 6;
    pdf.text('  authenticity or ownership. The Partner will be solely responsible for such matters.', 20, yPosition);
    yPosition += 15;
    
    // Ordering & Reordering Timeline
    checkNewPage(20);
    pdf.setFontSize(14);
    pdf.setTextColor(0, 119, 182);
    pdf.text('4. Ordering & Reordering Timeline', 20, yPosition);
    yPosition += 12;
    pdf.setFontSize(11);
    pdf.setTextColor(0, 0, 0);
    pdf.text('• All reorders must be placed at least 1 day in advance to ensure smooth delivery', 20, yPosition);
    yPosition += 6;
    pdf.text('  and production.', 20, yPosition);
    yPosition += 6;
    pdf.text('• Same-day or urgent orders may be accepted subject to stock and production capacity.', 20, yPosition);
    yPosition += 15;
    
    // Inventory & Discontinuation
    checkNewPage(25);
    pdf.setFontSize(14);
    pdf.setTextColor(0, 119, 182);
    pdf.text('5. Inventory & Discontinuation of Service', 20, yPosition);
    yPosition += 12;
    pdf.setFontSize(11);
    pdf.setTextColor(0, 0, 0);
    pdf.text('• Aqua2Promo maintains dedicated stock for each Partner\'s customized products.', 20, yPosition);
    yPosition += 6;
    pdf.text('• If the Partner wishes to discontinue the service, they must inform Aqua2Promo', 20, yPosition);
    yPosition += 6;
    pdf.text('  at least 1 month in advance through a phone call or WhatsApp message.', 20, yPosition);
    yPosition += 6;
    pdf.text('• During this period, the Partner agrees to clear all existing stock produced or', 20, yPosition);
    yPosition += 6;
    pdf.text('  stored under their brand in Aqua2Promo\'s inventory.', 20, yPosition);
    yPosition += 15;
    
    // Product Delivery & Complaints
    checkNewPage(25);
    pdf.setFontSize(14);
    pdf.setTextColor(0, 119, 182);
    pdf.text('6. Product Delivery & Complaints', 20, yPosition);
    yPosition += 12;
    pdf.setFontSize(11);
    pdf.setTextColor(0, 0, 0);
    pdf.text('• The Partner must check all products at the time of delivery.', 20, yPosition);
    yPosition += 6;
    pdf.text('• If any damage, defect, or issue is found, it should be reported immediately upon delivery.', 20, yPosition);
    yPosition += 6;
    pdf.text('• Aqua2Promo will replace or return the product only if the complaint is made', 20, yPosition);
    yPosition += 6;
    pdf.text('  at the time of delivery.', 20, yPosition);
    yPosition += 6;
    pdf.text('• Once the delivery is accepted, no returns or replacements will be accepted later.', 20, yPosition);
    yPosition += 15;
    
    // Payment Terms
    checkNewPage(30);
    pdf.setFontSize(14);
    pdf.setTextColor(0, 119, 182);
    pdf.text('7. Payment Terms', 20, yPosition);
    yPosition += 12;
    pdf.setFontSize(11);
    pdf.setTextColor(0, 0, 0);
    pdf.text('• The Partner may choose either of the following payment options:', 20, yPosition);
    yPosition += 6;
    pdf.text('  1. Full Payment on Delivery — Payment made at the time of receiving goods.', 20, yPosition);
    yPosition += 6;
    pdf.text('  2. Monthly Stock Option — The Partner can take 1 month\'s stock and make', 20, yPosition);
    yPosition += 6;
    pdf.text('     payments on a weekly basis in 4 equal installments.', 20, yPosition);
    yPosition += 6;
    pdf.text('• All payments must be made as per the agreed schedule. Delay in payments may', 20, yPosition);
    yPosition += 6;
    pdf.text('  result in service suspension or withholding of further orders.', 20, yPosition);
    yPosition += 15;
    
    // Limitation of Liability
    checkNewPage(25);
    pdf.setFontSize(14);
    pdf.setTextColor(0, 119, 182);
    pdf.text('8. Limitation of Liability', 20, yPosition);
    yPosition += 12;
    pdf.setFontSize(11);
    pdf.setTextColor(0, 0, 0);
    pdf.text('Aqua2Promo will not be responsible for:', 20, yPosition);
    yPosition += 6;
    pdf.text('• Any misuse, resale, or improper handling of the product.', 20, yPosition);
    yPosition += 6;
    pdf.text('• Any disputes or legal claims regarding the authenticity of the logo/trademark', 20, yPosition);
    yPosition += 6;
    pdf.text('  provided by the Partner.', 20, yPosition);
    yPosition += 6;
    pdf.text('The Partner agrees to indemnify and hold Aqua2Promo harmless from any claims', 20, yPosition);
    yPosition += 6;
    pdf.text('or damages arising from their provided branding materials.', 20, yPosition);
    yPosition += 15;
    
    // Duration of Agreement
    checkNewPage(20);
    pdf.setFontSize(14);
    pdf.setTextColor(0, 119, 182);
    pdf.text('9. Duration of Agreement', 20, yPosition);
    yPosition += 12;
    pdf.setFontSize(11);
    pdf.setTextColor(0, 0, 0);
    pdf.text('This agreement remains valid until the Partner discontinues the service as per', 20, yPosition);
    yPosition += 6;
    pdf.text('Clause 5. Both parties agree to conduct all business under this contract in', 20, yPosition);
    yPosition += 6;
    pdf.text('compliance with Indian laws and regulations.', 20, yPosition);
    yPosition += 15;
    
    // Acceptance of Terms
    checkNewPage(25);
    pdf.setFontSize(14);
    pdf.setTextColor(0, 119, 182);
    pdf.text('10. Acceptance of Terms', 20, yPosition);
    yPosition += 12;
    pdf.setFontSize(11);
    pdf.setTextColor(0, 0, 0);
    pdf.text('By checking the box below and submitting this form, the Partner confirms that:', 20, yPosition);
    yPosition += 6;
    pdf.text('• They have read and understood the terms of this e-contract.', 20, yPosition);
    yPosition += 6;
    pdf.text('• They agree to all terms and conditions stated above.', 20, yPosition);
    yPosition += 6;
    pdf.text('• The details shared are true and correct, and this digital acceptance shall be', 20, yPosition);
    yPosition += 6;
    pdf.text('  legally binding.', 20, yPosition);
    yPosition += 15;
    
    // Event-Based Orders
    checkNewPage(25);
    pdf.setFontSize(14);
    pdf.setTextColor(0, 119, 182);
    pdf.text('11. Event-Based Orders (One-Time Purchases)', 20, yPosition);
    yPosition += 12;
    pdf.setFontSize(11);
    pdf.setTextColor(0, 0, 0);
    pdf.text('• In cases where the Partner purchases bottles for a single event, occasion, or', 20, yPosition);
    yPosition += 6;
    pdf.text('  one-time use, the full payment must be made at the time of delivery.', 20, yPosition);
    yPosition += 6;
    pdf.text('• The Partner also grants Aqua2Promo the right to use the name and logo of the', 20, yPosition);
    yPosition += 6;
    pdf.text('  event for promotional and portfolio purposes.', 20, yPosition);
    yPosition += 6;
    pdf.text('• All logo and trademark usage terms stated in Clause 3 will apply equally', 20, yPosition);
    yPosition += 6;
    pdf.text('  to such event-based orders.', 20, yPosition);
    yPosition += 20;
    
    // Digital Signature Section
    checkNewPage(30);
    pdf.setFontSize(14);
    pdf.setTextColor(0, 119, 182);
    pdf.text('Digital Signature Details:', 20, yPosition);
    yPosition += 12;
    pdf.setFontSize(11);
    pdf.setTextColor(0, 0, 0);
    pdf.text(`Digital Signature Name: ${formData.digitalSignatureName}`, 20, yPosition);
    yPosition += 6;
    pdf.text(`Signature Date: ${formData.digitalSignatureDate}`, 20, yPosition);
    yPosition += 10;
    
    // Add signature if available
    if (signatureData) {
      pdf.addImage(signatureData, 'PNG', 20, yPosition, 50, 20);
      yPosition += 25;
    }
    
    return pdf;
  };

  const downloadContract = async () => {
    const pdf = await generatePDF();
    pdf.save('aqua2promo-contract.pdf');
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setShowPinDialog(true);
  };

  const verifyPinAndSubmit = async () => {
    if (pin.length !== 4) {
      toast({
        title: "Error",
        description: "Please enter a 4-digit PIN",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    setLoading(true);
    
    // Show processing animation
    toast({
      title: "Processing Contract",
      description: "Please wait while we process your contract...",
    });

    try {
      const apiUrl = import.meta.env.PROD ? 'https://aiwillendjobs.com/api' : 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/submit-contract`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          digitalSignature: signatureData,
          pin: pin,
          userId: currentUser.uid
        }),
      });

      // Check if response is ok
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        throw new Error(`Expected JSON response but got: ${text.substring(0, 100)}...`);
      }

      const data = await response.json();

      if (data.success) {
        // Success animation
        toast({
          title: "Contract Submitted Successfully!",
          description: "Your contract has been processed and emails have been sent.",
        });
        
        // Show success animation
        setTimeout(() => {
          setShowPinDialog(false);
          setPin('');
          setSubmitting(false);
          setLoading(false);
          
          // Reset form
          setFormData({
            fullName: userData?.name || '',
            designation: '',
            companyName: userData?.businessName || '',
            registeredAddress: '',
            mobileNumber: userData?.mobile || '',
            emailId: userData?.email || '',
            dateOfAgreement: new Date().toISOString().split('T')[0],
            digitalSignature: '',
            digitalSignatureName: '',
            digitalSignatureDate: new Date().toISOString().split('T')[0],
            termsAccepted: false
          });
          setSignatureData('');
        }, 2000);
      } else {
        throw new Error(data.error || 'Failed to submit contract');
      }
    } catch (error) {
      console.error('Contract submission error:', error);
      setSubmitting(false);
      setLoading(false);
      toast({
        title: "Submission Failed",
        description: error instanceof Error ? error.message : 'Failed to submit contract',
        variant: "destructive",
      });
    }
  };

  // Page loading animation
  if (pageLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 bg-primary/20 rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              AQUA2PROMO
            </h2>
            <p className="text-muted-foreground animate-pulse">
              Loading Contract Form...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 pt-16 sm:pt-20 pb-8 sm:pb-12 px-2 sm:px-4">
      <div className="container mx-auto max-w-4xl">
        <Card className="shadow-xl">
          <CardHeader className="text-center pt-6 sm:pt-8 px-4 sm:px-6">
            <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent leading-tight">
              AQUA2PROMO E-CONTRACT AGREEMENT
            </CardTitle>
            <p className="text-muted-foreground mt-2 text-xs sm:text-sm md:text-base">
              Partner Business Agreement Form
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6 sm:space-y-8 px-4 sm:px-6">
            {/* Complete Contract Terms Display */}
            <div className="bg-muted/50 p-4 sm:p-6 rounded-lg">
              <Collapsible open={isContractOpen} onOpenChange={setIsContractOpen}>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="w-full justify-between p-0 h-auto text-left">
                    <h3 className="text-base sm:text-lg font-semibold leading-tight">AQUA2PROMO E-CONTRACT AGREEMENT</h3>
                    {isContractOpen ? (
                      <ChevronUp className="h-4 w-4 flex-shrink-0 ml-2" />
                    ) : (
                      <ChevronDown className="h-4 w-4 flex-shrink-0 ml-2" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-4 sm:space-y-6 text-xs sm:text-sm mt-4">
                
                <div>
                  <h4 className="font-medium text-primary mb-2">1. Partner Information</h4>
                  <p className="text-muted-foreground">Complete your business details in the form below</p>
                </div>

                <div className="border border-muted-foreground/20 rounded-lg p-3 sm:p-4">
                  <button
                    onClick={() => toggleSection('purpose')}
                    className="flex items-center justify-between w-full text-left"
                  >
                    <h4 className="font-medium text-primary text-sm sm:text-base leading-tight">2. Purpose of the Agreement</h4>
                    {openSections.purpose ? (
                      <Minus className="h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0 ml-2" />
                    ) : (
                      <Plus className="h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0 ml-2" />
                    )}
                  </button>
                  {openSections.purpose && (
                    <p className="text-muted-foreground mt-2">This e-contract establishes the understanding between Aqua2Promo and the Partner Business for the supply of customized and white-labelled water bottles or similar promotional products under the Partner's brand name.</p>
                  )}
                </div>

                <div className="border border-muted-foreground/20 rounded-lg p-3 sm:p-4">
                  <button
                    onClick={() => toggleSection('logo')}
                    className="flex items-center justify-between w-full text-left"
                  >
                    <h4 className="font-medium text-primary text-sm sm:text-base leading-tight">3. Logo and Trademark Usage</h4>
                    {openSections.logo ? (
                      <Minus className="h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0 ml-2" />
                    ) : (
                      <Plus className="h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0 ml-2" />
                    )}
                  </button>
                  {openSections.logo && (
                    <ul className="text-muted-foreground list-disc list-inside space-y-1 mt-2">
                      <li>The Partner agrees to share their official logo, trademark, and design for product branding.</li>
                      <li>The Partner confirms that they own the full rights to the provided logo/trademark and that it does not violate any third-party rights.</li>
                      <li>Aqua2Promo is not responsible or liable for any disputes regarding trademark authenticity or ownership. The Partner will be solely responsible for such matters.</li>
                    </ul>
                  )}
                </div>

                <div className="border border-muted-foreground/20 rounded-lg p-3 sm:p-4">
                  <button
                    onClick={() => toggleSection('ordering')}
                    className="flex items-center justify-between w-full text-left"
                  >
                    <h4 className="font-medium text-primary text-sm sm:text-base leading-tight">4. Ordering & Reordering Timeline</h4>
                    {openSections.ordering ? (
                      <Minus className="h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0 ml-2" />
                    ) : (
                      <Plus className="h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0 ml-2" />
                    )}
                  </button>
                  {openSections.ordering && (
                    <ul className="text-muted-foreground list-disc list-inside space-y-1 mt-2">
                      <li>All reorders must be placed at least 1 day in advance to ensure smooth delivery and production.</li>
                      <li>Same-day or urgent orders may be accepted subject to stock and production capacity.</li>
                    </ul>
                  )}
                </div>

                <div className="border border-muted-foreground/20 rounded-lg p-3 sm:p-4">
                  <button
                    onClick={() => toggleSection('inventory')}
                    className="flex items-center justify-between w-full text-left"
                  >
                    <h4 className="font-medium text-primary text-sm sm:text-base leading-tight">5. Inventory & Discontinuation of Service</h4>
                    {openSections.inventory ? (
                      <Minus className="h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0 ml-2" />
                    ) : (
                      <Plus className="h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0 ml-2" />
                    )}
                  </button>
                  {openSections.inventory && (
                    <ul className="text-muted-foreground list-disc list-inside space-y-1 mt-2">
                      <li>Aqua2Promo maintains dedicated stock for each Partner's customized products.</li>
                      <li>If the Partner wishes to discontinue the service, they must inform Aqua2Promo at least 1 month in advance through a phone call or WhatsApp message.</li>
                      <li>During this period, the Partner agrees to clear all existing stock produced or stored under their brand in Aqua2Promo's inventory.</li>
                    </ul>
                  )}
                </div>

                <div className="border border-muted-foreground/20 rounded-lg p-3 sm:p-4">
                  <button
                    onClick={() => toggleSection('delivery')}
                    className="flex items-center justify-between w-full text-left"
                  >
                    <h4 className="font-medium text-primary text-sm sm:text-base leading-tight">6. Product Delivery & Complaints</h4>
                    {openSections.delivery ? (
                      <Minus className="h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0 ml-2" />
                    ) : (
                      <Plus className="h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0 ml-2" />
                    )}
                  </button>
                  {openSections.delivery && (
                    <ul className="text-muted-foreground list-disc list-inside space-y-1 mt-2">
                      <li>The Partner must check all products at the time of delivery.</li>
                      <li>If any damage, defect, or issue is found, it should be reported immediately upon delivery.</li>
                      <li>Aqua2Promo will replace or return the product only if the complaint is made at the time of delivery.</li>
                      <li>Once the delivery is accepted, no returns or replacements will be accepted later.</li>
                    </ul>
                  )}
                </div>

                <div className="border border-muted-foreground/20 rounded-lg p-3 sm:p-4">
                  <button
                    onClick={() => toggleSection('payment')}
                    className="flex items-center justify-between w-full text-left"
                  >
                    <h4 className="font-medium text-primary text-sm sm:text-base leading-tight">7. Payment Terms</h4>
                    {openSections.payment ? (
                      <Minus className="h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0 ml-2" />
                    ) : (
                      <Plus className="h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0 ml-2" />
                    )}
                  </button>
                  {openSections.payment && (
                    <ul className="text-muted-foreground list-disc list-inside space-y-1 mt-2">
                      <li>The Partner may choose either of the following payment options:
                        <ol className="list-decimal list-inside ml-4 mt-1 space-y-1">
                          <li>Full Payment on Delivery — Payment made at the time of receiving goods.</li>
                          <li>Monthly Stock Option — The Partner can take 1 month's stock and make payments on a weekly basis in 4 equal installments.</li>
                        </ol>
                      </li>
                      <li>All payments must be made as per the agreed schedule. Delay in payments may result in service suspension or withholding of further orders.</li>
                    </ul>
                  )}
                </div>

                <div className="border border-muted-foreground/20 rounded-lg p-3 sm:p-4">
                  <button
                    onClick={() => toggleSection('liability')}
                    className="flex items-center justify-between w-full text-left"
                  >
                    <h4 className="font-medium text-primary text-sm sm:text-base leading-tight">8. Limitation of Liability</h4>
                    {openSections.liability ? (
                      <Minus className="h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0 ml-2" />
                    ) : (
                      <Plus className="h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0 ml-2" />
                    )}
                  </button>
                  {openSections.liability && (
                    <div className="mt-2">
                      <p className="text-muted-foreground mb-2">Aqua2Promo will not be responsible for:</p>
                      <ul className="text-muted-foreground list-disc list-inside space-y-1">
                        <li>Any misuse, resale, or improper handling of the product.</li>
                        <li>Any disputes or legal claims regarding the authenticity of the logo/trademark provided by the Partner.</li>
                      </ul>
                      <p className="text-muted-foreground mt-2">The Partner agrees to indemnify and hold Aqua2Promo harmless from any claims or damages arising from their provided branding materials.</p>
                    </div>
                  )}
                </div>

                <div className="border border-muted-foreground/20 rounded-lg p-3 sm:p-4">
                  <button
                    onClick={() => toggleSection('duration')}
                    className="flex items-center justify-between w-full text-left"
                  >
                    <h4 className="font-medium text-primary text-sm sm:text-base leading-tight">9. Duration of Agreement</h4>
                    {openSections.duration ? (
                      <Minus className="h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0 ml-2" />
                    ) : (
                      <Plus className="h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0 ml-2" />
                    )}
                  </button>
                  {openSections.duration && (
                    <p className="text-muted-foreground mt-2">This agreement remains valid until the Partner discontinues the service as per Clause 5. Both parties agree to conduct all business under this contract in compliance with Indian laws and regulations.</p>
                  )}
                </div>

                <div className="border border-muted-foreground/20 rounded-lg p-3 sm:p-4">
                  <button
                    onClick={() => toggleSection('acceptance')}
                    className="flex items-center justify-between w-full text-left"
                  >
                    <h4 className="font-medium text-primary text-sm sm:text-base leading-tight">10. Acceptance of Terms</h4>
                    {openSections.acceptance ? (
                      <Minus className="h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0 ml-2" />
                    ) : (
                      <Plus className="h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0 ml-2" />
                    )}
                  </button>
                  {openSections.acceptance && (
                    <div className="mt-2">
                      <p className="text-muted-foreground mb-2">By checking the box below and submitting this form, the Partner confirms that:</p>
                      <ul className="text-muted-foreground list-disc list-inside space-y-1">
                        <li>They have read and understood the terms of this e-contract.</li>
                        <li>They agree to all terms and conditions stated above.</li>
                        <li>The details shared are true and correct, and this digital acceptance shall be legally binding.</li>
                      </ul>
                    </div>
                  )}
                </div>

                <div className="border border-muted-foreground/20 rounded-lg p-3 sm:p-4">
                  <button
                    onClick={() => toggleSection('event')}
                    className="flex items-center justify-between w-full text-left"
                  >
                    <h4 className="font-medium text-primary text-sm sm:text-base leading-tight">11. Event-Based Orders (One-Time Purchases)</h4>
                    {openSections.event ? (
                      <Minus className="h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0 ml-2" />
                    ) : (
                      <Plus className="h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0 ml-2" />
                    )}
                  </button>
                  {openSections.event && (
                    <ul className="text-muted-foreground list-disc list-inside space-y-1 mt-2">
                      <li>In cases where the Partner purchases bottles for a single event, occasion, or one-time use, the full payment must be made at the time of delivery.</li>
                      <li>The Partner also grants Aqua2Promo the right to use the name and logo of the event for promotional and portfolio purposes.</li>
                      <li>All logo and trademark usage terms stated in Clause 3 will apply equally to such event-based orders.</li>
                    </ul>
                  )}
                </div>
                </CollapsibleContent>
              </Collapsible>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="designation">Designation *</Label>
                <Input
                  id="designation"
                  name="designation"
                  value={formData.designation}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="companyName">Company/Café/Restaurant/Event/Shop Name *</Label>
                <Input
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="mobileNumber">Mobile Number *</Label>
                <Input
                  id="mobileNumber"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="emailId">Email ID *</Label>
                <Input
                  id="emailId"
                  name="emailId"
                  type="email"
                  value={formData.emailId}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="dateOfAgreement">Date of Agreement *</Label>
                <Input
                  id="dateOfAgreement"
                  name="dateOfAgreement"
                  type="date"
                  value={formData.dateOfAgreement}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="registeredAddress">Registered Address *</Label>
              <Textarea
                id="registeredAddress"
                name="registeredAddress"
                value={formData.registeredAddress}
                onChange={handleInputChange}
                required
                rows={3}
              />
            </div>

            {/* Digital Signature Section */}
            <div className="space-y-3 sm:space-y-4 md:space-y-6">
              <h3 className="text-base sm:text-lg font-semibold">Digital Signature</h3>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4">
                <Button
                  variant={signatureMode === 'draw' ? 'default' : 'outline'}
                  onClick={() => setSignatureMode('draw')}
                  className="flex items-center gap-2"
                >
                  <PenTool className="h-4 w-4" />
                  Draw Signature
                </Button>
                <Button
                  variant={signatureMode === 'upload' ? 'default' : 'outline'}
                  onClick={() => setSignatureMode('upload')}
                  className="flex items-center gap-2"
                >
                  <Upload className="h-4 w-4" />
                  Upload Signature
                </Button>
              </div>

              {signatureMode === 'draw' && (
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-2 sm:p-4">
                    <div className="w-full flex justify-center">
                      <canvas
                        ref={canvasRef}
                        width={400}
                        height={150}
                        className="border border-muted-foreground/25 rounded cursor-crosshair"
                        style={{ maxWidth: '100%', height: 'auto' }}
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={stopDrawing}
                        onMouseLeave={stopDrawing}
                        onTouchStart={(e) => {
                          e.preventDefault();
                          const touch = e.touches[0];
                          const rect = canvasRef.current?.getBoundingClientRect();
                          if (!rect) return;
                          
                          const mouseEvent = {
                            clientX: touch.clientX,
                            clientY: touch.clientY,
                            preventDefault: () => {},
                            stopPropagation: () => {}
                          } as React.MouseEvent<HTMLCanvasElement>;
                          
                          startDrawing(mouseEvent);
                        }}
                        onTouchMove={(e) => {
                          e.preventDefault();
                          const touch = e.touches[0];
                          const rect = canvasRef.current?.getBoundingClientRect();
                          if (!rect) return;
                          
                          const mouseEvent = {
                            clientX: touch.clientX,
                            clientY: touch.clientY,
                            preventDefault: () => {},
                            stopPropagation: () => {}
                          } as React.MouseEvent<HTMLCanvasElement>;
                          
                          draw(mouseEvent);
                        }}
                        onTouchEnd={(e) => {
                          e.preventDefault();
                          stopDrawing();
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button variant="outline" onClick={clearSignature}>
                      Clear
                    </Button>
                  </div>
                </div>
              )}

              {signatureMode === 'upload' && (
                <div className="space-y-4">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <Button
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2"
                  >
                    <Upload className="h-4 w-4" />
                    Choose File
                  </Button>
                  {signatureData && (
                    <div className="mt-4">
                      <img src={signatureData} alt="Signature" className="max-w-xs border rounded" />
                    </div>
                  )}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <Label htmlFor="digitalSignatureName">Digital Signature Name *</Label>
                  <Input
                    id="digitalSignatureName"
                    name="digitalSignatureName"
                    value={formData.digitalSignatureName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="digitalSignatureDate">Signature Date *</Label>
                  <Input
                    id="digitalSignatureDate"
                    name="digitalSignatureDate"
                    type="date"
                    value={formData.digitalSignatureDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Terms Acceptance */}
            <div className="flex items-start space-x-2">
              <Checkbox
                id="termsAccepted"
                checked={formData.termsAccepted}
                onCheckedChange={handleCheckboxChange}
              />
              <Label htmlFor="termsAccepted" className="text-sm">
                I Agree to the Terms and Conditions of Aqua2Promo E-Contract
              </Label>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <Button
                variant="outline"
                onClick={downloadContract}
                className="flex items-center gap-2"
                disabled={submitting}
              >
                <Download className="h-4 w-4" />
                Download Contract PDF
              </Button>
              
              <Button
                onClick={handleSubmit}
                disabled={!formData.termsAccepted || !signatureData || submitting}
                className="flex items-center gap-2"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <FileText className="h-4 w-4" />
                    Submit Contract
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* PIN Verification Dialog */}
        <Dialog open={showPinDialog} onOpenChange={setShowPinDialog}>
          <DialogContent className="sm:max-w-md" aria-describedby="pin-description">
            <DialogHeader>
              <DialogTitle>Verify PIN</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground" id="pin-description">
                Please enter the 4-digit PIN to submit your contract.
              </p>
              <Input
                type="password"
                placeholder="Enter 4-digit PIN"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                maxLength={4}
                className="text-center text-lg tracking-widest"
                aria-describedby="pin-description"
              />
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowPinDialog(false);
                    setPin('');
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={verifyPinAndSubmit}
                  disabled={pin.length !== 4 || loading}
                  className="flex-1"
                >
                  {loading ? 'Submitting...' : 'Submit'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Contract;