# wxt510-visualize
## Aplikasi Visualisasi sensor cuaca WXT-510
## Instalasi
Prasyarat: Database MySQL baik online maupun local, Node.js versi >16, git.
- Clone repositori ini dan lakukan build:
```bash
git clone https://github.com/hfrk/wxt510-visualize
cd wxt510-visualize
cd ../frontend && npm install && npm run build
cp -r build ../backend/build
cd ../backend && npm install
electron-packager . Visualisasi-WXT510 --platform=win32 --arch=x64
```
- Copy file `.env` dari folder `Visualisasi-WXT510/resources/app` ke folder `Visualisasi-WXT510/`, lalu edit dan sesuaikan dengan kebutuhan.
- Jalankan program `Visualisasi-WXT510.exe`. Restart aplikasi bila terjadi error.

## Error yang ditemui:
- `net::ERR_NETWORK_IO_SUSPENDED` saat perangkat dalam keadaan sleep.
- `net::ERR_INSUFFICIENT_RESOURCES` saat aplikasi dijalankan dalam waktu yang lama, kemungkinan terdapat memory leak.

## To-do:
- Tampilan visualisasi data historis dengan jangka waktu yang bisa diatur (versi sekarang masih terbatas pada 24 jam).
- Tampilan data historis dari suhu, kelembapan, dan tekanan udara (versi sekarang masih menggunakan plotting langsung dari data real-time).
- Implementasikan fetching data real time menggunakan websocket (versi sekarang masih menggunakan `setInterval`).
- Konfigurasi aplikasi yang intuitif dan mudah dipahami orang awam sekalipun (versi sekarang masih menggunakan file .env).
- Error handler pada sisi backend maupun aplikasi Electron (versi sekarang masih force reload atau restart aplikasi bila terdapat error).
