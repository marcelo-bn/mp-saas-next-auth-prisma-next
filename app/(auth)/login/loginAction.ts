'use server'

import { signIn } from "@/auth"
import { isRedirectError } from "next/dist/client/components/redirect-error";

export default async function loginAction(_prevState: any, formData: FormData) {
    try {
        await signIn('credentials', {
            email: formData.get('email'),
            password: formData.get('password'),
            redirect: true,
            redirectTo: '/dashboard',
        });
        return { success: true};
    } catch (error) {   

        // Temporary fix for redirect error
        if (isRedirectError(error)) {
            throw error;
        }

        if ((error as any).type === 'CredentialsSignIn') {
            return { message: 'Invalid credentials', success: false};
        }

        return { message: 'Something wrong happened', success: false};

    }
}