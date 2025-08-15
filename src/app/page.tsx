// src/app/page.tsx
'use client';

import { useState, useRef } from 'react';
import { FaLock, FaUserPlus, FaArrowRight } from 'react-icons/fa';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import Modal from '@/components/Modal'; // <-- ایمپورت کردن کامپوننت جدید
import { IoArrowBack } from 'react-icons/io5';


type View = 'initial' | 'login' | 'signup' | 'confirm_experience' | 'enter_name';

export default function HomePage() {
  const [view, setView] = useState<View>('initial');
  
  // ... (کدهای مربوط به نوتیفیکیشن و توابع دیگر را نگه می‌داریم)

  // تابع بازگشت جدید با آیکون
  const BackButton = ({ to }: { to: View }) => (
    <div 
      onClick={() => setView(to)} 
      className="absolute top-8 left-8 text-sm text-gray-400 cursor-pointer hover:text-brand-white z-10 flex items-center gap-2"
    >
      <IoArrowBack />
      بازگشت
    </div>
  );
  
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-brand-navy p-8 overflow-hidden font-sans text-brand-white">
      
      {/* --- حالت اولیه: آیکون‌های ورود و ثبت‌نام --- */}
      {/* این بخش همیشه نمایش داده می‌شود */}
      <div className="flex items-center justify-center gap-12">
        <div onClick={() => setView('signup')} className="flex flex-col items-center gap-4 cursor-pointer group"><div className="p-6 border-2 border-brand-white rounded-full group-hover:border-brand-gold transition-colors"><FaUserPlus size={40} /></div><span className="font-light tracking-widest text-gray-300 group-hover:text-brand-gold transition-colors">ثبت‌نام</span></div>
        <div onClick={() => setView('login')} className="flex flex-col items-center gap-4 cursor-pointer group"><div className="p-6 border-2 border-brand-white rounded-full group-hover:border-brand-gold transition-colors"><FaLock size={40} /></div><span className="font-light tracking-widest text-gray-300 group-hover:text-brand-gold transition-colors">ورود</span></div>
      </div>

      {/* --- مودال ثبت نام --- */}
      <Modal isOpen={view === 'signup'} onClose={() => setView('initial')}>
        <div className="flex flex-col items-center gap-6">
          <BackButton to="initial" />
          <h2 className="text-h2-lg font-light tracking-widest mb-4">ایجاد حساب کاربری</h2>
          <input type="text" placeholder="نام کاربری" className="w-80 bg-transparent border-b-2 border-brand-gray text-center text-lg p-2 focus:border-brand-gold focus:scale-105 outline-none transition-all duration-300" />
          <input type="password" placeholder="کلمه عبور" className="w-80 bg-transparent border-b-2 border-brand-gray text-center text-lg p-2 focus:border-brand-gold focus:scale-105 outline-none transition-all duration-300" />
          <button onClick={() => setView('confirm_experience')} className="w-80 mt-4 text-brand-navy font-bold py-3 px-4 rounded-ui-default transition-all duration-300 bg-brand-gold hover:opacity-90">ادامه</button>
        </div>
      </Modal>

      {/* --- مودال تایید تجربه --- */}
      <Modal isOpen={view === 'confirm_experience'} onClose={() => setView('initial')}>
          <div className="flex flex-col items-center gap-8 text-center">
            <BackButton to="signup" />
            <h2 className="text-h1-lg font-light">آماده‌ای تا با هم یک تجربه جدید خلق کنیم؟</h2>
            <button onClick={() => setView('enter_name')} className="flex items-center gap-3 text-h2-lg font-bold py-3 px-8 rounded-ui-default bg-brand-white text-brand-navy hover:bg-gray-200 transition-colors">
              بریم <FaArrowRight />
            </button>
          </div>
      </Modal>
      
      {/* ... می‌توانید مودال‌های دیگر (ورود، ورود نام و...) را به همین شکل اضافه کنید ... */}

    </main>
  );
}