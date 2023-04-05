'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Pagination(props: any) {
  const searchParams = useSearchParams();
  const page = searchParams.get('page');
  const nextPage = props.nextPage;
  const pathname = usePathname();

  return (
    <>
        <Link href={{
            pathname: pathname,
            query: {
                page: nextPage
            }}}
              className="btn btn-primary">
                Next Page
        </Link>
    </>
  );
}
