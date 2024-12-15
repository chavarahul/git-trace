import type { Metadata } from "next";
import "./globals.css";
import { DM_Sans } from 'next/font/google'

export const metadata: Metadata = {
  title: "Git Trace | Detect Forks and Clones",
  description:
    "Detect plagiarized GitHub repositories with ease. Our tool identifies cloned or forked repositories and verifies code ownership. Ensure originality and prevent code theft.",
  keywords: [
    "GitHub repository checker",
    "repository plagiarism",
    "GitHub cloning detection",
    "forked repositories",
    "plagiarism detection tool",
    "check GitHub repositories",
    "find original repository",
    "verify code ownership",
    "GitHub repository plagiarism checker",
    "code originality checker",
  ],
  openGraph: {
    title: "GitHub Repository Plagiarism Checker",
    description: "Detect cloned and forked repositories on GitHub. Ensure code originality with our tool.",
    url: "https://www.yourwebsite.com",
    type: "website",
  },
};

const dmsans = DM_Sans({subsets:["latin"]});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmsans.className} antialiased overflow-x-clip`}
      >
        {children}
      </body>
    </html>
  );
}
