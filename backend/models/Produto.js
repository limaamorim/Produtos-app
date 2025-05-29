const mongoose = require('mongoose');

const ProdutoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'O nome do produto é obrigatório'],
    trim: true,
    maxlength: [100, 'Nome não pode exceder 100 caracteres']
  },
  descricao: {
    type: String,
    trim: true,
    maxlength: [500, 'Descrição não pode exceder 500 caracteres']
  },
  imagem: {
    type: String,
    default: ''
  }
}, {
  timestamps: true // Adiciona createdAt e updatedAt automaticamente
});

module.exports = mongoose.model('Produto', ProdutoSchema);