'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';

const stripePromise = loadStripe("pk_test_51Q1WqmBi8ZwCbxPYF8L4kukHUVVARusHQfJt633Avj0O7tlya6qhXSf2lgonDR46dUL7o6PWrNVNr8V5cyMLhflq006kkjw0LS");

const CheckoutForm = () => {
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const queryClientSecret = queryParams.get('clientSecret');
        if (queryClientSecret) {
            setClientSecret(queryClientSecret);
        }
    }, []);

    const options = useCallback(() => ({
        clientSecret,
    }), [clientSecret]);

    return (
        <div className="py-16" id="checkout">
            {clientSecret && (
                <EmbeddedCheckoutProvider stripe={stripePromise} options={options()}>
                    <EmbeddedCheckout />
                </EmbeddedCheckoutProvider>
            )}
        </div>
    );
};

export default CheckoutForm;
