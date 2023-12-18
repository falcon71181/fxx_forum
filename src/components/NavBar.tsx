"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaHome,
  FaFlag,
  FaTelegramPlane,
  FaDiscord,
  FaSignInAlt,
} from "react-icons/fa";
import { GiJusticeStar } from "react-icons/gi";
import { IoPersonAddSharp, IoMenu } from "react-icons/io5";
import { Dropdown, Space, Menu } from "antd";

const iconSize = 14; // Icon Size

const items = [
  {
    label: <a href="/">Home</a>,
    key: "0",
  },
  {
    label: <a href="/upgrade">Upgrade</a>,
    key: "1",
  },
  {
    label: <a href="/help">Help</a>,
    key: "2",
  },
  {
    label: <a href="/telegram">Telegram</a>,
    key: "3",
  },
  {
    label: <a href="/discord">Discord</a>,
    key: "4",
  },
];

const NavBar = () => {

  const pathname = usePathname();

  return (
    // Padding px-2 at 1024px
    <nav className="fixed w-full h-10 flex justify-between items-center px-2 laptop:px-20 bg-gray-800 text-slate-300 font-heading">
      {/* Learn to Style Dropdown Menu */}
      <menu className="navHide:hidden h-full flex justify-center items-center gap-2">
        <Dropdown menu={{ items }} trigger={["click"]}>
          <a onClick={(e) => e.preventDefault()}>
            <Space className="h-full flex items-center">
              <IoMenu style={{ color: "white", fontSize: "30px" }} />
            </Space>
          </a>
        </Dropdown>
        <div className="text-xl text-white font-semibold">FXX</div>
      </menu>
      
      {/* make navLinks Hide at 800px */}
      <ul className="h-full hidden navHide:flex">
        <li>
          <Link
            href="/"
            className={`${pathname == "/" ? "text-white bg-slate-900" : "text-slate-300 hover:bg-slate-900 hover:text-white" } h-full flex items-center justify-center gap-2 px-1 laptop:px-3 text-sm`}
          >
            <FaHome style={{ fontSize: `${iconSize}px`, color: `${pathname === "/" ? "#ff9900" : "#cbd5e1"}` }} />
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/upgrade"
            className={`${pathname == "/upgrade" ? "text-white bg-slate-900" : "text-slate-300 hover:bg-slate-900 hover:text-white" } h-full flex items-center justify-center gap-2 px-1 laptop:px-3 text-sm`}
          >
            <GiJusticeStar style={{ fontSize: `${iconSize}px`, color: `${pathname === "/upgrade" ? "yellow" : "#cbd5e1"}` }} />
            Upgrade
          </Link>
        </li>
        <li>
          <Link
            href="/help"
            className={`${pathname == "/help" ? "text-white bg-slate-900" : "text-slate-300 hover:bg-slate-900 hover:text-white" } h-full flex items-center justify-center gap-2 px-1 laptop:px-3 text-sm`}
          >
            <FaFlag style={{ fontSize: `${iconSize}px`, color: `${pathname === "/help" ? "#73ff00" : "#cbd5e1"}` }} />
            Help
          </Link>
        </li>
        <li>
          <Link
            href="/telegram"
            className={`${pathname == "/telegram" ? "text-white bg-slate-900" : "text-slate-300 hover:bg-slate-900 hover:text-white" } h-full flex items-center justify-center gap-2 px-1 laptop:px-3 text-sm`}
          >
            <FaTelegramPlane style={{ fontSize: `${iconSize}px`, color: `${pathname === "/telegram" ? "#66c2ff" : "#cbd5e1"}` }} />
            Telegram
          </Link>
        </li>
        <li>
          <Link
            href="/discord"
            className={`${pathname == "/discord" ? "text-white bg-slate-900" : "text-slate-300 hover:bg-slate-900 hover:text-white" } h-full flex items-center justify-center gap-2 px-1 laptop:px-3 text-sm`}
          >
            <FaDiscord style={{ fontSize: `${iconSize}px`, color: `${pathname === "/discord" ? "#bc8cff" : "#cbd5e1"}` }} />
            Discord
          </Link>
        </li>
      </ul>
      <section className="flex h-full">
        <Link
          href="/"
          className="h-full flex items-center justify-center rounded-lg gap-2 px-2 laptop:px-3 text-sm hover:text-white"
        >
          <FaSignInAlt style={{ fontSize: `${iconSize}px` }} />
          LogIn
        </Link>
        <Link
          href="/"
          className="h-full flex items-center justify-center rounded-lg gap-2 px-2 laptop:px-3 text-sm hover:text-white"
        >
          <IoPersonAddSharp style={{ fontSize: `${iconSize}px` }} />
          Register
        </Link>
      </section>
    </nav>
  );
};

export default NavBar;
