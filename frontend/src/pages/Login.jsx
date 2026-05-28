import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const body = new URLSearchParams();
      body.append('username', username);
      body.append('password', password);

      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.detail || 'Credenciales inválidas. Intenta nuevamente.');
        return;
      }

      const data = await res.json();
      login(data.access_token);
      navigate('/welcome', { replace: true });
    } catch {
      setError('No se pudo conectar con el servidor. Verifica que el backend esté activo.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.page}>
      {/* Background decorations */}
      <div style={styles.bgDecorOrange} />
      <div style={styles.bgDecorIndigo} />

      <div style={styles.card}>
        {/* Logo / Brand */}
        <div style={styles.brand}>
          <span style={styles.brandDot} />
          <span style={styles.brandName}>FlowOps</span>
        </div>

        <h1 style={styles.heading}>Iniciar sesión</h1>
        <p style={styles.subheading}>
          Accede a tu panel de control con tus credenciales.
        </p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label htmlFor="username" style={styles.label}>
              Usuario
            </label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
              placeholder="admin"
            />
          </div>

          <div style={styles.field}>
            <label htmlFor="password" style={styles.label}>
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div style={styles.errorBox} role="alert">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Ingresando…' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  );
}

const cardShadow =
  'rgba(0,0,0,0) 0px 0px 0px 0px, rgba(0,0,0,0) 0px 0px 0px 0px, rgba(0,0,0,0.06) 0px 0px 0px 1px, rgba(0,0,0,0.06) 0px 1px 1px -0.5px, rgba(0,0,0,0.06) 0px 3px 3px -1.5px, rgba(0,0,0,0.06) 0px 6px 6px -3px, rgba(0,0,0,0.06) 0px 12px 12px -6px, rgba(0,0,0,0.06) 0px 24px 24px -12px';

const styles = {
  page: {
    minHeight: '100vh',
    background: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Inter', sans-serif",
    position: 'relative',
    overflow: 'hidden',
  },
  bgDecorOrange: {
    position: 'absolute',
    top: '-120px',
    right: '-120px',
    width: '400px',
    height: '400px',
    borderRadius: '9999px',
    background: 'radial-gradient(circle at center, rgba(255,237,213,0.6) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  bgDecorIndigo: {
    position: 'absolute',
    bottom: '-100px',
    left: '-100px',
    width: '360px',
    height: '360px',
    borderRadius: '9999px',
    background: 'radial-gradient(circle at center, rgba(224,231,255,0.5) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  card: {
    position: 'relative',
    zIndex: 1,
    background: 'rgba(255,255,255,0.9)',
    border: '0.8px solid #FFFFFF',
    borderRadius: '32px',
    padding: '48px 40px',
    width: '100%',
    maxWidth: '420px',
    boxShadow: cardShadow,
    backdropFilter: 'blur(4px)',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '32px',
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
  heading: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '28px',
    fontWeight: 500,
    color: '#111827',
    margin: '0 0 8px 0',
    lineHeight: '1.2',
  },
  subheading: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '14px',
    fontWeight: 300,
    color: '#6B7280',
    lineHeight: '22.75px',
    margin: '0 0 32px 0',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '14px',
    fontWeight: 500,
    color: '#111827',
    lineHeight: '20px',
    letterSpacing: '0.35px',
  },
  input: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '14px',
    fontWeight: 300,
    color: '#111827',
    background: '#F9FAFB',
    border: '1px solid #E5E7EB',
    borderRadius: '8px',
    padding: '10px 14px',
    outline: 'none',
    transition: 'border-color 150ms ease',
    width: '100%',
    boxSizing: 'border-box',
  },
  errorBox: {
    background: '#FEF2F2',
    border: '0.8px solid #FECACA',
    borderRadius: '8px',
    padding: '10px 14px',
    fontSize: '14px',
    fontWeight: 300,
    color: '#B91C1C',
    lineHeight: '22.75px',
  },
  button: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '14px',
    fontWeight: 500,
    letterSpacing: '0.35px',
    color: '#FFFFFF',
    background: '#111827',
    border: 'none',
    borderRadius: '9999px',
    padding: '12px 24px',
    width: '100%',
    transition: 'opacity 150ms ease, transform 150ms ease',
    marginTop: '4px',
  },
};
