export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <h1>Page woohoo</h1>
      {children}
    </>
  );
}
