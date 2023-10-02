import { PrismaClient } from '@prisma/client';
import { error } from 'console';

const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.users.upsert({ // using upsert to handle accidently trying inserting same document
    where: { userId: '1',firstName: 'Ali' },
    update: {},
    create: {
      firstName: 'Ali',
      lastName: 'Khan',
      address:"C block,Gulberg,Lahore",
      contactNumber: '+92 3334920287',
      email:'ali@gmail.com',
      password:'$2b$10$otJnnrovaaMMp4dzG79Fk.Ou.7HJRScA1zKwBXhzqEEK7Nqnf72pq',
      role: 'Owner'
    },
  });

  const user2 = await prisma.users.upsert({
    where: { userId: '2',firstName: 'Hussnain' },
    update: {},
    create: {
      firstName: 'Hussnain',
      lastName: 'Khan',
      address:"A block,Nishtr,Lahore",
      contactNumber: '+92 3334923074',
      email:'hussain@gmail.com',
      password:'$2b$10$otJnnrovaaMMp4dzG79Fk.Ou.7HJRScA1zKwBXhzqEEK7Nqnf72pq',
      role: 'GeneralUser'
    },
  });
  const user3 = await prisma.users.upsert({
    where: { userId: '3',firstName: 'Saboor' },
    update: {},
    create: {
      firstName: 'Saboor',
      lastName: 'bilal',
      address:"C block,haroonabad,Sialkot",
      contactNumber: '+92 3213840651',
      email:'saboor@gmail.com',
      password:'$2b$10$4ONrAs53f2flb56pQaFBluRrTWIwGKedbLpQ9MQNFNbNfQD.TsoAK',
      role: 'GeneralUser'
    },
  });
  const user4 = await prisma.users.upsert({
    where: { userId: '4',firstName: 'Daniyal' },
    update: {},
    create: {
      firstName: 'Daniyal',
      lastName: 'Sajjad',
      address:"C block,Wapda town,Sialkot",
      contactNumber: '+92 3316998271',
      email:'daniyal@gmail.com',
      password:'$2b$10$4ONrAs53f2flb56pQaFBluRrTWIwGKedbLpQ9MQNFNbNfQD.TsoAK',
      role: 'Owner'
    },
   })
  console.log( 'users created' );
}


main()
  .catch((error) => {
    console.log(error.message)
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
