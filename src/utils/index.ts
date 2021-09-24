import { useEffect } from "react";


export function useInit(initFn: () => any) {
  useEffect(() => {
    initFn()
  }, [])
}