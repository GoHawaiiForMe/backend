import { ProfileImage, ServiceArea, TripType } from '@prisma/client';

export const MAKER_PROFILES = [
  {
    userId: '032d7bd4-116c-467b-9352-a14b0d494ef9',
    image: ProfileImage.DEFAULT_4,
    serviceTypes: [TripType.RELAXATION, TripType.SHOPPING],
    serviceArea: [ServiceArea.DAEGU, ServiceArea.GYEONGBUK, ServiceArea.GYEONGNAM],
    gallery: 'https://www.instagram.com/codeit_kr/',
    description: '여행의 꿈을 대신 이루어 드립니다!',
    detailDescription:
      '안녕하세요! 여행을 좋아하고, 저희 지역을 소개하고 싶은 드림 메이커입니다 :) 드리머 여러분이 꿈꾸는 여행을 대신해서 이루어 드릴게요!'
  },
  {
    userId: 'ef846519-2b73-4be4-807e-f6ef1c07eb60',
    image: ProfileImage.DEFAULT_3,
    serviceTypes: [TripType.RELAXATION, TripType.SHOPPING],
    serviceArea: [ServiceArea.JEONNAM, ServiceArea.GWANGJU],
    gallery: 'https://www.instagram.com/codeit_kr/',
    description: '여행의 꿈을 대신 이루어 드립니다!',
    detailDescription:
      '안녕하세요! 여행을 좋아하고, 저희 지역을 소개하고 싶은 드림 메이커입니다 :) 드리머 여러분이 꿈꾸는 여행을 대신해서 이루어 드릴게요!'
  },
  {
    userId: 'a08d9856-adfa-4f83-9e9a-48401f3d0ef3',
    image: ProfileImage.DEFAULT_2,
    serviceTypes: [TripType.RELAXATION, TripType.SHOPPING],
    serviceArea: [ServiceArea.DAEJEON, ServiceArea.CHUNGNAM, ServiceArea.CHUNGBUK],
    gallery: 'https://www.instagram.com/codeit_kr/',
    description: '여행의 꿈을 대신 이루어 드립니다!',
    detailDescription:
      '안녕하세요! 여행을 좋아하고, 저희 지역을 소개하고 싶은 드림 메이커입니다 :) 드리머 여러분이 꿈꾸는 여행을 대신해서 이루어 드릴게요!'
  },
  {
    userId: '6b4ded82-e680-410d-b86d-ce6974e53f37',
    image: ProfileImage.DEFAULT_1,
    serviceTypes: [TripType.RELAXATION, TripType.SHOPPING],
    serviceArea: [ServiceArea.GANGWON],
    gallery: 'https://www.instagram.com/codeit_kr/',
    description: '여행의 꿈을 대신 이루어 드립니다!',
    detailDescription:
      '안녕하세요! 여행을 좋아하고, 저희 지역을 소개하고 싶은 드림 메이커입니다 :) 드리머 여러분이 꿈꾸는 여행을 대신해서 이루어 드릴게요!'
  },
  {
    userId: '49be61b8-0905-448a-8534-fe5b1a0004c2',
    image: ProfileImage.DEFAULT_4,
    serviceTypes: [TripType.RELAXATION, TripType.SHOPPING],
    serviceArea: [ServiceArea.GYEONGGI, ServiceArea.INCHEON, ServiceArea.SEOUL],
    gallery: 'https://www.instagram.com/codeit_kr/',
    description: '여행의 꿈을 대신 이루어 드립니다!',
    detailDescription:
      '안녕하세요! 여행을 좋아하고, 저희 지역을 소개하고 싶은 드림 메이커입니다 :) 드리머 여러분이 꿈꾸는 여행을 대신해서 이루어 드릴게요!'
  }
];
