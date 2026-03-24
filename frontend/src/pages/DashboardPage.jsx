import React from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/authStore';

const DashboardPage = () => {
    const { user, logout } = useAuthStore();

    const handleLogout = () => {
        logout();
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="auth-container glass"
            style={{ maxWidth: '500px' }}
        >
            <h2>Dashboard</h2>

            <div style={{ background: 'rgba(30, 41, 59, 0.5)', padding: '1.5rem', borderRadius: '0.75rem', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#4ade80' }}>Profile Information</h3>
                <p style={{ color: '#fff', marginBottom: '0.5rem' }}><span style={{ color: '#94a3b8', fontWeight: 600 }}>Name:</span> {user?.name}</p>
                <p style={{ color: '#fff', marginBottom: '0.5rem' }}><span style={{ color: '#94a3b8', fontWeight: 600 }}>Email:</span> {user?.email}</p>
            </div>

            <div style={{ background: 'rgba(30, 41, 59, 0.5)', padding: '1.5rem', borderRadius: '0.75rem', marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#4ade80' }}>Account Activity</h3>
                <p style={{ color: '#fff', marginBottom: '0.5rem' }}>
                    <span style={{ color: '#94a3b8', fontWeight: 600 }}>Joined:</span> {new Date(user?.createdAt).toLocaleDateString()}
                </p>
                <p style={{ color: '#fff', marginBottom: '0.5rem' }}>
                    <span style={{ color: '#94a3b8', fontWeight: 600 }}>Last Login:</span> {new Date(user?.lastLogin).toLocaleDateString()}
                </p>
            </div>

            <motion.button 
                whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.98 }} 
                onClick={handleLogout} 
                className="btn-primary"
            >
                Logout
            </motion.button>
        </motion.div>
    );
};

export default DashboardPage;
