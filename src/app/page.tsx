// src/app/page.tsx
'use client';

import { useState } from 'react';
import { FaLock, FaUserPlus } from 'react-icons/fa';
import styles from './HomePage.module.css'; // <-- ایمپورت کردن استایل‌ها از فایل ماژول

export default function HomePage() {
  const [view, setView] = useState('initial');
  // در مراحل بعد، منطق کامل را به اینجا برمی‌گردانیم
  
  return (
    <main className={styles.container}>
      <div className={styles.iconGroup}>
        <div onClick={() => setView('signup')} className={styles.iconButton}>
          <div><FaUserPlus size={40} /></div>
          <span>ثبت‌نام</span>
        </div>
        <div onClick={() => setView('login')} className={styles.iconButton}>
          <div><FaLock size={40} /></div>
          <span>ورود</span>
        </div>
      </div>
    </main>
  );
}