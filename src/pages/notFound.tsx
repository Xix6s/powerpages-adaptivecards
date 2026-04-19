import { useNavigate } from "react-router-dom";
import { MouseEvent } from "react";
import { Style } from "../design/styles";

export const NotFound = () => {
 const navigate = useNavigate();

    return (
        <div style={Style()["container"]}>
            <div style={Style()["card"]}>
                <h1 style={Style()["title"]}>😕 404 - Page Not Found</h1>
                <p style={Style()["subtitle"]}>The page you're looking for doesn't exist</p>
                <button
                    style={Style()["button"]}
                    onClick={() => navigate("/")}
                    onMouseOver={(e: MouseEvent<HTMLButtonElement>) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
                    }}
                    onMouseOut={(e: MouseEvent<HTMLButtonElement>) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                    }}
                >
                    🏠 Go Home
                </button>
            </div>
        </div>
    );
};