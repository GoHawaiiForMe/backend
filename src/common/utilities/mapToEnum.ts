import { ProfileImage } from "../constants/image.type";
import { Role } from "../constants/role.type";
import { ServiceArea } from "../constants/serviceArea.type";
import { Status } from "../constants/status.type";
import { TripType } from "../constants/tripType.type";

export function mapToTripType(enumValue: string): TripType {
  switch (enumValue) {
    case TripType.ACTIVITY:
      return TripType.ACTIVITY;
    case TripType.CULTURE:
      return TripType.CULTURE;
    case TripType.FESTIVAL:
      return TripType.FESTIVAL;
    case TripType.RELAXATION:
      return TripType.RELAXATION;
    case TripType.FOOD_TOUR:
      return TripType.FOOD_TOUR;
    case TripType.SHOPPING:
      return TripType.SHOPPING;
  }
}

export function mapToServiceArea(enumValue: string): ServiceArea {
  switch (enumValue) {
    case ServiceArea.BUSAN:
      return ServiceArea.BUSAN;
    case ServiceArea.CHUNGBUK:
      return ServiceArea.CHUNGBUK;
    case ServiceArea.CHUNGNAM:
      return ServiceArea.CHUNGNAM;
    case ServiceArea.DAEGU:
      return ServiceArea.DAEGU;
    case ServiceArea.DAEJEON:
      return ServiceArea.DAEJEON;
    case ServiceArea.GANGWON:
      return ServiceArea.GANGWON;
    case ServiceArea.GWANGJU:
      return ServiceArea.GWANGJU;
    case ServiceArea.GYEONGBUK:
      return ServiceArea.GYEONGBUK;
    case ServiceArea.GYEONGGI:
      return ServiceArea.GYEONGGI;
    case ServiceArea.GYEONGNAM:
      return ServiceArea.GYEONGNAM;
    case ServiceArea.INCHEON:
      return ServiceArea.INCHEON;
    case ServiceArea.JEJU:
      return ServiceArea.JEJU;
    case ServiceArea.JEONBUK:
      return ServiceArea.JEONBUK;
    case ServiceArea.JEONNAM:
      return ServiceArea.JEONNAM;
    case ServiceArea.SEJONG:
      return ServiceArea.SEJONG;
    case ServiceArea.SEOUL:
      return ServiceArea.SEOUL;
    case ServiceArea.ULSAN:
      return ServiceArea.ULSAN;
  }
}

export function mapToStatus(enumValue: string): Status {
  switch (enumValue) {
    case Status.PENDING:
      return Status.PENDING;
    case Status.OVERDUE:
      return Status.OVERDUE;
    case Status.CONFIRMED:
      return Status.CONFIRMED;
    case Status.COMPLETED:
      return Status.COMPLETED;
  }
}

export function mapToRole(enumValue: string): Role {
  switch(enumValue){
    case Role.DREAMER:
      return Role.DREAMER;
    case Role.MAKER:
      return Role.MAKER;
  }
}

export function mapToImage(enumValue: string):ProfileImage {
  switch(enumValue){
    case ProfileImage.DEFAULT_1:
      return ProfileImage.DEFAULT_1;
    case ProfileImage.DEFAULT_2:
      return ProfileImage.DEFAULT_2;
    case ProfileImage.DEFAULT_3:
      return ProfileImage.DEFAULT_3;
    case ProfileImage.DEFAULT_4:
      return ProfileImage.DEFAULT_4;
  }
}