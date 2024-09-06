import React from 'react'

export const authService = {
    login: (email, password) => {
        return new Promise((reesolve, reject) => {
            setTimeout(() => {

                const user = { email: "ejemplo@gmail.com", password: "1234" };

                if (email === user.email && password === user.password) {
                    reesolve({ success: true, email: user.email });
                } else {
                    reject({ success: false, message: "ese usuario no existe" });
                }
            }, 1000);
        });
    }
};