import { text, relationship } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';

export const Family = list({
  fields: {
    name: text({ isRequired: true }),
    shoppinglist: relationship({ ref: 'ShoppingList.family', many: true }),
    user: relationship({ ref: 'User.family', many: true }),
  },
});
