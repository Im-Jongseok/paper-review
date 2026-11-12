import './micron.css';

const entries = [
  {
    name: 'DDR6',
    role: '서버용 DRAM 인터페이스',
    metric: '>2배',
    detail: 'DDR5 대비 대역폭 개발 목표',
  },
  {
    name: 'CAMM2',
    role: '보드에 눕혀 장착하는 교체형 모듈',
    metric: '9,600 MT/s',
    detail: 'Micron 노트북용 LPCAMM2 · LPDDR5X 최대 사양',
  },
  {
    name: 'SOCAMM2',
    role: '데이터센터용 소형 교체형 모듈',
    metric: '256 GB',
    detail: 'Micron LPDDR5X 모듈 · 고객 샘플 공개',
  },
];

export function MicronDiagram() {
  return (
    <figure className="industry-visual micron-visual" aria-labelledby="micron-comparison">
      <figcaption id="micron-comparison">Micron의 메모리 규격과 모듈</figcaption>
      <dl>
        {entries.map(({ name, role, metric, detail }) => (
          <div key={name} className="micron-entry">
            <dt>
              <strong>{name}</strong>
              <span>{role}</span>
            </dt>
            <dd>
              <strong>{metric}</strong>
              <span>{detail}</span>
            </dd>
          </div>
        ))}
      </dl>
    </figure>
  );
}
