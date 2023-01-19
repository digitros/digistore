import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform {
  constructor(private isRequired: boolean) {}

  transform(value: string, metadata: ArgumentMetadata) {
    const val = Number(value);
    if (isNaN(val) && this.isRequired) {
      throw new BadRequestException(
        `Validation failed. ${value} is not a number`,
      );
    }
    return val;
  }
}
