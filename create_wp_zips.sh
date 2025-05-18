#!/bin/bash

#remove existing zip files
rm -vf *.zip

# Loop through all subdirectories
for dir in */; do
    if [ -d "$dir" ]; then
        # Remove trailing slash from directory name
        dirname=${dir%/}

        # Create zip file with the same name as the directory
        zip -r "${dirname}.zip" "$dirname"

        echo "Created ${dirname}.zip"
    fi
done

echo "All directories have been zipped successfully!"