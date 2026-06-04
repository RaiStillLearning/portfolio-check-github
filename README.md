# 🔍 Portfolio Check GitHub

> Analyze, rate, and improve your GitHub portfolio — instantly.

**Portfolio Check GitHub** adalah aplikasi web berbasis Next.js yang menganalisis profil GitHub kamu secara menyeluruh dan memberikan skor berdasarkan 5 kategori utama. Cocok untuk developer yang ingin mempersiapkan portofolio sebelum melamar kerja atau freelance.

---

## ✨ Demo

🌐 **Live:** [portfolio-check-github.vercel.app](https://portfolio-check-github.vercel.app) _(ganti dengan URL kamu)_

---

## 📊 Kategori Penilaian

Skor total dihitung dari 5 kategori dengan bobot masing-masing:

| Kategori | Bobot | Deskripsi Singkat |
|---|---|---|
| 📦 Repository Quality | 30% | Kelengkapan dan konsistensi repo publik |
| ⚡ Activity | 20% | Frekuensi kontribusi dan keaktifan |
| 📝 Documentation | 20% | Kualitas README di tiap repo |
| 🚀 Deployment | 15% | Proyek yang sudah live/deploy |
| 🌐 Project Diversity | 15% | Variasi teknologi dan domain |

---

### 📦 Repository Quality — 30%

Menilai kelengkapan dan kualitas metadata repo publik kamu.

| Metrik | Keterangan |
|---|---|
| **Jumlah repo publik** | Semakin banyak repo yang informatif, semakin baik |
| **Kelengkapan deskripsi** | Persentase repo yang memiliki field `description` terisi |
| **Topik & tags** | Penggunaan GitHub Topics untuk tiap repo |
| **Konsistensi penamaan** | Apakah nama repo menggunakan format yang konsisten (kebab-case, dll.) |

**Tips:** Pastikan setiap repo punya deskripsi singkat dan minimal 2–3 topik relevan.

---

### ⚡ Activity — 20%

Mengukur seberapa aktif kamu berkontribusi di GitHub.

| Metrik | Keterangan |
|---|---|
| **Commit 30 hari terakhir** | Total commit dalam sebulan terakhir |
| **Frekuensi push** | Rata-rata push per minggu |
| **Streak kontribusi** | Panjang streak aktif di contribution graph |

**Tips:** Konsistensi lebih penting dari volume — commit kecil setiap hari lebih baik dari burst besar sebulan sekali.

---

### 📝 Documentation — 20%

Menilai kualitas README di setiap repo berdasarkan kelengkapan kontennya.

| Metrik | Keterangan |
|---|---|
| **Keberadaan README** | Apakah file `README.md` ada di root repo |
| **Kualitas konten** | Poin untuk setiap bagian: judul, deskripsi, fitur, teknologi |
| **Instruksi setup** | Ada tidaknya panduan instalasi / cara menjalankan proyek |

**Tips:** Gunakan template README dengan section: `About`, `Tech Stack`, `Getting Started`, `Screenshots`, `License`.

---

### 🚀 Deployment — 15%

Mengecek apakah proyek kamu sudah di-deploy dan bisa diakses publik.

| Metrik | Keterangan |
|---|---|
| **Link live demo** | URL website aktif yang tercantum di repo (field `homepage`) |
| **Platform deploy** | Deteksi platform: Vercel, Netlify, Railway, GitHub Pages, dll. |
| **Jumlah project live** | Total proyek yang berhasil terdeteksi sebagai live |

**Tips:** Selalu isi field `Website` di repo GitHub dengan link deploy-mu agar terdeteksi.

---

### 🌐 Project Diversity — 15%

Menilai variasi teknologi dan cakupan domain proyek kamu.

| Metrik | Keterangan |
|---|---|
| **Variasi bahasa** | Jumlah bahasa pemrograman berbeda yang dipakai |
| **Domain berbeda** | Frontend, backend, mobile, CLI, open-source library, dll. |
| **Stack yang dipakai** | Deteksi framework dari nama repo, topik, dan bahasa utama |

**Tips:** Punya setidaknya 1 proyek full-stack atau lintas domain menunjukkan fleksibilitas sebagai developer.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 14+](https://nextjs.org/) (App Router)
- **Styling:** Tailwind CSS
- **Data Source:** [GitHub REST API v3](https://docs.github.com/en/rest)
- **Deployment:** Vercel

---

## 🚀 Getting Started

### Prerequisites

- Node.js `>= 18`
- npm / yarn / pnpm
- GitHub Personal Access Token _(opsional, untuk rate limit lebih tinggi)_

### Installation

```bash
# Clone repo
git clone https://github.com/username/portfolio-check-github.git
cd portfolio-check-github

# Install dependencies
npm install
```

### Environment Variables

Buat file `.env.local` di root project:

```env
# Opsional tapi direkomendasikan — meningkatkan rate limit GitHub API dari 60 → 5000 req/jam
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxx
```

> Cara buat token: GitHub → Settings → Developer settings → Personal access tokens → Generate new token
> Scope yang dibutuhkan: `public_repo`, `read:user`

### Run Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

### Build for Production

```bash
npm run build
npm start
```

---

## 🔌 GitHub API Usage

Aplikasi ini menggunakan beberapa endpoint GitHub API:

| Endpoint | Tujuan |
|---|---|
| `GET /users/{username}` | Data profil pengguna |
| `GET /users/{username}/repos` | Daftar repo publik |
| `GET /repos/{owner}/{repo}/readme` | Cek keberadaan README |
| `GET /users/{username}/events` | Data aktivitas & commit terbaru |
| `GET /repos/{owner}/{repo}/contributors` | Deteksi jenis kontribusi |

> **Rate Limit:** Tanpa token = 60 req/jam. Dengan token = 5.000 req/jam.

---

## 🤝 Contributing

Kontribusi sangat diterima! Berikut cara berkontribusi:

1. Fork repo ini
2. Buat branch baru: `git checkout -b feat/nama-fitur`
3. Commit perubahan: `git commit -m "feat: tambah fitur X"`
4. Push ke branch: `git push origin feat/nama-fitur`
5. Buat Pull Request

---

## 📄 License

Distributed under the MIT License. See [`LICENSE`](./LICENSE) for more information.

---

## 👤 Author

Dibuat dengan ☕ oleh **[Rai](https://github.com/RaiStillLearning)**

> _"Portofolio yang baik bukan soal banyaknya repo, tapi soal cerita yang kamu bangun."_
