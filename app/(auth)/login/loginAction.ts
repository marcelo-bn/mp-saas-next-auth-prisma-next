'use server'

import { signIn } from "@/auth"

export default async function loginAction(_prevState: any, formData: FormData) {
    try {
        await signIn('credentials', {
            email: formData.get('email'),
            password: formData.get('password'),
            redirect: false,
        });
        return { success: true};
    } catch (error) {   
        if ((error as any).type === 'CredentialsSignIn') {
            return { message: 'Invalid credentials', success: false};
        }

        return { message: 'Something wrong happened', success: false};

    }
}