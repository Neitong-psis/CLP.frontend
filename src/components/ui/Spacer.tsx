interface SpacerProps {
  height?: number | string;
  width?: number | string;
}

export function Spacer({ height, width }: SpacerProps) {
  return (
    <div
      aria-hidden="true"
      style={{
        height: typeof height === 'number' ? `${height}px` : height,
        width: typeof width === 'number' ? `${width}px` : width,
      }}
    />
  );
}
