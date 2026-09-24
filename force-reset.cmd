@echo off
echo ============================================
echo Force Resetting GitHub Repository
echo ============================================
echo.
echo WARNING: This will replace ALL history on GitHub
echo Press Ctrl+C to cancel, or
pause
echo.

echo Step 1: Creating new orphan branch (no history)...
git checkout --orphan temp-main
echo Done!
echo.

echo Step 2: Adding all files...
git add -A
echo Done!
echo.

echo Step 3: Creating clean commit with VairagPatel...
git config user.name "VairagPatel"
git config user.email "vairag.techwork@gmail.com"
git commit -m "Initial commit: Vairag Akbari Portfolio Website"
echo Done!
echo.

echo Step 4: Deleting old main branch...
git branch -D main
echo Done!
echo.

echo Step 5: Renaming temp branch to main...
git branch -m main
echo Done!
echo.

echo Step 6: Force pushing to GitHub...
echo You may need to authenticate...
git push -f origin main
echo.

echo ============================================
echo Done! Repository history has been reset.
echo ============================================
pause
