// Simple Firebase App
class NilaiController {
    constructor() {
        this.db = firebase.firestore();
        this.init();
    }

    init() {
        console.log("NilaiController initialized");
        
        // Form submit
        document.getElementById('nilai-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitForm();
        });

        // Lihat data button
        document.getElementById('lihat-data-btn').addEventListener('click', () => {
            this.showData();
        });

        // Kembali button
        document.getElementById('kembali-btn').addEventListener('click', () => {
            this.showForm();
        });
    }

    async submitForm() {
        const nama = document.getElementById('nama').value;
        const nim = document.getElementById('nim').value;
        const mataKuliahSelect = document.getElementById('mata_kuliah');
        const mataKuliah = mataKuliahSelect.options[mataKuliahSelect.selectedIndex].text;
        const nilai = document.getElementById('nilai').value;

        console.log("Submitting:", { nama, nim, mataKuliah, nilai });

        if (!nama || !nim || !mataKuliah || !nilai) {
            this.showNotification('Semua field harus diisi!', 'error');
            return;
        }

        try {
            // Add a new document with generated id
            const docRef = await this.db.collection("nilai").add({
                nama: nama,
                nim: nim,
                mata_kuliah: mataKuliah,
                nilai: parseFloat(nilai),
                tanggal: new Date().toISOString()
            });

            console.log("Document written with ID: ", docRef.id);
            this.showNotification('Data berhasil disimpan!', 'success');
            document.getElementById('nilai-form').reset();

        } catch (error) {
            console.error("Error adding document: ", error);
            this.showNotification('Gagal menyimpan data: ' + error.message, 'error');
        }
    }

    async showData() {
        try {
            console.log("Loading data...");
            
            const querySnapshot = await this.db.collection("nilai").get();
            const tbody = document.querySelector('#nilai-table tbody');
            tbody.innerHTML = '';

            if (querySnapshot.empty) {
                tbody.innerHTML = '<tr><td colspan="4" style="text-align: center;">Belum ada data</td></tr>';
            } else {
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    const row = `
                        <tr>
                            <td>${data.nim || '-'}</td>
                            <td>${data.nama || '-'}</td>
                            <td>${data.mata_kuliah || '-'}</td>
                            <td>${data.nilai || '0'}</td>
                        </tr>
                    `;
                    tbody.innerHTML += row;
                });
            }

            // Show data section
            document.querySelector('.form-section').classList.add('hidden');
            document.getElementById('data-section').classList.remove('hidden');

        } catch (error) {
            console.error("Error getting documents: ", error);
            this.showNotification('Gagal memuat data: ' + error.message, 'error');
        }
    }

    showForm() {
        document.getElementById('data-section').classList.add('hidden');
        document.querySelector('.form-section').classList.remove('hidden');
    }

    showNotification(message, type) {
        const notification = document.getElementById('notification');
        notification.textContent = message;
        notification.className = `notification ${type}`;
        notification.style.display = 'block';

        setTimeout(() => {
            notification.style.display = 'none';
        }, 5000);
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Wait for Firebase to load
    if (typeof firebase !== 'undefined') {
        new NilaiController();
        console.log("App started successfully");
    } else {
        console.error("Firebase not loaded");
    }
});