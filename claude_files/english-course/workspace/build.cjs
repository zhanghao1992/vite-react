const pptxgen = require('pptxgenjs');
const html2pptx = require('/Users/zhanghao/.claude/skills/pptx/scripts/html2pptx');
const sharp = require('sharp');
const path = require('path');

const SLIDES_DIR = path.join(__dirname, 'slides');
const OUT = path.join(__dirname, '..', '英语课件-日程安排.pptx');

async function createGradient(filename, c1, c2, vertical = false) {
  const gradAttrs = vertical
    ? 'x1="0%" y1="0%" x2="0%" y2="100%"'
    : 'x1="0%" y1="0%" x2="100%" y2="0%"';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="810">
    <defs><linearGradient id="g" ${gradAttrs}>
      <stop offset="0%" style="stop-color:${c1}"/>
      <stop offset="100%" style="stop-color:${c2}"/>
    </linearGradient></defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
  </svg>`;
  await sharp(Buffer.from(svg)).png().toFile(path.join(SLIDES_DIR, filename));
}

async function createSvg(filename, svgContent, w = 200, h = 200) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">${svgContent}</svg>`;
  await sharp(Buffer.from(svg)).png().toFile(path.join(SLIDES_DIR, filename));
}

async function main() {
  // Backgrounds - cute pastel palette
  await createGradient('bg-title.png', '#FFD1DC', '#FFB6C1'); // pink gradient
  await createGradient('bg-cream.png', '#FFF8F5', '#FFF0EB', true); // warm cream

  // Cute clock
  await createSvg('clock.png', `
    <circle cx="100" cy="100" r="90" fill="#FFF8F5" stroke="#FFB6C1" stroke-width="6"/>
    <circle cx="100" cy="100" r="5" fill="#9B59B6"/>
    <line x1="100" y1="100" x2="100" y2="45" stroke="#9B59B6" stroke-width="4" stroke-linecap="round"/>
    <line x1="100" y1="100" x2="145" y2="100" stroke="#FFB6C1" stroke-width="3" stroke-linecap="round"/>
    <circle cx="100" cy="100" r="3" fill="#FFB6C1"/>
    <text x="100" y="52" text-anchor="middle" font-size="16" fill="#9B59B6" font-family="Arial">12</text>
    <text x="152" y="106" text-anchor="middle" font-size="16" fill="#9B59B6" font-family="Arial">3</text>
    <text x="100" y="160" text-anchor="middle" font-size="16" fill="#9B59B6" font-family="Arial">6</text>
    <text x="48" y="106" text-anchor="middle" font-size="16" fill="#9B59B6" font-family="Arial">9</text>
  `, 200, 200);

  // Cute star (pink)
  await createSvg('star-pink.png', `
    <polygon points="50,5 61,35 95,35 68,55 79,90 50,70 21,90 32,55 5,35 39,35" fill="#FFB6C1"/>
    <circle cx="50" cy="42" r="3" fill="#E8739E"/>
    <circle cx="42" cy="42" r="2.5" fill="#E8739E"/>
    <circle cx="58" cy="42" r="2.5" fill="#E8739E"/>
    <path d="M 43 52 Q 50 58 57 52" stroke="#E8739E" stroke-width="2" fill="none" stroke-linecap="round"/>
  `, 100, 100);

  // Rainbow star
  await createSvg('star-rainbow.png', `
    <polygon points="50,5 61,35 95,35 68,55 79,90 50,70 21,90 32,55 5,35 39,35" fill="#FFD700"/>
    <polygon points="50,15 58,35 80,35 63,48 70,70 50,58 30,70 37,48 20,35 42,35" fill="#FFE44D"/>
  `, 100, 100);

  // Heart
  await createSvg('heart.png', `
    <path d="M 50 85 C 20 60, 0 35, 15 20 C 25 10, 40 15, 50 30 C 60 15, 75 10, 85 20 C 100 35, 80 60, 50 85 Z" fill="#FFB6C1"/>
    <ellipse cx="32" cy="35" rx="8" ry="10" fill="#FFC8D6" opacity="0.6"/>
  `, 100, 100);

  // Cute bear face
  await createSvg('bear.png', `
    <circle cx="60" cy="65" r="50" fill="#F5DEB3"/>
    <circle cx="28" cy="28" r="18" fill="#F5DEB3"/>
    <circle cx="92" cy="28" r="18" fill="#F5DEB3"/>
    <circle cx="28" cy="28" r="10" fill="#DEB887"/>
    <circle cx="92" cy="28" r="10" fill="#DEB887"/>
    <circle cx="45" cy="58" r="6" fill="#333"/>
    <circle cx="75" cy="58" r="6" fill="#333"/>
    <ellipse cx="60" cy="72" rx="10" ry="7" fill="#DEB887"/>
    <ellipse cx="60" cy="70" rx="5" ry="3" fill="#333"/>
    <path d="M 52 82 Q 60 90 68 82" stroke="#333" stroke-width="2" fill="none" stroke-linecap="round"/>
    <circle cx="38" cy="48" r="6" fill="#FFB6C1" opacity="0.5"/>
    <circle cx="82" cy="48" r="6" fill="#FFB6C1" opacity="0.5"/>
  `, 120, 120);

  // Speech bubble
  await createSvg('bubble.png', `
    <rect x="5" y="5" width="170" height="55" rx="18" ry="18" fill="#FFFFFF" stroke="#DDA0DD" stroke-width="2"/>
    <polygon points="25,60 40,60 15,78" fill="#FFFFFF" stroke="#DDA0DD" stroke-width="2"/>
    <line x1="25" y1="61" x2="41" y2="61" stroke="#FFFFFF" stroke-width="3"/>
  `, 180, 85);

  // Cloud left
  await createSvg('cloud-left.png', `
    <ellipse cx="100" cy="70" rx="90" ry="45" fill="white" opacity="0.8"/>
    <ellipse cx="55" cy="50" rx="50" ry="40" fill="white" opacity="0.8"/>
    <ellipse cx="140" cy="55" rx="45" ry="35" fill="white" opacity="0.8"/>
  `, 200, 120);

  // Cloud right
  await createSvg('cloud-right.png', `
    <ellipse cx="80" cy="60" rx="80" ry="40" fill="white" opacity="0.8"/>
    <ellipse cx="40" cy="45" rx="45" ry="35" fill="white" opacity="0.8"/>
    <ellipse cx="120" cy="48" rx="40" ry="30" fill="white" opacity="0.8"/>
  `, 160, 100);

  // Pencil
  await createSvg('pencil.png', `
    <rect x="40" y="15" width="20" height="60" rx="2" fill="#FFD700"/>
    <polygon points="40,75 60,75 50,95" fill="#F5DEB3"/>
    <rect x="40" y="15" width="20" height="10" fill="#FFB6C1"/>
    <circle cx="50" cy="87" r="2" fill="#333"/>
  `, 100, 110);

  // Check mark
  await createSvg('check.png', `
    <circle cx="30" cy="30" r="26" fill="#B5D8A0"/>
    <polyline points="16,30 26,40 44,20" stroke="white" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  `, 60, 60);

  // Number badges - cute pastel
  for (let i = 1; i <= 6; i++) {
    await createSvg(`num-${i}.png`, `
      <circle cx="18" cy="18" r="16" fill="#DDA0DD"/>
      <text x="18" y="23" text-anchor="middle" font-size="18" fill="white" font-weight="bold" font-family="Arial">${i}</text>
    `, 36, 36);
  }

  const pptx = new pptxgen();
  pptx.layout = 'LAYOUT_16x9';
  pptx.author = '张浩';
  pptx.title = 'How can a good schedule help us?';

  const slides = [
    'slide01-title.html',
    'slide02-quiz.html',
    'slide03-quiz-answer.html',
    'slide04-objectives.html',
    'slide05-talk1.html',
    'slide06-talk2.html',
    'slide07-sentences.html',
    'slide08-schedule.html',
    'slide09-practice.html',
    'slide10-summary.html',
    'slide11-homework.html',
  ];

  for (const s of slides) {
    await html2pptx(path.join(SLIDES_DIR, s), pptx);
  }

  await pptx.writeFile({ fileName: OUT });
  console.log('Done:', OUT);
}

main().catch(e => { console.error(e); process.exit(1); });
