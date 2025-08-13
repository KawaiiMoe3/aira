import React, { useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../utils/ViteApiBaseUrl";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function GoogleSignInButton({ clientId, onError }) {
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
                    const csrfResponse = await axios.get(`${API_BASE_URL}csrf/`, { withCredentials: true });
                    // Get it from cookies
                    const csrfToken = csrfResponse.data.csrfToken;

                    await axios.post(`${API_BASE_URL}auth/google/`, 
                        { token: response.credential },
                        { 
                            withCredentials: true,
                            headers: {
                                "X-CSRFToken": csrfToken
                            }
                        } // important to allow session cookie
                    );

                    // refresh auth state
                    await checkAuth();
                    // navigate to home page after seccess logged in
                    navigate("/");
                } catch (err) {
                    console.error("Google login failed:", err?.response || err);
                    // show UI error
                    if (onError) {
                        if (err.response?.data?.detail) {
                            onError(err.response.data.detail);
                        } else {
                            onError("Google login failed. Please try again.");
                        }
                    }
                }
            },
        });

        window.google.accounts.id.renderButton(
            document.getElementById("google-signin"),
            { theme: "outline", size: "large" }
        );
    }, [clientId, checkAuth, navigate, onError]);

    return <div id="google-signin" className="flex justify-center"></div>;
}
