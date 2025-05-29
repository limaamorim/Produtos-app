import React, { useState, useEffect } from 'react';
import { Button, Image, View, TextInput, StyleSheet, FlatList, Text, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [image, setImage] = useState(null);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(false);

  // Substitua pelo IP correto da sua máquina
  const baseURL = 'https://backend-produtos.onrender.com';

  // Carrega os produtos ao iniciar
  useEffect(() => {
    loadProdutosFromStorage();
    fetchProdutos();
  }, []);

  const pickImage = async () => {
    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
    const mediaPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (cameraPermission.status !== 'granted' || mediaPermission.status !== 'granted') {
      Alert.alert('Permissão necessária', 'Precisamos da permissão para acessar a câmera e a galeria');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const saveProdutosToStorage = async (produtos) => {
    try {
      await AsyncStorage.setItem('@produtos', JSON.stringify(produtos));
    } catch (e) {
      console.error('Erro ao salvar produtos localmente:', e);
    }
  };

  const loadProdutosFromStorage = async () => {
    try {
      const produtosStorage = await AsyncStorage.getItem('@produtos');
      if (produtosStorage !== null) {
        setProdutos(JSON.parse(produtosStorage));
      }
    } catch (e) {
      console.error('Erro ao carregar produtos locais:', e);
    }
  };

  const uploadProduto = async () => {
    if (!image || !nome || !descricao) {
      return Alert.alert('Atenção', 'Preencha todos os campos.');
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('descricao', descricao);
    formData.append('imagem', {
      uri: image,
      name: 'foto.jpg',
      type: 'image/jpeg',
    });

    try {
      const response = await axios.post(`${baseURL}/produtos`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
      const novoProduto = response.data;
      const novosProdutos = [...produtos, novoProduto];
      
      setProdutos(novosProdutos);
      await saveProdutosToStorage(novosProdutos);
      
      setNome('');
      setDescricao('');
      setImage(null);
      
      Alert.alert('Sucesso', 'Produto cadastrado com sucesso!');
    } catch (error) {
      console.error('Erro:', error);
      Alert.alert('Erro', 'Não foi possível cadastrar o produto');
    } finally {
      setLoading(false);
    }
  };

  const fetchProdutos = async () => {
    try {
      const res = await axios.get(`${baseURL}/produtos`);
      setProdutos(res.data);
      await saveProdutosToStorage(res.data);
    } catch (err) {
      console.error('Erro:', err);
      Alert.alert('Erro', 'Não foi possível carregar os produtos do servidor');
    }
  };

  const deleteProduto = async (id) => {
    try {
      await axios.delete(`${baseURL}/produtos/${id}`);
      
      const novosProdutos = produtos.filter(produto => produto._id !== id);
      setProdutos(novosProdutos);
      await saveProdutosToStorage(novosProdutos);
      
      Alert.alert('Sucesso', 'Produto deletado com sucesso');
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
      Alert.alert('Erro', 'Não foi possível deletar o produto');
    }
  };

  const confirmDelete = (id) => {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja deletar este produto?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Deletar', onPress: () => deleteProduto(id) },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cadastro de Produtos</Text>
      
      <TextInput 
        placeholder="Nome do produto" 
        value={nome} 
        onChangeText={setNome} 
        style={styles.input} 
      />
      <TextInput 
        placeholder="Descrição do produto" 
        value={descricao} 
        onChangeText={setDescricao} 
        style={styles.input} 
        multiline
        numberOfLines={3}
      />
      
      <View style={styles.buttonContainer}>
        <Button 
          title="Tirar Foto do Produto" 
          onPress={pickImage} 
          color="#3498db"
        />
      </View>
      
      {image && <Image source={{ uri: image }} style={styles.image} />}
      
      {loading ? (
        <ActivityIndicator size="large" color="#3498db" style={styles.loading} />
      ) : (
        <View style={styles.buttonContainer}>
          <Button 
            title="Cadastrar Produto" 
            onPress={uploadProduto} 
            color="#2ecc71"
          />
        </View>
      )}
      
      <View style={styles.buttonContainer}>
        <Button 
          title="Atualizar Lista de Produtos" 
          onPress={fetchProdutos} 
          color="#9b59b6"
        />
      </View>
      
      <Text style={styles.subtitulo}>Produtos Cadastrados</Text>
      
      <FlatList
        data={produtos}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <View style={styles.produto}>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.descricao}>{item.descricao}</Text>
            {item.imagem && (
              <Image 
                source={{ uri: `${baseURL}/uploads/${item.imagem}` }} 
                style={styles.produtoImagem} 
              />
            )}
            <TouchableOpacity 
              style={styles.deleteButton} 
              onPress={() => confirmDelete(item._id)}
            >
              <Text style={styles.deleteButtonText}>Deletar</Text>
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={styles.lista}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    padding: 20, 
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: '600',
    color: '#34495e',
    marginTop: 20,
    marginBottom: 10,
  },
  input: { 
    borderWidth: 1, 
    padding: 12,
    marginBottom: 15, 
    borderRadius: 8,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    fontSize: 16,
  },
  image: { 
    width: '100%', 
    height: 200, 
    marginVertical: 10,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  produto: { 
    marginVertical: 10,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  nome: { 
    fontWeight: '600', 
    fontSize: 18,
    marginBottom: 5,
    color: '#2c3e50',
  },
  descricao: {
    color: '#7f8c8d',
    marginBottom: 10,
    fontSize: 14,
    lineHeight: 20,
  },
  produtoImagem: { 
    width: '100%', 
    height: 150, 
    marginTop: 10,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  loading: {
    marginVertical: 15,
  },
  buttonContainer: {
    marginVertical: 8,
    borderRadius: 8,
    overflow: 'hidden',
  },
  lista: {
    paddingBottom: 20,
  },
  deleteButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#e74c3c',
    borderRadius: 5,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
