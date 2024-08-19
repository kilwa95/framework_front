import {
  AnimationControls,
  TargetAndTransition,
  VariantLabels,
} from 'framer-motion';

export interface AnimationFramer<T = any> {
  initial: boolean | VariantLabels | T | undefined;
  animate:
    | boolean
    | VariantLabels
    | AnimationControls
    | TargetAndTransition
    | undefined;
}
