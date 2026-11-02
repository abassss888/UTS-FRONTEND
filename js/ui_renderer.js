function formatNumber(value) {
    return Number(value).toLocaleString("id-ID", { maximumFractionDigits: 2 });
}

export function renderDashboard(lahan, tanaman) {
    document.getElementById("total-lahan").textContent = formatNumber(lahan.length);
    document.getElementById("total-luas").textContent = formatNumber(
        lahan.reduce((total, item) => total + Number(item.luas || 0), 0)
    );
    document.getElementById("total-tanaman").textContent = formatNumber(tanaman.length);
}

export function renderLahan(lahan) {
    const tbody = document.getElementById("daftar-lahan");
    tbody.replaceChildren();

    if (lahan.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5">Belum ada data lahan.</td></tr>`;
        return;
    }

    lahan.forEach((item, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.nama}</td>
            <td>${item.lokasi}</td>
            <td>${formatNumber(item.luas)} ha</td>
            <td>
                <button type="button" class="btn-edit" data-action="edit-lahan" data-id="${item.id}">Edit</button>
                <button type="button" class="btn-delete" data-action="delete-lahan" data-id="${item.id}">Hapus</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

export function renderLahanOptions(lahan, selectedId = "") {
    const select = document.getElementById("lahan-tanaman");
    select.replaceChildren();

    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = lahan.length === 0 ? "-- Belum ada lahan --" : "-- Pilih Lahan --";
    select.appendChild(defaultOption);

    lahan.forEach((item) => {
        const option = document.createElement("option");
        option.value = String(item.id);
        option.textContent = `${item.nama} - ${item.lokasi}`;
        if (String(item.id) === String(selectedId)) option.selected = true;
        select.appendChild(option);
    });

    select.disabled = lahan.length === 0;
}

export function renderTanaman(tanaman, lahan) {
    const tbody = document.getElementById("daftar-tanaman");
    tbody.replaceChildren();

    if (tanaman.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8">Belum ada data tanaman.</td></tr>`;
        return;
    }

    tanaman.forEach((item, index) => {
        const lahanTerkait = lahan.find((dataLahan) => String(dataLahan.id) === String(item.lahanId));
        const namaLahan = lahanTerkait ? lahanTerkait.nama : "Lahan tidak ditemukan";

        const statusClasses = {
            "Baru Ditanam": "status-baru",
            "Dalam Perawatan": "status-perawatan",
            "Siap Panen": "status-panen",
            "Sudah Dipanen": "status-selesai"
        };

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.nama}</td>
            <td>${item.jenis}</td>
            <td>${namaLahan}</td>
            <td>${item.tanggalTanam}</td>
            <td>${formatNumber(item.jumlah)} batang</td>
            <td><span class="status ${statusClasses[item.status] || ''}">${item.status}</span></td>
            <td>
                <button type="button" class="btn-edit" data-action="edit-tanaman" data-id="${item.id}">Edit</button>
                <button type="button" class="btn-delete" data-action="delete-tanaman" data-id="${item.id}">Hapus</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

export function showMessage(elementId, message, type = "success") {
    const element = document.getElementById(elementId);
    if (!element) return;
    element.textContent = message;
    element.className = `form-message ${type}`;
}