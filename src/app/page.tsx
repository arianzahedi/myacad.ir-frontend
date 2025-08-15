// src/app/page.tsx
'use client';

// MutableRefObject را از React ایمپورت می‌کنیم
import { useState, useRef, MutableRefObject } from 'react';
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
  
  useGSAP(() => {
    // تغییر اصلی اینجاست: ما نوع صحیح و کامل را برای پارامتر مشخص می‌کنیم
    const animate = (originRef: MutableRefObject<HTMLDivElement | null>) => { 
      if (!originRef.current || !modalRef.current || !modalContentRef.current) return;
      
      const originRect = originRef.current.getBoundingClientRect();
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
          autoAlpha: 1,
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          borderRadius: "0px",
          ease: 'expo.inOut',
        })
        .to(modalContentRef.current, {
            duration: 0.5,
            autoAlpha: 1,
        }, "-=0.2");
    };
    
    if (view === 'signup') animate(signupButtonRef);
    if (view === 'login') animate(loginButtonRef);

  }, { dependencies: [view] });

  const handleClose = () => {
    gsap.to(modalContentRef.current, { duration: 0.3, autoAlpha: 0, ease: 'power2.in' });
    gsap.to(modalRef.current, { 
      duration: 0.5, 
      autoAlpha: 0, 
      ease: 'expo.in',
      onComplete: () => setView('initial')
    });
  };

  const getPreviousView = (): View => {
      if (view === 'enter_name') return 'confirm_experience';
      if (view === 'confirm_experience') return 'signup';
      if (view === 'login' || view === 'signup') return 'initial';
      return 'initial';
  };
  
  return (
    <main className={styles.container}>
      {/* بقیه کد JSX بدون تغییر باقی می‌ماند */}
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
      <div ref={modalRef} className={styles.modalContainer}>
        {view !== 'initial' && (
            <button onClick={handleClose} className={styles.closeButton}>
              <IoClose size={32} />
            </button>
        )}
        {(view === 'confirm_experience' || view === 'enter_name') && (
           <button onClick={() => setView(getPreviousView())} className={styles.backButton}>
            <IoArrowBack size={20} />
            <span>بازگشت</span>
          </button>
        )}
        <div ref={modalContentRef} className={styles.modalContent}>
          {view === 'signup' && (
            <div className="flex flex-col items-center gap-6">
              <h2 className={styles.title}>ایجاد حساب کاربری</h2>
              <input type="text" placeholder="نام کاربری" className={styles.inputField} />
              <input type="password" placeholder="کلمه عبور" className={styles.inputField} />
              <button onClick={() => setView('confirm_experience')} className={styles.button}>ادامه</button>
            </div>
          )}
          {/* ... بقیه حالت‌های نمایش ... */}
        </div>
      </div>
    </main>
  );
}