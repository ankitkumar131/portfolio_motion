import { $, FINE } from '../utils.js';

/**
 * Custom crosshair cursor — pink dot (instant) + cyan ring (lerped).
 * Desktop / fine-pointer only.
 */
export function initCursor() {
  if (!FINE) return;
  const dot = $('#cursor-dot');
  const ring = $('#cursor-ring');
  if (!dot || !ring) return;

  let mx = -100;
  let my = -100;
  let rx = -100;
  let ry = -100;
  let scale = 1;
  let visualScale = 1;

  window.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
  }, { passive: true });

  const isInteractive = (t) => t && t.closest && t.closest('a, button, [data-hover]');
  document.addEventListener('mouseover', (e) => {
    if (isInteractive(e.target)) scale = 1.9;
  }, { passive: true });
  document.addEventListener('mouseout', (e) => {
    if (isInteractive(e.target)) scale = 1;
  }, { passive: true });
  window.addEventListener('mousedown', () => { scale = 0.75; });
  window.addEventListener('mouseup', () => { scale = 1; });

  const loop = () => {
    rx += (mx - rx) * 0.16;
    ry += (my - ry) * 0.16;
    visualScale += (scale - visualScale) * 0.2;
    dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%) scale(${visualScale.toFixed(3)})`;
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
}
