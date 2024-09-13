# AeroCalib

Repositori untuk pengembangan aplikasi kalibrasi alat pengujian di terowongan angin.

## Sebelum Pengembangan

Aplikasi berbasis desktop ini menggunakan [Tauri](https://tauri.app/) sehingga sebelum mulai, harap memperhatikan syarat yang harus dipenuhi berikut [INI](https://v2.tauri.app/start/prerequisites/).

Apabila sudah terpenuhi syarat yang diperlukan, jalankan instruksi di Terminal dengan `npm install` jika menggunakan [NodeJS](https://nodejs.org) atau `bun install` jika menggunakan [Bun](https://bun.sh/).

Dianjurkan untuk menggunakan **Rust Cargo** sebagai *Tauri CLI*. Untuk informasi instalasi dapat merujuk halaman [berikut](https://v2.tauri.app/start/create-project/).

Aplikasi ini menggunakan basis data **SurrealDB** sebagai penyimpanan data sehingga perlu dipasang terlebih dahulu dengan mengikuti pedoman [berikut](https://surrealdb.com/docs/surrealdb/installation).


## Mulai Pengembangan
Jalankan servis penyimpanan data dengan instruksi di terminal `surreal start --user root --pass root file:aerocalib.db` atau `./rundb.sh` jika menggunakan sistem operasi Linux/UNIX.
Jalankan instruksi di Terminal dengan `npm run tauri dev` untuk menampilkan aplikasi *AeroCalib*.
