# This is for deployment shell script
#!/bin/bash
set -x #echo on

ng build
#cd dist #optional if you are using full path 
mv /Users/alok/MyProjects/byjus-search-app/dist/byjus-search-app/index.html /Users/alok/MyProjects/byjus-search-app/dist/byjus-search-app/200.html
surge /Users/alok/MyProjects/byjus-search-app/dist/byjus-search-app/ just-search.surge.sh
open http://just-search.surge.sh