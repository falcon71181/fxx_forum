import { rules } from "../(utils)/rules";

const Help = () => {
  return (
    <main className="pt-20 flex min-h-screen min-w-screen justify-center text-slate-300">
      <div className="border-2 border-white w-full tablet:w-4/5 min-h-screen shadow-2xl shadow-cyan-300 rounded-t-xl">
        <nav className="w-full h-10 bg-gray-800 rounded-t-xl flex justify-center items-center text-xl tablet:text-2xl navHide:text-3xl">
          General Rules
        </nav>
        {rules.map((rule, index) => (
          <div key={index} className="flex border-[1px] border-blue-500 rounded-xl p-2 m-2">
            <span className="text-blue-600 font-extrabold text-base tablet:text-lg">{index}</span>
            <span className="text-slate-300 text-sm tablet:text-base ml-2">{rule}</span>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Help;
