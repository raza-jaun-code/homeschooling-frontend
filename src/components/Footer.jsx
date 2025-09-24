const Footer = () => {
  return (
    <footer className="flex items-center justify-center bg-indigo-600 text-white text-center px-4 sm:px-6 lg:px-12 py-4 sm:py-6 min-h-[10vh]">
      <p className="text-sm sm:text-base md:text-lg">
        © {new Date().getFullYear()} HomeSchooling. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;