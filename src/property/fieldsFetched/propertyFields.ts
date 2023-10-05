
export const selectedFields = {
    propertyId:true,
    propertyType:true,
    propertyAction:true,
    agency:{
      select:{
        agencyId:true,
        name:true,
        address:true,
        location:true,
        contactNo:true,
        email:true,
        description:true,
      }
    },
    listedByUser:{
      select:{
        userId:true,
        firstName:true,
        lastName:true,
      }
    },
    address:true,
    area:true,
    amenitiesFacilities:true,
    features:true,
    price:true,
    images:true,
    description:true,
    mapLocation:true,
  };

