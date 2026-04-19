import { useNavigate } from "react-router-dom";
import { Style } from "../design/styles";
import { useAuth } from "../context/AuthContext";
import { useState, MouseEvent } from "react";

export const LoginPage = () => {
    
 const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Please fill in all fields");
            return;
        }

        if (!email.includes('@')) {
            setError("Please enter a valid email address");
            return;
        }

        setIsSubmitting(true);
        const result = await login({ email, password });
        setIsSubmitting(false);

        if (result.success) {
            navigate("/");
        } else {
            setError(result.error || 'Login failed');
        }
    };

    return (
        <div style={Style()["container"]}>
            <div style={Style()["card"]}>
                <h1 style={Style()["title"]}>🔐 Login</h1>
                <p style={Style()["subtitle"]}>Welcome back! Please login to your account</p>

                {error && <div style={Style()["error"]}>❌ {error}</div>}

                <form onSubmit={handleSubmit} style={Style()["form"]}>
                    <div style={Style()["inputGroup"]}>
                        <label style={Style()["label"]}>Email Address</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={Style()["input"]}
                            onFocus={(e) => (e.target.style.borderColor = '#667eea')}
                            onBlur={(e) => (e.target.style.borderColor = '#e1e8ed')}
                            disabled={isSubmitting}
                            required
                        />
                    </div>

                    <div style={Style()["inputGroup"]}>
                        <label style={Style()["label"]}>Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={Style()["input"]}
                            onFocus={(e) => (e.target.style.borderColor = '#667eea')}
                            onBlur={(e) => (e.target.style.borderColor = '#e1e8ed')}
                            disabled={isSubmitting}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        style={Style()["button"]}
                        disabled={isSubmitting}
                        onMouseOver={(e: MouseEvent<HTMLButtonElement>) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
                        }}
                        onMouseOut={(e: MouseEvent<HTMLButtonElement>) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        {isSubmitting ? '⏳ Logging in...' : '🚀 Login'}
                    </button>
                </form>

                <div style={Style()["link"]}>
                    Don't have an account?{' '}
                    <span
                        style={Style()["linkButton"]}
                        onClick={() => navigate("/signup")}
                    >
                        Sign up here
                    </span>
                </div>
            </div>
        </div>
    );
};
