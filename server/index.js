import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// CodeChef Web Scraping
app.get('/api/codechef/:username', async (req, res) => {
  try {
    const { username } = req.params;
    
    if (!username || username.trim() === '') {
      return res.status(400).json({ error: 'Username is required' });
    }
    const response = await fetch(`https://www.codechef.com/users/${username}`);
    const html = await response.text();
    const $ = cheerio.load(html);

    // Extract rating
    const rating = $('.rating-number').first().text().trim() || '0';
    
    // Extract stars
    const stars = $('.rating-star').find('span').first().text().trim() || 'N/A';
    
    // Extract rank
    const rankText = $('.rating-ranks').find('a').first().text().trim();
    const globalRank = rankText.match(/(\d+)/)?.[1] || '0';
    
    // Extract problems solved
    const problemsSolved = $('.problems-solved').find('h5').text().trim() || '0';
    
    // Extract contest participation
    const sections = $('.content').find('section');
    let contestsParticipated = 0;
    sections.each((i, elem) => {
      const header = $(elem).find('h3').text();
      if (header.includes('Contests')) {
        contestsParticipated = $(elem).find('.dataTable tbody tr').length;
      }
    });

    res.json({
      username,
      rating: parseInt(rating) || 0,
      stars: stars || 'Unrated',
      globalRank: parseInt(globalRank) || 0,
      countryRank: 0,
      problemsSolved: parseInt(problemsSolved) || 0,
      contestsParticipated: contestsParticipated || 0,
    });
  } catch (error) {
    console.error('CodeChef scraping error:', error);
    res.status(500).json({ error: 'Failed to fetch CodeChef data' });
  }
});

// HackerRank Web Scraping
app.get('/api/hackerrank/:username', async (req, res) => {
  try {
    const { username } = req.params;
    
    if (!username || username.trim() === '') {
      return res.status(400).json({ error: 'Username is required' });
    }
    const response = await fetch(`https://www.hackerrank.com/rest/hackers/${username}/scores_elo`);
    const data = await response.json();

    // Fetch profile data
    const profileResponse = await fetch(`https://www.hackerrank.com/${username}`);
    const html = await profileResponse.text();
    const $ = cheerio.load(html);

    // Extract badges
    const badges = $('.badge-list .badge').length || 0;
    
    // Extract stars from various tracks
    let totalStars = 0;
    Object.values(data.models || {}).forEach(track => {
      if (track.stars) totalStars += track.stars;
    });

    // Calculate problems solved
    let problemsSolved = 0;
    Object.values(data.models || {}).forEach(track => {
      if (track.level) problemsSolved += track.level * 10; // Approximate
    });

    res.json({
      username,
      badges: badges || 0,
      stars: totalStars || 0,
      level: 'Advanced',
      problemsSolved: problemsSolved || 0,
      rank: 0,
    });
  } catch (error) {
    console.error('HackerRank scraping error:', error);
    res.status(500).json({ error: 'Failed to fetch HackerRank data' });
  }
});

// LeetCode GraphQL API (Official)
app.post('/api/leetcode/:username', async (req, res) => {
  try {
    const { username } = req.params;
    
    if (!username || username.trim() === '') {
      return res.status(400).json({ error: 'Username is required' });
    }
    const response = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query getUserProfile($username: String!) {
            matchedUser(username: $username) {
              username
              submitStats {
                acSubmissionNum {
                  difficulty
                  count
                }
              }
              profile {
                ranking
                reputation
              }
            }
          }
        `,
        variables: { username }
      })
    });

    const data = await response.json();
    
    // Check if user exists
    if (!data.data || !data.data.matchedUser) {
      return res.status(404).json({ error: 'LeetCode user not found' });
    }
    
    const user = data.data.matchedUser;
    
    // Check if submitStats exists
    if (!user.submitStats || !user.submitStats.acSubmissionNum) {
      return res.status(404).json({ error: 'No submission data available for this user' });
    }
    
    const stats = user.submitStats.acSubmissionNum;

    res.json({
      username,
      totalSolved: stats.find(s => s.difficulty === 'All')?.count || 0,
      easySolved: stats.find(s => s.difficulty === 'Easy')?.count || 0,
      mediumSolved: stats.find(s => s.difficulty === 'Medium')?.count || 0,
      hardSolved: stats.find(s => s.difficulty === 'Hard')?.count || 0,
      acceptanceRate: 0,
      ranking: user.profile?.ranking || 0,
      contributionPoints: 0,
      reputation: user.profile?.reputation || 0,
    });
  } catch (error) {
    console.error('LeetCode API error:', error);
    res.status(500).json({ error: 'Failed to fetch LeetCode data' });
  }
});

// Codeforces API (Official)
app.get('/api/codeforces/:username', async (req, res) => {
  try {
    const { username } = req.params;
    
    if (!username || username.trim() === '') {
      return res.status(400).json({ error: 'Username is required' });
    }
    const userResponse = await fetch(`https://codeforces.com/api/user.info?handles=${username}`);
    const userData = await userResponse.json();
    
    if (userData.status !== 'OK') {
      throw new Error('User not found');
    }

    const user = userData.result[0];

    // Fetch submissions
    const submissionsResponse = await fetch(
      `https://codeforces.com/api/user.status?handle=${username}&from=1&count=10000`
    );
    const submissionsData = await submissionsResponse.json();
    
    const solvedProblems = new Set(
      submissionsData.result
        .filter(s => s.verdict === 'OK')
        .map(s => `${s.problem.contestId}-${s.problem.index}`)
    );

    res.json({
      username,
      rating: user.rating || 0,
      maxRating: user.maxRating || 0,
      rank: user.rank || 'unrated',
      maxRank: user.maxRank || 'unrated',
      problemsSolved: solvedProblems.size,
      contestsParticipated: 0,
    });
  } catch (error) {
    console.error('Codeforces API error:', error);
    res.status(500).json({ error: 'Failed to fetch Codeforces data' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
