export interface UserConfig {
  leetcode?: string;
  codechef?: string;
  hackerrank?: string;
  codeforces?: string;
}

export interface LeetCodeStats {
  username: string;
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  acceptanceRate: number;
  ranking: number;
  contributionPoints: number;
  reputation: number;
}

export interface CodeChefStats {
  username: string;
  rating: number;
  stars: string;
  globalRank: number;
  countryRank: number;
  problemsSolved: number;
  contestsParticipated: number;
}

export interface HackerRankStats {
  username: string;
  badges: number;
  stars: number;
  level: string;
  problemsSolved: number;
  rank: number;
}

export interface CodeforcesStats {
  username: string;
  rating: number;
  maxRating: number;
  rank: string;
  maxRank: string;
  problemsSolved: number;
  contestsParticipated: number;
}

export interface PlatformStats {
  leetcode?: LeetCodeStats;
  codechef?: CodeChefStats;
  hackerrank?: HackerRankStats;
  codeforces?: CodeforcesStats;
}

export interface ActivityData {
  date: string;
  problems: number;
  platform: string;
}
