import { useNavigate } from "react-router-dom";
import { MouseEvent } from "react";
import { Style } from "../design/styles";

export const Login = () => {
const navigate = useNavigate();
    
  return (
    <div>
      <p style={Style()["subtitle"]}>Please login or signup to continue</p>
      <div style={Style()["buttonGroup"]}>
        <button
          style={{ ...Style()["button"], flex: 1 }}
          onClick={() => navigate("/login")}
          onMouseOver={(e: MouseEvent<HTMLButtonElement>) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow =
              "0 6px 20px rgba(102, 126, 234, 0.4)";
          }}
          onMouseOut={(e: MouseEvent<HTMLButtonElement>) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          🔐 Login
        </button>
        <button
          style={{ ...Style()["buttonGroup"], ...Style()["buttonSecondary"], flex: 1 }}
          onClick={() => navigate("/signup")}
          onMouseOver={(e: MouseEvent<HTMLButtonElement>) =>
            (e.currentTarget.style.transform = "translateY(-2px)")
          }
          onMouseOut={(e: MouseEvent<HTMLButtonElement>) =>
            (e.currentTarget.style.transform = "translateY(0)")
          }
        >
          ✨ Signup
        </button>
      </div>
    </div>
  );
};
