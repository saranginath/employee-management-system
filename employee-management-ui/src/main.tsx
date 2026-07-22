import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { Provider } from 'react-redux'
import { store } from './api/store.ts'

import App from './App';
import "react-phone-number-input/style.css";


createRoot(
  document.getElementById('root')!
).render(

  <StrictMode>

    <Provider store={store}>

      <App />

    </Provider>

  </StrictMode>

)