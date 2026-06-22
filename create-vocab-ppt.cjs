const pptxgen = require('pptxgenjs');
const html2pptx = require('/Users/zhanghao/.claude/skills/pptx/scripts/html2pptx');
const fs = require('fs');
const path = require('path');

// 创建临时目录
const tmpDir = path.join(process.env.TMPDIR || '/tmp', 'vocab-ppt');
if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });

// 单词详情数据
const wordDetails = [
  {
    word: 'available',
    cn: '可用的、可获得的',
    methods: ['词根：a-(加强) + vail(价值) + -able', '谐音："啊，味儿"able → 有价值的', '例子：available time 空闲时间'],
    color: '4472C4'
  },
  {
    word: 'reserve',
    cn: '保留、预订',
    methods: ['词根：re-(向后) + serv(保持)', '拆分：re(往回) + serve(服务)', '例子：reserve a seat 预订座位'],
    color: '70AD47'
  },
  {
    word: 'a range of',
    cn: '一系列、各种各样的',
    methods: ['拆分：a + range(范围) + of', '联想：range像货架排列', '例子：a range of options 多种选择'],
    color: 'FF6B00'
  },
  {
    word: 'in advance',
    cn: '提前、预先',
    methods: ['词根：in + ad-(向) + vance(前)', '谐音："硬得万死" → 提前准备', '例子：pay in advance 提前付款'],
    color: '5B2C6F'
  },
  {
    word: 'produce',
    cn: '生产、制造',
    methods: ['词根：pro-(向前) + duce(引导)', '联想：product(产品) ← produce', '例子：produce goods 生产商品'],
    color: 'D35400'
  },
  {
    word: 'application',
    cn: '申请、应用程序',
    methods: ['拆分：apply(申请) + cation(名词)', '记忆：app就是application的缩写', '例子：job application 求职申请'],
    color: 'C0392B'
  },
  {
    word: 'publish',
    cn: '出版、发布',
    methods: ['词根：publ-(人民) + -ish(使...)', '拆分：public(公众) + -ish', '例子：publish a book 出版一本书'],
    color: '16A085'
  },
  {
    word: 'create',
    cn: '创造、创作',
    methods: ['词根：cre-(创造) + -ate(动词)', '联想：creator(造物主) ← create', '例子：create art 创作艺术'],
    color: '8E44AD'
  },
  {
    word: 'poster',
    cn: '海报',
    methods: ['拆分：post(张贴) + -er(物)', '联想：post(柱子)上贴的', '例子：movie poster 电影海报'],
    color: 'E74C3C'
  },
  {
    word: 'improve',
    cn: '改善、提高',
    methods: ['词根：im-(进入) + prove(测试)', '联想：proof(证明) ← prove ← improve', '例子：improve skills 提高技能'],
    color: '27AE60'
  }
];

// 创建封面
const coverHtml = `<!DOCTYPE html>
<html>
<head>
<style>
html { background: #ffffff; }
body {
  width: 720pt; height: 405pt; margin: 0; padding: 0;
  background: #FFE0B2;
  font-family: Arial, sans-serif;
  display: flex;
}
.title-container {
  width: 100%; height: 100%;
  display: flex; flex-direction: column;
  justify-content: center; align-items: center;
}
.magic-badge {
  background: #FF6B00; color: white;
  padding: 15pt 40pt; border-radius: 50pt;
  font-size: 28pt; font-weight: bold;
  margin-bottom: 30pt;
}
.main-title {
  font-size: 72pt; font-weight: bold;
  color: #222831; margin: 0;
}
.subtitle {
  font-size: 32pt; color: #666;
  margin-top: 20pt;
}
</style>
</head>
<body>
<div class="title-container">
  <p class="magic-badge">✨ 魔法课程 ✨</p>
  <h1 class="main-title">英语单词速记</h1>
  <p class="subtitle">10个单词，轻松牢记！</p>
</div>
</body>
</html>`;

fs.writeFileSync(path.join(tmpDir, 'slide1.html'), coverHtml);

// 创建目录页
const contentsHtml = `<!DOCTYPE html>
<html>
<head>
<style>
html { background: #ffffff; }
body {
  width: 720pt; height: 405pt; margin: 0; padding: 0;
  background: #FFF8E1;
  font-family: Arial, sans-serif;
  display: flex; flex-direction: column;
}
.header {
  background: #FF6B00; padding: 25pt 40pt;
}
.title { font-size: 42pt; font-weight: bold; color: white; margin: 0; }
.content { padding: 30pt 50pt; flex: 1; }
.word-list p {
  font-size: 18pt; color: #333; margin: 8pt 0;
  padding: 8pt 15pt; background: white;
  border-radius: 6pt; border-left: 4pt solid #FF6B00;
}
</style>
</head>
<body>
<div class="header">
  <h1 class="title">📚 目录</h1>
</div>
<div class="content">
  <div class="word-list">
    <p>1. available - 可用的</p>
    <p>2. reserve - 预订</p>
    <p>3. a range of - 一系列</p>
    <p>4. in advance - 提前</p>
    <p>5. produce - 生产</p>
    <p>6. application - 申请/app</p>
    <p>7. publish - 出版</p>
    <p>8. create - 创造</p>
    <p>9. poster - 海报</p>
    <p>10. improve - 改善</p>
  </div>
</div>
</body>
</html>`;

fs.writeFileSync(path.join(tmpDir, 'slide2.html'), contentsHtml);

// 创建方法介绍页
const methodsHtml = `<!DOCTYPE html>
<html>
<head>
<style>
html { background: #ffffff; }
body {
  width: 720pt; height: 405pt; margin: 0; padding: 0;
  background: #FFF8E1;
  font-family: Arial, sans-serif;
  display: flex; flex-direction: column;
}
.header {
  background: #4472C4; padding: 25pt 40pt;
}
.title { font-size: 42pt; font-weight: bold; color: white; margin: 0; }
.content { padding: 25pt 40pt; flex: 1; }
.method-box {
  background: white; padding: 15pt 20pt;
  margin-bottom: 12pt; border-radius: 10pt;
  border-left: 5pt solid #4472C4;
}
.method-title {
  font-size: 22pt; font-weight: bold;
  color: #4472C4; margin: 0 0 8pt 0;
}
.method-desc { font-size: 16pt; color: #555; margin: 0; }
</style>
</head>
<body>
<div class="header">
  <h1 class="title">🧠 速记四大法宝</h1>
</div>
<div class="content">
  <div class="method-box">
    <h2 class="method-title">1️⃣ 词根记忆法</h2>
    <p class="method-desc">把单词拆成小零件，像搭积木一样记住！</p>
  </div>
  <div class="method-box">
    <h2 class="method-title">2️⃣ 联想记忆法</h2>
    <p class="method-desc">找朋友！把新单词和认识的词联系起来。</p>
  </div>
  <div class="method-box">
    <h2 class="method-title">3️⃣ 谐音口诀法</h2>
    <p class="method-desc">用有趣的中文读音记住英文意思！</p>
  </div>
  <div class="method-box">
    <h2 class="method-title">4️⃣ 场景记忆法</h2>
    <p class="method-desc">把单词放在生活场景里，想忘都难！</p>
  </div>
</div>
</body>
</html>`;

fs.writeFileSync(path.join(tmpDir, 'slide3.html'), methodsHtml);

// 为每个单词创建页面
wordDetails.forEach((word, index) => {
  const wordHtml = `<!DOCTYPE html>
<html>
<head>
<style>
html { background: #ffffff; }
body {
  width: 720pt; height: 405pt; margin: 0; padding: 0;
  background: #FFF8E1;
  font-family: Arial, sans-serif;
  display: flex;
}
.sidebar {
  width: 220pt; background: #${word.color};
  padding: 30pt 20pt; display: flex;
  flex-direction: column; justify-content: center;
}
.word-number {
  font-size: 60pt; font-weight: bold;
  color: rgba(255,255,255,0.3); margin: 0;
}
.word-main {
  font-size: 32pt; font-weight: bold; color: white;
  margin: 15pt 0; text-align: center;
}
.main-content { flex: 1; padding: 25pt 30pt; }
.word-meaning {
  background: #${word.color}; color: white;
  padding: 12pt 25pt; border-radius: 8pt;
  font-size: 20pt; font-weight: bold;
  display: inline-block; margin-bottom: 15pt;
}
.method-item {
  background: white; padding: 12pt 18pt;
  margin-bottom: 10pt; border-radius: 8pt;
  border-left: 4pt solid #${word.color};
}
.method-text { font-size: 15pt; color: #333; margin: 0; }
</style>
</head>
<body>
<div class="sidebar">
  <p class="word-number">${String(index + 1).padStart(2, '0')}</p>
  <h1 class="word-main">${word.word}</h1>
</div>
<div class="main-content">
  <div class="word-meaning">${word.cn}</div>
  ${word.methods.map(m => `
  <div class="method-item">
    <p class="method-text">${m}</p>
  </div>`).join('')}
</div>
</body>
</html>`;

  fs.writeFileSync(path.join(tmpDir, `slide${4+index}.html`), wordHtml);
});

// 创建总结页
const summaryHtml = `<!DOCTYPE html>
<html>
<head>
<style>
html { background: #ffffff; }
body {
  width: 720pt; height: 405pt; margin: 0; padding: 0;
  background: #FFE0B2;
  font-family: Arial, sans-serif;
  display: flex; flex-direction: column;
  justify-content: center; align-items: center;
}
.star { font-size: 80pt; margin: 0 0 20pt 0; }
.title {
  font-size: 56pt; font-weight: bold;
  color: #FF6B00; margin: 0;
}
.subtitle {
  font-size: 28pt; color: #222831;
  margin: 20pt 0 30pt 0;
}
.tips {
  background: white; padding: 20pt 40pt;
  border-radius: 12pt;
  border-left: 6pt solid #FF6B00;
}
.tip-item {
  font-size: 18pt; color: #555;
  margin: 8pt 0;
}
</style>
</head>
<body>
<div class="star">🌟</div>
<h1 class="title">恭喜你！完成学习</h1>
<p class="subtitle">10个魔法单词已收入你的大脑！</p>
<div class="tips">
  <p class="tip-item">✅ 每天复习5分钟，记得更牢固！</p>
  <p class="tip-item">✅ 用这些单词造句，效果更好！</p>
  <p class="tip-item">✅ 教给同学，记得最快！</p>
</div>
</body>
</html>`;

fs.writeFileSync(path.join(tmpDir, 'slide14.html'), summaryHtml);

// 生成PPT
async function createPresentation() {
  const pptx = new pptxgen();
  pptx.layout = 'LAYOUT_16x9';
  pptx.author = '张浩';
  pptx.title = '英语单词速记魔法课';

  for (let i = 1; i <= 14; i++) {
    const slidePath = path.join(tmpDir, `slide${i}.html`);
    await html2pptx(slidePath, pptx);
  }

  const outputPath = '/Users/zhanghao/Documents/my_code/vite-react/英语单词速记魔法课.pptx';
  await pptx.writeFile({ fileName: outputPath });
  console.log(`✅ PPT创建成功！保存位置：${outputPath}`);

  // 清理临时文件
  fs.rmSync(tmpDir, { recursive: true, force: true });
}

createPresentation().catch(console.error);
