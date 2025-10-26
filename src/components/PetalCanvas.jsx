import React, { useEffect, useRef } from 'react';

// Lightweight falling petal simulation on a full-screen canvas
export default function PetalCanvas() {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const petals = [];
    const PETAL_COUNT = Math.min(140, Math.floor((width * height) / 20000));

    function resetPetal(p) {
      p.x = Math.random() * width;
      p.y = -20 - Math.random() * height * 0.2;
      p.size = 6 + Math.random() * 10;
      p.speed = 0.5 + Math.random() * 1.2;
      p.swing = 0.5 + Math.random() * 1.5;
      p.angle = Math.random() * Math.PI * 2;
      p.rotation = Math.random() * Math.PI * 2;
      p.spin = (Math.random() - 0.5) * 0.02;
      p.hue = 330 + Math.random() * 20; // sakura pink range
      p.alpha = 0.6 + Math.random() * 0.35;
    }

    for (let i = 0; i < PETAL_COUNT; i++) {
      const p = {};
      resetPetal(p);
      p.y = Math.random() * height; // distribute
      petals.push(p);
    }

    function drawPetal(p) {
      const w = p.size * (0.9 + 0.3 * Math.sin(p.rotation));
      const h = p.size * (0.6 + 0.2 * Math.cos(p.rotation * 1.2));

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      const grad = ctx.createLinearGradient(-w, -h, w, h);
      grad.addColorStop(0, `hsla(${p.hue}, 80%, 85%, ${p.alpha * 0.9})`);
      grad.addColorStop(1, `hsla(${p.hue + 10}, 70%, 70%, ${p.alpha})`);
      ctx.fillStyle = grad;

      ctx.beginPath();
      ctx.moveTo(0, -h);
      ctx.quadraticCurveTo(w * 0.6, -h * 0.4, w * 0.2, 0);
      ctx.quadraticCurveTo(w * 0.9, h * 0.3, 0, h);
      ctx.quadraticCurveTo(-w * 0.9, h * 0.3, -w * 0.2, 0);
      ctx.quadraticCurveTo(-w * 0.6, -h * 0.4, 0, -h);
      ctx.closePath();
      ctx.fill();

      // subtle highlight
      ctx.strokeStyle = `hsla(${p.hue + 5}, 70%, 95%, ${p.alpha * 0.5})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();
      ctx.restore();
    }

    function animate() {
      rafRef.current = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, width, height);

      for (const p of petals) {
        p.angle += 0.01 * p.swing;
        p.x += Math.sin(p.angle) * p.swing;
        p.y += p.speed;
        p.rotation += p.spin;

        if (p.y - p.size > height + 10) {
          resetPetal(p);
          p.y = -p.size;
        }
        drawPetal(p);
      }
    }

    animate();

    function onResize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-10"
      aria-hidden="true"
    />
  );
}
