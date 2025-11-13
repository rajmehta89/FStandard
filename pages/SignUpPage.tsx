import React, { useState, useContext } from 'react';
import { Card, Button, Input } from '../components/ui';
import { AuthContext } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import type { AuthContextType } from '../types';

type AuthMethod = 'email' | 'phone';

const SignUpPage: React.FC = () => {
  const [authMethod, setAuthMethod] = useState<AuthMethod>('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signup } = useContext(AuthContext) as AuthContextType;
  const { showToast } = useToast();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
        if (authMethod === 'email') {
            await signup({ email, password });
        } else {
            await signup({ phone, otp });
        }
    } catch (err: any) {
        // Check if this is an email confirmation requirement (not an error)
        if (err.isEmailConfirmation || err.message === 'EMAIL_CONFIRMATION_REQUIRED') {
          setError(''); // Clear any error message
          // Clear the form
          setEmail('');
          setPassword('');
          // Show persistent toast that will appear on login page
          const toastMessage = authMethod === 'email' 
            ? "Please check your email to verify your account. We've sent a confirmation link to your email address."
            : "OTP sent to your phone. Please enter the code to complete signup.";
          showToast(toastMessage, 8000);
          // Redirect to login page immediately
          window.location.hash = '#/signin';
        } else {
          setError(err.message || 'Sign up failed. Please try again.');
        }
    } finally {
        setLoading(false);
    }
  };

  const handleSendOtp = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (phone.length < 10) {
      setError('Please enter a valid phone number.');
      return;
    }
    
    setError('');
    setLoading(true);
    try {
      // Send OTP via signup (without OTP parameter)
      await signup({ phone });
      setOtpSent(true);
      showToast("OTP sent to your phone. Please enter the code to complete signup.", 6000);
    } catch (err: any) {
      // Check if OTP was sent (not an error)
      if (err.isOtpSent || err.message === 'OTP_SENT' || err.message?.includes('OTP sent')) {
        setOtpSent(true);
        showToast("OTP sent to your phone. Please enter the code to complete signup.", 6000);
        setError('');
      } else {
        setError(err.message || 'Failed to send OTP. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <h2 className="font-serif text-center text-4xl font-bold text-dark-slate mb-8">
          Create Account
        </h2>
        <Card>
          <div className="flex border-b mb-6">
            <button
              onClick={() => setAuthMethod('email')}
              className={`flex-1 py-3 text-center font-semibold transition-colors ${authMethod === 'email' ? 'text-primary border-b-2 border-primary' : 'text-body-text'}`}
            >
              Email & Password
            </button>
            <button
              onClick={() => setAuthMethod('phone')}
              className={`flex-1 py-3 text-center font-semibold transition-colors ${authMethod === 'phone' ? 'text-primary border-b-2 border-primary' : 'text-body-text'}`}
            >
              Phone & OTP
            </button>
          </div>

          <form onSubmit={handleSignUp} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-center text-sm font-medium">
                {error}
              </div>
            )}
            
            {authMethod === 'email' ? (
              <>
                <Input id="email" label="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <Input id="password" label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </>
            ) : (
              <>
                <Input id="phone" label="Phone Number" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required disabled={otpSent} />
                {otpSent && (
                  <Input id="otp" label="OTP" type="text" value={otp} onChange={(e) => setOtp(e.target.value)} required placeholder="Enter '123456'"/>
                )}
                {!otpSent && (
                  <Button variant="outline" onClick={handleSendOtp} className="w-full" disabled={loading}>
                    {loading ? 'Sending OTP...' : 'Send OTP'}
                  </Button>
                )}
              </>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Creating Account...' : 'Sign Up'}
            </Button>
          </form>

          <p className="text-center text-body-text mt-6">
            Already have an account? <a href="#/signin" className="font-semibold text-primary hover:text-hover-blue hover:underline">Sign in</a>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default SignUpPage;
