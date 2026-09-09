Siap. Kita rekap **briefing Aplikasi Komunitas** yang sudah kita sepakati sejauh ini. Saya pisahkan mana yang **LOCKED** dan mana yang masih **belum diputuskan**, supaya nanti saat masuk database/coding tidak ada asumsi yang nyelip.

# 📋 APLIKASI KOMUNITAS — PRODUCT BRIEF V1

## 1. Visi Produk

**Aplikasi Komunitas** adalah:

> **Digital Platform Komunitas Olahraga**

Fokus awal:

> ⚽ **Minisoccer**

Tujuan utamanya bukan menggantikan WhatsApp, tetapi menjadi platform untuk mengelola aktivitas komunitas olahraga secara terstruktur.

### Masalah yang ingin diselesaikan

Saat ini komunitas olahraga umumnya:

* komunikasi menggunakan WhatsApp
* data anggota tidak terstruktur
* pertandingan dicatat manual
* statistik pemain tidak terdokumentasi
* histori performa pemain hilang
* sulit melihat perkembangan pemain
* turnamen/fourfeo masih banyak dikelola manual

Aplikasi menjadi pusat pengelolaan:

```text
Community
   ↓
Members
   ↓
Fourfeo
   ↓
Match
   ↓
Live Score & Events
   ↓
Statistics
   ↓
Leaderboard
```

---

# 2. Konsep Utama

### Community adalah entity utama.

Satu user dapat bergabung ke beberapa Community.

Contoh:

```text
USER
 ├── Community A
 │     └── Role: OWNER
 │
 ├── Community B
 │     └── Role: ADMIN
 │
 └── Community C
       └── Role: MEMBER
```

Data olahraga/statistik **dipisahkan berdasarkan Community**.

Jadi statistik pemain di Community A tidak tercampur dengan Community B.

---

# 3. User ≠ Player

Ini salah satu keputusan penting.

```text
USER ACCOUNT
   │
   ├── Global Profile
   │
   └── Community Membership
          │
          └── Player Profile (optional)
```

Artinya seseorang bisa menjadi:

* Member tetapi bukan pemain
* Player
* Owner sekaligus Player
* Admin sekaligus Player

**Player bukan Role.**

---

# 4. User Account

Setiap user mempunyai:

* Nama
* Email
* Password / credential
* Unique **@username**
* Profile photo

Username digunakan untuk:

* mencari user
* invitation
* identitas user
* kemungkinan profile URL/mention di masa depan

---

# 5. Registrasi & Onboarding

Flow yang sudah kita sepakati:

```text
Visitor
   ↓
Register
   ↓
Name
Email
Password
   ↓
Email OTP
   ↓
Profile Setup
   ↓
Upload Photo
   ↓
@Username
   ↓
Username Unique
   ↓
Profile Complete
   ↓
Login
   ↓
Home
```

Email OTP wajib.

Profile photo wajib.

Username wajib dan harus unique.

---

# 6. Community

User dapat membuat Community.

Create Community dibuat **simple**:

```text
Community Name      *
Slogan
Banner
Profile / Logo
```

Yang wajib:

> **Name**

Yang optional:

> Slogan, Banner, Logo/Profile.

---

# 7. Community Role

Saat ini hanya ada tiga Role:

### OWNER

Authority tertinggi.

Owner dapat:

* mengelola Community
* mengelola Member
* mengelola Admin
* mengelola invitation
* membuat/mengelola Fourfeo
* mengelola Team
* mengelola Match
* mengoperasikan Live Match
* mengelola statistik
* transfer ownership
* delete Community

Community hanya mempunyai **satu Owner aktif**.

---

### ADMIN

Admin adalah:

> **Community Admin + Sports Manager + Match Operator**

Admin dapat:

* mengelola Member
* invitation
* player
* Team
* Fourfeo
* Match
* Drawing
* Live Match
* statistik

Tetapi Admin **tidak boleh**:

* mengelola Owner
* mengelola Admin lain
* transfer ownership
* delete Community

Tidak diperlukan Role khusus:

> ❌ Match Operator

Karena fungsi operator dilakukan oleh Admin.

---

### MEMBER

Member adalah anggota biasa.

Member bisa mengikuti aktivitas Community sesuai permission yang diberikan.

Member **belum tentu Player**.

---

# 8. Membership

Membership bersifat **Community-specific**.

User bisa:

```text
Community A → OWNER
Community B → ADMIN
Community C → MEMBER
```

Jika user keluar Community:

> histori pertandingan dan statistiknya **tidak dihapus**.

Jika user bergabung kembali:

> histori lama tetap berlanjut.

Tetapi assignment Team lama **tidak otomatis dikembalikan**.

Untuk Fourfeo berikutnya, pemain harus masuk roster/drawing lagi.

---

# 9. Suspension

Suspension tidak menghapus data.

Contoh alasan:

* pelanggaran aturan
* tunggakan pembayaran
* masalah internal Community

Kita memisahkan konsep:

```text
Membership Status
        ≠
Playing Eligibility
```

Jadi seseorang bisa tetap tercatat sebagai Member tetapi tidak eligible untuk bermain.

---

# 10. FOURFEO — CORE FEATURE V1

Untuk sekarang kita **tidak membuat Tournament Engine generik**.

Fokus hanya:

# ⚽ FOURFEO

Format:

> **4 Team**

Semua team bertemu satu kali.

Total:

> **6 Match**

---

# 11. Team

Team dibuat **khusus untuk Fourfeo**.

Team bukan permanent team Community.

Contoh Fourfeo 1:

```text
Garuda FC
Rajawali FC
Borneo FC
Nusantara FC
```

Fourfeo berikutnya bisa:

```text
Black Panther
Red Dragon
Blue Warrior
Golden Boys
```

Jadi Team sebelumnya tidak otomatis menjadi Team permanen.

---

# 12. Roster Team

Setiap Team mempunyai:

> **Minimum 10 pemain**
> **Maximum 16 pemain**

Pemain yang terdaftar di Team = roster.

---

# 13. Pemain Saat Pertandingan

Minisoccer bersifat fleksibel.

Saat bermain:

> **9 pemain di lapangan**

Komposisinya:

> **1 GK + 8 pemain**

Tetapi pemain bebas bergantian keluar-masuk.

Karena itu:

### Tidak ada:

❌ Lineup tetap
❌ Substitution tracking
❌ Menit bermain
❌ Event player masuk
❌ Event player keluar

Admin hanya mencatat event penting.

---

# 14. Player Drawing 🎲

Pemain **tidak memilih Team sendiri**.

Setelah pendaftaran Fourfeo ditutup:

```text
Participants
     ↓
Create 4 Teams
     ↓
🎲 Player Drawing
     ↓
Player → Team
```

Sistem mengacak pemain ke Team.

Pembagian harus seimbang.

Contoh:

```text
40 Players

Team A → 10
Team B → 10
Team C → 10
Team D → 10
```

Jika tidak habis dibagi:

```text
41 Players

11
10
10
10
```

Selisih jumlah pemain maksimal **1**, selama batas roster memungkinkan.

---

# 15. Manual Assignment

Admin mempunyai opsi khusus:

> **Manual Assignment**

Untuk kondisi tertentu, Admin dapat mengatur pemain secara manual.

Misalnya:

```text
Rafli
Garuda FC
      ↓
Borneo FC
```

Manual override harus tetap tercatat sebagai histori/audit.

Jadi kita punya:

```text
Original Drawing
       ↓
Manual Override
       ↓
Final Team Assignment
```

---

# 16. Drawing Lock

Hasil drawing sebaiknya dikunci setelah selesai.

Sebelum pertandingan dimulai:

> Admin masih dapat melakukan koreksi/redraw sesuai aturan yang nanti kita tetapkan.

Setelah pertandingan berjalan:

> **Assignment tidak boleh diubah.**

Tujuannya menjaga integritas histori dan statistik.

---

# 17. Match Drawing 🎲

Selain pemain, **match juga di-drawing**.

Empat Team:

```text
A
B
C
D
```

Harus menghasilkan enam pasangan:

```text
A vs B
C vs D

A vs C
B vs D

A vs D
B vs C
```

Urutannya dapat diacak.

Tetapi sistem harus memastikan:

> setiap pasangan bertemu **tepat satu kali**.

Tidak boleh:

```text
A vs B
A vs B
```

dua kali.

---

# 18. One Field

Fourfeo menggunakan:

> **1 lapangan**

Pertandingan berlangsung sequential.

```text
Match 1
   ↓
Match 2
   ↓
Match 3
   ↓
Match 4
   ↓
Match 5
   ↓
Match 6
```

Hanya satu match aktif pada satu waktu.

---

# 19. Live Match

Admin menjadi operator pertandingan melalui laptop/app.

Live Match menyediakan:

### ⚽ Goal

Admin memilih:

```text
Team
Scorer
Assist
Waktu
```

Assist bisa:

> No Assist

---

### 🎯 Assist

Dicatat sebagai bagian dari event Goal.

---

### 🟨 Yellow Card

```text
Team
Player
Waktu
```

---

### 🟥 Red Card

```text
Team
Player
Waktu
```

---

### Tidak ada substitution.

Live Match fokus pada event yang memang penting untuk statistik.

---

# 20. Match Lifecycle

Secara konsep:

```text
SCHEDULED
    ↓
LIVE
    ↓
FINISHED
```

Saat Live:

```text
Start
Timer
Pause/Resume
Goal
Assist
Yellow Card
Red Card
Score
Finish
```

---

# 21. Match sebagai Source of Truth

Statistik tidak boleh sekadar angka manual.

Sumber utamanya:

> **Match Events**

Contoh:

```text
Goal
Rafli
Assist Andi
```

akan menghasilkan:

```text
Rafli +1 Goal
Andi +1 Assist
```

Setelah match selesai:

```text
Match Events
     ↓
Player Statistics
     ↓
Team Result
     ↓
Klasemen
     ↓
Leaderboard
```

---

# 22. Koreksi Match

Admin boleh melakukan koreksi terhadap Match yang sudah selesai.

Tetapi koreksi harus:

1. Membatalkan efek statistik lama
2. Menerapkan data yang benar
3. Menghitung ulang klasemen
4. Menghitung ulang statistik
5. Menyimpan audit log

Audit:

```text
Who
When
Previous Data
New Data
Reason
```

---

# 23. Klasemen

Fourfeo mempunyai klasemen.

Format dasar:

| # | Team   |  P |  W |  D |  L | GF | GA | GD | PTS |
| - | ------ | -: | -: | -: | -: | -: | -: | -: | --: |
| 1 | Team A |  3 |  2 |  1 |  0 |  7 |  3 | +4 |   7 |
| 2 | Team B |  3 |  2 |  0 |  1 |  6 |  4 | +2 |   6 |
| 3 | Team C |  3 |  1 |  0 |  2 |  4 |  6 | -2 |   3 |
| 4 | Team D |  3 |  0 |  1 |  2 |  2 |  6 | -4 |   1 |

Perhitungan yang **sudah kita sepakati secara konsep**:

> Menang = 3 poin
> Seri = 1 poin
> Kalah = 0 poin

**Tie-breaker belum final.**

---

# 24. Player Statistics

Statistik individual dipisahkan dari klasemen Team.

Contoh:

```text
PLAYER LEADERBOARD

Rafli       5 Goal   2 Assist
Andi        4 Goal   4 Assist
Budi        3 Goal   1 Assist
```

Statistik tetap **Community-scoped**.

---

# 25. Leaderboard Cycle

Ini tetap menjadi bagian penting.

Setiap:

> **10 Fourfeo = 1 Leaderboard Cycle**

Contoh saat berjalan:

```text
LEADERBOARD TOP SCORER SEMENTARA

SEASON 2 OF 10
```

Setelah Fourfeo ke-10:

```text
LEADERBOARD AKHIR

SEASON 1–10
```

Statistik dari masing-masing Fourfeo dikumpulkan ke cycle tersebut.

Player boleh:

* ikut Fourfeo #1
* tidak ikut #2
* ikut #3
* tidak ikut #4
* dst.

Tidak wajib ikut setiap event.

---

# 26. Core Product Loop

Ini sebenarnya inti dari seluruh aplikasi:

```text
JOIN COMMUNITY
       ↓
JOIN FOURFEO
       ↓
PLAYER DRAWING
       ↓
GET TEAM
       ↓
MATCH
       ↓
LIVE SCORE
       ↓
GOAL / ASSIST / CARD
       ↓
MATCH FINISHED
       ↓
STATISTICS
       ↓
KLASEMEN
       ↓
LEADERBOARD
       ↓
MOTIVATION
       ↓
JOIN FOURFEO BERIKUTNYA
```

Itulah **game loop** utama Aplikasi Komunitas.

---

# 🔒 STATUS BRIEFING SAAT INI

### SUDAH LOCKED

* Aplikasi Komunitas
* Digital Platform Komunitas Olahraga
* Fokus awal Minisoccer
* Community sebagai core entity
* User bisa punya banyak Community
* Statistik terpisah per Community
* User ≠ Player
* Role: Owner / Admin / Member
* Owner/Admin bisa menjadi Player
* @username unique
* OTP registration
* Profile photo wajib
* Community creation sederhana
* Fourfeo sebagai core competition V1
* 4 Team
* 6 Match
* Single round robin
* One field
* Player Drawing
* Match Drawing
* Team roster 10–16 pemain
* 9 pemain di lapangan: 1 GK + 8
* Rotasi bebas
* Tidak ada substitution tracking
* Admin sebagai Match Operator
* Goal
* Assist
* Yellow Card
* Red Card
* Live Match
* Klasemen
* Player statistics
* Leaderboard cycle 10 Fourfeo
* Manual assignment/override

### ⚠️ MASIH PERLU DIPUTUSKAN

Beberapa detail kecil masih belum kita kunci:

1. **Minimum peserta total** untuk Fourfeo.
2. Apakah peserta Fourfeo harus **Member Community** atau boleh guest.
3. Apakah pendaftaran Fourfeo perlu **approval Admin**.
4. **Durasi pertandingan**.
5. **Tie-breaker klasemen**.
6. Detail aturan **redraw/manual assignment**.
7. Detail **timer Live Match**.
8. Jenis statistik tambahan selain Goal, Assist, Yellow, Red.
9. Detail bagaimana pemain menjadi **Player Profile** dalam Community.
