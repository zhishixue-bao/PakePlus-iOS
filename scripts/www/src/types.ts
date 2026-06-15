/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ScreenType =
  | 'landing'
  | 'login'
  | 'register'
  | 'visitor'
  | 'user-home'
  | 'memories'
  | 'memory-detail'
  | 'permissions'
  | 'sealed'
  | 'export'
  | 'identity'
  | 'linked-accounts'
  | 'logs';

export interface LinkedAccount {
  id: string;
  name: string;
  username: string;
  type: 'social' | 'work' | 'cloud' | 'blockchain';
  status: 'active' | 'disconnected';
  meta: string;
}

export interface Memory {
  id: string;
  title: string;
  date: string;
  type: 'image' | 'document' | 'audio' | 'image-stack';
  tags: string[];
  access: 'public' | 'family' | 'private' | 'sealed';
  description: string;
  extendedText?: string;
  imageUrl?: string;
  additionalImages?: string[];
  fileSize?: string;
  duration?: string;
  uploader?: string;
  archivalNotes?: string;
}

export interface SealedLog {
  id: string;
  title: string;
  timestamp: string;
  operator: string;
  status: 'success' | 'finished' | 'passed' | 'blocked';
  statusLabel: string;
  type: string;
}

export interface Biometrics {
  fingerprintRecorded: boolean;
  faceScanned: boolean;
  irisScanned: boolean;
}

// Initial Mock Datasets
export const initialAccounts: LinkedAccount[] = [
  {
    id: 'twitter',
    name: 'Twitter / X',
    username: '@digital_curator_01',
    type: 'social',
    status: 'active',
    meta: '上次同步: 2小时前'
  },
  {
    id: 'github',
    name: 'GitHub Workspace',
    username: 'vault-admin-matrix',
    type: 'work',
    status: 'disconnected',
    meta: '需要重新认证'
  },
  {
    id: 'gdrive',
    name: 'Google Drive',
    username: 'vault.legacy@gmail.com',
    type: 'cloud',
    status: 'active',
    meta: '存储: 1.2 TB / 2.0 TB'
  },
  {
    id: 'ethereum',
    name: 'Ethereum Core Vault',
    username: '0x71C...92bD (Cold Storage Archive)',
    type: 'blockchain',
    status: 'active',
    meta: '状态: 已加密锁定 | 同步: 实时见证中'
  },
  {
    id: 'instagram',
    name: 'Instagram Archive',
    username: 'echo.memories_official',
    type: 'social',
    status: 'active',
    meta: '媒体库: 4,209 项'
  }
];

export const initialMemories: Memory[] = [
  {
    id: 'aurora',
    title: '斯瓦尔巴群岛的极光记录',
    date: '2023.10.15',
    type: 'image',
    tags: ['公开', '怀旧'],
    access: 'public',
    description: '在最北境的夜空里，绿色的极光像舞动的绸缎，照亮了冰封的海面。那天没有风，只有冰川偶尔断裂的沉闷声响。这些照片里不只是电磁风暴的残影，还有我对那片静谧星空的最深敬畏。',
    extendedText: '那天深冬的斯瓦尔巴，寒冷甚至让呼吸都在空气中瞬间结晶。我们架起三角架，在零下三十度的极夜中等候了数个小时，直到夜空突然被那抹神秘的绿色绸缎点燃。极光在天幕中翻滚、聚拢、又缓缓散开。那一刻时间仿佛彻底失去了意义。我将这批珍贵的极光原始记录存入神龛，让未来的继承者们，也能看见这抹穿越时空的北境之光，感受到我们曾在这个脆弱而又伟大的蓝色星球上呼吸、仰望。',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDK4yzq0YTWnNFeonG-Jzuz_Dv8mBGEpC8QHlu0lW0Hxea0t_3EOXhwZRO30d7gMdkM6bxtQDWwdm8pECPXmEwOGlq8T0xEWSUnAxNhl9gjuPwvQ7cVgJtxW4EEKB-9BEh070Xc7DFbaHCFeixa2_opp3tIUMgfT5DJ6oVMhqH1d_fuPvSZQkBlF7gvp_hjf23dz83tUj8Cm1C7kxvpFZ0naYSTIc2kM00V-K2W9_Fs-Dcibee9LuKGG0jAv9pwSTeaO-QbjA8VQ2c',
    uploader: '用户自身',
    archivalNotes: '包含 5 张无损 RAW 格式底片记录，色彩配置文件为 ProPhoto RGB。'
  },
  {
    id: 'draft',
    title: '生前预嘱及数字资产分配草案',
    date: '2024.01.02',
    type: 'document',
    tags: ['法律文件', '私密'],
    access: 'private',
    description: '包含加密货币钱包密钥位置说明、数字版权归属、以及社交平台账号在进入静默期后的移交、托管或彻底销毁托管协议细节。',
    extendedText: '本草案旨在对我名下的各类数字资产及遗产权属进行系统的整理与安排。包括：在多签托管合约中的加密货币私钥备份保险箱索引；本人撰写的软件项目与博客文章的知识共享(Creative Commons)继承权分配；以及个人社交媒体平台在本人静默周期触发90天后的自动停用、删档或转为纪念模式的配置说明。所有条款均经由苏黎世数字公证处见证，并通过智能合约实现自动执行保障。',
    uploader: '核心律师',
    archivalNotes: '具有法律公证效力的PDF文档，包含防篡改数字签名时间戳。'
  },
  {
    id: 'future-voice',
    title: '给三十年后的留言',
    date: '2022.05.20',
    type: 'audio',
    tags: ['家族', '留言'],
    access: 'family',
    description: '"无论走到哪里，记得带上自己的阳光。" 留给下一代在成年礼仪式或解封日上聆听的录音，蕴含对未来的祝愿。',
    extendedText: '“孩子们，当你们听到这段录音时，可能已经是三十年后了。你们眼中的世界，或许比我想象的还要奇妙。科技在延伸我们的感官，但请永远不要忘记，对一朵花的盛开感到惊奇，永远保持对未知的敬畏，以及在困境中，懂得带上心底的阳光。这段声音是多年前在一个春日的午后录下的，录音机旁还有鸟鸣。愿这股跨越时空的声音，能给未来你们的生命旅途提供些许温热。”',
    duration: '03:45',
    uploader: '用户自身',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrDR5R0qCVrhb5FegGLiF_s4ft01D2XVLxb4l9xEAs8TJG1bLtOjn64iRL-6fRmnPf95z0jqWmxp7HpiHUYrNlDDJf6i81HW0i923ZjFw1FOwAQrcm1rbu7lRV2YTRZjsv7_2-so_qPmFFQZRXgFlU4P_tc5Jo2avyiz1NdE4QjuPbAeiU0aFbEvm6vOYILZiQRix4mMHc0AI1MKm-RxQPfaDYFv-04Hzg3H31i4NUpWZTJo_L32wDGaDfuTUIDsVG7Dv5lRAaf-k',
    archivalNotes: '高保真 WAV 音频档案，已针对声码特征进行降噪与寿命优化。'
  },
  {
    id: 'desk',
    title: '秋日的旧书桌',
    date: '2023.10.15',
    type: 'image-stack',
    tags: ['宁静', '怀旧'],
    access: 'sealed',
    description: '那天下午的阳光透过百叶窗，在实木书桌上切出整齐的条纹。房间里静悄悄的，只能听到挂钟秒针微弱的机械摩擦声。我们整理着这些旧物，每一件都像是一个被时间封印的胶囊。这是祖父留下的最后一批笔记，字迹已经有些模糊。',
    extendedText: '这是祖父留下的最后一批笔记，字迹已经有些模糊，纸张边缘泛黄发脆。系统在扫描这些页面时，仿佛也在轻柔地抚摸着这些记忆的纹理。我决定将它们完整地保存在这里，设定了五十年后的解封期，希望那时的人们在看到这些文字时，仍能感受到这份跨越时间的宁静。',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3u6Cwl9v58cdzMoApCcEvtmzNOXG1rd7ZcjTKQaPRLGopNb6N-S_zciuIEEhyZjpJEZaMwdSj3ld31oQCNGF5wjEjdfYXCaf8GoadcbxjT0PeVu0h6bMHRMjuK0y5oRhxxYGcq7ySqs3i86DcF7W3IlbGbkL_zWliImU03xS2dpvrUtSz4z7Ct6_jyCNodhth3M0fSY42aJhZ9mt5ZCOrVzSAMDHkQ3C2x7zPWzvdKvFtJNv28dfFXURUk3UaMctTmNHRmiObHPM',
    additionalImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBSexZIC7DhAJviPOHauzzl99m-3inUnV6eovbtfn6RuOLg4nBsw2LR_iGlvRyd08bUdVv2YAM52WIDxxISwSALvoV9SzRMXI_jumyMlhwhmyQ6DYxW8PZXFrBK1-xV28HNtVXJW6R29PBzyMZ1PiJF94xvFugQgHacLO712DlH11CD39Wrg29ktWK2Bbp86P1Okh6cXvGTyfSnQirrobHSnSGUwKyNNlyA4jSOaWAjNcqmf_hlhljAhrkJgKcvw5t1yC_pLMuEOm0',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDZ0agkZK0nRKe5eD1Q73QTRpLDZnV93T841OFVZiVHT0N5FTRqaaPBG5sKXH7Ph1TKbcMP9l-InW4HT4YsLEiIJq7AU8pQl5SHNEbB5E1x5wMcSdrMsIl8C2qSXK9H4bF8BJ6vLqx2x4TYV2ShyGYSJqy0kkmA-ptC1gG7Sh8pk32hUbcD0_6-Ccv_WncJVmWPVtqeYP2hD3THnTWCurdlyy9h9rWArvR_KWiGkWWhRo3UmCkeuSErVb9XyFtIbHMjl8sGWQyWOAM'
    ],
    uploader: '用户自身',
    archivalNotes: '扫描件已进行无损压缩，原件存放在本地防火保险柜中。数字副本将在多重区块链节点进行备份。'
  },
  {
    id: 'old-house',
    title: '老宅最后的影像记录',
    date: '2019.11.08',
    type: 'image',
    tags: ['公开', '平静'],
    access: 'public',
    description: '老屋在推土机的轰鸣中渐渐远去，唯有院子里的枣树依然静默。我用摄影机记录下它最后的轮廓。',
    extendedText: '老屋是我们儿时奔跑笑闹、听雨看雪的地方。青砖墙上海拔高度的涂鸦，院子里每到秋天就挂满红灯笼般大枣的古树，都在这一年画上了句点。随着城市的发展，拆迁把实物带走，但这些镜头下的光影，那斑驳的门环和厚重古老的木香，将会永远在神龛的数字维度中鲜活存留，供后人寻根回溯。',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9SQc886gBTW6hALii62JlBNS0uWrI43P810rZTa4i34ElaGGt3EXeu93NIb9yTrwfJgP98x1E3-wt501sr2OqLIrIj3zggu-JBsfhiS19T20ry5UBDUZ9deKNz0jnsE6FosJq6J6xiV9FyKwM63QPXQ31Ld_xywwI-jlGvwFDQTq3O8OdHv2fgiXg8TmW50ZZAMCHwSvKkVc2Pi2uA8CcLYbPB46Uv87e33tZNE28Outv7cvDgKx1khjw24YjDPb70Sm235qqXjo',
    uploader: '用户自身',
    archivalNotes: '包括 12 张高清照片与全景模型重建文件。'
  }
];

export const initialLogs: SealedLog[] = [
  {
    id: 'log1',
    title: '自动封存',
    timestamp: '2024-05-20 14:30:12',
    operator: '系统守护者',
    status: 'success',
    statusLabel: '成功',
    type: 'auto'
  },
  {
    id: 'log2',
    title: '临时唤醒',
    timestamp: '2024-05-18 09:15:44',
    operator: '用户 (认证成功)',
    status: 'finished',
    statusLabel: '已结束',
    type: 'temp'
  },
  {
    id: 'log3',
    title: '权限校验记录',
    timestamp: '2024-05-15 00:00:01',
    operator: '核心审计系统',
    status: 'passed',
    statusLabel: '周期性通过',
    type: 'audit'
  },
  {
    id: 'log4',
    title: '访问拒绝记录',
    timestamp: '2024-05-12 21:05:33',
    operator: '外部 IP (45.xx.xx.21)',
    status: 'blocked',
    statusLabel: '拦截',
    type: 'block'
  }
];
