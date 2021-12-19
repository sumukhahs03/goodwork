import {
  text,
  timestamp,
  relationship,
  select,
  virtual,
} from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';

export const ShoppingList = list({
//   access: {
//     create: ({ authentication: { item, listKey } }) => ({
//       item.status_not: 'CLOSED' || 'PURCHASED',
//     }),
//     read: ({ authentication: { item, listKey } }) => true,
//     update: ({ authentication: { item, listKey } }) => ({
//       item.status_not: 'CLOSED' || 'PURCHASED',
//     }),
//     delete: ({ authentication: { item, listKey } }) => true,
//   },
  fields: {
    name: text({ isRequired: true }),
    date: timestamp({ isRequired: true }),
    status: select({
      options: [
        { label: 'Open', value: 'OPEN' },
        { label: 'Closed', value: 'CLOSED' },
        { label: 'Purchased', value: 'PURCHASED' },
      ],
      defaultValue: 'OPEN',
    }),
    groceryitem: relationship({
      ref: 'GroceryItem',
      many: true,
    //   access: {
    //     create: true,
    //     read: true,
    //     update: true,
    //     delete: ({ authentication: { item, listKey } }) => ({
    //       privilege: 'PRIVILEGED',
    //     }),
    //   },
    }),
    family: relationship({ ref: 'Family.shoppinglist' }),
    user: relationship({ ref: 'User.shoppinglist', many: true }),
    total: virtual({
      graphQLReturnType: 'String',
      resolver: async (item, args, context) => {
        const { data, errors } = await context.executeGraphQL({
          query: `{ authenticatedItem{
            ... on User{
              shoppinglist{
                groceryitem{
                  price
                }
              }
            }
          } }`,
        });
        const obj = JSON.parse(
          JSON.stringify(data.authenticatedItem.shoppinglist)
        );
        const prices = obj[0].groceryitem;
        let sum = 0;
        for (let price of prices) {
          sum += price.price;
        }
        return sum;
      },
    }),
  },
});
