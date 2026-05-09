import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] items-center justify-center px-6">
      <div className="text-center">
        <p className="eyebrow mb-6 justify-center text-graphite/65">404</p>
        <h1 className="font-display text-5xl tracking-tight text-graphite md:text-7xl">
          The piece you're looking for is in another room.
        </h1>
        <Link href="/" className="btn-primary mt-10">
          Return to the atelier →
        </Link>
      </div>
    </section>
  );
}
