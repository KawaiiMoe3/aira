import React, { useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../utils/ViteApiBaseUrl";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function GoogleSignInButton({ clientId }) {
    const { checkAuth } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!window.google) return;
        window.google.accounts.id.initialize({
            client_id: clientId,
            callback: async (response) => {
                // response.credential is the ID token (JWT)
                try {
                    // Get CSRF token
                    await axios.get(`${API_BASE_URL}csrf/`, { withCredentials: true });

                    await axios.post(`${API_BASE_URL}auth/google/`, 
                        { token: response.credential },
                        { withCredentials: true } // important to allow session cookie
                    );

                    // refresh auth state
                    await checkAuth();
                    // navigate to home page after seccess logged in
                    navigate("/");
                } catch (err) {
                    console.error("Google login failed:", err?.response || err);
                    // show UI error
                }
            },
        });

        const container = document.getElementById("google-signin");
        google.accounts.id.renderButton(container, {
            theme: "outline",
            size: "large",
            width: container.offsetWidth
        });
    }, [clientId, checkAuth]);

    return <div id="google-signin"></div>;
}
