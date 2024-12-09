# 会议室预订系统 - 管理端

- 因为电脑原因，待更换电脑重新试下这个部署的流程，待完成？？？


```bash
#  build 下镜像
docker build -t fe-container:first .

# 本地是 m1 芯片的 mac ，build 出来的镜像在 linux 上跑不了
docker build -t fe-container:first --platform linux/amd64 .
```
