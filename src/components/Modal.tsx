// src/components/Modal.tsx
'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { IoClose } from 'react-icons/io5';

// تعریف پراپ‌های کامپوننت
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  const container = useRef(null);

  // استفاده از useGSAP برای مدیریت انیمیشن‌های باز و بسته شدن
  useGSAP(() => {
    if (isOpen) {
      // انیمیشن باز شدن
      gsap.to(container.current, {
        autoAlpha: 1, // opacity: 1 and visibility: visible
        scale: 1,
        duration: 0.5,
        ease: 'expo.out',
      });
    } else {
      // انیمیشن بسته شدن
      gsap.to(container.current, {
        autoAlpha: 0, // opacity: 0 and visibility: hidden
        scale: 0.95,
        duration: 0.3,
        ease: 'expo.in',
      });
    }
  }, { dependencies: [isOpen] }); // این انیمیشن با تغییر isOpen اجرا می‌شود

  // جلوگیری از نمایش در DOM اگر باز نیست
  if (!isOpen) return null;

  return (
    <div 
      ref={container}
      className="fixed inset-0 z-50 flex items-center justify-center bg-brand-navy/80 backdrop-blur-sm invisible opacity-0"
    >
      {/* دکمه بستن (آیکون ضربدر) */}
      <button 
        onClick={onClose} 
        className="absolute top-8 right-8 z-10 text-brand-white hover:text-brand-gold transition-colors"
      >
        <IoClose size={40} />
      </button>

      {/* محتوای مودال */}
      <div className="w-full h-full flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}