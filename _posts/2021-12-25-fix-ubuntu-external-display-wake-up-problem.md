---
layout: post
title:  "Fix: Ubuntu external display only doens't wake up monitor after suspend/sleep"
subtitle: "What did I learn? What did I get?"
tags: [ubuntu,external-display]
---
![spec](/img/external-monitor-fix/system-spec.png){: .center-block :}

ကျနော် ubuntu 20.10 ကို laptop မှာ install လုပ်ပြီး external monitor နဲ့ချိတ်သုံးဖို့ကြိုးစားရင်နဲ့ ကြုံရတဲ့ issue လေးကို တစ်ခြားသူတွေဖြစ်နေရင်လည်း fix လို့ရအောင် sharing လေးလုပ်ပေးပါမယ်။ 

ဖြစ်ပုံက ubuntu 20.10 impish ကို ကျနော့် laptop display က တော်တော်ဆိုးဆိုးဖြစ်နေလို့ external monitor only နဲ့သုံးဖို့လုပ်ထားတယ်၊။ ပထမကတော့ join display နဲ့သုံးတော့ အဆင်ပြေတယ်။ နောက်ကျနော်က laptop lid ကိုပါ ပိတ်ထားပြီး external only ပြောင်းလိုက်တဲ့အချိန်ကျတော့ sleep mode/suspend mode ဖြစ်သွားရင် keyboard နဲ့ mouse မှာတစ်ခုခုနှိပ်ရင် monitor လည်း external display ဖြစ်တဲ့ monitor က auto detect မဖြစ်တော့ဘူး။ laptop lid ကိုပြန်ဖွင့် login ပြန်ဝင်နဲ့ အလုပ်တွေရှုပ်လာရော။ ပြီးတော့ laptop က vertical stand နဲ့ထားတာဆိုတော့ stand ကနေ ပြန်ထုတ်လိုက် ဖွင့်လိုက် ပြန်ထည့်လိုက်နဲ့ အလုပ်တွေရှုပ်ချက်။ အဲ့လိုနဲ့ သူ့ကို fix လုပ်လို့ရမဲ့ နည်းလမ်းလေးဘာလေး ရှိမလား မွှေနှောက်ကြည့်ရင်း အခုနည်းလမ်းလေးကို တွေ့တယ်ဆိုပါတော့။ ဘာမှအခက်ကြီးမဟုတ်ဘူး ...
အရင်ဆုံး `laptop-mode-tools` ဆိုတဲ့ tools လေးကို install လုပ်လိုက်တယ်....
```
 sudo apt-get install laptop-mode-tools
```
![spec](/img/external-monitor-fix/laptop-mode-tools.png){: .center-block :}

ပြီးတော့ super key/windows key နဲ့ `laptop-mode-tools` လို့ရှာပြီး အဲ့ option တွေထဲက "Enable module video-out"  ဆိုတာလေးကို mark လုပ်ပေးလိုက်ရုံပါပဲ။ 