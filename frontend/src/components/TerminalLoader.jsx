const TerminalLoader = () => {
  return (
    <div className="terminal-loader w-full max-w-lg h-48 bg-gray-900 border border-white/25 rounded-lg overflow-hidden mx-auto my-8 shadow-lg">
      <div className="terminal-header flex justify-between items-center bg-gray-800 px-3 py-1">
        <div className="terminal-title text-gray-300">Fetching User Infromation</div>
        <div className="terminal-controls flex gap-2">
          <div className="control w-4 h-4 rounded-full bg-red-500"></div>
          <div className="control w-4 h-4 rounded-full bg-yellow-500"></div>
          <div className="control w-4 h-4 rounded-full bg-green-500"></div>
        </div>
      </div>
      <div className="content px-4 py-2">
        <div className="text inline-block whitespace-nowrap overflow-hidden border-r-2 border-green-500 animate-typeAndDelete text-green-500 font-semibold">
          Loading ... 
        </div>
      </div>
    </div>
  );
};

export default TerminalLoader;