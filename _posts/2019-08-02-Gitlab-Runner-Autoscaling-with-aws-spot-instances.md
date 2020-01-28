---
layout: post
title:  "Gitlab Runner Autoscaling With AWS Spot Instances"
subtitle: "GitLab Runner တစ်ခုကို Autoscaling ပြုလုပ်ပြီးသုံးမယ်ဆိုရင်"
tags: [sysadmin, linux, DevOps, dockers]
---

### Introduction
စားမရေးတာလည်းကြာ ပျင်းကလည်းပျင်း အလုပ်တွေကလည်းအခုမှပားတော့ စားလေးတစ်ပုဒ်လောက်ရေးဦးမယ်လေဆိုပြီး topic ကိုစဉ်းစားတော့ ရုံးမှာ gitlab setup ပြန်လုပ်ရင်းကနေ gitlab-ci အတွက် runner ကို aws spot instance သုံးပြီး autoscaling လုပ်တာလေးကိုသတိရသွားတယ်။ technical detail ကြီးတွေတော့အရမ်းမသူွားတော့ဘူး။ ဘယ်လို setup လုပ်မလဲဆိုတဲ့ lab type လေးပဲရေးတော့မယ်။

### ကျနော်သိတဲ့ CI အကြောင်း
ကျနော်တို့ DevOps ဆိုတာနဲ့ CI/CD ကိုလည်းတွဲမြင်ကြမှာပါ။ CI/CD အတွက် tools တွေကတော့အများကြီးပဲ။ CI/CD ကိုတာကတော့ continuous integration, continuous delivery or continuous developement ဆိုပြီး ပြောကြတယ်။ ကျနော်ပြောမဲ့အပိုင်းက cd ဘက်သိပ်မရောက်သေးဘူး။ ci အကြောင်းသိသလောက်ပေါ့ဗျာ။ Continuous integration ဆိုတာက ကျနော်တို့က git repo တစ်ခုမှာ code တွေကိုသိမ်းထားမယ်။ code changes တစ်ခုခုလုပ်ပြီး repo ပေါ်ကိုပြန် push လိုက်တာနဲ့ build လုပ်မယ်၊ test လုပ်မယ်၊ validate လုပ်မယ် စတာတွေကိုခေါ်တာပါ။  အဲ့လိုလုပ်ပေးဖို့အတွက် tools တွေကိုသုံးရပါတယ်။ နာမည်ကြီးတဲ့ထဲကဆိုရင်တော့ Travis တို့ Jenkins တို့ Gitlab CI တို့ နောက်ပြီးအများကြီးရှိပါသေးတယ်။ ကျနော်တို့ ဒီနေ့ focus လုပ်မှာက Gitlab CI ပါ။ ဒီကောင်ကဘယ်လိုအလုပ်လုပ်လဲဆိုတော့ အပေါ်မှာပြောခဲ့သလိုပဲ gitlab မှာ project repo တစ်ခုဆောက်မယ်။ ပြီးရင်အဲ့မှာ code တွေကို push ထားမယ်။  ပြီးရင် gitlab ရဲ့ CI feature ကို on ဖို့အတွက် project repo ထဲမှာ .gitlab-ci.yml ဆိုတဲ့ file လေးတစ်ခုထပ်ထည့်ပေးရတယ်။ အဲ့ file ထဲမှာ ကိုယ် run ချင်တဲ့ scripts တွေ၊ jobs တွေကို define လုပ်ပေးရတယ်ပေါ့ဗျာ။ အဲ့ CI အလုပ်လုပ်ဖို့အတွက်ကို ကျနော်တို့ runner ဆိုတဲ့ gitlab-ci ကလုပ်မဲ့ job တွေကို run ပေး၊ ရလာတဲ့ result တွေကို gitlab ဆီပြန်ပို့ပေးတဲ့ gitlab-runner ကိုလည်း setup လုပ်ပေးရတယ်။

### ကျနော့် ပြဿနာ
ကျနော့်ပြဿနာဘယ်ကစလဲဆိုတော့ အဲ့ runner ကို setup လုပ်တဲ့အချိန်မှာ ပုံမှန်အတိုင်းပဲ docker နဲ့လုပ်လို့ရတယ်ပြောတော့ docker နဲ့လုပ်လိုက်တာပေါ့။ အဲ့မှာစပြီးပြဿနာတက်တာပဲ။ gitlab ရဲ့ CI/CD pipeline ထဲမှာ run နေတဲ့ job တွေက တစ်ခုနှစ်ခုလောက်ဆိုရင် မသိသာပေမဲ့ လူအများကြီးက တစ်ချိန်တည်းမှာ ပြိုင်တူအလုပ်လုပ်နေတာဆိုတော့ တစ်ပြိုင်တည်း job တွေ ၅ ခု ၆ ခုလောက်လည်းလာရော runner setup လုပ်ထားတဲ့စက်က cpu overload ဖြစ်ပြီး လစ်သွားရော။ လစ်သွားတယ်ဆိုတာက ကျနော်သုံးထားတဲ့ t2.medium ကြောင့်များဖြစ်နေမလားဆိုပြီး instance type change ဖို့စဉ်းစားကြည့်ပါသေးတယ်။ ဒါပေမဲ့ job ရှိမှထ run ရမဲ့ runner ကို capacity တွေအများကြီးပေးပြီး အချိန်ပြည့် run ထားရတဲ့ cost က တစ်လတစ်လနည်းမှာမဟုတ်ဘူး။ အဲ့ဒါနဲ့နည်းလမ်းလိုက်ရှာရင်းနဲ့ ဒီ autoscaling နည်းလမ်းကိုတွေ့တယ်ဆိုပါတော့ဗျာ။ ဒီကောင်က ဘယ်လိုလုပ်လဲဆိုတာ အကြမ်းဖျင်းပြောရမယ်ဆိုရင် run ရမဲ့ job ရှိမှ aws ကနေပြီး ec2 spot instance တစ်ခုကို request လုပ်ပြီး run စရာရှိတာ run ပြီးတာနဲ့ ပြန် terminate သွားအောင်ထိလုပ်ပေးပါတယ်။ spot instance documentation ကိုတော့ [ဒီမှာ](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-spot-instances.html) သွားဖတ်ကြည့်လို့ရပါတယ်။ spot instance price ကလည်း normal on-demand price ထက် 90% သက်သာတယ်လို့ AWS ပြောထားတာကိုတွေ့ရပါလိမ့်မယ်။ အဲ့တော့ general အားဖြင့် သိရပြီးပြီဆိုတော့ setup နဲ့ configuration အပိုင်းကိုသွားကြပါမယ်။

### Prepare the bastion instance
အရင်ဆုံးလိုအပ်တာတွေကတော့ runner အတွက် scaling လုပ်ပေးမဲ့ bastion instance ဖြစ်ပါတယ်။ ဒီ instnace က docker-machine ကိုသုံးပြီးတော့ runner အတွက်လိုအပ်တဲ့ spot instance ကို request သွားလုပ်ပေးမဲ့ကောင်ဖြစ်ပါတယ်။ အဲ့တော့ ဒီ instance က powerful machine ဖြစ်စရာမလိုဘူး။ t2.micro လောက်ဆိုရပါပြီ။ ဒီကောင်ကတော့ အမြဲတမ်း up and running ဖြစ်နေရပါမယ်။ ဒါမှသာ pipeline ထဲကို job တစ်ခုခုဝင်လာတာနဲ့ ဒီကောင်က ကျနော်တို့ config ထဲမှာသတ်မှတ်ထားတဲ့ spot instnace ကိုသွား request လုပ်ပေးမှာမလို့ပါ။ t2.micro လောက်ဆိုရင် cost ကပုံမှန်တစ်လကို $9 နဲ့ $15 ကြားမှာပဲကုန်ကျမှာဆိုတော့ ဒီလောက်တော့ ရင်းနှီးသင့်တယ်ထင်ပါတယ်။

Install the prerequisites:
1. ခုနက create လုပ်ခဲ့တဲ့ server ထဲကို login ဝင်ပါ။
2. gitlab-runner ကို [official repo](https://docs.gitlab.com/runner/install/linux-repository.html) ကနေ install လုပ်ပါ။
3. [Docker install](https://docs.docker.com/install/) လုပ်ပါ။
4. [Docker Machine](https://docs.docker.com/machine/install-machine/) ကို install လုပ်ပါ။

runner install လုပ်ပြီးဆိုရင် အဲ့ runner ကို gitlab ကသိအောင် register လုပ်ပေးဖို့လိုပါတယ်။

### Prepare the project repository
မိမိ gitlab account ထဲမှာ project အသစ်တစ်ခု create လုပ်ဖို့လိုပါတယ်။
Project repo တစ်ခုလုပ်ဖို့အတွက်
project >> New Project >> Import project >> git Repo by url

Git repository URL ဆိုတဲ့နေရာမှာ အောက်မှာပေးထားတဲ့ url ကို paste ထည့်လိုက်ပါ။
```
https://github.com/clijockey/vote-app-flask.git
```
Project name နဲ့ Project slug ကိုတော့ ကိုယ်ကြိုက်တာထားပါ။

![gitlab setup](/img/runner-autoscale/git.png){: .center-block :}

ပြီးရင်တော့ create project ကိုနှိပ်ပါ။

### Register the gitlab-Runner
Gitlab runner ကို register ဖို့အတွက် Runner token ကိုအရင်ယူရပါမယ်။ runner သုံးခုရှိတဲ့ထဲမှာ ကျနော်ကတော့ specific runner ကိုသုံးပါမယ်။
runner token ကိုယူဖို့အတွက်ကတော့ ခုနက create လုပ်ခဲ့တဲ့ project ထဲကိုအရင်ဝင်ပါ။
Project >> Your Project >> vote-app ကိုသွားပြီး left bar က setting >> CI/CD ထဲကိုဝင်လိုက်ပါ။
အောက်ကလိုမြင်ရပါလိမ့်မယ်။

![ runners ](/img/runner-autoscale/cicd.png){: .center-block :}

Runners ဘေးက Expand ဆိုတာကိုနှိပ်ပြီးအောက်နည်းနည်းဆင်းလိုက်ရင် Set up a specific Runner manually ဆိုတဲ့နေရာမှာ url နဲ့ token ပေးထားတာကိုတွေ့ပါလိမ့်မယ်။

![ token ](/img/runner-autoscale/token.png){: .center-block :}

token ရပြီဆိုတော့ runner ကို [register](https://docs.gitlab.com/runner/register/index.html#gnulinux) လုပ်ပါ။

{: .box-warning}
**Warning:** executor type ကိုရွေးခိုင်းတဲ့အခါမှာ docker+machine ကိုရွေးပေးရပါမယ်။

Register ပြီးပြီဆိုရင်တော့ Runners နေရာမှာ active runner တစ်ခုရောက်နေတာကိုပုံထဲကအတိုင်းတွေ့ရပါလိမ့်မယ်။

![ active ](/img/runner-autoscale/runner.png){: .center-block :}

### Configure the gitlab-runner
Register ပြီးပြီဆိုတော့ configuration အပိုင်းလာပာပြီ။
instance ထဲကို login ဝင်ပါ။ ပြီးရင် `/etc/gitlab-runner` အောက်မှာ `config.toml` ဆိုတဲ့ file ကို နမူနာ config အတိုင်း update လုပ်းပေးလိုက်ပါ။
config ထဲမှာပါတဲ့အကြောင်းအရာအသေးစိတ်ကိုသိချင်ရင်တော့ [ဒီမှာ](https://docs.gitlab.com/runner/configuration/runner_autoscale_aws/#configuring-the-gitlab-runner) သွားလေ့လာလို့ရပါတယ်။

<script src="https://gist.github.com/waiyanwh/ea37f17cb6ca17e7cd17aced694adbfa.js"></script>

ပြီးရင်တော့ ခုနက create လုပ်တဲ့ Project Repo ထဲမှာ `.gitlab-ci.yml` ဆိုတဲ့ file တစ်ခု create လုပ်ပြီးတော့ run ရမဲ့ task တွေကို အောက်ကအတိုင်း ထည့်ပေးလိုက်ပါ။
gitlab-ci.yml file အတွက်အသေးစိတ်ကို [ဒီမှာ](https://docs.gitlab.com/ee/ci/yaml/) လေ့လာလို့ရပါတယ်။

<script src="https://gist.github.com/waiyanwh/92c3f3656b01cdb09a4bca30f810b5db.js"></script>

အဲ့ file ကိုမြင်တာနဲ့ gitlab က CI/CD ကိုစတင်အလုပ်လုပ်ပေးပါလိမ့်မယ်။ CI/CD status ကိုတော့ project ထဲက CI/CD ဆိုတဲ့နေရာမှာကြည့်လို့ရပါတယ်။

![ running ](/img/runner-autoscale/running.png){: .center-block :}

![ passed ](/img/runner-autoscale/passed.png){: .center-block :}

running ဖြစ်နေတဲ့အခြေအနေမှာ aws console က spot instance နေရာကိုသွားကြည့်ရင် config.toml ထဲကအတိုင်း m4.large တစ်လုံး active ဖြစ်နေတာကိုတွေ့ရပါလိမ့်မယ်။

![ spot ](/img/runner-autoscale/spot.png){: .center-block :}

passed ဖြစ်သွားတဲ့အချိန်မှာ spot instance ကိုပြန်သွားကြည့်မယ်ဆိုရင်တော့ closed ဖြစ်ပြီးတော့ status ကတော့ terminate ဖြစ်နေတာကိုတွေ့ရပါလိမ့်မယ်။

![ spot-close ](/img/runner-autoscale/spot-close.png)

ဒီနေရာမှာ m4 မှမဟုတ်ပာဘူး ကိုယ်ကြိုက်တဲ့ type ကိုသုံးလို့ရပါတယ်။ ပြင်သုံးချင်တယ်ဆိုရင်တော့ type ကိုပြင်ရုံနဲ့မရပာဘူး။ price ပာလိုက်ပြီး အတိုး၊အလျှော့လုပ်ပေးရပါမယ်။
့ဥပမာ run ရမဲ့ jobs အများကြီးရှိတယ်ဆိုကြပါစို့။ ကျနော်တို့ m4.large ကနေ m4.2xlarge ပြောင်းကြမယ်။ အဲ့လိုပြောင်းမယ်ဆိုရင် config.toml ထဲမှာ changes လုပ်ပေးရမှာ နှစ်ခုရှိပါမယ်။
amazonec2-instance-type နဲ့ amazonec2-spot-price ပါ။ ဘယ်လို change လိုက်လုပ်ပေးရမလဲဆိုတော့ aws console က spot instance မှာ pricing ကိုကြည့်ရပါတယ်။
အောက်ကပုံနှစ်ခုကိုယှဉ်ကြည့်ကြည့်ပါ။

![ large ](/img/runner-autoscale/large.png){: .center-block :}

![ xlarge ](/img/runner-autoscale/xlarge.png){: .center-block :}

အပေါ်ပုံမှာဆိုရင် m4.large အတွက် pricing က $0.0311 ကျပါတယ်။ နောက်တစ်ပုံမှာဆိုရင်တော့ m4.2xlarge အတွက်ကို pricing $0.1246 ဖြစ်နေပါလိမ့်မယ်။
အဲ့တော့ကျနော်တို့က m4.2xlarge သာသုံးမယ်ဆိုရင် config ထဲမှာ amazonec2-spot-price ကို 0.15 လောက်ထားပေးရပါမယ်။ သုံးချင်တဲ့ instance type နဲ့ pricing ကိုချိန်ပေးရုံပါပဲ။
အကြံပေးချင်တာကတော့ pricing ကိုနည်းနည်းပိုပေးပါ။ ဒါမှသူများထက်ကိုယ်အရင်ရပြီး pipeline လည်းမြန်မြန်ဆန်ဆန်ပြီးမှာဖြစ်ပါတယ်။
