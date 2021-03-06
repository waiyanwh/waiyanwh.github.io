---
layout: post
title:  "Linux boot process"
subtitle: "Red Hat Enterprise Linux 7 ရဲ့ Boot Process"
tags: [sysadmin, linux]
---

Modern computer တွေမှာ power-down state ကနေ boot တက်ပြီး login prompt ပေါ်လာတဲ့အချိန်ထိ hardware နဲ့ software အများကြီးကအတူတကွအလုပ်လုပ်ကြရပါတယ်။အောက်မှာဖော်ပြထားတဲ့အချက်တွေကတော့ red hat operating system boot တက်တဲ့နေရာမှာလုပ်ဆောင်တဲ့အချက်တွေဖြစ်ပါတယ်။

၁. power ဖွင့်လိုက်ပြီဆိုတာနဲ့ **system firmware** လို့ခေါ်တဲ့ BIOS က POST(Power on self test) ကို run ပြီး hardware အချို့ကိုစတင်မောင်းနှင်ပါတယ်။

၂. **system firmware** ကပဲ UEFI (or) BIOS၊ MBR(Master Boot Record) ထဲမှာ ဘယ် device ကနေ boot တက်ရမှာလဲဆိုတာကိုလိုက်ရှာပါတယ်။

၃. **system firmware** က boot တက်ဖို့ device ကိုတွေ့တဲ့အခါ အဲ့ device ထဲက bootloader ဆီကို system control ကို pass လုပ်ပေးလိုက်ပါတယ်။

၄. bootloader ကနေမှတစ်ဆင့် disk ထဲက configuration တွေကိုလုပ်ဆောင်ပါတယ်။ဥပမာ grub boot menu တက်လာတဲ့အချိန်ကိုပြောတာပါ။

၅. boot menu ထဲကနေမှ user က os ကို boot  တက်ဖို့ရွေးလိုက်တဲ့အခါမှာ bootloader ကနေ  kernel နဲ့ disks ထဲက initramfs ကို loads လုပ်ပြီးတော့ memory ပေါ်ကိုတင်လိုက်ပါတယ်။ initramfs ဆိုတာကတော့ boot လုပ်ရာမှာ hardware တွေအတွက်လိုအပ်တဲ့ kernel modules တွေ၊ init scripts တွေကို သိမ်းထားတဲ့ archive တစ်ခုဖြစ်ပါတယ်။

၆. အပေါ်ကအဆင့်တွေပြီးတဲ့အခါ bootloader ကနေတစ်ဆင့် system control နဲ့ initramfs ရဲ့ location  ကို kernel ဆီကို pass လုပ်ပေးလိုက်ပါတယ်။

၇. အဲ့တော့မှ kernel ကနေ initramfs ကိုကြည့်ပြီးတော့ hardware တွေအတွက်လိုအပ်တဲ့ drives တွေကိုရှာပြီးတော့ သူ့ထဲမှာပါတဲ့ /sbin/init ကို process ID 1 အနေနဲ့ execute လုပ်ပါတယ်။Red Hat Enterprise Linux 7 မှာဆိုရင် initramfs ထဲမှာ  /sbin/init က systemd  ရဲ့ copy အနေနဲ့ execute လုပ်ပါတယ်။

၈. systemd ကနေမှတစ်ဆင့် /sysroot ဆိုတဲ့ root file system ကို  mount လုပ်ပေးပါတယ်။

၉. kernel root file system ကနေ system root file system အဖြစ်  switch လုပ်ပြီးတော့ခုနက copy ကူးထားတဲ့  systemd ကနေ execute ထပ်လုပ်ပါတယ်။

၁၀. systemd ကပဲ kernal ရဲ့ command line တွေ၊ configuration တွေပေါ်မူတည်ပြီး text based ဒါမှမဟုတ် graphical user interface(GUI) ကိုတက်လာအောင်လုပ်ပေးပါတယ်။

## Boot, Reboot and Shutdown
system ကို reboot ဒါမှမဟုတ် shutdown  ကို command line ကနေပြုလုပ်ချင်တဲ့အခါ `systemctl` command ကိုအသုံးပြုနိုင်ပါတယ်။
`systemctl poweroff` ဆိုတဲ့ command ကတော့ system မှာ running ဖြစ်နေတဲ့ services တွေ၊ mount ဖြစ်နေတဲ့ file systems တွေကို ရပ်ပြီးတော့ system ကို poweroff လုပ်ပါတယ်။
`systemctl reboot` ဆိုတဲ့ command ကတော့ အပေါ်ကအတိုင်းပဲ။ ဒါပေမဲ့ သူက reboot ဆိုတဲ့အတိုင်း reboot ပဲလုပ်ပါတယ်။

## Selecting systemd target
systemd target ဆိုတာကတော့ လိုအပ်တဲ့ state ကိုရောက်ဖို့ လိုအပ်တဲ့ systemd units တွေကိုဆိုလိုတာပါ။ အရေးပါတဲ့ targets တွေကိုအောက်မှာဖော်ပြပေးထားပါတယ်။

![Table](/img/boot/1.png){: .center-block :}

targets တွေမှာ တစ်ခုနဲ့တစ်ခု depends ဖြစ်နေတာတွေလဲရှိပါတယ်။ `graphical.target` မှာဆိုရင် `multi-user.target` က depend ဖြစ်နေပါတယ်။အဲ့လို dependencies တွေကို အောက်က command နဲ့ကြည့်လို့ရပါတယ်။
```bash
[root@serverX ~]# systemctl list-dependencies graphical.target | grep target
```
target တွေအကုန်လုံးကိုကြည့်ချင်တယ်ဆိုရင်တော့
```bash
[root@serverX ~]# systemctl list-units --type=target --all
```
disk ပေါ်မှာ install လုပ်ထားတဲ့ target တွေကိုကြည့်ချင်ရင်တော့
```bash
[root@serverX ~]# systemctl list-unit-files --type=rarget --all
```
## Selecting target at runtime
running ဖြစ်နေတဲ့ system တစ်ခုမှာ administrators တွေက ဘယ် target တွေကို choose လုပ်မလဲဆိုတာကို `systemctl isolate` ဆိုတဲ့ command နဲ့  ရွေးချယ်ပေးလို့ရပါတယ်။
```bash
[root@serverX ~]# systemctl isolate multi-user.target
```
ဒီလို target တွေကို isolate  လုပ်တဲ့အခါမှာဆိုရင် target ကမလိုအပ်တဲ့ services တွေဆိုရင် auto ရပ်ပစ်ပြီး target ကလိုအပ်တဲ့ services တွေဆိုရင် auto start လုပ်မှာဖြစ်ပါတယ်။

## Setting a default target
system စအလုပ်လုပ်တဲ့အချိန်မှာဆိုရင် အပေါ်မှာပြောခဲ့သလိုပဲ initramfs ကနေ systemd ကို control ကို pass လုပ်လိုက်တယ်။ အဲ့ဒါပြီးတော့ systemd က `default.target`  ကိုစအလုပ်လုပ်တယ်။
`default.target` ကဘာဖြစ်နေလဲဆိုတာသိချင်ရင်
```bash
[root@serverX ~]# systemctl get-default
```
`default.target` ကို change ချင်တယ်ဆိုရင်တော့
```basg
[root@serverX ~]# systemctl set-default <target name>
```
ဆိုတဲ့ command  နဲ့ change လို့ရပါတယ်။
boot တက်တဲ့အချိန်မှာလည်း target တွေကို choose လုပ်ပေးလို့ရပါသေးတယ်။
ဘယ်လိုလုပ်ရမလဲဆိုရင်တော့

၁. system ကို reboot လုပ်ပါတယ်။

၂. bootloader coundown မကုန်သွားအောင် key တစ်ခုခုကို နှိပ်ပါ။

၃. grub menu ပေါ်လာတဲ့အချိန်မှာ e ကိုနှိပ်ပါ။

၄. **linux16** နဲ့စတဲ့ line ကိုသွားပါ။ ဘာလို့လဲဆိုတော့ သူက kernel command line မလို့ပါ။

၅. ပြီးသွားရင် **systemd.unit=<ထည့်ချင်တဲ့ target name>** ကိုထည့်ပါ။

၆. control + x ကိုနှိပ်ပြီးရင်ပုံမှန် boot  တက်တဲ့အတိုင်းဆက်လုပ်ပါ။

## Recovering root password
root password ကိုမေ့သွားတဲ့အခါမှာ ဘယ်လို recover လုပ်ရမလဲဆိုတာကတော့ system administrator တွေအကုန်လုံးသိထားသင်တဲ့အရာတစ်ပါ။
administrator က linux live CD တစ်ခုခုနဲ့ boot တက်ပြီးတော့ `/root` file system ကို mount လုပ်ပြီးတော့ `/etc/shadow` file ကို edit လုပ်တဲ့နည်းကတော့အသုံးများပါတယ်။ဒါပေမဲ့အဲ့လို live CD မလိုတဲ့တစ်ခြားနည်းတွေလည်းရှိပါသေးတယ်။
Red Hat Enterprise Linux 7 မှာဆိုရင်တော့ system ကို pause လုပ်ပြီးတော့ root shell ဖွင့်၊ root shell ထဲမှာ လုပ်စရာရှိတာလုပ်ပြီးရင်  system ကို continue ပြန်လုပ်တဲ့ script တစ်ခု initramfs ထဲမှာပါလာပါတယ်။
အပေါ်က target ရွေးတာနဲ့တူပါတယ်။ အဆင့် 4 အထိလုပ်ပြီးတဲ့အခါမှာ `rb.break` ဆိုတာလေးကို ထပ်ထည့်လိုက်ပြီး ပုံမှန် boot တက်တဲ့အတိုင်းလုပ်ဆောင်ပါ။
အဲ့လိုလုပ်ပြီတဲ့အချိန်မှာ root shell တက်လာပါလိမ့်မယ်။
အဲ့အချိန်မှာ root password ကို recover လုပ်ဖို့ root file system ကို read/write permission နဲ့ mount လုပ်ရပါမယ်။
```bash
switch_root# mount -oremount,rw /sysroot
```
/sysroot ကို root file system အဖြစ်အလုပ်လုပ်တဲ့ chroot jail ထဲကိုဝင်ပါမယ်။
```bash
switch_root# chroot /sysroot
```
ပြီးရင်တော့ root အတွက် password အသစ်ပေးပါမယ်
```bash
sh-4.2# passwd root
```
ပြီးတဲ့အခါမှာ label  မထိုးရသေးတဲ့ file တွေကို boot တက်ချိန်မှာ auto label ထိုးအောင်လုပ်ရပါမယ်။
```bash
sh-4.2# touch /.autorelable
```
ပြီးတဲ့အခါမှာတော့ exit နှစ်ခါလုပ်ရပ်မယ်။ပထမ exit က chroot jail ထဲကနေထွက်တာပါ။ဒုတိယ exit ကတော့ root shell ထဲကနေထွက်တာပါ။
ထွက်ပြီးတဲ့အခါမှာတော့ system က SELinux ကို relable လုပ်ပြီး reboot လုပ်ပါတယ်။ပြန်တက်လာတဲ့အခါမှာတော့ မိမိပေးထားတဲ့ root password နဲ့အသုံးပြုနိုင်ပါပြီ။
