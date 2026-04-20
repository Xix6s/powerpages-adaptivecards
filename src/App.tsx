
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

const resolveAsset = (asset: string) => {
  const ASSET_URL =
    "https://raw.githubusercontent.com/Xix6s/powerpages-adaptivecards/5be446bc882564491c9323a6aa7fa2c6929d659a/src/resources/"
  return `${ASSET_URL}${asset}`;
};

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
        <div style={{minHeight: '100vh', display:"flex", flexDirection: "column",alignItems:"center",justifyContent: "center", padding: '20px', background: 'linear-gradient(135deg, #f5f1f1 0%, #ac0c3c 100%)',fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',borderStyle:'none'}}>
             <Image
                alt="Xix6s"
                src={resolveAsset("xix-logo.svg")}
                height={100}
                width={100}
            />
            <div style={{background: 'white',borderStyle:'none', borderRadius: '12px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)', padding: '40px', maxWidth: '450px', width: '100%'}}>
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