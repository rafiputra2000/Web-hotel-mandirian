import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { StringFormatService } from '../../service/string-format.service';
import { VALIDATION_MESSAGES } from '../../utils/validation-message.util';

@Component({
  selector: 'app-validation-message',
  templateUrl: './validation-message.component.html',
  styleUrls: ['./validation-message.component.scss'],
})
export class ValidationMessageComponent {

  @Input() control?: AbstractControl | null;
  @Input() field?: string | null;
  
  constructor(private readonly stringFormatService: StringFormatService) {}
  hasError(): boolean {
    return (this.control &&
      this.control.invalid &&
      (this.control.dirty || this.control.touched)) as boolean;
  }
  getErrors(): string[] {
    if (this.control) {
      return Object.keys(this.control.errors as ValidationErrors);
    } else {
      return [];
    }
  }
  getErrorValues(key: string): string[] {
    if (this.control && this.control.errors) {
      const error: ValidationErrors = this.control.errors[key] || {};
      if (Object.values(error).length > 0) {
        return Object.values(error);
      }
    }
    return [];
  }
  getMessage(key: string): string {
    const text: string = VALIDATION_MESSAGES[key.toLowerCase()] || null;
    const params = this.getErrorValues(key);
    return text
      ? (this.stringFormatService.format(text, this.field, ...params) as string)
      : '';
  }
}
