db.createUser(
    {
        user: "admin",
        pwd: "<password>",
        roles: [
            {
                role: "readWrite",
                db: "bookmarks_db"
            }
        ]
    }
);
db.getSiblingDB('admin').runCommand({setParameter: 1, net: {bindIpAll: true}});