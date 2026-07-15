export async function createFrontTexture(profileImgUrl: string): Promise<string> {
  try {
    if (document.fonts) {
      await document.fonts.load("bold 12px 'Space Grotesk'");
      await document.fonts.load("400 12px 'Space Grotesk'");
    }
  } catch (e) {
    console.warn('Failed to load Space Grotesk font, falling back to system-ui', e);
  }

  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    // 2x resolution for sharp text
    const S = 2;
    canvas.width = 512 * S;
    canvas.height = 720 * S;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      resolve('');
      return;
    }

    ctx.scale(S, S);
    const W = 512;
    const H = 720;
    const fontStack = '"Space Grotesk", "Outfit", "Inter", system-ui, -apple-system, sans-serif';

    const drawCard = () => {
      // 1. Background
      ctx.fillStyle = '#F9F8F5';
      ctx.fillRect(0, 0, W, H);

      // 2. Accent strip
      ctx.fillStyle = '#0A4F41';
      ctx.fillRect(0, 0, W, 14);

      // 3. Header
      ctx.fillStyle = '#8A8A8A';
      ctx.font = `bold 11px ${fontStack}`;
      ctx.fillText('PORTFOLIO CARD', 32, 48);

      ctx.fillStyle = '#16A34A';
      ctx.beginPath();
      ctx.arc(W - 92, 44, 4.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.font = `bold 11px ${fontStack}`;
      ctx.fillText('ONLINE', W - 80, 48);

      // 4. Profile Image
      const pX = 32, pY = 80, pSize = 80, pRadius = 40;

      ctx.save();
      ctx.shadowColor = 'rgba(0, 0, 0, 0.08)';
      ctx.shadowBlur = 12;
      ctx.shadowOffsetY = 4;
      ctx.beginPath();
      ctx.arc(pX + pRadius, pY + pRadius, pRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.restore();

      if (imgLoaded && img.complete && img.naturalWidth > 0) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(pX + pRadius, pY + pRadius, pRadius - 1.5, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(img, pX, pY, pSize, pSize);
        ctx.restore();
      } else {
        ctx.fillStyle = '#EBE9E4';
        ctx.beginPath();
        ctx.arc(pX + pRadius, pY + pRadius, pRadius - 1.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#8A8A8A';
        ctx.font = `bold 24px ${fontStack}`;
        ctx.fillText('GK', pX + 18, pY + 48);
      }

      ctx.strokeStyle = '#D9CDBD';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(pX + pRadius, pY + pRadius, pRadius - 0.75, 0, Math.PI * 2);
      ctx.stroke();

      // 5. Name & Title
      ctx.fillStyle = '#2A2A2A';
      ctx.font = `bold 26px ${fontStack}`;
      ctx.fillText('GAURAV KUMAR', 136, 108);

      ctx.fillStyle = '#0A4F41';
      ctx.font = `bold 12px ${fontStack}`;
      ctx.fillText('Full Stack Developer', 136, 130);

      ctx.fillStyle = '#6E6E6E';
      ctx.font = `500 11px ${fontStack}`;
      ctx.fillText('AI & Cybersecurity Engineer', 136, 148);
      ctx.fillText('VIT Bhopal University', 136, 164);

      // 6. INFORMATION
      const infoY = 210;
      ctx.fillStyle = '#0A4F41';
      ctx.font = `bold 11px ${fontStack}`;
      ctx.fillText('INFORMATION', 32, infoY);

      ctx.strokeStyle = '#D9CDBD';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(32, infoY + 8);
      ctx.lineTo(W - 32, infoY + 8);
      ctx.stroke();

      ctx.fillStyle = '#8A8A8A';
      ctx.font = `bold 9px ${fontStack}`;
      ctx.fillText('UNIVERSITY', 32, infoY + 30);
      ctx.fillText('GRADUATION', 320, infoY + 30);
      ctx.fillStyle = '#2A2A2A';
      ctx.font = `bold 12px ${fontStack}`;
      ctx.fillText('VIT Bhopal University', 32, infoY + 46);
      ctx.fillText('2027', 320, infoY + 46);

      ctx.fillStyle = '#8A8A8A';
      ctx.font = `bold 9px ${fontStack}`;
      ctx.fillText('DEPARTMENT', 32, infoY + 70);
      ctx.fillText('CURRENT ROLE', 320, infoY + 70);
      ctx.fillStyle = '#2A2A2A';
      ctx.font = `bold 12px ${fontStack}`;
      ctx.fillText('CSE - Cyber Security', 32, infoY + 86);
      ctx.fillText('Frontend Intern', 320, infoY + 86);

      // 7. FEATURED PROJECTS
      const projY = 340;
      ctx.fillStyle = '#0A4F41';
      ctx.font = `bold 11px ${fontStack}`;
      ctx.fillText('FEATURED PROJECTS', 32, projY);

      ctx.strokeStyle = '#D9CDBD';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(32, projY + 8);
      ctx.lineTo(W - 32, projY + 8);
      ctx.stroke();

      // Project 1
      const p1Y = projY + 28;
      ctx.fillStyle = '#2A2A2A';
      ctx.font = `bold 12px ${fontStack}`;
      ctx.fillText('Phishing URL Detector', 32, p1Y);
      ctx.fillStyle = '#6E6E6E';
      ctx.font = `400 10px ${fontStack}`;
      ctx.fillText('AI-powered threat detection with 97% accuracy', 32, p1Y + 16);

      // Project 2
      const p2Y = p1Y + 42;
      ctx.fillStyle = '#2A2A2A';
      ctx.font = `bold 12px ${fontStack}`;
      ctx.fillText('Portfolio Website', 32, p2Y);
      ctx.fillStyle = '#6E6E6E';
      ctx.font = `400 10px ${fontStack}`;
      ctx.fillText('3D interactive site with React Three Fiber', 32, p2Y + 16);

      // Project 3 - GIS
      const p3Y = p2Y + 42;
      ctx.fillStyle = '#2A2A2A';
      ctx.font = `bold 12px ${fontStack}`;
      ctx.fillText('GIS Platform', 32, p3Y);
      ctx.fillStyle = '#6E6E6E';
      ctx.font = `400 10px ${fontStack}`;
      ctx.fillText('Geographic Information System for spatial analysis', 32, p3Y + 16);

      // 8. SKILLS
      const skillsY = 530;
      ctx.fillStyle = '#0A4F41';
      ctx.font = `bold 11px ${fontStack}`;
      ctx.fillText('SKILLS', 32, skillsY);

      ctx.strokeStyle = '#D9CDBD';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(32, skillsY + 8);
      ctx.lineTo(W - 32, skillsY + 8);
      ctx.stroke();

      const skills = ['React', 'Python', 'FastAPI', 'TensorFlow', 'Docker', 'AWS', 'GenAI'];
      let skillX = 32;
      let skillRowY = skillsY + 24;
      ctx.font = `bold 10px ${fontStack}`;

      skills.forEach((skill) => {
        const textWidth = ctx.measureText(skill).width;
        const paddingH = 10;
        const rectW = textWidth + paddingH * 2;
        const rectH = 22;
        const radius = 11;

        if (skillX + rectW > W - 32) {
          skillX = 32;
          skillRowY += 30;
        }

        ctx.fillStyle = '#F0EDE9';
        ctx.beginPath();
        ctx.roundRect(skillX, skillRowY, rectW, rectH, radius);
        ctx.fill();

        ctx.fillStyle = '#2A2A2A';
        ctx.fillText(skill, skillX + paddingH, skillRowY + 15);
        skillX += rectW + 8;
      });

      // 9. Footer
      const footerY = 640;
      ctx.strokeStyle = '#D9CDBD';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(32, footerY);
      ctx.lineTo(W - 32, footerY);
      ctx.stroke();

      ctx.fillStyle = '#8A8A8A';
      ctx.font = `500 10px ${fontStack}`;
      ctx.fillText('2023 — PRESENT', 32, footerY + 28);

      const badgeW = 90, badgeH = 24;
      const badgeX = W - 32 - badgeW;
      const badgeY2 = footerY + 14;

      ctx.strokeStyle = '#16A34A';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(badgeX, badgeY2, badgeW, badgeH, 12);
      ctx.stroke();

      ctx.fillStyle = '#16A34A';
      ctx.font = `bold 10px ${fontStack}`;
      ctx.textAlign = 'center';
      ctx.fillText('VERIFIED', badgeX + badgeW / 2, badgeY2 + 16);
      ctx.textAlign = 'left';

      resolve(canvas.toDataURL('image/png'));
    };

    let imgLoaded = false;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => { imgLoaded = true; drawCard(); };
    img.onerror = () => { imgLoaded = false; drawCard(); };
    img.src = profileImgUrl;
  });
}

export function createBackTexture(): string {
  const canvas = document.createElement('canvas');
  const S = 2;
  canvas.width = 512 * S;
  canvas.height = 720 * S;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  ctx.scale(S, S);
  const W = 512;
  const H = 720;
  const fontStack = '"Space Grotesk", "Outfit", "Inter", system-ui, -apple-system, sans-serif';

  ctx.fillStyle = '#0A4F41';
  ctx.fillRect(0, 0, W, H);

  ctx.strokeStyle = 'rgba(217, 205, 189, 0.1)';
  ctx.lineWidth = 1;
  const gridSize = 40;
  for (let x = 0; x < W; x += gridSize) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
  }
  for (let y = 0; y < H; y += gridSize) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
  }

  ctx.fillStyle = 'rgba(217, 205, 189, 0.15)';
  ctx.font = `bold 100px ${fontStack}`;
  ctx.textAlign = 'center';
  ctx.fillText('GK', W / 2, H / 2 - 20);

  ctx.strokeStyle = '#D9CDBD';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(W / 2, H / 2 - 56, 76, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = '#F9F8F5';
  ctx.font = `bold 11px ${fontStack}`;
  ctx.fillText('GAURAV KUMAR // PORTFOLIO', W / 2, H / 2 + 100);

  ctx.fillStyle = '#D9CDBD';
  ctx.font = `500 11px ${fontStack}`;
  ctx.fillText('FULL STACK · AI · CYBERSECURITY', W / 2, H / 2 + 120);

  const barcodeY = H - 110;
  const barcodeH = 40;
  const startX = 64;
  const endX = W - 64;

  ctx.fillStyle = '#F9F8F5';
  let currentX = startX;
  const barPattern = [2, 4, 1, 3, 2, 1, 4, 2, 3, 1, 2, 4, 1, 2, 3, 4, 1, 2, 3, 1, 4, 2, 3, 1, 2, 4, 1, 2, 3, 1];
  let patternIdx = 0;

  while (currentX < endX) {
    const width = barPattern[patternIdx % barPattern.length] * 2;
    const isSpace = patternIdx % 2 === 1;
    if (!isSpace && currentX + width < endX) {
      ctx.fillRect(currentX, barcodeY, width, barcodeH);
    }
    currentX += width;
    patternIdx++;
  }

  ctx.fillStyle = '#D9CDBD';
  ctx.font = `11px ${fontStack}`;
  ctx.fillText('gauravkumar.dev', W / 2, barcodeY + barcodeH + 20);

  return canvas.toDataURL('image/png');
}
