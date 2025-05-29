const express = require('express');
const multer = require('multer');
const Produto = require('../models/Produto');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ storage });

// POST /produtos
router.post('/', upload.single('imagem'), async (req, res) => {
  const { nome, descricao } = req.body;
  const imagem = req.file?.filename || '';

  try {
    const produto = await Produto.create({ nome, descricao, imagem });
    res.status(201).json(produto);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao salvar produto' });
  }
});

// GET /produtos
router.get('/', async (req, res) => {
  try {
    const produtos = await Produto.find();
    res.json(produtos);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
});

// DELETE /produtos/:id
// DELETE /produtos/:id
router.delete('/:id', async (req, res) => {
  try {
    const produto = await Produto.findById(req.params.id);
    
    if (!produto) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    // Remove a imagem associada se existir
    if (produto.imagem) {
      const imagePath = path.join(__dirname, '../uploads', produto.imagem);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Produto.findByIdAndDelete(req.params.id);
    res.json({ message: 'Produto deletado com sucesso' });
  } catch (err) {
    console.error('Erro ao deletar produto:', err);
    res.status(500).json({ error: 'Erro ao deletar produto' });
  }
});
module.exports = router;