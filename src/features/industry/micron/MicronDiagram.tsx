import { useState } from 'react';
import model from '../../../papers/ai-memory-wall/generated/micron-anatomy.json';
import './micron.css';

function BandwidthDiagram() {
  const { board, packages, routes, cpu, memory } = model.bandwidth;
  return (
    <>
      <g dangerouslySetInnerHTML={{ __html: board }} />
      {routes.map((path) => (
        <path key={path} d={path} className="micron-route" />
      ))}
      <g dangerouslySetInnerHTML={{ __html: packages }} />
      <text x={cpu[0]} y={cpu[1]} className="micron-chip-label">
        CPU
      </text>
      <text x={memory[0]} y={memory[1]} className="micron-chip-label">
        DRAM
      </text>
    </>
  );
}

export function MicronDiagram({ phase }: { phase: number }) {
  const [assembled, setAssembled] = useState(false);
  const bandwidth = phase === 0;
  const server = phase === 2;
  const module = server ? model.server : model.laptop;
  const name = bandwidth ? 'DDR6' : server ? 'SOCAMM2' : 'LPCAMM2';
  const description = bandwidth
    ? 'CPU에서 메인 메모리로 이어지는 데이터 경로'
    : `${name} 모듈과 압착 커넥터, 메인보드의 장착 구조`;
  return (
    <figure className="industry-visual micron-visual">
      <svg viewBox={`0 0 ${model.width} ${model.height}`} role="img" aria-label={description}>
        {bandwidth ? (
          <BandwidthDiagram />
        ) : (
          <>
            <g dangerouslySetInnerHTML={{ __html: module.board + module.socket }} />
            {module.contacts.map((path) => (
              <path key={path} d={path} className="micron-contact" />
            ))}
            <g
              className="micron-module-layer"
              style={{ transform: `translateY(${assembled ? 0 : module.lift}px)` }}
              dangerouslySetInnerHTML={{ __html: module.module }}
            />
          </>
        )}
      </svg>
      <figcaption className="micron-caption">
        {bandwidth ? (
          <span>
            <i className="micron-key contact-key" /> CPU ↔ 메인 메모리 데이터 경로
          </span>
        ) : (
          <>
            <span>
              <i className="micron-key module-key" /> LPDDR5X 모듈
            </span>
            <span>
              <i className="micron-key contact-key" /> 압착 접점
            </span>
            <span>
              <i className="micron-key board-key" /> 메인보드
            </span>
            <button
              type="button"
              className="micron-assemble"
              onClick={() => setAssembled(!assembled)}
            >
              {assembled ? '분해 보기' : '장착 보기'}
            </button>
          </>
        )}
      </figcaption>
    </figure>
  );
}
