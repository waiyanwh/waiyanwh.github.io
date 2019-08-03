---
layout: post
title:  "Mounting and Unmounting File System in Linux"
subtitle: "Linux မွာ file system ေတြကို management လုပ္ျကည့္ျခင္း"
tags: [sysadmin, linux]
---

က်ေနာ္တို့ linux မွာဆိုရင္ desktop user ေတြအတြက္ storage device ေတြကို management လုပ္ရာမွာေတာ္ေတာ္ေလးလြယ္ကူေအာင္လုပ္ေပးထားတာကိုေတြ့ရပါတယ္။ ဥပမာ hard disk တစ္ခုကို attach လုပ္လိုက္ျပီဆိုတာနဲ့ ဘယ္ file system ပဲျဖစ္ျဖစ္ auto attach လုပ္ျပီးသားပဲဗ်။ ဒါေပမဲ့ 2004 ခုနွစ္မတိုင္ခင္တုနး္ကဆိုရင္ ဒါကို manual လုပ္ေပးရတယ္။ အထူးသျဖင့္ဆိုရင္ server ေတြမွာအခုထိ manual လုပ္ေပးရတုန္းပါ။ ပထမဆံုး storage device တစ္ခုခုကို manage လုပ္ေတာ့မယ္ဆိုရင္ အဲ့ device ကို linux ရဲ့ file system tree မွာ attach သြားလုပ္ေပးရတယ္။အဲ့လို  attach လုပ္ေပးတဲ့ process ကို mounting လို့ေခါ္ပါတယ္။ unix-like operating system ေတြ၊ Linux ကဲ့သို့ေသာ operating system ေတြမွာဆိုရင္ storage devices ေတြကို file system tree တစ္ခုတည္းမွာပဲ point အမ်ိုးမ်ိုးမွာသြားျပီး attatch သြားလုပ္တယ္။ windows နဲ့ ဘာကြားသြားလဲဆိုေတာ့ windows မွာဆိုရင္ C:\ ၊ D:\ စသည္ျဖင့္ file system tree အမ်ိူးမ်ိုးနဲ့လုပ္တယ္။ linux ကေတာ့ အကုန္လုံးက root(/) ေအာက္မွာပဲရွိတယ္။
boot တက္ေနတဲ့အခ်ိန္မွာ ဘယ္ devices ေတြ mount လုပ္မလဲဆိုတာကိုသိခ်င္ရင္ေတာ့ /etc/fstab ဆိုတဲ့ file ကိုဖတ္ျကည့္ရင္သိနိုင္ပါတယ္။ ေအာက္မွာေတာ့ fedora7 မွာရွိတဲ့ /etc/fstab file ကိုဖတ္ျပထားတာပါ။

![ mount ](/img/mount/1.png)

mount command ကို file systems ေတြကို mount လုပ္တဲ့ေနရာမွာသံုးပါတယ္။mount ကို ဘာ arguments မွမထည့္ပဲရိုက္မယ္ဆိုရင္ေတာ့ အခုလက္ရွိမွာ mount ျဖစ္ေနတဲ့  file systems ေတြကိုျပေပးပါတယ္။
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

ဒီမွာဆိုရင္ general အားျဖင့္ devices , mount point, file system type ဆိုတဲ့ format နဲ့ျပထားပါတယ္။ ဥပမာ ပထမဆံုး line ကိုျကည့္မယ္ဆိုရင္ /dev/sda2 ဆိုတဲ့ device ကို root အျဖစ္ mount လုပ္ထားတယ္။သူ့ရဲ့ file system type က ext3 ျဖစ္တယ္။ အေနာက္က rw တာ့ readable နဲ့ writeable ျဖစ္တယ္ဆိုတာကိုေျပာခ်င္တဲ့ options ျဖစ္ပါတယ္။ ဒါဆို mount command ကိုအသံုးျပုျပီးေတာ့ CD-ROM တစ္ခုကို mount လုပ္ျကည့္ျကရေအာင္။

CD-ROM ကိုမထည့္ခင္ mount လို့ရိုက့္ျပီး ဘယ္ file system ေတြ  mount ျဖစ္ေနလဲဆိုတာကိုတစ္ခ်က္ျကည့္မယ္။
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

CD-ROM ကိုထည့္ျပီးျပန္ရိုက္ျကည့္မယ္။
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
/dev/hdc နဲ့စတဲ့တစ္ line ပိုလာတာကိုေတြ့ရပါမယ္။ဒါကေတာ့အေပါ္မွာေျပာခဲ့သလိုပဲ။ CD-ROM က /dev/hdc အျဖစ္နဲ့၀င္လာတယ္။အဲ့ /dev/hdc ကုိ/media/live-1.0.10-8 ဆိုတဲ့ mount point မွာ mount လုပယ္။ file system type ကေတာ့ iso9660 ျဖစ္တယ္။ကိုယ္တိုင္စမ္းျကည့္မယ္ဆိုရင္ေတာ့ တစ္ေေယာက္နဲ့တစ္ေယာက္ device name ေတြကတူမွာမဟုတ္ပါဘူး။အခုက်ေနာ္တို့စမး္ျကည့္ခ်င္တာက CD-ROM ကို mount command နဲ့ manual mount လုပ္ျကည့္မွာဆိုေတာ့ CD-ROM ကိုအရင္ဆံုး unmount ျပန္လုပ္ရမယ္။ unmount လုပ္ဖို့ command ကေတာ့
```bash
[me@linuxbox ~]$ su -
Password:
[root@linuxbox ~]# umount /dev/hdc
```

ဒါဆိုရင္ unmount ျဖစ္သြားျပီ။ commandကေန mount ျပန္လုပ္ျကည့္မယ္။ mount လုပ္ဖို့ mnt ေအာက္မွာ cdrom ဆိုတဲ့ folder ကို create လုပ္မယ္။
```bash
[root@linuxbox ~]# mkdir /mnt/cdrom
```

ဒါဆိုရင္ CD-ROM ကို mount လုပ္မယ္။
```bash
[root@linuxbox ~]# mount -t iso9660 /dev/hdc /mnt/cdrom
```

-t iso9660 ဆိုတာကေတာ့ iso9660 type နဲ့ mount လုပ္မယ္လို့ေျပာတာပါ။ mount လုပ္ျပီးရင္ /mnt/cdrom ေအာက္ကို တစ္ခ်က္သြားျကည့္မယ္။
```bash
[root@linuxbox ~]# cd /mnt/cdrom
[root@linuxbox cdrom]# ls
```

ဒါဆိုရင္ mount လုပ္ထားတာအဆင္ေျပတယ္။အဲ့ေတာ့ဒီ directory ေအာက္ကေနပဲ unmount ျပန္လုပ္ျကည့္မယ္။

```bash
[root@linuxbox cdrom]# umount /dev/hdc
umount: /mnt/cdrom: device is busy
```
mount လို့မရဘဲ busy ျဖစ္ေနတယ္လို့ေျပာတာကိုေတြ့ရမွာပါ။ဘာလို့လဲဆိုေတာ့ device  တစ္ခုကို process တစ္ခုခုကပဲျဖစ္ျဖစ္၊ အဲ့ device ကိုတစ္ေယာက္ေယာက္က သံုးေနရင္ျဖစ္ျဖစ္ unmount ျပန္လုပ္လို့မရပါဘူး။အဲ့ေတာ့အဲ့ directory ထဲကေနျပန္ထြက္ျပီးမွ unmount လုပ္လို့ရမွာျဖစ္တယ္။ က်ေနာ္တို့ mount, unmount လုပ္တာေတြသိျပီဆိုေတာ့ linux မွာ device name ေတြကို ဘယ္လို determine လုပ္လဲဆက္ျကည့္ရေအာင္။ /dev/ directory ေအာက္ကုိျကည့္မယ္ဆိုရင္ device ေတာ္ေတာ္မ်ားမ်ားကိုေတြ့ရမွာပါ။
```bash
[me@linuxbox ~]$ ls /dev
```

/dev/fd* ဆိုတဲ့ fd နဲ့စတဲ့ device ေတြက floppy disks ေတြကို ဆိုလိုပါတယ္။

/dev/hd* ဆိုတာေတြကေတာ့ hard disk ေတြကုိဆိုလိုပါတယ္။

/dev/lp* ဆိုတာက printer ေတြအတြက္ကိုဆိုလိုတာပါ။

/dev/sd* ဆိုတာကေတာ့ က်ေနာ္တို့အခုသံုးေနတဲ့ SATA storage devices ေတြ၊ USB storage ေတြ၊Card reader ေတြအတြက္ refer လုပ္ေပးတဲ့ device nameပါ။
က်ေနာ္တို့ laptop မွာပါတဲ့ internal harddisk ဆိုရင္ /dev/sda ၊ ေနာက္ external harddisk တစ္လံုးထပ္တပ္လိုက္ရင္ /dev/sdb ၊ USB တစ္ခုထပ္တပ္ရင္ /dev/sdc စသည္ျဖင့္အသီးသီးေဖာ္ျပပါတယ္။
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

အေပါ္က command ေတြက USB device တစ္ခုကို mount လုပ္ထားတာကိုျပတာပါ။ /dev/sdb1 ဆိုျပီးေရးထားတာေတြ့ရမွာပါ။ ဘာလို့လဲဆိုေတာ့ /dev/sda ကက်ေနာ္တို့ laptop ရဲ့ internal hd မလို့ပါ။အဲ့ေတာ့ ေနာက္ထပ္တပ္လိုက္တဲ့ USB device  က /dev/sdb ျဖစ္မွာပါ။

### file system အသစ္မ်ားျပုလုပ္ျခင္း
က်ေနာ္တို့ FAT32 format ရွိတဲ့ USB device တစ္ခုကို linux native file system အတိုင္း format ခ်ခ်င္တယ္ဆိုျကပါစို့။ ဒီလိုလုပ္ရာမွာ နည္းနွစ္နည္းရွိတယ္။ ပထမတစ္နည္းကေတာ့ ရွိျပီးသား partition table ကကိုယ္လိုခ်င္တဲ့ဟာမဟုတ္ဘူးဆိုရင္ partition table အသစ္တစ္ခုျပန္လုပ္တာျဖစ္ျပီးေတာ့ ဒုတိယနည္းကေတာ့ USB တစ္ခုလံုးကိုကိုယ္လိုခ်င္တဲ့ format နဲ့ file system အသစ္တစ္ခုဖန္တီးယူလိုက္တာပဲျဖစ္ပါတယ္။
fdisk ဆိုတဲ့ command နဲ့ disk ေတြကို edit,format,delete and create partition table စတာေတြကိုျပုလုပ္နိုင္ပါတယ္။ က်ေနာ္တို့အခု fdisk command ကိုအသံုးျပုျပီးေတာ့ usb device တစ္ခုကို format လုပ္ျကည့္ျကမယ္။

အဲ့အတြက္ အရင္ဆံုး usb ကို machine ကေန unmount အရင္လုပ္မယ္။ျပီးရင္ fdisk နဲ့ဘာေတြလုပ္နိုင္မလဲစမး္ျကည့္ျကရေအာင္။
```bash
[me@linuxbox ~]$ sudo umount /dev/sdb1
[me@linuxbox ~]$ sudo fdisk /dev/sdb
```

fdisk ကိုသံုးတဲ့ေနရာမွာ partition တစ္ခုအတြက္ပဲမဟုတ္ဘဲ device တစ္ခုလံုးကိုလုပ္မွာျဖစ္တဲ့အတြက္ /dev/sdb လို့သံုးထားရျခင္းျဖစ္ပါတယ္။
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

က်ေနာ္တို့ ပထမဆံုး usb မွာလက္ရွိ ဘယ္လို partition table ရွိလဲဆိုတာကိုျကည့္ျကည့္မယ္။အဲ့လိုျကည့္ခ်င္ရင္ p ဆိုတဲ့ option ကိုရိုက္ေပးရံုပါပဲ။
```
Command (m for help): p
Disk /dev/sdb: 16 MB, 16006656 bytes
1 heads, 31 sectors/track, 1008 cylinders
Units = cylinders of 31 * 512 = 15872 bytes

Device Boot 	Start 	End	Blocks 	Id 	System
/dev/sdb1 	2 	1008 	15608+ 	b     W95 FAT32
```

ဒီ partition table အရဆိုရင္ 16MB ဆိုတဲ့ partition တစ္ခုပဲရွိတဲ့ usb stick တစ္ခုကိုေတြ့ရမွာပါ။ foramt ကိုေတာ့ ေနာက္ဆံုးက system ေအာက္မွာေတြ့ရမွာပါ။အခု stick ဆိုရင္ Windows 95 FAT32 format ျဖစ္ပါတယ္။အခုအဲ့ partition ကို linux partition အျဖစ္ေျပာင္းပစ္မယ္။ id ေနရာက b ကေတာ့ အခုလက္ရွိ partition ရဲ့ type ကိုေျပာတာပါ။ အဲ့ေတာ့အဲ့ b ဆိုတာကို linux file partition type ျဖစ္တဲ့ 83 ဆိုတာကိုေျပာင္းမယ္။ခုနက fdisk  menu ထဲမွာ l လို့ရိုက္လိုက္ရင္ type ေတြအမ်ားျကီက်လာပါလိမ့္မယ္။အဲ့ထဲမွာ b ကဘာ type လဲဆိုတာကိုေတြ့နိုင္သလို 83 က linux အတြကျဖစ္တယ္ဆိုတာကိုေတြ့ရမွာပါ။ က်ေနာ္တို့က b ကေန 83 ကိုေျပာင္းခ်င္တာဆိုေတာ့ fdisk menu ထဲမွာ
```bash
t change a partition's system id
```

t ဆိုတာကိုရိုက္ျပီးေတာ့လုိခ်င္တဲ့ id ကိုေျပာင္းေပးလိုက္ရံုပါပဲ။
```bash
Command (m for help): t
Selected partition 1
Hex code (type L to list codes): 83
Changed system type of partition 1 to 83 (Linux)
```
id change တာေတာ့အဆင္ေျပသြားျပီ။ ဒါေပမဲ့မျပီးေသးပါဘူး။ ဒီအခ်ိန္မွာ device ကသံုးမရဘဲျဖစ္ေနပါလိမ့္မယ္။ဘာလို့လဲဆိုေတာ့ က်ေနာ္တို့က configure ပဲလုပ္ေပးရေသးတယ္။ အဲ့ configuration ကို device ေပါ္ကို apply မလုပ္ရေသးဘူး။အဲ့ေတာ့ modified partition ကို device ေပါ္ကို write လုပ္ပါမယ္ဆိုတာကိုေျပာေပးရမယ္။အဲ့လိုလုပ္ဖို့ w ဆိုတဲ့ option ကိုရိုက္ေပးရံုပါပဲ။
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

### mkfs ကိုအသံုးျပုျပီး file system အသစ္မ်ားျပုလုပ္ျခင္း
က်ေနာ္တို့ partition ေတြကို edit လုပ္ျပီးျပီဆိုေတာ့ အခု format ခ်ျပီးေတာ့ file system အသစ္တစ္ခု create လုပ္ျကည့္ပါမယ္။အဲ့လိုလုပ္ဖို့က်ေနာ္တို့ mkfs ဆိုတဲ့ command ကိုအသံုးျပုပါမယ္။ mkfs ကိုသံုးတဲ့အခါမွာ အေနာက္က -t option နဲ့ ေျပာင္းခ်င္တဲ့ format ကိုရိုက္ျပီး device ကိုေရြးေပးလိုက္ရံုပါပဲ။ခုနက stick ကိုက်ေနာ္တို့ ext3 format ကိုေျပာင္းျကည့္ပါမယ္။ဒီလုိလုပ္ဖို့ superuser permission လိုပါတယ္။ျပီးေတာ့ stick ထဲက data ေတြလည္း empty ျဖစ္သြားမွာျဖစ္ပါတယ္။
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

ext3 format ကိုေတာ့ေျပာင္းျပီးသြားျပီ။က်ေနာ္တို့ fat32 ကိုျပန္ေျပာင္းခ်င္တယ္ဆိုရင္လည္းခုနကအတိုင္းပဲ -t option ေနာက္မွာ vfat ဆုိတဲ့ type ေလးကိုအစားထိုးလိုက္ရံုပါပဲ။
```bash
[me@linuxbox ~]$ sudo mkfs -t vfat /dev/sdb1
```
အေပါ္မွာေျပာခဲ့တဲ့ fdisk နဲ့ mkfs command နွစ္ခုလံုးကို stick အတြက္တင္မဟုတ္ဘဲ harddisk , USB hard drives ေတြအတြက္ပါသံုးလို့ရပါေသးတယ္။
