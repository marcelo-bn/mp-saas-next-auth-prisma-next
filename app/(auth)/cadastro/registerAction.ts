'use server';
import db from '@/lib/db'
import { hashSync } from 'bcrypt-ts';

export default async function registerAction(_prevState: any, formData: FormData) {
    const entries = Array.from(formData.entries());
    const data = Object.fromEntries(entries )as {
        name: string, 
        email: string, 
        password: string
    };

    // Validate data
    if (!data.email || !data.name || !data.password) {
        return {
            error: 'Fill all fields',
            success: false
        }
    }

    // Check if user already exists
    const userExists = await db.user.findUnique({
        where: {
            email: data.email
        }
    });

    if (userExists) {
        throw new Error('Preencha todos os campos!')
    }

    // Create User
    await db.user.create({
        data: {
            name: data.name,
            email: data.email,
            password: hashSync(data.password)
        }
    });
}