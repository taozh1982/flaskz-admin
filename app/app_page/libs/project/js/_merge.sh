
#! /bin/bash
rm -f ../proj.js
cat _proj.txt | while read line
do
    cat $line >> ../proj.js
    echo "\n" >> ../proj.js
done