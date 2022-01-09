rm -rf ../static/$1
cd $1
npx slidev build --base /$1 --out ../../static/$1