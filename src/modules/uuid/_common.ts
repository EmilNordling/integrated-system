export function bytesToUuid(bytes: number[] | Uint8Array): string {
  const bits: string[] = [...bytes].map((bit): string => {
    const s: string = bit.toString(16);

    return bit < 0x10 ? '0' + s : s;
  });

  return [
    ...bits.slice(0, 4),
    '-',
    ...bits.slice(4, 6),
    '-',
    ...bits.slice(6, 8),
    '-',
    ...bits.slice(8, 10),
    '-',
    ...bits.slice(10, 16),
  ].join('');
}
