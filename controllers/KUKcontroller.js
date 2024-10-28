const { KUK } = require('../models'); 

// Mengambil semua KUK
exports.getAllKUKs = async (req, res) => {
    try {
        const kuks = await KUK.findAll();
        return res.status(200).json({
            status: 200,
            message: "KUKs retrieved successfully",
            data: kuks
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ 
            status: 500, 
            message: "Error fetching KUKs", 
            error: error.message || error 
        });
    }
};

// Membuat KUK baru
exports.createKUK = async (req, res) => {
    const { namaKriteria } = req.body; // Ambil hanya namaKriteria dari request body

    try {
        const newKUK = await KUK.create({ namaKriteria }); // Hanya simpan namaKriteria
        return res.status(201).json({
            status: 201,
            message: 'KUK created successfully',
            data: newKUK,
        });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ 
            status: 400, 
            message: "Error creating KUK", 
            error: error.message || error 
        });
    }
};

// Memperbarui KUK
exports.updateKUK = async (req, res) => {
    const { id } = req.params;

    try {
        const [updated] = await KUK.update(req.body, { where: { id } });

        if (updated) {
            const updatedKUK = await KUK.findByPk(id);
            return res.status(200).json({
                status: 200,
                message: "KUK updated successfully",
                data: updatedKUK
            });
        }
        return res.status(404).json({ 
            status: 404, 
            message: "KUK not found" 
        });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ 
            status: 400, 
            message: "Error updating KUK", 
            error: error.message || error 
        });
    }
};

// Menghapus KUK
exports.deleteKUK = async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await KUK.destroy({ where: { id } });
        if (deleted) {
            return res.status(204).send();
        }
        return res.status(404).json({ 
            status: 404, 
            message: "KUK not found" 
        });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ 
            status: 400, 
            message: "Error deleting KUK", 
            error: error.message || error 
        });
    }
};
