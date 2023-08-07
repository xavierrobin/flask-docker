'use client';
import { usePathname } from 'next/navigation';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function ClientNavigation({ navLinks }) {
  const pathname = usePathname();
  const params = useParams();

  return (
    <>
      {navLinks && navLinks.map((link) => {
        const isActive = pathname.startsWith(`/clients/${params.id}/${link.href}`);
        return (
          <li className="nav-item" key={link.name}>
            <Link
              className={isActive ? 'nav-link active' : 'nav-link'}
              href={`/clients/${params.id}/${link.href}`}
            >
              {link.name}
            </Link>
          </li>
        );
      })}
    </>
  )
};