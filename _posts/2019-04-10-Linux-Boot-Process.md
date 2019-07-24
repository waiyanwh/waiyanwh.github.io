---
layout: post
title:  "Linux boot process"
subtitle: "Red Hat Enterprise Linux 7 Boot Process"
tags: [sysadmin, linux]
---

Modern computer ေတြမွာ power-down state ကေန boot တက္ျပီး login prompt ေပါ္လာတဲ့အခ်ိန္ထိ hardware နဲ့ software အမ်ားျကီးကအတူတကြအလုပ္လုပ္ျကရပါတယ္။ေအာက္မွာေဖာ္ျပထားတဲ့အခ်က္ေတြကေတာ့ red hat operating system boot တက္တဲ့ေနရာမွာလုပ္ေဆာင္တဲ့အခ်က္ေတြျဖစ္ပါတယ္။

၁. power ဖြင့္လိုက္ျပီဆိုတာနဲ့ **system firmware** လို့ေခါ္တဲ့ BIOS က POST(Power on self test) ကို run ျပီး hardware အခ်ို့ကိုစတင္ေမာင္းနွင္ပါတယ္။

၂. **system firmware** ကပဲ UEFI (or) BIOS၊ MBR(Master Boot Record) ထဲမွာ ဘယ္ device ကေန boot တက္ရမွာလဲဆိုတာကိုလိုက္ရွာပါတယ္။

၃. **system firmware** က boot တက္ဖို့ device ကိုေတြ့တဲ့အခါ အဲ့ device ထဲက bootloader ဆီကို system control ကို pass လုပ္ေပးလိုက္ပါတယ္။

၄. bootloader ကေနမွတစ္ဆင့္ disk ထဲက configuration ေတြကိုလုပ္ေဆာင္ပါတယ္။ဥပမာ grub boot menu တက္လာတဲ့အခ်ိန္ကိုေျပာတာပါ။

၅. boot menu ထဲကေနမွ user က os ကို boot  တက္ဖို့ေရြးလိုက္တဲ့အခါမွာ bootloader ကေန  kernel နဲ့ disks ထဲက initramfs ကို loads လုပ္ျပီးေတာ့ memory ေပါ္ကိုတင္လိုက္ပါတယ္။ initramfs ဆိုတာကေတာ့ boot လုပ္ရာမွာ hardware ေတြအတြက္လိုအပ္တဲ့ kernel modules ေတြ၊ init scripts ေတြကို သိမ္းထားတဲ့ archive တစ္ခုျဖစ္ပါတယ္။

၆. အေပါ္ကအဆင့္ေတြျပီးတဲ့အခါ bootloader ကေနတစ္ဆင့္ system control နဲ့ initramfs ရဲ့ location  ကို kernel ဆီကို pass လုပ္ေပးလိုက္ပါတယ္။

၇. အဲ့ေတာ့မွ kernel ကေန initramfs ကိုျကည့္ျပီးေတာ့ hardware ေတြအတြက္လိုအပ္တဲ့့ drives ေတြကိုရွာျပီးေတာ့ သူ့ထဲမွာပါတဲ့ /sbin/init ကို process ID 1 အေနနဲ့ execute လုပ္ပါတယ္။Red Hat Enterprise Linux 7 မွာဆိုရင္ initramfs ထဲမွာ  /sbin/init က systemd  ရဲ့ copy အေနနဲ့ execute လုပ္ပါတယ္။

၈. systemd ကေနမွတစ္ဆင့္ /sysroot ဆိုတဲ့ root file system ကို  mount လုပ္ေပးပါတယ္။

၉. kernel root file system ကေန system root file system အျဖစ္  switch လုပ္ျပီးေတာ့ခုနက copy ကူးထားတဲ့  systemd ကေန execute ထပ္လုပ္ပါတယ္။

၁၀. systemd ကပဲ kernal ရဲ့ command line ေတြ၊ configuration ေတြေပါ္မူတည္ျပီး text based ဒါမွမဟုတ္ graphical user interface(GUI) ကိုတက္လာေအာင္လုပ္ေပးပါတယ္။

## Boot, Reboot and Shutdown
system ကို reboot ဒါမွမဟုတ္ shutdown  ကို command line ကေနျပုလုပ္ခ်င္တဲ့အခါ `systemctl` command ကိုအသံုးျပုနိုင္ပါတယ္။
`systemctl poweroff` ဆိုတဲ့ command ကေတာ့ system မွာ running ျဖစ္ေနတဲ့ services ေတြ၊ mount ျဖစ္ေနတဲ့ file systems ေတြကို ရပ္ျပီးေတာ့ system ကို poweroff လုပ္ပါတယ္။
`systemctl reboot` ဆိုတဲ့ command ကေတာ့ အေပါ္ကအတိုင္းပဲ။ ဒါေပမဲ့ သူက reboot ဆိုတဲ့အတိုင္း reboot ပဲလုပ္ပါတယ္။

## Selecting systemd target
systemd target ဆိုတာကေတာ့ လိုအပ္တဲ့ state ကိုေရာက္ဖို့ လိုအပ္တဲ့ systemd units ေတြကိုဆိုလိုတာပါ။ အေရးပါတဲ့ targets ေတြကိုေအာက္မွာေဖာ္ျပေပးထားပါတယ္။

![Table](/img/boot/1.png){: .center-block :}

targets ေတြမွာ တစ္ခုနဲ့တစ္ခု depends ျဖစ္ေနတာေတြလဲရွိပါတယ္။ `graphical.target` မွာဆိုရင္ `multi-user.target` က depend ျဖစ္ေနပါတယ္။အဲ့လုိ dependencies ေတြကို ေအာက္က command နဲ့့ျကည့္လို့ရပါတယ္။
```bash
[root@serverX ~]# systemctl list-dependencies graphical.target | grep target
```
target ေတြအကုန္လံုးကိုျကည့္ခ်င္တယ္ဆိုရင္ေတာ့
```bash
[root@serverX ~]# systemctl list-units --type=target --all
```
disk ေပါ္မွာ install လုပ္ထားတဲ့ target ေတြကိုျကည့္ခ်င္ရင္ေတာ့
```bash
[root@serverX ~]# systemctl list-unit-files --type=rarget --all
```
## Selecting target at runtime
running ျဖစ္ေနတဲ့ system တစ္ခုမွာ administrators ေတြက ဘယ္ target ေတြကို choose လုပ္မလဲဆိုတာကို `systemctl isolate` ဆိုတဲ့ command နဲ့  ေရြးခ်ယ္ေပးလို့ရပါတယ္။
```bash
[root@serverX ~]# systemctl isolate multi-user.target
```
ဒီလို target ေတြကို isolate  လုပ္တဲ့အခါမွာဆိုရင္ target ကမလိုအပ္တဲ့ services ေတြဆိုရင္ auto ရပ္ပစ္ျပီး target ကလိုအပ္တဲ့ services ေတြဆိုရင္ auto start လုပ္မွာျဖစ္ပါတယ္။

## Setting a default target
system စအလုပ္လုပ္တဲ့အခ်ိန္မွာဆိုရင္ အေပါ္မွာေျပာခဲ့သလိုပဲ initramfs ကေန systemd ကို control ကို pass လုပ္လိုက္တယ္။ အဲ့ဒါျပီးေတာ့ systemd က `default.target`  ကိုစအလုပ္လုပ္တယ္။
`default.target` ကဘာျဖစ္ေနလဲဆိုတာသိခ်င္ရင္
```bash
[root@serverX ~]# systemctl get-default
```
`default.target` ကို change ခ်င္တယ္ဆိုရင္ေတာ့
```basg
[root@serverX ~]# systemctl set-default <target name>
```
ဆိုတဲ့ command  နဲ့ change လို့ရပါတယ္။
boot တက္တဲ့အခ်ိန္မွာလည္း target ေတြကို choose လုပ္ေပးလို့ရပါေသးတယ္။
ဘယ္လိုလုပ္ရမလဲဆိုရင္ေတာ့

၁. system ကို reboot လုပ္ပါတယ္။

၂. bootloader coundown မကုန္သြားေအာင္ key တစ္ခုခုကို နွိပ္ပါ။

၃. grub menu ေပါ္လာတဲ့အခ်ိန္မွာ e ကိုနွိပ္ပါ။

၄. **linux16** နဲ့စတဲ့ line ကိုသြားပါ။ ဘာလို့လဲဆိုေတာ့ သူက kernel command line မလို့ပါ။

၅. ျပီးသြားရင္ **systemd.unit=<ထည့္ခ်င္တဲ့ target name>** ကိုထည့္ပါ။

၆. control + x ကိုနွိပ္ျပီးရင္ပံုမွန္ boot  တက္တဲ့အတိုင္းဆက္လုပ္ပါ။

## Recovering root password
root password ကိုေမ့သြားတဲ့အခါမွာ ဘယ္လို recover လုပ္ရမလဲဆိုတာကေတာ့ system administrator ေတြအကုန္လံုးသိထားသင္တဲ့အရာတစ္ပါ။
administrator က linux live CD တစ္ခုခုနဲ့ boot တက္ျပီးေတာ့ `/root` file system ကို mount လုပ္ျပီးေတာ့ `/etc/shadow` file ကို edit လုပ္တဲ့နည္းကေတာ့အသံုးမ်ားပါတယ္။ဒါေပမဲ့အဲ့လို live CD မလိုတဲ့တစ္ျခားနည္းေတြလည္းရွိပါေသးတယ္။
Red Hat Enterprise Linux 7 မွာဆိုရင္ေတာ့ system ကို pause လုပ္ျပီးေတာ့ root shell ဖြင့္၊ root shell ထဲမွာ လုပ္စရာရွိတာလုပ္ျပီးရင္  system ကို continue ျပန္လုပ္တဲ့ script တစ္ခု initramfs ထဲမွာပါလာပါတယ္။
အေပါ္က target ေရြးတာနဲ့တူပါတယ္။ အဆင့္ 4 အထိလုပ္ျပီးတဲ့အခါမွာ `rb.break` ဆိုတာေလးကို ထပ္ထည့္လိုက္ျပီး ပံုမွန္ boot တက္တဲ့အတိုင္းလုပ္ေဆာင္ပါ။
အဲ့လိုလုပ္ျပီတဲ့အခ်ိန္မွာ root shell တက္လာပါလိမ့္မယ္။
အဲ့အခ်ိန္မွာ root password ကို recover လုပ္ဖို့ root file system ကို read/write permission နဲ့ mount လုပ္ရပါမယ္။
```bash
switch_root# mount -oremount,rw /sysroot
```
/sysroot ကို root file system အျဖစ္အလုပ္လုပ္တဲ့ chroot jail ထဲကို၀င္ပါမယ္။
```bash
switch_root# chroot /sysroot
```
ျပီးရင္ေတာ့ root အတြက္ password အသစ္ေပးပါမယ္
```bash
sh-4.2# passwd root
```
ျပီးတဲ့အခါမွာ label  မထိုးရေသးတဲ့ file ေတြကို boot တက္ခ်ိန္မွာ auto label ထိုးေအာင္လုပ္ရပါမယ္။
```bash
sh-4.2# touch /.autorelable
```
ျပီးတဲ့အခါမွာေတာ့ exit နွစ္ခါလုပ္ရပ္မယ္။ပထမ exit က chroot jail ထဲကေနထြက္တာပါ။ဒုတိယ exit ကေတာ့ root shell ထဲကေနထြက္တာပါ။
ထြက္ျပီးတဲ့အခါမွာေတာ့ system က SELinux ကို relable လုပ္ျပီး reboot လုပ္ပါတယ္။ျပန္တက္လာတဲ့အခါမွာေတာ့ မိမိေပးထားတဲ့ root password နဲ့အသံုးျပုနိုင္ပါျပီ။
