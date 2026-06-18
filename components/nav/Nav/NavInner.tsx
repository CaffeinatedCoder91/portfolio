'use client';

// Uses pathname, scroll listeners, and click state for the mobile dropdown.
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  BrandLink,
  LinkList,
  MenuToggle,
  NavActions,
  NavItem,
  NavPill,
  NavShell,
  StatusDot,
} from './Nav.styles';
import ThemeToggle from './ThemeToggle';

interface Props {
  name: string;
}

type NavLink = {
  href: string;
  label: string;
  outlined?: boolean;
};

const links: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/#projects', label: 'Projects' },
  { href: '/contacts', label: 'Contacts', outlined: true },
];

const NavInner = ({ name }: Props) => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setHidden(currentScrollY > lastScrollY.current && currentScrollY > 300);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown, { passive: true });

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, []);

  const isActive = (href: string): boolean => {
    if (href === '/contacts') {
      return pathname === '/contacts';
    }

    return pathname === '/' && (href === '/' || href === '/#projects');
  };

  return (
    <NavShell ref={navRef} $hidden={hidden}>
      <NavPill>
        <BrandLink href="/" onClick={() => setMenuOpen(false)}>
          <StatusDot aria-hidden="true" />
          <span>{name}</span>
        </BrandLink>
        <MenuToggle
          type="button"
          aria-label="Menu"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          ☰
        </MenuToggle>
        <NavActions>
          <LinkList id="primary-navigation" aria-label="Primary" $open={menuOpen}>
            {links.map((link) => {
              const active = isActive(link.href);

              return (
                <NavItem
                  key={link.href}
                  href={link.href}
                  $active={active}
                  $outlined={link.outlined}
                  aria-current={active ? 'page' : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </NavItem>
              );
            })}
          </LinkList>
          <ThemeToggle />
        </NavActions>
      </NavPill>
    </NavShell>
  );
};

export default NavInner;
