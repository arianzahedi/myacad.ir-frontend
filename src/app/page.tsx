// src/app/page.tsx
'use client';

import { useState, useRef } from 'react';
import { FaLock, FaUserPlus, FaArrowRight } from 'react-icons/fa';
import { IoClose, IoArrowBack } from 'react-icons/io5'; // New icons
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './HomePage.module.css';

type View = 'initial' | 'login' | 'signup' | 'confirm_experience' | 'enter_name';

export default function HomePage() {
  const [view, setView] = useState<View>('initial');
  
  // A helper function to determine the previous step
  const getPreviousView = () => {
      if (view === 'enter_name') return 'confirm_experience';
      if (view === 'confirm_experience') return 'signup';
      // For the first steps, "back" takes you to the initial screen
      if (view === 'login' || view === 'signup') return 'initial';
      return 'initial';
  }

  // --- We are keeping the animation and other logic from before ---
  const container = useRef(null);
  useGSAP(() => {
    // ... (GSAP animation code remains the same)
  }, { scope: container, dependencies: [view] });

  return (
    <main className={styles.container} ref={container}>
      
      {/* --- Close (X) Button --- */}
      {/* This button is visible in any step except the initial one and always returns home */}
      {view !== 'initial' && (
        <button onClick={() => setView('initial')} className={styles.closeButton}>
          <IoClose size={32} />
        </button>
      )}

      {/* --- Back Button --- */}
      {/* This button is also visible in any step except the initial one */}
      {view !== 'initial' && (
         <button onClick={() => setView(getPreviousView())} className={styles.backButton}>
          <IoArrowBack size={20} />
          <span>بازگشت</span>
        </button>
      )}
      
      {/* --- Initial View --- */}
      <div className={`${styles.iconGroup} ${view === 'initial' ? styles.visible : styles.hidden}`}>
        <div onClick={() => setView('signup')} className={styles.iconButton}>
          <div><FaUserPlus size={40} /></div>
          <span>ثبت‌نام</span>
        </div>
        <div onClick={() => setView('login')} className={styles.iconButton}>
          <div><FaLock size={40} /></div>
          <span>ورود</span>
        </div>
      </div>

      {/* --- Sign Up View --- */}
      <div className={`${styles.formContainer} ${view === 'signup' ? styles.visible : styles.hidden}`}>
        <h2 className={`${styles.title} form-element`}>ایجاد حساب کاربری</h2>
        <input type="text" placeholder="نام کاربری" className={`${styles.inputField} form-element`} />
        <input type="password" placeholder="کلمه عبور" className={`${styles.inputField} form-element`} />
        <button onClick={() => setView('confirm_experience')} className={`${styles.button} form-element`}>ادامه</button>
      </div>

      {/* --- Confirm Experience View --- */}
      <div className={`${styles.formContainer} ${view === 'confirm_experience' ? styles.visible : styles.hidden}`}>
         <h2 className={`${styles.title} text-4xl text-center confirm-element`}>آماده‌ای تا با هم یک تجربه جدید خلق کنیم؟</h2>
         <button onClick={() => setView('enter_name')} className={`${styles.button} w-auto px-8 flex items-center gap-3 text-2xl confirm-element`}>
            بریم <FaArrowRight />
         </button>
      </div>

      {/* --- Enter Name View --- */}
      <div className={`${styles.formContainer} ${view === 'enter_name' ? styles.visible : styles.hidden}`}>
        <h2 className={`${styles.title} name-element`}>نام و نام خانوادگی خود را وارد کنید</h2>
        <input type="text" placeholder="مثال: ایلان ماسک" className={`${styles.inputField} w-96 text-2xl name-element`} />
        <button onClick={() => { /* Next step: 10 questions */ }} className={`${styles.button} w-96 name-element`}>ادامه</button>
      </div>

    </main>
  );
}