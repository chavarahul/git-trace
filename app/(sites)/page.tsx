export default function Home() {
  return (
    <section className="relative w-full">
      <header className="py-2 my-5 rounded-full relative mx-auto lg:px-20 md:px-10 max-md:px-5 flex justify-between items-center backdrop-blur-sm">
        <h1 className="font-medium md:text-xl">CloneDetect</h1>
        <div className=""></div>
      </header>
      <div className="md:flex items-center">
        <div className="lg:w-[60%]">
          <div className="lg:mt-40 lg:px-20 md:px-10 max-md:px-5 ">
            <div className="tag">Uncover Repository Plagiarism</div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text mt-6">
              Detect Cloned Repositories Instantly
            </h1>
            <p className="text-xl text-[#010D3E] tracking-tight mt-6">
              Analyze Git repositories for plagiarism and identify clones or forks effortlessly. Ensure originality, protect your code, and maintain integrity in your projects.
            </p>
            <div className="flex flex-1 gap-1 items-center mt-[30px] relative">
              <form className="relative max-md:w-full">
                <input
                  type="text"
                  className="border bg-transparent w-full relative border-black outline-none rounded-full p-3 py-4 md:w-[450px]"
                  placeholder="Enter the repository URL here"
                />
                <button className="absolute top-2 right-2 bg-black text-white p-2 px-5 rounded-full">
                  Analyze
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
