# To-Do List

## Projenin Amacı

Bu projenin amacı günlük işlerinizi takip edebileceğiniz bir "web page" oluşturmaktır. Tarayıcıdan kolaylıkla erişilebilecek formatta olan
bu web syafası ile yeni görevler ekleyebilir, görevleri silebilir, istediğiniz görevi düzenleyebilir veya önem sırasına koyabilirsiniz. Pencrenizi yenilediğinizde bile var olan görevlerin hala saklandığını da görebilirsiniz.

## Proje Detayları

Bu proje HTML, CSS, JavaScript kullanılarak gerçekleştirilmiştir. index.html dosyasında web sayfasının yapısı bulunmaktadır. Sayfa her cihaz boyutuyla uyumlu olabilmesi açısından responsive tasarlanmıştır. Başlık ve ekleme butonları flexbox ile, geri kalan görevlerin geleceği içerikler ise grid yapısı kullanılarak düzene oturtulmuştur. 

Web sayfasının elementlerine CSS ile özellikler verilmiş ve kullanıcının görsel algısına, kullanım deneyimine hitap edecek şekilde ayarlanmıştır. Verilen css özellikleri style.css dosyasında bulunmaktadır. 

Projenin içerdiği dom manipülasyonları ise index.js dosyasında bulunmaktadır. Bu dosyanın içindeki kodlar, fonksiyonlar tek tek yorumlarda açıklanıyor. 

Projenin fonksiyonlarının birim testlerini gerçekleşitmek için package.json konfigürasyon dosyası oluşturulmuştur. Birim testler için jest framework'ü tercih edilmiş ve kurulmuştur. Ayrıca localStroage'ı simüle edebilmek için bir mock kurulmuştur. Bu bağımlılıkları package.json dosyasında görebilirsiniz. Hazırlanan testlerin npm test komutuyla çalıştırılabilmesi için package.json dosyasına

```json
{
 "scripts": {
    "test": "jest"
  }
}
```
  bölümü eklenmiştir.

  Testler __tests__ dizini içinde bulunmaktadır. Örnek olarak checkCounter fonksiyonunu test eden checkCounter.test.js dosyası bulunur. utils.js dosyasına test edilecek fonksiyon bulunur bunu module.export ile test dosyası kullanabilsin diye dışarı açıyoruz. setupTest.js ise localStorage'ı temsil edecek mock'u içeri aktarır. Package.json dosyasında  
  
  ```json
 {
  "jest": {
  "setupFiles": ["./setupTests.js"]
  }
  }
```
  bu kısım ile dosyayı belirtiriz.

  Terminalde projenin dizinindeyken npm test komutuyla bu testi çalıştırabilirsiniz.

  ## Projenin İşleyişi

  Add butonu için ayrılan kısma tıklayarak açılacak modal penceresinde gerekli inputları tam olarak doldurulduğunda boş bırakılmadığında ve karakter sınırına uyulduğunda oluştur butonuna basarak yeni bir task oluşturabilirsiniz. Bu task yapacağınız görevi ve görev açıklamasını içerir. Eğer başlık veya içerikte değişiklik yapmak isterseniz sağ üstte bulunan 3 nokta simgesine tıklayarak edit seçeneğini seçebilir ve gelecek olan modal penceresinde yeni değerlerinizi yazabilirsiniz. Eğer görevi silmek isterseniz tekrardan 3 noktaya tıklayarak sil seçeneğine tıklamanız yeterli olacaktır. 3 nokta simgesine tıkladıktan sonra bir işlem yapmaktan vazgeçerseniz tekrar üstüne tıklayarak dropdown'u kapatabilirsiniz. Görevlerinize önem derecesine göre renkler ekleyerek dikkat çekici yapmak istediğinizde sol altta bulunan dairelere tıklayabilir kapatmak istediğinizde aynı daireye tekrar tıklayabilirsiniz. Tamamlanmış görevler için sağ altta bulunan küçük kareye tıklayabilir, tamamlandı seçeneğinden vazgeçerseniz aynı yere tekrar tıklayarak kaldırabilirsiniz. Sürüklemek ve yerlerini değiştirmek istediğiniz görevleri sol üstte bulunan üç çizgiye basılı tutarak sürüklenecek görevin üstüne getirip bırakabilirsiniz. Sayfayı yenilediğinizde var olan görevleriniz kaybolmayacak şekilde ayarlanmıştır. Böylece görev takibiniz sürekli olarak devam eder.