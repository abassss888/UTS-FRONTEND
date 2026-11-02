import {
    getLahan, saveLahan, deleteLahan,
    getTanaman, saveTanaman, deleteTanaman
} from "./data_service.js";

import {
    renderDashboard, renderLahan, renderTanaman,
    renderLahanOptions, showMessage
} from "./ui_renderer.js";

import { validateLahan, validateTanaman } from "./form_validator.js";

window.getLahan = getLahan;
window.getTanaman = getTanaman;

document.addEventListener("DOMContentLoaded", () => {
    renderAll();
    setupLahanForm();
    setupTanamanForm();
    setupTableActions();
});

function renderAll() {
    const lahan = getLahan();
    const tanaman = getTanaman();
    renderDashboard(lahan, tanaman);
    renderLahan(lahan);
    renderLahanOptions(lahan);
    renderTanaman(tanaman, lahan);
}

function setupLahanForm() {
    const form = document.getElementById("form-lahan");
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const data = {
            id: document.getElementById("lahan-id").value,
            nama: document.getElementById("nama-lahan").value.trim(),
            lokasi: document.getElementById("lokasi-lahan").value.trim(),
            luas: Number(document.getElementById("luas-lahan").value)
        };

        const hasil = validateLahan(data);
        clearErrors(["error-nama-lahan", "error-lokasi-lahan", "error-luas-lahan"]);

        if (!hasil.valid) {
            displayErrors(hasil.errors);
            showMessage("pesan-lahan", "Periksa kembali data lahan.", "error");
            return;
        }

        const isEdit = Boolean(data.id);
        saveLahan(data);
        form.reset();
        document.getElementById("lahan-id").value = "";
        document.getElementById("btn-simpan-lahan").textContent = "Simpan Lahan";

        showMessage("pesan-lahan", isEdit ? "Data lahan diperbarui." : "Data lahan ditambahkan.", "success");
        renderAll();
    });

    form.addEventListener("reset", () => {
        document.getElementById("lahan-id").value = "";
        document.getElementById("btn-simpan-lahan").textContent = "Simpan Lahan";
        clearErrors(["error-nama-lahan", "error-lokasi-lahan", "error-luas-lahan"]);
    });
}

function setupTanamanForm() {
    const form = document.getElementById("form-tanaman");
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const data = {
            id: document.getElementById("tanaman-id").value,
            nama: document.getElementById("nama-tanaman").value.trim(),
            jenis: document.getElementById("jenis-tanaman").value,
            lahanId: document.getElementById("lahan-tanaman").value,
            tanggalTanam: document.getElementById("tanggal-tanam").value,
            jumlah: Number(document.getElementById("jumlah-tanaman").value),
            status: document.getElementById("status-tanaman").value
        };

        const hasil = validateTanaman(data);
        clearErrors([
            "error-nama-tanaman", "error-jenis-tanaman", "error-lahan-tanaman",
            "error-tanggal-tanam", "error-jumlah-tanaman", "error-status-tanaman"
        ]);

        if (!hasil.valid) {
            displayErrors(hasil.errors);
            showMessage("pesan-tanaman", "Periksa kembali data tanaman.", "error");
            return;
        }

        const isEdit = Boolean(data.id);
        saveTanaman(data);
        form.reset();
        document.getElementById("tanaman-id").value = "";
        document.getElementById("btn-simpan-tanaman").textContent = "Simpan Tanaman";

        showMessage("pesan-tanaman", isEdit ? "Data tanaman diperbarui." : "Data tanaman ditambahkan.", "success");
        renderAll();
    });

    form.addEventListener("reset", () => {
        document.getElementById("tanaman-id").value = "";
        document.getElementById("btn-simpan-tanaman").textContent = "Simpan Tanaman";
        clearErrors([
            "error-nama-tanaman", "error-jenis-tanaman", "error-lahan-tanaman",
            "error-tanggal-tanam", "error-jumlah-tanaman", "error-status-tanaman"
        ]);
    });
}

function setupTableActions() {
    document.getElementById("daftar-lahan").addEventListener("click", (e) => {
        const btn = e.target.closest("button");
        if (!btn) return;
        const id = btn.dataset.id;
        if (btn.dataset.action === "edit-lahan") editLahan(id);
        if (btn.dataset.action === "delete-lahan") hapusLahan(id);
    });

    document.getElementById("daftar-tanaman").addEventListener("click", (e) => {
        const btn = e.target.closest("button");
        if (!btn) return;
        const id = btn.dataset.id;
        if (btn.dataset.action === "edit-tanaman") editTanaman(id);
        if (btn.dataset.action === "delete-tanaman") hapusTanaman(id);
    });
}

function editLahan(id) {
    const lahan = getLahan().find((item) => String(item.id) === String(id));
    if (!lahan) return;
    document.getElementById("lahan-id").value = lahan.id;
    document.getElementById("nama-lahan").value = lahan.nama;
    document.getElementById("lokasi-lahan").value = lahan.lokasi;
    document.getElementById("luas-lahan").value = lahan.luas;
    document.getElementById("btn-simpan-lahan").textContent = "Perbarui Lahan";
    document.getElementById("data-lahan").scrollIntoView({ behavior: "smooth" });
}

function hapusLahan(id) {
    const adaTanaman = getTanaman().some((item) => String(item.lahanId) === String(id));
    if (adaTanaman) {
        showMessage("pesan-lahan", "Lahan tidak dapat dihapus karena masih ada tanaman terkait.", "error");
        return;
    }
    if (confirm("Apakah Anda yakin ingin menghapus lahan ini?")) {
        deleteLahan(id);
        showMessage("pesan-lahan", "Data lahan berhasil dihapus.", "success");
        renderAll();
    }
}

function editTanaman(id) {
    const tanaman = getTanaman().find((item) => String(item.id) === String(id));
    if (!tanaman) return;
    document.getElementById("tanaman-id").value = tanaman.id;
    document.getElementById("nama-tanaman").value = tanaman.nama;
    document.getElementById("jenis-tanaman").value = tanaman.jenis;
    document.getElementById("tanggal-tanam").value = tanaman.tanggalTanam;
    document.getElementById("jumlah-tanaman").value = tanaman.jumlah;
    document.getElementById("status-tanaman").value = tanaman.status;
    renderLahanOptions(getLahan(), tanaman.lahanId);
    document.getElementById("lahan-tanaman").value = String(tanaman.lahanId);
    document.getElementById("btn-simpan-tanaman").textContent = "Perbarui Tanaman";
    document.getElementById("data-tanaman").scrollIntoView({ behavior: "smooth" });
}

function hapusTanaman(id) {
    if (confirm("Apakah Anda yakin ingin menghapus data tanaman ini?")) {
        deleteTanaman(id);
        showMessage("pesan-tanaman", "Data tanaman berhasil dihapus.", "success");
        renderAll();
    }
}

function clearErrors(ids) {
    ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.textContent = "";
    });
}

function displayErrors(errors) {
    Object.entries(errors).forEach(([id, message]) => {
        const el = document.getElementById(id);
        if (el) el.textContent = message;
    });
}