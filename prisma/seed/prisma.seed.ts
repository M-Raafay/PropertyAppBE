import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


async function main() {
  try {
    // Seed Users GROUP1
    const user1 = await prisma.users.upsert({
      where: { userId: '1' },
      update:{},
      create: {
      firstName: 'Ali',
      lastName: 'Khan',
      address:"C block,Gulberg,Lahore",
      contactNumber: '+92 3334920287',
      email:'ali@gmail.com',
      password:'$2b$10$pbYmGX/zken2lkpi5sbIO.61z04vWo2LCmag8rSo0c3LRSLZ2IoC2',
      role: 'GeneralUser'      }
    });
    const user2 = await prisma.users.upsert({
      where: { userId: '2' },
      update:{},
      create: {
      firstName: 'Maaz',
      lastName: 'Hussain',
      address:"C block,Gulberg,Lahore",
      contactNumber: '+92 3334920287',
      email:'maaz@gmail.com',
      password:'$2b$10$pbYmGX/zken2lkpi5sbIO.61z04vWo2LCmag8rSo0c3LRSLZ2IoC2',
      role: 'Owner'      }
    });
    const user3 = await prisma.users.upsert({
      where: { userId: '3' },
      update:{},
      create: {
      firstName: 'Hannan',
      lastName: 'Waseem',
      address:"C block,Gulberg,Lahore",
      contactNumber: '+92 3334920287',
      email:'hannan@gmail.com',
      password:'$2b$10$pbYmGX/zken2lkpi5sbIO.61z04vWo2LCmag8rSo0c3LRSLZ2IoC2',
      role: 'Manager'      }
    });
    const user4 = await prisma.users.upsert({
      where: { userId: '4' },
      update:{},
      create: {
      firstName: 'Muhammad',
      lastName: 'Khan',
      address:"C block,Gulberg,Lahore",
      contactNumber: '+92 3334920287',
      email:'khan@gmail.com',
      password:'$2b$10$pbYmGX/zken2lkpi5sbIO.61z04vWo2LCmag8rSo0c3LRSLZ2IoC2',
      role: 'AssistantManager'      }
    });

    const user5 = await prisma.users.upsert({
      where: { userId: '5' },
      update:{},
      create: {
      firstName: 'Shoaib',
      lastName: 'Ahmad',
      address:"C block,Gulberg,Lahore",
      contactNumber: '+92 3334920287',
      email:'shoaib@gmail.com',
      password:'$2b$10$pbYmGX/zken2lkpi5sbIO.61z04vWo2LCmag8rSo0c3LRSLZ2IoC2',
      role: 'Agent'      }
    });

    // Seed Users GROUP 2
    const user11 = await prisma.users.upsert({
      where: { userId: '11' },
      update:{},
      create: {
      firstName: 'Hayat',
      lastName: 'Awan',
      address:"C block,Gulberg,Lahore",
      contactNumber: '+92 3334920287',
      email:'hayat@gmail.com',
      password:'$2b$10$pbYmGX/zken2lkpi5sbIO.61z04vWo2LCmag8rSo0c3LRSLZ2IoC2',
      role: 'GeneralUser'      }
    });
    const user12 = await prisma.users.upsert({
      where: { userId: '12' },
      update:{},
      create: {
      firstName: 'Ali',
      lastName: 'Hassan',
      address:"C block,Gulberg,Lahore",
      contactNumber: '+92 3334920287',
      email:'alihassan@gmail.com',
      password:'$2b$10$pbYmGX/zken2lkpi5sbIO.61z04vWo2LCmag8rSo0c3LRSLZ2IoC2',
      role: 'Owner'      }
    });
    const user13 = await prisma.users.upsert({
      where: { userId: '13' },
      update:{},
      create: {
      firstName: 'Aqib',
      lastName: 'Javaid',
      address:"C block,Gulberg,Lahore",
      contactNumber: '+92 3334920287',
      email:'aqib@gmail.com',
      password:'$2b$10$pbYmGX/zken2lkpi5sbIO.61z04vWo2LCmag8rSo0c3LRSLZ2IoC2',
      role: 'Manager'      }
    });
    const user14 = await prisma.users.upsert({
      where: { userId: '14' },
      update:{},
      create: {
      firstName: 'Ahsan',
      lastName: 'Bilal',
      address:"C block,Gulberg,Lahore",
      contactNumber: '+92 3334920287',
      email:'ahsan@gmail.com',
      password:'$2b$10$pbYmGX/zken2lkpi5sbIO.61z04vWo2LCmag8rSo0c3LRSLZ2IoC2',
      role: 'AssistantManager'      }
    });

    const user15 = await prisma.users.upsert({
      where: { userId: '15' },
      update:{},
      create: {
      firstName: 'Shan',
      lastName: 'khan',
      address:"C block,Gulberg,Lahore",
      contactNumber: '+92 3334920287',
      email:'shan@gmail.com',
      password:'$2b$10$pbYmGX/zken2lkpi5sbIO.61z04vWo2LCmag8rSo0c3LRSLZ2IoC2',
      role: 'Agent'      }
    });
    
    ////////////////////
    console.log(user2.firstName,user2.userId);
    

    // Seed Agency
    const agency1 = await prisma.agency.upsert({
      where: { agencyId: '1' },
      update:{},
      create: {
        name: 'Maaz Property Dealers',
        address:'Model Town,Lahore',
        location:'30.232, 50.343',
        contactNo:'+92 3334920287',
        email:'maazpeopertydealers@gmail.com',

        ownerName:user2.firstName,
        agencyOwner: {
          connect: {
            userId: user2.userId, // Connect to the owner user
          },
        },
        logoURL:'logo2.png',
        description:'dealers and constructors of real estate projects',
        facebook:'https://www.facebook.com/maazdelaer',
        instagram:'https://www.instagram.com/YourAgencyName',
        whatsapp:'03450298737',
        youtube:'https://www.youtube.com/YourAgencyName'
      },
    });

    const agency2 = await prisma.agency.upsert({
      where: { agencyId: '2' },
      update:{},
      create: {
        name: 'Ali Hassan Property Dealers',
        address:'Model Town,Lahore',
        location:'99.11, 45.39',
        contactNo:'+92 3334920287',
        email:'alihassanpeopertydealers@gmail.com',

        ownerName:user12.firstName,
        agencyOwner: {
          connect: {
            userId: user12.userId, // Connect to the owner user
          },
        },
        logoURL:'logo12.png',
        description:'dealers and constructors of real estate projects',
        facebook:'https://www.facebook.com/maazdelaer',
        instagram:'https://www.instagram.com/YourAgencyName',
        whatsapp:'03450298737',
        youtube:'https://www.youtube.com/YourAgencyName'
      },
    });

    // Seed AgencyMembers group 1
    const member1 = await prisma.agencyMembers.upsert({
      where: { memberId: '1' },
      update:{},
      create: {
        agencyIdFk: {
          connect: {
            agencyId: agency1.agencyId, // Connect to the user
          },
        },
        // ... other member fields
        userIdFk: {
          connect: {
            userId: user3.userId, // Connect to the user
          },
        },
        role:user3.role
      },
    });
    const member2 = await prisma.agencyMembers.upsert({
      where: { memberId: '2' },
      update:{},
      create: {
        agencyIdFk: {
          connect: {
            agencyId: agency1.agencyId, // Connect to the user
          },
        },
        // ... other member fields
        userIdFk: {
          connect: {
            userId: user4.userId, // Connect to the user
          },
        },
        role:user4.role
      },
    });
    const member3 = await prisma.agencyMembers.upsert({
      where: { memberId: '3' },
      update:{},
      create: {
        agencyIdFk: {
          connect: {
            agencyId: agency1.agencyId, // Connect to the user
          },
        },
        // ... other member fields
        userIdFk: {
          connect: {
            userId: user5.userId, // Connect to the user
          },
        },
        role:user5.role
      },
    });

        // Seed AgencyMembers group 2

        const member11 = await prisma.agencyMembers.upsert({
          where: { memberId: '11' },
          update:{},
          create: {
            agencyIdFk: {
              connect: {
                agencyId: agency2.agencyId, // Connect to the user
              },
            },
            // ... other member fields
            userIdFk: {
              connect: {
                userId: user13.userId, // Connect to the user
              },
            },
            role:user13.role
          },
        });
        const member12 = await prisma.agencyMembers.upsert({
          where: { memberId: '12' },
          update:{},
          create: {
            agencyIdFk: {
              connect: {
                agencyId: agency2.agencyId, // Connect to the user
              },
            },
            // ... other member fields
            userIdFk: {
              connect: {
                userId: user14.userId, // Connect to the user
              },
            },
            role:user14.role
          },
        });
        const member13 = await prisma.agencyMembers.upsert({
          where: { memberId: '13' },
          update:{},
          create: {
            agencyIdFk: {
              connect: {
                agencyId: agency2.agencyId, // Connect to the user
              },
            },
            // ... other member fields
            userIdFk: {
              connect: {
                userId: user15.userId, // Connect to the user
              },
            },
            role:user15.role
          },
        });


        ///////////////

    // Seed Property group 1

    // const property11 = await prisma.property.upsert({
    //   where: { propertyId: '11' },
    //   update:{},
    //   create: {
    //     propertyType: 'Residential',
    //     propertyAction: 'Rent',
    //     // ... other property fields
    //     agency: {
    //       connect: {
    //         agencyId: null, // Connect to the agency
    //       },
    //     },
    //     listedByUser: {
    //       connect: {
    //         userId: user11.userId, // Connect to the user who listed the property
    //       },
    //     },
    //     listedByRole:user11.role,
    //     listedByContact:user11.contactNumber,
    //     address:'Gulberg Lahore',
    //     area:234,
    //     amenitiesFacilities:{'bed':3, 'Kitchen':1,'bath':2},
    //     features:'Park Facing',
    //     price:48923,
    //     images:['image1', 'image2'],
    //     description:'Ready for sale house',
    //     mapLocation:'32.12, 13.33'
    //   },
    // });

    const property12 = await prisma.property.upsert({
      where: { propertyId: '12' },
      update:{},
      create: {
        propertyType: 'Commercial',
        propertyAction: 'Rent',
        // ... other property fields
        agency: {
          connect: {
            agencyId: agency2.agencyId, // Connect to the agency
          },
        },
        listedByUser: {
          connect: {
            userId: user12.userId, // Connect to the user who listed the property
          },
        },
        agencyLogo:agency2.logoURL,
        listedByRole:user12.role,
        listedByContact:user12.contactNumber,
        address:'Gulberg Lahore',
        area:2378,
        amenitiesFacilities:{'bed':1, 'Kitchen':1,'bath':1},
        features:'Mosque Facing',
        price:2389012,
        images:['image1', 'image2'],
        description:'Ready for rent house',
        mapLocation:'12.54, 17.33'
      },
    });

    const property13 = await prisma.property.upsert({
      where: { propertyId: '13' },
      update:{},
      create: {
        propertyType: 'Commercial',
        propertyAction: 'Sell',
        // ... other property fields
        agency: {
          connect: {
            agencyId: agency2.agencyId, // Connect to the agency
          },
        },
        listedByUser: {
          connect: {
            userId: user13.userId, // Connect to the user who listed the property
          },
        },
        agencyLogo:agency2.logoURL,
        listedByRole:user13.role,
        listedByContact:user13.contactNumber,
        address:'Gulberg Lahore',
        area:98231,
        amenitiesFacilities:{'bed':5, 'Kitchen':2,'bath':2},
        features:'Corner Facing',
        price:781239,
        images:['image1', 'image2'],
        description:'Ready for sale house',
        mapLocation:'78.10, 90.33'
      },
    });
    const property14 = await prisma.property.upsert({
      where: { propertyId: '14' },
      update:{},
      create: {
        propertyType: 'Commercial',
        propertyAction: 'Buy',
        // ... other property fields
        agency: {
          connect: {
            agencyId: agency2.agencyId, // Connect to the agency
          },
        },
        listedByUser: {
          connect: {
            userId: user14.userId, // Connect to the user who listed the property
          },
        },
        agencyLogo:agency2.logoURL,
        listedByRole:user14.role,
        listedByContact:user14.contactNumber,
        address:'Gulberg Lahore',
        area:548,
        amenitiesFacilities:{'bed':2, 'Kitchen':1,'bath':2},
        features:'Park Facing',
        price:90236578,
        images:['image1', 'image2'],
        description:'Ready for sale house',
        mapLocation:'34.11, 35.123'
      },
    });
    const property15 = await prisma.property.upsert({
      where: { propertyId: '15' },
      update:{},
      create: {
        propertyType: 'Residential',
        propertyAction: 'Sell',
        // ... other property fields
        agency: {
          connect: {
            agencyId: agency2.agencyId, // Connect to the agency
          },
        },
        listedByUser: {
          connect: {
            userId: user15.userId, // Connect to the user who listed the property
          },
        },
        agencyLogo:agency2.logoURL,
        listedByRole:user15.role,
        listedByContact:user15.contactNumber,
        address:'Gulberg Lahore',
        area:231,
        amenitiesFacilities:{'bed':5, 'Kitchen':2,'bath':2},
        features:'Corner Plot',
        price:9823423,
        images:['image1', 'image2'],
        description:'Ready for sale house',
        mapLocation:'88.32, 89.33'
      },
    });


        // Seed Property group 2

        // const property1 = await prisma.property.upsert({
        //   where: { propertyId: '1' },
        //   update:{},
        //   create: {
        //     propertyType: 'Residential',
        //     propertyAction: 'Sell',
        //     // ... other property fields
        //     agency: {
        //       connect: {
        //         agencyId: null, // Connect to the agency
        //       },
        //     },
        //     listedByUser: {
        //       connect: {
        //         userId: user1.userId, // Connect to the user who listed the property
        //       },
        //     },
        //     listedByRole:user1.role,
        //     listedByContact:user1.contactNumber,
        //     agencyLogo:null,
        //     address:'Gulberg Lahore',
        //     area:394,
        //     amenitiesFacilities:{'bed':3, 'Kitchen':1,'bath':2},
        //     features:'Park Facing',
        //     price:37844938,
        //     images:['image1', 'image2'],
        //     description:'Ready for sale house',
        //     mapLocation:'34.12, 90.33'
        //   },
        // });
    
        const property2 = await prisma.property.upsert({
          where: { propertyId: '2' },
          update:{},
          create: {
            propertyType: 'Commercial',
            propertyAction: 'Rent',
            // ... other property fields
            agency: {
              connect: {
                agencyId: agency1.agencyId, // Connect to the agency
              },
            },
            listedByUser: {
              connect: {
                userId: user2.userId, // Connect to the user who listed the property
              },
            },
            agencyLogo:agency1.logoURL,
            listedByRole:user2.role,
            listedByContact:user2.contactNumber,
            address:'Gulberg Lahore',
            area:949,
            amenitiesFacilities:{'bed':1, 'Kitchen':1,'bath':1},
            features:'Mosque Facing',
            price:53453,
            images:['image1', 'image2'],
            description:'Ready for rent house',
            mapLocation:'23.54, 65.33'
          },
        });
    
        const property3 = await prisma.property.upsert({
          where: { propertyId: '3' },
          update:{},
          create: {
            propertyType: 'Commercial',
            propertyAction: 'Sell',
            // ... other property fields
            agency: {
              connect: {
                agencyId: agency1.agencyId, // Connect to the agency
              },
            },
            listedByUser: {
              connect: {
                userId: user3.userId, // Connect to the user who listed the property
              },
            },
            agencyLogo:agency1.logoURL,
            listedByRole:user3.role,
            listedByContact:user3.contactNumber,
            address:'Gulberg Lahore',
            area:3221,
            amenitiesFacilities:{'bed':5, 'Kitchen':2,'bath':2},
            features:'Corner Facing',
            price:4435352,
            images:['image1', 'image2'],
            description:'Ready for sale house',
            mapLocation:'34.10, 55.33'
          },
        });
        const property4 = await prisma.property.upsert({
          where: { propertyId: '4' },
          update:{},
          create: {
            propertyType: 'Commercial',
            propertyAction: 'Buy',
            // ... other property fields
            agency: {
              connect: {
                agencyId: agency1.agencyId, // Connect to the agency
              },
            },
            listedByUser: {
              connect: {
                userId: user4.userId, // Connect to the user who listed the property
              },
            },
            agencyLogo:agency1.logoURL,
            listedByRole:user4.role,
            listedByContact:user4.contactNumber,
            address:'Gulberg Lahore',
            area:9923,
            amenitiesFacilities:{'bed':2, 'Kitchen':1,'bath':2},
            features:'Park Facing',
            price:834923,
            images:['image1', 'image2'],
            description:'Ready for sale house',
            mapLocation:'27.11, 24.123'
          },
        });
        const property5 = await prisma.property.upsert({
          where: { propertyId: '5' },
          update:{},
          create: {
            propertyType: 'Residential',
            propertyAction: 'Sell',
            // ... other property fields
            agency: {
              connect: {
                agencyId: agency1.agencyId, // Connect to the agency
              },
            },
            listedByUser: {
              connect: {
                userId: user5.userId, // Connect to the user who listed the property
              },
            },
            agencyLogo:agency1.logoURL,
            listedByRole:user5.role,
            listedByContact:user5.contactNumber,
            address:'Gulberg Lahore',
            area:231,
            amenitiesFacilities:{'bed':5, 'Kitchen':2,'bath':2},
            features:'Corner Plot',
            price:9823423,
            images:['image1', 'image2'],
            description:'Ready for sale house',
            mapLocation:'88.32, 89.33'
          },
        });



    // Continue seeding other data as needed

    console.log('\n @@@@@@@@@@@@@@@@@@@@@@@@@@@@@\n \n Seed data inserted successfully \n');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect(); // Disconnect from the database
  }
}

// async function main() {
//   const user1 = await prisma.users.upsert({ // using upsert to handle accidently trying inserting same document
//     where: { userId: '1',firstName: 'Ali' },
//     update: {},
//     create: {
//       firstName: 'Ali',
//       lastName: 'Khan',
//       address:"C block,Gulberg,Lahore",
//       contactNumber: '+92 3334920287',
//       email:'ali@gmail.com',
//       password:'$2b$10$otJnnrovaaMMp4dzG79Fk.Ou.7HJRScA1zKwBXhzqEEK7Nqnf72pq',
//       role: 'Owner'
//     },
//   });

//   const user2 = await prisma.users.upsert({
//     where: { userId: '2',firstName: 'Hussnain' },
//     update: {},
//     create: {
//       firstName: 'Hussnain',
//       lastName: 'Khan',
//       address:"A block,Nishtr,Lahore",
//       contactNumber: '+92 3334923074',
//       email:'hussain@gmail.com',
//       password:'$2b$10$otJnnrovaaMMp4dzG79Fk.Ou.7HJRScA1zKwBXhzqEEK7Nqnf72pq',
//       role: 'GeneralUser'
//     },
//   });
//   const user3 = await prisma.users.upsert({
//     where: { userId: '3',firstName: 'Saboor' },
//     update: {},
//     create: {
//       firstName: 'Saboor',
//       lastName: 'bilal',
//       address:"C block,haroonabad,Sialkot",
//       contactNumber: '+92 3213840651',
//       email:'saboor@gmail.com',
//       password:'$2b$10$4ONrAs53f2flb56pQaFBluRrTWIwGKedbLpQ9MQNFNbNfQD.TsoAK',
//       role: 'GeneralUser'
//     },
//   });
//   const user4 = await prisma.users.upsert({
//     where: { userId: '4',firstName: 'Daniyal' },
//     update: {},
//     create: {
//       firstName: 'Daniyal',
//       lastName: 'Sajjad',
//       address:"C block,Wapda town,Sialkot",
//       contactNumber: '+92 3316998271',
//       email:'daniyal@gmail.com',
//       password:'$2b$10$4ONrAs53f2flb56pQaFBluRrTWIwGKedbLpQ9MQNFNbNfQD.TsoAK',
//       role: 'Owner'
//     },
//    })
//   console.log( 'users created' );
// }


main()
  // .catch((error) => {
  //   console.log(error.message)
  //   console.error(error);
  //   process.exit(1);
  // })
  // .finally(async () => {
  //   await prisma.$disconnect();
  // });
