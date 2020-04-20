# BUFFET MALTA - API DOC

First api developed to maltachurrascos

## MONGODB - DATABASE

---

### CONFIGURATION CREDENTIALS

- `https://medium.com/mongoaudit/how-to-enable-authentication-on-mongodb-b9e8a924efac`
- PROD: `db.createUser({user: "diomalta",pwd: "d988004199",roles:[{role:"userAdminAnyDatabase", db:"admin"}]})`

- TEST: `db.createUser({user: "dioteste", pwd: "testedio", roles: [{ role: "readWrite", db: "test"}]})`

### PRODUCTION CREDENTIALS

- User: diomalta
- Pass: d988004199
- Database: buffetmalta

### TEST CREDENTIALS

- User: dioteste
- Pass: testedio
- Database: test

### ACCESS VIA CONSOLE

`mongo -u diomalta -p d988004199 --authencticationDatabase buffetmalta`
