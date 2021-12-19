import { relationship, select } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';

export const Role = list({
  fields: {
    privilege: select({
      options: [
        { label: 'Regular', value: 'REGULAR' },
        { label: 'Privileged', value: 'PRIVILEGED' },
      ],
      defaultValue: 'REGULAR',
    }),
    // assignedto: relationship({
    //   ref: 'User.role',
    //   many: true,
    // }),
  },
});
