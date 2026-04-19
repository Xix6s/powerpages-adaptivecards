
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import { Image } from "@fluentui/react-components";
import { Style } from "./design/styles";
import { Authenticated } from "./pages/authenticated";
import { LoginCard } from "./pages/loginCard";
import { SignUp } from "./pages/signup";
import { UpdateUser } from "./pages/updateUser";
import { NotFound } from "./pages/notFound";
import { LoginPage } from "./pages/loginPage";
import {DesignCard} from "./pages/adaptiveCard"


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
                    {isAuthenticated ? '👋 Welcome Back!' : '🏠 Adaptive UI'}
                </h1>

                {isAuthenticated ? (
                    <>
                        <Authenticated />
                    </>
                ) : (
                    <>
                    <LoginCard />
                    </>
                )}
            </div>
        </div>
    );
};


// ======= Router Setup =======
const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/signup", element: <SignUp /> },
    { path: "/update", element: <UpdateUser /> },
    { path: "/design", element: <DesignCard /> },
    { path: "*", element: <NotFound /> },
]);

// ======= App =======
const App = () => {
    return <RouterProvider router={router} />;
};

export default App;