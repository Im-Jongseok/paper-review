import type { PaperDefinition } from '../types';
import { scenes } from './scenes';

const asset = (file: string) => `papers/llm-inference-hardware/${file}`;
const pageTitles = [
  '추론 하드웨어의 연구 과제',
  'Prefill과 Decode · 그림 1',
  'HBM 패키지 · 그림 2와 표 1',
  'HBM과 DDR의 비용 · 그림 3',
  '응답 지연과 병목 · 표 2',
  'HBF와 3D 적층 · 그림 4',
  '메모리 비교 · 표 3',
  'PIM과 PNM · 표 4',
  '저지연 인터커넥트',
  '결론과 연구 방법',
  '참고문헌',
  '부록 · 메모리 가격 자료',
  '가격 기록 · 1957–1987',
  '가격 기록 · 1987–1992',
  '가격 기록 · 1992–1997',
  '가격 기록 · 1997–2003',
  '가격 기록 · 2003–2011',
  '가격 기록 · 2011–2019',
  '가격 기록 · 2019년 이후',
];

export const paper = {
  id: 'llm-inference-hardware',
  title: 'Challenges and Research Directions for Large Language Model Inference Hardware',
  authors: 'Xiaoyu Ma · David Patterson',
  citation: '26번 논문 · IEEE Computer, 2026 · 저자 공개본',
  sourceUrl: 'https://doi.org/10.1109/MC.2026.3652916',
  pdf: asset('paper.pdf'),
  exportFilename: 'LLM_Inference_Hardware_인터랙티브.html',
  pageSize: { width: 612, height: 792 },
  pages: pageTitles.map((title, i) => ({
    id: i + 1,
    printedPage: String(i + 1),
    title,
    image: asset(`page-${i + 1}.webp`),
    thumbnail: asset(`thumb-${i + 1}.webp`),
  })),
  scenes,
} satisfies PaperDefinition;
