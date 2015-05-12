#!/bin/bash

# groep6s-prd keeps its data
for db in groep6-dev groep6-tst groep6-acc
do
    echo "Dropping $db"
    mongo $db --eval "db.dropDatabase()"
    echo "Restoring $db"
    mongorestore -d $db seed
done
