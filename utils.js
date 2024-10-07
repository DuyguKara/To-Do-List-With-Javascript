
function checkCounter() {
    var counter = parseInt(localStorage.getItem("taskCounter"));
    if (isNaN(counter)) {
        counter = 0;
    }
    return counter;
}

module.exports = { checkCounter }; //Burada checkCounter fonksiyonunu module.exports ile dışarıya açıyoruz ki test dosyasında bu fonksiyonu kullanabilsin.