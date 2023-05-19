'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';

export default function ClientNavigation({ navLinks }) {
  const pathname = usePathname();
  const segment = useSelectedLayoutSegment();

  return (
    <>
      {navLinks && navLinks.map((link) => {
        const isActive = pathname.startsWith(`/clients/${segment}/${link.href}`);
        return (
          <li className="nav-item" key={link.name}>
            <Link
              className={isActive ? 'nav-link active' : 'nav-link'}
              href={`/clients/${segment}/${link.href}`}
            >
              {link.name}
            </Link>
          </li>
        );
      })}
    </>
  )
};