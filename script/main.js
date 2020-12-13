// mendaftarkan service worker

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/jadwal-sholat-sampit/service-worker.js")
      .then((reg) => console.log("Service Worker: Registered (Pages)"))
      .catch((err) => console.log(`Service Worker: Error: ${err}`));
  });
}

// menampilkan jam digital
function showTime() {
  var date = new Date();
  var jam = date.getHours(); // 0 - 23
  var menit = date.getMinutes(); // 0 - 59
  var detik = date.getSeconds(); // 0 - 59
  var tahun = date.getFullYear(); 
  //   gunakan kode dibawah untuk format 12 jam
  //   var session = "AM";

  //   if (h == 0) {
  //     h = 12;
  //   }

  //   if (h > 12) {
  //     h = h - 12;
  //     session = "PM";
  //   }

  // kode dibawah untuk menambahkan angka nol(0)
  // jika waktu hanya menunjukkan 1 angka
  jam = jam < 10 ? "0" + jam : jam;
  menit = menit < 10 ? "0" + menit : menit;
  detik = detik < 10 ? "0" + detik : detik;

  var time = jam + ":" + menit + ":" + detik + " ";
  document.getElementById("MyClockDisplay").innerText = time;
  document.getElementById("MyClockDisplay").textContent = time;

  var titleWeb = "Jadwal Sholat Sampit dan sekitarnya " + tahun;
  document.querySelector('title').textContent  = titleWeb;

  setTimeout(showTime, 1000);
}

showTime(); //memanggil fungsi untuk menampilkan jam

// kode dibawah untuk mengatur tampilan halaman utama

const user = document.querySelector('.con-user')
    const menu = document.querySelector('.con-menu')
    const contents = document.querySelector('.con-contents')
    const links = document.querySelector('.con-contents .con-links')
    const posts = document.querySelector('.con-contents .con-posts')
    window.addEventListener("load", function (event) {
        const vh = window.innerHeight * 0.01
        document.documentElement.style.setProperty('--vh', `${vh}px`)

        setTimeout(function () {
            window.scrollTo(0, 1)
        }, 0)
        const h = window.innerHeight - menu.clientHeight - user.clientHeight
        contents.style.height = `${h}px`
        links.style.height = `${h}px`
        posts.style.height = `${h}px`
    })

    function handleClick(evt, name) {
        const items = document.querySelectorAll('.con-menu button')
        const el = evt.target
        items.forEach((item) => {
            item.classList.remove('active')
        })
        el.classList.add('active')
        const elScroll = document.querySelector(`.${name}`)
        contents.scrollTo(elScroll.offsetLeft, 0)
    }

    contents.addEventListener('scroll', (evt) => {
        if (evt.target.scrollLeft > window.innerWidth / 2 && evt.target.scrollLeft < window.innerWidth + (window.innerWidth / 2)) {
            menu.querySelector('button:nth-child(1)').classList.remove('active')
            menu.querySelector('button:nth-child(2)').classList.add('active')
        } else if (evt.target.scrollLeft < window.innerWidth / 2) {
            menu.querySelector('button:nth-child(1)').classList.add('active')
            menu.querySelector('button:nth-child(2)').classList.remove('active')
        } else if (evt.target.scrollLeft > window.innerWidth + (window.innerWidth / 2)) {
            menu.querySelector('button:nth-child(2)').classList.remove('active')
            menu.querySelector('button:nth-child(3)').classList.add('active')
        }
    })
