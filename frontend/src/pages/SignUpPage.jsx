import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Lock, Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { useAuthStore } from "../store/authStore";

const SignUpPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { signup, error, isLoading } = useAuthStore();
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            await signup(email, password, name);
            navigate("/verify-email");
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
            <h2>Create Account</h2>

            <form onSubmit={handleSignUp}>
                <Input icon={User} type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <Input icon={Mail} type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <Input icon={Lock} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />

                {error && <p className="error-message">{error}</p>}

                <motion.button className="btn-primary" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={isLoading}>
                    {isLoading ? <Loader className="animate-spin" size={24} /> : "Sign Up"}
                </motion.button>
            </form>

            <div className="auth-footer">
                Already have an account? <Link to="/login">Login</Link>
            </div>
        </motion.div>
    );
};

export default SignUpPage;
