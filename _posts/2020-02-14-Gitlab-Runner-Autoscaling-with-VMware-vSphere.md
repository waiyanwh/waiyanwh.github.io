---
layout: post
title:  "Gitlab Runner Autoscaling With VMware vSphere"
subtitle: "GitLab Runner တစ်ခုကို Autoscaling ပြုလုပ်ပြီးသုံးမယ်ဆိုရင်..."
tags: [sysadmin, linux, DevOps, dockers, git]
---

### ***Old post url***

[Gitlab Runner Autoscaling With AWS Spot Instances](https://waiyanwh.github.io/2019-08-02-Gitlab-Runner-Autoscaling-with-aws-spot-instances/)

### ***With VMware vSphere***
အရင်ကတော့ runner autoscaling ကို aws spot instance နဲ့ရေးခဲ့ပြီးပါပြီး။ အရင် post ကိုမဖတ်ရသေးဘူးဆိုရင်တော့ [ဒီလင့်](https://waiyanwh.github.io/2019-08-02-Gitlab-Runner-Autoscaling-with-aws-spot-instances/) မှာ သွားဖတ်လို့ရပါတယ်။ ခုကတော့ VMware vSphere နဲ့လည်းရမလားလုပ်ကြည့်တာ ရသွားလို့ ဒီ post ကိုရေးတာပါ။  online မှာလည်း ရှာမတွေ့တာနဲ့ လက်တည့်စမ်းကြည့်ရင်းရသွားတာပါ။ အကြောင်းအရာကတော့အရင် [post](https://waiyanwh.github.io/2019-08-02-Gitlab-Runner-Autoscaling-with-aws-spot-instances/) နဲ့တူတူပဲဆိုတော့ အရှည်ကြီး မရေးတော့ပါဘူး။ setup and installation ကအရမ်းကြီးမကွာဘူး။ အရင် bastion host အတွက်သုံးခဲ့တဲ့ ec2 instance နေရာမှာ vSphere ထဲက ubuntu vm ဝင်သွားတယ်။ အရင် [post](https://waiyanwh.github.io/2019-08-02-Gitlab-Runner-Autoscaling-with-aws-spot-instances/) မှာပြောခဲ့သလိုပဲ bastion host က resource အများကြီးမလိုဘူး။ အရင် spot instance အတွက်သုံးခဲ့တဲ့ [docker-machine](https://docs.docker.com/v17.09/machine/overview/) driver နေရာမှာ vSphere အတွက်ဟာလေး ပြောင်းသွားတယ်။ Sample config ကိုတော့ အောက်မှာ လေ့လာနိုင်ပါတယ်။

<script src="https://gist.github.com/waiyanwh/c2ef08311a58661ebbc4baf97f675f14.js"></script>

တကယ်တော့ [docker-machine](https://docs.docker.com/v17.09/machine/overview/) အတွက် သုံးလို့ရတဲ့ [driver](https://docs.docker.com/v17.09/machine/drivers/) မှန်သမျှ ဒီမှာ သုံးလို့ရပါတယ်။ Options တွေ လိုက် change ပေးရုံပါပဲ။ တစ်ချို့အတွက်အသုံးဝင်မယ်ထင်ပါတယ်။
