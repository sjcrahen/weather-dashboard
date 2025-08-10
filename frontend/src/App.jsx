import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Login from './routes/Login.jsx';
import ListStations from './routes/admin/stations/ListStations.jsx';
import Dashboard from './routes/Dashboard.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import CreateEditStation from './routes/admin/stations/CreateEditStation.jsx';
import ListDataSources from './routes/admin/datasources/ListDataSources.jsx';
import CreateEditDataSource from './routes/admin/datasources/CreateEditDataSource.jsx';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/dashboard/:slug" element={<Dashboard />} />
                    <Route path="/login" element={<Login />} />
                    <Route element={<ProtectedRoute />}>
                        <Route path="/admin/stations" element={<ListStations />} />
                        <Route path="/admin/stations/:slug" element={<CreateEditStation />} />
                        <Route path="/admin/datasources" element={<ListDataSources />} />
                        <Route path="/admin/datasources/:slug" element={<CreateEditDataSource />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
