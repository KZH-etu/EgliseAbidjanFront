import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Radio, Tv, Headphones, Clapperboard, LibraryBig } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import Logo from '../ui/Logo';
import LanguageToggle from '../ui/LanguageToggle';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const navLinks = [
    { name: t('nav.home'), path: '/'},
    { name: t('nav.about'), path: '/about'},
    {
      name: t('nav.mediatheque'),
      path: '/library', // Updated to show all documents when clicking main link
      children: [
        { name: t('nav.audio'), path: '/library/audio', icon: <Headphones size={18} className="mr-1"/> },
        { name: t('nav.video'), path: '/library/video', icon:<Clapperboard size={18} className="mr-1"/> },
        { name: t('nav.text'), path: '/library/text', icon: <LibraryBig size={18} className="mr-1"/> },
      ]
    },
    { name: t('nav.events'), path: '/events'},
    { name: t('nav.contact'), path: '/contact'},
    {
      name: t('nav.directweb'),
      children: [
        { name: t('nav.webradio'), path: '/webradio', icon: <Radio size={18} className="mr-1" /> },
        { name: t('nav.webtv'), path: '/webtv', icon: <Tv size={18} className="mr-1" /> },
      ]
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md py-2">
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <Logo className="h-12 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            link.children ? (
              <div key={link.name} className="relative group">
                {/* Make the main mediatheque link clickable */}
                {link.path ? (
                  <NavLink
                    to={link.path}
                    className={({ isActive }) => 
                      `text-base font-medium transition-colors duration-200 ${
                        isActive 
                          ? 'text-primary-600' 
                          : 'text-neutral-800 hover:text-primary-500'
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                ) : (
                  <button className="text-base font-medium text-neutral-800 hover:text-primary-500 transition-colors duration-200">
                    {link.name}
                  </button>
                )}
                <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="bg-white rounded-lg shadow-lg py-2 min-w-[160px]">
                    {link.children.map((child) => (
                      <NavLink
                        key={child.path}
                        to={child.path}
                        className={({ isActive }) => 
                          `flex items-center gap-5 px-4 py-2 text-base font-medium transition-colors duration-200 ${
                            isActive 
                              ? 'text-primary-600 bg-primary-50' 
                              : 'text-neutral-800 hover:text-primary-500 hover:bg-neutral-50'
                          }`
                        }
                      >
                        {child.icon}
                        {child.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => 
                  `text-base font-medium transition-colors duration-200 ${
                    isActive 
                      ? 'text-primary-600' 
                      : 'text-neutral-800 hover:text-primary-500'
                  }`
                }
                end={link.path === '/'}
              >
                {link.name}
              </NavLink>
            )
          ))}

          {/* Language Toggle */}
          <LanguageToggle />
        </nav>

        {/* Mobile Navigation Toggle */}
        <div className="lg:hidden flex items-center gap-4">
          <LanguageToggle />
          <button
            className="text-neutral-800 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div 
        className={`lg:hidden absolute top-full left-0 right-0 bg-white shadow-md transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-[500px]' : 'max-h-0'
        }`}
      >
        <div className="container-custom py-4 space-y-4">
          {navLinks.map((link) => (
            link.children ? (
              <div key={link.name} className="space-y-2">
                {link.path ? (
                  <NavLink
                    to={link.path}
                    className={({ isActive }) => 
                      `block py-2 text-base font-medium transition-colors duration-200 ${
                        isActive ? 'text-primary-600' : 'text-neutral-800 hover:text-primary-500'
                      }`
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </NavLink>
                ) : (
                  <div className="text-base font-medium text-neutral-800 px-4">
                    {link.name}
                  </div>
                )}
                <div className="pl-4 space-y-2">
                  {link.children.map((child) => (
                    <NavLink
                      key={child.path}
                      to={child.path}
                      className={({ isActive }) => 
                        `flex items-center gap-5 py-2 text-base font-medium transition-colors duration-200 ${
                          isActive ? 'text-primary-600' : 'text-neutral-800 hover:text-primary-500'
                        }`
                      }
                      onClick={() => setIsOpen(false)}
                    >
                      {child.icon}
                      {child.name}
                    </NavLink>
                  ))}
                </div>
              </div>
            ) : (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => 
                  `block py-2 text-base font-medium transition-colors duration-200 ${
                    isActive ? 'text-primary-600' : 'text-neutral-800 hover:text-primary-500'
                  }`
                }
                onClick={() => setIsOpen(false)}
                end={link.path === '/'}
              >
                {link.name}
              </NavLink>
            )
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;