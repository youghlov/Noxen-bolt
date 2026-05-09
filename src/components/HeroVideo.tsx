import { useEffect, useRef } from 'react';

export default function HeroVideo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    const services = [
      { name: 'Brand Identity', x: 0.2, y: 0.3, progress: 0 },
      { name: 'Digital Design', x: 0.5, y: 0.2, progress: 0 },
      { name: 'Immersive Web', x: 0.8, y: 0.3, progress: 0 },
      { name: 'Visual Production', x: 0.35, y: 0.65, progress: 0 },
      { name: 'AI Integration', x: 0.65, y: 0.65, progress: 0 },
    ];

    let time = 0;
    const duration = 8000; // 8 seconds loop

    const drawProgressBar = (x: number, y: number, progress: number, width: number = 60) => {
      const barWidth = width;
      const barHeight = 4;
      const centerX = canvas.width * x - barWidth / 2;
      const centerY = canvas.height * y + 35;

      // Border glow
      ctx.shadowColor = 'rgba(100, 180, 255, 0.6)';
      ctx.shadowBlur = 8;
      ctx.strokeStyle = 'rgba(120, 180, 255, 0.7)';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(centerX, centerY, barWidth, barHeight);
      ctx.shadowColor = 'transparent';

      // Background bar
      ctx.fillStyle = 'rgba(40, 70, 120, 0.3)';
      ctx.fillRect(centerX, centerY, barWidth, barHeight);

      // Fill with glow
      if (progress > 0) {
        ctx.shadowColor = `rgba(100, 180, 255, ${0.8 * progress})`;
        ctx.shadowBlur = 12 + progress * 8;
        ctx.fillStyle = `rgba(150, 200, 255, ${0.4 + progress * 0.6})`;
        ctx.fillRect(centerX, centerY, barWidth * progress, barHeight);
        ctx.shadowColor = 'transparent';
      }
    };

    const drawServiceNode = (
      x: number,
      y: number,
      label: string,
      progress: number
    ) => {
      const nodeX = canvas.width * x;
      const nodeY = canvas.height * y;
      const radius = 9 + progress * 5;
      const glowAmount = 0.3 + progress * 0.7;

      // Strong glow background (outer)
      ctx.shadowColor = `rgba(100, 180, 255, ${glowAmount * 0.6})`;
      ctx.shadowBlur = 25 + progress * 15;
      ctx.fillStyle = `rgba(100, 180, 255, ${glowAmount * 0.15})`;
      ctx.beginPath();
      ctx.arc(nodeX, nodeY, radius + 8, 0, Math.PI * 2);
      ctx.fill();

      // Outer ring with glow
      ctx.shadowColor = `rgba(120, 200, 255, ${glowAmount})`;
      ctx.shadowBlur = 12 + progress * 8;
      ctx.strokeStyle = `rgba(120, 200, 255, ${0.5 + progress * 0.5})`;
      ctx.lineWidth = 1.5 + progress;
      ctx.beginPath();
      ctx.arc(nodeX, nodeY, radius + 4, 0, Math.PI * 2);
      ctx.stroke();

      // Pulse ring
      const pulse = Math.sin(time * 0.005) * 0.3 + 0.2;
      ctx.strokeStyle = `rgba(150, 220, 255, ${pulse * glowAmount})`;
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.arc(nodeX, nodeY, radius + 9, 0, Math.PI * 2);
      ctx.stroke();

      // Center circle
      ctx.shadowColor = `rgba(150, 220, 255, ${glowAmount})`;
      ctx.shadowBlur = 18 + progress * 12;
      ctx.fillStyle = `rgba(150, 220, 255, ${0.7 + progress * 0.3})`;
      ctx.beginPath();
      ctx.arc(nodeX, nodeY, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowColor = 'transparent';

      // Label
      ctx.font = '11px "Space Grotesk", Arial, sans-serif';
      ctx.fillStyle = `rgba(200, 220, 255, ${0.8 + progress * 0.2})`;
      ctx.textAlign = 'center';
      ctx.fillText(label, nodeX, nodeY + radius + 22);

      return { x: nodeX, y: nodeY };
    };

    const drawConnections = (nodes: { x: number; y: number }[]) => {
      for (let i = 0; i < nodes.length - 1; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x;
          const dy = nodes[j].y - nodes[i].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 400;

          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.3;
            ctx.strokeStyle = `rgba(80, 120, 180, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const drawAIParticles = () => {
      const particleCount = 20;
      for (let i = 0; i < particleCount; i++) {
        const angle = (time * 0.0003 + (i / particleCount) * Math.PI * 2) % (Math.PI * 2);
        const radius = 180 + Math.sin(time * 0.0005 + i) * 80;
        const x = canvas.width / 2 + Math.cos(angle) * radius;
        const y = canvas.height / 2 + Math.sin(angle) * radius;

        const size = 1.5 + Math.sin(time * 0.003 + i) * 0.8;
        const opacity = 0.4 + Math.sin(time * 0.004 + i) * 0.4;

        ctx.shadowColor = `rgba(120, 180, 255, ${opacity})`;
        ctx.shadowBlur = 6;
        ctx.fillStyle = `rgba(120, 180, 255, ${opacity})`;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowColor = 'transparent';
      }
    };

    const animate = () => {
      // Clear with dark background
      ctx.fillStyle = 'rgba(5, 5, 15, 0.95)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Grid pattern
      ctx.strokeStyle = 'rgba(60, 90, 140, 0.08)';
      ctx.lineWidth = 0.5;
      const gridSize = 40;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw AI particles background
      drawAIParticles();

      // Update service progress
      services.forEach((service, index) => {
        const staggerDelay = index * 800;
        const elapsed = Math.max(0, time - staggerDelay);
        service.progress = Math.min(1, elapsed / 1500);
      });

      // Draw service nodes
      const nodes: { x: number; y: number }[] = [];
      services.forEach((service) => {
        const node = drawServiceNode(
          service.x,
          service.y,
          service.name,
          service.progress
        );
        nodes.push(node);
      });

      // Draw connections
      drawConnections(nodes);

      // Draw progress bars
      services.forEach((service) => {
        const barX = service.x;
        const barY = service.y;
        drawProgressBar(barX, barY, service.progress, 50);
      });

      // Draw center "AI" indicator
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const pulse = Math.sin(time * 0.004) * 0.3 + 0.7;

      // Glow effect for text
      ctx.shadowColor = `rgba(120, 180, 255, ${pulse * 0.6})`;
      ctx.shadowBlur = 15;
      ctx.fillStyle = `rgba(150, 200, 255, ${pulse * 0.5})`;
      ctx.font = 'bold 20px "Space Grotesk", Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('AI Processing', centerX, centerY);
      ctx.shadowColor = 'transparent';

      ctx.font = '11px "Space Grotesk", Arial, sans-serif';
      ctx.fillStyle = `rgba(120, 180, 255, ${pulse * 0.6})`;
      ctx.fillText('Services Integration', centerX, centerY + 22);

      // Loop timer
      time = (time + 16) % duration;
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
