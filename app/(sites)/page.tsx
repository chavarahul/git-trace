'use client';
import { BorderBeam } from '@/components/ui/border-beam';
import Form from '../components/Form';
import { useState } from 'react';

export default function Home() {
  const [repoResult, setRepoResult] = useState<{
    status: string | null | undefined;
    owner: string | null | undefined;
    repo: string | null | undefined;
  }>({
    status: null,
    owner: null,
    repo: null,
  });

  const [error, setError] = useState<string | null>(null);

  const handleResult = (
    error: string | null,
    result: { status: string | null; owner: string | null; repo: string | null }
  ) => {
    setError(error);
    setRepoResult(result);
  };

  return (
    <section className="relative w-full">
      <header className="py-2 my-5 rounded-full relative mx-auto lg:px-20 md:px-10 max-md:px-5 flex justify-between items-center backdrop-blur-sm">
        <h1 className="font-medium md:text-xl">CloneDetect</h1>
      </header>
      <div className="md:flex items-center lg:pt-36">
        <div className="lg:w-[60%]">
          <div className="lg:px-20 md:px-10 max-md:px-5 ">
            <div className="tag">Uncover Repository Plagiarism</div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text mt-6">
              Detect Cloned Repositories Instantly
            </h1>
            <p className="text-xl text-[#010D3E] tracking-tight mt-6">
              Analyze Git repositories for plagiarism and identify clones or forks effortlessly. Ensure originality, protect your code, and maintain integrity in your projects.
            </p>
            <div className="flex flex-1 gap-1 items-center mt-[30px] relative">
              <Form onResult={handleResult} />
            </div>
          </div>
        </div>
        <div className="relative flex h-[400px] w-1/3 flex-col overflow-hidden rounded-lg border backdrop-blur-sm bg-white/30 text-black">
          <div className="border-b p-2 border-black/50 flex gap-3">
            <span className="size-3 rounded-full bg-[#FF5F57]"></span>
            <span className="size-3 rounded-full bg-[#FFBD2E]"></span>
            <span className="size-3 rounded-full bg-[#28C940]"></span>
          </div>
          <BorderBeam size={500} duration={12} delay={9} />
          {error ? (
            <p className="text-red-500 text-sm mt-2 ml-4">{error}</p>
          ) : (
            repoResult.status && (
              <div className="text-black text-sm mt-4 ml-4">
                <p>Status: {repoResult.status}</p>
                <p>Owner: {repoResult.owner}</p>
                <p>Repository: {repoResult.repo}</p>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
