import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import Login from "./pages/Login.jsx";
import StationListing from "./pages/StationListing.jsx";
import Dashboard from "./pages/Dashboard.jsx";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Dashboard/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route element={<ProtectedRoute/>}>
                <Route path='/stations' element={<StationListing/>}/>
            </Route>
        </Routes>
    );
}

export default App;
