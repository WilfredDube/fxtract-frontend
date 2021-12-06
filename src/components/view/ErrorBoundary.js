import React from "react";
import ErrorBanner from "./ErrorBanner";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    // console.log(error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <ErrorBanner
          message={"Something went wrong"}
          close={() => {
            this.setState({ hasError: false });
          }}
          refresh={true}
        />
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
