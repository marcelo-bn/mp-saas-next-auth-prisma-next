import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from '@/lib/utils';
import { ShoppingBag } from "lucide-react";
import Link from 'next/link';

export default async function CheckoutReturnPage() {

    return (
        <Card className="max-w-lg mt-10 text-center">
            <CardContent>
                <ShoppingBag className="text-green-500 mx-auto mb-4 w-12 h-12"/>
                <CardHeader>
                    <CardTitle>Assinatura Confirmada</CardTitle>
                    <CardDescription>Obrigado por gastar seu dinheiro conosco</CardDescription>
                </CardHeader>
                <div className="text-gray-700 text-sm">
                    <p>Sua assinatura foi confirmada com sucesso</p>
                    <p>Aproveite enquanto há tempo</p>
                    <Link href="/dashboard" className={cn(buttonVariants(), 'mt-12')}>
                        Dashboard
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}