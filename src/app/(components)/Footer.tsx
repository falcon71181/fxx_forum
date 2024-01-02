import React from "react";

const Footer: React.FC = () => {
  return (
    <main className="flex justify-center items-center w-full h-24 font-heading text-slate-300">
      &copy; 2024. <span className="hidden tablet:flex">Made with ❤️ by</span>
      <a href="https://github.com/falcon71181" target="_blank" className="mx-2 text-white hidden tablet:flex">falcon71181</a>
    </main>
  )
}

export default Footer;
