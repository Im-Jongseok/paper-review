import type { ReviewScene } from '../papers/types';
import { PIM_GROUPS } from '../features/industry/pim/model';
export const CEREBRAS_MODES = ['wafer', 'core', 'stack'] as const;
export const CXMT_MODES = ['baseline', 'compact', 'array', 'density'] as const;
export function sceneStepCount(scene: ReviewScene) {
  if (scene.kind === 'hbm') return scene.problems?.length || 1;
  if (scene.kind !== 'industry') return 1;
  switch (scene.topic) {
    case 'pim':
      return PIM_GROUPS.length;
    case 'cxmt':
      return CXMT_MODES.length;
    case 'cerebras':
      return CEREBRAS_MODES.length;
  }
}
