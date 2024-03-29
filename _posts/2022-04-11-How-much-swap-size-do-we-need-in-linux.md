---
layout: post
title:  "How much swap size do we need in linux"
subtitle: "Linux မှာ swap partition ကိုဘယ်လောက်ထားသင့်သလဲ?"
header-img: "img/swap-size/choose-swap-size.jpg"
tags: [ubuntu,linux,sysadmin]
---
![spec](/img/swap-size/choose-swap-size.jpg){: .center-block :}

## Linux မှာ swap partition ကိုဘယ်လောက်ထားသင့်သလဲ?

-   Swap partition ရဲ့ size က ဘယ်လောက်ရှိသင့်သလဲ။
-   RAM ရဲ့ နှစ်ဆထားရမယ်ဆိုတာရော ဖြစ်နိုင်ပါ့မလား။
-   RAM အများကြီးရှိတဲ့စက်တွေမှာဆိုရင်ရော swap ကလိုသေးလား။

အပေါ်ကမေးခွန်းတွေကတော့ linux os တစ်ခုကို install လုပ်ရာမှာ မေးလေ့မေးထရှိတဲ့ common questions တွေဆိုလည်းမမှားပါဘူး။ အရင်တုန်းကဆိုရင်တော့ swap size ကို RAM ရဲ့ နှစ်ဆထားရမယ်ဆိုပြီးရှိခဲ့ဖူးပါတယ်။ ဒါပေမဲ့ အဲ့ rule ကအခုခတ် computer တွေနဲ့ဆိုရင် လုံးဝကိုမအပ်စပ်တော့သလိုဖြစ်သွားပါပြီ။ အခုဆို computer တွေမှာ RAM က 128 GB ထိရှိလာပါပြီ။ အဲ့လိုမျိုး နှစ်ဆထားရမယ်သာဆိုရင် RAM 32 GB အတွက်ပဲစဉ်းစားကြည့်ကြပါစို့။ သင်သာဆိုရင်ရော 32GB အတွက် swap ကို 64GB ထားမလား။ ဒါတော်တော်တော့စဉ်းစားရမှာပါပဲ။ အဲ့တော့အခု swap size ဘယ်လောက်ထားရမလဲမပြောခင်မှာ swap ကိုဘာကြောင့်သုံးရတာလဲဆိုတာကို အကြမ်းဖျင်းနားလည်သင့်ပါတယ်။ System တစ်ခု(ဥပမာ linux OS တစ်ခုမှာပဲဆိုကြပါစို့)မှာ Application တစ်ခုခုကို run တဲ့အခါမှာ RAM ကိုအသုံးပြုပါတယ်။ Run နေတဲ့ application တွေက RAM အသုံးပြုတာနည်းတယ်၊ Run ထားတဲ့ application အရေအတွက်ကလည်းနည်းတယ်ဆိုရင် ရှိနေတဲ့ RAM နဲ့တင်အဆင်ပြေပါလိမ့်မယ်။ ဒါပေမဲ့ run ထားတဲ့ application တွေများလာတဲ့အခါ၊ RAM အသုံးပြုမှုများတဲ့ application တွေကို နှစ်ခုသုံးခု run ထားတဲ့အခါ system ကစပြီးဒုက္ခများလာပါတယ်။ အဲ့လိုရှိသမျှ RAM အကုန် ပြည့်လုနီးပါဖြစ်နေတဲ့အချိန်မှာနောက်ထပ် application တစ်ခုထပ် run မယ်ဆိုရင်ရော အဲ့ application က ပုံမှန်အလုပ်မလုပ်တော့ဘဲ crash ဖြစ်သွားပါလိမ့်မယ်။ Swap ကတော့ RAM ကအလုပ်တွေပြည့်ပြီးမောနေတဲ့အချိန်မှာ အလုပ်လာကူလုပ်ပေးတဲ့ကောင်ပါ။ RAM ကပြည့်ပြီးအလုပ်မလုပ်နိုင်တော့တဲ့အခါမှာ swap( အပေါ်မှာပြောဖို့တစ်ခုကျန်ခဲ့ပါတယ်၊ swap က hard disk ရဲ့ free space ထဲကမှ ကိုယ်ပိုင်းထားသလောက်ကိုယူသုံးတာပါ၊ RAM ရဲ့ space နဲ့ဘာမှမဆိုင်ပါဘူး။ )က run နေတဲ့ application ကိုသူ့ဆီက free space ကိုယူသုံးပါဆိုပြီးအနည်းငယ်ကူညီပေးတဲ့သဘောပါပဲ။ ဒါပေမဲ့ swap size ကိုအများကြီးထားရင် application တွေအများကြီးကိုတစ်ချိန်ထဲမှာ run လို့ရမယ်မထင်ပါနဲ့။ RAM လုပ်သလိုတော့ swap ကလိုက်မလုပ်ပေးနိုင်ပါဘူး။ RAM က data တွေကို access လုပ်တဲ့အချိန်က nanosecond လောက်ပဲကြာပါတယ်။ မြန်ပါတယ်ဆိုတဲ့ SSD တောင် microsecond နဲ့ data တွေကို access လုပ်ပါတယ်။ ပုံမှန် hard disk ဆိုရင်တော့ millisecond နဲ့ access လုပ်ပါတယ်။ RAM က SSD ထက်တောင်အဆတစ်ထောင် မြန်ပါတယ်။ ပုံမှန် hard disk နဲ့ဆိုရင်တော့ အဆတစ်သိန်းလောက်ကွာပါတယ်။အဲ့တော့ task တစ်ခုကို RAM ပြည့်လို့ swap ပေါ်မှ run ပြီဆိုရင် ပုံမှန်ထက်တော့ပိုကြာပါလိမ့်မယ်။

#### Swap ကိုဘာလို့ လိုအပ်တာလဲ?
swap ကိုလိုအပ်တဲ့ အကြောင်းအမျိုးမျိုးရှိပါတယ်။ မိမိစက်ရဲ့ RAM က 1GB ထက်နည်းနေတဲ့အချိန်၊ Video editors လို app မျိုးတွေနဲ့အလုပ်လုပ်ရတဲ့စက်မျိုးဆိုရင်လည်း Resources အများကြီးအသုံးပြုတဲ့အတွက် swap ကိုထားသင့်ပါတယ်။

####  RAM အများကြီးရှိတဲ့စက်တွေမှာရော swap ကိုလိုသေးလား?
တော်တော်လေးကောင်းတဲ့မေးခွန်းပါ။ သင့်ရဲ့ RAM က 32GB or 64GB ရှိမယ်ဆိုရင် Applicaion ကို RAM ကထိန်းနိုင်တဲ့အတွက် Swap ကိုဘယ်တော့မှအသုံးပြုမှာမဟုတ်ပါဘူး။ တကယ်လို့ hard disk size လည်းအများကြီးရှိတယ်ဆိုရင်တော့ Swap လေးထားထားတာက ဘာအန္တရာယ်မှမဖြစ်ပါဘူး ။

####  swap size ကိုဘယ်လောက်ထားသင့်လဲ?
အဓိကအကျဆုံးမေးခွန်းလာပါပြီ။ Swap size ကဘယ်လောက်ရှိသင့်တယ်ဆိုပြီး အတိအကျသတ်မှတ်ချက်တွေလည်းမရှိတဲ့အတွက်ဖြေရတော့အတော်ခက်ပါတယ်။ ကိုယ်အသုံးပြုမဲ့အပေါ်မူတည်ပြီး အဆင်ပြေသလိုထားနိုင်ပါတယ်။ Major linux distributions တွေမှာတောင် Swap အတွက် guide က တစ်ခုနဲ့တစ်ခုမတူကြပါဘူး။ Red Hat’s Suggestion အရဆိုရင် RAM 4GB or higher computer တွေမှာ RAM ရဲ့ 20% ကို swap အဖြစ်ထားဖို့ recommend လုပ်ထားပါတယ် CentOS ကျတော့တစ်မျိုးပြောင်းသွားပါတယ်။ RAM က 2GB ထက်နည်းရင်တော့ swap ကို RAM ရဲ့နှစ်ဆ၊ RAM က 2GB ထက်များရင်တော့ swap ကို RAM+2GB၊ Ubuntu မှာဆိုရင် RAM က less than 1GB ဆိုရင် swap ကို အနည်းဆုံး RAM အတိုင်း(1GB) သို့မဟုတ် အများဆုံး RAM ရဲ့ ၂ဆ၊ RAM က more than 1GB ဆိုရင် swap ကို အနည်းဆုံး RAM ရဲ့ square root(1GB ဆိုရင် 1GB , 4GB ဆိုရင် 2GB) အများဆုံး RAM ရဲ့ ၂ဆ၊ စသည်ဖြင့်အသီးသီးရှိပါတယ်။ တော်တော်ရှုပ်သွားပြီထင်ပါတယ်။ Ubuntu ရဲ့ Recommended swap အပေါ်အခြေခံပြီး မရှုပ်ရအောင် table လေးတစ်ခုလုပ်ထားပေးပါတယ်။


| RAM Size | Swap Size (Least) | Swap size (MOST) |
|----------|-------------------|------------------|
| 256MB | 256MB   | 512MB  |
| 512MB  | 512MB  | 1GB  |
|  1GB |  1GB |  2GB |
| 2GB  |  1GB  | 3GB  |
| 3GB  | 2GB  | 5GB  |
|  4GB | 2GB  | 6GB  |
| 6GB  | 2GB  | 8GB  |
| 8GB  | 3GB  | 11GB  |
| 12GB  | 3GB  | 15GB  |
| 16GB  | 4GB  | 20GB  |
| 24GB  | 5GB  | 29GB  |
| 32GB  | 6GB  | 38GB  |
| 64GB  | 8GB  |  72GB |
| 128GB  | 11GB  | 139GB  |

Thanks everyone!!!
