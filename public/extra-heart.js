/**
 * ==============================================================================
 * EXTRA 3D PARTICLE HEART & GLOWING PORTAL BEAM ENGINE
 * Exact implementation preserved from Standalone Finale for Chapter 4 (EXTRA)
 * ==============================================================================
 */

(function () {
  "use strict";

  let animId = null;
  let canvas = null;
  let ctx = null;
  let width = 0;
  let height = 0;
  let dpr = 1;

  // 3D Particles array
  const particles = [];

  // Rising portal sparks
  const portalSparks = [];
  const sparkCount = 38;

  // 3D Camera & Orientation Parameters
  let rotY = 0;
  let rotX = 0;
  let targetRotY = 0;
  let targetRotX = 0;
  let rotVelY = 0.0055; // Gentle continuous auto-rotation
  let rotVelX = 0;

  // Drag / Touch Interaction
  let isDragging = false;
  let prevMouseX = 0;
  let prevMouseY = 0;
  let lastInteraction = performance.now();
  let startTime = performance.now();
  let resizeAttached = false;
  let pointerListenersAttached = false;

  function resetPortalSpark(index, initial) {
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.random() * 90;
    portalSparks[index] = {
      x: Math.cos(angle) * radius,
      y: (initial ? Math.random() * 100 : 0) + 120, // starts at platform level
      z: Math.sin(angle) * (radius * 0.35),
      vy: -(Math.random() * 1.8 + 0.9), // rising upward towards heart
      vx: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.6 + 0.4,
      size: Math.random() * 1.6 + 0.6,
      life: Math.random() * 60 + 40
    };
  }

  // Parametric Heart 3D Formulation (Sculpted Defined Heart Shape, +30% particles, 27% pink)
  function createHeartParticles() {
    particles.length = 0;
    // 30% more particles: 1560 on mobile, 2730 on desktop
    const baseCount = window.innerWidth < 640 ? 1200 : 2100;
    const particleCount = Math.round(baseCount * 1.30);

    for (let i = 0; i < particleCount; i++) {
      // 1. Angle sampling biased to emphasize the distinctive heart curves:
      // sharp bottom tip (t ~ PI), deep top cleft (t ~ 0), and rounded outer lobes
      let t;
      const angleBias = Math.random();
      if (angleBias < 0.28) {
        // Sharp bottom point
        t = Math.PI + (Math.random() - 0.5) * 0.65;
      } else if (angleBias < 0.54) {
        // Deep top cleft dip
        t = (Math.random() > 0.5 ? 0 : Math.PI * 2) + (Math.random() - 0.5) * 0.75;
      } else {
        // Upper lobes and outer curves
        t = Math.random() * Math.PI * 2;
      }

      // Classic parametric heart equations
      const x0 = 16 * Math.pow(Math.sin(t), 3);
      const y0 = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));

      // Thickness profile: fuller at top lobes, tapering to a sharp clean tip at bottom
      const normY = (y0 + 17) / 29; // 0 (top) to 1 (bottom tip)
      const maxThickness = Math.sin(normY * Math.PI) * 8.5 * Math.pow(Math.max(0, 1 - normY * 0.62), 0.72);

      // Concentration distribution:
      // 78% of particles placed tightly on the outer perimeter contour shell (0.92 - 1.0)
      // for an ultra-defined, crisp heart silhouette. 22% for subtle inner 3D volume.
      const isOuterShell = (i % 100) < 78;
      const shellFactor = isOuterShell
        ? (0.92 + Math.random() * 0.08)
        : (0.42 + Math.pow(Math.random(), 0.75) * 0.46);

      const zAngle = (Math.random() - 0.5) * Math.PI;
      const x = x0 * shellFactor;
      const y = y0 * shellFactor;
      const z = Math.sin(zAngle) * maxThickness * (isOuterShell ? 0.94 : shellFactor);

      // Twinkle & oscillation
      const twinkleSpeed = Math.random() * 0.04 + 0.02;
      const twinklePhase = Math.random() * Math.PI * 2;
      const size = isOuterShell ? (Math.random() * 1.5 + 0.9) : (Math.random() * 1.2 + 0.6);

      // Color Palette: EXACTLY 27% PINK, 73% RADIANT CYAN & ELECTRIC BLUE
      const isPink = (i % 100) < 27;
      let r, g, b;

      if (isPink) {
        const pinkTone = Math.random();
        if (pinkTone > 0.72) {
          // Radiant pink-white highlight
          r = 255; g = 205; b = 235;
        } else if (pinkTone > 0.35) {
          // Vivid neon hot pink
          r = 255; g = 42; b = 132;
        } else {
          // Glowing rose magenta
          r = 255; g = 78; b = 168;
        }
      } else {
        const blueTone = Math.random();
        if (blueTone > 0.75) {
          // Bright white-cyan highlight
          r = 190; g = 245; b = 255;
        } else if (blueTone < 0.28) {
          // Deep royal electric blue
          r = 0; g = 110; b = 255;
        } else {
          // Electric luminous cyan
          r = 0; g = 217; b = 255;
        }
      }

      particles.push({
        origX: x,
        origY: y,
        origZ: z,
        size: size,
        r: r,
        g: g,
        b: b,
        baseAlpha: isOuterShell ? (Math.random() * 0.35 + 0.65) : (Math.random() * 0.35 + 0.45),
        alpha: 1,
        twinkleSpeed: twinkleSpeed,
        twinklePhase: twinklePhase
      });
    }

    // Initialize portal ascending sparks
    portalSparks.length = 0;
    for (let i = 0; i < sparkCount; i++) {
      resetPortalSpark(i, true);
    }
  }

  // Handle Resize with HiDPI support
  function resizeCanvas() {
    if (!canvas || !ctx) return;
    const container = document.getElementById("finale3DHeartContainer");
    const rect = canvas.getBoundingClientRect();
    width = rect.width || (container ? container.clientWidth : 0) || Math.min(window.innerWidth - 32, 600);
    height = rect.height || (container ? container.clientHeight : 0) || 420;
    dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  // Pointer Interactivity (Drag to rotate 3D heart)
  function onPointerDown(x, y) {
    isDragging = true;
    prevMouseX = x;
    prevMouseY = y;
    lastInteraction = performance.now();
  }

  function onPointerMove(x, y) {
    if (!isDragging) return;
    const dx = x - prevMouseX;
    const dy = y - prevMouseY;

    targetRotY += dx * 0.0075;
    targetRotX += dy * 0.0065;

    // Clamp vertical pitch tilt to avoid upside-down flip
    targetRotX = Math.max(-0.6, Math.min(0.6, targetRotX));

    rotVelY = dx * 0.004;
    rotVelX = dy * 0.004;

    prevMouseX = x;
    prevMouseY = y;
    lastInteraction = performance.now();
  }

  function onPointerUp() {
    isDragging = false;
  }

  function attachPointerEvents() {
    if (pointerListenersAttached || !canvas) return;
    pointerListenersAttached = true;

    // Mouse events
    canvas.addEventListener("mousedown", (e) => {
      onPointerDown(e.clientX, e.clientY);
    });

    window.addEventListener("mousemove", (e) => {
      if (isDragging) {
        onPointerMove(e.clientX, e.clientY);
      }
    });

    window.addEventListener("mouseup", onPointerUp);

    // Touch events (Non-hijacking swipe)
    canvas.addEventListener("touchstart", (e) => {
      if (e.touches.length === 1) {
        onPointerDown(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    window.addEventListener("touchmove", (e) => {
      if (isDragging && e.touches.length === 1) {
        onPointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    window.addEventListener("touchend", onPointerUp, { passive: true });
  }

  // Main 3D Render Loop
  function render(now) {
    animId = requestAnimationFrame(render);

    if (!ctx || !canvas) return;

    if (width <= 10 || height <= 10) {
      resizeCanvas();
    }

    const elapsed = (now - startTime) / 1000;
    const idleTime = now - lastInteraction;

    // Auto-rotation when not interacting
    if (!isDragging) {
      if (idleTime > 1500) {
        rotVelY = 0.0055;
        targetRotY += rotVelY;
        targetRotX = Math.sin(elapsed * 0.8) * 0.12;
      } else {
        targetRotY += rotVelY;
        targetRotX += rotVelX;
        rotVelY *= 0.94;
        rotVelX *= 0.94;
      }
    }

    // Smooth interpolation
    rotY += (targetRotY - rotY) * 0.1;
    rotX += (targetRotX - rotX) * 0.1;

    // Heartbeat rhythmic pulsation (double beat: lub-dub every 1.25s)
    const cycle = (elapsed % 1.25) / 1.25;
    let pulseScale = 1.0;
    if (cycle < 0.15) {
      pulseScale = 1.0 + 0.08 * Math.sin((cycle / 0.15) * Math.PI);
    } else if (cycle > 0.22 && cycle < 0.38) {
      pulseScale = 1.0 + 0.05 * Math.sin(((cycle - 0.22) / 0.16) * Math.PI);
    }

    // Floating vertical bobbing
    const floatY = Math.sin(elapsed * 1.6) * 7;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Responsive Scale & 3D Center
    const isSmallScreen = width < 600;
    const baseScale = isSmallScreen ? (width / 44) : 14.5;
    const scale = baseScale * pulseScale;
    const centerX = width / 2;
    const centerY = height * 0.44 + floatY;

    const cosY = Math.cos(rotY);
    const sinY = Math.sin(rotY);
    const cosX = Math.cos(rotX);
    const sinX = Math.sin(rotX);

    // Perspective Projection Camera
    const fov = 380;
    const cameraZ = 320;

    // Ambient radial light emanating from heart center (soft pink and cyan atmosphere)
    const ambientRadial = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, scale * 26);
    ambientRadial.addColorStop(0, "rgba(0, 217, 255, 0.20)");
    ambientRadial.addColorStop(0.32, "rgba(255, 42, 132, 0.11)");
    ambientRadial.addColorStop(0.65, "rgba(0, 110, 255, 0.05)");
    ambientRadial.addColorStop(1, "rgba(2, 5, 14, 0)");
    ctx.fillStyle = ambientRadial;
    ctx.fillRect(0, 0, width, height);

    // Update & Render Rising Portal Sparks
    ctx.save();
    ctx.globalCompositeOperation = "lighter";

    for (let i = 0; i < portalSparks.length; i++) {
      const spark = portalSparks[i];
      spark.y += spark.vy;
      spark.x += spark.vx;
      spark.life--;

      if (spark.life <= 0 || spark.y < -30) {
        resetPortalSpark(i, false);
        continue;
      }

      // 3D projection for portal spark
      const xRot = spark.x * cosY + spark.z * sinY;
      const zRot = -spark.x * sinY + spark.z * cosY;
      const pScale = fov / (cameraZ + zRot);

      const screenX = centerX + xRot * pScale;
      const screenY = centerY + (spark.y + 30) * (pScale * 0.65);

      const curAlpha = (spark.life / 60) * spark.alpha;
      ctx.fillStyle = `rgba(94, 243, 255, ${curAlpha})`;
      ctx.beginPath();
      ctx.arc(screenX, screenY, spark.size * pScale * 0.6, 0, Math.PI * 2);
      ctx.fill();
    }

    // Project and Sort Heart Particles (Depth sorting for realistic 3D volume)
    const projectedParticles = [];

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // 3D Rotation
      // 1. Yaw rotation around Y axis
      const x1 = p.origX * cosY + p.origZ * sinY;
      const z1 = -p.origX * sinY + p.origZ * cosY;

      // 2. Pitch rotation around X axis
      const y2 = p.origY * cosX - z1 * sinX;
      const z2 = p.origY * sinX + z1 * cosX;

      // Perspective depth calculation
      const projScale = fov / (cameraZ + z2 * (scale * 0.12));
      const screenX = centerX + x1 * scale * (projScale / 2.2);
      const screenY = centerY + y2 * scale * (projScale / 2.2);

      // Twinkle effect
      p.twinklePhase += p.twinkleSpeed;
      const twinkle = 0.75 + 0.25 * Math.sin(p.twinklePhase);
      const alpha = p.baseAlpha * twinkle * Math.min(Math.max((z2 + 25) / 50, 0.4), 1.2);

      projectedParticles.push({
        screenX,
        screenY,
        z: z2,
        size: p.size * (projScale / 2.2) * (pulseScale > 1.03 ? 1.15 : 1.0),
        r: p.r,
        g: p.g,
        b: p.b,
        alpha: alpha
      });
    }

    // Draw Heart Particles with luminous glow
    for (let i = 0; i < projectedParticles.length; i++) {
      const p = projectedParticles[i];

      // 1. Outer radiant glow halo
      ctx.fillStyle = `rgba(${p.r}, ${p.g}, ${p.b}, ${p.alpha * 0.28})`;
      ctx.beginPath();
      ctx.arc(p.screenX, p.screenY, p.size * 2.8, 0, Math.PI * 2);
      ctx.fill();

      // 2. Core bright star dot
      ctx.fillStyle = `rgba(${p.r}, ${p.g}, ${p.b}, ${p.alpha})`;
      ctx.beginPath();
      ctx.arc(p.screenX, p.screenY, p.size, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  function start3DExtraHeartScene() {
    canvas = document.getElementById("heartCanvas");
    if (!canvas) return;

    stop3DExtraHeartScene();

    ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    createHeartParticles();
    resizeCanvas();
    requestAnimationFrame(() => {
      resizeCanvas();
    });

    if (!resizeAttached) {
      resizeAttached = true;
      window.addEventListener("resize", () => {
        resizeCanvas();
      }, { passive: true });
      window.addEventListener("orientationchange", () => {
        setTimeout(resizeCanvas, 150);
      }, { passive: true });
    }

    attachPointerEvents();

    startTime = performance.now();
    lastInteraction = performance.now();
    animId = requestAnimationFrame(render);
  }

  function stop3DExtraHeartScene() {
    if (animId) {
      cancelAnimationFrame(animId);
      animId = null;
    }
    isDragging = false;
    if (ctx && canvas) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  // Expose to window
  if (typeof window !== "undefined") {
    window.start3DExtraHeartScene = start3DExtraHeartScene;
    window.stop3DExtraHeartScene = stop3DExtraHeartScene;
    window.initFinaleScene = start3DExtraHeartScene;
    window.disposeFinaleThreeScene = stop3DExtraHeartScene;
  }

  // Also auto-start if already on chapter 4
  document.addEventListener("DOMContentLoaded", () => {
    const page4 = document.getElementById("pageChapter4");
    if (page4 && page4.classList.contains("active")) {
      start3DExtraHeartScene();
    }
  });

})();
