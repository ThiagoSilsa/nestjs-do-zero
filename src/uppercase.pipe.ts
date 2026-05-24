import { PipeTransform } from "@nestjs/common";

export class UpperCasePipe implements PipeTransform {
  transform(value: string): string {
    if (typeof value !== 'string') {
      throw new Error('Validation failed: value is not a string');
    }
    return value.toLocaleUpperCase();
  }
}
