const { Unit, JudulUnit, Elemen, KUK } = require('../models');

// Mengambil semua unit
exports.getUnits = async (req, res) => {
  try {
    const units = await Unit.findAll({
      include: [
        {
          model: JudulUnit,
          as: 'judul_unit',
          attributes: ['id', 'judul_unit']
        },
        {
          model: Elemen, // Menggunakan relasi dengan Elemen
          as: 'elemen',
          attributes: ['id', 'nama_elemen'],
          include: [
          {
            model: KUK,
            as: 'kuks', // Pastikan ini sesuai dengan alias di model Elemen
            attributes: ['id', 'namaKriteria'],
          },
        ],
        },

      ]
    });

    if (units.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "Not found / empty data",
        data: null,
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Data Retrieved",
      data: units,
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

exports.getUnitBySkemaId = async (req, res) => {
  try {
    const skema_id = req.params.skema_id; 

    const units = await Unit.findAll({
      where: { skema_id: skema_id },
      include: [
        {
          model: JudulUnit,
          as: 'judul_unit',
          attributes: ['id', 'judul_unit'],
        },
        {
          model: Elemen,
          as: 'elemen',
          attributes: ['id', 'nama_elemen'],
          include: [
            {
              model: KUK,
              as: 'kuks',
              attributes: ['id', 'namaKriteria'],
            },
          ],
        },
      ],
    });

    if (units.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "No units found for this skema",
        data: null,
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Data Retrieved",
      data: units,
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

// Menyimpan unit baru
// exports.storeUnit = async (req, res) => {
//   try {
//     const { kode_unit, judul_unit_id, skema_id } = req.body;

//     // Cek jika kode_unit sudah ada
//     const existingUnit = await Unit.findOne({ where: { kode_unit } });
//     if (existingUnit) {
//       return res.status(400).json({
//         status: 400,
//         message: "Kode Unit already exists",
//       });
//     }

//     const addUnit = await Unit.create({
//       kode_unit,
//       judul_unit_id,
//       skema_id
//     });

//     return res.status(201).json({
//       status: 201,
//       message: `Unit ${kode_unit} Successfully Created`,
//       data: addUnit,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(400).json({
//       status: 400,
//       message: "Bad Request",
//       error: error.message || error,
//     });
//   }
// };

exports.storeUnit = async (req, res) => {
  try {
    const { skema_id } = req.params; 
    const { kode_unit, judul_unit_id } = req.body;

    const existingJudulUnit = await JudulUnit.findOne({ where: { id: judul_unit_id } });
    if (!existingJudulUnit) {
      return res.status(400).json({
        status: 400,
        message: "Judul Unit does not exist",
      });
    }

    // Cek jika kode_unit sudah ada
    const existingUnit = await Unit.findOne({ where: { kode_unit } });
    if (existingUnit) {
      return res.status(400).json({
        status: 400,
        message: "Kode Unit already exists",
      });
    }

    const addUnit = await Unit.create({
      kode_unit,
      judul_unit_id,
      skema_id
    });

    return res.status(201).json({
      status: 201,
      message: `Unit ${kode_unit} Successfully Created`,
      data: addUnit,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      status: 400,
      message: "Bad Request",
      error: error.message || error,
    });
  }
};


// Mengambil unit berdasarkan ID
exports.getUnitById = async (req, res) => {
  try {
    const id = req.params.id;
    const unit = await Unit.findByPk(id, {
      include: [
        {
          model: JudulUnit,
          as: 'judul_unit',
          attributes: ['id', 'judul_unit']
        },
        {
          model: Elemen, // Menggunakan relasi dengan Elemen
          as: 'elemen',
          attributes: ['id', 'nama_elemen']
        }
      ]
    });

    if (!unit) {
      return res.status(404).json({
        status: 404,
        message: "Unit not found",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Data Retrieved",
      data: unit,
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

// Memperbarui unit
exports.updateUnit = async (req, res) => {
  try {
    const id = req.params.id;

    const [updated] = await Unit.update(req.body, {
      where: { id: id },
    });

    if (updated) {
      const updatedUnit = await Unit.findByPk(id, {
        include: [
          {
            model: JudulUnit,
            as: 'judul_unit',
            attributes: ['id', 'judul_unit']
          },
          {
            model: Elemen, // Menggunakan relasi dengan Elemen
            as: 'elemen',
            attributes: ['id', 'nama_elemen']
          }
        ]
      });

      return res.status(200).json({
        status: 200,
        message: "Data Updated",
        data: updatedUnit,
      });
    }

    return res.status(404).json({
      status: 404,
      message: "Unit not found",
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      status: 400,
      message: "Failed to update Unit",
      error: error.message || error,
    });
  }
};

// Menghapus unit
exports.deleteUnit = async (req, res) => {
  try {
    const id = req.params.id;

    const unit = await Unit.findByPk(id);

    if (!unit) {
      return res.status(404).json({
        status: 404,
        message: "Unit not found",
      });
    }

    await Unit.destroy({
      where: {
        id,
      },
    });

    return res.status(200).json({
      status: 200,
      message: "Unit Deleted",
      data: unit,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      status: 400,
      message: "Failed to delete Unit",
      error: error.message || error,
    });
  }
};

// mengambil judul unit
exports.getJudulUnit = async (req, res) => {
  try {
    const judulUnit = await JudulUnit.findAll();

    if (judulUnit.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "Not found / empty data",
        data: null,
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Data Judul Unit",
      data: judulUnit,
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
