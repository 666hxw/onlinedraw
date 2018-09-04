# 项目设计文档

## Redis 数据结构设计

### 登录态Redis设计

```shell
  setex ${userName} ${expire} ${token} // userToken DB: 用户ID关联token
  setex ${token} ${expire} ${userName} // token DB: 用户token关联用户ID
  hset ${userId} name ${userName} ... // userInfo DB: 用户ID关联用户信息
```

这里冗余设计了一下:

- ````userToken DB```这个库是用来存储用户名跟```token```的关联
- ```token DB```这个库是用来存储```token```跟用户名的关联

这样子设计是因为不想单纯只靠一个```token DB```库来保存登录态，用户重复登录的话，这个库会在一段时间增量存在无效数据，占用内存；
所以在设计了一个```userToken DB```库，用户重新登录，会根据用户名从这个表查找是否有存在```token```，有的话，清除这个数据和
```token DB```的数据
