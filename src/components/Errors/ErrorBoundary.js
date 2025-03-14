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

    // Send error details to the server
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
          <p className="text-xl mb-8">{error?.toString()}</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
