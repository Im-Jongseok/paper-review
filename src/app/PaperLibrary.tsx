import type { PaperDefinition } from '../papers/types';
import { assetUrl } from './assets';
export function PaperLibrary({
  papers,
  onSelect,
}: {
  papers: PaperDefinition[];
  onSelect(paper: PaperDefinition): void;
}) {
  return (
    <main className="paper-library">
      <header>
        <h1>PAPER REVIEWS</h1>
      </header>
      <div className="paper-library-grid">
        {papers.map((paper) => (
          <button
            className="paper-library-card"
            key={paper.id}
            aria-label={`${paper.title} 발표 열기`}
            onClick={() => onSelect(paper)}
          >
            <img src={assetUrl(paper.pages[0].image)} alt={`${paper.title} 첫 페이지`} />
          </button>
        ))}
      </div>
    </main>
  );
}
