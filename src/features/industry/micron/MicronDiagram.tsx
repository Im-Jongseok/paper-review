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

type ModuleKind = 'desktop' | 'laptop' | 'server';

function ModuleDiagram({ kind }: { kind: ModuleKind }) {
  const [assembled, setAssembled] = useState(kind === 'desktop');
  const module = model[kind];
  const name = {
    desktop: 'MSI 보드의 DDR5 CAMM2',
    laptop: 'Micron LPCAMM2',
    server: 'Micron SOCAMM2',
  }[kind];
  const desktop = kind === 'desktop';
  const [cpuX, cpuY] = model.desktop.cpu;
  return (
    <>
      <svg
        viewBox={`0 0 ${model.width} ${model.height}`}
        role="img"
        aria-label={`${name} 모듈과 압착 커넥터의 장착 구조`}
      >
        <g dangerouslySetInnerHTML={{ __html: module.board + module.socket }} />
        {module.contacts.map((path) => (
          <path key={path} d={path} className="micron-contact" />
        ))}
        {desktop && (
          <text x={cpuX} y={cpuY} className="micron-chip-label">
            CPU 소켓
          </text>
        )}
        <g
          className="micron-module-layer"
          style={{ transform: `translateY(${assembled ? 0 : module.lift}px)` }}
          dangerouslySetInnerHTML={{ __html: module.module }}
        />
      </svg>
      <figcaption className="micron-caption">
        <span>
          <i className={`micron-key ${desktop ? 'desktop-module-key' : 'module-key'}`} />{' '}
          {desktop ? 'DDR5 CAMM2 모듈' : 'LPDDR5X 모듈'}
        </span>
        <span>
          <i className="micron-key contact-key" /> 압착 접점
        </span>
        <span>
          <i className={`micron-key ${desktop ? 'desktop-board-key' : 'board-key'}`} /> 메인보드
        </span>
        <button
          type="button"
          className="micron-assemble"
          onClick={() => setAssembled((current) => !current)}
        >
          {assembled ? '분해 보기' : '장착 보기'}
        </button>
      </figcaption>
    </>
  );
}

export function MicronDiagram({ phase }: { phase: number }) {
  const [camm, setCamm] = useState<'desktop' | 'laptop'>('desktop');
  const kind = phase === 2 ? 'server' : camm;
  return (
    <figure className="industry-visual micron-visual">
      {phase === 1 && (
        <div className="industry-view-switch" role="group" aria-label="CAMM2 장착 예시 선택">
          <button
            type="button"
            aria-pressed={camm === 'desktop'}
            onClick={() => setCamm('desktop')}
          >
            MSI DDR5 CAMM2
          </button>
          <button type="button" aria-pressed={camm === 'laptop'} onClick={() => setCamm('laptop')}>
            Micron LPDDR5X LPCAMM2
          </button>
        </div>
      )}
      {phase === 0 ? (
        <>
          <svg
            viewBox={`0 0 ${model.width} ${model.height}`}
            role="img"
            aria-label="CPU와 메인 메모리 사이의 데이터 경로"
          >
            <BandwidthDiagram />
          </svg>
          <figcaption className="micron-caption">
            <span>
              <i className="micron-key contact-key" /> CPU ↔ 메인 메모리 데이터 경로
            </span>
          </figcaption>
        </>
      ) : (
        <ModuleDiagram key={kind} kind={kind} />
      )}
    </figure>
  );
}
