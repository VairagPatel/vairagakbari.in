@echo off
echo ============================================
echo Resetting GitHub Repository
echo ============================================
echo.

echo Step 1: Removing Git history locally...
rd /s /q .git
echo Done!
echo.

echo Step 2: Initializing new Git repository...
git init
git branch -M main
echo Done!
echo.

echo Step 3: Configuring Git user...
git config user.name "VairagPatel"
git config user.email "vairag.techwork@gmail.com"
echo Done!
echo.

echo Step 4: Adding all files...
git add .
echo Done!
echo.

echo Step 5: Creating new commit...
git commit -m "Initial commit: Vairag Akbari Portfolio"
echo Done!
echo.

echo Step 6: Adding remote repository...
git remote add origin https://github.com/VairagPatel/vairagakbari.in.git
echo Done!
echo.

echo ============================================
echo NEXT STEPS:
echo ============================================
echo 1. Go to: https://github.com/VairagPatel/vairagakbari.in
echo 2. Delete the repository
echo 3. Create a new repository with the same name
echo 4. Then run: git push -u origin main --force
echo.
echo Press any key when you've completed steps 1-3...
pause
