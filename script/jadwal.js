$.ajax({
  url: "https://api.pray.zone/v2/times/today.json",
  type: "get",
  dataType: "json",
  data: {
    city: "sampit",
  },
  success: function (hasil) {
    if (hasil.code == 200) {
      $("#hari").html(
        `
          <h2> ` +
          hasil.results.datetime[0].date.gregorian +
          `</h2>
          <table class="table table-striped">
    <thead>
      <tr>
        <th scope="col">Sholat</th>
        <th scope="col">Waktu</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Imsak</td>
        <td>` +
          hasil.results.datetime[0].times.Imsak +
          `</td>
      </tr>
      <tr>
        <td>Subuh</td>
        <td>` +
          hasil.results.datetime[0].times.Fajr +
          `</td>
      </tr>
      <tr>
        <td>Dzuhur</td>
        <td>` +
          hasil.results.datetime[0].times.Dhuhr +
          `</td>
      </tr>
      <tr>
        <td>Ashr</td>
        <td>` +
          hasil.results.datetime[0].times.Asr +
          `</td>
      </tr>
      <tr>
        <td>Maghrib</td>
        <td>` +
          hasil.results.datetime[0].times.Maghrib +
          `</td>
      </tr>
      <tr>
        <td>Isya'</td>
        <td>` +
          hasil.results.datetime[0].times.Isha +
          `</td>
      </tr>
    </tbody>
  </table>
        `
      );
    }
  },
});
$.ajax({
  url: "https://api.pray.zone/v2/times/this_week.json",
  type: "get",
  dataType: "json",
  data: {
    city: "sampit",
  },
  success: function (minggu) {
    if (minggu.code == 200) {
      let seminggu = minggu.results.datetime;
      tambahTabel(seminggu);
      
      // fungsi untuk menambah data ke dalam tabel dengan perulangan
      function tambahTabel(data) {
        var tabel = document.getElementById("minggu");
        for (var i = 0; i < data.length; i++) {
          var baris = `<tr>
        <td>${data[i].date.gregorian}</td>
        <td>${data[i].times.Fajr}</td>
        <td>${data[i].times.Dhuhr}</td>
        <td>${data[i].times.Asr}</td>
        <td>${data[i].times.Maghrib}</td>
        <td>${data[i].times.Isha}</td>
       
      </tr>`;
          tabel.innerHTML += baris;
        }
      }
    }
  },
});
