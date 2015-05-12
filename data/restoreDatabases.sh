#!/bin/bash

# groep6s-prd keeps its data
for db in groep6s-dev groep6s-tst groep6s-acc
do
    echo "Dropping $db"
    mongo $db --eval "db.dropDatabase()"
    echo "Restoring $db"
    mongorestore -d $db seed
done
