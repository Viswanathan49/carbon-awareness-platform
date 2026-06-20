import React from 'react';
class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError: false }; }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error, errorInfo) { console.error("CarbonPulse Resilience Triggered:", error, errorInfo); }
  render() {
    if (this.state.hasError) {
      return <div className="min-h-screen bg-[#121212] text-[#0FDE72] flex items-center justify-center font-mono"><h3>System Diagnostics: Interface reboot required.</h3></div>;
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
