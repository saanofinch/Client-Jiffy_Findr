export function computeScore(l: any): number {
  const plan = (l?.provider?.current_plan_name || "Basic") as string;
  const planW = plan === "Premium" ? 3 : plan === "Professional" ? 2 : 1;
  const featured = l?.badges?.featured ? 2 : 0;
  const verified = l?.badges?.verified ? 0.5 : 0;
  const rating = (l?.provider?.rating_avg || 0) * 0.2;
  const recency = dateBoost(l?.createdAt);
  const manual = l?.sort_boost || 0;
  return planW + featured + verified + rating + recency + manual;
}
function dateBoost(d?: string | Date) {
  if (!d) return 0;
  const days = (Date.now() - new Date(d).getTime()) / 86400000;
  return Math.max(0, 1 - days / 90);
}
