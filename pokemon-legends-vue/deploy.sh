#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git checkout -b gh-pages
git add -A
git commit -m 'deploy'


# if you are deploying to https://<USERNAME>.github.io/<REPO>
git remote add origin https://github.com/yuhengen/TGC9-Proj2-PokeLegends-vue.git
git push --set-upstream origin gh-pages

cd -

# Command to run above
# ./deploy.sh