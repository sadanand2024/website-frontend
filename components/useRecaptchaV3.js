"use client";
import { useState, useEffect } from "react";

const useRecaptchaV3 = (sitekey) => {
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  // Load the reCAPTCHA script dynamically
  useEffect(() => {
    const loadRecaptchaScript = () => {
      if (
        !document.querySelector(
          `script[src^="https://www.google.com/recaptcha/api.js"]`
        )
      ) {
        const script = document.createElement("script");
        script.src = `https://www.google.com/recaptcha/api.js?render=${sitekey}`;
        script.async = true;
        script.defer = true;

        script.onload = () => {
          if (window.grecaptcha) {
            setIsScriptLoaded(true);
          } else {
            const interval = setInterval(() => {
              if (window.grecaptcha) {
                setIsScriptLoaded(true);
                clearInterval(interval);
              }
            }, 50);
          }
        };

        script.onerror = () => {
          setError("Failed to load reCAPTCHA script.");
        };

        document.head.appendChild(script);
      } else {
        setIsScriptLoaded(true);
      }
    };

    loadRecaptchaScript();

    // Clean up script on component unmount
    return () => {
      setToken(null);
      setIsReady(false);
      setError(null);
    };
  }, [sitekey]);

  // Execute reCAPTCHA and generate token
  useEffect(() => {
    const executeRecaptcha = async () => {
      if (isScriptLoaded && window.grecaptcha) {
        try {
          const token = await window.grecaptcha.execute(sitekey, {
            action: "register",
          });

          if (!token) {
            throw new Error("Failed to generate reCAPTCHA token.");
          }

          setToken(token);
          setIsReady(true);
        } catch (err) {
          console.error("reCAPTCHA error:", err);
          setError("reCAPTCHA execution failed. Please try again.");
        }
      }
    };

    const interval = setInterval(() => {
      if (isScriptLoaded && window.grecaptcha) {
        clearInterval(interval);
        executeRecaptcha();
      }
    }, 50);

    return () => clearInterval(interval); // Clean up on component unmount
  }, [isScriptLoaded, sitekey]);

  return { token, error, isReady };
};

export default useRecaptchaV3;
