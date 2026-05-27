import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error('[Cognitia ErrorBoundary]', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#060C18',
          color: '#E8F0FE',
          fontFamily: "'DM Sans', sans-serif",
          padding: '24px',
          textAlign: 'center',
          gap: 16,
        }}>
          <div style={{ fontSize: 48 }}>◈</div>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 2, fontSize: '2rem', margin: 0 }}>
            Algo salió mal
          </h2>
          <p style={{ color: '#7A8FAD', maxWidth: 400, margin: 0 }}>
            Hubo un error al cargar la página. Intenta recargar.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: 8,
              padding: '12px 28px',
              background: 'linear-gradient(135deg, #7B5CF5, #00C2FF)',
              border: 'none',
              borderRadius: 10,
              color: '#fff',
              fontSize: 15,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Recargar página
          </button>
          {import.meta.env.DEV && (
            <pre style={{
              marginTop: 16,
              fontSize: 11,
              color: '#ff6b6b',
              background: 'rgba(255,100,100,0.08)',
              padding: '12px 16px',
              borderRadius: 8,
              maxWidth: '90vw',
              overflow: 'auto',
              textAlign: 'left',
            }}>
              {this.state.error?.toString()}
            </pre>
          )}
        </div>
      )
    }
    return this.props.children
  }
}
