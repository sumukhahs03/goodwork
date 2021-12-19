import { list } from '@keystone-next/keystone/schema';
import { text, password, relationship, select } from '@keystone-next/fields';

export const User = list({
  fields: {
    name: text({ isRequired: true }),
    email: text({ isRequired: true, isUnique: true }),
    password: password(),
    privilege: select({
      options: [
        { label: 'Regular', value: 'REGULAR' },
        { label: 'Privileged', value: 'PRIVILEGED' },
      ],
      defaultValue: 'REGULAR',
    }),
    family: relationship({ ref: 'Family.user', many: true }),
    shoppinglist: relationship({ ref: 'ShoppingList.user', many: true }),
  },
});
