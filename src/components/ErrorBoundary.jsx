import { Component } from 'react';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onRetry) {
      this.props.onRetry();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-box">
          <h3>Something went wrong!</h3>
          <p>{this.state.error?.message || 'Failed to load data.'}</p>
          <button type="button" onClick={this.handleRetry} className="btn-retry">
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
