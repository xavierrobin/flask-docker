import ClientNavigation from '../../components/ClientNavigation';

export default function ClientLayout({ children }) {
  const navLinks = [
    { name: 'Overview', href: 'overview' },
    { name: 'Strategy', href: 'strategy' }
  ];

  console.log(children)
  return (
    <main className="container">      
      <ul className="nav nav-pills bg-white border-bottom mb-3">
        <ClientNavigation navLinks={navLinks} />
      </ul>
      {children}
    </main>
  );
}