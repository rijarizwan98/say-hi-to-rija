import { clientEntry, css, on, type Handle } from 'remix/ui'

export const MobileNavToggle = clientEntry(
  import.meta.url,
  function MobileNavToggle(handle: Handle) {
    let open = false

    return () => (
      <>
        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          mix={[
            hamburgerStyle,
            on('click', () => {
              open = !open
              handle.update()
            }),
          ]}
        >
          <span
            mix={barStyle}
            style={{ transform: open ? 'rotate(45deg) translate(5px, 5px)' : undefined }}
          />
          <span mix={barStyle} style={{ opacity: open ? 0 : undefined }} />
          <span
            mix={barStyle}
            style={{ transform: open ? 'rotate(-45deg) translate(5px, -5px)' : undefined }}
          />
        </button>

        {open && (
          <nav
            key="mobile-drawer"
            mix={drawerStyle}
          >
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                mix={[
                  drawerLinkStyle,
                  on('click', () => {
                    open = false
                    handle.update()
                  }),
                ]}
              >
                {label}
              </a>
            ))}
          </nav>
        )}
      </>
    )
  },
)

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

const hamburgerStyle = css({
  display: 'none',
  flexDirection: 'column',
  gap: '5px',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: '6px',
  borderRadius: '6px',
  transition: 'background 0.2s ease',
  '&:hover': { background: 'rgba(155, 0, 232, 0.12)' },
  '@media (max-width: 768px)': { display: 'flex' },
})

const barStyle = css({
  display: 'block',
  width: '22px',
  height: '2px',
  borderRadius: '2px',
  background: 'var(--text-primary)',
  transition: 'transform 0.25s ease, opacity 0.25s ease',
})

const drawerStyle = css({
  position: 'fixed',
  top: '60px',
  left: 0,
  right: 0,
  background: 'rgba(7, 7, 20, 0.97)',
  backdropFilter: 'blur(20px)',
  borderBottom: '1px solid rgba(155, 0, 232, 0.2)',
  display: 'flex',
  flexDirection: 'column',
  padding: '16px 0 24px',
  zIndex: 999,
})

const drawerLinkStyle = css({
  padding: '14px 24px',
  color: 'var(--text-primary)',
  textDecoration: 'none',
  fontSize: '16px',
  fontWeight: 500,
  letterSpacing: '0.02em',
  transition: 'color 0.2s ease, padding-left 0.2s ease',
  '&:hover': { color: 'var(--neon-purple)', paddingLeft: '32px' },
})
