import { useEffect } from "react";

export function useEventListener(targetElement: any, eventName: any, eventHandler: any) {
  useEffect(() => {
    const element = targetElement.current
    if(!element) return

    if (eventHandler !== undefined) {
      element.addEventListener(eventName, eventHandler);
    }

    return () => {
      element.removeEventListener(eventName, eventHandler);
    };
  }, [eventName, eventHandler, targetElement.current]);
}