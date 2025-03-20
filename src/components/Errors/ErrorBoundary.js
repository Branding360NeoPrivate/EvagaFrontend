import React from "react";
import axios from "axios";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });

    axios.post(`${process.env.REACT_APP_API_BASE_URL}/logerror/log-error`, {
      error: error.toString(),
      errorInfo: errorInfo?.componentStack,
    });
  }

  render() {
    const { hasError, error } = this.state;

    if (hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-screen bg-primary text-secondaryWhite">
          <h1 className="text-6xl mb-4">Oops! Something went wrong.</h1>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null, errorInfo: null });
            }}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;