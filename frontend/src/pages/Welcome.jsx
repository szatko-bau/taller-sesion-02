import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth';

export default function Welcome() {
  const { logout, token } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login', { replace: true });
  }

  // Decode username from JWT payload (base64 middle part)
  let username = 'Usuario';
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    username = payload.sub || 'Usuario';
  } catch {
    // keep default
  }

  return (
    <div style={styles.page}>
      {/* Background decorations */}
      <div style={styles.bgDecorOrange} />
      <div style={styles.bgDecorIndigo} />

      {/* Top nav */}
      <nav style={styles.nav}>
        <div style={styles.navBrand}>
          <span style={styles.brandDot} />
          <span style={styles.brandName}>FlowOps</span>
        </div>
        <button onClick={handleLogout} style={styles.logoutBtn}>
          Cerrar sesión
        </button>
      </nav>

      {/* Main content */}
      <main style={styles.main}>
        <div style={styles.card}>
          <div style={styles.cardInner}>
            <div style={styles.badgePill}>Sesión activa</div>
            <h1 style={styles.heading}>
              ¡Bienvenido, <span style={styles.highlight}>{username}</span>!
            </h1>
            <p style={styles.body}>
              Has iniciado sesión correctamente en el panel de control de{' '}
              <strong style={{ fontWeight: 500, color: '#111827' }}>FlowOps</strong>. Desde aquí
              puedes gestionar los flujos de trabajo y acceder a todas las funciones del
              sistema.
            </p>

            <div style={styles.statsRow}>
              <div style={styles.statCard}>
                <span style={styles.statValue}>100%</span>
                <span style={styles.statLabel}>Sesión válida</span>
              </div>
              <div style={styles.statCard}>
                <span style={styles.statValue}>JWT</span>
                <span style={styles.statLabel}>Autenticación</span>
              </div>
              <div style={styles.statCard}>
                <span style={styles.statValue}>5 min</span>
                <span style={styles.statLabel}>Expiración</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const cardShadow =
  'rgba(0,0,0,0) 0px 0px 0px 0px, rgba(0,0,0,0) 0px 0px 0px 0px, rgba(0,0,0,0.06) 0px 0px 0px 1px, rgba(0,0,0,0.06) 0px 1px 1px -0.5px, rgba(0,0,0,0.06) 0px 3px 3px -1.5px, rgba(0,0,0,0.06) 0px 6px 6px -3px, rgba(0,0,0,0.06) 0px 12px 12px -6px, rgba(0,0,0,0.06) 0px 24px 24px -12px';

const styles = {
  page: {
    minHeight: '100vh',
    background: '#FFFFFF',
    fontFamily: "'Inter', sans-serif",
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  bgDecorOrange: {
    position: 'fixed',
    top: '-100px',
    right: '-100px',
    width: '500px',
    height: '500px',
    borderRadius: '9999px',
    background: 'radial-gradient(circle at center, rgba(255,237,213,0.5) 0%, transparent 70%)',
    pointerEvents: 'none',
    zIndex: 0,
  },
  bgDecorIndigo: {
    position: 'fixed',
    bottom: '-120px',
    left: '-120px',
    width: '450px',
    height: '450px',
    borderRadius: '9999px',
    background: 'radial-gradient(circle at center, rgba(224,231,255,0.4) 0%, transparent 70%)',
    pointerEvents: 'none',
    zIndex: 0,
  },
  nav: {
    position: 'relative',
    zIndex: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 40px',
    borderBottom: '1px solid #E5E7EB',
    background: 'rgba(255,255,255,0.85)',
    backdropFilter: 'blur(4px)',
  },
  navBrand: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  brandDot: {
    display: 'inline-block',
    width: '10px',
    height: '10px',
    borderRadius: '9999px',
    background: '#111827',
  },
  brandName: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '16px',
    fontWeight: 500,
    color: '#111827',
    letterSpacing: '0.35px',
  },
  logoutBtn: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '14px',
    fontWeight: 300,
    color: '#6B7280',
    background: 'none',
    border: 'none',
    padding: '0',
    cursor: 'pointer',
    transition: 'color 150ms ease',
  },
  main: {
    position: 'relative',
    zIndex: 1,
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '48px 24px',
  },
  card: {
    background: 'rgba(255,255,255,0.9)',
    border: '0.8px solid #FFFFFF',
    borderRadius: '32px',
    padding: '8px',
    width: '100%',
    maxWidth: '640px',
    boxShadow: cardShadow,
    backdropFilter: 'blur(4px)',
  },
  cardInner: {
    padding: '40px',
  },
  badgePill: {
    display: 'inline-flex',
    alignItems: 'center',
    background: '#F0FDF4',
    color: '#15803D',
    border: '0.8px solid #BBF7D0',
    borderRadius: '9999px',
    padding: '4px 14px',
    fontSize: '12px',
    fontWeight: 500,
    letterSpacing: '0.35px',
    marginBottom: '20px',
  },
  heading: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '36px',
    fontWeight: 500,
    color: '#111827',
    margin: '0 0 16px 0',
    lineHeight: '1.2',
  },
  highlight: {
    color: '#111827',
    fontStyle: 'italic',
  },
  body: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '14px',
    fontWeight: 300,
    color: '#6B7280',
    lineHeight: '22.75px',
    margin: '0 0 32px 0',
  },
  statsRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '12px',
  },
  statCard: {
    background: '#F9FAFB',
    border: '1px solid #E5E7EB',
    borderRadius: '16px',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    alignItems: 'center',
  },
  statValue: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '20px',
    fontWeight: 500,
    color: '#111827',
    letterSpacing: '-0.025em',
  },
  statLabel: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '12px',
    fontWeight: 300,
    color: '#6B7280',
  },
};
