import { clientEntry, css, ref, type Handle, type RemixNode, type SerializableProps } from 'remix/ui'

interface ScrollRevealSectionProps extends SerializableProps {
  children: RemixNode
  delay?: number
}

export const ScrollRevealSection = clientEntry(
  import.meta.url,
  function ScrollRevealSection(handle: Handle<ScrollRevealSectionProps>) {
    let visible = false

    return () => (
      <div
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0px)' : 'translateY(36px)',
          transition: `opacity 0.75s ease ${handle.props.delay ?? 0}ms, transform 0.75s ease ${handle.props.delay ?? 0}ms`,
        }}
        mix={ref((node, signal) => {
          // Immediately show if already in viewport on mount
          let rect = node.getBoundingClientRect()
          if (rect.top < window.innerHeight * 0.95) {
            visible = true
            handle.update()
            return
          }

          let observer = new IntersectionObserver(
            (entries) => {
              if (entries[0]?.isIntersecting) {
                visible = true
                handle.update()
                observer.disconnect()
              }
            },
            { threshold: 0.08 },
          )
          observer.observe(node)
          signal.addEventListener('abort', () => observer.disconnect(), { once: true })
        })}
      >
        {handle.props.children}
      </div>
    )
  },
)
