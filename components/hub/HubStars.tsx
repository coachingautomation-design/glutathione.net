import { HUB_STAR_FILL, HUB_STAR_EMPTY } from './theme';

const STAR =
  'M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z';

/**
 * Five-star row with a continuous partial fill: 9.71 shows as 97.1% of the row.
 * One clipped overlay rather than gradient defs, so it is safe to render many
 * times on a page.
 */
export function HubStars({ rating, size = 14 }: { rating: number; size?: number }) {
  const pct = Math.max(0, Math.min(100, (rating / 10) * 100));
  const row = (color: string) => (
    <div className="flex" style={{ gap: 2 }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 20 20" fill={color} aria-hidden="true">
          <path d={STAR} />
        </svg>
      ))}
    </div>
  );
  return (
    <div className="relative inline-block" role="img" aria-label={`${rating.toFixed(2)} out of 10`}>
      {row(HUB_STAR_EMPTY)}
      <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${pct}%` }}>
        {row(HUB_STAR_FILL)}
      </div>
    </div>
  );
}
