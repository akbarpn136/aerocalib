# Db untuk pengembangan lokal dengan Surreldb melalui docker
docker run --name aerocalib -d --pull always -p 8000:8000 --user $(id -u) -v ~/Database:/aerocalib surrealdb/surrealdb:v1.5.5-dev start --user root --pass root file:/aerocalib/aerocalib.db
