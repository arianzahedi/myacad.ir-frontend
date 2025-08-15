// src/app/page.tsx
'use client';

import { useState, useRef } from 'react';
import { FaLock, FaUserPlus, FaArrowRight } from 'react-icons/fa';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

// تعریف تمام حالت‌های ممکن برای نمایش در صفحه
type View = 'initial' | 'login' | 'signup' | 'confirm_experience' | 'enter_name';

export default function HomePage() {
  const [view, setView] = useState<View>('initial');
  const [notification, setNotification] = useState('');
  
  // یک ref برای کانتینر اصلی تا انیمیشن‌های GSAP را به آن محدود کنیم
  const container = useRef(null); 

  // هوک GSAP برای مدیریت تمام انیمیشن‌های ورودی
  useGSAP(() => {
    const commonAnimation = { y: 30, opacity: 0, stagger: 0.1, ease: "power2.out", duration: 0.5 };
    if (view === 'signup' || view === 'login') {
      gsap.from(".form-element", commonAnimation);
    }
    if (view === 'confirm_experience') {
      gsap.from(".confirm-element", { scale: 0.8, opacity: 0, stagger: 0.2, ease: "back.out(1.7)", duration: 0.5 });
    }
    if (view === 'enter_name') {
        gsap.from(".name-element", commonAnimation);
    }
  }, { scope: container, dependencies: [view] });


  // تابع برای نمایش نوتیفیکیشن
  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 3000);
  };
  
  const handleLogin = () => {
    showNotification('نام کاربری یا رمز عبور همخوانی ندارد.');
  };

  // تابع برای دکمه بازگشت
  const getPreviousView = () => {
      if (view === 'enter_name') return 'confirm_experience';
      if (view === 'confirm_experience') return 'signup';
      if (view === 'login' || view === 'signup') return 'initial';
      return 'initial';
  }
  
  // کلاس‌های مشترک برای استایل‌دهی تکراری
  const inputClasses = "w-80 bg-transparent border-b-2 border-brand-gray text-center text-lg p-2 focus:border-brand-gold focus:scale-105 outline-none transition-all duration-300";
  const buttonClasses = "w-80 mt-4 text-brand-navy font-bold py-3 px-4 rounded-ui-default transition-all duration-300 bg-brand-gold hover:bg-gradient-to-r hover:from-yellow-400 hover:to-brand-gold hover:shadow-lg hover:shadow-yellow-400/20";


  return (
    <main ref={container} className="relative flex min-h-screen flex-col items-center justify-center bg-brand-navy text-brand-white p-8 overflow-hidden font-sans">
      
      {/* دکمه بازگشت */}
      <div 
        onClick={() => view !== 'initial' && setView(getPreviousView())} 
        className={`absolute top-8 right-8 text-sm text-gray-400 cursor-pointer hover:text-brand-white z-10 transition-opacity duration-300 ${view !== 'initial' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
          بازگشت
      </div>

      {/* حالت اولیه: نمایش آیکون‌ها */}
      <div className={`absolute flex items-center justify-center gap-12 transition-opacity duration-500 ${view === 'initial' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div onClick={() => setView('signup')} className="flex flex-col items-center gap-4 cursor-pointer group"><div className="p-6 border-2 border-brand-white rounded-full group-hover:border-brand-gold transition-colors"><FaUserPlus size={40} /></div><span className="font-light tracking-widest text-gray-300 group-hover:text-brand-gold transition-colors">ثبت‌نام</span></div>
        <div onClick={() => setView('login')} className="flex flex-col items-center gap-4 cursor-pointer group"><div className="p-6 border-2 border-brand-white rounded-full group-hover:border-brand-gold transition-colors"><FaLock size={40} /></div><span className="font-light tracking-widest text-gray-300 group-hover:text-brand-gold transition-colors">ورود</span></div>
      </div>

      {/* حالت ورود */}
      <div className={`absolute flex flex-col items-center gap-6 transition-opacity duration-500 ${view === 'login' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <h2 className="text-h2-lg font-light tracking-widest mb-4 form-element">ورود به حساب کاربری</h2>
        <input type="text" placeholder="نام کاربری" className={`${inputClasses} form-element`} />
        <input type="password" placeholder="کلمه عبور" className={`${inputClasses} form-element`} />
        <button onClick={handleLogin} className={`${buttonClasses} form-element`}>ورود</button>
      </div>
      
      {/* حالت ثبت‌نام */}
      <div className={`absolute flex flex-col items-center gap-6 transition-opacity duration-500 ${view === 'signup' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <h2 className="text-h2-lg font-light tracking-widest mb-4 form-element">ایجاد حساب کاربری</h2>
        <input type="text" placeholder="نام کاربری" className={`${inputClasses} form-element`} />
        <input type="password" placeholder="کلمه عبور" className={`${inputClasses} form-element`} />
        <button onClick={() => setView('confirm_experience')} className={`${buttonClasses} form-element`}>ادامه</button>
      </div>

      {/* حالت تایید تجربه */}
      <div className={`absolute flex flex-col items-center gap-8 text-center transition-opacity duration-500 ${view === 'confirm_experience' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <h2 className="text-h1-lg font-light confirm-element">آماده‌ای تا با هم یک تجربه جدید خلق کنیم؟</h2>
        <button onClick={() => setView('enter_name')} className="flex items-center gap-3 text-h2-lg font-bold py-3 px-8 rounded-ui-default bg-brand-white text-brand-navy hover:bg-gray-200 transition-colors confirm-element">
          بریم <FaArrowRight />
        </button>
      </div>

      {/* حالت ورود نام */}
      <div className={`absolute flex flex-col items-center gap-6 transition-opacity duration-500 ${view === 'enter_name' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <h2 className="text-h2-lg font-light tracking-widest mb-4 name-element">نام و نام خانوادگی خود را وارد کنید</h2>
        <input type="text" placeholder="مثال: ایلان ماسک" className="w-96 bg-transparent border-b-2 border-brand-gray text-center text-h2-lg p-2 focus:border-brand-gold focus:scale-105 outline-none transition-all duration-300 name-element" />
        <button onClick={() => { /* قدم بعدی: رفتن به مرحله ۱۰ سوال */ }} className="w-96 mt-4 text-brand-navy font-bold py-3 px-4 rounded-ui-default transition-all duration-300 bg-brand-gold hover:bg-gradient-to-r hover:from-yellow-400 hover:to-brand-gold hover:shadow-lg hover:shadow-yellow-400/20 name-element">ادامه</button>
      </div>

      {/* نوتیفیکیشن */}
      <div className={`fixed bottom-8 bg-red-500 text-white py-2 px-6 rounded-ui-default transition-all duration-300 z-20 ${notification ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
        {notification}
      </div>
    </main>
  );
}