import React, { createContext, useState, useEffect } from 'react';
import type { User, AuthContextType } from '../types';
import { supabase } from '../lib/supabase';
import type { Session } from '@supabase/supabase-js';

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize: Check for existing session and listen for auth changes
  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || undefined,
          phone: session.user.phone || undefined,
          role: (session.user.user_metadata?.role as 'trader' | 'admin') || 'trader',
          status: 'active',
          name: session.user.user_metadata?.name || session.user.email?.split('@')[0],
        });
      }
      setLoading(false);
    });

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || undefined,
          phone: session.user.phone || undefined,
          role: (session.user.user_metadata?.role as 'trader' | 'admin') || 'trader',
          status: 'active',
          name: session.user.user_metadata?.name || session.user.email?.split('@')[0],
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Login with Email/Password
  const login = async (credentials: { 
    email?: string; 
    password?: string; 
    phone?: string; 
    otp?: string; 
  }): Promise<void> => {
    // Note: We don't set global loading here - buttons handle their own loading states
    
    try {
      let response;
      
      if (credentials.email && credentials.password) {
        // Email/Password login
        response = await supabase.auth.signInWithPassword({
          email: credentials.email,
          password: credentials.password,
        });
      } else if (credentials.phone) {
        // Phone/OTP login
        if (credentials.otp) {
          // Verify OTP
          response = await supabase.auth.verifyOtp({
            phone: credentials.phone,
            token: credentials.otp,
            type: 'sms',
          });
        } else {
          // Send OTP
          response = await supabase.auth.signInWithOtp({
            phone: credentials.phone,
          });
          
          if (response.error) {
            throw new Error(response.error.message);
          }
          
          // OTP sent, return early (user needs to enter OTP)
          const otpSentError = new Error('OTP_SENT');
          (otpSentError as any).isOtpSent = true;
          throw otpSentError;
        }
      } else {
        throw new Error('Invalid credentials provided');
      }

      if (response.error) {
        // Provide user-friendly error messages
        let errorMessage = response.error.message || 'Login failed. Please try again.';
        
        // Map Supabase error messages to user-friendly ones
        if (errorMessage.includes('Invalid login credentials') || 
            errorMessage.includes('Invalid password') ||
            errorMessage.includes('invalid_credentials') ||
            errorMessage.includes('Email rate limit exceeded') ||
            errorMessage.toLowerCase().includes('invalid')) {
          errorMessage = 'Invalid email or password. Please check your credentials and try again.';
        } else if (errorMessage.includes('Email not confirmed') || errorMessage.includes('email_not_confirmed')) {
          errorMessage = 'Please verify your email address before signing in. Check your inbox for the confirmation link.';
        } else if (errorMessage.includes('User not found') || errorMessage.includes('user_not_found')) {
          errorMessage = 'No account found with this email. Please sign up first.';
        } else if (errorMessage.includes('Too many requests') || errorMessage.includes('rate_limit')) {
          errorMessage = 'Too many login attempts. Please wait a few minutes and try again.';
        }
        
        const loginError = new Error(errorMessage);
        console.error('Supabase login error:', response.error);
        throw loginError;
      }

      if (response.data.session) {
        setSession(response.data.session);
        const authUser = response.data.user!;
        setUser({
          id: authUser.id,
          email: authUser.email || undefined,
          phone: authUser.phone || undefined,
          role: (authUser.user_metadata?.role as 'trader' | 'admin') || 'trader',
          status: 'active',
          name: authUser.user_metadata?.name || authUser.email?.split('@')[0],
        });
        
        // Delay redirect slightly to allow success toast to be visible
        setTimeout(() => {
          window.location.hash = `#/dashboard/trader`;
        }, 500);
      }
    } catch (error: any) {
      console.error('Login error:', error);
      
      // Preserve OTP sent flag
      if (error.isOtpSent) {
        throw error;
      }
      
      // Ensure we always throw an Error object with a message
      const errorMessage = error?.message || error?.toString() || 'Login failed. Please try again.';
      throw new Error(errorMessage);
    }
  };

  // Signup with Email/Password
  const signup = async (details: { 
    email?: string; 
    password?: string; 
    phone?: string; 
    otp?: string; 
    name?: string;
  }): Promise<void> => {
    // Note: We don't set global loading here - buttons handle their own loading states
    
    try {
      let response;
      
      if (details.email && details.password) {
        // Email/Password signup
        response = await supabase.auth.signUp({
          email: details.email,
          password: details.password,
          options: {
            data: {
              name: details.name || details.email.split('@')[0],
            },
          },
        });
      } else if (details.phone) {
        // Phone signup - send OTP
        response = await supabase.auth.signInWithOtp({
          phone: details.phone,
        });
        
        if (response.error) {
          throw new Error(response.error.message);
        }
        
        // OTP sent, return early (user needs to enter OTP)
        const otpSentError = new Error('OTP_SENT');
        (otpSentError as any).isOtpSent = true;
        throw otpSentError;
      } else {
        throw new Error('Invalid signup details');
      }

      if (response.error) {
        // Provide more helpful error messages
        let errorMessage = response.error.message;
        
        if (errorMessage.includes('Database error') || errorMessage.includes('500')) {
          errorMessage = 'Database configuration error. Please contact support or check Supabase setup.';
        } else if (errorMessage.includes('User already registered') || errorMessage.includes('already registered')) {
          errorMessage = 'An account with this email already exists. Please sign in instead.';
        } else if (errorMessage.includes('Password') && errorMessage.includes('weak')) {
          errorMessage = 'Password is too weak. Please use a stronger password (at least 6 characters).';
        } else if (errorMessage.includes('Password')) {
          errorMessage = 'Password does not meet requirements. Please use a stronger password.';
        } else if (errorMessage.includes('email')) {
          errorMessage = 'Invalid email address. Please check and try again.';
        }
        
        throw new Error(errorMessage);
      }

      if (response.data.session) {
        setSession(response.data.session);
        const authUser = response.data.user!;
        setUser({
          id: authUser.id,
          email: authUser.email || undefined,
          phone: authUser.phone || undefined,
          role: 'trader',
          status: 'active',
          name: authUser.user_metadata?.name || authUser.email?.split('@')[0],
        });
        
        window.location.hash = '#/dashboard/trader';
      } else if (response.data.user) {
        // Email confirmation required - this is not an error, it's expected behavior
        // Return a special indicator that email confirmation is needed
        const emailConfirmationError = new Error('EMAIL_CONFIRMATION_REQUIRED');
        (emailConfirmationError as any).isEmailConfirmation = true;
        (emailConfirmationError as any).email = response.data.user.email;
        throw emailConfirmationError;
      }
    } catch (error: any) {
      console.error('Signup error:', error);
      
      // Preserve special flags when re-throwing
      if (error.isEmailConfirmation || error.isOtpSent) {
        throw error; // Re-throw as-is to preserve the flag
      }
      
      // Don't expose internal error details to users
      if (error.message && !error.message.includes('Database configuration')) {
        throw error;
      }
      
      throw new Error(error.message || 'Signup failed. Please try again.');
    }
  };

  // Logout
  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    window.location.hash = '#/signin';
  };

  // Get access token for API calls
  const getAccessToken = (): string | null => {
    return session?.access_token || null;
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      signup, 
      logout,
      getAccessToken,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
