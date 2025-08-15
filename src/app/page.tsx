// src/app/page.tsx - Final Version
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
  const containerRef = useRef(null);

  useGSAP(() => {
    if (view !== 'initial') {
      gsap.fromTo(`.${styles.visible} > *`, 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, stagger: 0.1, delay: 0.3, ease: 'power2.out' }
      );
    }
  }, { dependencies: [view], scope: containerRef });

  const getPreviousView = (): View => {
      if (view === 'enter_name') return 'confirm_experience';
      if (view === 'confirm_experience') return 'signup';
      return 'initial';
  };
  
  return (
    <main className={styles.container} ref={containerRef}>
      
      <div className={`${styles.viewContainer} ${view === 'initial' ? styles.visible : styles.hidden}`}>
        {/* This new wrapper div fixes the layout issue */}
        <div className={styles.initialViewWrapper}>
          <div onClick={() => setView('signup')} className={styles.rectButton}>
            <FaUserPlus size={40} /> <span>ثبت‌نام</span>
          </div>
          <div onClick={() => setView('login')} className={styles.rectButton}>
            <FaLock size={40} /> <span>ورود</span>
          </div>
        </div>
      </div>

      <div className={`${styles.viewContainer} ${view === 'login' ? styles.visible : styles.hidden}`}>
        <button onClick={() => setView('initial')} className={`${styles.navButton} ${styles.closeButton}`}><IoClose size={32} /></button>
        <div className={styles.form}>
            <h2 className={styles.title}>ورود به حساب کاربری</h2>
            <input type="text" placeholder="نام کاربری" className={styles.inputField} />
            <input type="password" placeholder="کلمه عبور" className={styles.inputField} />
            <button className={styles.button}>ورود</button>
        </div>
      </div>

      <div className={`${styles.viewContainer} ${view === 'signup' ? styles.visible : styles.hidden}`}>
         <button onClick={() => setView('initial')} className={`${styles.navButton} ${styles.closeButton}`}><IoClose size={32} /></button>
         <div className={styles.form}>
            <h2 className={styles.title}>ایجاد حساب کاربری</h2>
            <input type="text" placeholder="نام کاربری" className={styles.inputField} />
            <input type="password" placeholder="کلمه عبور" className={styles.inputField} />
            <button onClick={() => setView('confirm_experience')} className={styles.button}>ادامه</button>
        </div>
      </div>
      
      <div className={`${styles.viewContainer} ${view === 'confirm_experience' ? styles.visible : styles.hidden}`}>
         <button onClick={() => setView('initial')} className={`${styles.navButton} ${styles.closeButton}`}><IoClose size={32} /></button>
         {/* The text "بازگشت" is now removed from the back button */}
         <button onClick={() => setView(getPreviousView())} className={`${styles.navButton} ${styles.backButton}`}><IoArrowBack size={24} /></button>
         <div className={styles.form}>
            <h2 className={styles.title}>آماده‌ای تا با هم یک تجربه جدید خلق کنیم؟</h2>
            <button onClick={() => setView('enter_name')} className={`${styles.button} w-auto px-8 flex items-center justify-center gap-3 text-2xl`}>
                بریم <FaArrowRight />
            </button>
        </div>
      </div>

      <div className={`${styles.viewContainer} ${view === 'enter_name' ? styles.visible : styles.hidden}`}>
         <button onClick={() => setView('initial')} className={`${styles.navButton} ${styles.closeButton}`}><IoClose size={32} /></button>
         <button onClick={() => setView(getPreviousView())} className={`${styles.navButton} ${styles.backButton}`}><IoArrowBack size={24} /></button>
         <div className={styles.form}>
            <h2 className={styles.title}>نام و نام خانوادگی خود را وارد کنید</h2>
            <input type="text" placeholder="مثال: ایلان ماسک" className={styles.inputField} />
            <button className={styles.button}>ادامه</button>
        </div>
      </div>
      
    </main>
  );
}