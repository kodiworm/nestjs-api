import { IsBoolean, IsOptional } from 'class-validator'

export class UserSettingDto {
  @IsBoolean()
  @IsOptional()
  notifications_on: boolean

  @IsBoolean()
  @IsOptional()
  sms_enabled: boolean
}
