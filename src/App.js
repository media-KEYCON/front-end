import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import AdminPage from "./pages/AdminPage";
import SignupPage from "./pages/SignupPage";
import AdminCategoryPage from "./pages/AdminCategoryPage";
import AdminMenuPage from "./pages/AdminMenuPage";
import AdminOptionPage from "./pages/AdminOptionPage";
import SelectPage from "./pages/SelectPage";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/main" element={<MainPage />} />
                <Route path="/select" element={<SelectPage />} />
                <Route path="/admin" element={<AdminPage />}>
                    <Route path="" element={<AdminCategoryPage />} />
                    <Route path=":categoryId" element={<AdminMenuPage />} />
                    <Route
                        path=":categoryId/:menusId"
                        element={<AdminOptionPage />}
                    />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
