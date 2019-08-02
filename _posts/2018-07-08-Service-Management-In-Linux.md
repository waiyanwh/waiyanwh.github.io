---
layout: post
title:  "Service Management in Linux"
tags: [sysadmin, linux]
---

linux မွာ system startup process ေတြနဲ့ server process ေတြကို systemd လို့ေခါ္တဲ့ system and service manager က manage လုပ္ပါတယ္။ systemd က server process ေတြ၊ server daemons ေတြ၊ျပီးေတာ့ အျခား process ေတြကို boot တက္တက္ခ်င္း ဒါမွမဟုတ္ boot တက္အျပီးမွာလည္း activate ျပုလုပ္နိုင္ပါေသးတယ္။ ဒီေနရာမွာ daemons ဆိုတာကေတာ့ task အမ်ုိးမ်ိုုးကိုလုပ္ေဆာင္ဖို့အတြက္ system ရဲ့ background မွာ run ေနတဲ့ process ေတြကို ဆိုလုိပါတယ္။ general အားျဖင့္ daemons ေတြက  system boot တက္တဲ့အခ်ိန္ကစျပီးေတာ့ system shutdown မျဖစ္ခင္ထိ၊ သူတို့ကို system administrator က မရပ္ေသးတဲ့အခ်ိန္ထိ automatic run ေနပါတယ္။ daemons အမ်ားစုရဲ့အဆုံးမွာ "d" ဆိုတဲ့ စာလံုးနဲ့အဆံုးသတ္ပါတယ္။ဥပမာ ssh ဆိုရင္ သူ့ရဲ့ daemon က sshd, http ဆိုလည္း httpd စသည္ျဖင့္ d ေတြနဲ့ဆံုးပါတယ္။ clients ေတြဆီကလာတဲ့ communication request ေတြကို လက္ခံဖို့အတြက္ daemon ေတြက socket ဆိုတာကိုအသံုးျပုပါတယ္။ sockets ေတြမွာမွ daemons ေတြက create လုပ္တဲ့ socket ေတြအျပင္ systemd က create လုပ္တဲ့ sockets ေတြလည္းရွိပါေသးတယ္။ client က connection တစ္ခု established လုပ္လိုက္တဲ့အခါ sockets ေတြကတစ္ဆင့္ daemons ေတြဆီကို pass လုပ္ေပးပါတယ္။အရင္တုန္းကဆိုရင္ Unix, Linux Operating System ေတြအကုန္လံုးမွာ init process က process id 1 အေနနဲ့အလုပ္လုပ္ပါတယ္။ ဒီ init process ကတစ္ျခား services ေတြကို activate လုပ္တဲ့ေနရာမွာသံုးပါတယ္။အခုေနာက္ပိုင္းမွာေတာ့ init အစား systemd ကိုအသံုးျပုလာျကပါတယ္။ systemd ရဲ့ အားသာခ်က္တစ္ခ်ို့ကေတာ့

* system ရဲ့ boot speed ကိုပိုျမန္လာေစျခင္း
* Automatic Service Dependency Management ျဖစ္တယ္။ ဘယ္လိုမ်ိုးလဲဆိုေတာ့ network connection မရွိဘဲနဲ့ network service ေတြကို start မလုပ္ထားေတာ့ဘူး။
* Linux control group ေတြကိုအသံုးျပုျပီးေတာ့ process ေတြကို track လုပ္လို့ရျခင္း။

### systemctl and systemd units
systemctl command ကို units လု့ိေခါ္တဲ့ systemd objects အမ်ုိးမ်ိုးကို manage ျပုလုပ္ရာမွာသံုးပါတယ္။ unit types အမ်ိုးမ်ိုးကိုေတာ့
```bash
systemctl -t help
```
အသံုးမ်ားတဲ့ unit types အမ်ိုးမ်ိုးကိုေအာက္မွာေဖာ္ျပထားပါတယ္။

* service units ...အေနာက္မွာ .service ဆိုတဲ့ extensions နဲ့ဆံုးျပီးေတာ့ system services ေတြကိုကိုယ္စားျပုပါတယ္။
* sockets units ရဲ့အေနာက္မွာေတာ့ .socket extensions နဲ့ဆံုးပါတယ္။inter process communication လို့ေခါ္တဲ့ IPC sockets ေတြကို represent လုပ္ပါတယ္။ျပီးေတာ့ socket unit ေတြက  .service unit ေတြနဲ့ တြဲျပီးအလုပ္လုပ္တယ္။
* path unit ကေတာ့ ေနာက္မွာ .path extension နဲ့ဆံုးျပီ  file system အေျပာင္းအလဲမျဖစ္ခင္အထိ process ေတြရဲ့ activation ကို delay လုပ္ေပးပါတယ္။

---

### Service States
services ေတြရဲ့လက္ရွိအေျခအေနကို systemctl status name.types နဲ့ျကည့္လို့ရပါတယ္။

![ service status ](/img/sv_mgmt/1.png)

system service ရဲ့ status ကိုေဖာ္ျပတဲ့ keyword အမ်ားျကီရွိပါတယ္။ဒီ output မွာေတာ့့ ssh service က active ျဖစ္ေနတာကိုေတြ့ရမွာပါ။

![ table ](/img/sv_mgmt/2.png)

---

### Listing Unit File with systemctl

1. System startup ျဖစ္ဖို့အတြက္ လိုအပ္တဲ့ units အကုန္လံုးကိုျကည့္မယ္။
```bash
[root@serverX ~]# systectl
```
2. service units ေတြအကုန္လံုးကို list လုပ္ျကည့္မယ္။
```bash
[root@serverX ~]# systectl --type=service
```
3. fail ဒါမဟုတ္ maintenance state မွာရွိေနတဲ့ units ေတြကိုျကည့္မယ္။
```bash
[root@serverX ~]# systectl status rngd.service -l
```
4. service active ျဖစ္ေနလား။ ဒါမွမဟုတ္ enable လုပ္ထားလားဆိုတာကိုျကည့္မယ္။
```bash
[root@serverX ~]# systectl is-active sshd
[root@serverX ~]# systectl is-enabled sshd
```
5. active ျဖစ္ေနတဲ့ loaded units ေတြကုိျကည့္မယ္။ --all option ကေတာ့ active ျဖစ္ေနတဲ့ units ေတြကိုပါျပပါလိမ့္မယ္။
```bash
[root@serverX ~]# systectl list-units --type=service
[root@serverX ~]# systectl list-units --type=services --all
```
6. fail ျဖစ္တဲ့ services ေတြကိုပဲျကည့္မယ္။
```bash
[root@serverX ~]# systectl --failed --type=services
```

---

### Controlling System Service
run ေနတဲ့ service တစ္ခုခုရဲ့ configuration files ေတြကို ျပင္ခ်င္တာပဲျဖစ္ျဖစ္၊ services ေတြကို update လုပ္ခ်င္တာပဲျဖစ္ျဖစ္ system ကို reboot လုပ္ေပးဖို့လို့ပါတယ္။ မသံုးခ်င္ေတာ့လို့ remove လုပ္ခ်င္ရင္လည္း service ကို stop လုပ္ျပိီးမွာပဲ remove လုပ္လို့ရပါမယ္။

ဥပမာအေနနဲ့ sshd service ကို manage လုပ္ျကည့္ပါမယ္။

1. service ရဲ့ status ကိုအရင္ျကည့္ျကည့္မယ္။
```bash
[root@serverX ~]# systectl status sshd.service
```
2. Service ကို stop လုပ္ျပီး status ကိုတစ္ခ်က္ျပန္ျကည့္ျကည့္မယ္။
```bash
[root@serverX ~]# systectl stop sshd.service
[root@serverX ~]# systectl status ssshd.service
```
3. Service ကိုျပန္စျပီး status ကိုျပန္ျကည့္ျကည့္မယ္။
```bash
[root@serverX ~]# systectl start sshd.service
[root@serverX ~]# systectl status sshd.service
```
4. Service ကို restart လုပ္ျပီး status တစ္ခ်က္ျပန္ျကည့္မယ္။
```bash
[root@serverX ~]# systectl restart sshd.service
[root@serverX ~]# systectl status sshd.service
```
5. reload လုပ္ျပီး status ျပန္ျကည့္မယ္။
```bash
[root@serverX ~]# systectl reload sshd.services
[root@serverX ~]# systectl status sshd.services
```

---

### Unit Dependencies
တစ္ခ်ို့ service ေတြက သူတစ္ခုတည္းမဟုတ္ဘဲနဲ့ တစ္ျခား unit ေတြေပါ္ကိုမွိခိုေနတတ္တယ္။ဥပမာ socket unit တစ္ခုက enable ျဖစ္ေနျပီးေတာ့  သူနဲ့ name တူတဲ့ service က enable ျဖစ္မေနဘူးပဲထားပါေတာ့။ အဲ့အခ်ိန္မွာ client စ္ခုခုက အဲ့ socket ကိုလာခ်ိတ္တာနဲ့  service က auto start ျဖစ္သြားတဲ့အေျခအေနမ်ိုးေတြလဲရွိပါတယ္။အဲ့ေတာ့ အဲ့လို service ေတြကို လံုး၀ရပ္ခ်င္တယ္ဆိုရင္ေတာ့ သူနဲ့ဆိုင္တဲ့ တစ္ျခား unit ေတြကိုပါ disable လုပ္ပစ္ဖို့လိုပါလိမ့္မယ္။
```bash
[root@serverX ~]# systectl list-dependencies apache2
```
ဆိုတဲ့ command ကိုအသံုးျပုျပီး apache2 start ျဖစ္ဖို့အတြက္တစ္ျခား ဘယ္ unit ေတြပါ start ျဖစ္ဖို့လိုလဲဆိုတာကို tree နဲ့ေဖာ္ျပထားတာကိုျကည့္ရွုနိုင္ပါတယ္။

---

### Masking Services
system တစ္ခုမွာ conflict services ေတြအမ်ားျကီးရွိေနနိင္ပါတယ္။ဘယ္လိုမ်ိုူူူးလဲဆိုရင္ network ကို manage လုပ္ဖို့ဆိုရင္ network နဲ့  NetworkManager ၊ firewall ဆိုရင္လည္း iptables နဲ့ firewalld ဆိုျပီး conflit ျဖစ္ေနတာေတြကိုေျပာတာပါ။အဲ့ေတာ့ administrator ေတြက အဲ့လို  service ေတြကိုမေတာ္တဆ start လုပ္မိမွာစိုးတဲ့အတြက္ mask လုပ္ျကပါတယ္။ masking လုပ္တယ္ဆိုတာကေတာ့ configuration directories ေတြကို /dev/null နဲ့ link လုပ္လိုက္တာပါ။တကယ္လို့ service ကိုမေတာ္တဆ start လုပ္မိရင္ေတာင္ service က start ျဖစ္လာမွာမဟုတ္ပါဘူး။

![ mask ](/img/sv_mgmt/3.png)

---
