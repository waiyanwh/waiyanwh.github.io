---
layout: post
title:  "Mounting and Unmounting File System in Linux"
subtitle: "Linux မှာ file system တွေကို management လုပ်ကြည့်ခြင်း"
tags: [sysadmin, linux]
---

ကျနော်တို့ linux မှာဆိုရင် desktop user တွေအတွက် storage device တွေကို management လုပ်ရာမှာတော်တော်လေးလွယ်ကူအောင်လုပ်ပေးထားတာကိုတွေ့ရပါတယ်။ ဥပမာ hard disk တစ်ခုကို attach လုပ်လိုက်ပြီဆိုတာနဲ့ ဘယ် file system ပဲဖြစ်ဖြစ် auto attach လုပ်ပြီးသားပဲဗျ။ ဒါပေမဲ့ 2004 ခုနှစ်မတိုင်ခင်တုန်းကဆိုရင် ဒါကို manual လုပ်ပေးရတယ်။ အထူးသဖြင့်ဆိုရင် server တွေမှာအခုထိ manual လုပ်ပေးရတုန်းပါ။ ပထမဆုံး storage device တစ်ခုခုကို manage လုပ်တော့မယ်ဆိုရင် အဲ့ device ကို linux ရဲ့ file system tree မှာ attach သွားလုပ်ပေးရတယ်။အဲ့လို  attach လုပ်ပေးတဲ့ process ကို mounting လို့ခေါ်ပါတယ်။ unix-like operating system တွေ၊ Linux ကဲ့သို့သော operating system တွေမှာဆိုရင် storage devices တွေကို file system tree တစ်ခုတည်းမှာပဲ point အမျိုးမျိုးမှာသွားပြီး attatch သွားလုပ်တယ်။ windows နဲ့ ဘာကွားသွားလဲဆိုတော့ windows မှာဆိုရင် C:\ ၊ D:\ စသည်ဖြင့် file system tree အမျိူးမျိုးနဲ့လုပ်တယ်။ linux ကတော့ အကုန်လုံးက root(/) အောက်မှာပဲရှိတယ်။
boot တက်နေတဲ့အချိန်မှာ ဘယ် devices တွေ mount လုပ်မလဲဆိုတာကိုသိချင်ရင်တော့ /etc/fstab ဆိုတဲ့ file ကိုဖတ်ကြည့်ရင်သိနိုင်ပါတယ်။ အောက်မှာတော့ fedora7 မှာရှိတဲ့ /etc/fstab file ကိုဖတ်ပြထားတာပါ။

![ mount ](/img/mount/1.png)

mount command ကို file systems တွေကို mount လုပ်တဲ့နေရာမှာသုံးပါတယ်။mount ကို ဘာ arguments မှမထည့်ပဲရိုက်မယ်ဆိုရင်တော့ အခုလက်ရှိမှာ mount ဖြစ်နေတဲ့  file systems တွေကိုပြပေးပါတယ်။
```bash
[me@linuxbox ~]$ mount
/dev/sda2 on / type ext3 (rw)
proc on /proc type proc (rw)
sysfs on /sys type sysfs (rw)
devpts on /dev/pts type devpts (rw,gid=5,mode=620)
/dev/sda5 on /home type ext3 (rw)
/dev/sda1 on /boot type ext3 (rw)
tmpfs on /dev/shm type tmpfs (rw)
none on /proc/sys/fs/binfmt_misc type binfmt_misc (rw)
sunrpc on /var/lib/nfs/rpc_pipefs type rpc_pipefs (rw)
fusectl on /sys/fs/fuse/connections type fusectl (rw)
/dev/sdd1 on /media/disk type vfat (rw,nosuid,nodev,noatime,
uhelper=hal,uid=500,utf8,shortname=lower)
twin4:/musicbox on /misc/musicbox type nfs4 (rw,addr=192.168.1.4)
```
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3484102822372133"
     crossorigin="anonymous"></script>
<ins class="adsbygoogle"
     style="display:block; text-align:center;"
     data-ad-layout="in-article"
     data-ad-format="fluid"
     data-ad-client="ca-pub-3484102822372133"
     data-ad-slot="7522283056"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

ဒီမှာဆိုရင် general အားဖြင့် devices , mount point, file system type ဆိုတဲ့ format နဲ့ပြထားပါတယ်။ ဥပမာ ပထမဆုံး line ကိုကြည့်မယ်ဆိုရင် /dev/sda2 ဆိုတဲ့ device ကို root အဖြစ် mount လုပ်ထားတယ်။သူ့ရဲ့ file system type က ext3 ဖြစ်တယ်။ အနောက်က rw တာ့ readable နဲ့ writeable ဖြစ်တယ်ဆိုတာကိုပြောချင်တဲ့ options ဖြစ်ပါတယ်။ ဒါဆို mount command ကိုအသုံးပြုပြီးတော့ CD-ROM တစ်ခုကို mount လုပ်ကြည့်ကြရအောင်။

CD-ROM ကိုမထည့်ခင် mount လို့ရိုက့်ပြီး ဘယ် file system တွေ  mount ဖြစ်နေလဲဆိုတာကိုတစ်ချက်ကြည့်မယ်။
```bash
[me@linuxbox ~]$ mount
/dev/mapper/VolGroup00-LogVol00 on / type ext3 (rw)
proc on /proc type proc (rw)
sysfs on /sys type sysfs (rw)
devpts on /dev/pts type devpts (rw,gid=5,mode=620)
/dev/hda1 on /boot type ext3 (rw)
tmpfs on /dev/shm type tmpfs (rw)
none on /proc/sys/fs/binfmt_misc type binfmt_misc (rw)
sunrpc on /var/lib/nfs/rpc_pipefs type rpc_pipefs (rw)
```

CD-ROM ကိုထည့်ပြီးပြန်ရိုက်ကြည့်မယ်။
```bash
[me@linuxbox ~]$ mount
/dev/mapper/VolGroup00-LogVol00 on / type ext3 (rw)
proc on /proc type proc (rw)
sysfs on /sys type sysfs (rw)
devpts on /dev/pts type devpts (rw,gid=5,mode=620)
/dev/hda1 on /boot type ext3 (rw)
tmpfs on /dev/shm type tmpfs (rw)
none on /proc/sys/fs/binfmt_misc type binfmt_misc (rw)
sunrpc on /var/lib/nfs/rpc_pipefs type rpc_pipefs (rw)
/dev/hdc on /media/live-1.0.10-8 type iso9660 (ro,noexec,nosuid,nodev,uid=500)
```
/dev/hdc နဲ့စတဲ့တစ် line ပိုလာတာကိုတွေ့ရပါမယ်။ဒါကတော့အပေါ်မှာပြောခဲ့သလိုပဲ။ CD-ROM က /dev/hdc အဖြစ်နဲ့ဝင်လာတယ်။အဲ့ /dev/hdc ကို/media/live-1.0.10-8 ဆိုတဲ့ mount point မှာ mount လုပယ်။ file system type ကတော့ iso9660 ဖြစ်တယ်။ကိုယ်တိုင်စမ်းကြည့်မယ်ဆိုရင်တော့ တစ်ေယောက်နဲ့တစ်ယောက် device name တွေကတူမှာမဟုတ်ပါဘူး။အခုကျနော်တို့စမ်းကြည့်ချင်တာက CD-ROM ကို mount command နဲ့ manual mount လုပ်ကြည့်မှာဆိုတော့ CD-ROM ကိုအရင်ဆုံး unmount ပြန်လုပ်ရမယ်။ unmount လုပ်ဖို့ command ကတော့
```bash
[me@linuxbox ~]$ su -
Password:
[root@linuxbox ~]# umount /dev/hdc
```

ဒါဆိုရင် unmount ဖြစ်သွားပြီ။ commandကနေ mount ပြန်လုပ်ကြည့်မယ်။ mount လုပ်ဖို့ mnt အောက်မှာ cdrom ဆိုတဲ့ folder ကို create လုပ်မယ်။
```bash
[root@linuxbox ~]# mkdir /mnt/cdrom
```

ဒါဆိုရင် CD-ROM ကို mount လုပ်မယ်။
```bash
[root@linuxbox ~]# mount -t iso9660 /dev/hdc /mnt/cdrom
```

-t iso9660 ဆိုတာကတော့ iso9660 type နဲ့ mount လုပ်မယ်လို့ပြောတာပါ။ mount လုပ်ပြီးရင် /mnt/cdrom အောက်ကို တစ်ချက်သွားကြည့်မယ်။
```bash
[root@linuxbox ~]# cd /mnt/cdrom
[root@linuxbox cdrom]# ls
```

ဒါဆိုရင် mount လုပ်ထားတာအဆင်ပြေတယ်။အဲ့တော့ဒီ directory အောက်ကနေပဲ unmount ပြန်လုပ်ကြည့်မယ်။

```bash
[root@linuxbox cdrom]# umount /dev/hdc
umount: /mnt/cdrom: device is busy
```
mount လို့မရဘဲ busy ဖြစ်နေတယ်လို့ပြောတာကိုတွေ့ရမှာပါ။ဘာလို့လဲဆိုတော့ device  တစ်ခုကို process တစ်ခုခုကပဲဖြစ်ဖြစ်၊ အဲ့ device ကိုတစ်ယောက်ယောက်က သုံးနေရင်ဖြစ်ဖြစ် unmount ပြန်လုပ်လို့မရပါဘူး။အဲ့တော့အဲ့ directory ထဲကနေပြန်ထွက်ပြီးမှ unmount လုပ်လို့ရမှာဖြစ်တယ်။ ကျနော်တို့ mount, unmount လုပ်တာတွေသိပြီဆိုတော့ linux မှာ device name တွေကို ဘယ်လို determine လုပ်လဲဆက်ကြည့်ရအောင်။ /dev/ directory အောက်ကိုကြည့်မယ်ဆိုရင် device တော်တော်များများကိုတွေ့ရမှာပါ။
```bash
[me@linuxbox ~]$ ls /dev
```

/dev/fd* ဆိုတဲ့ fd နဲ့စတဲ့ device တွေက floppy disks တွေကို ဆိုလိုပါတယ်။

/dev/hd* ဆိုတာတွေကတော့ hard disk တွေကိုဆိုလိုပါတယ်။

/dev/lp* ဆိုတာက printer တွေအတွက်ကိုဆိုလိုတာပါ။

/dev/sd* ဆိုတာကတော့ ကျနော်တို့အခုသုံးနေတဲ့ SATA storage devices တွေ၊ USB storage တွေ၊Card reader တွေအတွက် refer လုပ်ပေးတဲ့ device nameပါ။
ကျနော်တို့ laptop မှာပါတဲ့ internal harddisk ဆိုရင် /dev/sda ၊ နောက် external harddisk တစ်လုံးထပ်တပ်လိုက်ရင် /dev/sdb ၊ USB တစ်ခုထပ်တပ်ရင် /dev/sdc စသည်ဖြင့်အသီးသီးဖော်ပြပါတယ်။
```bash
[me@linuxbox ~]$ sudo mkdir /mnt/flash
[me@linuxbox ~]$ sudo mount /dev/sdb1 /mnt/flash
[me@linuxbox ~]$ df
Filesystem 1K-blocks Used Available Use% Mounted on
/dev/sda2 15115452 5186944 9775164 35% /
/dev/sda5 59631908 31777376 24776480 57% /home
/dev/sda1 147764 17277 122858 13% /boot
tmpfs 776808 0 776808 0% /dev/shm
/dev/sdb1 15560 0 15560 0% /mnt/flash
```

အပေါ်က command တွေက USB device တစ်ခုကို mount လုပ်ထားတာကိုပြတာပါ။ /dev/sdb1 ဆိုပြီးရေးထားတာတွေ့ရမှာပါ။ ဘာလို့လဲဆိုတော့ /dev/sda ကကျနော်တို့ laptop ရဲ့ internal hd မလို့ပါ။အဲ့တော့ နောက်ထပ်တပ်လိုက်တဲ့ USB device  က /dev/sdb ဖြစ်မှာပါ။

### file system အသစ်များပြုလုပ်ခြင်း
ကျနော်တို့ FAT32 format ရှိတဲ့ USB device တစ်ခုကို linux native file system အတိုင်း format ချချင်တယ်ဆိုကြပါစို့။ ဒီလိုလုပ်ရာမှာ နည်းနှစ်နည်းရှိတယ်။ ပထမတစ်နည်းကတော့ ရှိပြီးသား partition table ကကိုယ်လိုချင်တဲ့ဟာမဟုတ်ဘူးဆိုရင် partition table အသစ်တစ်ခုပြန်လုပ်တာဖြစ်ပြီးတော့ ဒုတိယနည်းကတော့ USB တစ်ခုလုံးကိုကိုယ်လိုချင်တဲ့ format နဲ့ file system အသစ်တစ်ခုဖန်တီးယူလိုက်တာပဲဖြစ်ပါတယ်။
fdisk ဆိုတဲ့ command နဲ့ disk တွေကို edit,format,delete and create partition table စတာတွေကိုပြုလုပ်နိုင်ပါတယ်။ ကျနော်တို့အခု fdisk command ကိုအသုံးပြုပြီးတော့ usb device တစ်ခုကို format လုပ်ကြည့်ကြမယ်။

အဲ့အတွက် အရင်ဆုံး usb ကို machine ကနေ unmount အရင်လုပ်မယ်။ပြီးရင် fdisk နဲ့ဘာတွေလုပ်နိုင်မလဲစမ်းကြည့်ကြရအောင်။
```bash
[me@linuxbox ~]$ sudo umount /dev/sdb1
[me@linuxbox ~]$ sudo fdisk /dev/sdb
```

fdisk ကိုသုံးတဲ့နေရာမှာ partition တစ်ခုအတွက်ပဲမဟုတ်ဘဲ device တစ်ခုလုံးကိုလုပ်မှာဖြစ်တဲ့အတွက် /dev/sdb လို့သုံးထားရခြင်းဖြစ်ပါတယ်။
```bash
Command (m for help):m
Command action
a toggle a bootable flag
b edit bsd disklabel
c toggle the dos compatibility flag
d delete a partition
l list known partition types
m print this menu
n add a new partition
o create a new empty DOS partition table
p print the partition table
q quit without saving changes
s create a new empty Sun disklabel
t change a partition's system id
u change display/entry units
v verify the partition table
w write table to disk and exit
x extra functionality (experts only)
Command (m for help):
```

ကျနော်တို့ ပထမဆုံး usb မှာလက်ရှိ ဘယ်လို partition table ရှိလဲဆိုတာကိုကြည့်ကြည့်မယ်။အဲ့လိုကြည့်ချင်ရင် p ဆိုတဲ့ option ကိုရိုက်ပေးရုံပါပဲ။
```
Command (m for help): p
Disk /dev/sdb: 16 MB, 16006656 bytes
1 heads, 31 sectors/track, 1008 cylinders
Units = cylinders of 31 * 512 = 15872 bytes

Device Boot 	Start 	End	Blocks 	Id 	System
/dev/sdb1 	2 	1008 	15608+ 	b     W95 FAT32
```

ဒီ partition table အရဆိုရင် 16MB ဆိုတဲ့ partition တစ်ခုပဲရှိတဲ့ usb stick တစ်ခုကိုတွေ့ရမှာပါ။ foramt ကိုတော့ နောက်ဆုံးက system အောက်မှာတွေ့ရမှာပါ။အခု stick ဆိုရင် Windows 95 FAT32 format ဖြစ်ပါတယ်။အခုအဲ့ partition ကို linux partition အဖြစ်ပြောင်းပစ်မယ်။ id နေရာက b ကတော့ အခုလက်ရှိ partition ရဲ့ type ကိုပြောတာပါ။ အဲ့တော့အဲ့ b ဆိုတာကို linux file partition type ဖြစ်တဲ့ 83 ဆိုတာကိုပြောင်းမယ်။ခုနက fdisk  menu ထဲမှာ l လို့ရိုက်လိုက်ရင် type တွေအများကြီကျလာပါလိမ့်မယ်။အဲ့ထဲမှာ b ကဘာ type လဲဆိုတာကိုတွေ့နိုင်သလို 83 က linux အတွကဖြစ်တယ်ဆိုတာကိုတွေ့ရမှာပါ။ ကျနော်တို့က b ကနေ 83 ကိုပြောင်းချင်တာဆိုတော့ fdisk menu ထဲမှာ
```bash
t change a partition's system id
```

t ဆိုတာကိုရိုက်ပြီးတော့လိုချင်တဲ့ id ကိုပြောင်းပေးလိုက်ရုံပါပဲ။
```bash
Command (m for help): t
Selected partition 1
Hex code (type L to list codes): 83
Changed system type of partition 1 to 83 (Linux)
```
id change တာတော့အဆင်ပြေသွားပြီ။ ဒါပေမဲ့မပြီးသေးပါဘူး။ ဒီအချိန်မှာ device ကသုံးမရဘဲဖြစ်နေပါလိမ့်မယ်။ဘာလို့လဲဆိုတော့ ကျနော်တို့က configure ပဲလုပ်ပေးရသေးတယ်။ အဲ့ configuration ကို device ပေါ်ကို apply မလုပ်ရသေးဘူး။အဲ့တော့ modified partition ကို device ပေါ်ကို write လုပ်ပါမယ်ဆိုတာကိုပြောပေးရမယ်။အဲ့လိုလုပ်ဖို့ w ဆိုတဲ့ option ကိုရိုက်ပေးရုံပါပဲ။
```bash
Command (m for help): w
The partition table has been altered!
Calling ioctl() to re-read partition table.
WARNING: If you have created or modified any DOS 6.x
partitions, please see the fdisk manual page for additional
information.
Syncing disks.
[me@linuxbox ~]$
```

### mkfs ကိုအသုံးပြုပြီး file system အသစ်များပြုလုပ်ခြင်း
ကျနော်တို့ partition တွေကို edit လုပ်ပြီးပြီဆိုတော့ အခု format ချပြီးတော့ file system အသစ်တစ်ခု create လုပ်ကြည့်ပါမယ်။အဲ့လိုလုပ်ဖို့ကျနော်တို့ mkfs ဆိုတဲ့ command ကိုအသုံးပြုပါမယ်။ mkfs ကိုသုံးတဲ့အခါမှာ အနောက်က -t option နဲ့ ပြောင်းချင်တဲ့ format ကိုရိုက်ပြီး device ကိုရွေးပေးလိုက်ရုံပါပဲ။ခုနက stick ကိုကျနော်တို့ ext3 format ကိုပြောင်းကြည့်ပါမယ်။ဒီလိုလုပ်ဖို့ superuser permission လိုပါတယ်။ပြီးတော့ stick ထဲက data တွေလည်း empty ဖြစ်သွားမှာဖြစ်ပါတယ်။
```bash
[me@linuxbox ~]$ sudo mkfs -t ext3 /dev/sdb1
mke2fs 1.40.2 (12-Jul-2012)
Filesystem label=
OS type: Linux
Block size=1024 (log=0)
Fragment size=1024 (log=0)
3904 inodes, 15608 blocks
780 blocks (5.00%) reserved for the super user
First data block=1
Maximum filesystem blocks=15990784
2 block groups
8192 blocks per group, 8192 fragments per group
1952 inodes per group
Superblock backups stored on blocks:
8193
Writing inode tables: done
Creating journal (1024 blocks): done
Writing superblocks and filesystem accounting information: done
This filesystem will be automatically checked every 34 mounts or
180 days, whichever comes first. Use tune2fs -c or -i to override.
[me@linuxbox ~]$
```

ext3 format ကိုတော့ပြောင်းပြီးသွားပြီ။ကျနော်တို့ fat32 ကိုပြန်ပြောင်းချင်တယ်ဆိုရင်လည်းခုနကအတိုင်းပဲ -t option နောက်မှာ vfat ဆိုတဲ့ type လေးကိုအစားထိုးလိုက်ရုံပါပဲ။
```bash
[me@linuxbox ~]$ sudo mkfs -t vfat /dev/sdb1
```
အပေါ်မှာပြောခဲ့တဲ့ fdisk နဲ့ mkfs command နှစ်ခုလုံးကို stick အတွက်တင်မဟုတ်ဘဲ harddisk , USB hard drives တွေအတွက်ပါသုံးလို့ရပါသေးတယ်။
