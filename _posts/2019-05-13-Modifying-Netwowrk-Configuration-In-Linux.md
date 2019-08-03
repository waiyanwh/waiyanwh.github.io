---
layout: post
title:  "Modifying Network Configuration in Linux"
subtitle: "Linux မွာ network configuration ေတြကို ျပင္ဆင္ျကည့္ျခင္း"
tags: [sysadmin, linux]
---

Network ကို configuration လုပ္ေတာ့မယ္ဆိုရင္ network interfaces ေတြရဲ့ configuration files ေတြကိုျပုျပင္ျခင္းနဲ့လည္းလုပ္လို့ရပါတယ္။ interface configuration file ဆိုတာကေတာ့ network devices ေတြရဲ့ software interfaces ေတြကို control လုပ္တဲ့ files ေတြကိုေျပာတာပါ။ဒီ file ေတြကိုမ်ားေသာအားျဖင့္ `/etc/sysconfig/network-scripts/ifcfg-<name>` ဆိုတဲ့ေနရာမွာထားပါတယ္။ `<name>` ဆိုတာကေတာ့ device ေတြရဲ့ interface name ကိုေျပာတာပါ။ေအာက္ကဇယားက variables ေတြကေတာ့ interface ေတြကို static (or) dynamic configuration လုပ္တဲ့အခ်ိန္မွာသံုးတဲ့variables ေတြပါ။

![Configuration Options](/img/modify/1.png){: .center-block :}

ပံုထဲမွာဆိုရင္ ip address, prefix, gateway ေတြ၊  DNS အတြက္ numbers ေတြကို assign လုပ္ေပးထားတာကိုျမင္ရမွာပါ။
configuration file ကို ျပုျပင္ျပီးရင္ေတာ့ `nmcli con reload` ဆိုတဲ့ command နဲ့ NetworkManager က configuration file ကို read လုပ္ေအာင္လုပ္ေပးရပါမယ္။အဲ့လုိလုပ္ျပီးတဲ့အခါမွာ interfaces ေတြကိုလည္း restart လုပ္ဖို့လိုအပ္ပါေသးတယ္။

```bash
[root@demo ~]# nmcli con reload
[root@demo ~]# nmcli con down "System eth0"
[root@demo ~]# nmcli con up "System eth0"
```
အဲ့ဒါဆိုရင္ က်ေနာ္တို့ exercise ေလးလုပ္ျကည့္ျကရေအာင္။
၁. root user အေနနဲ့ login ၀င္ပါ။ျပီးရင္ serverX  နဲ့ desktopX ရဲ့ `/etc/sysconfig/network-scripts/ifcfg-eth0` ကို IPv4 address 10.0.x.x နဲ့ ip ေပးပါမယ္။
```bash
[root@serverX ~]# echo "IPADDR1=10.0.x.1" >> /etc/sysconfig/network-scripts/ifcfg-eth0
[root@desktopX ~]# echo "IPADDR1=10.0.x.1" >> /etc/sysconfig/network-scripts/ifcfg-eth0
```
၂. Network prefix ထည့္ပါမယ္။
```bash
root@serverX ~]# echo "PREFIX1=24" >> /etc/sysconfig/network-scripts/ifcfg-eth0
root@desktopX ~]# echo "PREFIX1=24" >> /etc/sysconfig/network-scripts/ifcfg-eth0
```
၃. အေပါ္မွာေျပာခဲ့သလိုပဲ config file ကိုျပင္ျပီးျပီဆိုရင္လုပ္ရမဲ့ step ေတြအတိုင္းလုပ္ပါမယ္။
```bash
[root@serverX ~]# nmcli con reload
[root@serverX ~]# nmcli con down "System eth0"
[root@serverX ~]# nmcli con up "System eth0"
[root@desktopX ~]# nmcli con reload
[root@desktopX ~]# nmcli con down "System eth0"
[root@desktopX ~]# nmcli con up "System eth0"
```
၄. On serverX, က်ေနာ္တုိ့ configuration လုပ္ခဲ့တဲ့ network address ကို check လုပ္ျကည့္ပါမယ္။
```bash
[root@serverX ~]# ip addr
```
၅. On serverX, ping ျကည့္မယ္။
```bash
[root@serverX ~]# ping 10.0.x.2
```
၆. On desktopX, ip ျကည့္မယ္။
```bash
[root@serverX ~]# ip addr
```
၇. On desktopX, ping ျကည့္မယ္။
```bash
[root@serverX ~]# ping 10.0.x.1
```
##Configuring Host Names and Name Resolution
`hostname` command ကိုရိုက္ျကည့္မယ္ဆိုရင္ system ရဲ့ hostname ကိုျမင္ရမွာပါ။
```bash
[root@demo ~]# hostname
demo.example.com
```
hostname ကိုသိခ်င္ရင္ `/etc/hostname` file ကိုဖတ္ျကည့္ရင္လည္းသိနိုင္ပါတယ္။
`hostnamectl` command ကိုအသံုးျပုျပီးေတာ့လည္း system ရဲ့ hostname ကို modify လုပ္နိုင္သလို hostname status ကိုလည္းျကည့္လို့ရပါတယ္။
```bash
[root@demo ~]# hostnamectl set-hostname demo.example.com
[root@demo ~]# hostnamectl status
   Static hostname: demo.example.com
         Icon name: computer-laptop
           Chassis: laptop
        Machine ID: d20119f5de9f47beb5aa1123b6332047
           Boot ID: c4fd288724b3449a8cd8a0b3c0da7d53
  Operating System: Ubuntu 18.04 LTS
            Kernel: Linux 4.15.0-23-generic
      Architecture: x86-64
[root@demo ~]# cat /etc/hostname
demo.example.com
```
## Configuring Name Resolution
stub resolver က name to ip, ip to name ကို convert လုပ္ေပးပါတယ္။
အရင္ဆံုး `/etc/hosts` file ကို check လုပ္ျကည့္ပါ။

![etc hosts](/img/modify/2.png){: .center-block :}

`getent hosts hostname` command ကိုသံုးျပီးေတာ့ `/etc/hosts` file နဲ့  host name resoultion ကို test လုပ္ျကည့္လို့ရပါတယ္။
တကယ္လို့ဘာမွမေတြ့ရဘူးဆိုရင္ေတာ့ stub resolver ကေနတစ္ဆင့္  DNS server ဆီကေနရွာေပးပါလိမ့္မယ္။ ဒီအလုပ္ကို `/etc/resolv.conf` ဆိုတဲ့ config file က လုပ္ေပးပါတယ္။
* nameserver: DNS server ရဲ့ ip address ကို query အေနနဲ့ေရးထားတာပါ။ဒီေနရာမွာဆိုရင္ အနည္းဆံုး 3 ခုေလာက္ေပးထားဖို့လိုအပ္ပါတယ္။ဒါမွတစ္ခု down သြားရင္တစ္ျခားတစ္ခုကို backup အေနနဲ့အသံုးျပုလို့ရမွာပါ။

* search: hostname ကို ရွာဖို့အတြက္ search list ပါ။ search list မွာပါတဲ့ domain name ေတြက local domain name ေတြျဖစ္ပါတယ္။ ဒီ search option ကိုသံုးမယ္ဆိုရင္ search list ထဲမွာပါတဲ့ domain ေတြကသာ local domain name ေတြမဟုတ္ဘူးဆိုရင္ network traffic ေတြအမ််ားျကီးကိုျဖစ္ေပါ္ေစမွာပါ။

![etc resolv](/img/modify/3.png){: .center-block :}

NetworkManager က connection configuration file ထဲမွာပါတဲ့ DNS setting ေတြကို အသံုးျပုျပီးေတာ့ `/etc/resolv.conf` file ကို update လုပ္ပါတယ္။ connections ေတြကို modify လုပ္ဖို့ `nmcli` command ကိုပဲအသံုးျပုပါတယ္။

![commands](/img/modify/4.png){: .center-block :}

`nmcli con mod ID ipv4.dns IP` command က ရွိျပီးသား DNS settings ေတြကို အသစ္ေပးထားတဲ့ ip lists နဲ့  replace လုပ္ပါတယ္။ ipv4.dns ေရွ့က +/- symbols ေတြကို  entry ကိုေတြကို add(or)remove လုပ္ဖို့သံုးပါတယ္။

![commands](/img/modify/5.png){: .center-block :}

DNS server ရဲ့ connectivity ကို စမ္းဖို့ `host HOSTNAME` command ကိုအသံုးျပုနိုင္ပါတယ္။
```bash
[root@demo ~]# nmcli con mod ID +ipv4.dns IP
```
က်ေနာ္တို့ exercise လးလုပ္လုိက္ရင္ပိုျပီးေတာ့နားလည္သြားမွာပါ။
၁. System  ရဲ့ current hostname ကိုျကည့္ပါမယ္။
```bash
[student@serverX ~]$ hostname
serverX.example.com
```
၂. System hostname ရဲ့ status ကိုျကည့္ပါမယ္။

![commands](/img/modify/6.png){: .center-block :}

၃. အေပါ္က hostname အတိုင္းမိမိစက္ကို configure လုပ္ပါမယ္။
```bash
[student@serverX ~]$ sudo hostnamectl set-hostname serverX.example.com
```
၄. configure လုပ္ထားတာမွန္၊ မမွန္တစ္ခ်က္ျကည့္မယ္။
```bash
[student@serverX ~]$ cat /etc/hostname
```
၅. hostname ရဲ့ status ကိုျကည့္မယ္။

![commands](/img/modify/7.png){: .center-block :}

၆. hostname ကို ယာယီ change ျကည့္မယ္။
```bash
[student@serverX ~]$ sudo hostname testname
```
၇. Current hostname ကိုတစ္ခ်က္ျပန္ျကည့္ျကည့္မယ္။
```bash
[student@serverX ~]$ hostname
testname
```
၈. ယာယီေပးတာျဖစ္တဲ့အတြက္ `/etc/hostname` file  ကေျပာင္းမွာမဟုတ္ပါဘူး။
```bash
[student@serverX ~]$ cat /etc/hostname
serverX.example.com
```
၉. System ကို reboot ခ်ပါ။
```bash
[student@serverX ~]$ reboot
```
၁၀. reboot ခ်ျပီးျပန္တက္လာရင္ hostname ကိုတစ္ခ်က္ျပန္ျကည့္ျကည့္ပါ။
```bash
[student@serverX ~]$ hostname
serverX.example.com
```
serverX ပဲျပန္ျဖစ္ေနပါတယ္။ permanent ေျပာင္းခ်င္ရင္ေတာ့ `hostnamectl` command နဲ့ေျပာင္းရမွာျဖစ္ပါတယ္။
