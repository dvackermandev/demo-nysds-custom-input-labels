import { useEffect } from "react";

export function useEventListener(targetElement: React.RefObject<any>, eventName: string, eventHandler: (event: any) => void) {
  useEffect(() => {
    const element = targetElement.current
    if(!element) return

    if (eventHandler !== undefined) {
      element.addEventListener(eventName, eventHandler);
    }

    return () => {
      element.removeEventListener(eventName, eventHandler);
    };
  }, [eventName, eventHandler, targetElement]);
}
