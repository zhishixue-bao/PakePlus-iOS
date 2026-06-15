/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Memory } from '../types';
import { Plus, Image, FileText, Volume2, ShieldAlert, Sparkles, X, ChevronRight, BookmarkCheck } from 'lucide-react';

interface MemoriesViewProps {
  memoriesList: Memory[];
  onSelectMemory: (id: string) => void;
  onAddMemory: (newMem: Memory) => void;
}

const filterOptions: { label: string; value: 'all' | 'public' | 'family' | 'private' | 'sealed' }[] = [
  { label: '全部', value: 'all' },
  { label: '公开', value: 'public' },
  { label: '家族', value: 'family' },
  { label: '私密', value: 'private' },
  { label: '已封存', value: 'sealed' }
];

export default function MemoriesView({ memoriesList, onSelectMemory, onAddMemory }: MemoriesViewProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'public' | 'family' | 'private' | 'sealed'>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form states for new memory
  const [title, setTitle] = useState('');
  const [access, setAccess] = useState<'public' | 'family' | 'private' | 'sealed'>('public');
  const [description, setDescription] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [photoTemplate, setPhotoTemplate] = useState('aurora');

  const photoTemplates: Record<string, string> = {
    aurora: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDK4yzq0YTWnNFeonG-Jzuz_Dv8mBGEpC8QHlu0lW0Hxea0t_3EOXhwZRO30d7gMdkM6bxtQDWwdm8pECPXmEwOGlq8T0xEWSUnAxNhl9gjuPwvQ7cVgJtxW4EEKB-9BEh070Xc7DFbaHCFeixa2_opp3tIUMgfT5DJ6oVMhqH1d_fuPvSZQkBlF7gvp_hjf23dz83tUj8Cm1C7kxvpFZ0naYSTIc2kM00V-K2W9_Fs-Dcibee9LuKGG0jAv9pwSTeaO-QbjA8VQ2c',
    desk: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3u6Cwl9v58cdzMoApCcEvtmzNOXG1rd7ZcjTKQaPRLGopNb6N-S_zciuIEEhyZjpJEZaMwdSj3ld31oQCNGF5wjEjdfYXCaf8GoadcbxjT0PeVu0h6bMHRMjuK0y5oRhxxYGcq7ySqs3i86DcF7W3IlbGbkL_zWliImU03xS2dpvrUtSz4z7Ct6_jyCNodhth3M0fSY42aJhZ9mt5ZCOrVzSAMDHkQ3C2x7zPWzvdKvFtJNv28dfFXURUk3UaMctTmNHRmiObHPM',
    oldhouse: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9SQc886gBTW6hALii62JlBNS0uWrI43P810rZTa4i34ElaGGt3EXeu93NIb9yTrwfJgP98x1E3-wt501sr2OqLIrIj3zggu-JBsfhiS19T20ry5UBDUZ9deKNz0jnsE6FosJq6J6xiV9FyKwM63QPXQ31Ld_xywwI-jlGvwFDQTq3O8OdHv2fgiXg8TmW50ZZAMCHwSvKkVc2Pi2uA8CcLYbPB46Uv87e33tZNE28Outv7cvDgKx1khjw24YjDPb70Sm235qqXjo'
  };

  const filteredMemories = memoriesList.filter(mem => {
    if (activeFilter === 'all') return true;
    return mem.access === activeFilter;
  });

  const getMediaIcon = (type: string) => {
    switch (type) {
      case 'audio': return <Volume2 size={16} />;
      case 'document': return <FileText size={16} />;
      default: return <Image size={16} />;
    }
  };

  const getAccessColor = (access: string) => {
    switch (access) {
      case 'public': return 'bg-primary-fixed/20 text-primary border-primary/20';
      case 'family': return 'bg-surface-container-low text-[#f57c00] border-[#ffe082]/20';
      case 'private': return 'bg-error-container-low text-error border-error-container-medium/20';
      default: return 'bg-surface-container-high text-secondary border-outline-variant/30';
    }
  };

  const getAccessLabel = (access: string) => {
    switch (access) {
      case 'public': return '公开神龛';
      case 'family': return '家族遗产';
      case 'private': return '完全私密';
      default: return '绝对封存';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    const tags = tagsInput ? tagsInput.split(',').map(t => t.trim()) : [getAccessLabel(access)];
    
    const newMem: Memory = {
      id: `mem-${Date.now()}`,
      title,
      date: new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '.'),
      type: photoTemplate ? 'image' : 'document',
      tags,
      access,
      description,
      extendedText: description,
      imageUrl: photoTemplates[photoTemplate] || undefined,
      uploader: '用户自身',
      archivalNotes: '刚刚通过安全端上传，哈希检验成功，已加入备份调度链。'
    };

    onAddMemory(newMem);
    setShowAddModal(false);
    
    // reset
    setTitle('');
    setDescription('');
    setTagsInput('');
    setAccess('public');

    setToastMessage('成功添加记忆资产，数据正在同步至冷信托备份中！');
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="relative font-sans text-on-background animate-in fade-in duration-500">
      <div className="ambient-glow" style={{ transform: 'translate(-50%, -40%)' }}></div>

      {/* Title Header */}
      <header className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl lg:text-3xl text-primary font-bold tracking-tight mb-2">记忆档案室</h2>
          <p className="font-sans text-sm text-secondary">保存、整理与封存您的照片、书信音频以及终极亲笔印记。</p>
        </div>

        {/* Create Memory trigger */}
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-5 py-3 text-sm font-semibold tracking-wide shadow-lg shadow-blue-500/10 flex items-center justify-center gap-1.5 self-start cursor-pointer transition-all active:scale-[0.98]"
        >
          <Plus size={16} />
          <span>添加新记忆</span>
        </button>
      </header>

      {/* Filter Options slider */}
      <div className="flex gap-2.5 overflow-x-auto pb-4 pt-1 hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
        {filterOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setActiveFilter(opt.value)}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider whitespace-nowrap transition-all border cursor-pointer ${
              activeFilter === opt.value
                ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200'
                : 'bg-white text-secondary border-slate-200 hover:bg-slate-50 hover:border-slate-300'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Memory Grid/Timeline List */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 pb-20">
        {filteredMemories.map((mem) => (
          <div 
            key={mem.id}
            onClick={() => onSelectMemory(mem.id)}
            className="group glass-card rounded-2xl overflow-hidden hover:scale-[1.01] hover:border-primary/20 transition-all duration-300 flex flex-col h-[320px] cursor-pointer"
          >
            {/* Header image/media placeholder */}
            <div className="relative h-44 bg-surface-container-high/60 overflow-hidden shrink-0">
              {mem.imageUrl ? (
                <>
                  <img 
                    alt={mem.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    src={mem.imageUrl}
                  />
                  {/* Subtle glass overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#162839]/60 to-transparent opacity-40 group-hover:opacity-20 transition-opacity"></div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-secondary/40">
                  <FileText size={48} strokeWidth={1} />
                </div>
              )}

              {/* Badges in visual frame */}
              <div className="absolute top-3 left-3 flex gap-1.5">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-bold select-none backdrop-blur-md ${getAccessColor(mem.access)}`}>
                  {getMediaIcon(mem.type)}
                  {getAccessLabel(mem.access)}
                </span>
              </div>

              {/* Archive Date */}
              <div className="absolute bottom-3 right-3 text-[10px] font-mono tracking-widest text-white/90 font-medium px-2 py-0.5 rounded bg-[#162839]/40 backdrop-blur-sm">
                {mem.date}
              </div>
            </div>

            {/* Bottom: Text body */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div className="space-y-1.5">
                <h4 className="font-serif text-lg text-primary font-bold line-clamp-1 group-hover:text-primary-fixed-dim transition-colors">
                  {mem.title}
                </h4>
                <p className="text-xs text-secondary leading-relaxed line-clamp-3">
                  {mem.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-outline-variant/10 text-[11px] text-secondary/70">
                <div className="flex gap-1.5">
                  {mem.tags.slice(0, 2).map((tag, i) => (
                    <span key={i} className="px-2 py-0.5 bg-surface-container rounded-sm">#{tag}</span>
                  ))}
                </div>
                <span className="flex items-center text-primary group-hover:translate-x-0.5 transition-transform font-semibold">
                  浏览
                  <ChevronRight size={12} />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- FLOATING DIALOG: ADD NEW MEMORY --- */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/35 backdrop-blur-md" onClick={() => setShowAddModal(false)}></div>
          <div className="relative bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl border border-slate-200/60 animate-fade-in flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/50 mb-4 shrink-0">
              <div className="flex items-center gap-2 text-primary font-semibold font-serif text-base">
                <Sparkles size={16} className="text-blue-600" />
                <span>撰刻全新记忆资产</span>
              </div>
              <button onClick={() => setShowAddModal(false)} className="text-secondary p-1 rounded-full hover:bg-slate-100 cursor-pointer">
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="overflow-y-auto space-y-4 pr-1 flex-1 py-1 hide-scrollbar">
              {/* Title */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-secondary uppercase tracking-wider">记忆标题</label>
                <input 
                  type="text" 
                  required
                  placeholder="给记忆起一个雅致的名字"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-primary bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* Access type */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-secondary uppercase tracking-wider">可见度 / 支配等级</label>
                <select 
                  value={access}
                  onChange={(e: any) => setAccess(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-primary bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option value="public">公开神龛 (允许后人及公众游览留言)</option>
                  <option value="family">家族记忆 (仅限指定血亲/继承人解密)</option>
                  <option value="private">绝对私密 (仅限您个人在唤醒日解密)</option>
                  <option value="sealed">绝对封存 (静默期间及到期后绝对锁定)</option>
                </select>
              </div>

              {/* Sample Photo hotlink placeholder */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-secondary uppercase tracking-wider">配图模版</label>
                <div className="grid grid-cols-3 gap-2">
                  <button 
                    type="button" 
                    onClick={() => setPhotoTemplate('aurora')}
                    className={`p-1.5 rounded-lg border text-[10px] text-center font-medium cursor-pointer transition-colors ${photoTemplate === 'aurora' ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-slate-200 hover:bg-slate-50'}`}
                  >
                    深空极光
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setPhotoTemplate('desk')}
                    className={`p-1.5 rounded-lg border text-[10px] text-center font-medium cursor-pointer transition-colors ${photoTemplate === 'desk' ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-slate-200 hover:bg-slate-50'}`}
                  >
                    时光书桌
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setPhotoTemplate('oldhouse')}
                    className={`p-1.5 rounded-lg border text-[10px] text-center font-medium cursor-pointer transition-colors ${photoTemplate === 'oldhouse' ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-slate-200 hover:bg-slate-50'}`}
                  >
                    老宅枣树
                  </button>
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-secondary uppercase tracking-wider">标签(以逗号分隔)</label>
                <input 
                  type="text" 
                  placeholder="如: 怀旧, 年前, 录音, 游记"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-primary bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* Content Description */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-secondary uppercase tracking-wider">记忆描述 / 亲笔陈述</label>
                <textarea 
                  required
                  rows={4}
                  placeholder="在这里倾注您的内心感受或事件背后的尘封故事..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-primary bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 leading-relaxed resize-none"
                />
              </div>

              {/* Extra warnings */}
              <p className="text-[10px] text-amber-600 leading-relaxed flex items-center gap-1 bg-amber-50 p-2 border border-amber-200/50 rounded">
                <ShieldAlert size={12} className="shrink-0" />
                所有记忆一经发布，核心标识符都将由智能合约锁死校验，不可篡改。
              </p>
            </form>
            
            <div className="pt-3 border-t border-slate-200/50 pt-4 flex justify-end gap-2 shrink-0">
              <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 border border-slate-200 text-secondary rounded-lg text-xs font-semibold hover:bg-slate-50 cursor-pointer">取消</button>
              <button type="button" onClick={handleSubmit} className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-lg shadow-blue-500/10 cursor-pointer">铸入档案</button>
            </div>
          </div>
        </div>
      )}

      {/* Top right floating notification toast */}
      {toastMessage && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-full bg-slate-900 text-white text-xs subtle-shadow flex items-center gap-2 border border-slate-800 tracking-wider">
          <BookmarkCheck size={14} className="text-blue-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
