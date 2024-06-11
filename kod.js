//!klijentski kod

//instanciranje varijabli za polja
var username = document.getElementById("username");
var password = document.getElementById("password");
var poruka = document.getElementById("poruka").querySelector("p");

//instanciranje varijable za botun
let prijavi = document.getElementById('button');

//akcija koja će se desiti nakon klikanja na botun
prijavi.addEventListener('click', (event) => {
    //spriječi default-no ponašanje (ponovno učitavanje stranice)
    event.preventDefault();

    //uvjeti za podatke prije slanja na server
    //ako su i korisničko ime i lazinka prazni
    if (!username.value && !password.value) {
        alert("Niste unijeli korisničko ime i lozinku!");
        return;
    }
    //ako je korisničko ime prazno
    if (!username.value) {
        alert("Niste unijeli korisničko ime!");
        return;
    }
    //ako je lozinka prazna
    if (!password.value) {
        alert("Niste unijeli lozinku!");
        return;
    }

    //objekt sa svojstima tj. vrijednostima unesenih podataka od strane korisnika
    const DataToPost = {
        username: username.value,
        password: password.value
    };


    //?  API (Application Programming Interface) omogućuje različitim softverskim entitetima da
    //?  međusobno komuniciraju definiranjem skupa pravila. Ovdje je jedan entitet klijentska
    //?  strana (frontend), a drugi poslužiteljska strana (backend). Klijentsku stranu predstavljaju
    //?  HTML+CSS+JS kod, dok se poslužiteljska sastoji od Node.js/Express serverskog koda.
    //?  API-ji rade po principu međusobnog dijeljenja podataka kroz ciklus zahtjeva i odgovora.
    //?  Dakle, zahtjev se šalje API-ju, koji zatim dohvaća podatke te ih vraća korisniku.


    //?  Fetch je JS API funkcija koju koristimo za slanje HTTP zahtjeva. Dio je Fetch API-ja koji
    //?  je ugrađen u Google chrome. Svrha fetch-a je obavljanje mrežnih zahtjeva. Funkcija vraća
    //?  objećanje (promise) koje se rješava s 'response' objektom koji predstavlja odgovor na zahjtev


    //?  ovdje fetch koristimo za slanje POST zahtjeva s klijenta (preglednika) na poslužitelj
    //?  koji se nalazi na adresi u nastavku
    //! POST
    fetch('http://localhost:3000/login', { //pokreće fetch funkciju za slanje zahtjeva na navedenu adresu
        method: 'POST', //postavlja HTTP metodu na POST
        headers: {
            'Content-Type': 'application/json' //postavlja tip sadržaja na JSON
        },
        //u tijelu zahtjeva šaljemo podatke u odgovarajućem obliku
        body: JSON.stringify(DataToPost) //pretvara JS objekt u JSON string
    })
    //? prvi then blok dohvaća i parsira JSON odogovor s poslužitelja
    .then(response => {
        return response.json().then((data) => ({ //parsira odgovor u JSON i sprema podatke u 'data'
            status: response.status, //sprema statusni kod
            body: data //sprema parsirani JSON odgovor
        }));
    })
    //?  drugi then blok provjerava je li odgovor u redu
    .then(result => {
        //ako je status 200 OK -> korisnik je pronađen u bazi podataka
        if (result.status === 200) {
            //ispiši zelenu poruku o uspješnosti
            poruka.textContent = "Uspješna autentikacija! Preusmjeravanje...";
            poruka.style.color = "green";
            
            //stavi delay kako bi se mogla vidjeti uspješna poruka prije preusmjeravanja
            setTimeout(() => {
                window.location.href = './index.html'; //preusmjeravanje na index.html
            }, 5000); //5 sekundi

        }
        //ako je status 401 Unauthorized -> korisnik nije pronađen u bazi podataka
        else {
            //ispiši poruku i to je to
            poruka.textContent = "Neispravno korisničko ime ili lozinka!";
        }
    })
    //dohvati pogrešku ako nešto nije uredu (sa serverom)
    .catch(error => {
        console.error("Inside fetch catch()", error); //ispisujemo grešku u konzoli
        poruka.textContent = "Došlo je do pogreške prilikom slanja zahtjeva!";
    });

});