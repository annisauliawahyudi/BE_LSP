const { Asesi } = require('../models');
const bcrypt = require('bcrypt');
const Excel = require('exceljs');

class AsesiController {

  static async getAllAsesi(req, res) {
    const { statusKeterangan } = req.query;

    try {
      const whereClause = statusKeterangan ? { keterangan: statusKeterangan } : {};
      const asesiData = await Asesi.findAll({ where: whereClause });
      res.json(asesiData);
    } catch (error) {
      res.status(500).json({ message: 'Gagal mengambil data asesi', error });
    }
  }

  static async addAsesi(req, res) {
    const { username, password, namaAsesi, keterangan } = req.body;
    
    if (!username || !password || !namaAsesi) {
      return res.status(400).json({ message: 'Username, password, dan nama wajib diisi' });
    }
    if (keterangan && !['Sudah divalidasi', 'Belum divalidasi', 'Perlu perbaikan', 'Tidak aktif'].includes(keterangan)) {
      return res.status(400).json({ message: 'Status keterangan tidak valid' });
    }
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newAsesi = await Asesi.create({
        username,
        password: hashedPassword,
        namaAsesi,
        keterangan: keterangan || 'Belum divalidasi'
      });
      res.status(201).json(newAsesi);
    } catch (error) {
      res.status(500).json({ message: 'Gagal membuat asesi', error });
    }
  }

  static async keteranganAsesi(req, res) {
    const { id } = req.params; 
    const { keterangan } = req.body; 

    if (!['Sudah divalidasi', 'Belum divalidasi', 'Perlu perbaikan', 'Tidak aktif'].includes(keterangan)) {
      return res.status(400).json({ message: 'Status keterangan tidak valid' });
    }

    try {
      const asesi = await Asesi.findByPk(id); 
      if (!asesi) {
        return res.status(404).json({ message: 'Asesi tidak ditemukan' });
      }

      asesi.keterangan = keterangan;
      await asesi.save();

      res.json({ message: 'Status keterangan asesi berhasil diperbarui', asesi });
    } catch (error) {
      res.status(500).json({ message: 'Gagal memperbarui status keterangan asesi', error });
    }
  }

  static async deactivateAsesi(req, res) {
    const { id } = req.params;

    try {
      const asesi = await Asesi.findByPk(id);
      if (!asesi) return res.status(404).json({ message: 'Asesi tidak ditemukan' });

      asesi.keterangan = 'Tidak aktif';
      await asesi.save();
      res.json({ message: 'Asesi berhasil dinonaktifkan' });
    } catch (error) {
      res.status(500).json({ message: 'Gagal menonaktifkan asesi', error });
    }
  }

  static async resetPassword(req, res) {
    const { id } = req.params;
    const { newPassword } = req.body;

    if (!newPassword) {
      return res.status(400).json({ message: 'Password baru wajib diisi' });
    }

    try {
      const asesi = await Asesi.findByPk(id);
      if (!asesi) return res.status(404).json({ message: 'Asesi tidak ditemukan' });

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      asesi.password = hashedPassword;
      await asesi.save();
      res.json({ message: 'Password berhasil diperbarui' });
    } catch (error) {
      res.status(500).json({ message: 'Gagal mereset password asesi', error });
    }
  }

  static async importExcel(req, res) {
    const workbook = new Excel.Workbook();
    await workbook.xlsx.readFile(req.file.path);
    const worksheet = workbook.worksheets[0];

    const asesiData = [];
    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      if (rowNumber > 1) { 
        asesiData.push({
          username: row.getCell(1).value,
          password: row.getCell(2).value,       
          namaAsesi: row.getCell(3).value,
          keterangan: row.getCell(4).value || 'Belum divalidasi',
        });
      }
    });

    try {
      const asesiPromises = asesiData.map(async (data) => {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        return Asesi.create({
          ...data,
          password: hashedPassword,
        });
      });

      await Promise.all(asesiPromises);
      res.json({ message: 'Data asesi berhasil diimpor' });
    } catch (error) {
      res.status(500).json({ message: 'Gagal mengimpor data asesi', error });
    }
  }
}

module.exports = AsesiController;
 