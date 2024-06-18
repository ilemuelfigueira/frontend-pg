export default function Layout({ children }) {
  return (
    <div className="w-full max-w-page-limit px-1 md:px-4 lg:px-12">
      {children}
    </div>
  );
}
