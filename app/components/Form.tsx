'use client';
import React, { useState } from 'react';
import { z } from 'zod';
import { checkPalgarism } from '@/lib/actions';

const inputSchema = z.object({
  url: z.string().url('Please enter a valid URL').nonempty('URL is required'),
});

type FormProps = {
  onResult: (
    error: string | null,
    result: { status: string | null; owner: string | null; repo: string | null }
  ) => void;
};

const Form = ({ onResult }: FormProps) => {
  const [url, setUrl] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validation = inputSchema.safeParse({ url });
    if (!validation.success) {
      setError(validation.error.format().url?._errors[0] || null);
      return;
    }

    setError(null);
    try {
      const response = await checkPalgarism(url);
      console.log('Response:', response);

      if (response.error) {
        setError(response.error);
        onResult(response.error, { status: null, owner: null, repo: null });
      } else if (response.status === 'fork') {
        onResult(null, { status: `This repository is not owned by you.`, owner:'false', repo:'false'});
      } else if (response.status === 'original') {
        onResult(null, { status: 'This repository is original.', owner: response.owner as string, repo: response.repo as string });
      }
    } catch (error) {
      console.error('Error during submission:', error);
      onResult('An unexpected error occurred. Please try again.', { status: null, owner: null, repo: null });
    }
  };

  return (
    <form
      className="relative max-md:w-full"
      onSubmit={handleSubmit}
      noValidate
    >
      <input
        type="text"
        className="border bg-transparent w-full relative border-black outline-none rounded-full p-3 py-4 md:w-[450px]"
        placeholder="Enter the repository URL here"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button
        type="submit"
        className="absolute top-2 right-2 bg-black text-white p-2 px-5 rounded-full"
      >
        Analyze
      </button>
      {error && (
        <p className="text-red-500 text-sm mt-2 ml-4">
          {error}
        </p>
      )}
    </form>
  );
};

export default Form;
