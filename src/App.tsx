import { useState, CSSProperties, MouseEvent } from "react";
import { createBrowserRouter, useNavigate, RouterProvider } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import { Image } from "@fluentui/react-components";

// ======= Shared Styles =======
const styles: Record<string, CSSProperties> = {
    container: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f5f1f1 0%, #ac0c3c 100%)',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        padding: '20px',
    },
    card: {
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
        padding: '40px',
        maxWidth: '450px',
        width: '100%',
    },
    title: {
        fontSize: '28px',
        fontWeight: '700',
        color: '#333',
        marginBottom: '10px',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: '14px',
        color: '#666',
        marginBottom: '30px',
        textAlign: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    label: {
        fontSize: '14px',
        fontWeight: '600',
        color: '#333',
    },
    input: {
        padding: '12px 16px',
        fontSize: '15px',
        border: '2px solid #e1e8ed',
        borderRadius: '8px',
        outline: 'none',
        transition: 'border-color 0.2s',
    },
    button: {
        padding: '14px 20px',
        fontSize: '16px',
        fontWeight: '600',
        color: 'white',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        marginTop: '10px',
    },
    buttonSecondary: {
        background: 'white',
        color: '#667eea',
        border: '2px solid #667eea',
    },
    buttonDanger: {
        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    },
    link: {
        textAlign: 'center',
        marginTop: '20px',
        fontSize: '14px',
        color: '#666',
    },
    linkButton: {
        color: '#667eea',
        cursor: 'pointer',
        textDecoration: 'underline',
        fontWeight: '600',
    },
    error: {
        background: '#fee',
        color: '#c33',
        padding: '12px',
        borderRadius: '6px',
        fontSize: '14px',
        marginBottom: '20px',
        border: '1px solid #fcc',
    },
    success: {
        background: '#efe',
        color: '#3c3',
        padding: '12px',
        borderRadius: '6px',
        fontSize: '14px',
        marginBottom: '20px',
        border: '1px solid #cfc',
    },
    userInfo: {
        background: '#f8f9fa',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px',
    },
    userInfoItem: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px 0',
        borderBottom: '1px solid #e1e8ed',
    },
    userInfoLabel: {
        fontWeight: '600',
        color: '#666',
    },
    userInfoValue: {
        color: '#333',
    },
    buttonGroup: {
        display: 'flex',
        gap: '10px',
        flexWrap: 'wrap',
    },
    loading: {
        textAlign: 'center',
        fontSize: '18px',
        color: 'white',
    },
};

// ======= Home Page =======
const Home = () => {
    const { isAuthenticated, user, logout, loading } = useAuth();
    const navigate = useNavigate();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = async () => {
        setIsLoggingOut(true);
        await logout();
        setIsLoggingOut(false);
    };

    if (loading) {
        return (
            <div style={styles.container}>
                <div style={styles.loading}>Loading...</div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
             <Image
                alt="Xix6s"
                src="/src/resources/xix-logo.png"
                height={100}
                width={100}
            />
            <div style={styles.card}>
                <h1 style={styles.title}>
                    {isAuthenticated ? '👋 Welcome Back!' : '🏠 Home'}
                </h1>

                {isAuthenticated ? (
                    <>
                        <div style={styles.userInfo}>
                            <div style={styles.userInfoItem}>
                                <span style={styles.userInfoLabel}>Name:</span>
                                <span style={styles.userInfoValue}>{user?.name || 'N/A'}</span>
                            </div>
                            <div style={styles.userInfoItem}>
                                <span style={styles.userInfoLabel}>Email:</span>
                                <span style={styles.userInfoValue}>{user?.email || 'N/A'}</span>
                            </div>
                            <div style={styles.userInfoItem}>
                                <span style={styles.userInfoLabel}>Role:</span>
                                <span style={styles.userInfoValue}>
                                    {user?.role || 'user'}
                                </span>
                            </div>
                            <div style={{ ...styles.userInfoItem, borderBottom: 'none' }}>
                                <span style={styles.userInfoLabel}>User ID:</span>
                                <span style={styles.userInfoValue}>
                                    {user?.id || user?._id || 'N/A'}
                                </span>
                            </div>
                        </div>

                        <div style={styles.buttonGroup}>
                            <button
                                style={{ ...styles.button, ...styles.buttonSecondary, flex: 1 }}
                                onClick={() => navigate("/update")}
                                onMouseOver={(e: MouseEvent<HTMLButtonElement>) => (e.currentTarget.style.transform = 'translateY(-2px)')}
                                onMouseOut={(e: MouseEvent<HTMLButtonElement>) => (e.currentTarget.style.transform = 'translateY(0)')}
                            >
                                ✏️ Update Profile
                            </button>
                            <button
                                style={{ ...styles.button, ...styles.buttonDanger, flex: 1 }}
                                onClick={handleLogout}
                                disabled={isLoggingOut}
                                onMouseOver={(e: MouseEvent<HTMLButtonElement>) => (e.currentTarget.style.transform = 'translateY(-2px)')}
                                onMouseOut={(e: MouseEvent<HTMLButtonElement>) => (e.currentTarget.style.transform = 'translateY(0)')}
                            >
                                {isLoggingOut ? '⏳ Logging out...' : '🚪 Logout'}
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <p style={styles.subtitle}>
                            Please login or signup to continue
                        </p>
                        <div style={styles.buttonGroup}>
                            <button
                                style={{ ...styles.button, flex: 1 }}
                                onClick={() => navigate("/login")}
                                onMouseOver={(e: MouseEvent<HTMLButtonElement>) => {
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
                                }}
                                onMouseOut={(e: MouseEvent<HTMLButtonElement>) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                🔐 Login
                            </button>
                            <button
                                style={{ ...styles.button, ...styles.buttonSecondary, flex: 1 }}
                                onClick={() => navigate("/signup")}
                                onMouseOver={(e: MouseEvent<HTMLButtonElement>) => (e.currentTarget.style.transform = 'translateY(-2px)')}
                                onMouseOut={(e: MouseEvent<HTMLButtonElement>) => (e.currentTarget.style.transform = 'translateY(0)')}
                            >
                                ✨ Signup
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

// ======= Login Page =======
const Login = () => {
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
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.title}>🔐 Login</h1>
                <p style={styles.subtitle}>Welcome back! Please login to your account</p>

                {error && <div style={styles.error}>❌ {error}</div>}

                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Email Address</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={styles.input}
                            onFocus={(e) => (e.target.style.borderColor = '#667eea')}
                            onBlur={(e) => (e.target.style.borderColor = '#e1e8ed')}
                            disabled={isSubmitting}
                            required
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={styles.input}
                            onFocus={(e) => (e.target.style.borderColor = '#667eea')}
                            onBlur={(e) => (e.target.style.borderColor = '#e1e8ed')}
                            disabled={isSubmitting}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        style={styles.button}
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

                <div style={styles.link}>
                    Don't have an account?{' '}
                    <span
                        style={styles.linkButton}
                        onClick={() => navigate("/signup")}
                    >
                        Sign up here
                    </span>
                </div>
            </div>
        </div>
    );
};

// ======= Signup Page =======
const Signup = () => {
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
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.title}>✨ Sign Up</h1>
                <p style={styles.subtitle}>Create a new account to get started</p>

                {error && <div style={styles.error}>❌ {error}</div>}

                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Full Name</label>
                        <input
                            type="text"
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={styles.input}
                            onFocus={(e) => (e.target.style.borderColor = '#667eea')}
                            onBlur={(e) => (e.target.style.borderColor = '#e1e8ed')}
                            disabled={isSubmitting}
                            required
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Email Address</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={styles.input}
                            onFocus={(e) => (e.target.style.borderColor = '#667eea')}
                            onBlur={(e) => (e.target.style.borderColor = '#e1e8ed')}
                            disabled={isSubmitting}
                            required
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Password</label>
                        <input
                            type="password"
                            placeholder="At least 8 characters"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={styles.input}
                            onFocus={(e) => (e.target.style.borderColor = '#667eea')}
                            onBlur={(e) => (e.target.style.borderColor = '#e1e8ed')}
                            disabled={isSubmitting}
                            required
                            minLength={8}
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Confirm Password</label>
                        <input
                            type="password"
                            placeholder="Re-enter your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            style={styles.input}
                            onFocus={(e) => (e.target.style.borderColor = '#667eea')}
                            onBlur={(e) => (e.target.style.borderColor = '#e1e8ed')}
                            disabled={isSubmitting}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        style={styles.button}
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

                <div style={styles.link}>
                    Already have an account?{' '}
                    <span
                        style={styles.linkButton}
                        onClick={() => navigate("/login")}
                    >
                        Login here
                    </span>
                </div>
            </div>
        </div>
    );
};

// ======= Update User Page =======
const UpdateUser = () => {
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

        if (email && !email.includes('@')) {
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
            setError(result.error || 'Update failed');
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.title}>✏️ Update Profile</h1>
                <p style={styles.subtitle}>Update your account information</p>

                {error && <div style={styles.error}>❌ {error}</div>}
                {success && <div style={styles.success}>✅ {success}</div>}

                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Full Name</label>
                        <input
                            type="text"
                            placeholder="Enter new name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={styles.input}
                            onFocus={(e) => (e.target.style.borderColor = '#667eea')}
                            onBlur={(e) => (e.target.style.borderColor = '#e1e8ed')}
                            disabled={isSubmitting}
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Email Address</label>
                        <input
                            type="email"
                            placeholder="Enter new email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={styles.input}
                            onFocus={(e) => (e.target.style.borderColor = '#667eea')}
                            onBlur={(e) => (e.target.style.borderColor = '#e1e8ed')}
                            disabled={isSubmitting}
                        />
                    </div>

                    <div style={styles.buttonGroup}>
                        <button
                            type="submit"
                            style={{ ...styles.button, flex: 1 }}
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
                            {isSubmitting ? '⏳ Updating...' : '💾 Save Changes'}
                        </button>
                        <button
                            type="button"
                            style={{ ...styles.button, ...styles.buttonSecondary, flex: 1 }}
                            onClick={() => navigate("/")}
                            disabled={isSubmitting}
                            onMouseOver={(e: MouseEvent<HTMLButtonElement>) => (e.currentTarget.style.transform = 'translateY(-2px)')}
                            onMouseOut={(e: MouseEvent<HTMLButtonElement>) => (e.currentTarget.style.transform = 'translateY(0)')}
                        >
                            ❌ Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// ======= 404 Page =======
const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.title}>😕 404 - Page Not Found</h1>
                <p style={styles.subtitle}>The page you're looking for doesn't exist</p>
                <button
                    style={styles.button}
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

// ======= Router Setup =======
const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    { path: "/update", element: <UpdateUser /> },
    { path: "*", element: <NotFound /> },
]);

// ======= App =======
const App = () => {
    return <RouterProvider router={router} />;
};

export default App;