import { useRef, useCallback } from 'react'

export function useMagnet<T extends HTMLElement = HTMLElement>(strength = 0.35) {
  const ref = useRef<T>(null)

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`
    el.style.transition = 'transform 0.15s ease'
  }, [strength])

  const onMouseLeave = useCallback((_e?: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'translate(0, 0)'
    el.style.transition = 'transform 0.45s cubic-bezier(0.23, 1, 0.32, 1)'
  }, [])

  return { ref, onMouseMove, onMouseLeave }
}
