import { useNavigate } from "react-router-dom";
import { useState,MouseEvent } from "react";
import { useAuth } from "../context/AuthContext";
import { Style } from "../design/styles";

export const UpdateUser = () => {
  const { updateUser, user, refreshUser } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name && !email) {
      setError("Please provide at least one field to update");
      return;
    }

    if (email && !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    const updates: { name?: string; email?: string } = {};
    if (name && name !== user?.name) updates.name = name;
    if (email && email !== user?.email) updates.email = email;

    if (Object.keys(updates).length === 0) {
      setError("No changes detected");
      return;
    }

    setIsSubmitting(true);
    const result = await updateUser(updates);
    setIsSubmitting(false);

    if (result.success) {
      setSuccess("Profile updated successfully! ✅");
      await refreshUser();
      setTimeout(() => navigate("/"), 2000);
    } else {
      setError(result.error || "Update failed");
    }
  };

  return (
    <div style={Style()["container"]}>
      <div style={Style()["card"]}>
        <h1 style={Style()["title"]}>✏️ Update Profile</h1>
        <p style={Style()["subtitle"]}>Update your account information</p>

        {error && <div style={Style()["error"]}>❌ {error}</div>}
        {success && <div style={Style()["success"]}>✅ {success}</div>}

        <form onSubmit={handleSubmit} style={Style()["form"]}>
          <div style={Style()["inputGroup"]}>
            <label style={Style()["label"]}>Full Name</label>
            <input
              type="text"
              placeholder="Enter new name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={Style()["input"]}
              onFocus={(e) => (e.target.style.borderColor = "#667eea")}
              onBlur={(e) => (e.target.style.borderColor = "#e1e8ed")}
              disabled={isSubmitting}
            />
          </div>

          <div style={Style()["inputGroup"]}>
            <label style={Style()["label"]}>Email Address</label>
            <input
              type="email"
              placeholder="Enter new email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={Style()["input"]}
              onFocus={(e) => (e.target.style.borderColor = "#667eea")}
              onBlur={(e) => (e.target.style.borderColor = "#e1e8ed")}
              disabled={isSubmitting}
            />
          </div>

          <div style={Style()["inputGroup"]}>
            <button
              type="submit"
              style={{ ...Style()["button"], flex: 1 }}
              disabled={isSubmitting}
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
              {isSubmitting ? "⏳ Updating..." : "💾 Save Changes"}
            </button>
            <button
              type="button"
              style={{ ...Style()["button"], ...Style()["buttonSecondary"], flex: 1 }}
              onClick={() => navigate("/")}
              disabled={isSubmitting}
              onMouseOver={(e: MouseEvent<HTMLButtonElement>) =>
                (e.currentTarget.style.transform = "translateY(-2px)")
              }
              onMouseOut={(e: MouseEvent<HTMLButtonElement>) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              ❌ Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
