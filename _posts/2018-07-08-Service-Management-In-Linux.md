---
layout: post
title:  "Service Management in Linux"
subtitle: "Linux Services တွေကို Management လုပ်ခြင်း"
tags: [sysadmin, linux]
---

linux မှာ system startup process တွေနဲ့ server process တွေကို systemd လို့ခေါ်တဲ့ system and service manager က manage လုပ်ပါတယ်။ systemd က server process တွေ၊ server daemons တွေ၊ပြီးတော့ အခြား process တွေကို boot တက်တက်ချင်း ဒါမှမဟုတ် boot တက်အပြီးမှာလည်း activate ပြုလုပ်နိုင်ပါသေးတယ်။ ဒီနေရာမှာ daemons ဆိုတာကတော့ task အမျိုးမျိုးကိုလုပ်ဆောင်ဖို့အတွက် system ရဲ့ background မှာ run နေတဲ့ process တွေကို ဆိုလိုပါတယ်။ general အားဖြင့် daemons တွေက  system boot တက်တဲ့အချိန်ကစပြီးတော့ system shutdown မဖြစ်ခင်ထိ၊ သူတို့ကို system administrator က မရပ်သေးတဲ့အချိန်ထိ automatic run နေပါတယ်။ daemons အများစုရဲ့အဆုံးမှာ "d" ဆိုတဲ့ စာလုံးနဲ့အဆုံးသတ်ပါတယ်။ဥပမာ ssh ဆိုရင် သူ့ရဲ့ daemon က sshd, http ဆိုလည်း httpd စသည်ဖြင့် d တွေနဲ့ဆုံးပါတယ်။ clients တွေဆီကလာတဲ့ communication request တွေကို လက်ခံဖို့အတွက် daemon တွေက socket ဆိုတာကိုအသုံးပြုပါတယ်။ sockets တွေမှာမှ daemons တွေက create လုပ်တဲ့ socket တွေအပြင် systemd က create လုပ်တဲ့ sockets တွေလည်းရှိပါသေးတယ်။ client က connection တစ်ခု established လုပ်လိုက်တဲ့အခါ sockets တွေကတစ်ဆင့် daemons တွေဆီကို pass လုပ်ပေးပါတယ်။အရင်တုန်းကဆိုရင် Unix, Linux Operating System တွေအကုန်လုံးမှာ init process က process id 1 အနေနဲ့အလုပ်လုပ်ပါတယ်။ ဒီ init process ကတစ်ခြား services တွေကို activate လုပ်တဲ့နေရာမှာသုံးပါတယ်။အခုနောက်ပိုင်းမှာတော့ init အစား systemd ကိုအသုံးပြုလာကြပါတယ်။ systemd ရဲ့ အားသာချက်တစ်ချို့ကတော့

* system ရဲ့ boot speed ကိုပိုမြန်လာစေခြင်း
* Automatic Service Dependency Management ဖြစ်တယ်။ ဘယ်လိုမျိုးလဲဆိုတော့ network connection မရှိဘဲနဲ့ network service တွေကို start မလုပ်ထားတော့ဘူး။
* Linux control group တွေကိုအသုံးပြုပြီးတော့ process တွေကို track လုပ်လို့ရခြင်း။

### systemctl and systemd units
systemctl command ကို units လု့ိခေါ်တဲ့ systemd objects အမျိုးမျိုးကို manage ပြုလုပ်ရာမှာသုံးပါတယ်။ unit types အမျိုးမျိုးကိုတော့
```bash
systemctl -t help
```
အသုံးများတဲ့ unit types အမျိုးမျိုးကိုအောက်မှာဖော်ပြထားပါတယ်။

* service units ...အနောက်မှာ .service ဆိုတဲ့ extensions နဲ့ဆုံးပြီးတော့ system services တွေကိုကိုယ်စားပြုပါတယ်။
* sockets units ရဲ့အနောက်မှာတော့ .socket extensions နဲ့ဆုံးပါတယ်။inter process communication လို့ခေါ်တဲ့ IPC sockets တွေကို represent လုပ်ပါတယ်။ပြီးတော့ socket unit တွေက  .service unit တွေနဲ့ တွဲပြီးအလုပ်လုပ်တယ်။
* path unit ကတော့ နောက်မှာ .path extension နဲ့ဆုံးပြီ  file system အပြောင်းအလဲမဖြစ်ခင်အထိ process တွေရဲ့ activation ကို delay လုပ်ပေးပါတယ်။

---

### Service States
services တွေရဲ့လက်ရှိအခြေအနေကို systemctl status name.types နဲ့ကြည့်လို့ရပါတယ်။

![ service status ](/img/sv_mgmt/1.png)

system service ရဲ့ status ကိုဖော်ပြတဲ့ keyword အများကြီရှိပါတယ်။ဒီ output မှာတော့ ssh service က active ဖြစ်နေတာကိုတွေ့ရမှာပါ။

![ table ](/img/sv_mgmt/2.png)

---

### Listing Unit File with systemctl

1. System startup ဖြစ်ဖို့အတွက် လိုအပ်တဲ့ units အကုန်လုံးကိုကြည့်မယ်။
```bash
[root@serverX ~]# systectl
```
2. service units တွေအကုန်လုံးကို list လုပ်ကြည့်မယ်။
```bash
[root@serverX ~]# systectl --type=service
```
3. fail ဒါမဟုတ် maintenance state မှာရှိနေတဲ့ units တွေကိုကြည့်မယ်။
```bash
[root@serverX ~]# systectl status rngd.service -l
```
4. service active ဖြစ်နေလား။ ဒါမှမဟုတ် enable လုပ်ထားလားဆိုတာကိုကြည့်မယ်။
```bash
[root@serverX ~]# systectl is-active sshd
[root@serverX ~]# systectl is-enabled sshd
```
5. active ဖြစ်နေတဲ့ loaded units တွေကိုကြည့်မယ်။ --all option ကတော့ active ဖြစ်နေတဲ့ units တွေကိုပါပြပါလိမ့်မယ်။
```bash
[root@serverX ~]# systectl list-units --type=service
[root@serverX ~]# systectl list-units --type=services --all
```
6. fail ဖြစ်တဲ့ services တွေကိုပဲကြည့်မယ်။
```bash
[root@serverX ~]# systectl --failed --type=services
```

---

### Controlling System Service
run နေတဲ့ service တစ်ခုခုရဲ့ configuration files တွေကို ပြင်ချင်တာပဲဖြစ်ဖြစ်၊ services တွေကို update လုပ်ချင်တာပဲဖြစ်ဖြစ် system ကို reboot လုပ်ပေးဖို့လို့ပါတယ်။ မသုံးချင်တော့လို့ remove လုပ်ချင်ရင်လည်း service ကို stop လုပ်ပြီးမှာပဲ remove လုပ်လို့ရပါမယ်။

ဥပမာအနေနဲ့ sshd service ကို manage လုပ်ကြည့်ပါမယ်။

1. service ရဲ့ status ကိုအရင်ကြည့်ကြည့်မယ်။
```bash
[root@serverX ~]# systectl status sshd.service
```
2. Service ကို stop လုပ်ပြီး status ကိုတစ်ချက်ပြန်ကြည့်ကြည့်မယ်။
```bash
[root@serverX ~]# systectl stop sshd.service
[root@serverX ~]# systectl status ssshd.service
```
3. Service ကိုပြန်စပြီး status ကိုပြန်ကြည့်ကြည့်မယ်။
```bash
[root@serverX ~]# systectl start sshd.service
[root@serverX ~]# systectl status sshd.service
```
4. Service ကို restart လုပ်ပြီး status တစ်ချက်ပြန်ကြည့်မယ်။
```bash
[root@serverX ~]# systectl restart sshd.service
[root@serverX ~]# systectl status sshd.service
```
5. reload လုပ်ပြီး status ပြန်ကြည့်မယ်။
```bash
[root@serverX ~]# systectl reload sshd.services
[root@serverX ~]# systectl status sshd.services
```

---

### Unit Dependencies
တစ်ချို့ service တွေက သူတစ်ခုတည်းမဟုတ်ဘဲနဲ့ တစ်ခြား unit တွေပေါ်ကိုမှိခိုနေတတ်တယ်။ဥပမာ socket unit တစ်ခုက enable ဖြစ်နေပြီးတော့  သူနဲ့ name တူတဲ့ service က enable ဖြစ်မနေဘူးပဲထားပါတော့။ အဲ့အချိန်မှာ client စ်ခုခုက အဲ့ socket ကိုလာချိတ်တာနဲ့  service က auto start ဖြစ်သွားတဲ့အခြေအနေမျိုးတွေလဲရှိပါတယ်။အဲ့တော့ အဲ့လို service တွေကို လုံးဝရပ်ချင်တယ်ဆိုရင်တော့ သူနဲ့ဆိုင်တဲ့ တစ်ခြား unit တွေကိုပါ disable လုပ်ပစ်ဖို့လိုပါလိမ့်မယ်။
```bash
[root@serverX ~]# systectl list-dependencies apache2
```
ဆိုတဲ့ command ကိုအသုံးပြုပြီး apache2 start ဖြစ်ဖို့အတွက်တစ်ခြား ဘယ် unit တွေပါ start ဖြစ်ဖို့လိုလဲဆိုတာကို tree နဲ့ဖော်ပြထားတာကိုကြည့်ရှုနိုင်ပါတယ်။

---

### Masking Services
system တစ်ခုမှာ conflict services တွေအများကြီးရှိနေနိင်ပါတယ်။ဘယ်လိုမျိုူူူးလဲဆိုရင် network ကို manage လုပ်ဖို့ဆိုရင် network နဲ့  NetworkManager ၊ firewall ဆိုရင်လည်း iptables နဲ့ firewalld ဆိုပြီး conflit ဖြစ်နေတာတွေကိုပြောတာပါ။အဲ့တော့ administrator တွေက အဲ့လို  service တွေကိုမတော်တဆ start လုပ်မိမှာစိုးတဲ့အတွက် mask လုပ်ကြပါတယ်။ masking လုပ်တယ်ဆိုတာကတော့ configuration directories တွေကို /dev/null နဲ့ link လုပ်လိုက်တာပါ။တကယ်လို့ service ကိုမတော်တဆ start လုပ်မိရင်တောင် service က start ဖြစ်လာမှာမဟုတ်ပါဘူး။

![ mask ](/img/sv_mgmt/3.png)

---
