import { integer, relationship, text } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';

export const GroceryItem = list({
  fields: {
    name: text({ isRequired: true }),
    photo: relationship({
      ref: 'GroceryItemImage.GroceryItem',
      ui: {
        displayMode: 'cards',
        cardFields: ['image', 'altText'],
        inlineCreate: { fields: ['image', 'altText'] },
        inlineEdit: { fields: ['image', 'altText'] },
      },
    }),
    price: integer({ isRequired: true }),
  },
});
