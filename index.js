
//add butona (plus shape) tıklanınca görev eklemek için kullanılan modal css kodları görünür ayarlanıyor.
$(".add-button").click(function(){
    $(".modal").css("display", "block");
});

// close ikonuna tıklandığında modal penceresini görünmez yapıyor. hem ekleme hem düzenlemede gelen modallar için ortak.
$(".close").click(function(){
    $(".modal").css("display", "none");
    $('.edit-modal').css('display', 'none');
});

//görev ekleme kısmında açılan modaldaki butona tıklandığında input boxa girilen textleri alıp değişkene koyuyor.
// daha sonra create task fonksiyonuna bu değişkenleri parametre olarak verip fonksiyonu çağırıyor.
$(".add-task-button").click(function(){
    var titleValue = $(".modal #task-title").val();
    var contentValue = $(".modal #task-content").val();
    createTask(titleValue, contentValue);
});

//counter fonksiyonu
/*localstroage'da taskCounter key'inde tutulan değeri getiriyor local stroage string değerler tuttuğu için
 parseint ile bu değeri number'a çeviriyoruz ve counter değişkenine ataanıyor.
 eğer counter değişkeni bir sayı değilse (bu durumda taskCounter ile gelen key value taşımıyordur) counter değişkenini
 0 olarak set ediyoruz */

function checkCounter(){
    var counter = parseInt(localStorage.getItem("taskCounter"));
    if(isNaN(counter)){
        counter = 0;
    };
    return counter;
}

// createTask fonksiyonu
/* kullanıcının input boxlara yazdığı değerleri parametre olarak alıyor
taskların html yapıları aynı olacağı için bu item'ların html yapısını template tagları içine alıyoruz ve bu kısmın
içeriğini klonluyoruz. Klon içinde yaptığımız sorgular ile başlığın ve açıklamanın olduğu elementlere kullanıcının girdiği
inputları atıyoruz. 
ayrıca her taskı birbirinden ayırabilmek için item sınıfının bulunduğu elemente id eklemesi yapıyoruz.
item0, item1 gibi değerler gelecek her biri için.
bir de aynı elemente box sınıfı ekliyoruz.

eğer title veya content boşsa, ya da ikisi birden boşsa kullanıcıya bir uyarı gösteriyoruz.
hepsi doluysa item'ımızı içeren bir üst elementin içine klonumuzu koyuyoruz.
böylece artık ilk task sayfaya gelmiş oluyor.
local stroage'da oluşturduğumuz tasks key'ine de o elemente kopyaladığımız içeriği kaydediyoruz.

görev ekleme modalını görünmez kılıyoruz.

taskcounter value ise 1 artıyor. bunu da local stroage ile kaydediyoruz.
örneğin en başta bir değer içermediği için not a number olacak ve counter 0 ayarlanacak o yüzden
ilk item item0 idsine sahip olacak daha sonrakinde 1 değeri kakydedilecek ve not a number koşuluna girmeyecek dolayısıyla
2. element item1 idsi alacak böylece hepsi benzersiz bir özelliğe sahip oluyor.

add new task elementini yani hiç görev yokken sayfada gözüken stili de eğer block durumundaysa görünmez yapıyoruz.*/
function createTask(title, content){
    var clon = document.querySelector("template").content.cloneNode(true);
    clon.querySelector(".content h2").textContent = title;
    clon.querySelector(".content p").textContent = content;
    clon.querySelector(".item").id = "item" + taskCounterValue;
    clon.querySelector('.item').classList.add("box");

    if (title == "" || content == "") {
        alert("Please Fill Out All Input Boxes!");
    }
    else{
        document.querySelector(".task-grid-container").appendChild(clon);
        localStorage.setItem("tasks", document.querySelector(".task-grid-container").innerHTML);
        /* console.log(document.querySelector(".task-grid-container").innerHTML);
        template içine aldığımız kodlar string olarak kaydedildi.*/
        $(".modal").css("display", "none");

        taskCounterValue ++;
        $('.add-new-task').css('display', 'none');
        localStorage.setItem("taskCounter", String(taskCounterValue));

    }
};

/* pencere her yenilendiğinde oluşturulmuş görevlerin geri gelmesini istiyoruz. 
localstroagedan get item metoduyla oluşturulup kaydedilmiş taskları getiriyoruz ve bir değişkene atıyoruz.
eğer bu değişken varsa ve bir değere sahipse  task-grid-container sınıfına sahip elementin içeriğine bu datayı ekliyoruz
böylece sayfa yenilendiğinde önceden oluşturulmuş görevler olduğu gibi geri gelecek kaybolmayacak.
checkCounter fonksiyonunu çağırıp döndürdüğü değeri ise taskCounter value değişkenine global olarak atıyoruz.
böylece eğer 0 döndüyse item oluşturulurken id kısmında item + 0 değerini alıcak eğer depolamada bir değer varsa o değeri
döndürdüğü için değişken de onu alacak örneğin 5 ise item5 olmasını sağlayacak.*/

window.onload = function() {
    const savedData = localStorage.getItem("tasks");
    if (savedData) {
        document.querySelector(".task-grid-container").innerHTML = savedData;
        $('.add-new-task').css('display', 'none');
    }
    taskCounterValue = checkCounter();
};

/* itemleri içeren kısım html yapısına sonradan eklendiği için öncelikle htmlde bulunan elementi seçiyor
ve üstünde on eventini gerçekleştiriyoruz. sonradan eklenen elementlere event eklemek için jqueryde böyle yapılıyor.
daha sonra  dropdown sınıfı içeren elemntin içindeki img öğesine yani 3 nokta olan elemente fare geldiğinde tetikleniyor
ve tetiklenen elementin en yakın üst dropdown sınıfını buluyor o sınıfı içeren elemente tDotsHover sınıfını ekliyor.
bu özellik fare üzerine geldiğinde bazı css stilleri vermek için ayarlandı.*/
$(".task-grid-container").on("mouseover", ".dropdown > img", function() {
    $(this).closest('.dropdown').addClass("tDotsHover");
  });

  /* üstteki satırla benzer bir şekilde fare çekildiğinde verilen css özellikleri kaldırılıyor. */

$('.task-grid-container').on('mouseout', '.dropdown > img', function(){
    $(this).closest('.dropdown').removeClass("tDotsHover");
});

/* 3 nokta olan elemente tıklama gerçekleştiğinde tıklanan elementin child elementine dropdown-content sınıfına toggle özelliği
veriyor böyle tıklanınca sınıf yoksa ekleniyor varsa çıkarılıyor. */

$('.task-grid-container').on('click', '.dropdown', function(event){
    $(this).children('.dropdown-content').toggle();
});

// local storage için string olarak tuttuğum html kodlarını dom'a çevirdiğim fonksiyon.

/* local stroage değerleri string olarak tutuyor ama bu projede birçok yerde bu localstroageda tutulan değer üzerinde
sorgulamalar veya değişimler yapılması gerekiyor bu yüzden string olan bu değeri dom elementine çevirme işlevi gerekli
bunu da tekrar tekrar yapmaktan kurtarmak için bu fonksiyon var. 
bir data parametresi alıyor bu parametreye depolamada kaydedilmiş değer gönderiliyor. bir dom parser yardımıyla gönderilen
string dom elementine dönüştürülüyor ve fonksiyon bu değeri döndürüyor. */
function stringToDom(data) {
    const parser = new DOMParser();
    const document = parser.parseFromString(data, "text/html");
    return document;
};


/* görev silmek için #deleteTask idsi içeren elementte tıklama eventi gerçekleşmeli. Daha sonra
tıklanan elementin en yakın üst elementinde item sınıfına sahip elementi buluyor ve onu kaldırıyor böylece silinmek istenen
task ekrandan kaldırılıyor.

daha sonra depolamadan silmek için depolamada bulunan değerler çağırılıyor, tıklanan elementin idsi alınıyor ve değişkene atanıyor
stringden doma çeviren fonksiyon çağırılıyor ve parametre olarak depolamadan getirdiğimiz string verisi veriliyor,
bu veriyi doma çevirdikten sonra hazırladığımız item id ile dom içinde elementi arıyoruz. ve o elementi siliyoruz.
ve domun yeni halini depoya kaydediyoruz.*/
$('.task-grid-container').on('click', '#deleteTask', function(){
    $(this).closest('.item').remove();
    const savedData = localStorage.getItem("tasks");
    const itemId ="#" + $(this).closest('.item').attr('id');
    const domDoc = stringToDom(savedData);
    domDoc.querySelector(itemId).remove();
    localStorage.setItem("tasks", domDoc.documentElement.outerHTML);


    /* tüm box sınıfına sahip elementleri buluyoruz. eğer bu gelen nodelist yapısı boşsa 
    depodan taskcounter key'ini kaldırıyoruz. ve yine checkCounter fonksiyonunu çağırıp bunu  taskCounterValue ya atıyoruz.
    yani eğer ekranda hiç task kalmadıysa amacımız taskcounterı baştan başlatmak not a number koşuluna girmesini sağlamak.
    böylece item id'lerinde verilen sayıların sonsuza gitmesini önlüyoruz. tüm görevler bittiyse yeni görev item0 idsi ile başlayacak tekrardan.
    
    ayrıca tüm görevler silindiğinde tasks key'ini de kaldırıyoruz böylece local storageda klonladığımız son element de gitmiş oluyor.
     tüm görevler silindiğinde boş sayfadaki html elementini görünür yapıyoruz.*/
    const boxes = document.querySelectorAll('.box');
    if (boxes.length === 0) {
        localStorage.removeItem("taskCounter");
        taskCounterValue = checkCounter(); // taskCounterValue'ı güncelle
        localStorage.removeItem("tasks");
        $('.add-new-task').css('display', 'block');
    }
});

/* currentItemId değişkenine global erişmek için burda tanımlıyoruz. */
let currentItemId;

/*  edittask idli elemente tıklama gerçekleştiğinde edit yapılacak modal görünür oluyor.
ve tıklanan elementin en yakın üst item sınıfına sahip elementi seçip ordan id özelliğini getiriyoruz.
yani edit butonuna tıklandığında o elementin bulunduğu itemın id'sini elde ediyoruz item1 gibi ve onu #item1 formatına çekiyoruz.
bunu da currentItemId değişkenine koyuyoruz.*/
$('.task-grid-container').on('click', '#editTask', function(){
    $('.edit-modal').css("display", "block");
    currentItemId ="#" + $(this).closest('.item').attr('id');
}); 

/* açılan modaldaki düzenle butonuna basıldığında kullanıcının input boxlara girdiği verilerin değerlerini alıyoruz.
ve edit task fonksiyonunu çağırıyoruz. çağırırken aldığımız id ve input değerlerini parametre olarak gönderiyoruz. */
$('.edit-task-button').click(function(){
    const titleValue = $('.edit-modal #task-title').val();
    const contentValue = $('.edit-modal #task-content').val();
    editTask(currentItemId, titleValue, contentValue);
}); 


/* editTask fonksiyonunda ise editlenen itemin id ve inputlar geliyor eğer inputlardan biri veya ikisi birden boşsa alert
veriyoruz. değilse depolanmış itemları alıp dom elementine çeviriyoruz. bu elementte currentItemId ile 
düzenleme yapılacak itemin başlık ve içerik kısımlarını inputlara girilen değerlerle güncelliyoruz.
Yeni halini depoya kaydediyoruz. ve edit modal penceresini görünmez kılıyoruz. değişikliğin gözükmesi için de pencereyi
yeniliyoruz. */
function editTask(itemId, title, content){

    if (title == "" || content == "") {
        alert("Please Fill Out All Input Boxes!");
    }
    else{
        //#item0 #item1 ...
        const savedData = localStorage.getItem("tasks");
        const domData = stringToDom(savedData);
        const element = domData.querySelector(itemId);
        element.querySelector('.content h2').textContent = title;
        element.querySelector('.content p').textContent = content;
        localStorage.setItem("tasks", domData.documentElement.outerHTML);
        $('.edit-modal').css("display", "none");
        window.onload();
    }
}

/* check sınıfına sahip elementte tıklama gerçekleştiğinde tıklanan elementin id değerini alıyoruz depodan tasklarımızı
getiriyoruz dom elementine çevirip bunun içinde elementid ile content sınıfını bulup done-task sınıfını toggle ile ekliyoruz.
eğer done-task varsa istediğimiz css değişikliklerini yapıyoruz. eğer yoksa da ona göre css değişikliklleri ekliyoruz. yeni halini depoya
kaydediyoruz
ve pencereyi yeniliyoruz değişikliği anlık olarak görmek için. Böylece görev tamamlandıysa ilgili elemente tıklandığında
belirli css özellikleri çıkacak kaldırılmak istenirse de kaldırılacak.

*/

  $('.task-grid-container').on('click', '.check', function(){
    const elementId = "#" + $(this).closest('.item').attr('id');
    const savedData = localStorage.getItem("tasks");
    const domData = stringToDom(savedData);
    var element = domData.querySelector(elementId);
    $(element).find('.content').toggleClass('done-task');
    if ($(element).find('.content').hasClass('done-task')) {
        $(element).find('.check img').attr('src', './assests/svgs/check-square.svg');
        $(element).find('.check img').attr('alt', 'checked box');
    } else {
        $(element).find('.check img').attr('src', './assests/svgs/app.svg');
        $(element).find('.check img').attr('alt', 'empty square');
    }
    localStorage.setItem("tasks", domData.documentElement.outerHTML);
    window.onload();
  });

  //renk çerçevesi ekleme çıkarma ve çerçeveleri üst üste bindirmesin diye fonksiyon

  /* 3 renk olan çerçevelerden örneğin red olana tıklandıysa eğer varsa sarı ve yeşil çerçeveyi ekeleyen sınıflar kaldırılıyor
  böylece üst üste tıklandığında renkleri üst üste bindirmesi önleniyor. 
  red' tıklandı sonra yellow tıklandı en son yellow  görecek kullanıcı yellow'a basıp kapatmak istediğinde altta red görmeyecek. */
  function addFrame (elementId, clickedFrame, removeFrame1, removeFrame2){
    //$(element).toggleClass(clickedFrame); 
    /* $(element).toggleClass('yellow-frame'); */

    // console.log(removeFrame1); ---> yellow-frame
    // console.log(removeFrame1, removeFrame2); ---> yellow-frame green-frame
   /*  if($(element).hasClass('yellow-frame') || $(element).hasClass('green-frame')){
        $(element).removeClass('yellow-frame green-frame');
    } */
    const savedData = localStorage.getItem("tasks");
    const domData = stringToDom(savedData);
    var element = domData.querySelector(elementId);
    $(element).toggleClass(clickedFrame); 
    if($(element).hasClass(removeFrame1) || $(element).hasClass(removeFrame2)){
        $(element).removeClass(removeFrame1, removeFrame2);
    }
    localStorage.setItem("tasks", domData.documentElement.outerHTML);
    window.onload();
  }

  /* kırmızı çerçeve veren elemente tıklandığında o elementin idsi bulunuyor ve addFrame fonksiyonu çağırılıyor.
  fonksiyona tıklanan elementin id değeri hangi renge tıklandığı ve hangi renkler varsa kaldırılması gerektiği parametreleri yollanıyor. */
  $('.task-grid-container').on('click', '.circle-grid img:first-child', function(){
    const elementId = "#" + $(this).closest('.item').attr('id');
    addFrame(elementId, 'red-frame', 'yellow-frame', 'green-frame');
  });

  /* yellow çerçeve veren elemente tıklandığında o elementin idsi bulunuyor ve addFrame fonksiyonu çağırılıyor.
  fonksiyona tıklanan elementin id değeri hangi renge tıklandığı ve hangi renkler varsa kaldırılması gerektiği parametreleri yollanıyor. */
  $('.task-grid-container').on('click', '.circle-grid img:nth-child(2)', function(){
    const elementId = "#" + $(this).closest('.item').attr('id');
    addFrame(elementId, 'yellow-frame', 'red-frame', 'green-frame');
  });

  /* green çerçeve veren elemente tıklandığında o elementin idsi bulunuyor ve addFrame fonksiyonu çağırılıyor.
  fonksiyona tıklanan elementin id değeri hangi renge tıklandığı ve hangi renkler varsa kaldırılması gerektiği parametreleri yollanıyor. */
  $('.task-grid-container').on('click', '.circle-grid img:nth-child(3)', function(){
    const elementId = "#" + $(this).closest('.item').attr('id');
    addFrame(elementId, 'green-frame', 'yellow-frame', 'red-frame');
  });

//sürüklenecek elemente html tarafında draggable özelliği true verilmeli.
/* sürükleme yapılacak elemente dragstart olayı başlatılıyor o elementin idsi alınıyor ve o id ile item contenti alınıyor.
bu content transfer edilecek olarak set ediliyor text html yapısında.
o elemente css özellikleri veren dagging sınıfı ekleniyor.
ve aynı zamanda id değeri de transfer edilmek üzere set ediliyor.*/
$('.task-grid-container').on('dragstart', '.drag-element', function(event){
    const elementId = "#" + $(this).closest('.item').attr('id');
    const dragedElementHtmlContent = $(this).closest('.item').find('.content').html();
    event.originalEvent.dataTransfer.setData("Text/html", dragedElementHtmlContent);
    $(elementId).addClass('dragging');
    event.originalEvent.dataTransfer.setData("Text/plain", elementId);

});

/* sürükleme bittiğinde sürüklemesi biten elementten dragging sınıfı kaldırılıyor. */

$('.task-grid-container').on('dragend', '.drag-element', function(){
    const elementId = "#" + $(this).closest('.item').attr('id');
    $(elementId).removeClass('dragging');
});

// drop ayarlamaları-------------------------------------------------------------


/* sürüklenecek alana girdiğinde element bazı css özellikleri ekleniyor. yani sürüklenecek alan etrafında çerçeve çıkması gibi.
 */
$('.task-grid-container').on('dragenter', function(event){

    if($(event.target).hasClass('drop-target')){
        $(event.target).addClass('drag-frame');
    }

});

/* sürüklenecek alandaki default olarak engelleyen özelliği kaldırıyoruz. böylece sadece belirle alanlara sürükle bırak
işlevi çalışıyor. */
$('.task-grid-container').on("dragover", function(event) {
    event.preventDefault();
});

/* sürüklenecek alandan ayrıldığında bazı css özellikleri kaldırılıyor. */
$('.task-grid-container').on("dragleave", function(event) {
    if($(event.target).hasClass('drop-target')){
        $(event.target).removeClass('drag-frame');
    }
});

/* içerik droplandığında öncelikle sayfanın default özelliğini kaldırıyoruz yoksa drop yapmamıza izin vermez. eğer sürükleme
yapılacak alandaysak drop gerçekleştiğinde dragenterda eklenen css özelliğini kaldırıyoruz. sürüklenen öğenin ve droplanacak elementin
id değerlerini ve contentlerini alıyoruz bu iki item'ın contentlerini değiştiriyoruz.
depolamayı da ona göre güncelliyoruz.*/
$('.task-grid-container').on("drop", function(event) {
    event.preventDefault();

    if ($(event.target).closest('.item').hasClass('drop-target')) {
        $(event.target).removeClass('drag-frame');
        
        // Sürüklenen öğenin içeriğini ve ID'sini al
        const draggedElementHtmlContent = event.originalEvent.dataTransfer.getData("text/html");
        const draggedElementId = event.originalEvent.dataTransfer.getData("text/plain");
        
        // Bırakılan öğenin içeriğini ve ID'sini al
        const droppedElement = $(event.target).closest('.item');
        const droppedElementHtmlContent = droppedElement.find('.content').html();
        const droppedElementId = droppedElement.attr('id');
        
        // Bırakılan öğeye sürüklenen öğenin içeriğini koy
        droppedElement.find('.content').html(draggedElementHtmlContent);
        
        // Sürüklenen öğeye bırakılan öğenin içeriğini koy
        $(draggedElementId).find('.content').html(droppedElementHtmlContent);

        // LocalStorage'daki veriyi güncelle
        const savedData = localStorage.getItem("tasks");
        const dom = stringToDom(savedData);

        // Dom üzerinde güncellemeleri yap
        const domDraggedElement = dom.querySelector(`#${draggedElementId.substring(1)}`);
        const domDroppedElement = dom.querySelector(`#${droppedElementId}`);

        if (domDraggedElement && domDroppedElement) {
            domDraggedElement.querySelector('.content').innerHTML = droppedElementHtmlContent;
            domDroppedElement.querySelector('.content').innerHTML = draggedElementHtmlContent;
        }

        // Güncellenmiş DOM'u localStorage'a kaydet
        localStorage.setItem("tasks", dom.documentElement.outerHTML);
    }
  });