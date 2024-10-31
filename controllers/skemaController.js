const { Skema, JenisSkema, ModeSkema, Unit, Elemen, KUK, KelPekerjaan } = require('../models');

// Mengambil semua skema
exports.getSkema = async (req, res) => {
  try {
    const skemas = await Skema.findAll({
    include: [
  {
    model: JenisSkema,
    as: 'jenis_skema1',
    attributes: ['id', 'jenis_skema'],
  },
  {
    model: ModeSkema,
    as: 'mode_skema1',
    attributes: ['id', 'mode_skema'],
  },
  {
    model: KelPekerjaan,
    as: 'kel_pekerjaan',
    attributes: ['id', 'kelompok_pekerjaan'],
    include: [
      {
        model: Unit,
        as: 'units',
        attributes: ['id', 'kode_unit', 'judul_unit_id'],
      }
    ]
  },
  {
    model: Unit,
    as: 'units',
    attributes: ['id', 'kode_unit', 'judul_unit_id'],
    include: [
      {
        model: Elemen,
        as: 'elemen', // Pastikan ini sesuai dengan alias di model Unit
        attributes: ['id', 'nama_elemen'],
        include: [
          {
            model: KUK,
            as: 'kuks', // Pastikan ini sesuai dengan alias di model Elemen
            attributes: ['id', 'namaKriteria'],
          },
        ],
      },
    ],
  },
],

    });

    if (skemas.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "Not found / empty data",
        data: null,
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Data Skema",
      data: skemas,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      error: error.message || error,
    });
  }
};

// Mengambil skema berdasarkan ID
exports.getIdSkema = async (req, res) => {
  try {
    const id = req.params.id;
    const skema = await Skema.findByPk(id, {
      include: [
        {
          model: JenisSkema,
          as: 'jenis_skema1',
          attributes: ['id', 'jenis_skema'],
        },
        {
          model: ModeSkema,
          as: 'mode_skema1',
          attributes: ['id', 'mode_skema'],
        },
        {
          model: Unit, // Menambahkan relasi dengan Unit
          as: 'units',
          attributes: ['id', 'kode_unit', 'judul_unit_id'],
        },
      ],
    });

    if (!skema) {
      return res.status(404).json({
        status: 404,
        message: "Data not found",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Data Skema",
      data: skema,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      error: error.message || error,
    });
  }
};

// Menyimpan skema baru
exports.storeSkema = async (req, res) => {
  try {
    const {
      kode_skema,
      judul_skema,
      bidang,
      standar_kompetensi,
      jenis_skema_id,
      mode_skema_id,
      dokumen_skema,
      dokumen_standar_kompetensi
    } = req.body;

    // Validasi input dapat ditambahkan di sini

    const addSkema = await Skema.create({
      kode_skema,
      judul_skema,
      bidang,
      standar_kompetensi,
      jenis_skema_id,
      mode_skema_id,
      dokumen_skema,
      dokumen_standar_kompetensi
    });

    return res.status(201).json({
      status: 201,
      message: "Skema Successfully Created",
      data: addSkema,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      status: 400,
      message: "Failed to create Skema",
      error: error.message || error, // Tampilkan pesan kesalahan yang lebih spesifik
    });
  }
};

// Memperbarui skema
exports.updateSkema = async (req, res) => {
  try {
    const id = req.params.id;

    const [updated] = await Skema.update(req.body, {
      where: { id: id },
    });

    if (updated) {
      const updatedSkema = await Skema.findByPk(id);

      return res.status(200).json({
        status: 200,
        message: "Data Updated",
        data: updatedSkema,
      });
    }

    return res.status(404).json({
      status: 404,
      message: "Data not found",
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      status: 400,
      message: "Failed to update Skema",
      error: error.message || error,
    });
  }
};

// Menghapus skema
exports.deleteSkema = async (req, res) => {
  try {
    const id = req.params.id;

    const skema = await Skema.findByPk(id);

    if (!skema) {
      return res.status(404).json({
        status: 404,
        message: "Skema not found",
      });
    }

    await Skema.destroy({
      where: {
        id,
      },
    });

    return res.status(200).json({
      status: 200,
      message: "Skema Deleted",
      data: skema,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      status: 400,
      message: "Failed to delete Skema",
      error: error.message || error,
    });
  }
};

// mengambil jenis skema
exports.getJenisSkema = async (req, res) => {
  try {
    const jenisSkema = await JenisSkema.findAll();

    if (jenisSkema.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "Not found / empty data",
        data: null,
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Data Jenis Skema",
      data: jenisSkema,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      error: error.message || error,
    });
  }
};

// mengambil mode skema

exports.getModeSkema = async (req, res) => {
  try {
    const modeSkema = await ModeSkema.findAll();

    if (modeSkema.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "Not found / empty data",
        data: null,
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Data Mode Skema",
      data: modeSkema,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      error: error.message || error,
    });
  }
};
