import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppRouter from './router.jsx'
import { Provider } from 'react-redux'
import { persistor, store } from './redux/store.js'
import { PersistGate } from 'redux-persist/integration/react'

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <StrictMode>
                <AppRouter />
            </StrictMode>,
        </PersistGate>
    </Provider>
)