// src/app/page.tsx
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
    // --- Modal Expansion Animation ---
    const animateModal = (originRef: React.RefObject<HTMLDivElement>) => {
      if (!originRef.current || !modalRef.current || !modalContentRef.current) return;
      
      const originRect = originRef.current.getBoundingClientRect();
      const tl = gsap.timeline();
      
      tl.set(modalRef.current, {
          top: originRect.top, left: originRect.left,
          width: originRect.width, height: originRect.height,
          borderRadius: "12px",
        })
        .to(modalRef.current, {
          duration: 0.7, autoAlpha: 1, top: 0, left: 0,
          width: '100vw', height: '100vh',
          borderRadius: "0px", ease: 'expo.inOut',
        })
        .to(modalContentRef.current, { duration: 0.5, autoAlpha: 1 }, "-=0.2");
    };
    
    if (view === 'signup' || view === 'login') {
      animateModal(view === 'signup' ? signupButtonRef : loginButtonRef);
    }

    // --- Navigation Button Animations ---
    const isModalOpen = view !== 'initial';
    const isFirstStep = view === 'login' || view === 'signup';
    const isSecondStepOrLater = view === 'confirm_experience' || view === 'enter_name';
    
    gsap.to(navButtonRef.current, { 
      duration: 0.5, 
      autoAlpha: isModalOpen ? 1 : 0, 
      rotation: isModalOpen ? 0 : -45, 
      ease: 'power2.out' 
    });
    
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
    gsap.to(modalContentRef.current, { duration: 0.3, autoAlpha: 0 });
    gsap.to(modalRef.current, { 
      duration: 0.5, autoAlpha: 0, onComplete: () => setView('initial')
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
      setView(getPreviousView());
    }
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
        <button ref={navButtonRef} onClick={handleNavClick} className={styles.navButton}>
          <div ref={closeIconRef}><IoClose size={32} /></div>
          <div ref={backIconRef}><IoArrowBack size={32} /></div>
        </button>

        <div ref={modalContentRef} className={styles.modalContent}>
          
          {/* Login Content */}
          {view === 'login' && (
            <div className={styles.form}>
              <h2 className={styles.title}>ورود به حساب کاربری</h2>
              <input type="text" placeholder="نام کاربری" className={styles.inputField} />
              <input type="password" placeholder="کلمه عبور" className={styles.inputField} />
              <button className={styles.button}>ورود</button>
            </div>
          )}

          {/* Signup Content */}
          {view === 'signup' && (
            <div className={styles.form}>
              <h2 className={styles.title}>ایجاد حساب کاربری</h2>
              <input type="text" placeholder="نام کاربری" className={styles.inputField} />
              <input type="password" placeholder="کلمه عبور" className={styles.inputField} />
              <button onClick={() => setView('confirm_experience')} className={styles.button}>ادامه</button>
            </div>
          )}
          
          {/* Confirm Experience Content */}
          {view === 'confirm_experience' && (
            <div className={styles.form}>
              <h2 className={styles.title}>آماده‌ای تا با هم یک تجربه جدید خلق کنیم؟</h2>
              <button onClick={() => setView('enter_name')} className={`${styles.button} flex items-center justify-center gap-3 text-2xl w-auto px-8`}>
                  بریم <FaArrowRight />
              </button>
            </div>
          )}
          
          {/* Enter Name Content */}
          {view === 'enter_name' && (
            <div className={styles.form}>
              <h2 className={styles.title}>نام و نام خانوادگی خود را وارد کنید</h2>
              <input type="text" placeholder="مثال: ایلان ماسک" className={styles.inputField} />
              <button className={styles.button}>ادامه</button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}