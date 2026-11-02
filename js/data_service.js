// =====================================
// DATA DUMMY BARU (AGROLAND NUSANTARA)
// =====================================

const LAHAN_KEY = "agroland_lahan";
const TANAMAN_KEY = "agroland_tanaman";

try {
    localStorage.removeItem(LAHAN_KEY);
    localStorage.removeItem(TANAMAN_KEY);
} catch (error) {
    console.warn("Storage tidak dapat diakses:", error);
}

let dataLahan = [
    {
        id: 1,
        nama: "Lahan Blok Merdeka",
        lokasi: "Kecamatan Rogojampi, Blok 1",
        luas: 3.0
    },
    {
        id: 2,
        nama: "Lahan Agrowisata Blimbingsari",
        lokasi: "Desa Blimbingsari",
        luas: 5.5
    },
    {
        id: 3,
        nama: "Lahan Makmur Banyuwangi",
        lokasi: "Kecamatan Giri",
        luas: 2.0
    }
];

let dataTanaman = [
    {
        id: 1,
        nama: "Padi Inpari 32",
        jenis: "Pangan",
        lahanId: 1,
        tanggalTanam: "2026-09-05",
        jumlah: 1500,
        status: "Siap Panen"
    },
    {
        id: 2,
        nama: "Jagung Hibrida",
        jenis: "Pangan",
        lahanId: 1,
        tanggalTanam: "2026-09-22",
        jumlah: 500,
        status: "Dalam Perawatan"
    },
    {
        id: 3,
        nama: "Cabai Rawit Dewata",
        jenis: "Sayuran",
        lahanId: 1,
        tanggalTanam: "2026-09-15",
        jumlah: 300,
        status: "Dalam Perawatan"
    },
    {
        id: 4,
        nama: "Kopi Arabika Ijen",
        jenis: "Perkebunan",
        lahanId: 2,
        tanggalTanam: "2026-04-12",
        jumlah: 350,
        status: "Dalam Perawatan"
    },
    {
        id: 5,
        nama: "Buah Naga Merah",
        jenis: "Buah",
        lahanId: 2,
        tanggalTanam: "2026-06-10",
        jumlah: 200,
        status: "Siap Panen"
    },
    {
        id: 6,
        nama: "Mangga Arumanis",
        jenis: "Buah",
        lahanId: 3,
        tanggalTanam: "2026-07-01",
        jumlah: 120,
        status: "Baru Ditanam"
    }
];

function generateId(data) {
    const maxId = data.reduce((max, item) => {
        const id = Number(item.id);
        return Number.isFinite(id) ? Math.max(max, id) : max;
    }, 0);
    return maxId + 1;
}

export function getLahan() { return [...dataLahan]; }

export function saveLahan(lahan) {
    if (lahan.id !== "" && lahan.id !== null && lahan.id !== undefined) {
        const index = dataLahan.findIndex((item) => String(item.id) === String(lahan.id));
        if (index !== -1) {
            dataLahan[index] = { ...dataLahan[index], ...lahan };
            return true;
        }
        return false;
    } else {
        const dataBaru = { ...lahan, id: generateId(dataLahan) };
        dataLahan.push(dataBaru);
        return true;
    }
}

export function deleteLahan(id) {
    const initialLength = dataLahan.length;
    dataLahan = dataLahan.filter((item) => String(item.id) !== String(id));
    return dataLahan.length !== initialLength;
}

export function getTanaman() { return [...dataTanaman]; }

export function saveTanaman(tanaman) {
    if (tanaman.id !== "" && tanaman.id !== null && tanaman.id !== undefined) {
        const index = dataTanaman.findIndex((item) => String(item.id) === String(tanaman.id));
        if (index !== -1) {
            dataTanaman[index] = { ...dataTanaman[index], ...tanaman };
            return true;
        }
        return false;
    } else {
        const dataBaru = { ...tanaman, id: generateId(dataTanaman) };
        dataTanaman.push(dataBaru);
        return true;
    }
}

export function deleteTanaman(id) {
    const initialLength = dataTanaman.length;
    dataTanaman = dataTanaman.filter((item) => String(item.id) !== String(id));
    return dataTanaman.length !== initialLength;
}

export function clearAllData() {
    dataLahan = [];
    dataTanaman = [];
    return true;
}