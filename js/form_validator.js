export function validateLahan(data) {
    const errors = {};

    if (!data.nama) {
        errors["error-nama-lahan"] = "Nama lahan wajib diisi.";
    } else if (data.nama.length < 3) {
        errors["error-nama-lahan"] = "Nama lahan minimal 3 karakter.";
    }

    if (!data.lokasi) {
        errors["error-lokasi-lahan"] = "Lokasi lahan wajib diisi.";
    } else if (data.lokasi.length < 3) {
        errors["error-lokasi-lahan"] = "Lokasi lahan minimal 3 karakter.";
    }

    if (data.luas === "" || data.luas === null || data.luas === undefined || !Number.isFinite(data.luas)) {
        errors["error-luas-lahan"] = "Luas lahan harus berupa angka.";
    } else if (data.luas <= 0) {
        errors["error-luas-lahan"] = "Luas lahan harus lebih dari 0 hektare.";
    }

    return { valid: Object.keys(errors).length === 0, errors };
}

export function validateTanaman(data) {
    const errors = {};

    if (!data.nama) {
        errors["error-nama-tanaman"] = "Nama tanaman wajib diisi.";
    } else if (data.nama.length < 2) {
        errors["error-nama-tanaman"] = "Nama tanaman minimal 2 karakter.";
    }

    const jenisTanamanValid = ["Pangan", "Sayuran", "Buah", "Perkebunan", "Lainnya"];
    if (!jenisTanamanValid.includes(data.jenis)) {
        errors["error-jenis-tanaman"] = "Silakan pilih jenis tanaman.";
    }

    if (data.lahanId === "" || data.lahanId === null || data.lahanId === undefined) {
        errors["error-lahan-tanaman"] = "Silakan pilih lahan terlebih dahulu.";
    }

    if (!data.tanggalTanam) {
        errors["error-tanggal-tanam"] = "Tanggal tanam wajib diisi.";
    }

    if (!Number.isFinite(data.jumlah) || data.jumlah <= 0) {
        errors["error-jumlah-tanaman"] = "Jumlah tanaman harus lebih dari 0.";
    }

    const statusValid = ["Baru Ditanam", "Dalam Perawatan", "Siap Panen", "Sudah Dipanen"];
    if (!statusValid.includes(data.status)) {
        errors["error-status-tanaman"] = "Silakan pilih status pertumbuhan.";
    }

    return { valid: Object.keys(errors).length === 0, errors };
}