import { useState } from 'react';
import type { PaperScene } from '../../papers/types';
import './stack-capacity.css';

export function StackCapacityExample({
  example,
}: {
  example: NonNullable<PaperScene['capacityExample']>;
}) {
  const [weightGB, setWeightGB] = useState(example.weightsGB[0]);
  return (
    <div className="stack-capacity">
      <label>
        가중치 용량
        <select value={weightGB} onChange={(event) => setWeightGB(Number(event.target.value))}>
          {example.weightsGB.map((size) => (
            <option key={size} value={size}>
              {size} GB
            </option>
          ))}
        </select>
      </label>
      <dl aria-live="polite">
        {example.stacks.map(({ name, capacityGB }) => (
          <div key={name}>
            <dt>
              {name} · {capacityGB} GB/스택
            </dt>
            <dd>{Math.ceil(weightGB / capacityGB)}스택</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
