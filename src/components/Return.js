// components/Return.js
'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams, useRouter } from 'next/navigation';

const Return = () => {
    const [status, setStatus] = useState(null);
    const [customerEmail, setCustomerEmail] = useState('');
    const [name, setName] = useState('');
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const sessionId = searchParams.get('session_id');
        if (sessionId) {
            axios.get(`http://localhost:4848/session-status?session_id=${sessionId}`)
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
    }, [searchParams]);

    if (status === 'open') {
        router.push("/checkout");
    }

    if (status === 'paid') {
        return (
            <section id="success">
                <p>
                    Hi {name}, Thank you for Subsribing! A confirmation email will be sent to {customerEmail}.
                    If you have any questions, please email <a href="mailto:orders@example.com">orders@example.com</a>.
                </p>
            </section>
        );
    }

    return null;
};

export default Return;
