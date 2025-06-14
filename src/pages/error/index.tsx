import Link from "next/link";

export default function ErrorPage() {
  return (
    <div className="flex flex-col align-middle items-center h-screen justify-center gap-4">
      <h2 className="font-extrabold text-4xl">Ups! Something went wrong.</h2>
      <p className="text-xl">Try again later</p>
      <Link className="text-lg font-extrabold " href={"/"}>
        Retry
      </Link>
    </div>
  );
}
