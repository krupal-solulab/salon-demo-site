import Link from "next/link";
export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-app-bg px-6 font-app text-app-ink">
      <div className="max-w-[46ch] text-center">
        <p className="text-[13px] font-semibold uppercase tracking-[.16em] text-app-soft">404</p>
        <h1 className="mt-3 text-[32px] font-bold">That page does not exist.</h1>
        <p className="mt-3 text-[15px] leading-relaxed text-app-soft">Check the address, or start a new generation job.</p>
        <Link href="/" className="mt-7 inline-flex min-h-[46px] items-center rounded-lg bg-app-accent px-6 text-[15px] font-semibold text-white">Back to the generator</Link>
      </div>
    </div>
  );
}
