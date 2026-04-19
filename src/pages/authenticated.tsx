import { useNavigate } from "react-router-dom";
import { Style } from "../design/styles";
import { useAuth } from "../context/AuthContext";
import { useState, MouseEvent } from "react";

export const Authenticated = () => {
    
  const {  user, logout } = useAuth();
    const navigate = useNavigate();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = async () => {
        setIsLoggingOut(true);
        await logout();
        setIsLoggingOut(false);
    };

  return (
    <>
      <div style={Style()["userInfo"]}>
        <div style={Style()["userInfoItem"]}>
          <span style={Style()["userInfoLabel"]}>Name:</span>
          <span style={Style()["userInfoValue"]}>{user?.name || "N/A"}</span>
        </div>
        <div style={Style()["userInfoItem"]}>
          <span style={Style()["userInfoLabel"]}>Email:</span>
          <span style={Style()["userInfoValue"]}>{user?.email || "N/A"}</span>
        </div>
        <div style={Style()["userInfoItem"]}>
          <span style={Style()["userInfoLabel"]}>Role:</span>
          <span style={Style()["userInfoValue"]}>{user?.role || "user"}</span>
        </div>
        <div style={{ ...Style()["userInfoItem"], borderBottom: "none" }}>
          <span style={Style()["userInfoLabel"]}>User ID:</span>
          <span style={Style()["userInfoValue"]}>
            {user?.id || user?._id || "N/A"}
          </span>
        </div>
      </div>

      <div style={Style()["buttonGroup"]}>
        <button
          style={{ ...Style()["button"], ...Style()["buttonSecondary"], flex: 1 }}
          onClick={() => navigate("/update")}
          onMouseOver={(e: MouseEvent<HTMLButtonElement>) =>
            (e.currentTarget.style.transform = "translateY(-2px)")
          }
          onMouseOut={(e: MouseEvent<HTMLButtonElement>) =>
            (e.currentTarget.style.transform = "translateY(0)")
          }
        >
          ✏️ Update Profile
        </button>
        <button
          style={{ ...Style()["button"], ...Style()["buttonDanger"], flex: 1 }}
          onClick={handleLogout}
          disabled={isLoggingOut}
          onMouseOver={(e: MouseEvent<HTMLButtonElement>) =>
            (e.currentTarget.style.transform = "translateY(-2px)")
          }
          onMouseOut={(e: MouseEvent<HTMLButtonElement>) =>
            (e.currentTarget.style.transform = "translateY(0)")
          }
        >
          {isLoggingOut ? "⏳ Logging out..." : "🚪 Logout"}
        </button>
      </div>
    </>
  );
};
