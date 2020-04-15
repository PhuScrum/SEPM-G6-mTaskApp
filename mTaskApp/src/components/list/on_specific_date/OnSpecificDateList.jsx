/**
 * This example demonstrates how simply could be composed List Item
 * with classic layouts like icon at the left, forward button at the right, etc.
 *
 * IMPORTANT: To use Icon component make sure to follow this guide:
 * https://akveo.github.io/react-native-ui-kitten/docs/guides/icon-packages
 */

import React from 'react';
import {
  Button,
  Icon,
  List,
  ListItem,
} from '@ui-kitten/components';

const data = new Array(20).fill({
  title: 'Title for Item',
  description: 'Description for Item',
});

export default function ListCompositeItemShowcase (){

  const renderItemAccessory = (style) => (
    <Button style={style}>COMPLETE</Button>
  );

  const renderItemIcon = (style) => (
    <Icon {...style} name='checkmark'/>
  );

  const renderItem = ({ item, index }) => (
    <ListItem
      title={`${item.title} ${index + 1}`}
      description={`${item.description} ${index + 1}`}
      icon={renderItemIcon}
      accessory={renderItemAccessory}
    />
  );

  return (
    <List
      data={data}
      renderItem={renderItem}
    />
  );
};