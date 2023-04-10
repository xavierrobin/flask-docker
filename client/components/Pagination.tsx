'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

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

  return (
    <>
        {totalPages !== 1 ? (
        <div className="mt-2 mb-2">
        <Link href={{pathname: pathname, query: {page: 1}}} onClick={(e) => isFirstPage && e.preventDefault()}>
            <button className="btn btn-primary" disabled={isFirstPage}>First page</button>
        </Link>{' '}
        <Link href={{pathname: pathname, query: {page: previousPage}}} onClick={(e) => isFirstPage && e.preventDefault()}>
            <button className="btn btn-primary" disabled={isFirstPage}>Previous page</button>
        </Link>{' '}
        <Link href={{pathname: pathname, query: {page: nextPage}}} onClick={(e) => isLastPage && e.preventDefault()}>
            <button className="btn btn-primary" disabled={isLastPage}>Next page</button>
        </Link>{' '}
        <Link href={{pathname: pathname, query: {page: totalPages}}} onClick={(e) => isLastPage && e.preventDefault()}>
            <button className="btn btn-primary" disabled={isLastPage}>Last page</button>
        </Link>
        </div>)
        : ""
        }
        
    </>
  );
}
