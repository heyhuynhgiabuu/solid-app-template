/* @refresh reload */
import './App.css';
import { Route, Router } from '@solidjs/router';
import { render } from 'solid-js/web';
import HomeRoute from './routes/HomeRoute.tsx';
import PostRoute from './routes/PostRoute.tsx';
import SignInRoute from './routes/SignInRoute.tsx';
import Header from './ui/Header.tsx';

const App = () => (
  <div class="min-h-screen">
    <div class="min-h-screen bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.08),transparent_35%),radial-gradient(circle_at_80%_0,rgba(99,102,241,0.08),transparent_28%)]">
      <Header />
      <Router>
        <Route component={HomeRoute} path="/" />
        <Route component={PostRoute} path="/post/:id" />
        <Route component={SignInRoute} path="/login" />
      </Router>
    </div>
  </div>
);

const root = document.getElementById('root');
if (!root) {
  throw new Error('Root element not found');
}

render(() => <App />, root);
