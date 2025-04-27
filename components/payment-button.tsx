'use client';

import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import {
    EmbeddedCheckout,
    EmbeddedCheckoutProvider
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useCallback } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './ui/dialog';

type PaymentButtonProps = {
    children: React.ReactNode;
};

export default function PaymentButton({children}: PaymentButtonProps) {

    const stripePromise = loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ''
    );

    const fetchClientSecret = useCallback(() => {
        return fetch('/api/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((res) => res.json())
        .then((data) => data.client_secret);
    }, []);

    const options = {fetchClientSecret};

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-full">{children}</Button>
            </DialogTrigger>
            <DialogContent>
                <>
                    <VisuallyHidden.Root>
                        <DialogTitle>
                            Assinatura Pro
                        </DialogTitle>
                    </VisuallyHidden.Root>

                    <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
                        <EmbeddedCheckout />
                    </EmbeddedCheckoutProvider>

                </>
            </DialogContent>
        </Dialog>
    )
}   