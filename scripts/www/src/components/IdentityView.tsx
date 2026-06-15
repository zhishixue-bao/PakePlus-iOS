/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Fingerprint, Eye, ScanFace, FileText, ArrowLeft, ShieldCheck, Camera, X } from 'lucide-react';

interface IdentityViewProps {
  onBack: () => void;
}

export default function IdentityView({ onBack }: IdentityViewProps) {
  // Biometric statuses
  const [biometrics, setBiometrics] = useState({
    fingerprint: true,
    face: true,
    iris: false
  });

  const [activeScan, setActiveScan] = useState<'fingerprint' | 'face' | 'iris' | null>(null);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanMessage, setScanMessage] = useState('');
  
  // Document previews
  const [previewDoc, setPreviewDoc] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const runBiometricScanner = (type: 'fingerprint' | 'face' | 'iris') => {
    setActiveScan(type);
    setScanProgress(0);
    setScanMessage(
      type === 'iris' ? '虹膜扫描仪已就绪。请凝视前镜，校准对焦中...' :
      type === 'face' ? '人脸深度多边形测量仪校准中...' : '指纹压感器加热中...'
    );

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        const next = prev + 10;
        if (next === 40) {
          setScanMessage(type === 'iris' ? '正在捕捉虹膜双层螺旋细节纹理特征...' : '正在验证特征哈希对齐度...');
        } else if (next === 80) {
          setScanMessage('正在进行苏黎世节点密码见证哈希对齐...');
        } else if (next >= 100) {
          clearInterval(interval);
          setScanMessage('扫描核验通过！已记录至智能加密锁环中。');
          setBiometrics(prevBio => ({ ...prevBio, [type]: true }));
          setTimeout(() => {
            setActiveScan(null);
            triggerToast(type === 'iris' ? '虹膜凭证核验录入成功！' : '凭证更新就绪！');
          }, 1000);
        }
        return next;
      });
    }, 200);
  };

  return (
    <div className="relative font-sans text-on-background animate-in fade-in duration-500 pb-20">
      <div className="ambient-glow" style={{ transform: 'translate(-50%, -44%)' }}></div>

      {/* Back Header */}
      <button 
        onClick={onBack}
        className="mb-6 inline-flex items-center gap-1.5 text-secondary hover:text-primary transition-colors text-sm font-semibold cursor-pointer"
      >
        <ArrowLeft size={16} />
        返回控制面板
      </button>

      {/* Heading */}
      <header className="mb-8">
        <h2 className="font-serif text-2xl lg:text-3xl text-primary font-bold tracking-tight mb-2">身份档案与凭证</h2>
        <p className="font-sans text-sm text-secondary">
          管理您深度脱敏后的数字生物特征密码钥以及您的法定身份证明扫描件，让解封交割合法合规。
        </p>
      </header>

      {/* Grid of Biometrics Tiles */}
      <section className="mb-10 space-y-6">
        <h3 className="font-serif text-base font-bold text-primary flex items-center gap-2">
          <Fingerprint size={18} className="text-blue-600" />
          数字遗传凭证 (生物识别密码对)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Fingerprint Tile */}
          <div className="glass-card rounded-2xl p-6 border border-slate-200/60 flex flex-col justify-between h-48 hover:shadow-md transition-all duration-300">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                <Fingerprint size={20} />
              </div>
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${biometrics.fingerprint ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-500'}`}>
                {biometrics.fingerprint ? '已激活' : '未导入'}
              </span>
            </div>

            <div>
              <h4 className="text-sm font-bold text-primary">高敏感触压指纹</h4>
              <p className="text-[11px] text-secondary mt-1">
                支持 10 核心指腹多维度细节记录防灾。
              </p>
            </div>

            <button 
              onClick={() => runBiometricScanner('fingerprint')}
              className="text-left text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
            >
              更新指纹样本 →
            </button>
          </div>

          {/* Face Mesh Tile */}
          <div className="glass-card rounded-2xl p-6 border border-slate-200/60 flex flex-col justify-between h-48 hover:shadow-md transition-all duration-300">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                <ScanFace size={20} />
              </div>
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${biometrics.face ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-500'}`}>
                {biometrics.face ? '已激活' : '未导入'}
              </span>
            </div>

            <div>
              <h4 className="text-sm font-bold text-primary">人脸深度网格模型</h4>
              <p className="text-[11px] text-secondary mt-1">
                基于 3D 景深多边形特征对齐，防抗电子拟真欺诈。
              </p>
            </div>

            <button 
              onClick={() => runBiometricScanner('face')}
              className="text-left text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
            >
              更新面部样本 →
            </button>
          </div>

          {/* Iris Scan Tile */}
          <div className="glass-card rounded-2xl p-6 border border-slate-200/60 flex flex-col justify-between h-48 hover:shadow-md transition-all duration-300">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                <Eye size={20} />
              </div>
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${biometrics.iris ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-400'}`}>
                {biometrics.iris ? '已激活' : '待补充'}
              </span>
            </div>

            <div>
              <h4 className="text-sm font-bold text-primary">非侵入虹膜记录</h4>
              <p className="text-[11px] text-secondary mt-1">
                最高防护等级。包含双眼不对称虹膜纹路核心密写资产。
              </p>
            </div>

            <button 
              onClick={() => runBiometricScanner('iris')}
              className="text-left text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
            >
              {biometrics.iris ? '更新虹膜凭证 →' : '录入虹膜密记 →'}
            </button>
          </div>
        </div>
      </section>

      {/* Section of Legal Documents */}
      <section className="space-y-6">
        <h3 className="font-serif text-base font-bold text-primary flex items-center gap-2">
          <FileText size={18} className="text-blue-600" />
          法定资产公证扫描件 (受主权保护)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Document 1: ID Card */}
          <div 
            onClick={() => setPreviewDoc('idcard')}
            className="group glass-card rounded-2xl overflow-hidden hover:border-blue-300 transition-all cursor-pointer shadow-sm relative h-56 flex flex-col justify-between p-5"
          >
            <div className="absolute inset-0 bg-cover bg-center opacity-10 group-hover:opacity-20 transition-opacity duration-300" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCCdQEdmCMZNiKPVbF9dBXXhIFhYLd7nBmeHxaP2DKcHI9dKE23PU8x07OR3vYTWmf2SBGTfw2YofRlHHR1oBV__rt-YhmG0FB9qo-3P5ZIpAixAfeWO6c5s7OWYTp8QW2l3zT6apx1oKlbg1MFFunwmP4qJyCTLjrXpoQheGkWuOaN3Kijuvw8zklFVZSf2McFXTfuUSHkCcLQ1q-jcbcUrlRw8hKqPiNXxhwCd2oJ6lJNuPn9vlJzeuddm15PgVSb9Y4bSb-fPf4')" }}></div>
            
            <div className="w-10 h-10 rounded-full bg-white/70 backdrop-blur shadow-sm flex items-center justify-center text-primary group-hover:scale-105 transition-transform shrink-0 relative z-10">
              <FileText size={18} className="text-blue-600" />
            </div>

            <div className="relative z-10 pt-10">
              <h4 className="text-sm font-bold text-primary">法定公民身份证件 (National ID)</h4>
              <p className="text-[10px] text-secondary mt-1">已进行深度防篡改区块链脱敏签名校验。</p>
            </div>
          </div>

          {/* Document 2: Passport */}
          <div 
            onClick={() => setPreviewDoc('passport')}
            className="group glass-card rounded-2xl overflow-hidden hover:border-blue-300 transition-all cursor-pointer shadow-sm relative h-56 flex flex-col justify-between p-5"
          >
            <div className="absolute inset-0 bg-cover bg-center opacity-10 group-hover:opacity-20 transition-opacity duration-300" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCBedk7utOB-jwR8HqC84BFyVk4UakhxcDZMAHyt3WqtxML0rxGxXJDdLkwW6PsvxtrlfZfLre_hOEMAnkigtWFLGgyLxGFVisGCtVXFhk4EuSV7sCzWTZRlxZeZJKCeJJrufJNMxOFUpfFPEkyiEpkLpi1kigvg6cJcZkSEKNr73oMUdABfRJyrPrvnCWB9anpe_cRNKxQSYv5SJd3OiUps9i1oGHF2KSc_872KI1a2vubncDxviZ78MeW3t-mRxkWw6cdQVbqAtc')" }}></div>

            <div className="w-10 h-10 rounded-full bg-white/70 backdrop-blur shadow-sm flex items-center justify-center text-primary group-hover:scale-105 transition-transform shrink-0 relative z-10">
              <FileText size={18} className="text-blue-600" />
            </div>

            <div className="relative z-10 pt-10">
              <h4 className="text-sm font-bold text-primary">高清电子护照备件 (E-Passport)</h4>
              <p className="text-[10px] text-secondary mt-1">含ICAO微芯片数字指纹特征证明。</p>
            </div>
          </div>

          {/* Document 3: Notary */}
          <div 
            onClick={() => setPreviewDoc('notary')}
            className="group glass-card rounded-2xl overflow-hidden hover:border-blue-300 transition-all cursor-pointer shadow-sm relative h-56 flex flex-col justify-between p-5"
          >
            <div className="absolute inset-0 bg-cover bg-center opacity-10 group-hover:opacity-20 transition-opacity duration-300" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuChWGbnSzjhzk47q1Rykpxz1mopZPVDrM2oFocgR5c0DO2_0tbY97z2zElzkbHOC80MEBAAH4Y4KMfbFGJvoNIY5hSGhyY7USNQuMEuaYhDdkmPuszwmZHUtaZkHv0KpirXhtzHlpHUTu13ixIaqXOCVaUM8mS0HsmA0fkCO3f3slCK9jfnzEg1kQfBBAlnPb2i4QbhG4Zyx3hSbnbC_HQwmr506YdiPOdOay090Zvg4d0kbErnM3Xad_yKUrpAI7mwzOA9knR5R60')" }}></div>

            <div className="w-10 h-10 rounded-full bg-white/70 backdrop-blur shadow-sm flex items-center justify-center text-primary group-hover:scale-105 transition-transform shrink-0 relative z-10">
              <FileText size={18} className="text-blue-600" />
            </div>

            <div className="relative z-10 pt-10">
              <h4 className="text-sm font-bold text-primary">公信公证法律见证签署书 (Notary Doc)</h4>
              <p className="text-[10px] text-secondary mt-1">苏黎世数字遗产法律见证中心专属托管包。</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- PHOTO OVERLAY OR DIALOG PREVIEW --- */}
      {previewDoc && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/35 backdrop-blur-md">
          <div className="absolute inset-0" onClick={() => setPreviewDoc(null)}></div>
          <div className="relative bg-white rounded-2xl p-5 w-full max-w-xl shadow-2xl border border-slate-200 flex flex-col max-h-[85vh] z-20 animate-fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4 shrink-0">
              <span className="text-xs font-bold text-primary uppercase tracking-wider">
                {previewDoc === 'idcard' ? '身份卡扫描核验预览' : previewDoc === 'passport' ? '电子护照深度哈希核验预览' : '智能合约签署证明'}
              </span>
              <button onClick={() => setPreviewDoc(null)} className="text-secondary p-1 rounded-full hover:bg-slate-100 cursor-pointer">
                <X size={16} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto flex items-center justify-center bg-slate-50 p-4 rounded-xl border border-slate-100">
              <img 
                alt="Doc Preview" 
                className="max-h-[50vh] object-contain rounded-lg subtle-shadow"
                src={
                  previewDoc === 'idcard' ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCdQEdmCMZNiKPVbF9dBXXhIFhYLd7nBmeHxaP2DKcHI9dKE23PU8x07OR3vYTWmf2SBGTfw2YofRlHHR1oBV_rt-YhmG0FB9qo-3P5ZIpAixAfeWO6c5s7OWYTp8QW2l3zT6apx1oKlbg1MFFunwmP4qJyCTLjrXpoQheGkWuOaN3Kijuvw8zklFVZSf2McFXTfuUSHkCcLQ1q-jcbcUrlRw8hKqPiNXxhwCd2oJ6lJNuPn9vlJzeuddm15PgVSb9Y4bSb-fPf4' :
                  previewDoc === 'passport' ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuCBedk7utOB-jwR8HqC84BFyVk4UakhxcDZMAHyt3WqtxML0rxGxXJDdLkwW6PsvxtrlfZfLre_hOEMAnkigtWFLGgyLxGFVisGCtVXFhk4EuSV7sCzWTZRlxZeZJKCeJJrufJNMxOFUpfFPEkyiEpkLpi1kigvg6cJcZkSEKNr73oMUdABfRJyrPrvnCWB9anpe_cRNKxQSYv5SJd3OiUps9i1oGHF2KSc_872KI1a2vubncDxviZ78MeW3t-mRxkWw6cdQVbqAtc' :
                  'https://lh3.googleusercontent.com/aida-public/AB6AXuChWGbnSzjhzk47q1Rykpxz1mopZPVDrM2oFocgR5c0DO2_0tbY97z2zElzkbHOC80MEBAAH4Y4KMfbFGJvoNIY5hSGhyY7USNQuMEuaYhDdkmPuszwmZHUtaZkHv0KpirXhtzHlpHUTu13ixIaqXOCVaUM8mS0HsmA0fkCO3f3slCK9jfnzEg1kQfBBAlnPb2i4QbhG4Zyx3hSbnbC_HQwmr506YdiPOdOay090Zvg4d0kbErnM3Xad_yKUrpAI7mwzOA9knR5R60'
                }
              />
            </div>
            
            <div className="pt-4 flex justify-between items-center shrink-0">
              <span className="text-[10px] text-secondary font-mono">校验哈希匹配：SHA256 OK</span>
              <button onClick={() => setPreviewDoc(null)} className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-lg shadow-blue-500/10 cursor-pointer">我知道了</button>
            </div>
          </div>
        </div>
      )}

      {/* --- BIOMETRICS SCANNER MOCK LOADER SCREEN --- */}
      {activeScan && (
        <div className="fixed inset-0 z-[120] bg-slate-900/40 backdrop-blur-xl flex flex-col items-center justify-center animate-fade-in">
          <div className="bg-slate-900 p-8 rounded-2xl w-full max-w-sm border border-slate-800 shadow-2xl flex flex-col items-center space-y-6 text-white">
            <div className="w-20 h-20 rounded-full border border-blue-500/30 flex items-center justify-center animate-pulse relative">
              <Camera size={32} className="text-blue-400 shrink-0" />
              {/* Spinning grid scanner lens circle */}
              <div className="absolute inset-0 border-2 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
            </div>

            <div className="text-center space-y-2 w-full">
              <h3 className="font-serif text-base font-bold text-white">数字凭证精密对正中</h3>
              <p className="text-[11px] text-slate-400 leading-normal min-h-[32px] flex items-center justify-center px-4">
                {scanMessage}
              </p>

              {/* Progress bar info */}
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden mt-3 max-w-[240px] mx-auto relative">
                <div className="absolute top-0 left-0 h-full bg-blue-500 rounded-full transition-all duration-300" style={{ width: `${scanProgress}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floated notification toast */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-full bg-slate-900 text-white text-xs subtle-shadow flex items-center gap-2 border border-slate-800 tracking-wider">
          <ShieldCheck size={14} className="text-blue-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
