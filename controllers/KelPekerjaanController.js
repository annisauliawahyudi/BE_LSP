// controllers/KelPekerjaanController.js
const { KelPekerjaan, Unit } = require("../models");

module.exports = {
  // Create: Membuat data kelompok pekerjaan baru
  async createKP(req, res) {
    try {
      const { kelompok_pekerjaan, unit_id, skema_id } = req.body;
      const kelPekerjaan = await KelPekerjaan.create({ kelompok_pekerjaan, unit_id, skema_id });
      return res.status(201).json(kelPekerjaan);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Read All: Mendapatkan semua data kelompok pekerjaan
  async getAllKP(req, res) {
    try {
      const kelPekerjaan = await KelPekerjaan.findAll({
        include: [{ model: Unit, as: "units" }], // Mengambil data terkait dari tabel unit
      });
      return res.status(200).json({
        status: "success",
        message: "Data kelompok pekerjaan retrieved succesfully",
        data: kelPekerjaan,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Read One: Mendapatkan data kelompok pekerjaan berdasarkan ID
  async getOneKP(req, res) {
    try {
      const { id } = req.params;
      const kelPekerjaan = await KelPekerjaan.findByPk(id, {
        include: [{ model: Unit, as: "units" }], // Mengambil data terkait dari tabel unit
      });
      if (!kelPekerjaan) {
        return res
          .status(404)
          .json({ error: "Kelompok pekerjaan tidak ditemukan" });
      }
      return res.status(200).json(kelPekerjaan);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Update: Memperbarui data kelompok pekerjaan berdasarkan ID
  async updateKP(req, res) {
    try {
      const { id } = req.params;
      const { kelompok_pekerjaan } = req.body;
      const [updated] = await KelPekerjaan.update(
        { kelompok_pekerjaan },
        {
          where: { id },
        }
      );
      if (!updated) {
        return res
          .status(404)
          .json({ error: "Kelompok pekerjaan tidak ditemukan" });
      }
      const updatedKelPekerjaan = await KelPekerjaan.findByPk(id);
      return res.status(200).json(updatedKelPekerjaan);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Delete: Menghapus data kelompok pekerjaan berdasarkan ID
  async deleteKP(req, res) {
    try {
      const { id } = req.params;
      const deleted = await KelPekerjaan.destroy({
        where: { id },
      });
      if (!deleted) {
        return res
          .status(404)
          .json({ error: "Kelompok pekerjaan tidak ditemukan" });
      }
      return res
        .status(204)
        .json({ message: "Kelompok pekerjaan berhasil dihapus" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};