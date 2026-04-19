import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, MouseEvent } from "react";
import { Style } from "../design/styles";

export const SignUp = () => {

    const [name, setName] = useState("");
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [confirmPassword, setConfirmPassword] = useState("");
        const [error, setError] = useState("");
        const [isSubmitting, setIsSubmitting] = useState(false);
        const { signup } = useAuth();
        const navigate = useNavigate();
    
        const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setError("");
    
            if (!name || !email || !password || !confirmPassword) {
                setError("Please fill in all fields");
                return;
            }
    
            if (!email.includes('@')) {
                setError("Please enter a valid email address");
                return;
            }
    
            if (password.length < 8) {
                setError("Password must be at least 8 characters long");
                return;
            }
    
            if (password !== confirmPassword) {
                setError("Passwords do not match");
                return;
            }
    
            setIsSubmitting(true);
            const result = await signup({ name, email, password });
            setIsSubmitting(false);
    
            if (result.success) {
                navigate("/");
            } else {
                setError(result.error || 'Signup failed');
            }
        };
    
        return (
            <div style={Style()["container"]}>
                <div style={Style()["card"]}>
                    <h1 style={Style()["title"]}>✨ Sign Up</h1>
                    <p style={Style()["subtitle"]}>Create a new account to get started</p>
    
                    {error && <div style={Style()["error"]}>❌ {error}</div>}
    
                    <form onSubmit={handleSubmit} style={Style()["form"]}>
                        <div style={Style()["inputGroup"]}>
                            <label style={Style()["label"]}>Full Name</label>
                            <input
                                type="text"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                style={Style()["input"]}
                                onFocus={(e) => (e.target.style.borderColor = '#667eea')}
                                onBlur={(e) => (e.target.style.borderColor = '#e1e8ed')}
                                disabled={isSubmitting}
                                required
                            />
                        </div>
    
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
                                placeholder="At least 8 characters"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={Style()["input"]}
                                onFocus={(e) => (e.target.style.borderColor = '#667eea')}
                                onBlur={(e) => (e.target.style.borderColor = '#e1e8ed')}
                                disabled={isSubmitting}
                                required
                                minLength={8}
                            />
                        </div>
    
                        <div style={Style()["input"]}>
                            <label style={Style()["label"]}>Confirm Password</label>
                            <input
                                type="password"
                                placeholder="Re-enter your password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
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
                            {isSubmitting ? '⏳ Creating account...' : '🎉 Create Account'}
                        </button>
                    </form>
    
                    <div style={Style()["link"]}>
                        Already have an account?{' '}
                        <span
                            style={Style()["linkButton"]}
                            onClick={() => navigate("/login")}
                        >
                            Login here
                        </span>
                    </div>
                </div>
            </div>
        );
};