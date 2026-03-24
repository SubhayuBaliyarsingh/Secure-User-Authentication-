import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { useAuthStore } from "../store/authStore";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { login, error, isLoading } = useAuthStore();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="auth-container glass"
        >
            <h2>Welcome Back</h2>

            <form onSubmit={handleLogin}>
                <Input icon={Mail} type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <Input icon={Lock} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />

                <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1.25rem" }}>
                    <Link to="/forgot-password" style={{ color: "#4ade80", textDecoration: "none", fontSize: "0.875rem" }}>Forgot password?</Link>
                </div>

                {error && <p className="error-message">{error}</p>}

                <motion.button className="btn-primary" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={isLoading}>
                    {isLoading ? <Loader className="animate-spin" size={24} /> : "Login"}
                </motion.button>
            </form>

            <div className="auth-footer">
                Don't have an account? <Link to="/signup">Sign Up</Link>
            </div>
        </motion.div>
    );
};

export default LoginPage;
