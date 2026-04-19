
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import { Image } from "@fluentui/react-components";
import { Style } from "./design/styles";
import { Authenticated } from "./pages/authenticated";
import { Login } from "./pages/login";
import { SignUp } from "./pages/signup";
import { UpdateUser } from "./pages/updateUser";
import { NotFound } from "./pages/notFound";


// ======= Home Page =======
const Home = () => {
    const { isAuthenticated,loading } = useAuth();

    if (loading) {
        return (
            <div style={Style()["container"]}>
                <div style={Style()["loading"]}>Loading...</div>
            </div>
        );
    }

    return (
        <div style={Style()["container"]}>
             <Image
                alt="Xix6s"
                src="/src/resources/xix-logo.svg"
                height={100}
                width={100}
            />
            <div style={Style()["card"]}>
                <h1 style={Style()["title"]}>
                    {isAuthenticated ? '👋 Welcome Back!' : '🏠 Home'}
                </h1>

                {isAuthenticated ? (
                    <>
                        <Authenticated />
                    </>
                ) : (
                    <>
                    <Login />
                    </>
                )}
            </div>
        </div>
    );
};


// ======= Router Setup =======
const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <SignUp /> },
    { path: "/update", element: <UpdateUser /> },
    { path: "*", element: <NotFound /> },
]);

// ======= App =======
const App = () => {
    return <RouterProvider router={router} />;
};

export default App;