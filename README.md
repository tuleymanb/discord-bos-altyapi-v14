# Mágoa

>### **Açıklama**
Proje kendi **MongoDB** sunucunuz ve **Redis** sunucunuz olduğu var sayılarak hazırlanmıştır. Eğer **MongoDB** ve **Redis** sunucularınızı nasıl kuracağınızı bilmiyorsanız internetten araştırabilirsiniz. Sunucularınız hazır ise [.env]()

>### **Kurulum**
### **Öncelikli Adımlar**
 - [Nodejs 16.17.1](https://nodejs.org/en/download/) sunucuya kurulur.
 - [Redis](https://redis.io/download/) sunucuya kurulur.
- [MongoDB](https://www.mongodb.com/try/download/community) sunucuya kurulur.

---
### **İkinci Adımlar**
 - [Config](/config/) dosyalarını düzenlemeyle işe başlayın, sıradaki adım olarak `npm install` komutunu kullanıyoruz ve modülleri kuruyoruz.
 - `node .` komutu ile start veriyoruz.

---

>### **Hazır Sistemler** ([x] yapıldı [-] yapılacak)
 - [x] Web sitesinden paytr entegreli ödeme sistemi ve otomatik bakiyeyi tanımlama
 - [x] Premium Sistemi
   - [x] Market
   - [x] Premium Süresi boyunca maximum %50 indirim yapacak şekilde fiyat sistemi
   - [x] Bakiyesini ve bu zamana kadar harcadığı bakiyeyi görebilme
   - [x] Premium aktif kaldığı sürece seviyeye bağlı olarak cooldown süresi azalma
 - [x] Prefix sistemi
 - [x] Dil Sistemi
 - [x] Karaliste Sistemi
 - [x] Cooldown Sistemi (`Cooldown süresi bitince bot uyarı mesajını siler`)
 - [x] Prefix Komut Handler
    - [x] Yetki Sistemi
    - [x] Dile göre komut adı
    - [x] Dile göre yan tetikleyiciler
    - [x] Dile göre komut açıklaması
    - [x] Dile göre örnek kullanım
    - [x] Dile göre kategori
    - [x] Cooldown süresi
    - [x] Bot ve Kullanıcı Yetkisi
    - [x] Yardım Menüsünde gizleme
    - [x] Premiuma özel yapabilme
    - [x] Sunucu sahibine özel yapabilme
    - [x] geliştiriciye özel yapabilme
    - [x] Bakım moduna alabilme
- [x] Context Menü Handler (`Mesaj veya kullanıcıya sağ tıklayınca çıkan uygulamalar kısmı`)
    - [x] Context menü yetki sistemi
    - [x] Context menü cooldown sistemi
 - [x] Event Handler
 - [x] Destek Sunucusuna Özel Slash Komut Sistemi
---



>### **Premium seviyeleri**
- **1. seviye**
  + %10 daha az cooldown süresi
  + Premium komutlara erişim
  
- **2. seviye**
  + %20 daha az cooldown süresi
  + 1. seviye özellikleri

- **3. seviye**
  + %35 daha az cooldown süresi
  + 1. seviye özellikleri
  + 2. seviye özellikleri

- **4. seviye**
  + %50 daha az cooldown süresi
  + 1. seviye özellikleri
  + 2. seviye özellikleri
  + 3. seviye özellikleri
  

