import { StoreProvider } from 'easy-peasy';
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './routes/AppRouter';
import store from './store/store';

const App = () => {
  return (
    <BrowserRouter>
      <StoreProvider store={store}>
        <AppRouter />
      </StoreProvider>
    </BrowserRouter>
  )
}

export default App
