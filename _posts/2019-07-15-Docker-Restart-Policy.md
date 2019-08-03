---
layout: post
title:  "Docker Restart Policies"
subtitle: "Docker ရဲ့ restart policies ေတြကိုေလ့လာျကည့္ျခင္း"
tags: [devops, sysadmin, docker, container]
---
က်ေနာ္ ဒီမွာ အဓိကေျပာခ်င္တာကေတာ့ docker's restart policy ေတြအေျကာင္းပါ။ Production  မွာဆိုရင္ docker containers ေတြ down ေနျပီဆိုတဲ့ notifications ေတြရလာရရင္ sysadmins ေတြအေနနဲ့ container ေတြျပန္ျပန္ up ေနတာနဲ့ ညဘက္ေတြအိပ္တာေနာက္က်ရတာမ်ိုးေတြရွိတတ္ပါတယ္။ ဒီေန့ article ကေတာ့ အေပါ္ကလို problem ေတြမျဖစ္ေအာင္လို့ docker restart policy ကိုသံုးျပီးေတာ့ ဘယ္လိုေရွာင္ရွားရမလဲဆိုတာကိုက်ေနာ္ တတ္သေလာက္မွတ္သေလာက္ေလးေျပာျပေပးမွာပါ။

![Docker](/img/docker.png){: .center-block :}

Container ထဲမွာ application တစ္ခု crash ျဖစ္သြားတဲ့အခာ ဘာေတြျဖစ္လာမလဲ?
က်ေနာ္တို့ docker's restart policy ေတြအေျကာင္းမေျပာခင္ container ထဲမွာ run ေနတဲ့ application တစ္ခု crash ျဖစ္သြားရင္ docker ကဘယ္လိုအလုပ္လုပ္သလဲဆိုတာကိုအရင္ေလ့လာျကည့္ပါမယ္။ အဲ့လိုလုပ္ဖို့အတြက္ က်ေနာ္က `crash.sh` ဆိုတဲ့ bash script တစ္ခုကို run တဲ့ image တစ္ခုကိုအရင္ build မယ္။ ျပီးေတာ့အဲ့ container ကို run ျကည့္မယ္။
```bash
$ vim crash.sh
#/bin/bash
sleep 30
exit 1
```
အေပါ္မွာေရးထားတဲ့ script ရဲ့ meaning ကေတာ့ ပထမဆံုး 30s  sleep ျဖစ္မယ္။ ျပီးရင္  exit status 1 နဲ့ script က crash ျဖစ္သြားမယ္။အဲ့ဒါဆိုရင္ က်ေနာ္တို့  `crash.sh` ဆိုတဲ့ script ကို run ဖို့အတြက္ docker image တစ္ခု create လုပ္ပါမယ္။
```bash
$ vim Dockerfile
```
Dockerfile ထဲမွာပါတာေတြကေတာ့
```docker
FROM ubuntu:16.04
ADD crash.sh /
CMD /bin/bash /crash.sh
```
 ဒီ Dockerfile က ubuntu:16.04 ဆိုတဲ့ image ကိုသံုးျပီးေတာ့ `crash.sh` ကို execute လုပ္မယ္ဆိုတာကိုေရးထားတာပါ။ ဒါေတြျပီးျပီဆိုရင္ေတာ့ က်ေနာ္တုိ့ docker image စျပီးေတာ့ build ပါမယ္။
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
က်ေနာ္ run လိုက္တဲ့ build command က `docker_restarts` ဆိုတဲ့ tag name နဲ့ image တစ္ခုကို build လုပ္တာကိုလုပ္ေဆာင္ပါလိ္မ့္မယ္။တစ္ခ်ို့စက္ေတြမွာေတာ့ docker run ဖို့ sudo လိုပါလိမ့္မယ္။က်ေနာ္တို့ image လည္းရျပီဆိုေတာ့ အဲ့ image ကို run ျကည့္ပါမယ္။
```bash
$ docker run -d --name testing_restarts docker_restarts
1815d3f80e66e8eeda668a2aa041b67b44517d3ad90c8306569290130fbdfdd7
```
container ကို run ျပီးသြားျပီဆိုေတာ့ က်ေနာ္တို့ သူ့ရဲ့ status ကို `docker ps` ဆိုတဲ့ command ေလး run ျပီးတစ္ခ်က္ေလာက္ျကည့္ျကည့္ပါမယ္။
```
$ docker ps
CONTAINER     ID     IMAGE     COMMAND     CREATED     STATUS     PORTS     NAMES
```
container ကို run ျပီးျပီးခ်င္း `docker ps` ရိုက္ျကည့္ရင္ေတာ့ container က running ျဖစ္ေနတာကိုေတြ့ရပါလိမ့္မယ္။ container run ျပီး 30 second ျကာတဲ့အခ်ိန္မွာေတာ့ docker ps ဆိုရင္ အေပာ္မွာျပထားသလိုဘာမွျမင္ရမွာမဟုတ္ေတာ့ပါဘူး။ အဲ့ေတာ့ container အကုန္လံုးရဲ့ state ကိုျကည့္ဖို့ `docker ps -a` ဆိုတဲ့ command ကိုသံုးရပါမယ္။
```
$ docker ps -a
CONTAINER ID        IMAGE               COMMAND                CREATED             STATUS                     PORTS               NAMES
24bb26a39f96        docker_restarts     "/bin/bash crash.sh"   2 minutes ago       Exited (1) 2 minutes ago                       docker_restarts
```
container exit ျဖစ္သြားျပီး stop ျဖစ္ေနတာကိုေတြ့ရပါလိမ့္မယ္။ ဆိုလိုခ်င္တာကေတာ့ container ထဲမွာ run ေနတဲ့ application တစ္ခုခုက crash ျဖစ္သြားခဲ့ရင္ container ကိုတစ္ေယာက္ေယာက္က restart လာလုပ္မွသာ container ကျပန္ျပီးေတာ့ up ျဖစ္သြားမွာပါ။ ဒီေနရာမွာ restart policy ေတြ၀င္လာတာပါပဲ။

## Docker's restart policy
က်ေနာ္တို့ container ကို run လုပ္ကတည္းက အေျကာင္းတစ္စံုတစ္ခုေျကာင့္ stop ျဖစ္သြားရရင္ restart ျပန္လုပ္ေအာင္ restart policy ေတြခ်မွတ္ေပးခဲ့လို့ပါတယ္။ ပိုျပီးေတာ့ျမင္သာေအာင္လို့ ခုနကက်ေနာ္ run ခဲ့တဲ့ container ကိုပဲ always ဆိုတဲ့ policy ေလးနဲ့ run ျကည့္ပါမယ္။
```
$ docker run -d --name docker_restarts --restart always docker_restarts
d540b65ca617c05d2f09cc545cb855817b4607b253c06c47c495561a1197eaea
```
အေပါ္က command မွာေတာ့ --restart ဆိုတဲ့ falg နဲ့ restart policy always ကိုထည့္ျပီး run ထားတာကိုျမင္မွာပါ။ အဲ့ေတာ့ ဒီ always က ဘယ္လိုအလုပ္လုပ္လဲဆိုတာသိရေအာင္ docker ps command နဲ့ျကည့္ျကည့္ပါမယ္။
```
 $ docker ps
CONTAINER ID        IMAGE               COMMAND                CREATED             STATUS              PORTS               NAMES
d540b65ca617        docker_restarts     "/bin/bash crash.sh"   2 minutes ago       Up 21 seconds                           docker_restarts
```
container က up ျဖစ္ေနတာ 21 seconds ရွိတာကိုျမင္ပါလိမ့္မယ္။ ေနာက္တစ္ခါ `docker ps ` ထပ္ရိုက္ျကည့္တဲ့အခါမွာေတာ့ ထူးျခားတာကိုေတြ့ပါလိ့္မ္။
```
$ docker ps
CONTAINER ID        IMAGE               COMMAND                CREATED             STATUS              PORTS               NAMES
d540b65ca617        docker_restarts     "/bin/bash crash.sh"   22 minutes ago      Up 2 seconds                            docker_restarts
```
running ျဖစ္ေနတာကိုပဲေတြ့ရပါလိမ့္မယ္။ ဒါေပမဲ့ up ျဖစ္တဲ့အခ်ိန္က 2 seconds ပဲရွိေသးတာကိုသတိထားျကည့္ျကည့္ပါ။ ဘာလို့ 2 seconds ပဲျဖစ္ေနတာလဲဆိုေတာ့ ပထမတစ္ျကိမ္ container ကို run တဲ့အခာမွာ container က 30 seconds up and running ျဖစ္ျပီးေတာ့ crash ျဖစ္ျပီး stop သြားတယ္။ အဲ့အခါမွာ restart ကို always လို့ေျပာခဲ့တဲ့အတြက္ container က ဘာအေျကာင္းေျကာင္းေျကာင့္ stop ျဖစ္ျဖစ္ ျပန္ restart ေပးလို့ပါ။စမ္းရင္းနဲ့နားလည္မယ္လို့ေတာ့ထင္မိပါတယ္။ restart policy (၄) မ်ိုးရွိပါတယ္။

* no
* on-failure
* unless-stopped
* always

`no` ဆိုတာကေတာ့ docker ရဲ့ default policy ပါ။ container ကဘယ္အေျခအေနျဖစ္ေနျဖစ္ေန restart မလုပ္တဲ့ policy ပါ။

### on-failure
on-failure policy ကေတာ့စိတ္၀င္စားစရာအေကာင္းဆံုးပါ။ ဒီေကာင္က exit code ကုိျကည့္ျပီးေတာ့ exit code က failure ျဖစ္တယ္ဆိုရင္ container ကို restart လုပ္ေပးျပီး exit code က success ျဖစ္ေနတယ္ဆိုရင္ေတာ့ restart လုပ္မွာမဟုတ္ပါဘူး။ exit code ဆိုတာကေတာ့ container တစ္ခု exit ျဖစ္သြားရင္ ဘယ္ status နဲ့ exit ျဖစ္သြားတယ္ဆိုတာကို ျပတဲ့ code ေလးေတြပါ။အေသးစိတ္သိခ်င္ရင္ေတာ့ [docker exit codes](https://stackoverflow.com/questions/31297616/what-is-the-authoritative-list-of-docker-run-exit-codes) ဆိုျပီး stackoverflow မွာ ေသခ်ာရွင္းျပထားတာကိုဖတ္ျကည့္ျကည့္ပါ။ အဲ့ဒါဆို က်ေနာ္အစက build ခဲ့တဲ့ image ကိုပဲ on-failure policy သံုးျပီးေတာ့ run ျကည့္ပါမယ္။
```bash
$ docker run -d --name docker_restarts --restart on-failure:5 docker_restarts
fc8ddc4572ba60133474d49511fd3a7ea476fcc0ea12a377d3c912af8d4593f4
```
`docker ps` ရိုက္ျကည့္တဲ့အခါမွာ container က running ျဖစ္ေနတာကိုျမင္ရပါလိမ့္မယ္။ဒါေပမဲ့ 3 minutes ျကာျပီးမွ docker ps ရိုက္ျကည့္ရင္ေတာ့ container က stop ျဖစ္ေနတာကိုေတြ့ရပါလိမ့္မယ္။က်ေနာ္က ၅ ခါပဲ restart လုပ္ခိုင္းခဲ့လိုပါ။ (5 * 30 seconds = 150 seconds(2 min 30 s) )

တကယ္လို့ container က လုပ္စရာရွိတာလုပ္ျပီးေတာ့(success ျဖစ္ျပီးေတာ့ ) stop  သြားရင္ေတာ့  on-failure policy က restart လုပ္ေပးမွာမဟုတ္ပါဘူး။ တကယ္ဟုတ္မဟုတ္စမ္းျကည့္ရေအာင္။
success အတြက္ image ကိုနည္းနည္းျပင္ျပီးေတာ့ build ပါမယ္။ `crash.sh` မွာ exit code ကို 1 ေန 0 ကိုျပင္ရပါမယ္။
```bash
#/bin/bash
sleep 30
exit 0
```
ျပင္ျပီးရင္ image ျပန္ buid ပါမယ္။
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
build ျပီးသြားရင္ အဲ့ image ကိုသံုးျပီးေတာ့ container တစ္လံုး run မယ္။ restart policy ကို on-failure ထားေပးလိုက္ျပီးဘာျဖစ္မလဲတစ္ခ်က္ေစာင့္ျကည့္ျကည့္ပါမယ္။
```
$ docker run -d --name docker_restarts --restart on-failure docker_restarts
3260af6192d0080894e83fe467efc8681f6c352de82268886e2e32260e3066ae
```
ျပီးတဲ့အခါမွာ container ရဲ့ status ကို `docker ps -a` ကိုသံုးျပီးေတာ့တစ္ခ်က္ျကည့္ျကည့္ပါ။
```
$ docker ps -a
CONTAINER ID        IMAGE               COMMAND                CREATED             STATUS                      PORTS               NAMES
3260af6192d0        docker_restarts     "/bin/bash crash.sh"   47 seconds ago      Exited (0) 15 seconds ago                       docker_restarts
```
container ကိုျပန္ restart မလုပ္ေတာ့ပဲ container က exited ျဖစ္ျပီး down ေနတာကိုေတြ့ရပါလိမ့္မယ္။ဘာလို့အဲ့လိုျဖစ္လဲဆိုေတာ့ script မွာ exit status code ကို 1 ကေန 0 ကိုျပင္ခဲ့ျပီး run ခိုင္းလိုက္လို့ပါ။(1 mean some error and 0 mean successful) failure မျဖစ္ေတာ့တဲ့အတြက္ on-failure policy က restart မလုပ္ေပးေတာ့တာပါ။
### Always
always ဆိုတဲ့ policy ကေတာ့ always ဆိုတဲ့အတိုင္း container ဘာေျကာင့္ down down ျပန္ျပီးေတာ့ restart ကိုလုပ္ေပးမွာပါ။အဲ့ဒါကို စမ္းဖို့အတြက္ ခုနက success ျဖစ္မဲ့ image ကိုပဲသံုးျပီး container တစ္ခုျပန္ run ျကည့္ပါမယ္။ restart policy ကေတာ့ always ကိုသံုးပါမယ္။
```
$ sudo docker run -d --name docker_restarts --restart always docker_restarts
676f12c9cd4cac7d3dd84d8b70734119ef956b3e5100b2449197c2352f3c4a55
```
ျပီးရင္  30 second ေလာက္ေစာင့္ျပီး `docker ps -a` ကိုသံုးျပီး check ျကည့္ပါ။ container က success ျဖစ္ျပီး exit ျဖစ္သြားလည္း အျမဲတမ္း restart လုပ္ေပးေနတာကိုေတြ့ရပါလိမ့္မယ္။

#### နည္းနည္းအပ်င္းျကီးမယ္ဗ်ာ။
run ေနတဲ့ container ကို stop လုပ္ပါ။
စက္ကို `reboot` ခ်ျကည့္လိုက္ပါ။ (`sudo reboot`)
စက္ျပန္တက္လာတဲ့အခါ container status ကို `docker ps -a` နဲ့ ျပန္ check ျကည့္ပါ။
container up ေနတာကို ေတြ့ရပါလိမ့္မယ္။

ဒါကသိပ္ျပီးေတာ့ေကာင္းတဲ့အခ်က္ေတာ့မဟုတ္ပါဘူး။အကယ္၍ဗ်ာ  တစ္ခ်ို့ container ေတြကသူလုပ္စရာရွိတာလုပ္ျပီးလို့ success ျဖစ္ျပီး exit ျဖစ္ေနတာမ်ိုးေတြရွိပါတယ္။ ဒီလိုမွမဟုတ္ပဲ container ေတြကို out of date ျဖစ္ေနလို့ stop လုပ္ထားတယ္ပဲဆိုျကပါစို့။ always သာသံုးထားရင္ reboot လုပ္လိုက္တာနဲ့ အကုန္ ျပန္up လာမွာပါ။ အဲ့ေကာင္အတြက္ solution ကေတာ့ unless-stopped policy ပါ။
### unless-stopped
unless-stopped ကေတာ့ always နဲ့ဆင္တူပါတယ္။မတူတဲ့တစ္ခ်က္ကေတာ့ container တစ္ခုက stop ျဖစ္ေနတာကို reboot လုပ္ရင္ပဲျဖစ္ျဖစ္၊ docker service ကို restart လုပ္ရင္ပဲျဖစ္ျဖစ္ ျပန္မ up ေပးပါဘူး။ ဘယ္လိုအလုပ္လုပ္လဲသိရေအာင္လို့ ခုနက example လိုပဲ `--restart always` ေနရာမွာ `--restart unless-stopped` နဲ့
ေျပာင္းျပီးေတာ့စမ္းျကည့္ျကည့္ပါမယ္။
```
$ docker run -d --name docker_restarts --restart unless-stopped docker_restarts
cae6809fca9e24f55312a9477f3523ea7ccf9cf77af824b33170c672429e1de9
```
container run ေနျပီဆိုရင္ အဲ့ container ကို stop လုပ္ျပီး reboot လုပ္ျကည့္ပါ။
```
$ docker stop docker_restarts
docker_restarts
$ sudo reboot
```
စက္ျပန္တက္လာတဲ့အခါက်ရင္ `docker ps -a` နဲ့ check ျကည့္ပါ။ container start ျဖစ္မလာဘဲ stop ျဖစ္ေနတာကိုပဲေတြ့ရပါလိမ့္မယ္။ unles-stopped policy ရဲ့အေရးျကီးတဲ့အခ်က္ေနာက္တစ္ခ်က္ကေတာ့
ကို္ယ့္ရဲ့စက္ restart မက်ခင္မွာ container က running ျဖစ္ေနတယ္ဆိုရင္ စက္ကို restart လုပ္လိုက္လည္း container restart ျပန္ျဖစ္ျပီး running ျဖစ္ေနဦးမွာပါ။
အဲ့ဒါကိုစမ္းဖို့အတြက္ ခုနက stop လုပ္ထားတဲ့ container ကို start ျပန္လုပ္လိုက္ပါ။ ျပီးရင္ စက္ကို reboot  ခ်ပါ။ စက္ျပန္တက္လာရင္ container အေျခအေနကို check ျကည့္ပါ။
## Conclusion
အေပါ္မွာေျပာတာေတြကေတာ့ရွုပ္လည္းရွုပ္ေနပါလိမ့္မယ္။ ေအးေအးေဆးေဆးစမ္းျကည့္ပါ။
က်ေနာ္ေနာက္ပိုင္းမွာ code block ေတြသိပ္မထည့္တာက ကိုယ့္ဘာသာကိုယ္စမ္းေစခ်င္လို့ပါ။
မ်ားမ်ားစမ္းေလ မ်ားမ်ား error တက္ေလ ကို့္အတြက္မ်ားမ်ားက်န္ေလပါပဲ။ သိသေလာက္ေလးေတာ့ျပန္ေျပာျပေပးပါမယ္။ docker နဲ့ container ေတြအေျကာင္းထပ္ေလ့လာခ်င္ေသးတယ္ဆိုရင္ေတာ့ ။ [Why containers and docker are the future](https://resources.codeship.com/ebooks/why-containerization-is-the-future) ဆိုတဲ့ စာအုပ္ေလးကို free download လုပ္ျပီးေလ့လာျကည့္ပါ။

Thanks for reading ..
