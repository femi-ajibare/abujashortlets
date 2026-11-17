#!/usr/bin/env bash
#
# One-command helper for pushing this site to GitHub.
#
# Usage:
#   ./push-to-github.sh <github-username> [repo-name]
#
# Example:
#   ./push-to-github.sh mycompany abujashortlets
#
# It will:
#   1. Make sure the repo exists locally (init + commit if needed)
#   2. Point "origin" at your GitHub repo
#   3. Push the "main" branch
#
set -euo pipefail

USERNAME="${1:-}"
REPO="${2:-abujashortlets}"

if [ -z "$USERNAME" ]; then
  echo "Usage: ./push-to-github.sh <github-username> [repo-name]" >&2
  echo "Example: ./push-to-github.sh mycompany abujashortlets" >&2
  exit 1
fi

REMOTE="https://github.com/${USERNAME}/${REPO}.git"

echo "==> Preparing local repository"
if [ ! -d ".git" ]; then
  git init -q -b main
  git config user.name "${GIT_USER_NAME:-Abujashortlets}"
  git config user.email "${GIT_USER_EMAIL:-host@abujashortlets.com}"
fi

git add -A
if git diff --staged --quiet; then
  echo "    Nothing new to commit."
else
  git -c commit.gpgsign=false commit -q -m "${1:-Update}"
  echo "    Committed changes."
fi

echo "==> Pointing origin at ${REMOTE}"
if git remote get-url origin >/dev/null 2>&1; then
  git remote set-url origin "$REMOTE"
else
  git remote add origin "$REMOTE"
fi

echo "==> Pushing main branch"
git push -u origin main

echo
echo "Done. Next:"
echo "  • Enable Pages:  repo -> Settings -> Pages -> Source: GitHub Actions"
echo "  • Or deploy to Netlify: https://app.netlify.com -> Import an existing project"
echo "  • Add BASE_PATH variable = '${REPO}' if using a GitHub project site"
