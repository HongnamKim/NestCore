import { IsNotEmpty, IsOptional } from 'class-validator';

enum MovieGenre {
  Fantasy = 'fantasy',
  Action = 'action',
}

export class UpdateMovieDto {
  @IsNotEmpty()
  @IsOptional()
  title?: string;

  @IsNotEmpty()
  @IsOptional()
  genre?: string;

  @IsNotEmpty()
  @IsOptional()
  detail?: string;

  @IsNotEmpty()
  @IsOptional()
  directorId?: number;

  //@IsDefined() // 값이 반드시 전달 되어야함. null, undefined 불가능
  //@IsBoolean()
  //@IsOptional()
  //@Validate(PasswordValidator)
  //@IsPasswordValid()
  //test: string;
}

/*@ValidatorConstraint()
class PasswordValidator implements ValidatorConstraintInterface {
  defaultMessage(validationArguments?: ValidationArguments): string {
    return `비밀번호 길이는 4-8 $value`;
  }

  validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> | boolean {
    // 비밀번호 길이는 4-8
    return value.length > 4 && value.length < 8;
  }
}

function IsPasswordValid(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: PasswordValidator,
    });
  };
}*/
