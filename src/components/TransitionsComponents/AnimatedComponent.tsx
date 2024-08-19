import { Transitions, useTheme } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { AnimationFramer } from './types';
import { convertFramerEasing } from 'src/utils/functions';

export type AnimationTypeKeys =
  | 'opacity'
  | 'translationTop'
  | 'translationBottom'
  | 'translationRight'
  | 'translationLeft';

export default function AnimatedComponent({
  children,
  step = 0,
  delay = 0,
  duration = 0.3,
  easing = 'easeInOut',
  animations = ['opacity'],
  isVisible = true,
  noExitAnimation = false,
}: {
  children: React.ReactNode;
  step?: number;
  delay?: number;
  duration?: number;
  easing?: keyof Transitions['easingCurves'];
  animations?: AnimationTypeKeys[];
  isVisible?: boolean;
  noExitAnimation?: boolean;
}) {
  const theme = useTheme();

  const ANIMATIONS_SUCCESSION = (2 * duration) / 3;
  const NO_ANIMATION_VALUES: AnimationFramer = {
    initial: false,
    animate: false,
  };

  const easingCurve = convertFramerEasing(easing, theme);

  const animation: AnimationFramer = animations
    ? {
        initial: constructAnimationObject(animations, 'initial'),
        animate: constructAnimationObject(animations, 'animate'),
      }
    : NO_ANIMATION_VALUES;

  function constructAnimationObject(
    keys: AnimationTypeKeys[],
    type: 'initial' | 'animate',
  ) {
    const animationObject: { [key: string]: number } = {};

    keys.forEach((key) => {
      switch (key) {
        case 'opacity':
          animationObject[key] = type === 'initial' ? 0 : 1;
          break;
        case 'translationTop':
          animationObject['y'] = type === 'initial' ? -100 : 0;
          break;
        case 'translationBottom':
          animationObject['y'] = type === 'initial' ? 100 : 0;
          break;
        case 'translationRight':
          animationObject['x'] = type === 'initial' ? 100 : 0;
          break;
        case 'translationLeft':
          animationObject['x'] = type === 'initial' ? 100 : 0;
          break;
      }
    });

    return animationObject;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          style={{ width: '100%', height: '100%' }}
          initial={animation.initial}
          animate={animation.animate}
          exit={noExitAnimation ? false : animation.initial}
          transition={{
            delay: delay + ANIMATIONS_SUCCESSION * step,
            duration: duration,
            ease: easingCurve,
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
