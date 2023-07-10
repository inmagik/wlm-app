import { useEffect } from 'react'

let mountedScrollBlocker = 0

export function useBlockBodyScroll(condition = false) {
  useEffect(() => {
    if (condition) {
      mountedScrollBlocker++
      document.body.classList.add('block-body-scroll')
      return () => {
        mountedScrollBlocker--
        if (mountedScrollBlocker === 0) {
          document.body.classList.remove('block-body-scroll')
        }
      }
    }
  }, [condition])
}
