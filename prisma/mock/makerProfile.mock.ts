import { ProfileImage, ServiceArea, TripType } from '@prisma/client';

export const MAKER_PROFILES = [
  {
    userId: 'f1a2b3c4-d5e6-7890-1234-567890abcdef',
    image: ProfileImage.DEFAULT_4,
    serviceTypes: [TripType.RELAXATION, TripType.SHOPPING],
    serviceArea: [ServiceArea.DAEGU, ServiceArea.GYEONGBUK, ServiceArea.GYEONGNAM],
    gallery: 'https://www.instagram.com/codeit_kr/',
    description: '여행의 꿈을 대신 이루어 드립니다!',
    detailDescription:
      '안녕하세요! 여행을 좋아하고, 저희 지역을 소개하고 싶은 드림 메이커입니다 :) 드리머 여러분이 꿈꾸는 여행을 대신해서 이루어 드릴게요!'
  },
  {
    userId: 'a2b3c4d5-e6f7-8901-2345-67890abcdef1',
    image: ProfileImage.DEFAULT_3,
    serviceTypes: [TripType.RELAXATION, TripType.SHOPPING],
    serviceArea: [ServiceArea.JEONNAM, ServiceArea.GWANGJU],
    gallery: 'https://www.instagram.com/codeit_kr/',
    description: '여행의 꿈을 대신 이루어 드립니다!',
    detailDescription:
      '안녕하세요! 여행을 좋아하고, 저희 지역을 소개하고 싶은 드림 메이커입니다 :) 드리머 여러분이 꿈꾸는 여행을 대신해서 이루어 드릴게요!'
  },
  {
    userId: 'b3c4d5e6-f789-0123-4567-890abcdef123',
    image: ProfileImage.DEFAULT_2,
    serviceTypes: [TripType.RELAXATION, TripType.SHOPPING],
    serviceArea: [ServiceArea.DAEJEON, ServiceArea.CHUNGNAM, ServiceArea.CHUNGBUK],
    gallery: 'https://www.instagram.com/codeit_kr/',
    description: '여행의 꿈을 대신 이루어 드립니다!',
    detailDescription:
      '안녕하세요! 여행을 좋아하고, 저희 지역을 소개하고 싶은 드림 메이커입니다 :) 드리머 여러분이 꿈꾸는 여행을 대신해서 이루어 드릴게요!'
  },
  {
    userId: 'c4d5e6f7-8901-2345-6789-0abcdef12345',
    image: ProfileImage.DEFAULT_1,
    serviceTypes: [TripType.RELAXATION, TripType.SHOPPING],
    serviceArea: [ServiceArea.GANGWON],
    gallery: 'https://www.instagram.com/codeit_kr/',
    description: '여행의 꿈을 대신 이루어 드립니다!',
    detailDescription:
      '안녕하세요! 여행을 좋아하고, 저희 지역을 소개하고 싶은 드림 메이커입니다 :) 드리머 여러분이 꿈꾸는 여행을 대신해서 이루어 드릴게요!'
  },
  {
    userId: 'd5e6f789-0123-4567-890a-bcdef1234567',
    image: ProfileImage.DEFAULT_4,
    serviceTypes: [TripType.RELAXATION, TripType.SHOPPING],
    serviceArea: [ServiceArea.GYEONGGI, ServiceArea.INCHEON, ServiceArea.SEOUL],
    gallery: 'https://www.instagram.com/codeit_kr/',
    description: '여행의 꿈을 대신 이루어 드립니다!',
    detailDescription:
      '안녕하세요! 여행을 좋아하고, 저희 지역을 소개하고 싶은 드림 메이커입니다 :) 드리머 여러분이 꿈꾸는 여행을 대신해서 이루어 드릴게요!'
  }
];
