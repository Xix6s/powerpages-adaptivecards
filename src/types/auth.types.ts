// User type based on your backend response
export interface User {
    id: string;
    _id?: string;
    name: string;
    email: string;
    role?: string;
}

// API Response types
export interface LoginResponse {
    status: string;
    user: User;
    message?: string;
    token?: string; // Optional, only if SEND_TOKEN_IN_BODY=true
}

export interface SignupResponse {
    status: string;
    user: User;
    message?: string;
    token?: string;
}

export interface VerifyResponse {
    status: string;
    user: User;
}

export interface UpdateResponse {
    status: string;
    user: User;
}

export interface ErrorResponse {
    status: string;
    message: string;
}

// Auth Context types
export interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (credentials: LoginCredentials) => Promise<AuthResult>;
    signup: (userData: SignupData) => Promise<AuthResult>;
    logout: () => Promise<void>;
    updateUser: (updates: UpdateUserData) => Promise<AuthResult>;
    refreshUser: () => Promise<void>;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface SignupData {
    name: string;
    email: string;
    password: string;
}

export interface UpdateUserData {
    name?: string;
    email?: string;
}

export interface AuthResult {
    success: boolean;
    user?: User;
    error?: string;
}

// Theme Context types
export interface ThemeContextType {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
    isDark: boolean;
}