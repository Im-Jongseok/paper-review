import type { PaperScene } from '../../papers/types';
import './stack-capacity.css';

export function StackCapacityExample({
  example,
}: {
  example: NonNullable<PaperScene['capacityExample']>;
}) {
  return (
    <div className="stack-capacity">
      <table>
        <caption>가중치 저장에 필요한 최소 스택 수</caption>
        <thead>
          <tr>
            <th scope="col">가중치 용량</th>
            {example.stacks.map(({ name, capacityGB }) => (
              <th key={name} scope="col">
                {name}
                <small>{capacityGB} GB/스택</small>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {example.weightsGB.map((weightGB) => (
            <tr key={weightGB}>
              <th scope="row">{weightGB.toLocaleString('en-US')} GB</th>
              {example.stacks.map(({ name, capacityGB }) => (
                <td key={name}>{Math.ceil(weightGB / capacityGB)}스택</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
