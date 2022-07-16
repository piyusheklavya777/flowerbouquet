import Link from 'next/link';
import _ from 'lodash';

export default ({ currentUser }) => {
  const name = _.get(currentUser, 'name');
  const links = [
    !name && { label: 'Sign Up', href: '/auth/signup' },
    !name && { label: 'Sign In', href: '/auth/signin' },
    name && { label: 'Flowers', href: '/flower/all' },
    name && { label: 'Bouquets', href: '/' },
    name && { label:'My Orders', href: '/orders/all'},
    name && { label: 'Sign Out', href: '/auth/signout' },
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, href }) => {
      return (
        <li key={href} className="nav-item">
          <Link href={href}>
            <a className="nav-link">{label}</a>
          </Link>
        </li>
      );
    });

  return (
    <nav className="navbar navbar-light bg-light">
      <Link href="/">
        <h3 className="navbar-brand">Hi {name} !</h3>
      </Link>

      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center">{links}</ul>
      </div>
    </nav>
  );
};
