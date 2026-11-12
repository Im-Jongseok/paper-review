export const MICRON_STEPS = [
  {
    label: 'MICRON · DDR6',
    title: 'CPU와 메모리 사이의\n전송량을 늘린다.',
    stat: 'DDR5 대비 2배 초과 목표',
    body: 'DDR6는 CPU와 DRAM이 데이터를 주고받는 차세대 규격이다. Micron은 서버용 DDR6의 대역폭 개발 목표를 발표했다. 도해는 CPU와 메인 메모리 사이의 전송 경로를 단순화했다.',
  },
  {
    label: 'MICRON · CAMM2 / LPCAMM2',
    title: '메모리를 눕혀 장착하고\n교체할 수 있게 한다.',
    stat: '최대 9,600 MT/s',
    body: 'CAMM2는 모듈을 보드와 평행하게 놓고 커넥터에 눌러 연결하는 장착 규격이다. Micron의 노트북용 LPCAMM2는 LPDDR5X를 사용하며, 공개 사양의 데이터 버스 폭은 128비트다.',
  },
  {
    label: 'MICRON · SOCAMM2',
    title: '서버에 소형 저전력\n메모리 모듈을 넣는다.',
    stat: '256 GB 고객 샘플',
    body: 'SOCAMM2는 데이터센터용 소형 교체 모듈이다. Micron이 공개한 256 GB 샘플에는 LPDDR5X가 들어간다. LPDDR6 기반 SOCAMM2도 후속 방향으로 제시했다.',
  },
] as const;
