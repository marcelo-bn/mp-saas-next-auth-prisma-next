import { auth } from '@/auth';
import BannerWarning from '@/components/banner-warning';
import PricingCard from '@/components/pricing-card';
import { buttonVariants } from '@/components/ui/button';
import { fetchSubscriptionByEmail } from '@/lib/stripe';
import { cn } from '@/lib/utils';
import { Download } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import bookImg from './book.png';

export default async function MonthlyBook() {
  const session = await auth();
  const userEmail = session?.user?.email as string;
  const subscription = await fetchSubscriptionByEmail(userEmail);

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Livro do Mês</h1>
      {subscription && (
        <>
          <Image src={bookImg} alt="Livro do mês" />
          <Link
            className={cn(
              'flex items-center justify-center gap-4 mt-10',
              buttonVariants()
            )}
            href="/livro.pdf"
            target="_blank"
          >
            <Download className="h-4 w-4" /> Download do Pdf
          </Link>
        </>
      )}
      {!subscription && (
        <>
          <BannerWarning text="Para acessar o livro do mês, você precisa de uma assinatura ativa. Que tal assinar agora?" />
          <PricingCard />
        </>
      )}
    </>
  );
}
