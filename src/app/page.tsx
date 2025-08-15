// src/app/page.tsx - Updated with Morphing Animations
'use client';

import { useState, useRef } from 'react';
import { FaLock, FaUserPlus, FaArrowRight } from 'react-icons/fa';
import { IoClose, IoArrowBack } from 'react-icons/io5';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './HomePage.module.css';

type View = 'initial' | 'login' | 'signup' | 'confirm_experience' | 'enter_name';

export default function HomePage() {
  const [view, setView] = useState<View>('initial');
  
  const signupButtonRef = useRef<HTMLDivElement>(null);
  const loginButtonRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);
  
  // Refs for the navigation icons
  const navButtonRef = useRef<HTMLButtonElement>(null);
  const closeIconRef = useRef<HTMLDivElement>(null);
  const backIconRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // --- Modal Expansion Animation ---
    const animateModal = (originRef: React.RefObject<HTMLDivElement>) => {
      // ... (This logic is the same as before)
    };
    
    if (view === 'signup' || view === 'login') {
      animateModal(view === 'signup' ? signupButtonRef : loginButtonRef);
    }

    // --- Navigation Button Animations ---
    const isModalOpen = view !== 'initial';
    const isFirstStep = view === 'login' || view === 'signup';
    const isSecondStepOrLater = view === 'confirm_experience' || view === 'enter_name';
    
    // 1. Animate the button container's appearance/disappearance
    gsap.to(navButtonRef.current, { 
      duration: 0.5, 
      autoAlpha: isModalOpen ? 1 : 0, 
      rotation: isModalOpen ? 0 : -45, 
      ease: 'power2.out' 
    });
    
    // 2. Animate the morph between Close (X) and Back (<-) icons
    gsap.to(closeIconRef.current, { 
      duration: 0.3, 
      autoAlpha: isFirstStep ? 1 : 0, 
      rotation: isFirstStep ? 0 : 90, 
      ease: 'power2.inOut'
    });

    gsap.to(backIconRef.current, { 
      duration: 0.3, 
      autoAlpha: isSecondStepOrLater ? 1 : 0, 
      rotation: isSecondStepOrLater ? 0 : -90, 
      ease: 'power2.inOut'
    });

  }, { dependencies: [view] });

  const handleClose = () => {
    // ... (This logic is the same as before)
  };

  const getPreviousView = (): View => {
    if (view === 'enter_name') return 'confirm_experience';
    if (view === 'confirm_experience') return 'signup';
    return 'initial';
  };

  const handleNavClick = () => {
    if (view === 'login' || view === 'signup') {
      handleClose(); // In the first step, the button closes the modal
    } else {
      setView(getPreviousView()); // In other steps, it goes back
    }
  };
  
  return (
    <main className={styles.container}>
      {/* --- Initial View --- */}
      <div className={styles.initialView}>
        <div ref={signupButtonRef} onClick={() => setView('signup')} className={styles.rectButton}>
          <FaUserPlus size={40} /> <span>ثبت‌نام</span>
        </div>
        <div ref={loginButtonRef} onClick={() => setView('login')} className={styles.rectButton}>
          <FaLock size={40} /> <span>ورود</span>
        </div>
      </div>
      
      {/* --- The Expanding Modal Container --- */}
      <div ref={modalRef} className={styles.modalContainer}>
        {/* The new single navigation button */}
        <button ref={navButtonRef} onClick={handleNavClick} className={styles.navButton}>
          <div ref={closeIconRef}><IoClose size={32} /></div>
          <div ref={backIconRef}><IoArrowBack size={32} /></div>
        </button>

        <div ref={modalContentRef} className={styles.modalContent}>
          {/* ... All the form content is the same as before ... */}
        </div>
      </div>
    </main>
  );
}