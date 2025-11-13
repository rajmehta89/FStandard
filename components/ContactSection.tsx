import React, { useState, useContext } from 'react';
import { Button, Toast } from './ui';
import { Mail, Phone, MessageCircle } from 'lucide-react';
import { AuthContext } from '../contexts/AuthContext';

// API Base URL - Update this with your actual backend URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const ContactSection: React.FC = () => {
  const { user, getAccessToken } = useContext(AuthContext) || {};
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNo: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [messageCount, setMessageCount] = useState(0);
  const [showToast, setShowToast] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (name === 'message') {
      setMessageCount(value.length);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if user is logged in
    if (!user?.id) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Get access token from Supabase session
      const accessToken = getAccessToken?.();
      
      if (!accessToken) {
        throw new Error('User not authenticated. Please sign in again.');
      }

      // Prepare request payload (NO userId in body - backend extracts from token)
      const payload = {
        name: formData.name,
        email: formData.email,
        phoneNo: formData.phoneNo,
        message: formData.message,
        // userId is NOT sent - backend extracts from JWT token
      };

      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`, // Send JWT token
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phoneNo: '', message: '' });
      setMessageCount(0);
      setShowToast(true);
    } catch (error: any) {
      console.error('Error submitting contact form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      id="contact"
      className="contact-section-container"
      style={{
        background: '#F8FAFC',
        padding: '100px 60px',
        borderTop: '1px solid #E2E8F0'
      }}
    >
      <style>{`
        @media (max-width: 1023px) {
          .contact-section-container {
            padding: 80px 40px !important;
          }
        }
        @media (max-width: 639px) {
          .contact-section-container {
            padding: 60px 24px !important;
          }
        }
        .contact-form {
          transition: all 0.3s ease;
        }
        .contact-form input:focus,
        .contact-form textarea:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(0, 52, 89, 0.1);
        }
        .contact-info-card {
          background: #FFFFFF;
          border-radius: 16px;
          padding: 32px;
          box-shadow: 0 4px 20px rgba(0, 52, 89, 0.06);
          border: 1px solid rgba(226, 232, 240, 0.8);
          transition: all 0.3s ease;
        }
        .contact-info-card:hover {
          box-shadow: 0 8px 32px rgba(0, 52, 89, 0.1);
          transform: translateY(-2px);
        }
        .contact-form-card {
          background: #FFFFFF;
          border-radius: 16px;
          padding: 40px;
          box-shadow: 0 4px 24px rgba(0, 52, 89, 0.08);
          border: 1px solid rgba(226, 232, 240, 0.8);
        }
        .submit-status {
          margin-top: 16px;
          padding: 12px 16px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
        }
        .submit-status.success {
          background: rgba(16, 185, 129, 0.1);
          color: #10B981;
          border: 1px solid rgba(16, 185, 129, 0.2);
        }
        .submit-status.error {
          background: rgba(239, 68, 68, 0.1);
          color: #EF4444;
          border: 1px solid rgba(239, 68, 68, 0.2);
        }
        .contact-link {
          color: #003459;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s ease;
        }
        .contact-link:hover {
          color: #0066A1;
          text-decoration: underline;
        }
      `}</style>
      <div 
        className="mx-auto"
        style={{
          maxWidth: '1280px',
          margin: '0 auto'
        }}
      >
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-dark-slate mb-3">
            Contact Us
          </h2>
          <p className="text-lg text-body-text max-w-2xl mx-auto">
            Email, call, or complete the form to learn how FStandard can help you start your trading journey.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <div>
                  <p className="text-sm text-body-text mb-1">Email</p>
                  <a href="mailto:info@fstandard.com" className="contact-link">
                    info@fstandard.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <div>
                  <p className="text-sm text-body-text mb-1">Phone</p>
                  <a href="tel:+911234567890" className="contact-link">
                    +91 123 456 7890
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5 text-primary flex-shrink-0" />
                <div>
                  <p className="text-sm text-body-text mb-1">Support</p>
                  <a href="#support" className="contact-link">
                    Customer Support
                  </a>
                </div>
              </div>
            </div>

            {/* Information Cards */}
            <div className="space-y-6 pt-4">
              {/* Customer Support Card */}
              <div className="contact-info-card">
                <h3 className="text-xl font-bold text-dark-slate mb-2">
                  Customer Support
                </h3>
                <p className="text-body-text leading-relaxed">
                  Our support team is available around the clock to address any concerns or queries you may have.
                </p>
              </div>

              {/* Feedback and Suggestions Card */}
              <div className="contact-info-card">
                <h3 className="text-xl font-bold text-dark-slate mb-2">
                  Feedback and Suggestions
                </h3>
                <p className="text-body-text leading-relaxed">
                  We value your feedback and are continuously working to improve FStandard. Your input is crucial in shaping the future of our platform.
                </p>
              </div>

              {/* Media Inquiries Card */}
              <div className="contact-info-card">
                <h3 className="text-xl font-bold text-dark-slate mb-2">
                  Media Inquiries
                </h3>
                <p className="text-body-text leading-relaxed">
                  For media-related questions or press inquiries, please contact us at{' '}
                  <a href="mailto:media@fstandard.com" className="contact-link">
                    media@fstandard.com
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="contact-form-card">
            <div className="mb-8">
              <h3 className="font-serif text-3xl font-bold text-dark-slate mb-2">
                Get in Touch
              </h3>
              <p className="text-body-text">
                You can reach us anytime
              </p>
            </div>

            {!user?.id ? (
              <div className="text-center py-8">
                <div className="rounded-lg p-6 mb-4" style={{ background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                  <p className="text-dark-slate font-semibold mb-2">
                    Sign in required
                  </p>
                  <p className="text-body-text text-sm mb-4">
                    Please sign in to send us a message through the contact form.
                  </p>
                  <a href="#/signin">
                    <Button variant="primary" className="w-full sm:w-auto">
                      Sign In
                    </Button>
                  </a>
                </div>
                <p className="text-sm text-body-text">
                  Don't have an account?{' '}
                  <a href="#/signup" className="contact-link">
                    Sign up
                  </a>
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
              <div className="space-y-5">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-dark-slate mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-border-gray rounded-lg focus:ring-primary focus:border-primary transition-colors bg-white"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-dark-slate mb-1">
                    Your email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-body-text" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-3 py-3 border border-border-gray rounded-lg focus:ring-primary focus:border-primary transition-colors bg-white"
                      placeholder="john.doe@example.com"
                    />
                  </div>
                </div>

                {/* Phone No Field */}
                <div>
                  <label htmlFor="phoneNo" className="block text-sm font-medium text-dark-slate mb-1">
                    Phone No
                  </label>
                  <div className="flex gap-2">
                    <select
                      className="w-24 p-3 border border-border-gray rounded-lg focus:ring-primary focus:border-primary transition-colors bg-white"
                      defaultValue="+91"
                    >
                      <option value="+91">+91</option>
                      <option value="+1">+1</option>
                      <option value="+44">+44</option>
                    </select>
                    <input
                      type="tel"
                      id="phoneNo"
                      name="phoneNo"
                      value={formData.phoneNo}
                      onChange={handleChange}
                      required
                      className="flex-1 p-3 border border-border-gray rounded-lg focus:ring-primary focus:border-primary transition-colors bg-white"
                      placeholder="123 456 7890"
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-dark-slate mb-1">
                    How can we help?
                  </label>
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      maxLength={500}
                      className="w-full p-3 border border-border-gray rounded-lg focus:ring-primary focus:border-primary transition-colors resize-vertical min-h-[140px] bg-white pr-16"
                      placeholder="Enter your message here..."
                    />
                    <span className="absolute bottom-3 right-3 text-xs text-body-text">
                      {messageCount}/500
                    </span>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <Button 
                    type="submit" 
                    variant="primary" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Submit'}
                  </Button>
                </div>

                {/* Terms and Privacy */}
                <p className="text-xs text-body-text text-center">
                  By contacting us, you agree to our{' '}
                  <a href="#terms" className="contact-link text-xs">Terms of service</a>
                  {' '}and{' '}
                  <a href="#privacy" className="contact-link text-xs">Privacy Policy</a>
                  .
                </p>

                {/* Status Message */}
                {submitStatus === 'success' && (
                  <div className="submit-status success">
                    ✓ Thank you! Your message has been sent successfully.
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="submit-status error">
                    ✗ {!user?.id 
                      ? 'Please sign in to send a message.' 
                      : 'Something went wrong. Please try again.'}
                  </div>
                )}
              </div>
            </form>
            )}
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      <Toast
        message="✓ Thank you! Your message has been sent successfully."
        isVisible={showToast}
        onClose={() => setShowToast(false)}
        duration={5000}
      />
    </div>
  );
};

export default ContactSection;
