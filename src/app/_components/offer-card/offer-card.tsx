import { CiLocationOn, CiMoneyBill, CiSearch } from 'react-icons/ci';
import { type offer } from '@/server/db/schema';
import { type InferSelectModel } from 'drizzle-orm';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { DeleteOfferButton } from '@/app/_components/delete-offer-button';

export type OfferCardProps = {
  offer: InferSelectModel<typeof offer>;
};

export function OfferCard({ offer }: OfferCardProps) {
  return (
    <div
      className={cn(
        'shadow-xl rounded-lg p-4 border border-primary w-[calc(33.33%-4rem)] hover:-translate-y-0.5 transition-transform duration-200 relative',
        offer.declined && 'border-red-700',
      )}
    >
      <Link href={`./${offer.id}/follow-ups`} className="flex flex-col h-full">
        <h3 className="text-xl font-semibold">{offer.company}</h3>
        <div className="h-0.5 bg-secondary w-full my-4" />
        <div className="flex flex-col justify-between gap-4 h-full">
          <div className="flex flex-col gap-2">
            {offer.location && (
              <p className="flex items-center gap-2">
                <CiLocationOn />
                <span>{offer.location}</span>
              </p>
            )}
            {offer.salary && (
              <p className="flex items-center gap-2">
                <CiMoneyBill />
                {offer.salary}/{offer.salaryFrequency}
              </p>
            )}
            {offer.foundOn && (
              <p className="flex items-center gap-2">
                <CiSearch />
                <span>{offer.foundOn}</span>
              </p>
            )}
          </div>
          {offer.declined ? (
            <span className="text-red-700">Rejected 🙅</span>
          ) : (
            <span className="text-green-700">On going 🤞</span>
          )}
        </div>
      </Link>
      <DeleteOfferButton
        className="absolute right-0 top-0 rounded-full h-8 w-8 p-0 translate-x-1/2 -translate-y-1/2"
        offerId={offer.id}
      />
    </div>
  );
}
