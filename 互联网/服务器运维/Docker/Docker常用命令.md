



- 查看容器ip地址
```
docker inspect --format '{{ .NetworkSettings.IPAddress }}' nginx-test
```

- 创建一个nginx容器
```
docker run -d --name nginx -p 80:80 -p 443:443 -v /etc/nginx/:/etc/nginx -v /var/www/html:/var/www/html -v /var/log/nginx:/var/log/nginx nginx
```

- 进入容器并修改文件

```
chenqingji@ubuntu:/tmp$ sudo docker exec -it 1498f0ea59f8 /bin/bash
bash-4.4# ls
atlassian-synchrony.log    index                      logs                       plugins-temp               synchrony-standalone.jar
bundled-plugins            journal                    plugins-cache              shared-home                temp
confluence.cfg.xml         lock                       plugins-osgi-cache         synchrony-args.properties  webresource-temp
bash-4.4# vim confluence.cfg.xml 
bash: vim: command not found
bash-4.4# vi confluence.cfg.xml 
```
