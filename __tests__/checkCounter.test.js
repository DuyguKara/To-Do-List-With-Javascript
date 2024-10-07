// checkCounter.test.js
const checkCounter = require('../utils').checkCounter;

// Testleri başlat
describe('checkCounter', () => {
    beforeEach(() => {
        localStorage.clear(); // Her testten önce localStorage'i temizle
    });

    test('localStorage boşsa counter 0 olmalı', () => {
        const result = checkCounter();
        expect(result).toBe(0); // counter 0 olmalı
    });

    test('localStorage da geçerli bir sayı varsa onu döndürmeli', () => {
        localStorage.setItem("taskCounter", "5");
        const result = checkCounter();
        expect(result).toBe(5); // localStorage'daki değer 5 olduğu için counter 5 olmalı
    });

    test('localStorage da geçersiz bir değer varsa counter 0 olmalı', () => {
        localStorage.setItem("taskCounter", "invalid");
        const result = checkCounter();
        expect(result).toBe(0); // Geçersiz bir değer olduğunda counter 0 olmalı
    });
});