import Image from "@/components/Image";

const Container = ({ children }) => (
  <div className="w-screen max-lg:w-[100vw] lg:w-[90vw] xl:w-[1200px] 2xl:w-[1400px]">
    {children}
  </div>
);

export function HeaderNavigator() {
  return (
    <header className="mb-6 flex w-screen justify-center rounded-md bg-white shadow-md">
      <Container>
        <div className="flex items-center gap-2">
          <Image
            href={`${location.origin}/`}
            src={
              process.env.NEXT_PUBLIC_STORAGE_PRODUTOS +
              "/produtos/png/logo/logo-192x192.png"
            }
            className="aspect-square w-16"
          />
          <span className="text-2xl font-bold text-fonts-$cinza">PG CUSTOM STORE</span>
        </div>
      </Container>
    </header>
  );
}
