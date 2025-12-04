
@ECHO OFF
START "MongoDb" "C:\Program Files\MongoDB\Server\8.2\bin\mongod.exe" --dbpath="c:\data\db"
TIMEOUT /T 2
tsc && node dist/

EXIT