import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import type {
    AuthContextType,
    User,
    LoginCredentials,
    SignupData,
    UpdateUserData,
    AuthResult,
    LoginResponse,
    SignupResponse,
    VerifyResponse,
    UpdateResponse,
    ErrorResponse,
} from '../types/auth.types';

// Base API URL
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    // Check authentication status on mount
    useEffect(() => {
        checkAuthStatus();
    }, []);

    /**
     * Verify user authentication by checking with the server.
     * The JWT cookie is automatically sent with credentials: 'include'.
     */
    const checkAuthStatus = async (): Promise<void> => {
        try {
            setLoading(true);

            const response = await fetch(`${API_BASE}/auth/verify`, {
                method: 'GET',
                credentials: 'include', // ✅ Automatically sends HttpOnly cookie
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data: VerifyResponse = await response.json();
                
                // Handle different response structures
                const userData = data.user || (data as any).data?.user || data;
                
                setUser(userData);
                setIsAuthenticated(true);
            } else {
                // Token invalid or expired
                setUser(null);
                setIsAuthenticated(false);
            }
        } catch (error) {
            console.error('Auth verification failed:', error);
            setUser(null);
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Login user with email and password.
     * Server sets HttpOnly JWT cookie automatically.
     */
    const login = async (credentials: LoginCredentials): Promise<AuthResult> => {
        try {
            const response = await fetch(`${API_BASE}/auth/login`, {
                method: 'POST',
                credentials: 'include', // ✅ Allow server to set cookie
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            const data: LoginResponse | ErrorResponse = await response.json();

            if (!response.ok) {
                // Handle specific error codes
                if (response.status === 423) {
                    throw new Error((data as ErrorResponse).message || 'Account is temporarily locked.');
                }
                if (response.status === 403) {
                    throw new Error((data as ErrorResponse).message || 'Account is deactivated.');
                }
                throw new Error((data as ErrorResponse).message || 'Invalid email or password.');
            }

            // Extract user data (server already set the JWT cookie)
            const successData = data as LoginResponse;
            const userData = successData.user || (successData as any).data?.user || successData;
            
            setUser(userData);
            setIsAuthenticated(true);

            return { success: true, user: userData };
        } catch (error) {
            console.error('Login error:', error);
            return { 
                success: false, 
                error: error instanceof Error ? error.message : 'Login failed' 
            };
        }
    };

    /**
     * Sign up new user.
     * Server sets HttpOnly JWT cookie automatically.
     */
    const signup = async (userData: SignupData): Promise<AuthResult> => {
        try {
            const response = await fetch(`${API_BASE}/auth/signup`, {
                method: 'POST',
                credentials: 'include', // ✅ Allow server to set cookie
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const data: SignupResponse | ErrorResponse = await response.json();

            if (!response.ok) {
                throw new Error((data as ErrorResponse).message || 'Signup failed. Please try again.');
            }

            // Extract user data (server already set the JWT cookie)
            const successData = data as SignupResponse;
            const newUser = successData.user || (successData as any).data?.user || successData;
            
            setUser(newUser);
            setIsAuthenticated(true);

            return { success: true, user: newUser };
        } catch (error) {
            console.error('Signup error:', error);
            return { 
                success: false, 
                error: error instanceof Error ? error.message : 'Signup failed' 
            };
        }
    };

    /**
     * Logout user.
     * Server clears the HttpOnly JWT cookie.
     */
    const logout = async (): Promise<void> => {
        try {
            await fetch(`${API_BASE}/auth/logout`, {
                method: 'GET', // Changed to GET based on your route
                credentials: 'include', // ✅ Send cookie to server for clearing
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } catch (error) {
            console.error('Logout error:', error);
            // Continue with client-side logout even if server call fails
        } finally {
            // Clear client state regardless of server response
            setUser(null);
            setIsAuthenticated(false);
        }
    };

    /**
     * Update user profile.
     * JWT cookie is automatically sent.
     */
    const updateUser = async (updates: UpdateUserData): Promise<AuthResult> => {
        try {
            const response = await fetch(`${API_BASE}/auth/updateme`, {
                method: 'PATCH',
                credentials: 'include', // ✅ Send JWT cookie
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updates),
            });

            if (!response.ok) {
                const errorData: ErrorResponse = await response.json();
                throw new Error(errorData.message || 'Update failed.');
            }

            const data: UpdateResponse = await response.json();
            const updatedUser = data.user || (data as any).data?.user || data;
            
            setUser(updatedUser);

            return { success: true, user: updatedUser };
        } catch (error) {
            console.error('Update user error:', error);
            return { 
                success: false, 
                error: error instanceof Error ? error.message : 'Update failed' 
            };
        }
    };

    /**
     * Refresh user data from server.
     * Useful after operations that change user state.
     */
    const refreshUser = async (): Promise<void> => {
        await checkAuthStatus();
    };

    const value: AuthContextType = {
        user,
        isAuthenticated,
        loading,
        login,
        signup,
        logout,
        updateUser,
        refreshUser,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

/**
 * Custom hook to use Auth context.
 * Must be used within AuthProvider.
 */
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};