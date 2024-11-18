// components/Return.js
'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const STOCKVERSE_BACK_END = process.env.NEXT_PUBLIC_STOCKVERSE_BACK_END;

const Return = () => {
    const [status, setStatus] = useState(null);
    const [customerEmail, setCustomerEmail] = useState('');
    const [name, setName] = useState('');
    const router = useRouter();

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const sessionId = queryParams.get('session_id');

        if (sessionId) {
            axios.get(`${STOCKVERSE_BACK_END}/session-status?session_id=${sessionId}`, {
                withCredentials: true,
            })
                .then((response) => {
                    const data = response.data;
                    setStatus(data.session.payment_status);
                    setCustomerEmail(data.session.customer_details.email);
                    setName(data.session.customer_details.name);
                })
                .catch((error) => {
                    console.error("Error fetching session status:", error);
                });
        }
    }, []);

    useEffect(() => {
        if (status === 'open') {
            router.push("/checkout");
        }
    }, [status, router]);

    if (status === 'paid') {
        return (
            <section id="success">
                <p>
                    Hi {name}, Thank you for Subscribing! A confirmation email will be sent to {customerEmail}.
                    If you have any questions, please email <a href="mailto:orders@example.com">orders@example.com</a>.
                </p>
            </section>
        );
    }

    return null;
};

export default Return;