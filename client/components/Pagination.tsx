'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Pagination(props: any) {
  const currentPage = parseInt(props.currentPage === null ? 1 : props.currentPage);
  const totalPages = parseInt(props.totalPages);
  const pathname = usePathname();

  const isFirstPage = currentPage === 1 || props.currentPage === null;
  const isLastPage = currentPage === totalPages;


  const nextPage = (currentPage === totalPages ? totalPages : currentPage + 1);
  const previousPage = (currentPage === 1 ? 1 : currentPage - 1);
  console.log('current page:' + currentPage)
  console.log('next page: ' + nextPage)
  console.log('previous page:' + previousPage)
  console.log('is first page:' + isFirstPage)
  console.log('total pages:' + totalPages)
  
//   if client name:
  const searchParams = useSearchParams();
  const client_id = searchParams.get("client_id");
  console.log('client id: ' + client_id);

  return (
    <>
        {totalPages >= 1 ? (
        <div className="mt-2 pb-2 mb-2">
        <Link href={{pathname: pathname, query: {page: 1, client_id: client_id}}} onClick={(e) => isFirstPage && e.preventDefault()}>
            <button className="btn btn-primary" disabled={isFirstPage}>First page</button>
        </Link>{' '}
        <Link href={{pathname: pathname, query: {page: previousPage, client_id: client_id}}} onClick={(e) => isFirstPage && e.preventDefault()}>
            <button className="btn btn-primary" disabled={isFirstPage}>Previous page</button>
        </Link>{' '}
        <Link href={{pathname: pathname, query: {page: nextPage, client_id: client_id}}} onClick={(e) => isLastPage && e.preventDefault()}>
            <button className="btn btn-primary" disabled={isLastPage}>Next page</button>
        </Link>{' '}
        <Link href={{pathname: pathname, query: {page: totalPages, client_id: client_id}}} onClick={(e) => isLastPage && e.preventDefault()}>
            <button className="btn btn-primary" disabled={isLastPage}>Last page</button>
        </Link>
        </div>)
        : ""
        }
        
    </>
  );
}
