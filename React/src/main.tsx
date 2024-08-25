import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import useUserStore from './store/userStore.tsx';

// const Root = () => {
//     const initialize = useUserStore((state) => state.initialize);

//     useEffect(() => {
//         initialize();
//     }, [initialize]);

//     return <App />;
// };

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)
