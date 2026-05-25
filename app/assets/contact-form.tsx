import { clientEntry, css, on, type Handle } from 'remix/ui'

type FormStatus = 'idle' | 'sending' | 'success' | 'error'

export const ContactForm = clientEntry(
  import.meta.url,
  function ContactForm(handle: Handle) {
    let status: FormStatus = 'idle'
    let name = ''
    let email = ''
    let message = ''

    function wait(ms: number) {
      return new Promise<void>((r) => setTimeout(r, ms))
    }

    return () => {
      if (status === 'success') {
        return (
          <div mix={successStyle}>
            <div mix={successIconStyle}>
              <CheckIcon />
            </div>
            <h3 mix={successTitleStyle}>Message Sent!</h3>
            <p mix={successTextStyle}>
              Thanks for reaching out. I'll get back to you within 24 hours.
            </p>
            <button
              type="button"
              mix={[
                resetBtnStyle,
                on('click', () => {
                  status = 'idle'
                  name = ''
                  email = ''
                  message = ''
                  handle.update()
                }),
              ]}
            >
              Send another message
            </button>
          </div>
        )
      }

      return (
        <form
          mix={[
            formStyle,
            on('submit', async (event, signal) => {
              event.preventDefault()
              if (status === 'sending') return
              status = 'sending'
              handle.update()

              // Simulate API call — replace with real endpoint / Resend integration
              await wait(1600)
              if (signal.aborted) return

              status = 'success'
              handle.update()
            }),
          ]}
        >
          <div mix={fieldRowStyle}>
            <div mix={fieldGroupStyle}>
              <label mix={labelStyle} htmlFor="cf-name">
                Name
              </label>
              <input
                id="cf-name"
                type="text"
                required
                placeholder="Rija Rizwan"
                value={name}
                mix={[
                  inputStyle,
                  on('input', (e) => {
                    name = (e.currentTarget as HTMLInputElement).value
                  }),
                ]}
              />
            </div>
            <div mix={fieldGroupStyle}>
              <label mix={labelStyle} htmlFor="cf-email">
                Email
              </label>
              <input
                id="cf-email"
                type="email"
                required
                placeholder="alex@example.com"
                value={email}
                mix={[
                  inputStyle,
                  on('input', (e) => {
                    email = (e.currentTarget as HTMLInputElement).value
                  }),
                ]}
              />
            </div>
          </div>
          <div mix={fieldGroupStyle}>
            <label mix={labelStyle} htmlFor="cf-message">
              Message
            </label>
            <textarea
              id="cf-message"
              required
              rows={5}
              placeholder="Tell me about your project..."
              value={message}
              mix={[
                textareaStyle,
                on('input', (e) => {
                  message = (e.currentTarget as HTMLTextAreaElement).value
                }),
              ]}
            />
          </div>
          <button type="submit" disabled={status === 'sending'} mix={submitBtnStyle}>
            {status === 'sending' ? (
              <span mix={spinnerWrapStyle}>
                <SpinnerIcon />
                Sending…
              </span>
            ) : (
              'Send Message'
            )}
          </button>
          {status === 'error' && (
            <p mix={errorTextStyle}>Something went wrong. Please try again.</p>
          )}
        </form>
      )
    }
  },
)

// ── Styles ────────────────────────────────────────────────────────────────────

const formStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
})

const fieldRowStyle = css({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '16px',
  '@media (max-width: 600px)': {
    gridTemplateColumns: '1fr',
  },
})

const fieldGroupStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
})

const labelStyle = css({
  fontSize: '13px',
  fontWeight: 500,
  color: 'var(--text-secondary)',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  fontFamily: 'var(--font-mono)',
})

const inputStyle = css({
  width: '100%',
  padding: '12px 16px',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(155, 0, 232, 0.25)',
  borderRadius: '10px',
  color: 'var(--text-primary)',
  fontSize: '15px',
  fontFamily: 'var(--font-body)',
  outline: 'none',
  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
  '&:focus': {
    borderColor: 'var(--neon-purple)',
    boxShadow: '0 0 0 3px rgba(155, 0, 232, 0.18)',
  },
  '&::placeholder': { color: 'rgba(255,255,255,0.25)' },
})

const textareaStyle = css({
  width: '100%',
  padding: '12px 16px',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(155, 0, 232, 0.25)',
  borderRadius: '10px',
  color: 'var(--text-primary)',
  fontSize: '15px',
  fontFamily: 'var(--font-body)',
  outline: 'none',
  resize: 'vertical',
  minHeight: '120px',
  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
  '&:focus': {
    borderColor: 'var(--neon-purple)',
    boxShadow: '0 0 0 3px rgba(155, 0, 232, 0.18)',
  },
  '&::placeholder': { color: 'rgba(255,255,255,0.25)' },
})

const submitBtnStyle = css({
  alignSelf: 'flex-start',
  padding: '13px 32px',
  background: 'linear-gradient(135deg, var(--neon-purple), var(--neon-pink))',
  color: '#fff',
  fontWeight: 700,
  fontSize: '15px',
  fontFamily: 'var(--font-body)',
  border: 'none',
  borderRadius: '10px',
  cursor: 'pointer',
  letterSpacing: '0.03em',
  transition: 'opacity 0.2s ease, box-shadow 0.2s ease, transform 0.15s ease',
  boxShadow: '0 0 20px rgba(155, 0, 232, 0.4)',
  '&:hover:not(:disabled)': {
    opacity: 0.9,
    transform: 'translateY(-2px)',
    boxShadow: '0 0 32px rgba(255, 0, 122, 0.5)',
  },
  '&:disabled': { opacity: 0.6, cursor: 'not-allowed' },
  '@media (max-width: 480px)': { width: '100%', textAlign: 'center' },
})

const spinnerWrapStyle = css({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
})

const errorTextStyle = css({
  color: '#ff5568',
  fontSize: '14px',
  margin: 0,
})

const successStyle = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  gap: '16px',
  padding: '40px 20px',
})

const successIconStyle = css({
  width: '64px',
  height: '64px',
  borderRadius: '50%',
  background: 'linear-gradient(135deg, var(--neon-purple), var(--neon-pink))',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 0 32px rgba(155, 0, 232, 0.5)',
  '& svg': { width: '28px', height: '28px', color: '#fff' },
})

const successTitleStyle = css({
  margin: 0,
  fontSize: '22px',
  fontWeight: 700,
  background: 'linear-gradient(90deg, var(--neon-purple), var(--neon-pink))',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
})

const successTextStyle = css({
  margin: 0,
  color: 'var(--text-secondary)',
  fontSize: '15px',
  lineHeight: 1.6,
  maxWidth: '340px',
})

const resetBtnStyle = css({
  padding: '10px 24px',
  background: 'transparent',
  border: '1px solid rgba(155, 0, 232, 0.4)',
  borderRadius: '8px',
  color: 'var(--neon-purple)',
  fontSize: '14px',
  cursor: 'pointer',
  transition: 'border-color 0.2s ease, color 0.2s ease',
  '&:hover': {
    borderColor: 'var(--neon-purple)',
    color: '#fff',
  },
})

function CheckIcon() {
  return () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function SpinnerIcon() {
  return () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      mix={css({
        width: '16px',
        height: '16px',
        animation: 'spin 0.8s linear infinite',
        '@keyframes spin': { from: { transform: 'rotate(0deg)' }, to: { transform: 'rotate(360deg)' } },
      })}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  )
}
