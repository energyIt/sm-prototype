# Introduciton

This project should serve as an example of a spring-data-rest application with two uis : angularjs 1.x and react.js .

# Tutorial

## how to start
* ```cd ${root-folder}```
* ```mvn clean install```
* ```cd sm-prototype-ui-angular```
* ```mvn spring-boot:run```
* ```go to http://localhost:8080/sm```

## Security
* basic auth

### Users
* SMUSER01:test01 - normal user (only GET)
* SMADMIN01:test01 - admin (can update)

## Examples

### create UserGroup
```
curl -i -X POST -H "Content-Type:application/json" -d '{  "id" : "A123456789123--1",  "id3" : "id-1", "name" : "Group1" }' http://localhost:8080/sm/api/userGroup -u SMADMIN01:test01
```

### update UserGroup
```
curl -i -X PATCH -H "Content-Type:application/json" -d '{ "name" : "Group1-udpate" }' http://localhost:8080/sm/api/userGroup/A123456789123--1 -u SMADMIN01:test01
```

### list UserGroups
```
curl -i -X GET http://localhost:8080/sm/api/userGroup -u SMUSER01:test01
```

### get one UserGroup
```
curl -i -X GET http://localhost:8080/sm/api/userGroup/A123456789123--1 -u SMUSER01:test01
```
