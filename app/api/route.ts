import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const GITHUB_ACCESS_TOKEN_SECRET: string = "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";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const githubLink = body.url;

  const match = githubLink.match(/^https:\/\/github\.com\/([^/]+)\/([^/]+)\/?$/);
  if (!match) {
    return NextResponse.json({ error: "Invalid GitHub URL" }, { status: 400 });
  }
  const [, owner, repo] = match;

  console.log("Owner:", owner);
  console.log("Repo:", repo);

  try {
    // Fetch repository data
    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_ACCESS_TOKEN_SECRET}`,
        },
      }
    );

    const repoData = response.data;

    if (repoData.fork) {
      return NextResponse.json({ status: "fork" });
    }

    
    const commitsResponse = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/commits`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_ACCESS_TOKEN_SECRET}`,
        },
      }
    );

    const commits = commitsResponse.data;
    const firstCommitSHA = commits[commits.length - 1]?.sha;
    console.log("First Commit SHA:", firstCommitSHA);

    return NextResponse.json({ status: "original" });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("GitHub API Error:", error.response?.data || error.message);
      return NextResponse.json({
        error: error.response?.data?.message || "Error checking repository",
      });
    } else {
      console.error("Unexpected Error:", error);
      return NextResponse.json({ error: "Unexpected server error" });
    }
  }
};
