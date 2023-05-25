#!/bin/bash

# Replace this URL with the endpoint where you want to upload the files
UPLOAD_URL="http://admin:admin@172.26.135.54:5984/hospital/_bulk_docs"


# Loop through all the files in the current directory
for file in $(ls geo*); do
  echo "Uploading ${file} ..."
  # Upload the file using curl
    curl -XPOST "http://admin:admin@172.26.135.54:5984/hospital/_bulk_docs"\
    --header "Content-Type: application/json" \
    --data @./${file}
  echo "Uploaded ${file}"
done
