/** Stand-in for React's useEffect: runs the effect when its inputs change, as React does between renders. */
let last: unknown[] | undefined;
export function useEffect(effect: () => void, deps: unknown[]) {
  if (!last || deps.some((d, i) => d !== last![i])) effect();
  last = deps;
}
export function resetEffects() {
  last = undefined;
}
