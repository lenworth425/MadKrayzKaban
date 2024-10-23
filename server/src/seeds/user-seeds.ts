import { User } from '../models/user.js';
import bcrypt from 'bcrypt';


export const seedUsers = async () => {
  const users = [  
    { username: 'JollyGuru', password: 'password' },
    { username: 'SunnyScribe', password: 'password' },
    { username: 'RadiantComet', password: 'password' },
  ];

  const hashedUsers = await Promise.all(users.map(async (user) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    return { username: user.username, password: hashedPassword };
  }));
  await User.bulkCreate( hashedUsers, { individualHooks: true });
};
