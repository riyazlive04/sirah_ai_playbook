export const Footer = () => {
  return (
    <footer className="bg-primary py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-primary-foreground/80 text-sm">
            © {new Date().getFullYear()} Sirah Digital. All rights reserved.
          </p>
          <p className="text-primary-foreground/60 text-sm">
            Built for business owners who want to scale with AI.
          </p>
        </div>
      </div>
    </footer>
  );
};
