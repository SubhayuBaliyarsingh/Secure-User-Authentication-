import React from 'react';

const Input = ({ icon: Icon, ...props }) => {
    return (
        <div className="input-group">
            <div className="icon">
                <Icon size={20} />
            </div>
            <input className="input-field" {...props} />
        </div>
    );
};

export default Input;
