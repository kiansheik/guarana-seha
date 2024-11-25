import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Button,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useFocusEffect } from '@react-navigation/native';
import { initializeDatabase, getUsers } from '../db';
import styles from './styles/ChatListStyles'; // Import styles

const ChatList = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false); // State for refreshing

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchUsers();
    setIsRefreshing(false);
  };

  useEffect(() => {
    initializeDatabase();
    fetchUsers();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchUsers();
    }, [])
  );

  const fetchUsers = () => {
    getUsers((data) => {
      if (data) {
        const sortedData = data.sort(
          (a, b) => new Date(b.date_modified) - new Date(a.date_modified)
        );
        setUsers(sortedData);
        setFilteredUsers(sortedData);
      } else {
        console.error('Failed to fetch users or no users in the database.');
      }
    });
  };

  const handleSearch = (text) => {
    setSearch(text);
    if (text === '') {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter((user) =>
        user.name.toLowerCase().includes(text.toLowerCase()) || user.cpf.includes(text)
      );
      setFilteredUsers(filtered);
    }
  };

  const renderUser = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('História', { user: item })}
    >
      <View style={styles.cardContent}>
        <View style={styles.profileImage} />
        <View style={styles.userDetails}>
          <Text style={styles.userName}>{item.name}</Text>
          <Text style={styles.userInfo}>
            Atualizado: {item.date_modified || 'N/A'}
          </Text>
          <Text style={styles.userInfo}>
            Registrado: {item.date_created || 'N/A'}
          </Text>
        </View>
        <View style={styles.actions}>
          <Text style={styles.arrow}>{'>'}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Produtores</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('ProducerDataScreen')}
          style={styles.headerButton}
        >
          <Icon name="analytics" size={24} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisa por nome ou CPF"
          value={search}
          onChangeText={handleSearch}
        />
      </View>

      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderUser}
        style={styles.list}
        refreshing={isRefreshing} // Link refreshing state
        onRefresh={handleRefresh} // Trigger refresh function
      />

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('Cadastrar')}
      >
        <Icon name="add" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default ChatList;