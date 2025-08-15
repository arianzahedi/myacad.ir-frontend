// src/app/page.tsx - Final Corrected Version
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
  
  const navButtonRef = useRef<HTMLButtonElement>(null);
  const closeIconRef = useRef<HTMLDivElement>(null);
  const backIconRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // --- Animation Logic is now centralized and simpler ---

    // 1. Animate the modal container expanding
    const animateModal = (originRef: React.RefObject<HTMLDivElement>) => {
      if (!originRef.current || !modalRef.current) return;
      const originRect = originRef.current.getBoundingClientRect();
      gsap.fromTo(modalRef.current, 
        { top: originRect.top, left: originRect.left, width: originRect.width, height: originRect.height, borderRadius: "12px" },
        { duration: 0.7, autoAlpha: 1, top: 0, left: 0, width: '100vw', height: '100vh', borderRadius: "0px", ease: 'expo.inOut' }
      );
    };
    
    // 2. Animate the content inside the modal
    const animateContent = (targetClass: string) => {
      // First, make the container visible, then animate children
      gsap.set(modalContentRef.current, { autoAlpha: 1 });
      gsap.from(targetClass, { delay: 0.5, y: 30, opacity: 0, stagger: 0.1, ease: "power2.out" });
    }
    
    // 3. Trigger animations based on the current view
    switch (view) {
      case 'signup':
        animateModal(signupButtonRef);
        animateContent(".form-element");
        break;
      case 'login':
        animateModal(loginButtonRef);
        animateContent(".form-element");
        break;
      case 'confirm_experience':
        animateContent(".confirm-element");
        break;
      case 'enter_name':
        animateContent(".name-element");
        break;
    }

    // --- Navigation Button Morphing Animation ---
    const isFirstStep = view === 'login' || view === 'signup';
    const isSecondStepOrLater = view === 'confirm_experience' || view === 'enter_name';
    gsap.to(closeIconRef.current, { duration: 0.3, autoAlpha: isFirstStep ? 1 : 0, rotation: isFirstStep ? 0 : 90 });
    gsap.to(backIconRef.current, { duration: 0.3, autoAlpha: isSecondStepOrLater ? 1 : 0, rotation: isSecondStepOrLater ? 0 : -90 });

  }, { dependencies: [view] });

  const handleClose = () => {
    gsap.to(modalRef.current, { 
      duration: 0.5, autoAlpha: 0, ease: 'expo.in', onComplete: () => setView('initial')
    });
  };

  const getPreviousView = (): View => {
      if (view === 'enter_name') return 'confirm_experience';
      if (view === 'confirm_experience') return 'signup';
      return 'initial';
  };

  const handleNavClick = () => {
    if (view === 'login' || view === 'signup') {
      handleClose();
    } else {
      gsap.to(modalContentRef.current, { duration: 0.3, autoAlpha: 0, onComplete: () => setView(getPreviousView()) });
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
        <button ref={navButtonRef} onClick={handleNavClick} className={`${styles.navButton} ${view !== 'initial' ? styles.visibleNav : ''}`}>
          <div ref={closeIconRef}><IoClose size={32} /></div>
          <div ref={backIconRef}><IoArrowBack size={32} /></div>
        </button>

        <div ref={modalContentRef} className={styles.modalContent}>
          
          {/* We use classNames to group elements for GSAP to animate */}
          {view === 'login' && (
            <div className={styles.form}>
              <h2 className={`${styles.title} form-element`}>ورود به حساب کاربری</h2>
              <input type="text" placeholder="نام کاربری" className={`${styles.inputField} form-element`} />
              <input type="password" placeholder="کلمه عبور" className={`${styles.inputField} form-element`} />
              <button className={`${styles.button} form-element`}>ورود</button>
            </div>
          )}

          {view === 'signup' && (
            <div className={styles.form}>
              <h2 className={`${styles.title} form-element`}>ایجاد حساب کاربری</h2>
              <input type="text" placeholder="نام کاربری" className={`${styles.inputField} form-element`} />
              <input type="password" placeholder="کلمه عبور" className={`${styles.inputField} form-element`} />
              <button onClick={() => gsap.to(modalContentRef.current, {duration: 0.3, autoAlpha: 0, onComplete: () => setView('confirm_experience')})} className={`${styles.button} form-element`}>ادامه</button>
            </div>
          )}
          
          {view === 'confirm_experience' && (
            <div className={styles.form}>
              <h2 className={`${styles.title} confirm-element`}>آماده‌ای تا با هم یک تجربه جدید خلق کنیم؟</h2>
              <button onClick={() => gsap.to(modalContentRef.current, {duration: 0.3, autoAlpha: 0, onComplete: () => setView('enter_name')})} className={`${styles.button} w-auto px-8 flex items-center justify-center gap-3 text-2xl confirm-element`}>
                  بریم <FaArrowRight />
              </button>
            </div>
          )}
          
          {view === 'enter_name' && (
            <div className={styles.form}>
              <h2 className={`${styles.title} name-element`}>نام و نام خانوادگی خود را وارد کنید</h2>
              <input type="text" placeholder="مثال: ایلان ماسک" className={`${styles.inputField} name-element`} />
              <button className={`${styles.button} name-element`}>ادامه</button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}