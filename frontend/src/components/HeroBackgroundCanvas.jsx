import React, { useEffect, useRef } from 'react';

export default function HeroBackgroundCanvas({ mousePos }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // 1. Constellation Nodes & Floating Cyber Dust
    const nodeCount = 45;
    const nodes = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 1,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.7 + 0.2,
      color: Math.random() > 0.4 ? 'rgba(251, 191, 36,' : 'rgba(52, 211, 153,',
    }));

    let time = 0;

    const render = () => {
      time += 0.008;
      ctx.clearRect(0, 0, width, height);

      // Camera parallax calculation based on mouse
      const camX = (mousePos.x / width - 0.5) * 50;
      const camY = (mousePos.y / height - 0.5) * 50;

      // -------------------------------------------------------------
      // 2. AMBIENT LIQUID PLASMA ORBS (3D Floating Lights)
      // -------------------------------------------------------------
      // Gold Orb (Top Right)
      const orb1X = width * 0.75 - camX * 1.6 + Math.sin(time * 0.7) * 45;
      const orb1Y = height * 0.35 - camY * 1.6 + Math.cos(time * 0.6) * 45;
      const grad1 = ctx.createRadialGradient(orb1X, orb1Y, 20, orb1X, orb1Y, width * 0.45);
      grad1.addColorStop(0, 'rgba(245, 158, 11, 0.22)');
      grad1.addColorStop(0.5, 'rgba(251, 191, 36, 0.06)');
      grad1.addColorStop(1, 'rgba(3, 3, 5, 0)');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      // Emerald Orb (Bottom Left)
      const orb2X = width * 0.25 + camX * 1.3 + Math.cos(time * 0.8) * 50;
      const orb2Y = height * 0.65 + camY * 1.3 + Math.sin(time * 0.9) * 50;
      const grad2 = ctx.createRadialGradient(orb2X, orb2Y, 20, orb2X, orb2Y, width * 0.4);
      grad2.addColorStop(0, 'rgba(16, 185, 129, 0.18)');
      grad2.addColorStop(0.5, 'rgba(52, 211, 153, 0.05)');
      grad2.addColorStop(1, 'rgba(3, 3, 5, 0)');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // Sapphire Blue Center Flare
      const orb3X = width * 0.5 - camX * 0.8 + Math.sin(time * 0.5) * 30;
      const orb3Y = height * 0.5 - camY * 0.8 + Math.cos(time * 0.5) * 30;
      const grad3 = ctx.createRadialGradient(orb3X, orb3Y, 10, orb3X, orb3Y, width * 0.35);
      grad3.addColorStop(0, 'rgba(56, 189, 248, 0.1)');
      grad3.addColorStop(1, 'rgba(3, 3, 5, 0)');
      ctx.fillStyle = grad3;
      ctx.fillRect(0, 0, width, height);

      // -------------------------------------------------------------
      // 3. 3D UNDULATING WAVE MESH LINES
      // -------------------------------------------------------------
      ctx.lineWidth = 1;
      const waveRows = 6;
      const stepX = width / 40;

      for (let r = 0; r < waveRows; r++) {
        ctx.beginPath();
        const rowY = height * (0.45 + r * 0.1) + camY * (0.2 + r * 0.1);
        ctx.strokeStyle = r % 2 === 0 ? 'rgba(251, 191, 36, 0.05)' : 'rgba(52, 211, 153, 0.05)';

        for (let x = 0; x <= width; x += stepX) {
          const yWave = Math.sin(x * 0.004 + time * 1.5 + r * 0.8) * (20 + r * 5);
          if (x === 0) {
            ctx.moveTo(x, rowY + yWave);
          } else {
            ctx.lineTo(x, rowY + yWave);
          }
        }
        ctx.stroke();
      }

      // -------------------------------------------------------------
      // 4. CONSTELLATION NETWORK & CONNECTING BEAMS
      // -------------------------------------------------------------
      // Move and render nodes
      nodes.forEach((n, i) => {
        n.x += n.vx + camX * 0.015;
        n.y += n.vy + camY * 0.015;

        if (n.x < 0) n.x = width;
        if (n.x > width) n.x = 0;
        if (n.y < 0) n.y = height;
        if (n.y > height) n.y = 0;

        // Draw node
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${n.color} ${n.alpha})`;
        ctx.fill();

        // Connect nearby nodes with glowing beam lines
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dist = Math.hypot(n.x - n2.x, n.y - n2.y);
          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(n2.x, n2.y);
            const lineAlpha = (1 - dist / 140) * 0.15;
            ctx.strokeStyle = `rgba(251, 191, 36, ${lineAlpha})`;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePos]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000"
    />
  );
}
