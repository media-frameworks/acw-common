import {Component} from 'react';

export class ErrorBoundary extends Component {
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
      console.log("componentDidCatch(error, errorInfo)",error, errorInfo)
   }

   render() {
      if (this.state.hasError) {
         // You can render any custom fallback UI
         return <h1>Chaos Rules! ;)</h1>;
      }
      return this.props.children;
   }
}

export default ErrorBoundary;
