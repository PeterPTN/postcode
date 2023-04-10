import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { store } from './store';
import Footer from './components/footer/Footer'
import Header from './components/header/Header'

export const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
          <Header />
          <Outlet />
          <Footer />
        </div>
      </Provider>
    </QueryClientProvider>
  )
}

export default App
