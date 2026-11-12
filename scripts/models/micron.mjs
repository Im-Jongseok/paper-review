import { writeFileSync } from 'node:fs';
import * as anatomy from '../vendor/anatomy/iso-kit.mjs';

const width = 760;
const height = 425;
const view = { azimuth: 70, elevation: 47, pad: 38 };
const part = (x, y, w, d, z, h, material) => ({
  plan: { x, y, w, d, r: Math.min(4, w / 8, d / 8) },
  z,
  h,
  material,
});
const corners = ({ plan, z, h }) => anatomy.boxCorners(plan, z, z + h);
const draw = ({ plan, z, h, material }, camera) =>
  anatomy.solidSvg(anatomy.slabOf(plan, z, h, camera, 3), { className: material });
const drawParts = (parts, camera) => parts.map((shape) => draw(shape, camera)).join('');
const point = (xyz, camera) => anatomy.iso(xyz, camera).map((value) => Math.round(value));

function bandwidth() {
  const board = part(-226, -91, 452, 182, 0, 5, 'board');
  const cpu = part(-184, -45, 104, 90, 5, 13, 'chip');
  const memory = part(62, -55, 120, 110, 5, 12, 'chip');
  const camera = anatomy.fitProjection(corners(board), width, height, view);
  const routes = Array.from({ length: 7 }, (_, i) => {
    const y = -29 + i * 9;
    return anatomy.onTop(
      [
        [-80, y],
        [-29, y],
        [0, y + 8],
        [62, y + 8],
      ],
      5,
      camera,
    );
  });
  return {
    board: draw(board, camera),
    packages: drawParts([cpu, memory], camera),
    routes,
    cpu: point([-132, 0, 18], camera),
    memory: point([122, 0, 17], camera),
  };
}

function moduleDiagram(server) {
  // The server module is long and narrow. The heights and component spacing are schematic.
  const length = server ? 322 : 274;
  const depth = server ? 52 : 126;
  const x = -length / 2;
  const y = -depth / 2;
  const rise = 71;
  const board = part(x - 28, y - 27, length + 56, depth + 54, 0, 5, 'board');
  const socket = part(x + 18, y + 5, length - 36, depth - 10, 5, 8, 'socket');
  const pcb = part(x, y, length, depth, 13, 5, 'module');
  const packageWidth = server ? 56 : 48;
  const packages = Array.from({ length: 4 }, (_, i) =>
    part(
      x + 23 + i * ((length - 46 - packageWidth) / 3),
      y + 12,
      packageWidth,
      depth - 24,
      18,
      8,
      'chip',
    ),
  );
  const camera = anatomy.fitProjection(
    [...corners(board), ...corners({ ...pcb, z: pcb.z + rise + 8 })],
    width,
    height,
    view,
  );
  const contacts = Array.from({ length: server ? 23 : 17 }, (_, i) => {
    const px = x + 26 + i * ((length - 56) / (server ? 22 : 16));
    return anatomy.onTop(
      [
        [px, y + 12],
        [px, -y - 12],
      ],
      13,
      camera,
    );
  });
  return {
    board: draw(board, camera),
    socket: draw(socket, camera),
    module: drawParts([pcb, ...packages], camera),
    contacts,
    lift: point([0, 0, rise], camera)[1] - point([0, 0, 0], camera)[1],
  };
}

function desktopDiagram() {
  const board = part(-215, -132, 430, 272, 0, 6, 'desktop-board');
  const socket = part(44, -86, 102, 175, 6, 8, 'socket');
  const moduleRim = part(37, -94, 116, 192, 14, 3, 'metal-gold');
  const pcb = part(38, -93, 114, 190, 17, 4, 'desktop-module');
  const cpuFrame = part(-158, -55, 132, 132, 6, 8, 'metal');
  const cpu = part(-148, -45, 112, 112, 14, 7, 'chip');
  const heatsink = part(-183, -113, 174, 36, 6, 18, 'metal');
  const rise = 76;
  const camera = anatomy.fitProjection(
    [...corners(board), ...corners({ ...pcb, z: pcb.z + rise + 7 })],
    width,
    height,
    view,
  );
  const fins = Array.from({ length: 4 }, (_, i) =>
    part(-179, -110 + i * 8, 166, 4, 24, 3, 'metal'),
  );
  const packages = [-78, -49, 24, 53].flatMap((y) =>
    [48, 99].map((x) => part(x, y, 43, 24, 21, 5, 'chip')),
  );
  const fasteners = [
    [45, -85],
    [145, -85],
    [95, 6],
    [45, 89],
    [145, 89],
  ].map(([x, y]) =>
    anatomy.solidSvg(anatomy.cylinder(x, y, 4, 21, 3, camera, 16), { className: 'metal' }),
  );
  const contacts = Array.from({ length: 12 }, (_, row) =>
    Array.from({ length: 8 }, (_, col) => {
      const x = 52 + col * 12;
      const y = -74 + row * 13.5;
      return anatomy.onTop(
        [
          [x, y],
          [x + 4, y],
        ],
        14,
        camera,
      );
    }),
  ).flat();
  return {
    board: drawParts([board, heatsink, ...fins, cpuFrame, cpu], camera),
    socket: draw(socket, camera),
    module:
      drawParts([moduleRim, pcb, ...packages, part(88, -16, 16, 13, 21, 3, 'chip')], camera) +
      fasteners.join(''),
    contacts,
    lift: point([0, 0, rise], camera)[1] - point([0, 0, 0], camera)[1],
    cpu: point([-92, 11, 21], camera),
  };
}

writeFileSync(
  new URL('../../src/papers/ai-memory-wall/generated/micron-anatomy.json', import.meta.url),
  JSON.stringify({
    width,
    height,
    bandwidth: bandwidth(),
    desktop: desktopDiagram(),
    laptop: moduleDiagram(false),
    server: moduleDiagram(true),
  }) + '\n',
);
