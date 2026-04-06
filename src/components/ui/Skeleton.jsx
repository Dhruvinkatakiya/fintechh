export default function Skeleton({ width, height, className = '', borderRadius = '8px' }) {
  return (
    <div
      className={`skeleton ${className}`}
      style={{
        width: width || '100%',
        height: height || '20px',
        borderRadius,
      }}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="card p-6 space-y-3">
      <Skeleton width="60%" height="14px" />
      <Skeleton width="40%" height="32px" />
      <Skeleton width="80%" height="12px" />
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="card p-6 space-y-4">
      <Skeleton width="40%" height="20px" />
      <Skeleton height="220px" borderRadius="12px" />
    </div>
  );
}

export function TableRowSkeleton({ cols = 5 }) {
  return (
    <tr>
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i}>
          <Skeleton width={i === 1 ? '70%' : '50%'} height="16px" />
        </td>
      ))}
    </tr>
  );
}
