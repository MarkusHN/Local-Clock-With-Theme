let isDaySoundPlayed = false; // Variabel for å sjekke om daglyden har blitt spilt  
let isNightSoundPlayed = false; // Variabel for å sjekke om nattlyden har blitt spilt

function updateClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    
    // Hent datoen og konverter måneden til navn
    const year = now.getFullYear();
    const monthNames = [
        "Januar", "Februar", "Mars", "April", "Mai", "Juni", 
        "Juli", "August", "September", "Oktober", "November", "Desember"
    ];
    const month = monthNames[now.getMonth()]; // Hent månedsnavn fra arrayet
    const day = now.getDate().toString().padStart(2, '0');

    const clock = document.getElementById('clock');
    clock.textContent = `${day}. ${month} ${year}, ${hours}:${minutes}:${seconds}`; // Vis dato med månedsnavn og tid

    const body = document.body;
    const icon = document.getElementById('icon');
    const daySound = document.getElementById('daySound');
    const nightSound = document.getElementById('nightSound');

    // Spill daglyden ved 12:00 (middag) hvis den ikke allerede har blitt spilt  
    if (hours === 12 && minutes === '00' && !isDaySoundPlayed) {
        daySound.play();
        isDaySoundPlayed = true; // Sett flagget til true  
    }

    // Spill nattlyden ved 00:00 (midnatt) hvis den ikke allerede har blitt spilt  
    if (hours === 0 && minutes === '00' && !isNightSoundPlayed) {
        nightSound.play();
        isNightSoundPlayed = true; // Sett flagget til true  
    }

    // Oppdater dag/natt-tema basert på tiden  
    if (hours >= 6 && hours < 18) {
        body.classList.add('day');
        body.classList.remove('night');
        icon.className = 'sun';

        // Tilbakestill nattlyden flagget  
        isNightSoundPlayed = false;
    } else {
        body.classList.add('night');
        body.classList.remove('day');
        icon.className = 'moon';

        // Tilbakestill daglyden flagget  
        isDaySoundPlayed = false;
    }
}

// Oppdater klokken hvert sekund  
setInterval(updateClock, 1000);
updateClock(); // Kall funksjonen én gang for å sette initial tid
