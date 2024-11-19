'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';

const stripePromise = loadStripe("pk_live_51Q1WqmBi8ZwCbxPYOcXMnuKsPMWARV8T0WsBhkPrVvwrSaC7EncwnSQvFtG0qc4wOQ0J3QUjamlZHPY99kSqcJAv00YF67z5sO");

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