import type { PaperDefinition } from '../types';
import { scenes } from './scenes';

const asset = (file: string) => `papers/llm-inference-hardware/${file}`;
const pageTitles = [
  '논문 제목과 초록',
  '추론 동향 · Prefill과 Decode · 그림 1',
  'HBM 구조와 비용 · 그림 2·3',
  'HBM 세대 비교 · 표 1',
  '병목과 연구 방향 · 표 2',
  'HBF·3D 적층 · 그림 4·표 3',
  'PIM과 PNM · 표 4',
  '3D 적층과 저지연 통신',
  '관련 연구와 결론',
  '결론·참고문헌',
];

export const paper = {
  id: 'llm-inference-hardware',
  title: 'Challenges and Research Directions for Large Language Model Inference Hardware',
  authors: 'Xiaoyu Ma · David Patterson',
  citation: '26번 논문 · IEEE Computer 59(5), 2026 · pp.55–64',
  sourceUrl: 'https://doi.org/10.1109/MC.2026.3652916',
  pdf: asset('ieee.pdf'),
  exportFilename: 'LLM_Inference_Hardware_인터랙티브.html',
  pageSize: { width: 567, height: 774 },
  pages: pageTitles.map((title, i) => ({
    id: i + 1,
    printedPage: String(i + 55),
    title,
    image: asset(`ieee-page-${i + 1}.webp`),
    thumbnail: asset(`ieee-thumb-${i + 1}.webp`),
  })),
  scenes,
} satisfies PaperDefinition;
