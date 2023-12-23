import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="pt-20 flex min-h-screen min-w-screen justify-center text-6xl text-slate-300">
      <div className="w-4/5 h-screen shadow-2xl shadow-gray-600">
        <nav className="w-full h-10 bg-gray-800 rounded-t-xl">
          <ul className=" h-full flex justify-evenly">
            <li>
              <Link
                href="/"
                className="text-slate-300 hover:bg-slate-900 hover:text-white h-full flex items-center justify-center px-3 text-xl"
              >
                GENERAL
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="text-slate-300 hover:bg-slate-900 hover:text-white h-full flex items-center justify-center px-3 text-xl"
              >
                MEMES
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="text-slate-300 hover:bg-slate-900 hover:text-white h-full flex items-center justify-center px-3 text-xl"
              >
                TECH
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="text-slate-300 hover:bg-slate-900 hover:text-white h-full flex items-center justify-center px-3 text-xl"
              >
                ISSUE
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </main>
  );
}
