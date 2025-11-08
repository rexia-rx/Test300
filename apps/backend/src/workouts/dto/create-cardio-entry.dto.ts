import { Type } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  Min,
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';

@ValidatorConstraint({ name: 'cardioMetricsPresence', async: false })
class CardioMetricsPresenceConstraint implements ValidatorConstraintInterface {
  validate(_value: unknown, args: ValidationArguments): boolean {
    const { durationSeconds, distanceMeters } =
      args.object as CreateCardioEntryDto;

    const hasDuration =
      durationSeconds !== undefined && durationSeconds !== null;
    const hasDistance =
      distanceMeters !== undefined && distanceMeters !== null;

    return hasDuration || hasDistance;
  }

  defaultMessage(): string {
    return 'At least one of durationSeconds or distanceMeters must be provided';
  }
}

export class CreateCardioEntryDto {
  @Validate(CardioMetricsPresenceConstraint)
  private readonly atLeastOneMetric?: unknown;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  durationSeconds?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  distanceMeters?: number;
}
