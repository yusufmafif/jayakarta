#!/bin/sh
# Referensi cara menjalankan preview dev server di bawah launchd.
# CATATAN PENTING:
# 1. JANGAN pakai `exec` — launchctl submit gagal (exit 126/1) jika job mengganti
#    prosesnya sendiri via exec.
# 2. Jangan redirect log ke dalam direktori proyek (mis. .freebuff/) — terbukti
#    gagal diam-diam di bawah launchd. Gunakan /tmp.
# 3. Bentuk `launchctl submit` dengan script FILE juga gagal (exit 126).
#    Gunakan bentuk -c seperti di bawah.
#
# Cara pakai (contoh):
#   launchctl remove jayakarta-preview 2>/dev/null
#   launchctl submit -l jayakarta-preview -- /bin/sh -c \
#     'cd /Users/ibnindra/Documents/Jayakarta && /Users/ibnindra/.nvm/versions/node/v24.13.1/bin/node node_modules/next/dist/bin/next dev --webpack -p 3000 >> /tmp/jayakarta-preview.log 2>&1'
#   launchctl remove jayakarta-preview   # untuk menghentikan preview
cd /Users/ibnindra/Documents/Jayakarta || exit 1
/Users/ibnindra/.nvm/versions/node/v24.13.1/bin/node \
  node_modules/next/dist/bin/next dev --webpack -p 3000 \
  >> /tmp/jayakarta-preview.log 2>&1
