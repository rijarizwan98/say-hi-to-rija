import { clientEntry, css, ref, type Handle, type SerializableProps } from 'remix/ui'

interface SkillBarProps extends SerializableProps {
  name: string
  level: number
  color: string
  delay?: number
}

export const SkillBar = clientEntry(
  import.meta.url,
  function SkillBar(handle: Handle<SkillBarProps>) {
    let revealed = false

    return () => {
      let { name, level, color, delay = 0 } = handle.props
      return (
        <div mix={containerStyle}>
          <div mix={labelRowStyle}>
            <span mix={labelStyle}>{name}</span>
            <span mix={percentStyle}>{level}%</span>
          </div>
          <div mix={trackStyle}>
            <div
              style={{
                width: revealed ? `${level}%` : '0%',
                background: color,
                boxShadow: revealed ? `0 0 12px ${color}80` : 'none',
                transition: revealed ? `width 1.3s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms, box-shadow 1.3s ease ${delay}ms` : 'none',
              }}
              mix={[
                barFillStyle,
                ref((node, signal) => {
                  let observer = new IntersectionObserver(
                    (entries) => {
                      if (entries[0]?.isIntersecting && !revealed) {
                        revealed = true
                        handle.update()
                        observer.disconnect()
                      }
                    },
                    { threshold: 0.3 },
                  )
                  observer.observe(node)
                  signal.addEventListener('abort', () => observer.disconnect(), { once: true })
                }),
              ]}
            />
          </div>
        </div>
      )
    }
  },
)

const containerStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
})

const labelRowStyle = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

const labelStyle = css({
  fontSize: '14px',
  fontWeight: 500,
  color: 'var(--text-primary)',
  fontFamily: 'var(--font-mono)',
})

const percentStyle = css({
  fontSize: '12px',
  color: 'var(--text-secondary)',
  fontFamily: 'var(--font-mono)',
})

const trackStyle = css({
  height: '6px',
  borderRadius: '3px',
  background: 'rgba(255,255,255,0.07)',
  overflow: 'hidden',
})

const barFillStyle = css({
  height: '100%',
  borderRadius: '3px',
})
