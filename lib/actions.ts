import axios from "axios";

const GITHUB_ACCESS_TOKEN_SECRET: string = "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";

export const checkPalgarism = async (githubLink: string) => {

  const match = githubLink.match(/^https:\/\/github\.com\/([^/]+)\/([^/]+)\/?$/);

  if (!match) {
    return { error: "Invalid GitHub URL" };
  }

  const [, owner, repo] = match;

  try {
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
      return { status: "fork" };
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

    const firstone = commits[commits.length - 1]?.sha;

    console.log(firstone)

    return { status: "original", owner, repo };
  } catch (error) {

    if (axios.isAxiosError(error)) {
      return { error: error.response?.data?.message || "Error checking repository" };
    } else {
      return { error: "Unexpected server error" };
    }
  }
};
