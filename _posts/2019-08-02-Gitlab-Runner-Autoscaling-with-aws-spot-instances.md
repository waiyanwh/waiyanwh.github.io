---
layout: post
title:  "Gitlab Runner Autoscaling With AWS Spot Instances"
subtitle: "GitLab Runner တစ္ခုကို Autoscaling ျပုလုပ္ျပီးသံုးမယ္ဆိုရင္"
tags: [sysadmin, linux, DevOps, dockers]
---

### Introduction
စားမေရးတာလည္းျကာ ပ်င္းကလည္းပ်င္း အလုပ္ေတြကလည္းအခုမွပားေတာ့ စားေလးတစ္ပုဒ္ေလာက္ေရးဦးမယ္ေလဆိုျပီး topic ကိုစဥ္းစားေတာ့ ရံုးမွာ gitlab setup ျပန္လုပ္ရင္းကေန gitlab-ci အတြက္ runner ကို aws spot instance သံုးျပီး autoscaling လုပ္တာေလးကိုသတိရသြားတယ္။ technical detail ျကီးေတြေတာ့အရမ္းမသဿြားေတာ့ဘူး။ ဘယ္လို setup လုပ္မလဲဆိုတဲ့ lab type ေလးပဲေရးေတာ့မယ္။

### က်ေနာ္သိတဲ့ CI အေျကာင္း
က်ေနာ္တို့ DevOps ဆိုတာနဲ့ CI/CD ကိုလည္းတြဲျမင္ျကမွာပါ။ CI/CD အတြက္ tools ေတြကေတာ့အမ်ားျကီးပဲ။ CI/CD ကိုတာက​ေတာ့ continuous integration, continuous delivery or continuous developement ဆိုၿပီး ​ေျပာၾကတယ္​။ က်​ေနာ္​​ေျပာမဲ့အပိုင္​းက cd ဘက္​သိပ္​မ​ေရာက္​​ေသးဘူး။ ci အ​ေၾကာင္​းသိသ​ေလာက္​​ေပါ့​ဗ်ာ။ Continuous integration ဆိုတာက က်​ေနာ္​​တို႔က git repo တစ္​ခုမွာ code ​ေတြကိုသိမ္​းထားမယ္​။ code changes တစ္​ခုခုလုပ္​ၿပီး repo ​ေပၚကိုျပန္​ push လိုက္​တာနဲ႔ build လုပ္​မယ္​၊ test လုပ္​မယ္၊​ validate လုပ္​မယ္​ စတာ​ေတြကိ​ု​ေခၚတာပါ။  အဲ့လိုလုပ္​​ေပးဖို႔အတြက္​ tools ​ေတြကိုသံုးရပါတယ္​။ နာမည္​ႀကီးတဲ့ထဲကဆိုရင္​​ေတာ့ Travis တို႔ Jenkins တို႔ Gitlab CI တို႔ ​ေနာက္​ၿပီးအမ်ားႀကီး႐ွိပါ​ေသးတယ္​။ က်​ေနာ္​တို႔ ဒီ​ေန႔ focus လုပ္​မွာက Gitlab CI ပါ။ ဒီ​ေကာင္​ကဘယ္​လိုအလုပ္​လုပ္​လဲဆို​ေတာ့ အ​ေပၚမွာ​ေျပာခဲ့သလိုပဲ gitlab မွာ project repo တစ္​ခု​ေဆာက္​မယ္​။ ၿပီးရင္​အဲ့မွာ code ​​ေတြကို push ထားမယ္​​။  ၿပီးရင္​ gitlab ရဲ႕ CI feature ကို on ဖို႔အတြက္​ project repo ထဲမွာ .gitlab-ci.yml ဆိုတဲ့ file ​ေလးတစ္​ခုထပ္​ထည္​့​ေပးရတယ္​။ အဲ့ file ထဲမွာ ကိုယ္​ run ခ်င္​တဲ့ scripts ​ေတြ၊ jobs ​ေတြကို define လုပ္​​ေပးရတယ္​​ေပါ့​ဗ်ာ။ အဲ့ CI အလုပ္​လုပ္​ဖို႔အတြက္​ကို က်​ေနာ္​တို႔ runner ဆိုတဲ့ gitlab-ci ကလုပ္​မဲ့ job ​​ေတြကို run ​ေပး၊ ရလာတဲ့ result ​​ေတြကို gitlab ဆီျပန္​ပို႔​ေပးတဲ့ gitlab-runner ကိုလည္​း setup လုပ္​​ေပးရတယ္​။

### က်ေနာ့္ ျပႆနာ
က်​ေနာ္​့ျပႆနာဘယ္​ကစလဲဆို​ေတာ့ အဲ့ runner ကို setup လုပ္​တဲ့အခ်ိန္​မွာ ပံုမွန္​အတိုင္​းပဲ docker နဲ႔လုပ္​လို႔ရတယ္​​ေျပာ​ေတာ့ docker နဲ႔လုပ္​လိုက္​တာ​ေပါ့။ အဲ့မွာစၿပီးျပႆနာတက္​တာပဲ။ gitlab ရဲ႕ CI/CD pipeline ထဲမွာ run ​ေနတဲ့ job ​​ေတြက တစ္​ခုႏွစ္​ခု​ေလာက္​ဆိုရင္​ မသိသာ​ေပမဲ့ လူအမ်ားႀကီးက တစ္​ခ်ိန္​တည္​းမွာ ၿပိဳင္​တူအလုုပ္​လုပ္​​ေနတာဆို​ေတာ့ တစ္​ၿပိဳင္​တည္​း job ​ေတြ ၅ ခု ၆ ခု​ေလာက္​လည္​းလာ​ေရာ runner setup လုပ္​ထားတဲ့စက္​က cpu overload ျဖစ္​ၿပီး လစ္​သြား​ေရာ။ လစ္​သြားတယ္​ဆိုတာက က်​ေနာ္​သံုးထားတဲ့ t2.medium ​ေၾကာင္​့မ်ားျဖစ္​​ေနမလား​ဆိုၿပီး instance type change ဖို႔စဥ္​းစားၾကည္​့ပါ​ေသးတယ္​။ ဒါ​ေပမဲ့ job ႐ွိမွထ run ရမဲ့ runner ကို capacity ​ေတြအမ်ားႀကီး​ေပးၿပီး အခ်ိန္​ျပည္​့ run ထားရတဲ့ cost က တစ္​လတစ္​လနည္​းမွာမဟုတ္​ဘူး။ အဲ့ဒါနဲ႔နည္​းလမ္​းလိုက္​႐ွာရင္​းနဲ႔ ဒီ autoscaling နည္​းလမ္​းကို​ေတြ႕တယ္​ဆိုပါ​ေတာ့​ဗ်ာ။ ဒီ​ေကာင္​က ဘယ္​လိုလုပ္​လဲဆိုတာ အၾကမ္​းဖ်င္​း​ေျပာရမယ္​ဆိုရင္​ run ရမဲ့ job ႐ွိမွ aws က​ေနၿပီး ec2 spot instance တစ္​ခုကို request လုပ္​ၿပီး run စရာ႐ွိတာ run ၿပီးတာနဲ႔ ျပန္​ terminate သြား​ေအာင္​ထိလုပ္​​ေပးပါတယ္​။ spot instance documentation ကို​ေတာ့ [ဒီမွာ](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-spot-instances.html) သြားဖတ္​ၾကည္​့လို႔ရပါတယ္​။ spot instance price ကလည္​း normal on-demand price ထက္​ 90% သက္​သာတယ္​လို႔ AWS ​ေျပာထားတာကို​ေတြ႕ရပါလိမ္​့မယ္​။ အဲ့​ေတာ့ general အားျဖင္​့ သိရၿပီးၿပီဆို​ေတာ့ setup နဲ႔ configuration အပိုင္​းကိုသြားၾကပါမယ္​။

### Prepare the bastion instance
အရင္ဆံုးလိုအပ္တာေတြကေတာ့ runner အတြက္ scaling လုပ္ေပးမဲ့ bastion instance ျဖစ္ပါတယ္။ ဒီ instnace က docker-machine ကိုသံုးျပီးေတာ့ runner အတြက္လိုအပ္တဲ့ spot instance ကို request သြားလုပ္ေပးမဲ့ေကာင္ျဖစ္ပါတယ္။ အဲ့ေတာ့ ဒီ instance က powerful machine ျဖစ္စရာမလိုဘူး။ t2.micro ေလာက္ဆိုရပါျပီ။ ဒီေကာင္ကေတာ့ အျမဲတမ္း up and running ျဖစ္ေနရပါမယ္။ ဒါမွသာ pipeline ထဲကို job တစ္ခုခု၀င္လာတာနဲ့ ဒီေကာင္က က်ေနာ္တို့ config ထဲမွာသတ္မွတ္ထားတဲ့ spot instnace ကိုသြား request လုပ္ေပးမွာမလို့ပါ။ t2.micro ေလာက္ဆိုရင္ cost ကပံုမွန္တစ္လကို $9 နဲ့ $15 ျကားမွာပဲကုန္က်မွာဆိုေတာ့ ဒီေလာက္ေတာ့ ရင္းနွီးသင့္တယ္ထင္ပါတယ္။

Install the prerequisites:
1. ခုနက create လုပ္ခဲ့တဲ့ server ထဲကို login ၀င္ပါ။
2. gitlab-runner ကို [official repo](https://docs.gitlab.com/runner/install/linux-repository.html) ကေန install လုပ္ပါ။
3. [Docker install](https://docs.docker.com/install/) လုပ္ပါ။
4. [Docker Machine](https://docs.docker.com/machine/install-machine/) ကို install လုပ္ပါ။

runner install လုပ္ျပီးဆိုရင္ အဲ့ runner ကို gitlab ကသိေအာင္ register လုပ္ေပးဖို့လိုပါတယ္။

### Prepare the project repository
မိမိ gitlab account ထဲမွာ project အသစ္တစ္ခု create လုပ္ဖို့လိုပါတယ္။
Project repo တစ္ခုလုပ္ဖို့အတြက္
project >> New Project >> Import project >> git Repo by url

Git repository URL ဆုိတဲ့ေနရာမွာ ေအာက္မွာေပးထားတဲ့ url ကို paste ထည့္လိုက္ပါ။
```
https://github.com/clijockey/vote-app-flask.git
```
Project name နဲ့ Project slug ကိုေတာ့ ကိုယ္ျကိုက္တာထားပါ။

![gitlab setup](/img/runner-autoscale/git.png){: .center-block :}

ျပီးရင္ေတာ့ create project ကိုနွိပ္ပါ။

### Register the gitlab-Runner
Gitlab runner ကို register ဖို့အတြက္ Runner token ကိုအရင္ယူရပါမယ္။ runner သံုးခုရွိတဲ့ထဲမွာ က်ေနာ္ကေတာ့ specific runner ကိုသံုးပါမယ္။
runner token ကိုယူဖို့အတြက္ကေတာ့ ခုနက create လုပ္ခဲ့တဲ့ project ထဲကိုအရင္၀င္ပါ။
Project >> Your Project >> vote-app ကိုသြားျပီး left bar က setting >> CI/CD ထဲကို၀င္လိုက္ပါ။
ေအာက္ကလိုျမင္ရပါလိမ့္မယ္။

![ runners ](/img/runner-autoscale/cicd.png){: .center-block :}

Runners ေဘးက Expand ဆိုတာကိုနွိပ္ျပီးေအာက္နည္းနည္းဆင္းလိုက္ရင္ Set up a specific Runner manually ဆိုတဲ့ေနရာမွာ url နဲ့ token ေပးထားတာကိုေတြ့ပါလိမ့္မယ္။

![ token ](/img/runner-autoscale/token.png){: .center-block :}

token ရျပီဆိုေတာ့ runner ကို [register](https://docs.gitlab.com/runner/register/index.html#gnulinux) လုပ္ပါ။

{: .box-warning}
**Warning:** executor type ကိုေရြးခိုင္းတဲ့အခါမွာ docker+machine ကိုေရြးေပးရပါမယ္။

Register ျပီးျပီဆိုရင္ေတာ့ Runners ေနရာမွာ active runner တစ္ခုေရာက္ေနတာကိုပံုထဲကအတိုင္းေတြ့ရပါလိမ့္မယ္။

![ active ](/img/runner-autoscale/runner.png){: .center-block :}

### Configure the gitlab-runner
Register ျပီးျပီဆိုေတာ့ configuration အပိုင္းလာပာျပီ။
instance ထဲကို login ၀င္ပါ။ ျပီးရင္ `/etc/gitlab-runner` ေအာက္မွာ `config.toml` ဆိုတဲ့ file ကို နမူနာ config အတိုင္း update လုပ္းေပးလိုက္ပါ။
config ထဲမွာပါတဲ့အေျကာင္းအရာအေသးစိတ္ကိုသိခ်င္ရင္ေတာ့ [ဒီမွာ](https://docs.gitlab.com/runner/configuration/runner_autoscale_aws/#configuring-the-gitlab-runner) သြားေလ့လာလို့ရပါတယ္။

<script src="https://gist.github.com/waiyanwh/ea37f17cb6ca17e7cd17aced694adbfa.js"></script>

ျပီးရင္ေတာ့ ခုနက create လုပ္တဲ့ Project Repo ထဲမွာ `.gitlab-ci.yml` ဆိုတဲ့ file တစ္ခု create လုပ္ျပီးေတာ့ run ရမဲ့ task ေတြကို ေအာက္ကအတိုင္း ထည့္ေပးလိုက္ပါ။
gitlab-ci.yml file အတြက္အေသးစိတ္ကို [ဒီမွာ](https://docs.gitlab.com/ee/ci/yaml/) ေလ့လာလို့ရပါတယ္။

<script src="https://gist.github.com/waiyanwh/92c3f3656b01cdb09a4bca30f810b5db.js"></script>

အဲ့ file ကိုျမင္တာနဲ့ gitlab က CI/CD ကိုစတင္အလုပ္လုပ္ေပးပါလိမ့္မယ္။ CI/CD status ကိုေတာ့ project ထဲက CI/CD ဆိုတဲ့ေနရာမွာျကည့္လို့ရပါတယ္။

![ running ](/img/runner-autoscale/running.png){: .center-block :}

![ passed ](/img/runner-autoscale/passed.png){: .center-block :}

running ျဖစ္ေနတဲ့အေျခအေနမွာ aws console က spot instance ေနရာကိုသြားျကည့္ရင္ config.toml ထဲကအတိုင္း m4.large တစ္လံုး active ျဖစ္ေနတာကိုေတြ့ရပါလိမ့္မယ္။

![ spot ](/img/runner-autoscale/spot.png){: .center-block :}

passed ျဖစ္သြားတဲ့အခ်ိန္မွာ spot instance ကိုျပန္သြားျကည့္မယ္ဆိုရင္ေတာ့ closed ျဖစ္ျပီးေတာ့ status ကေတာ့ terminate ျဖစ္ေနတာကိုေတြ့ရပါလိမ့္မယ္။

![ spot-close ](/img/runner-autoscale/spot-close.png)

ဒီေနရာမွာ m4 မွမဟုတ္ပာဘူး ကိုယ္ျကိုက္တဲ့ type ကိုသံုးလို့ရပါတယ္။ ျပင္သံုးခ်င္တယ္ဆိုရင္ေတာ့ type ကိုျပင္ရံုနဲ့မရပာဘူး။ price ပာလိုက္ျပီး အတိုး၊အေလွ်ာ့လုပ္ေပးရပါမယ္။
့့ဥပမာ run ရမဲ့ jobs အမ်ားျကီးရွိတယ္ဆိုျကပါစို့။ က်ေနာ္တို့ m4.large ကေန m4.2xlarge ေျပာင္းျကမယ္။ အဲ့လိုေျပာင္းမယ္ဆိုရင္ config.toml ထဲမွာ changes လုပ္ေပးရမွာ နွစ္ခုရွိပါမယ္။
amazonec2-instance-type နဲ့ amazonec2-spot-price ပါ။ ဘယ္လို change လိုက္လုပ္ေပးရမလဲဆိုေတာ့ aws console က spot instance မွာ pricing ကိုျကည့္ရပါတယ္။
ေအာက္ကပံုနွစ္ခုကိုယွဥ္ျကည့္ျကည့္ပါ။

![ large ](/img/runner-autoscale/large.png){: .center-block :}

![ xlarge ](/img/runner-autoscale/xlarge.png){: .center-block :}

အေပါ္ပံုမွာဆိုရင္ m4.large အတြက္ pricing က $0.0311 က်ပါတယ္။ ေနာက္တစ္ပံုမွာဆိုရင္ေတာ့ m4.2xlarge အတြက္ကို pricing $0.1246 ျဖစ္ေနပါလိမ့္မယ္။
အဲ့ေတာ့က်ေနာ္တို့က m4.2xlarge သာသံုးမယ္ဆိုရင္ config ထဲမွာ amazonec2-spot-price ကို 0.15 ေလာက္ထားေပးရပါမယ္။ သံုးခ်င္တဲ့ instance type နဲ့ pricing ကိုခ်ိန္ေပးရံုပါပဲ။
အျကံေပးခ်င္တာကေတာ့ pricing ကိုနည္းနည္းပိုေပးပါ။ ဒါမွသူမ်ားထက္ကိုယ္အရင္ရျပီး pipeline လည္းျမန္ျမန္ဆန္ဆန္ျပီးမွာျဖစ္ပါတယ္။
