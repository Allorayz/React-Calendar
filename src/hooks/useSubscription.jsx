import { useEffect, useRef } from "react";

export const useSubscription = (config) => {
  const callbackRef = useRef(config.handler);
  const element = config.element || window;

  useEffect(() => {
    callbackRef.current = config.handler;
  }, [config.handler]);

  useEffect(() => {
    const handler = (event) => callbackRef.current(event);
    element.addEventListener(config.method, handler);

    return () => element.removeEventListener(config.method, handler);
  }, []);
};
