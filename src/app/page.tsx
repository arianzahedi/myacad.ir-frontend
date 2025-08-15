// src/app/page.tsx
'use client';

import { useState, useRef } from 'react';
import { FaLock, FaUserPlus, FaArrowRight } from 'react-icons/fa';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './HomePage.module.css'; // <-- ایمپورت کردن استایل‌ها

type View = 'initial' | 'login' | 'signup' | 'confirm_experience' | 'enter_name';

export default function HomePage() {
  const [view, setView] = useState<View>('initial');
  // ... (کد GSAP و توابع دیگر مانند قبل باقی می‌مانند)
  
  return (
    // استفاده از کلاس کانتینر از فایل CSS
    <main className={styles.container}>
      
      {/* --- حالت اولیه --- */}
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

      {/* --- حالت ثبت‌نام --- */}
      <div className={`${styles.formContainer} ${view === 'signup' ? styles.visible : styles.hidden}`}>
        <h2 className={styles.title}>ایجاد حساب کاربری</h2>
        <input type="text" placeholder="نام کاربری" className={styles.inputField} />
        <input type="password" placeholder="کلمه عبور" className={styles.inputField} />
        <button onClick={() => setView('confirm_experience')} className={styles.button}>ادامه</button>
      </div>

       {/* ... (بقیه حالت‌ها مانند confirm_experience و enter_name را می‌توانید به همین شکل اضافه کنید) ... */}

    </main>
  );
}