const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold mb-4">REMWaste</h3>
            <p className="text-gray-400">
              Professional waste management solutions for homes and businesses
              across the UK.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Skip Hire
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Garden Waste
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Commercial Waste
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Careers
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <address className="not-italic text-gray-400">
              <p>207 Regent St</p>
              <p>London, W1B 3HH</p>
              <p className="mt-2">Tel: 020 7123 4567</p>
              <p>Email: hello@remwaste.co.uk</p>
            </address>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} REMWaste. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
