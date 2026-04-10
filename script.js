let data = [
  {
    nama: "Bali",
    desc: "Pantai indah",
    img: "bali.jpg",
    harga: 1500000,
    rating: 5
  },
  {
    nama: "Lombok",
    desc: "Gunung",
    img: "lombok.jpg",
    harga: 1200000,
    rating: 4
  },
  {
    nama: "Raja Ampat",
    desc: "Laut",
    img: "rajaampat.jpg",
    harga: 3000000,
    rating: 5
  },
  {
    nama: "Bandung",
    desc: "Kota",
    img: "bandung.jpg",
    harga: 800000,
    rating: 3
  }
];

const container = document.getElementById("cardContainer");

// TAMPILKAN DATA
function render(filteredData = data) {
  container.innerHTML = "";

  filteredData.forEach((item, index) => {

    let stars = "⭐".repeat(item.rating);

    container.innerHTML += `
      <div class="card">
        <img src="${item.img}" alt="${item.nama}">
        <h3>${item.nama}</h3>
        <p>${item.desc}</p>

        <p><b>Harga:</b> Rp ${item.harga.toLocaleString()}</p>
        <p><b>Rating:</b> ${stars}</p>

        <button onclick="hapusItem(${index})">Hapus</button>
      </div>
    `;
  });
}

function filterData() {
  const keyword = document.getElementById("searchInput").value.toLowerCase();

  const hasil = data.filter(item =>
    item.nama.toLowerCase().includes(keyword)
  );

  render(hasil);
}

function tambahItem() {
  const val = document.getElementById("newItem").value;

  if (val) {
    data.push({
      nama: val,
      desc: "Paket baru",
      img: "img/default.jpg",
      harga: 1000000,
      rating: 4
    });
    render();
  }
}

const hargaPaket = {
  "Bali": 1500000,
  "Lombok": 1200000,
  "Raja Ampat": 3000000
};

const paketSelect = document.getElementById("paketSelect");
const jumlahInput = document.getElementById("jumlah");
const totalHarga = document.getElementById("totalHarga");

function hitungTotal() {
  const paket = paketSelect.value;
  const jumlah = jumlahInput.value;

  if (paket && jumlah > 0) {
    const total = hargaPaket[paket] * jumlah;
    totalHarga.innerText = "Rp " + total.toLocaleString();
  } else {
    totalHarga.innerText = "Rp 0";
  }
}

const jumlah = document.getElementById("jumlah").value;

if(!jumlah || jumlah <= 0) {
  alert("Jumlah orang harus lebih dari 0");
  valid = false;
}

// EVENT LISTENER
paketSelect.addEventListener("change", hitungTotal);
jumlahInput.addEventListener("input", hitungTotal);


// HAPUS DATA
function hapusItem(index) {
  data.splice(index, 1);
  render();
}

render();

// VALIDASI FORM
document.getElementById("bookingForm").addEventListener("submit", function(e){
  e.preventDefault();

  let valid = true;

  const nama = document.getElementById("nama").value;
  const email = document.getElementById("email").value;
  const telp = document.getElementById("telp").value;
  const paket = document.getElementById("paketSelect").value;
  const bayar = document.querySelector('input[name="bayar"]:checked');

  document.querySelectorAll(".error").forEach(e => e.innerText = "");

  if(!nama) {
    document.getElementById("errNama").innerText = "Nama wajib diisi";
    valid = false;
  }

  if(!email || !email.includes("@")) {
    document.getElementById("errEmail").innerText = "Email tidak valid";
    valid = false;
  }

  if(!telp || telp <= 0) {
    document.getElementById("errTelp").innerText = "Nomor harus positif";
    valid = false;
  }

  if(!paket) {
    document.getElementById("errPaket").innerText = "Pilih paket";
    valid = false;
  }

  if(!bayar) {
    document.getElementById("errBayar").innerText = "Pilih metode pembayaran";
    valid = false;
  }

  if(valid) {
    alert("Pemesanan berhasil!");
  }
});

function hapusItemByName(nama) {
  data = data.filter(item => item.nama !== nama);
  render();
}
