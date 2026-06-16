#! /bin/bash

cd "$(dirname "$0")"

output_file="../proj.js"
time=$(date "+%Y/%m/%d %H:%M:%S")

rm -f "$output_file"
echo "// $time" >> "$output_file"
cat _proj.txt | while read line
do
    if [ -n "$line" ]  && [[ ! "$line" =~ ^# ]]; then
      cat $line >> "$output_file"
      echo -e "\n" >> "$output_file"
    fi
done


echo "$time";