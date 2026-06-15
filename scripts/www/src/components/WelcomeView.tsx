/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { LogIn, Eye, Sparkles } from 'lucide-react';

interface WelcomeViewProps {
  onNavigate: (screen: 'login' | 'register' | 'visitor') => void;
}

export default function WelcomeView({ onNavigate }: WelcomeViewProps) {
  return (
    <div className="relative min-h-[90vh] flex flex-col justify-center items-center py-12 px-4 text-center overflow-hidden">
      {/* Background Graphic Elements */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-50 via-slate-100/50 to-slate-200/10"></div>
      <div className="ambient-glow" style={{ transform: 'translate(-50%, -55%)' }}></div>
      
      {/* Logo & Brand Header */}
      <div className="relative z-10 flex flex-col items-center mb-16 space-y-6">
        <div className="w-24 h-24 md:w-28 md:h-24 p-2.5 rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(15,23,42,0.04)] border border-slate-200/60 bg-white/80 backdrop-blur flex items-center justify-center transition-transform hover:scale-105 duration-500">
          <img 
            alt="Echo Vault Logo" 
            className="w-full h-full object-contain" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDSKbM_1wbjO5Vyzeuu4cQRVaoBg636dDSqcoy0sJCiXkHvsOXjkXyb3-fozXl4V6EHPk3357QGSoMK9f8yp1JwtI_dKdqMDzDy9Gyd0TDoPlUgnFtb8sntjgT6OlPEROPsdCGAMivD4Ame9n05WoX_0AVy8prEgQZ17z7tyyJuTdn7KH3JA--ZpAPe7WjW3RqEuTAcssEcB3ToYp4oNshGYD0tTwNjEIxy9Kw7ds8Fx3BqXtNmjtBuXjszSMfGU5ZepAjUai-loZvtA"
          />
        </div>
        
        <div className="space-y-2">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary font-semibold tracking-tight">
            Echo Vault <span className="text-secondary/60 text-xl md:text-2xl font-light">/ AfterLink</span>
          </h1>
          <p className="font-sans text-xs tracking-[0.2em] text-secondary font-semibold uppercase">
            永恒的数字神龛 • Digital Legacy
          </p>
        </div>
      </div>

      {/* Slogan */}
      <div className="relative z-10 mb-20 max-w-lg space-y-4 px-4">
        <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-primary font-light tracking-wide leading-snug">
          数字遗产管理，<br className="md:hidden" />从此刻开始
        </h2>
        
        {/* Status Indicator (Subtle Glow) */}
        <div className="inline-flex items-center space-x-2 text-secondary text-xs tracking-wider bg-white/60 border border-slate-200/40 rounded-full px-4 py-1.5 shadow-sm">
          <div className="w-2 h-2 rounded-full bg-blue-600 status-glow"></div>
          <span className="font-medium">系统就绪，静待守护</span>
        </div>
      </div>

      {/* Actions */}
      <div className="relative z-10 w-full max-w-sm flex flex-col space-y-4 px-4">
        <button 
          id="btn-welcome-login"
          onClick={() => onNavigate('login')}
          className="w-full py-4 rounded-xl bg-blue-600 text-white font-semibold text-base hover:bg-blue-700 transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-blue-200/60 tracking-widest cursor-pointer"
        >
          <LogIn size={18} />
          登录 / 注册
        </button>
        
        <button 
          id="btn-welcome-preview"
          onClick={() => onNavigate('visitor')}
          className="w-full py-4 rounded-xl bg-white text-primary font-semibold text-base border border-slate-200 hover:bg-slate-50 transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2 shadow-sm cursor-pointer"
        >
          <Eye size={18} />
          预览演示
        </button>
      </div>

      {/* Bottom Footer Info */}
      <div className="relative z-10 mt-auto pt-12 flex items-center gap-1.5 text-xs text-secondary/60">
        <Sparkles size={12} className="text-primary/40 animate-pulse" />
        <span>以生命之名，构建可信且持久的数字见证</span>
      </div>
    </div>
  );
}
