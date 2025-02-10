# node 练习项目

基于 Koa 框架开发的一个旨在创建程序员分享生活动态的平台

## 相关技术

- node
- koa
- mysql

## 使用说明

```
npm install
npm install nodemon -g
npm run start
```

## 生成 token 所需的公钥&密钥

```
openssl genrsa -out private.key 1024
openssl rsa -in private.key -pubout -out public.key
```
