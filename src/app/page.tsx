// src/app/page.tsx
'use client';

import { useState, useRef, ReactNode } from 'react';
import { FaLock, FaUserPlus, FaArrowRight } from 'react-icons/fa';
import { IoClose, IoArrowBack } from 'react-icons/io5';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './HomePage.module.css';

type View = 'initial' | 'login' | 'signup' | 'confirm_experience' | 'enter_name';

export default function HomePage() {
  const [view, setView] = useState<View>('initial');
  
  // Refs for our initial buttons and the modal
  const signupButtonRef = useRef<HTMLDivElement>(null);
  const loginButtonRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    // This is the animation logic
    const animate = (originRef: React.RefObject<HTMLDivElement>) => {
      if (!originRef.current || !modalRef.current || !modalContentRef.current) return;
      
      const originRect = originRef.current.getBoundingClientRect();
      
      // Animation timeline
      const tl = gsap.timeline();
      
      tl.set(modalRef.current, {
          top: originRect.top,
          left: originRect.left,
          width: originRect.width,
          height: originRect.height,
          borderRadius: "12px",
        })
        .to(modalRef.current, {
          duration: 0.7,
          autoAlpha: 1, // Fades in and becomes visible
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          borderRadius: "0px",
          ease: 'expo.inOut',
        })
        .to(modalContentRef.current, {
            duration: 0.5,
            autoAlpha: 1, // Fade in the content AFTER the modal expands
        }, "-=0.2"); // Start this animation 0.2s before the previous one ends
    };
    
    // Trigger animations based on view change
    if (view === 'signup') animate(signupButtonRef);
    if (view === 'login') animate(loginButtonRef);

  }, { dependencies: [view] });

  const handleClose = () => {
    // Animation to close the modal
    gsap.to(modalContentRef.current, { duration: 0.3, autoAlpha: 0, ease: 'power2.in' });
    gsap.to(modalRef.current, { 
      duration: 0.5, 
      autoAlpha: 0, 
      ease: 'expo.in',
      onComplete: () => setView('initial') // Set view to initial after animation completes
    });
  };

  const getPreviousView = () => {
    // ... same as before
  };
  
  return (
    <main className={styles.container}>
      {/* --- Initial View --- */}
      <div className={styles.initialView}>
        <div ref={signupButtonRef} onClick={() => setView('signup')} className={styles.rectButton}>
          <FaUserPlus size={40} />
          <span>ثبت‌نام</span>
        </div>
        <div ref={loginButtonRef} onClick={() => setView('login')} className={styles.rectButton}>
          <FaLock size={40} />
          <span>ورود</span>
        </div>
      </div>
      
      {/* --- The Expanding Modal Container --- */}
      <div ref={modalRef} className={styles.modalContainer}>
        {/* Close button is always visible inside the modal */}
        <button onClick={handleClose} className={styles.closeButton}>
          <IoClose size={32} />
        </button>
        {/* Back button is visible from the second step onwards */}
        {(view === 'confirm_experience' || view === 'enter_name') && (
           <button onClick={() => setView(getPreviousView())} className={styles.backButton}>
            <IoArrowBack size={20} />
            <span>بازگشت</span>
          </button>
        )}

        <div ref={modalContentRef} className={styles.modalContent}>
          {/* We render the content based on the 'view' state */}
          {view === 'signup' && (
            <div className="flex flex-col items-center gap-6">
              <h2 className={styles.title}>ایجاد حساب کاربری</h2>
              <input type="text" placeholder="نام کاربری" className={styles.inputField} />
              <input type="password" placeholder="کلمه عبور" className={styles.inputField} />
              <button onClick={() => setView('confirm_experience')} className={styles.button}>ادامه</button>
            </div>
          )}
          
          {/* Add other views (login, confirm_experience, etc.) here in the same way */}
          
        </div>
      </div>
    </main>
  );
}