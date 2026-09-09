import { animate, onScroll, stagger, splitText } from 'animejs';
import { $, $$, REDUCED, scrambleTo, whenInView } from '../utils.js';

/**
 * Section headers: scrambling index line, char-split title reveal,
 * self-drawing rule and slow-parallax ghost word (scrubbed).
 */
export function initHeadings() {
  $$('.sec-head').forEach((head) => {
    const no = $('.sec-no', head);
    const title = $('.sec-title', head);
    const rule = $('.sec-rule', head);
    const ghost = $('.sec-ghost', head);
    const section = head.closest('section');
    if (!title) return;

    if (!REDUCED) {
      // scramble the "01 //" index when it enters the viewport
      if (no) {
        const original = no.textContent.trim();
        no.dataset.text = original;
        whenInView(no, () => scrambleTo(no, original, 24), 0.5);
      }

      // char-split the title, staggered reveal on scroll
      const { chars } = splitText(title, { words: false, chars: true });
      animate(chars, {
        y: ['1.4em', '0em'],
        opacity: [0, 1],
        rotate: [8, 0],
        duration: 700,
        ease: 'out(4)',
        delay: stagger(22),
        autoplay: onScroll({ target: head, enter: 'top 82%' }),
      });

      if (rule) {
        animate(rule, {
          scaleX: [0, 1],
          duration: 900,
          ease: 'out(3)',
          autoplay: onScroll({ target: head, enter: 'top 80%' }),
        });
      }

      // ghost word drifts sideways as you scroll through the section
      if (ghost && section) {
        animate(ghost, {
          x: ['-4%', '7%'],
          ease: 'linear',
          autoplay: onScroll({
            target: section,
            enter: 'top bottom',
            leave: 'bottom top',
            sync: true,
          }),
        });
      }
    }
  });
}
