---
layout: post
title:  "Docker Restart Policies"
subtitle: "Docker ရဲ့ restart policies တွေကိုလေ့လာကြည့်ခြင်း"
tags: [DevOps, sysadmin, docker, container]
---
ကျနော် ဒီမှာ အဓိကပြောချင်တာကတော့ docker's restart policy တွေအကြောင်းပါ။ Production  မှာဆိုရင် docker containers တွေ down နေပြီဆိုတဲ့ notifications တွေရလာရရင် sysadmins တွေအနေနဲ့ container တွေပြန်ပြန် up နေတာနဲ့ ညဘက်တွေအိပ်တာနောက်ကျရတာမျိုးတွေရှိတတ်ပါတယ်။ ဒီနေ့ article ကတော့ အပေါ်ကလို problem တွေမဖြစ်အောင်လို့ docker restart policy ကိုသုံးပြီးတော့ ဘယ်လိုရှောင်ရှားရမလဲဆိုတာကိုကျနော် တတ်သလောက်မှတ်သလောက်လေးပြောပြပေးမှာပါ။

![Docker](/img/docker.png){: .center-block :}

Container ထဲမှာ application တစ်ခု crash ဖြစ်သွားတဲ့အခာ ဘာတွေဖြစ်လာမလဲ?
ကျနော်တို့ docker's restart policy တွေအကြောင်းမပြောခင် container ထဲမှာ run နေတဲ့ application တစ်ခု crash ဖြစ်သွားရင် docker ကဘယ်လိုအလုပ်လုပ်သလဲဆိုတာကိုအရင်လေ့လာကြည့်ပါမယ်။ အဲ့လိုလုပ်ဖို့အတွက် ကျနော်က `crash.sh` ဆိုတဲ့ bash script တစ်ခုကို run တဲ့ image တစ်ခုကိုအရင် build မယ်။ ပြီးတော့အဲ့ container ကို run ကြည့်မယ်။
```bash
$ vim crash.sh
#/bin/bash
sleep 30
exit 1
```
အပေါ်မှာရေးထားတဲ့ script ရဲ့ meaning ကတော့ ပထမဆုံး 30s  sleep ဖြစ်မယ်။ ပြီးရင်  exit status 1 နဲ့ script က crash ဖြစ်သွားမယ်။အဲ့ဒါဆိုရင် ကျနော်တို့  `crash.sh` ဆိုတဲ့ script ကို run ဖို့အတွက် docker image တစ်ခု create လုပ်ပါမယ်။
```bash
$ vim Dockerfile
```
Dockerfile ထဲမှာပါတာတွေကတော့
```docker
FROM ubuntu:16.04
ADD crash.sh /
CMD /bin/bash /crash.sh
```
 ဒီ Dockerfile က ubuntu:16.04 ဆိုတဲ့ image ကိုသုံးပြီးတော့ `crash.sh` ကို execute လုပ်မယ်ဆိုတာကိုရေးထားတာပါ။ ဒါတွေပြီးပြီဆိုရင်တော့ ကျနော်တို့ docker image စပြီးတော့ build ပါမယ်။
```bash
$ docker build -t docker_restarts ./
Sending build context to Docker daemon 3.072kB
Step 1/3 : FROM ubuntu:16.04
---> 7e87e2b3bf7a
Step 2/3 : ADD crash.sh /
---> 6479c813cac1
Step 3/3 : CMD ["/bin/bash", "crash.sh"]
---> Running in 3621ca03a316
Removing intermediate container 3621ca03a316
---> c8bf5b11d8bf
Successfully built c8bf5b11d8bf
Successfully tagged docker_restarts:latest
```
ကျနော် run လိုက်တဲ့ build command က `docker_restarts` ဆိုတဲ့ tag name နဲ့ image တစ်ခုကို build လုပ်တာကိုလုပ်ဆောင်ပါလိမ့်မယ်။တစ်ချို့စက်တွေမှာတော့ docker run ဖို့ sudo လိုပါလိမ့်မယ်။ကျနော်တို့ image လည်းရပြီဆိုတော့ အဲ့ image ကို run ကြည့်ပါမယ်။
```bash
$ docker run -d --name testing_restarts docker_restarts
1815d3f80e66e8eeda668a2aa041b67b44517d3ad90c8306569290130fbdfdd7
```
container ကို run ပြီးသွားပြီဆိုတော့ ကျနော်တို့ သူ့ရဲ့ status ကို `docker ps` ဆိုတဲ့ command လေး run ပြီးတစ်ချက်လောက်ကြည့်ကြည့်ပါမယ်။
```
$ docker ps
CONTAINER     ID     IMAGE     COMMAND     CREATED     STATUS     PORTS     NAMES
```
container ကို run ပြီးပြီးချင်း `docker ps` ရိုက်ကြည့်ရင်တော့ container က running ဖြစ်နေတာကိုတွေ့ရပါလိမ့်မယ်။ container run ပြီး 30 second ကြာတဲ့အချိန်မှာတော့ docker ps ဆိုရင် အပော်မှာပြထားသလိုဘာမှမြင်ရမှာမဟုတ်တော့ပါဘူး။ အဲ့တော့ container အကုန်လုံးရဲ့ state ကိုကြည့်ဖို့ `docker ps -a` ဆိုတဲ့ command ကိုသုံးရပါမယ်။
```
$ docker ps -a
CONTAINER ID        IMAGE               COMMAND                CREATED             STATUS                     PORTS               NAMES
24bb26a39f96        docker_restarts     "/bin/bash crash.sh"   2 minutes ago       Exited (1) 2 minutes ago                       docker_restarts
```
container exit ဖြစ်သွားပြီး stop ဖြစ်နေတာကိုတွေ့ရပါလိမ့်မယ်။ ဆိုလိုချင်တာကတော့ container ထဲမှာ run နေတဲ့ application တစ်ခုခုက crash ဖြစ်သွားခဲ့ရင် container ကိုတစ်ယောက်ယောက်က restart လာလုပ်မှသာ container ကပြန်ပြီးတော့ up ဖြစ်သွားမှာပါ။ ဒီနေရာမှာ restart policy တွေဝင်လာတာပါပဲ။

## Docker's restart policy
ကျနော်တို့ container ကို run လုပ်ကတည်းက အကြောင်းတစ်စုံတစ်ခုကြောင့် stop ဖြစ်သွားရရင် restart ပြန်လုပ်အောင် restart policy တွေချမှတ်ပေးခဲ့လို့ပါတယ်။ ပိုပြီးတော့မြင်သာအောင်လို့ ခုနကကျနော် run ခဲ့တဲ့ container ကိုပဲ always ဆိုတဲ့ policy လေးနဲ့ run ကြည့်ပါမယ်။
```
$ docker run -d --name docker_restarts --restart always docker_restarts
d540b65ca617c05d2f09cc545cb855817b4607b253c06c47c495561a1197eaea
```
အပေါ်က command မှာတော့ --restart ဆိုတဲ့ falg နဲ့ restart policy always ကိုထည့်ပြီး run ထားတာကိုမြင်မှာပါ။ အဲ့တော့ ဒီ always က ဘယ်လိုအလုပ်လုပ်လဲဆိုတာသိရအောင် docker ps command နဲ့ကြည့်ကြည့်ပါမယ်။
```
 $ docker ps
CONTAINER ID        IMAGE               COMMAND                CREATED             STATUS              PORTS               NAMES
d540b65ca617        docker_restarts     "/bin/bash crash.sh"   2 minutes ago       Up 21 seconds                           docker_restarts
```
container က up ဖြစ်နေတာ 21 seconds ရှိတာကိုမြင်ပါလိမ့်မယ်။ နောက်တစ်ခါ `docker ps ` ထပ်ရိုက်ကြည့်တဲ့အခါမှာတော့ ထူးခြားတာကိုတွေ့ပါလိ့်မ်။
```
$ docker ps
CONTAINER ID        IMAGE               COMMAND                CREATED             STATUS              PORTS               NAMES
d540b65ca617        docker_restarts     "/bin/bash crash.sh"   22 minutes ago      Up 2 seconds                            docker_restarts
```
running ဖြစ်နေတာကိုပဲတွေ့ရပါလိမ့်မယ်။ ဒါပေမဲ့ up ဖြစ်တဲ့အချိန်က 2 seconds ပဲရှိသေးတာကိုသတိထားကြည့်ကြည့်ပါ။ ဘာလို့ 2 seconds ပဲဖြစ်နေတာလဲဆိုတော့ ပထမတစ်ကြိမ် container ကို run တဲ့အခာမှာ container က 30 seconds up and running ဖြစ်ပြီးတော့ crash ဖြစ်ပြီး stop သွားတယ်။ အဲ့အခါမှာ restart ကို always လို့ပြောခဲ့တဲ့အတွက် container က ဘာအကြောင်းကြောင်းကြောင့် stop ဖြစ်ဖြစ် ပြန် restart ပေးလို့ပါ။စမ်းရင်းနဲ့နားလည်မယ်လို့တော့ထင်မိပါတယ်။ restart policy (၄) မျိုးရှိပါတယ်။

* no
* on-failure
* unless-stopped
* always

`no` ဆိုတာကတော့ docker ရဲ့ default policy ပါ။ container ကဘယ်အခြေအနေဖြစ်နေဖြစ်နေ restart မလုပ်တဲ့ policy ပါ။

### on-failure
on-failure policy ကတော့စိတ်ဝင်စားစရာအကောင်းဆုံးပါ။ ဒီကောင်က exit code ကိုကြည့်ပြီးတော့ exit code က failure ဖြစ်တယ်ဆိုရင် container ကို restart လုပ်ပေးပြီး exit code က success ဖြစ်နေတယ်ဆိုရင်တော့ restart လုပ်မှာမဟုတ်ပါဘူး။ exit code ဆိုတာကတော့ container တစ်ခု exit ဖြစ်သွားရင် ဘယ် status နဲ့ exit ဖြစ်သွားတယ်ဆိုတာကို ပြတဲ့ code လေးတွေပါ။အသေးစိတ်သိချင်ရင်တော့ [docker exit codes](https://stackoverflow.com/questions/31297616/what-is-the-authoritative-list-of-docker-run-exit-codes) ဆိုပြီး stackoverflow မှာ သေချာရှင်းပြထားတာကိုဖတ်ကြည့်ကြည့်ပါ။ အဲ့ဒါဆို ကျနော်အစက build ခဲ့တဲ့ image ကိုပဲ on-failure policy သုံးပြီးတော့ run ကြည့်ပါမယ်။
```bash
$ docker run -d --name docker_restarts --restart on-failure:5 docker_restarts
fc8ddc4572ba60133474d49511fd3a7ea476fcc0ea12a377d3c912af8d4593f4
```
`docker ps` ရိုက်ကြည့်တဲ့အခါမှာ container က running ဖြစ်နေတာကိုမြင်ရပါလိမ့်မယ်။ဒါပေမဲ့ 3 minutes ကြာပြီးမှ docker ps ရိုက်ကြည့်ရင်တော့ container က stop ဖြစ်နေတာကိုတွေ့ရပါလိမ့်မယ်။ကျနော်က ၅ ခါပဲ restart လုပ်ခိုင်းခဲ့လိုပါ။ (5 * 30 seconds = 150 seconds(2 min 30 s) )

တကယ်လို့ container က လုပ်စရာရှိတာလုပ်ပြီးတော့(success ဖြစ်ပြီးတော့ ) stop  သွားရင်တော့  on-failure policy က restart လုပ်ပေးမှာမဟုတ်ပါဘူး။ တကယ်ဟုတ်မဟုတ်စမ်းကြည့်ရအောင်။
success အတွက် image ကိုနည်းနည်းပြင်ပြီးတော့ build ပါမယ်။ `crash.sh` မှာ exit code ကို 1 နေ 0 ကိုပြင်ရပါမယ်။
```bash
#/bin/bash
sleep 30
exit 0
```
ပြင်ပြီးရင် image ပြန် buid ပါမယ်။
```bash
$ docker build -t docker_restarts ./
Sending build context to Docker daemon 3.072kB
Step 1/3 : FROM ubuntu:16.04
---> 7e87e2b3bf7a
Step 2/3 : ADD crash.sh /
---> de5547bb681e
Step 3/3 : CMD ["/bin/bash", "crash.sh"]
---> Running in f8117700767c
Removing intermediate container f8117700767c
---> 98402cd4a0b8
Successfully built 98402cd4a0b8
Successfully tagged docker_restarts:latest
```
build ပြီးသွားရင် အဲ့ image ကိုသုံးပြီးတော့ container တစ်လုံး run မယ်။ restart policy ကို on-failure ထားပေးလိုက်ပြီးဘာဖြစ်မလဲတစ်ချက်စောင့်ကြည့်ကြည့်ပါမယ်။
```
$ docker run -d --name docker_restarts --restart on-failure docker_restarts
3260af6192d0080894e83fe467efc8681f6c352de82268886e2e32260e3066ae
```
ပြီးတဲ့အခါမှာ container ရဲ့ status ကို `docker ps -a` ကိုသုံးပြီးတော့တစ်ချက်ကြည့်ကြည့်ပါ။
```
$ docker ps -a
CONTAINER ID        IMAGE               COMMAND                CREATED             STATUS                      PORTS               NAMES
3260af6192d0        docker_restarts     "/bin/bash crash.sh"   47 seconds ago      Exited (0) 15 seconds ago                       docker_restarts
```
container ကိုပြန် restart မလုပ်တော့ပဲ container က exited ဖြစ်ပြီး down နေတာကိုတွေ့ရပါလိမ့်မယ်။ဘာလို့အဲ့လိုဖြစ်လဲဆိုတော့ script မှာ exit status code ကို 1 ကနေ 0 ကိုပြင်ခဲ့ပြီး run ခိုင်းလိုက်လို့ပါ။(1 mean some error and 0 mean successful) failure မဖြစ်တော့တဲ့အတွက် on-failure policy က restart မလုပ်ပေးတော့တာပါ။
### Always
always ဆိုတဲ့ policy ကတော့ always ဆိုတဲ့အတိုင်း container ဘာကြောင့် down down ပြန်ပြီးတော့ restart ကိုလုပ်ပေးမှာပါ။အဲ့ဒါကို စမ်းဖို့အတွက် ခုနက success ဖြစ်မဲ့ image ကိုပဲသုံးပြီး container တစ်ခုပြန် run ကြည့်ပါမယ်။ restart policy ကတော့ always ကိုသုံးပါမယ်။
```
$ sudo docker run -d --name docker_restarts --restart always docker_restarts
676f12c9cd4cac7d3dd84d8b70734119ef956b3e5100b2449197c2352f3c4a55
```
ပြီးရင်  30 second လောက်စောင့်ပြီး `docker ps -a` ကိုသုံးပြီး check ကြည့်ပါ။ container က success ဖြစ်ပြီး exit ဖြစ်သွားလည်း အမြဲတမ်း restart လုပ်ပေးနေတာကိုတွေ့ရပါလိမ့်မယ်။

#### နည်းနည်းအပျင်းကြီးမယ်ဗျာ။
run နေတဲ့ container ကို stop လုပ်ပါ။
စက်ကို `reboot` ချကြည့်လိုက်ပါ။ (`sudo reboot`)
စက်ပြန်တက်လာတဲ့အခါ container status ကို `docker ps -a` နဲ့ ပြန် check ကြည့်ပါ။
container up နေတာကို တွေ့ရပါလိမ့်မယ်။

ဒါကသိပ်ပြီးတော့ကောင်းတဲ့အချက်တော့မဟုတ်ပါဘူး။အကယ်၍ဗျာ  တစ်ချို့ container တွေကသူလုပ်စရာရှိတာလုပ်ပြီးလို့ success ဖြစ်ပြီး exit ဖြစ်နေတာမျိုးတွေရှိပါတယ်။ ဒီလိုမှမဟုတ်ပဲ container တွေကို out of date ဖြစ်နေလို့ stop လုပ်ထားတယ်ပဲဆိုကြပါစို့။ always သာသုံးထားရင် reboot လုပ်လိုက်တာနဲ့ အကုန် ပြန်up လာမှာပါ။ အဲ့ကောင်အတွက် solution ကတော့ unless-stopped policy ပါ။
### unless-stopped
unless-stopped ကတော့ always နဲ့ဆင်တူပါတယ်။မတူတဲ့တစ်ချက်ကတော့ container တစ်ခုက stop ဖြစ်နေတာကို reboot လုပ်ရင်ပဲဖြစ်ဖြစ်၊ docker service ကို restart လုပ်ရင်ပဲဖြစ်ဖြစ် ပြန်မ up ပေးပါဘူး။ ဘယ်လိုအလုပ်လုပ်လဲသိရအောင်လို့ ခုနက example လိုပဲ `--restart always` နေရာမှာ `--restart unless-stopped` နဲ့
ပြောင်းပြီးတော့စမ်းကြည့်ကြည့်ပါမယ်။
```
$ docker run -d --name docker_restarts --restart unless-stopped docker_restarts
cae6809fca9e24f55312a9477f3523ea7ccf9cf77af824b33170c672429e1de9
```
container run နေပြီဆိုရင် အဲ့ container ကို stop လုပ်ပြီး reboot လုပ်ကြည့်ပါ။
```
$ docker stop docker_restarts
docker_restarts
$ sudo reboot
```
စက်ပြန်တက်လာတဲ့အခါကျရင် `docker ps -a` နဲ့ check ကြည့်ပါ။ container start ဖြစ်မလာဘဲ stop ဖြစ်နေတာကိုပဲတွေ့ရပါလိမ့်မယ်။ unles-stopped policy ရဲ့အရေးကြီးတဲ့အချက်နောက်တစ်ချက်ကတော့
ကိုယ့်ရဲ့စက် restart မကျခင်မှာ container က running ဖြစ်နေတယ်ဆိုရင် စက်ကို restart လုပ်လိုက်လည်း container restart ပြန်ဖြစ်ပြီး running ဖြစ်နေဦးမှာပါ။
အဲ့ဒါကိုစမ်းဖို့အတွက် ခုနက stop လုပ်ထားတဲ့ container ကို start ပြန်လုပ်လိုက်ပါ။ ပြီးရင် စက်ကို reboot  ချပါ။ စက်ပြန်တက်လာရင် container အခြေအနေကို check ကြည့်ပါ။
## Conclusion
အပေါ်မှာပြောတာတွေကတော့ရှုပ်လည်းရှုပ်နေပါလိမ့်မယ်။ အေးအေးဆေးဆေးစမ်းကြည့်ပါ။
ကျနော်နောက်ပိုင်းမှာ code block တွေသိပ်မထည့်တာက ကိုယ့်ဘာသာကိုယ်စမ်းစေချင်လို့ပါ။
များများစမ်းလေ များများ error တက်လေ ကို့်အတွက်များများကျန်လေပါပဲ။ သိသလောက်လေးတော့ပြန်ပြောပြပေးပါမယ်။ docker နဲ့ container တွေအကြောင်းထပ်လေ့လာချင်သေးတယ်ဆိုရင်တော့ ။ [Why containers and docker are the future](https://resources.codeship.com/ebooks/why-containerization-is-the-future) ဆိုတဲ့ စာအုပ်လေးကို free download လုပ်ပြီးလေ့လာကြည့်ပါ။

Thanks for reading ..
