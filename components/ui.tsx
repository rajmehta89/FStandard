import React, { useState } from 'react';
import type { FaqItem } from '../types';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
}

export const Button: React.FC<ButtonProps> = ({ children, className, variant = 'primary', ...props }) => {
  const baseClasses = 'px-6 py-3 font-semibold rounded-2xl transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const getVariantStyles = () => {
    if (variant === 'primary') {
      return {
        className: 'bg-primary text-white hover:bg-[#0066A1] focus:ring-primary hover:-translate-y-0.5',
        style: {
          boxShadow: '0 4px 14px rgba(0, 52, 89, 0.25)',
        },
        hoverStyle: {
          boxShadow: '0 6px 20px rgba(0, 52, 89, 0.35)',
        }
      };
    }
    if (variant === 'secondary') {
      return {
        className: 'bg-dark-slate text-white hover:bg-hover-blue focus:ring-dark-slate',
        style: {},
        hoverStyle: {}
      };
    }
    if (variant === 'outline') {
      return {
        className: 'bg-transparent border-2 border-primary text-primary hover:bg-[rgba(0,52,89,0.05)] focus:ring-primary',
        style: {},
        hoverStyle: {}
      };
    }
    return {
      className: 'bg-danger text-white hover:opacity-90 focus:ring-danger',
      style: {},
      hoverStyle: {}
    };
  };

  const variantStyles = getVariantStyles();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button 
      className={`${baseClasses} ${variantStyles.className} ${className}`}
      style={isHovered && variant === 'primary' ? variantStyles.hoverStyle : variantStyles.style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {children}
    </button>
  );
};

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div className={`bg-surface border border-border-gray rounded-2xl shadow-lg p-6 md:p-8 hover:shadow-xl transition-shadow ${className}`}>
      {children}
    </div>
  );
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input: React.FC<InputProps> = ({ label, id, className, ...props }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-dark-slate mb-1">
        {label}
      </label>
      <input
        id={id}
        className={`w-full p-3 border border-border-gray rounded-lg focus:ring-primary focus:border-primary transition-colors ${className}`}
        {...props}
      />
    </div>
  );
};

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  children: React.ReactNode;
}

export const Select: React.FC<SelectProps> = ({ label, id, className, children, ...props }) => {
  return (
    <div>
       <label htmlFor={id} className="block text-sm font-medium text-dark-slate mb-1">
        {label}
      </label>
      <select
        id={id}
        className={`w-full p-3 border border-border-gray rounded-lg focus:ring-primary focus:border-primary transition-colors bg-white ${className}`}
        {...props}
      >
        {children}
      </select>
    </div>
  )
}


interface AccordionProps {
  items: FaqItem[];
}

export const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="border border-border-gray rounded-2xl overflow-hidden">
          <button
            onClick={() => toggleItem(index)}
            className="w-full flex justify-between items-center text-left p-6 bg-white hover:bg-background transition-colors"
          >
            <span className="font-semibold text-base sm:text-lg text-dark-slate">{item.question}</span>
            <span className={`transform transition-transform duration-300 ${openIndex === index ? 'rotate-180' : 'rotate-0'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </span>
          </button>
          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden ${openIndex === index ? 'max-h-96' : 'max-h-0'}`}
          >
            <div className="p-6 pt-0 text-body-text">
              <p>{item.answer}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
            onClick={onClose}
            aria-modal="true"
            role="dialog"
        >
            <div
                className="bg-white rounded-2xl shadow-xl w-full max-w-md m-4"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-6 border-b">
                    <h3 className="text-2xl font-serif font-bold">{title}</h3>
                    <button onClick={onClose} className="text-body-text hover:text-dark-slate">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    );
};