Siap bro. Kita **freeze dulu #01 — Product Vision** supaya nanti saat masuk desain database/UI kita punya acuan yang jelas.

# #01 — PRODUCT VISION

## Aplikasi Komunitas

### 1. Identitas Produk

**Nama:** Aplikasi Komunitas

**Positioning:**

> **Digital Platform Komunitas Olahraga**
F
Fokus tahap awal adalah **minisoccer**. Setelah platform minisoccer berjalan stabil, baru kemungkinan dikembangkan ke olahraga lain seperti **pickleball**.

---

## 2. Masalah yang Diselesaikan

Aplikasi dibuat karena pengelolaan komunitas minisoccer saat ini masih banyak bergantung pada media komunikasi seperti WhatsApp dan pencatatan manual.

Masalah utamanya:

- Management komunitas belum terstruktur.
- Data anggota dan pemain tidak terdokumentasi dengan baik.
- History pertandingan sulit dilacak.
- Statistik pemain umumnya tidak tersedia atau masih manual.
- Tidak ada sistem terpusat untuk mengelola pertandingan.
- Tidak ada Live Score/Live Match yang terintegrasi.
- Pemain kurang memiliki keterikatan dengan komunitas karena perjalanan dan pencapaiannya tidak terdokumentasi.

---

# 3. Solusi yang Ditawarkan

Aplikasi Komunitas menggabungkan dua fungsi utama:

### Community Platform

Untuk:

- membuat komunitas
- menemukan komunitas
- bergabung dengan komunitas
- mengelola anggota
- mengundang pemain
- community profile
- aktivitas komunitas

### Sports Management Platform

Untuk:

- Team
- Player
- Season
- Match
- Live Match
- Live Score
- Match Events
- Player Statistics
- Team Statistics
- Ranking/Standings

Sehingga:

```text id="l4qf2v"
             APLIKASI KOMUNITAS
                     │
           ┌─────────┴─────────┐
           │                   │
     COMMUNITY PLATFORM   SPORTS PLATFORM
           │                   │
        Members              Teams
        Community            Players
        Invitation           Seasons
        Activities            Matches
                             Live Match
                             Statistics
```

---

# 4. Positioning terhadap WhatsApp

Aplikasi Komunitas **bukan pengganti WhatsApp**.

WhatsApp:

> Media komunikasi.

Aplikasi Komunitas:

> Platform management + data + aktivitas olahraga.

Jadi komunitas tetap boleh menggunakan WhatsApp untuk komunikasi, tetapi data dan aktivitas olahraga dikelola di Aplikasi Komunitas.

---

# 5. Core Product Loop

Salah satu tujuan utama aplikasi adalah meningkatkan **engagement pemain terhadap komunitas**.

Flow yang kita inginkan:

```text id="m2k8ne"
JOIN COMMUNITY
       ↓
BERMAIN
       ↓
MATCH TERCATAT
       ↓
STATISTIK BERTAMBAH
       ↓
PLAYER MELIHAT PERFORMA
       ↓
RANKING / ACHIEVEMENT
       ↓
TERTARIK BERMAIN LAGI
       ↓
BERMAIN LAGI
```

Jadi statistik bukan hanya fitur laporan.

**Statistics adalah bagian dari engagement mechanism.**

---

# 6. Community sebagai Core Entity

Community adalah **boundary utama data olahraga**.

Contoh:

```text id="qk7l6m"
Rafli
│
├── Community A
│      ├── Role: OWNER
│      ├── Team: Balikpapan FC
│      └── Statistics: Community A
│
├── Community B
│      ├── Role: ADMIN
│      ├── Team: Borneo United
│      └── Statistics: Community B
│
└── Community C
       ├── Role: MEMBER
       └── Statistics: Community C
```

**Statistik antar-community tidak dicampur.**

---

# 7. User ≠ Player

Akun user dan player profile merupakan dua konsep berbeda.

Seorang user bisa:

- menjadi Owner
- menjadi Admin
- menjadi Member
- menjadi Player

secara independen sesuai konteks community.

Contoh:

```text id="c7z9oa"
Rafli
│
└── Balikpapan Community
       │
       ├── Role: ADMIN
       │
       └── Player Profile: YES
```

Admin tidak otomatis berarti Player.

Member juga tidak wajib menjadi Player.

---

# 8. Create Community

Pembuatan community dibuat **sesederhana mungkin**.

### Wajib

- Nama komunitas

### Opsional

- Slogan
- Banner
- Logo/profile image komunitas

Flow:

```text id="2ny0sg"
CREATE COMMUNITY
       ↓
Nama
Slogan (optional)
Banner (optional)
Logo (optional)
       ↓
CREATE
       ↓
COMMUNITY CREATED
       ↓
CREATOR = OWNER
```

Creator otomatis menjadi **Owner**.

---

# 9. Community Invitation

User memiliki **unique @username**.

Owner/Admin dapat mencari user berdasarkan:

```text
@username
```

Kemudian mengirim invitation.

**Invitation tidak otomatis membuat user menjadi member.**

Flow:

```text id="0f9hcm"
OWNER / ADMIN
      ↓
Search @username
      ↓
Invite
      ↓
Invitation
      ↓
USER
  ├── ACCEPT → MEMBER
  └── DECLINE
```

---

# 10. Role Hierarchy

Untuk saat ini role utama:

```text id="ps9n4c"
OWNER
  ↓
ADMIN
  ↓
MEMBER
```

### OWNER

Authority tertinggi dalam community.

Bisa:

- mengelola community
- mengelola Admin
- mengelola member
- mengelola invitation
- membuat/mengelola Season
- membuat/mengelola Match
- mengelola Team
- Live Match
- Statistics
- transfer ownership
- menghapus community

### ADMIN

Fokus pada **community + sports operation**.

Bisa:

- mengelola member
- invitation
- add/manage player
- create/manage Season
- create/manage Match
- Live Match
- Statistics
- Team management

Tetapi **tidak boleh**:

- mengelola Owner
- menambah/menghapus Admin lain
- transfer ownership
- menghapus Community

### MEMBER

Bisa:

- melihat community
- melihat match
- melihat season
- melihat statistik
- mengikuti aktivitas community

Detail permission akan kita finalisasi di tahap **#02 User & Actor**.

---

# 11. Role Bersifat Per Community

Role **bukan atribut global User**.

Contoh:

```text id="0u7v8e"
Rafli

Community A → OWNER
Community B → ADMIN
Community C → MEMBER
```

Ini adalah keputusan arsitektur yang **LOCKED**.

---

# 12. Tidak Ada League

Untuk versi sekarang:

❌ League

Struktur kompetisi:

```text id="i7m9eq"
COMMUNITY
    │
    └── SEASON
          │
          └── MATCH
                │
                └── LIVE MATCH
                      │
                      └── EVENTS
```

Season menjadi wadah aktivitas/pertandingan dalam sebuah community.

---

# 13. Live Match

Live Match merupakan salah satu fitur inti.

Match memiliki event seperti:

- Goal
- Assist
- Yellow Card
- Red Card
- Substitution
- dan event pertandingan lainnya yang nanti kita tentukan.

Event tersebut menjadi sumber data statistik.

```text id="yr2f6w"
LIVE MATCH
     ↓
MATCH EVENTS
     ↓
PLAYER / TEAM STATISTICS
```

Kita **tidak ingin statistik utama diisi sebagai angka manual** jika angka tersebut bisa dihitung dari event pertandingan.

---

# 14. Statistik

Statistik bersifat **individual dan scoped per Community**.

Contoh:

```text id="x3v2n1"
RAFLI

Community A
────────────
Matches  24
Goals    18
Assists  11
MVP       4

Community B
────────────
Matches   8
Goals     2
Assists   3
MVP       0
```

Tidak digabung menjadi satu statistik global.

Statistik dapat ditampilkan berdasarkan:

- Community
- Season
- Team
- Player
- Match

---

# 15. First User Experience

Flow dasar user baru:

```text id="b7m4sc"
OPEN APP
   ↓
REGISTER
   ↓
Nama
Email
Password
Profile Photo
   ↓
EMAIL OTP
   ↓
VERIFIED
   ↓
LOGIN / SESSION
   ↓
HOME
   ↓
EXPLORE COMMUNITY
   ↓
JOIN / CREATE COMMUNITY
```

**Profile photo wajib.**

Tujuannya agar user memiliki identitas visual seperti player profile, bukan sekadar akun teks.

---

# 16. Target User

Aplikasi tidak hanya untuk pemain.

Targetnya mencakup:

### Player

Bermain dan melihat perkembangan statistik.

### Community Owner

Membuat dan memiliki community.

### Community Admin

Mengelola operasional community dan olahraga.

### Member

Mengikuti community dan aktivitasnya.

### Spectator

Melihat pertandingan, Live Score, standings/statistik yang memang dibuat publik, tanpa harus menjadi member.

---

# 🔒 STATUS #01

Menurut saya **Product Vision sudah cukup kuat untuk kita LOCK**.

### Yang sudah final:

- ✅ Digital Platform Komunitas Olahraga
- ✅ Fokus awal minisoccer
- ✅ Community sebagai core entity
- ✅ User bisa memiliki banyak community
- ✅ Statistik terpisah per community
- ✅ User ≠ Player
- ✅ Role bersifat per community
- ✅ Owner
- ✅ Admin
- ✅ Member
- ✅ Admin boleh manage member & invitation
- ✅ Admin tidak bisa manage Owner/Admin lain
- ✅ Create Community sederhana
- ✅ `@username` unik
- ✅ Invitation harus Accept/Decline
- ✅ Season
- ❌ League
- ✅ Match
- ✅ Live Match
- ✅ Match Events
- ✅ Individual Statistics
- ✅ Profile photo wajib
- ✅ Email OTP
- ✅ PWA → Android/iPhone sebagai target platform

**#01 kita anggap selesai.**

Selanjutnya **#02 — User & Actor**. Di bagian ini kita akan benar-benar membedah **User, Membership, Player, Owner, Admin, Member, dan Visitor**, termasuk seluruh lifecycle dan edge case-nya sebelum kita menyentuh ERD.
