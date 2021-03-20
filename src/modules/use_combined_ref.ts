import { ForwardedRef, useEffect, useLayoutEffect, useRef } from 'react';

export function useCombinedRefs<T>(...refs: readonly React.Ref<T>[]) {
  const targetRef = useRef<T>();

  useLayoutEffect(() => {
    refs.forEach((ref) => {
      if (!ref) return;

      if (typeof ref === 'function') {
        ref(targetRef.current ?? null);
      } else {
        // @ts-expect-error: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/31065
        ref.current = targetRef.current;
      }
    });
  }, [refs]);

  return targetRef;
}
