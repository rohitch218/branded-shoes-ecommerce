import { Link } from 'react-router-dom';
import { FacebookIcon, TwitterIcon, InstagramIcon, LinkedinIcon } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: 'Shop',
      links: [
        { name: 'Men', path: '/products?category=men' },
        { name: 'Women', path: '/products?category=women' },
        { name: 'Kids', path: '/products?category=kids' },
        { name: 'New Arrivals', path: '/products?new=true' },
        { name: 'Best Sellers', path: '/products?sort=popular' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', path: '/about' },
        { name: 'Our Story', path: '/about#story' },
        { name: 'Careers', path: '/careers' },
        { name: 'Press', path: '/press' },
      ],
    },
    {
      title: 'Customer Service',
      links: [
        { name: 'Contact Us', path: '/contact' },
        { name: 'FAQs', path: '/faq' },
        { name: 'Shipping & Returns', path: '/shipping' },
        { name: 'Size Guide', path: '/size-guide' },
        { name: 'Track Order', path: '/track-order' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Terms & Conditions', path: '/terms' },
        { name: 'Privacy Policy', path: '/privacy' },
        { name: 'Cookie Policy', path: '/cookie-policy' },
        { name: 'Returns Policy', path: '/returns' },
      ],
    },
  ];

  const socialLinks = [
    { icon: <FacebookIcon className="h-5 w-5" />, url: 'https://facebook.com' },
    { icon: <TwitterIcon className="h-5 w-5" />, url: 'https://twitter.com' },
    { icon: <InstagramIcon className="h-5 w-5" />, url: 'https://instagram.com' },
    { icon: <LinkedinIcon className="h-5 w-5" />, url: 'https://linkedin.com' },
  ];

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <Link to="/" className="text-2xl font-bold text-white mb-4 inline-block">
              Sole<span className="text-primary">Store</span>
            </Link>
            <p className="text-gray-400 mb-6">
              Your one-stop destination for premium footwear. We offer the latest trends in comfort and style for every occasion.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={social.url.split('//')[1]}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {currentYear} SoleStore. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <img 
              src="/payment-methods.png" 
              alt="Payment Methods" 
              className="h-6" 
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
