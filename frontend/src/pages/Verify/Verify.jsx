import React, { useContext, useEffect } from 'react';
import './Verify.css';
import axios from 'axios'; // Import axios library
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Verify = () => {
    const [searchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const { url } = useContext(StoreContext);
    const navigate = useNavigate();

    const verifyPayment = async () => {
        try {
            const response = await axios.post(url + "/api/order/verify", { success, orderId });
            console.log("Response from server:", response.data);
            if (response.data.success) {
                navigate("/myorders");
            } else {
                navigate("/");
            }
        } catch (error) {
            console.error("Error verifying payment:", error);
            navigate("/"); // Navigate to home page on error
        }
    };
    

    useEffect(() => {
        verifyPayment();
    }, []);

    return (
        <div className="verify">
            <div className="spinner"></div>
        </div>
    );
};

export default Verify;
