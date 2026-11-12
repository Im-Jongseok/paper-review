import { lazy, Suspense } from 'react';
import type { IndustryScene } from '../../papers/types';
import { MicronDiagram } from './micron/MicronDiagram';
import './industry.css';
const CerebrasModel = lazy(() =>
  import('./cerebras/CerebrasModel').then((module) => ({ default: module.CerebrasModel })),
);
const CxmtModel = lazy(() =>
  import('./cxmt/CxmtModel').then((module) => ({ default: module.CxmtModel })),
);
const PimDiagram = lazy(() =>
  import('./pim/PimDiagram').then((module) => ({ default: module.PimDiagram })),
);
export function IndustryDiagram({ topic }: { topic: IndustryScene['topic'] }) {
  if (topic === 'micron') return <MicronDiagram />;
  return (
    <Suspense
      fallback={
        <div className="industry-visual" role="status">
          모형 불러오는 중
        </div>
      }
    >
      {topic === 'cerebras' ? <CerebrasModel /> : topic === 'cxmt' ? <CxmtModel /> : <PimDiagram />}
    </Suspense>
  );
}
