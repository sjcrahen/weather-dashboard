import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute.jsx';
import Login from './routes/Login.jsx';
import StationListing from './routes/StationListing.jsx';
import Dashboard from './routes/Dashboard.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/login" element={<Login />} />
                    <Route element={<ProtectedRoute />}>
                        <Route path="/admin/stations" element={<StationListing />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
