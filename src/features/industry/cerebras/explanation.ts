import type { CerebrasMode } from './context';
export const CEREBRAS_EXPLANATION = {
  core: {
    label: 'CEREBRAS · SRAM 이해',
    title: 'SRAM은 저장 기술,\n캐시는 메모리의 역할이다.',
    stat: '같은 SRAM, 다른 관리 방식',
    body: 'SRAM은 주기적인 재충전인 리프레시 없이 값을 유지하지만, 전원을 끄면 내용이 사라지는 메모리다. 캐시는 자주 쓸 데이터를 가까이에 보관하는 역할이며, 보통 SRAM으로 만든다. Cerebras는 코어 옆 SRAM에 가중치를 미리 배치해 가까이서 반복해서 읽는다. 칩 밖에서 다시 가져오는 이동을 줄여 데이터 재사용을 높인다.',
  },
  stack: {
    label: 'CEREBRAS · CS-6 로드맵의 설계 방향',
    title: 'SRAM의 속도에\nDRAM의 용량을 더한다.',
    stat: '용량 확장 + 데이터 지역성',
    body: 'SRAM은 빠르지만 같은 용량의 DRAM보다 넓은 면적이 필요하다. CS-6는 연산·SRAM 웨이퍼에 DRAM을 수직으로 연결해 빠른 접근과 큰 용량을 함께 확보하려는 계획이다. 속도·용량·이동 거리·재사용을 함께 고려한다는 점에서 2024년 논문의 메모리 계층 설계 방향과 연결된다.',
  },
} satisfies Partial<
  Record<CerebrasMode, { label: string; title: string; stat: string; body: string }>
>;
