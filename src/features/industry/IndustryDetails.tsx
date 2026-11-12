import { useCerebrasMode } from './cerebras/context';
import { PimDetails } from './pim/PimDetails';
import { CxmtDetails } from './cxmt/CxmtDetails';
import { CerebrasDetails } from './cerebras/CerebrasDetails';
import type { IndustryScene } from '../../papers/types';
export function IndustryDetails({ scene }: { scene: IndustryScene }) {
  const { mode } = useCerebrasMode();
  if (scene.topic === 'pim') return <PimDetails />;
  if (scene.topic === 'cxmt') return <CxmtDetails scene={scene} />;
  if (scene.topic === 'micron') {
    return (
      <div className="industry-details">
        <div className="industry-connection">
          <strong>논문의 메모리 벽과 연결</strong>
          <p>{scene.connection}</p>
        </div>
        <p className="industry-qualification">{scene.qualification}</p>
        <div className="industry-sources">
          {scene.links.map(({ label, url }) => (
            <a key={url} href={url} target="_blank" rel="noopener noreferrer">
              {label} ↗
            </a>
          ))}
        </div>
      </div>
    );
  }
  if (scene.topic === 'cerebras' && mode !== 'wafer') return <CerebrasDetails />;
  return (
    <div className="industry-details">
      <ol className="industry-updates">
        {scene.updates.map((update) => (
          <li key={update.date}>
            <div>
              <time>{update.date}</time>
              <span className="industry-status">{update.status}</span>
            </div>
            <p>{update.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
