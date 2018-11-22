import * as React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const todas = [
  { endeco: 'Rua Hayel Bom Faker, 1340', opcao: 'Iluminação Pública' },
  { endeco: 'Avenida Toshinobo Katayama', opcao: 'Limpeza Pública' },
];

export default class Todas extends React.Component<*> {
  _renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.avatar}>
        <Text style={styles.letter}>{item.endeco.slice(0, 1).toUpperCase()}</Text>
      </View>
      <View style={styles.details}>
        <Text style={styles.endeco}>{item.endeco}</Text>
        <Text style={styles.opcao}>{item.opcao}</Text>
      </View>
    </View>
  );

  _ItemSeparator = () => <View style={styles.separator} />;

  render() {
    return (
      <FlatList
        data={todas}
        keyExtractor={(item, i) => String(i)}
        renderItem={this._renderItem}
        ItemSeparatorComponent={this._ItemSeparator}
      />
    );
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  avatar: {
    height: 36,
    width: 36,
    borderRadius: 18,
    backgroundColor: '#e91e63',
    alignItems: 'center',
    justifyContent: 'center',
  },
  letter: {
    color: 'white',
    fontWeight: 'bold',
  },
  details: {
    margin: 8,
  },
  endeco: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'black',
  },
  opcao: {
    fontSize: 12,
    color: '#999',
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(0, 0, 0, .08)',
  },
});