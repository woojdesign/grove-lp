import { Component, ReactNode, ErrorInfo } from 'react';
import { Button } from './ui/button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so next render shows fallback UI
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error to console (or error reporting service)
    console.error('Error caught by boundary:', error);
    console.error('Component stack:', errorInfo.componentStack);

    // TODO: Send to error reporting service (Sentry, LogRocket, etc.)
    // Example:
    // logErrorToService(error, errorInfo);
  }

  handleReset = (): void => {
    // Reset error state and reload page
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background px-6">
          <div className="text-center space-y-8 max-w-2xl">
            {/* Main heading */}
            <div className="space-y-4">
              <h1 className="font-display text-6xl md:text-7xl font-light text-foreground">
                Oops
              </h1>
              <p className="font-display text-3xl md:text-4xl font-light text-muted-foreground">
                Something went wrong
              </p>
            </div>

            {/* Error message - only show in development */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="bg-muted/50 rounded-lg p-6 text-left">
                <p className="font-mono text-sm text-destructive break-all">
                  {this.state.error.message}
                </p>
              </div>
            )}

            {/* User-friendly message */}
            <p className="text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto">
              We're sorry for the inconvenience. An unexpected error occurred while loading this page.
              Please try refreshing to continue.
            </p>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button
                size="lg"
                onClick={this.handleReset}
                className="px-10 py-7 rounded-full"
              >
                Reload Page
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => window.location.href = '/'}
                className="px-10 py-7 rounded-full"
              >
                Go Home
              </Button>
            </div>

            {/* Support contact */}
            <p className="text-sm text-muted-foreground pt-8">
              If this problem persists, please{' '}
              <a href="mailto:support@commonplace.app" className="text-accent-color hover:underline">
                contact support
              </a>
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
