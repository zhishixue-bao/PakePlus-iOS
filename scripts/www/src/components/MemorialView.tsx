/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Heart, MessageSquare, Flower2, Gift, Send, Sparkles, AlertCircle, ArrowLeft } from 'lucide-react';

interface TributeMessage {
  id: string;
  author: string;
  content: string;
  timestamp: string;
}

interface MemorialViewProps {
  onBack?: () => void;
  showBackButton?: boolean;
}

export default function MemorialView({ onBack, showBackButton = false }: MemorialViewProps) {
  // Respecting the real lifespan and epitaph of Zhang Weiming on Screen 4
  const [flowerCount, setFlowerCount] = useState(1284);
  const [candleCount, setCandleCount] = useState(452);
  const [tributes, setTributes] = useState<TributeMessage[]>([
    { id: 't1', author: '秦知远 (生前老友)', content: '伟明，每当夜里翻起你在荒原拍的那卷底片，我都感觉你从没离开过。那片极光还在，灵魂亦在。', timestamp: '2 小时前' },
    { id: 't2', author: '张莉蕾 (大女儿)', content: '爸，今天是您的祭日，我们在老宅院子的枣树下给您倒了一杯茶。神龛保管得很好，一切安心。', timestamp: '1 天前' },
    { id: 't3', author: '陈清和', content: '感谢前辈留下的建筑草图，数字重构时我们精准拾取了所有的几何柱头构想，不负嘱托。', timestamp: '3 天前' }
  ]);

  const [newAuthor, setNewAuthor] = useState('');
  const [newContent, setNewContent] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSponsorFlower = () => {
    setFlowerCount((prev) => prev + 1);
    triggerToast('您已向张伟明数字碑台敬献一束圣洁郁金香，数字温度+1。');
  };

  const handleSponsorCandle = () => {
    setCandleCount((prev) => prev + 1);
    triggerToast('您已在墓碑前点亮一盏不灭之灯。烛火在主权网络中永恒长夜守护。');
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handlePostTribute = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor || !newContent) return;

    const newTr: TributeMessage = {
      id: `t-${Date.now()}`,
      author: newAuthor,
      content: newContent,
      timestamp: '刚刚'
    };

    setTributes([newTr, ...tributes]);
    setNewAuthor('');
    setNewContent('');

    triggerToast('留言已在纪念碑成功挂载，数据同步完成！');
  };

  return (
    <div className="relative font-sans text-on-background animate-in fade-in duration-500 pb-28">
      <div className="ambient-glow" style={{ transform: 'translate(-50%, -43%)' }}></div>

      {showBackButton && onBack && (
        <button 
          onClick={onBack}
          className="mb-6 inline-flex items-center gap-1.5 text-secondary hover:text-primary transition-colors text-sm font-semibold cursor-pointer"
        >
          <ArrowLeft size={16} />
          返回访客模式首页
        </button>
      )}

      {/* Monument Frame Header */}
      <header className="mb-8 text-center md:text-left">
        <h2 className="font-serif text-2xl lg:text-3xl text-primary font-bold tracking-tight mb-2">
          张伟明的数字纪念堂
        </h2>
        <p className="font-sans text-xs tracking-widest text-secondary font-semibold uppercase">
          公共纪念林 • Memorial Hall of Zhang Weiming
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left column: Portrait and Epitaph Card */}
        <div className="md:col-span-4 space-y-6">
          <div className="glass-card rounded-2xl p-6 border border-outline-variant/20 flex flex-col items-center text-center">
            {/* Zhang Weiming Portrait Hotlink from design metadata */}
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-xl mb-6 relative">
              <img 
                alt="Zhang Weiming Portrait" 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAc0oJL1JMUHNUUYd1Lp1dKQXSKa2CqjdnkrpN8Mb9akZDCp86zeToUHFesO_YfB0sMf4xJSfl-aHtiTnjJ8VIAub1nfAylHk5zGdxeiPx7nz_9dyIgH1MocMOpZuFxSPoOr0zJXsErTXf6QtoSmxq-i1WWKtxRSfsWKITb4nSBbfUZc4kLSGkRYbVlVk6Cv8VOXhGuJ27wGvdhvOh1PRz1F77CXT0KIFrUprBr4FklnGmBN51_RCdSa_q_ixOIF74m7qI8KyA7PM"
              />
            </div>

            <div className="space-y-1">
              <h3 className="font-serif text-xl font-bold text-primary">张伟明</h3>
              <p className="font-mono text-xs text-secondary font-medium uppercase tracking-widest">
                1956.04.12 - 2043.11.24
              </p>
            </div>

            <p className="font-serif text-xs text-secondary italic leading-relaxed pt-5 border-t border-outline-variant/10 mt-5 max-w-[280px]">
              “笔耕不辍，灵魂不息。愿我们在电子光流中再次相逢。”<br />
              <span className="font-sans text-[10px] text-secondary/60 mt-1.5 block not-italic">
                资深建筑师、摄影师，用二十次远行丈量地球的最真挚旅人。
              </span>
            </p>
          </div>

          {/* Interactive Tribute panel */}
          <div className="glass-card rounded-2xl p-5 border border-outline-variant/15 space-y-4">
            <h4 className="text-xs font-bold text-primary uppercase tracking-widest flex items-center gap-1">
              <Sparkles size={12} className="text-primary-fixed-dim" />
              寄托哀思
            </h4>

            <div className="grid grid-cols-2 gap-3.5">
              {/* Sponsor Flower */}
              <button 
                onClick={handleSponsorFlower}
                className="p-3 bg-white/50 hover:bg-white border border-outline-variant/20 hover:border-primary/20 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95 shadow-sm"
              >
                <Flower2 size={20} className="text-primary/70 hover:scale-105 duration-300" />
                <span className="text-[10px] font-bold text-primary">敬献心香</span>
                <span className="font-mono text-xs text-secondary font-semibold">{flowerCount} 支</span>
              </button>

              {/* Sponsor Candle */}
              <button 
                onClick={handleSponsorCandle}
                className="p-3 bg-white/50 hover:bg-white border border-outline-variant/20 hover:border-primary/20 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95 shadow-sm"
              >
                <Gift size={20} className="text-primary/70 hover:scale-105 duration-300" />
                <span className="text-[10px] font-bold text-primary">燃亮不灭灯</span>
                <span className="font-mono text-xs text-secondary font-semibold">{candleCount} 盏</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right column: Public Memories and Message Boards */}
        <div className="md:col-span-8 space-y-8">
          {/* Public Legacy items */}
          <div className="space-y-4">
            <h4 className="font-serif text-base font-bold text-primary flex items-center gap-2">
              <Heart size={16} className="text-[#f43f5e]" />
              生前公开留念作
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Card 1 */}
              <div className="glass-card rounded-xl overflow-hidden hover:scale-[1.01] transition-transform h-48 relative flex flex-col justify-end p-4">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDK4yzq0YTWnNFeonG-Jzuz_Dv8mBGEpC8QHlu0lW0Hxea0t_3EOXhwZRO30d7gMdkM6bxtQDWwdm8pECPXmEwOGlq8T0xEWSUnAxNhl9gjuPwvQ7cVgJtxW4EEKB-9BEh070Xc7DFbaHCFeixa2_opp3tIUMgfT5DJ6oVMhqH1d_fuPvSZQkBlF7gvp_hjf23dz83tUj8Cm1C7kxvpFZ0naYSTIc2kM00V-K2W9_Fs-Dcibee9LuKGG0jAv9pwSTeaO-QbjA8VQ2c" className="absolute inset-0 w-full h-full object-cover" alt="Aurora" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="relative z-10 text-white space-y-1">
                  <span className="inline-flex items-center px-2 py-0.5 rounded bg-white/20 text-[9px] uppercase tracking-wide">摄影</span>
                  <h5 className="font-serif text-sm font-bold">北极圈斯瓦尔巴日记集</h5>
                  <p className="text-[10px] text-white/70">“这是我见过的温度最低生命最亮的地方。”</p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="glass-card rounded-xl overflow-hidden hover:scale-[1.01] transition-transform h-48 relative flex flex-col justify-end p-4">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9SQc886gBTW6hALii62JlBNS0uWrI43P810rZTa4i34ElaGGt3EXeu93NIb9yTrwfJgP98x1E3-wt501sr2OqLIrIj3zggu-JBsfhiS19T20ry5UBDUZ9deKNz0jnsE6FosJq6J6xiV9FyKwM63QPXQ31Ld_xywwI-jlGvwFDQTq3O8OdHv2fgiXg8TmW50ZZAMCHwSvKkVc2Pi2uA8CcLYbPB46Uv87e33tZNE28Outv7cvDgKx1khjw24YjDPb70Sm235qqXjo" className="absolute inset-0 w-full h-full object-cover" alt="Old House" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="relative z-10 text-white space-y-1">
                  <span className="inline-flex items-center px-2 py-0.5 rounded bg-white/20 text-[9px] uppercase tracking-wide">叙事老宅</span>
                  <h5 className="font-serif text-sm font-bold">黄昏枣树下的祖辈手迹</h5>
                  <p className="text-[10px] text-white/70">中原黄河老屋推土前的底稿全景，留存家族之宿根。</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tribute Board Message list */}
          <div className="space-y-4">
            <h4 className="font-serif text-base font-bold text-primary flex items-center gap-2">
              <MessageSquare size={16} className="text-secondary" />
              时空留言笺 ({tributes.length})
            </h4>

            {/* Input Board */}
            <form onSubmit={handlePostTribute} className="p-4 bg-white/45 glass-card rounded-2xl border border-outline-variant/15 space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input 
                  type="text" 
                  required
                  placeholder="您的尊姓大名"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  className="border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-3 py-2 text-xs bg-white text-primary placeholder-[#595f63]/70 font-semibold"
                />
              </div>

              <div className="relative">
                <textarea 
                  required
                  rows={2}
                  maxLength={150}
                  placeholder="在此写下对逝者的祝福与致敬吧（限150字内）..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-3 py-2.5 text-xs bg-white text-primary leading-relaxed resize-none font-sans"
                />
                
                <button 
                  type="submit"
                  className="absolute bottom-3 right-3 p-2 bg-[#162839] hover:bg-primary text-white rounded-lg transition-colors cursor-pointer"
                  title="寄托哀思"
                >
                  <Send size={12} />
                </button>
              </div>
            </form>

            {/* Render List */}
            <div className="space-y-4">
              {tributes.map((tr) => (
                <div key={tr.id} className="p-4 bg-white/45 glass-card border border-outline-variant/10 rounded-xl space-y-1.5 animate-in slide-in-from-top-3 duration-500">
                  <div className="flex justify-between items-baseline shrink-0">
                    <span className="font-serif text-xs font-bold text-primary">{tr.author}</span>
                    <span className="font-mono text-[9px] text-[#595f63]/50">{tr.timestamp}</span>
                  </div>
                  <p className="font-sans text-xs text-secondary leading-relaxed font-semibold">
                    {tr.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating notification alert */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-full bg-primary text-white text-xs subtle-shadow flex items-center gap-2 border border-outline-variant/20 tracking-wider">
          <Sparkles size={14} className="text-secondary-fixed-dim shrink-0 animate-spin" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
