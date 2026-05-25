import { clientEntry, css, ref, type Handle, type SerializableProps } from 'remix/ui'

interface TypewriterTextProps extends SerializableProps {
  phrases: string[]
}

export const TypewriterText = clientEntry(
  import.meta.url,
  function TypewriterText(handle: Handle<TypewriterTextProps>) {
    let currentText = ''
    let phraseIndex = 0
    let charIndex = 0
    let isDeleting = false
    let showCursor = true

    return () => (
      <span
        mix={ref((_node, signal) => {
          // ref only fires client-side when element is inserted into DOM
          function wait(ms: number): Promise<void> {
            return new Promise((resolve) => {
              let timer = setTimeout(resolve, ms)
              signal.addEventListener('abort', () => clearTimeout(timer), { once: true })
            })
          }

          async function runLoop() {
            while (!signal.aborted) {
              let phrase = handle.props.phrases[phraseIndex % handle.props.phrases.length]!

              if (!isDeleting) {
                charIndex++
                currentText = phrase.slice(0, charIndex)
                handle.update()
                if (charIndex === phrase.length) {
                  isDeleting = true
                  await wait(2200)
                } else {
                  await wait(85 + Math.random() * 40)
                }
              } else {
                charIndex--
                currentText = phrase.slice(0, charIndex)
                handle.update()
                if (charIndex === 0) {
                  isDeleting = false
                  phraseIndex++
                  await wait(400)
                } else {
                  await wait(45)
                }
              }
            }
          }

          let cursorTimer = setInterval(() => {
            if (signal.aborted) {
              clearInterval(cursorTimer)
              return
            }
            showCursor = !showCursor
            handle.update()
          }, 530)
          signal.addEventListener('abort', () => clearInterval(cursorTimer), { once: true })

          runLoop()
        })}
      >
        <span>{currentText}</span>
        <span
          mix={css({
            display: 'inline-block',
            width: '3px',
            height: '1.1em',
            marginLeft: '3px',
            verticalAlign: 'middle',
            borderRadius: '1px',
            background: 'var(--neon-pink)',
            boxShadow: '0 0 8px var(--neon-pink)',
          })}
          style={{ opacity: showCursor ? 1 : 0 }}
          aria-hidden="true"
        />
      </span>
    )
  },
)
