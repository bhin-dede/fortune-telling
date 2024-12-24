echo "빌드를 시작합니다."

if next build; then
  if [ -d "dist" ]; then
    echo "Deleting existing dist directory..."
    rm -rf dist
  fi

  echo "Create dist directory..."
  mkdir dist

  echo "Copying Build files..."
  cp -r .next dist/
  node scripts/copy.js

  echo "Build Complete!!"
  tar cJf fortune.txz ./dist
  mv fortune.txz /tmp/
else
  echo 빌드 실패!
  exit 1
fi