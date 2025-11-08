import { Units } from '@prisma/client';

export class ProfileDto {
  id!: string;
  email!: string;
  displayName!: string | null;
  preferredUnits!: Units;
}
