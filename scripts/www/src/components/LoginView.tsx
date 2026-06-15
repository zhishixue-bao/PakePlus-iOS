/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Key, User, PlusCircle, ArrowLeft, Fingerprint, Calendar, ShieldCheck, Mail, Camera, HelpCircle, Check, Loader2 } from 'lucide-react';

interface LoginViewProps {
  initialMode?: 'login' | 'register';
  onNavigateHome: (username: string) => void;
  onBack: () => void;
}

export default function LoginView({ initialMode = 'login', onNavigateHome, onBack }: LoginViewProps) {
  const [isLoginView, setIsLoginView] = useState(initialMode === 'login');
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState('https://lh3.googleusercontent.com/aida-public/AB6AXuDiEGq-y96j7nSqXOhbj22v9yKZRwE05ffzruceXa7685e9P5I_Jzq-8fIBNylm1RwKsjrg9jIKjUFBcngIOXUeUlwzf7NA0iZYs505LS36V7Bet7RYBop_OubiajaEBlWCjINieJ4z57JLQiRmMhkd4fzxcCR3L3sa1OLw5BemKyjYLWIxe3g5rzBAKXh1Qxdl4GrayDKASgEir0JKZH7tzFjcKZiEfYGOYorubzR43dfKDyTDXudSLjcpvjVzqxUXyHXSpo4hK7ZRlQ');
  
  // Form fields
  const [loginId, setLoginId] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerBirth, setRegisterNameBirth] = useState('');
  const [registerPass, setRegisterPass] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [scanningFingerprint, setScanningFingerprint] = useState(false);

  // Quick preset fills to help testing
  const fillPresets = (isLogin: boolean) => {
    if (isLogin) {
      setLoginId('lin.anran@gmail.com');
      setLoginPassword('••••••••••••');
    } else {
      setRegisterName('林安然');
      setRegisterNameBirth('2000-06-15');
      setRegisterPass('SecurePassword123');
      setAgreed(true);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors(null);
    
    if (!loginId || !loginPassword) {
      setErrors('请完整填写账户名与访问秘钥');
      return;
    }
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Log in with Lin Anran or custom name
      const name = loginId.includes('lin') || loginId === '林安然' ? '林安然' : loginId.split('@')[0];
      onNavigateHome(name || '林安然');
    }, 1500);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors(null);
    
    if (!registerName || !registerBirth || !registerPass) {
      setErrors('请填写完整的注册参数');
      return;
    }
    if (!agreed) {
      setErrors('您需要同意守护契约与隐私宣言才能开启神龛');
      return;
    }
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onNavigateHome(registerName);
    }, 1800);
  };

  const handleBiometricLogin = () => {
    setScanningFingerprint(true);
    setTimeout(() => {
      setScanningFingerprint(false);
      setToastMessage('生物指纹特征相符，正在解密开启档案室...');
      setTimeout(() => {
        onNavigateHome('林安然');
      }, 1000);
    }, 2000);
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="relative min-h-[90vh] py-12 px-4 flex flex-col justify-center items-center z-10 w-full max-w-md mx-auto">
      {/* Back button */}
      <button 
        onClick={onBack}
        className="absolute top-4 left-4 flex items-center gap-1.5 text-secondary hover:text-primary transition-colors text-sm font-medium z-30"
      >
        <ArrowLeft size={16} />
        返回
      </button>

      {/* Hero header */}
      <div className="text-center mb-10 w-full">
        <h1 className="font-serif text-3xl lg:text-4xl text-primary font-bold tracking-tight">Echo Vault</h1>
        <p className="font-sans text-xs tracking-widest text-[#595f63] mt-2 font-medium opacity-80">永恒的数字神龛 / Protection of Soul</p>
      </div>

      {/* Main Glass Panel */}
      <div className="glass-card w-full p-8 rounded-2xl subtle-shadow relative overflow-hidden transition-all duration-500">
        {/* Decorative background radial light */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-fixed-dim/20 rounded-full blur-3xl pointer-events-none"></div>
        {/* Loading Spinner Overlaid */}
        {loading && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-50 flex flex-col items-center justify-center space-y-4">
            <Loader2 size={36} className="text-primary animate-spin" />
            <p className="font-sans text-sm text-primary font-medium tracking-wide">
              {isLoginView ? '正在解密并开启档案室...' : '正在在区块链铸造数字身份...'}
            </p>
          </div>
        )}

        {/* --- LOGIN VIEW --- */}
        {isLoginView ? (
          <div className="w-full space-y-6 animate-fade-in">
            <div className="flex justify-between items-baseline">
              <h2 className="font-serif text-2xl text-primary font-medium">欢迎归来</h2>
              <button 
                onClick={() => fillPresets(true)}
                className="text-xs text-primary/60 hover:text-primary underline cursor-pointer"
              >
                快捷填单
              </button>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-6">
              {errors && <div className="p-3 text-xs bg-error-container text-error rounded-lg">{errors}</div>}

              {/* Login identifier */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-secondary uppercase tracking-wider">邮箱或手机号</label>
                <div className="relative">
                  <span className="absolute left-0 bottom-2 text-secondary"><Mail size={16} /></span>
                  <input 
                    type="text" 
                    value={loginId}
                    onChange={(e) => setLoginId(e.target.value)}
                    className="w-full bg-transparent border-0 border-b border-outline-variant py-2 pl-7 pr-2 focus:ring-0 focus:border-primary font-sans text-sm leading-relaxed text-on-surface"
                    placeholder="档案检索标识"
                  />
                </div>
              </div>

              {/* Access Key */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-secondary uppercase tracking-wider">访问秘钥</label>
                <div className="relative">
                  <span className="absolute left-0 bottom-2 text-secondary"><Key size={16} /></span>
                  <input 
                    type="password" 
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full bg-transparent border-0 border-b border-outline-variant py-2 pl-7 pr-2 focus:ring-0 focus:border-primary font-sans text-sm leading-relaxed text-on-surface"
                    placeholder="输入密码"
                  />
                </div>
              </div>

              {/* Extras and Fingerprint */}
              <div className="flex items-center justify-between pt-2">
                <button 
                  type="button" 
                  onClick={() => triggerToast('密码找回服务通常需要可信联系人多签验证，请联系您的守护受托人。')}
                  className="text-xs font-medium text-secondary hover:text-primary transition-colors cursor-pointer"
                >
                  忘记密码?
                </button>
                
                {/* Simulated fingerprint click */}
                <button 
                  type="button"
                  onClick={handleBiometricLogin}
                  title="生物特征识别登录"
                  className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center hover:bg-surface-container transition-colors border border-outline-variant/30 text-secondary hover:text-primary relative group cursor-pointer"
                >
                  {scanningFingerprint ? (
                    <Loader2 size={18} className="animate-spin text-primary" />
                  ) : (
                    <Fingerprint size={20} />
                  )}
                  {/* Fingerprint indicator ring */}
                  {scanningFingerprint && (
                    <div className="absolute inset-0 border border-primary rounded-full animate-ping opacity-75"></div>
                  )}
                </button>
              </div>

              {/* Submit button */}
              <div className="pt-2">
                <button 
                  type="submit"
                  className="w-full bg-blue-600 text-white font-semibold text-base py-4 rounded-xl hover:bg-blue-700 transition-all duration-300 active:scale-[0.98] shadow-lg shadow-blue-500/10 select-none cursor-pointer text-center"
                >
                  开启档案室
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* --- REGISTER VIEW --- */
          <div className="w-full space-y-5 animate-fade-in">
            <div className="flex justify-between items-baseline">
              <h2 className="font-serif text-2xl text-primary font-medium">创建数字遗产</h2>
              <button 
                onClick={() => fillPresets(false)}
                className="text-xs text-primary/60 hover:text-primary underline cursor-pointer"
              >
                快捷填单
              </button>
            </div>

            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              {errors && <div className="p-3 text-xs bg-error-container text-error rounded-lg">{errors}</div>}

              {/* Avatar Selector Mock */}
              <div className="flex flex-col items-center">
                <div 
                  onClick={() => triggerToast('头像已由AI图像服务生成并与数字分身深度绑定。')}
                  className="w-20 h-20 rounded-full border border-dashed border-outline-variant flex items-center justify-center cursor-pointer hover:border-primary hover:bg-surface-container-low transition-colors group relative overflow-hidden bg-white/50 subtle-shadow"
                >
                  <img 
                    alt="Current Avatar" 
                    className="w-full h-full object-cover rounded-full group-hover:scale-105 duration-300"
                    src={avatar}
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                    <Camera size={18} />
                  </div>
                </div>
                <span className="text-[10px] text-secondary font-medium tracking-wide mt-2">
                  您的神龛守护形象(已绑定)
                </span>
              </div>

              {/* Name */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-secondary uppercase tracking-wider">您的称呼 (铭刻名)</label>
                <div className="relative">
                  <span className="absolute left-0 bottom-2 text-secondary"><User size={16} /></span>
                  <input 
                    type="text" 
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}
                    className="w-full bg-transparent border-0 border-b border-outline-variant py-2 pl-7 pr-2 focus:ring-0 focus:border-primary font-sans text-sm leading-relaxed text-on-surface"
                    placeholder="例如: 林安然 / 铭刻于墓碑的名字"
                  />
                </div>
              </div>

              {/* Era/Birth */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-secondary uppercase tracking-wider">出生纪元</label>
                <div className="relative flex items-center">
                  <span className="absolute left-0 bottom-2 text-secondary"><Calendar size={16} /></span>
                  <input 
                    type="text" 
                    value={registerBirth}
                    onChange={(e) => setRegisterNameBirth(e.target.value)}
                    className="w-full bg-transparent border-0 border-b border-outline-variant py-2 pl-7 pr-7 focus:ring-0 focus:border-primary font-sans text-sm leading-relaxed text-on-surface"
                    placeholder="YYYY-MM-DD (例如: 2000-06-15)"
                  />
                </div>
              </div>

              {/* Initial Secret */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-secondary uppercase tracking-wider">设置初始访问秘钥</label>
                <div className="relative">
                  <span className="absolute left-0 bottom-2 text-secondary"><Key size={16} /></span>
                  <input 
                    type="password" 
                    value={registerPass}
                    onChange={(e) => setRegisterPass(e.target.value)}
                    className="w-full bg-transparent border-0 border-b border-outline-variant py-2 pl-7 pr-2 focus:ring-0 focus:border-primary font-sans text-sm leading-relaxed text-on-surface"
                    placeholder="高强度私钥密码"
                  />
                </div>
              </div>

              {/* Agreement Checkbox */}
              <div className="flex items-start pt-2">
                <div className="flex items-center h-5">
                  <input 
                    id="terms" 
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-slate-300 rounded bg-transparent focus:ring-blue-500 focus:ring-offset-background cursor-pointer"
                  />
                </div>
                <label htmlFor="terms" className="ml-3 text-xs text-secondary leading-normal cursor-pointer select-none">
                  我同意 <span onClick={(e) => { e.preventDefault(); triggerToast('开启神龛：意味着您已同意数据通过高强度防失联物理网络同步以及多签名委托守护协议。'); }} className="text-blue-600 hover:underline font-medium">《神龛守护条约》</span> 与 <span onClick={(e) => { e.preventDefault(); triggerToast('隐私宣言：我们对除授权受托人外的任何人完全加密并隐藏任何足迹档案。'); }} className="text-blue-600 hover:underline font-medium">《隐私宣言》</span>
                </label>
              </div>

              {/* Submit button */}
              <div className="pt-2">
                <button 
                  type="submit"
                  className="w-full bg-blue-600 text-white font-semibold text-base py-4 rounded-xl hover:bg-blue-700 transition-all duration-300 active:scale-[0.98] shadow-lg shadow-blue-500/10 select-none cursor-pointer tracking-wider text-center"
                >
                  铸造数字身份
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Toggle Action Section */}
      <div className="mt-8 text-center bg-white border border-slate-200/60 rounded-full px-5 py-2 whitespace-nowrap shadow-sm">
        <p className="text-xs text-secondary font-medium flex items-center justify-center gap-1.5">
          <span>{isLoginView ? '未曾留下印记？' : '已拥有数字灵魂？'}</span>
          <button 
            type="button"
            onClick={() => {
              setIsLoginView(!isLoginView);
              setErrors(null);
            }} 
            className="text-blue-600 font-semibold hover:underline focus:outline-none cursor-pointer ml-1"
          >
            {isLoginView ? '构建档案' : '唤醒档案'}
          </button>
        </p>
      </div>

      {/* Fingerprint Scanning overlay */}
      {scanningFingerprint && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-lg flex flex-col items-center justify-center text-white">
          <div className="bg-slate-900 p-8 rounded-2xl flex flex-col items-center space-y-6 shadow-2xl border border-slate-800">
            <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 relative">
              <Fingerprint size={36} className="animate-pulse" />
              <div className="absolute inset-0 border-2 border-blue-500 rounded-full animate-ping opacity-60"></div>
            </div>
            <div className="text-center space-y-1">
              <h3 className="font-title-md text-white font-semibold tracking-wide text-lg">触压感应校验中</h3>
              <p className="font-body-sm text-slate-400">请确保指尖平贴在传感区域</p>
            </div>
          </div>
        </div>
      )}

      {/* Compact dynamic state alert */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-full bg-primary text-white text-xs subtle-shadow flex items-center gap-2 border border-outline-variant/20 tracking-wider">
          <ShieldCheck size={14} className="text-primary-fixed-dim" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
