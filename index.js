#!/usr/bin/env node

const fs = require('fs');
const readline = require('readline');
const axios = require('axios');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const configPath = './config.json';

let githubToken;
let githubAuthor;
let maxDepth;

function promptGitHubCredentials() {
  return new Promise((resolve, reject) => {
    rl.question('Enter your GitHub token: ', token => {
      githubToken = token;
      rl.question('Enter your GitHub author: ', author => {
        githubAuthor = author;
        resolve();
      });
    });
  });
}

function promptProjectDetails() {
  return new Promise((resolve, reject) => {
    rl.question('Enter the project name: ', projectName => {
      rl.question('Enter the maximum depth: ', depth => {
        maxDepth = parseInt(depth);
        resolve(projectName);
      });
    });
  });
}

function saveConfig() {
  const config = { githubToken, githubAuthor };
  fs.writeFileSync(configPath, JSON.stringify(config));
}

function loadConfig() {
  if (fs.existsSync(configPath)) {
    const config = JSON.parse(fs.readFileSync(configPath));
    githubToken = config.githubToken;
    githubAuthor = config.githubAuthor;
  }
}

async function generateFileTree(owner, repo, depth = 0, outputFile, path = '') {
  if (depth > maxDepth) {
    return;
  }

  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
  const headers = {
    Accept: 'application/vnd.github.v3+json',
    Authorization: `Bearer ${githubToken}`
  };

  try {
    const response = await axios.get(url, { headers });
    const contents = response.data;

    const files = contents.filter(item => item.type === 'file');
    const directories = contents.filter(item => item.type === 'dir');

    for (const file of files) {
      console.log('│   '.repeat(depth) + '├── ' + file.name);
      fs.appendFileSync(outputFile, '│   '.repeat(depth) + '├── ' + file.name + '\n');
    }

    if (depth < maxDepth) {
      for (const directory of directories) {
        console.log('│   '.repeat(depth) + '├── ' + directory.name + '/');
        fs.appendFileSync(outputFile, '│   '.repeat(depth) + '├── ' + directory.name + '/' + '\n');
        await generateFileTree(owner, repo, depth + 1, outputFile, `${path}/${directory.name}`);
      }
    }
  } catch (error) {
    console.error('Error retrieving file tree:', error.response?.data || error.message);
  }
}

async function main() {
  try {
    loadConfig();
    if (!githubToken || !githubAuthor) {
      await promptGitHubCredentials();
      saveConfig();
    }

    const projectName = await promptProjectDetails();
    const outputFile = `${projectName}_file_tree.txt`;

    generateFileTree(githubAuthor, projectName, 0, outputFile)
      .then(() => {
        console.log(`File tree exported to ${outputFile}.`);
        rl.close();
      })
      .catch(error => {
        console.error('Error generating file tree:', error);
        rl.close();
      });
  } catch (error) {
    console.error('Error occurred:', error);
    rl.close();
  }
}

// Start the application
main();
