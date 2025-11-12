import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import type { AuthContextType } from '../types';

interface LogoProps {
  className?: string;
}
const Logo: React.FC<LogoProps> = ({ className }) => (
  <a href="#" className={`flex items-center space-x-2 ${className}`}>
    <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M 6 12 C 6 8, 10 8, 12 12 C 14 16, 18 16, 18 12 C 18 8, 14 8, 12 12 C 10 16, 6 16, 6 12 Z" />
    </svg>
    <span className="font-serif text-xl sm:text-2xl font-bold">F Standard</span>
  </a>
);

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { user, logout } = useContext(AuthContext) as AuthContextType;

  const navLinks = ["Rules", "Pricing", "FAQ"];

  const commonNavLinks = navLinks.map(link => (
    <a href={`#${link.toLowerCase()}`} key={link} className="block md:inline-block px-3 py-2 rounded-md text-base md:text-sm font-medium hover:bg-white/10">{link}</a>
  ));

  const authLinks = (
    <>
      {user ? (
        <>
          <a href={`#/dashboard/${user.role}`} className="block md:inline-block px-3 py-2 rounded-md text-base md:text-sm font-medium hover:bg-white/10">Dashboard</a>
          <button onClick={logout} className="w-full text-left md:w-auto md:text-center block md:inline-block px-3 py-2 rounded-md text-base md:text-sm font-medium hover:bg-white/10">Logout</button>
        </>
      ) : (
        <>
          <a href="#/signin" className="block md:inline-block px-3 py-2 rounded-md text-base md:text-sm font-medium hover:bg-white/10">Sign In</a>
          <a href="#/signup" className="ml-0 md:ml-4 mt-2 md:mt-0 block md:inline-block px-5 py-2 bg-white text-primary font-bold rounded-2xl shadow-md hover:bg-background transition-colors text-center">Sign Up</a>
        </>
      )}
    </>
  );

  return (
    <nav className="bg-primary text-white backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
             <Logo className="text-white" />
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-2">
              {commonNavLinks}
              <div className='ml-4 flex items-baseline space-x-2'>
                {authLinks}
              </div>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} type="button" className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-white/10 focus:outline-none">
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {commonNavLinks}
            <div className="pt-2 border-t border-white/20">
                {authLinks}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};


export const Footer: React.FC = () => {
    return (
        <footer className="bg-dark-slate text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <Logo className="text-white" />
                        <p className="mt-4 text-secondary-text text-sm">India's first institutional-grade dual-asset proprietary trading firm.</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Quick Links</h3>
                        <ul className="mt-4 space-y-2 text-secondary-text">
                            <li><a href="#rules" className="hover:text-hover-blue">Rules</a></li>
                            <li><a href="#pricing" className="hover:text-hover-blue">Pricing</a></li>
                            <li><a href="#faq" className="hover:text-hover-blue">FAQ</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Legal</h3>
                        <ul className="mt-4 space-y-2 text-secondary-text">
                            <li><a href="#" className="hover:text-hover-blue">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-hover-blue">Privacy Policy</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Connect</h3>
                        <div className="flex mt-4 space-x-4">
                            {/* Social media icons */}
                        </div>
                        <p className="mt-4 text-secondary-text text-sm">contact@fstandard.in</p>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-border-gray text-center text-secondary-text text-sm">
                    <p>&copy; {new Date().getFullYear()} FStandard. All rights reserved.</p>
                    <p className="mt-2">FStandard provides a simulated trading environment. All traders are independent contractors.</p>
                </div>
            </div>
        </footer>
    );
};