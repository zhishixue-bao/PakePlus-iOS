/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Memory } from '../types';
import { ArrowLeft, Bookmark, Lock, Download, Trash2, ShieldCheck, HelpCircle, Archive, AlertTriangle } from 'lucide-react';

interface MemoryDetailViewProps {
  memory: Memory;
  onBack: () => void;
  onUpdateMemoryAccess: (id: string, newAccess: 'public' | 'family' | 'private' | 'sealed') => void;
  onDeleteMemory: (id: string) => void;
}

export default function MemoryDetailView({ memory, onBack, onUpdateMemoryAccess, onDeleteMemory }: MemoryDetailViewProps) {
  const [activeImage, setActiveImage] = useState(memory.imageUrl || '');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showSealConfirm, setShowSealConfirm] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    triggerToast(!isBookmarked ? '已加入您的特别留念清单。' : '已从留念清单移除。');
  };

  const handleSeal = () => {
    onUpdateMemoryAccess(memory.id, 'sealed');
    setShowSealConfirm(false);
    triggerToast('此模块已被强制永久安全封存，解封钥匙已多签锁定。');
  };

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      triggerToast('单宗底片原始无损包 (RAW/DNG) 生成成功，已保存至您的本地。');
    }, 1500);
  };

  const handleDelete = () => {
    onDeleteMemory(memory.id);
    onBack();
  };

  return (
    <div className="relative font-sans text-on-background animate-in fade-in duration-500 pb-24">
      {/* Back Header */}
      <button 
        onClick={onBack}
        className="mb-6 inline-flex items-center gap-1.5 text-secondary hover:text-primary transition-colors text-sm font-semibold cursor-pointer"
      >
        <ArrowLeft size={16} />
        返回记忆档案室
      </button>

      {/* Hero Visual Area */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left column: Image showcase */}
        <div className="md:col-span-7 space-y-4">
          <div className="glass-card rounded-2xl overflow-hidden shadow-lg border border-outline-variant/20 max-h-[440px] flex items-center justify-center bg-surface-container-low relative group">
            {activeImage ? (
              <img 
                alt={memory.title} 
                className="w-full h-full object-cover rounded-xl"
                src={activeImage}
              />
            ) : (
              <div className="py-24 text-secondary/30">
                <Archive size={64} strokeWidth={1} />
              </div>
            )}

            {/* Glowing active badge */}
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#162839]/60 backdrop-blur-md text-white text-[10px] font-mono tracking-widest uppercase">
                {memory.type}
              </span>
            </div>
          </div>

          {/* Sub photos grid stack (interacting items) */}
          {memory.additionalImages && memory.additionalImages.length > 0 && (
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold tracking-wider text-secondary">
                切换多帧数字底片 ({memory.additionalImages.length + 1} 页扫描)
              </span>
              <div className="flex gap-2.5">
                {/* Thumb 1 (original preview) */}
                <button 
                  onClick={() => setActiveImage(memory.imageUrl || '')}
                  className={`w-16 h-16 rounded-xl border-2 overflow-hidden bg-surface-container-low transition-all cursor-pointer ${
                    activeImage === memory.imageUrl ? 'border-primary scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={memory.imageUrl} className="w-full h-full object-cover" alt="Main Thumb" />
                </button>

                {/* Additional Thumbs */}
                {memory.additionalImages.map((img, i) => (
                  <button 
                    key={i}
                    onClick={() => setActiveImage(img)}
                    className={`w-16 h-16 rounded-xl border-2 overflow-hidden bg-surface-container-low transition-all cursor-pointer ${
                      activeImage === img ? 'border-primary scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} className="w-full h-full object-cover" alt={`Thumb-${i}`} />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right column: Content information */}
        <div className="md:col-span-5 space-y-6">
          <div className="space-y-2">
            {/* Title */}
            <h1 className="font-serif text-2xl lg:text-3xl text-primary font-bold tracking-tight">
              {memory.title}
            </h1>
            
            <div className="flex items-center gap-3 text-xs text-secondary font-medium">
              <span className="font-mono">时期: {memory.date}</span>
              <span>•</span>
              <span>归属: {memory.uploader || '用户自身'}</span>
            </div>
          </div>

          {/* Narrative text block */}
          <div className="glass-card rounded-2xl p-6 border border-outline-variant/10 space-y-4">
            <h4 className="text-secondary font-semibold font-label-caps text-xs tracking-wider uppercase">主权铭文叙事录</h4>
            <div className="text-xs text-secondary leading-relaxed space-y-3 font-sans">
              <p className="whitespace-pre-wrap">{memory.extendedText || memory.description}</p>
            </div>
          </div>

          {/* Archival metadata */}
          {memory.archivalNotes && (
            <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant/20 space-y-1.5">
              <span className="text-[10px] font-bold tracking-widest text-[#595f63] uppercase">数字保管备忘</span>
              <p className="text-xs text-secondary leading-relaxed font-sans">{memory.archivalNotes}</p>
            </div>
          )}

          {/* Core controls toolbar */}
          <div className="grid grid-cols-4 gap-2 pt-2">
            {/* Favorite button */}
            <button 
              onClick={handleBookmark}
              title="星标准备"
              className={`py-3.5 rounded-xl border flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors ${
                isBookmarked 
                  ? 'bg-primary/5 border-primary text-primary' 
                  : 'bg-white border-outline-variant/30 text-secondary hover:text-primary hover:border-primary/40'
              }`}
            >
              <Bookmark size={16} className={isBookmarked ? 'fill-primary' : ''} />
              <span className="text-[9px] font-bold uppercase tracking-wider">留念</span>
            </button>

            {/* Seal override */}
            <button 
              onClick={() => setShowSealConfirm(true)}
              title="立即封印"
              disabled={memory.access === 'sealed'}
              className="py-3.5 rounded-xl bg-white border border-outline-variant/30 text-secondary hover:text-primary hover:border-primary/40 flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Lock size={16} />
              <span className="text-[9px] font-bold uppercase tracking-wider">
                {memory.access === 'sealed' ? '已封存' : '安全封存'}
              </span>
            </button>

            {/* Simulated direct download */}
            <button 
              onClick={handleDownload}
              title="导出原始包"
              disabled={downloading}
              className="py-3.5 rounded-xl bg-white border border-outline-variant/30 text-secondary hover:text-primary hover:border-primary/40 flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors"
            >
              <Download size={16} />
              <span className="text-[9px] font-bold uppercase tracking-wider">
                {downloading ? '生成中...' : '下载底片'}
              </span>
            </button>

            {/* Delete override */}
            <button 
              onClick={() => setShowDeleteConfirm(true)}
              title="彻底撕碎"
              className="py-3.5 rounded-xl bg-white border border-outline-variant/30 text-error hover:bg-error-container-low hover:border-error flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors"
            >
              <Trash2 size={16} />
              <span className="text-[9px] font-bold uppercase tracking-wider">删除档案</span>
            </button>
          </div>
        </div>
      </div>

      {/* --- CONFIRMATION DIALOG: DELETE CORE ASSET --- */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-inverse-surface/45 backdrop-blur-md" onClick={() => setShowDeleteConfirm(false)}></div>
          <div className="relative bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl border border-error-container-medium/20 text-center space-y-4 animate-fade-in z-20">
            <div className="w-12 h-12 rounded-full bg-error-container-low text-error mx-auto flex items-center justify-center">
              <AlertTriangle size={24} />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-serif text-lg font-bold text-primary">确定彻底焚毁此档案？</h3>
              <p className="font-sans text-xs text-secondary leading-relaxed">
                警告：这是一项物理级不可逆操作。记忆原始底片与叙事链块一旦销毁将永远消失，家庭托管网络将绝无办法为您找回。
              </p>
            </div>
            <div className="pt-2 flex gap-2">
              <button onClick={() => setShowDeleteConfirm(false)} className="flex-1 py-2.5 border border-outline-variant text-secondary rounded-xl text-xs font-semibold cursor-pointer">取消保留</button>
              <button onClick={handleDelete} className="flex-1 py-2.5 bg-error text-white rounded-xl text-xs font-semibold hover:bg-error/90 cursor-pointer">剥离销毁</button>
            </div>
          </div>
        </div>
      )}

      {/* --- CONFIRMATION DIALOG: FORCE SEAL OVERRIDE --- */}
      {showSealConfirm && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-inverse-surface/45 backdrop-blur-md" onClick={() => setShowSealConfirm(false)}></div>
          <div className="relative bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl border border-outline-variant/15 text-center space-y-4 animate-fade-in z-20">
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center">
              <Lock size={20} />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-serif text-lg font-bold text-primary">强制转换为【绝对封存】状态？</h3>
              <p className="font-sans text-xs text-secondary leading-relaxed">
                设置为【绝对封存】后，此模块只能通过多签钥匙或系统周期验证才能查看。
              </p>
            </div>
            <div className="pt-2 flex gap-2">
              <button onClick={() => setShowSealConfirm(false)} className="flex-1 py-2.5 border border-outline-variant text-secondary rounded-xl text-xs font-semibold cursor-pointer">取消</button>
              <button onClick={handleSeal} className="flex-1 py-2.5 bg-[#162839] text-white rounded-xl text-xs font-semibold hover:bg-primary cursor-pointer">密封锁定</button>
            </div>
          </div>
        </div>
      )}

      {/* Floated notification toast */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-full bg-primary text-white text-xs subtle-shadow flex items-center gap-2 border border-outline-variant/20 tracking-wider">
          <ShieldCheck size={14} className="text-primary-fixed-dim" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
