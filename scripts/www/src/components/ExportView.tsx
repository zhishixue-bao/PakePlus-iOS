/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { FileDown, Archive, CheckSquare, Square, Check, Loader2, Sparkles, FolderArchive, ArrowLeft } from 'lucide-react';

interface ExportViewProps {
  onBack: () => void;
}

export default function ExportView({ onBack }: ExportViewProps) {
  // Checklist states
  const [packMemories, setPackMemories] = useState(true);
  const [packWill, setPackWill] = useState(true);
  const [packIdentity, setPackIdentity] = useState(false);

  // Format states
  const [format, setFormat] = useState<'pdf' | 'pdf-a' | 'zip'>('zip');

  // Generator engine states
  const [packing, setPacking] = useState(false);
  const [packProgress, setPackProgress] = useState(0);
  const [stageText, setStageText] = useState('');
  const [finished, setFinished] = useState(false);
  const [hash, setHash] = useState('');

  const runGenerator = () => {
    if (!packMemories && !packWill && !packIdentity) {
      alert('请至少选择一个留念模块进行导出打包！');
      return;
    }
    
    setPacking(true);
    setFinished(false);
    setPackProgress(0);
    setStageText('正在检索多存储冷备份底片数据块...');

    // Simulate packing sequence
    const interval = setInterval(() => {
      setPackProgress((prev) => {
        const next = prev + 5;
        if (next <= 30) {
          setStageText('正在提取超分辨率底片及无损音频通道...');
        } else if (next <= 60) {
          setStageText('正在签署苏黎世数字公证书、写入智能合约多签名受托钥匙锁扣...');
        } else if (next <= 90) {
          setStageText('正在拼封离线离线解耦微网页 (HTML/JS) 零延迟可视化游览工具...');
        } else if (next < 100) {
          setStageText('正在计算终极压缩哈希，写入元数据块...');
        } else {
          clearInterval(interval);
          setStageText('打包成功！完成本地密封签署。');
          setFinished(true);
          setPacking(false);
          setHash('0x9a3f8c87de6477bf209827011d87cfb3c9ec7374b88deef15dc595088eb7c9b0');
        }
        return next;
      });
    }, 150);
  };

  return (
    <div className="relative font-sans text-on-background animate-in fade-in duration-500 pb-20 max-w-lg mx-auto">
      <div className="ambient-glow" style={{ transform: 'translate(-50%, -46%)' }}></div>

      {/* Back to top */}
      <button 
        onClick={onBack}
        className="mb-6 inline-flex items-center gap-1.5 text-secondary hover:text-primary transition-colors text-sm font-semibold cursor-pointer"
      >
        <ArrowLeft size={16} />
        返回控制面板
      </button>

      {/* Heading */}
      <header className="mb-8">
        <h2 className="font-serif text-2xl lg:text-3xl text-primary font-bold tracking-tight mb-2">时光之钥的最后印记</h2>
        <p className="font-sans text-sm text-secondary leading-relaxed">
          导出您的完整备份包。它内置轻量解耦运行内核。即使失去网络，后人仍能直接双击在网页浏览器中零延迟解密观赏。
        </p>
      </header>

      {!packing && !finished ? (
        <div className="space-y-6">
          {/* Section 1: Checklist Select */}
          <div className="space-y-3">
            <span className="text-xs font-semibold text-secondary uppercase tracking-wider block">1. 涵盖备份资产项</span>
            
            <div className="space-y-2.5">
              {/* Item 1 */}
              <div 
                onClick={() => setPackMemories(!packMemories)}
                className="p-4 bg-white/45 glass-card rounded-xl border border-outline-variant/15 flex items-center justify-between cursor-pointer hover:border-primary/20 transition-all select-none"
              >
                <div className="flex items-center gap-3">
                  <Archive size={18} className="text-secondary shrink-0" />
                  <div>
                    <h4 className="text-xs font-semibold text-primary">成长回忆素材 (全部无损)</h4>
                    <p className="text-[10px] text-secondary mt-0.5">5 件照片及高保真音频底片。 预计大小: 1.2 GB</p>
                  </div>
                </div>
                {packMemories ? <CheckSquare size={18} className="text-primary" /> : <div className="w-[18px] h-[18px] border border-outline-variant rounded"></div>}
              </div>

              {/* Item 2 */}
              <div 
                onClick={() => setPackWill(!packWill)}
                className="p-4 bg-white/45 glass-card rounded-xl border border-outline-variant/15 flex items-center justify-between cursor-pointer hover:border-primary/20 transition-all select-none"
              >
                <div className="flex items-center gap-3">
                  <Archive size={18} className="text-secondary shrink-0" />
                  <div>
                    <h4 className="text-xs font-semibold text-primary">数字公证遗嘱草稿说明</h4>
                    <p className="text-[10px] text-secondary mt-0.5">防重写签名、钱包多签说明文档等。 预计大小: 15.4 MB</p>
                  </div>
                </div>
                {packWill ? <CheckSquare size={18} className="text-primary" /> : <div className="w-[18px] h-[18px] border border-outline-variant rounded"></div>}
              </div>

              {/* Item 3 */}
              <div 
                onClick={() => setPackIdentity(!packIdentity)}
                className="p-4 bg-white/45 glass-card rounded-xl border border-outline-variant/15 flex items-center justify-between cursor-pointer hover:border-primary/20 transition-all select-none"
              >
                <div className="flex items-center gap-3">
                  <Archive size={18} className="text-secondary shrink-0" />
                  <div>
                    <h4 className="text-xs font-semibold text-primary">生物深度识别哈希特征</h4>
                    <p className="text-[10px] text-secondary mt-0.5">虹膜、指纹模型比对校验库文件。 预计大小: 412 KB</p>
                  </div>
                </div>
                {packIdentity ? <CheckSquare size={18} className="text-primary" /> : <div className="w-[18px] h-[18px] border border-outline-variant rounded"></div>}
              </div>
            </div>
          </div>

          {/* Section 2: Format Choice */}
          <div className="space-y-3">
            <span className="text-xs font-semibold text-secondary uppercase tracking-wider block">2. 留念包格式</span>
            
            <div className="grid grid-cols-3 gap-3">
              <button 
                type="button"
                onClick={() => setFormat('zip')}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                  format === 'zip' 
                    ? 'border-primary bg-primary/5 text-primary shadow-sm' 
                    : 'border-outline-variant/30 hover:border-outline-variant hover:bg-white bg-white/20'
                }`}
              >
                <FolderArchive size={18} className="mb-2" />
                <h5 className="text-xs font-bold font-serif">ZIP打包</h5>
                <p className="text-[9px] text-[#595f63]/80 mt-1 leading-normal">完整网页离线包 (推荐)</p>
              </button>

              <button 
                type="button"
                onClick={() => setFormat('pdf-a')}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                  format === 'pdf-a' 
                    ? 'border-primary bg-primary/5 text-primary shadow-sm' 
                    : 'border-outline-variant/30 hover:border-outline-variant hover:bg-white bg-white/20'
                }`}
              >
                <FolderArchive size={18} className="mb-2" />
                <h5 className="text-xs font-bold font-serif">PDF/A-1b</h5>
                <p className="text-[9px] text-[#595f63]/80 mt-1 leading-normal">长期保存归档标准版</p>
              </button>

              <button 
                type="button"
                onClick={() => setFormat('pdf')}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                  format === 'pdf' 
                    ? 'border-primary bg-primary/5 text-primary shadow-sm' 
                    : 'border-outline-variant/30 hover:border-outline-variant hover:bg-white bg-white/20'
                }`}
              >
                <FolderArchive size={18} className="mb-2" />
                <h5 className="text-xs font-bold font-serif">标准 PDF</h5>
                <p className="text-[9px] text-[#595f63]/80 mt-1 leading-normal">普通阅读级备份格式</p>
              </button>
            </div>
          </div>

          {/* Action Trigger */}
          <div className="pt-4">
            <button 
              onClick={runGenerator}
              className="w-full bg-primary text-white py-4 rounded-xl font-semibold text-sm tracking-widest hover:bg-primary/95 transition-all shadow-lg shadow-primary/10 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
            >
              <FileDown size={18} />
              开始熔封导出纪念包
            </button>
          </div>
        </div>
      ) : packing ? (
        /* --- HIGH FIDELITY EXPORT LOADER ENGINE --- */
        <div className="glass-card rounded-2xl p-8 border border-outline-variant/15 text-center flex flex-col items-center justify-center space-y-6 min-h-[340px]">
          <div className="relative w-24 h-24 flex items-center justify-center">
            {/* Round spinner with percentages centered */}
            <div className="absolute inset-0 border-4 border-primary/10 rounded-full"></div>
            <div 
              className="absolute inset-0 border-4 border-l-transparent border-primary rounded-full animate-spin" 
              style={{ animationDuration: '1.2s' }}
            ></div>
            <span className="font-mono text-xl font-bold text-primary select-none mt-0.5">{packProgress}%</span>
          </div>

          <div className="space-y-2 max-w-sm">
            <h4 className="font-serif text-base font-bold text-primary flex items-center justify-center gap-1.5">
              <Sparkles size={14} className="animate-pulse" />
              正在铸造时光备份...
            </h4>
            <p className="text-xs text-secondary font-medium tracking-wide h-8 flex items-center justify-center">
              {stageText}
            </p>
          </div>
        </div>
      ) : (
        /* --- EMBOSSED FINISHED PACKAGE SCREEN --- */
        <div className="glass-card rounded-2xl p-8 border border-outline-variant/15 text-center flex flex-col items-center space-y-6 animate-zoom-in min-h-[340px]">
          <div className="w-16 h-16 rounded-full bg-primary/5 text-primary border border-primary/20 flex items-center justify-center">
            <Check size={32} />
          </div>

          <div className="space-y-2">
            <h4 className="font-serif text-lg font-bold text-primary">数字遗产留念包封印完成</h4>
            <div className="text-secondary text-xs leading-relaxed space-y-2 max-w-sm mx-auto">
              <p>恭喜，数据已经完全离网脱水密封。包含您的照片、法律文书及主权解密网页底本。</p>
              <div className="p-2.5 bg-surface-container-low border border-outline-variant/20 rounded font-mono text-[9px] break-all leading-normal text-left select-all">
                SHA-256 HASH:<br />
                {hash}
              </div>
            </div>
          </div>

          <button 
            onClick={() => {
              alert('时光防失联数字纪念包下载成功，请存放在您的私密硬件或冷盘中。');
              onBack();
            }}
            className="w-full bg-primary text-white py-3.5 rounded-xl text-xs font-semibold tracking-widest hover:bg-primary/95 transition-all cursor-pointer"
          >
            开始打包下载
          </button>
        </div>
      )}
    </div>
  );
}
