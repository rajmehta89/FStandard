import React, { useState, useContext } from 'react';
import { Card, Button, Input } from './ui';
import { AuthContext } from '../contexts/AuthContext';
import type { AuthContextType } from '../types';

type AuthMethod = 'email' | 'phone';

const SignInPage: React.FC = () => {
  const [authMethod, setAuthMethod] = useState<AuthMethod>('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useContext(AuthContext) as AuthContextType;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
        if (authMethod === 'email') {
            await login({ email, password });
        } else {
            await login({ phone, otp });
        }
    } catch (err: any) {
        setError(err.message || 'Login failed. Please try again.');
    } finally {
        setLoading(false);
    }
  };

  const handleSendOtp = (e: React.MouseEvent) => {
    e.preventDefault();
    if (phone.length >= 10) {
      setOtpSent(true);
      setError('');
    } else {
      setError('Please enter a valid phone number.');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <h2 className="font-serif text-center text-4xl font-bold text-dark-slate mb-8">
          Sign In
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

          <form onSubmit={handleLogin} className="space-y-6">
            {error && <p className="text-danger bg-danger/10 p-3 rounded-lg text-center">{error}</p>}
            
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
                  <Button variant="outline" onClick={handleSendOtp} className="w-full">Send OTP</Button>
                )}
              </>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>

          <p className="text-center text-body-text mt-6">
            Don't have an account? <a href="#/signup" className="font-semibold text-primary hover:text-hover-blue hover:underline">Sign up</a>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default SignInPage;
