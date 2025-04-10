export enum Reason {
  INVALID_LENGTH = "invalid password length",
  NO_UPPER_CHAR = "no Upper char in password",
  NO_LOWER_CHAR = "no Lower char in password",
  NO_NUMBER = "no number in password",
}

export interface CheckPassword {
  valid: boolean;
  reasons: Reason[];
}

export class PasswordChecker {
  public checkPassword(password: string): CheckPassword {
    const reasons = [];
    this.checkLength(password, reasons);
    this.checkUpperChar(password, reasons);
    this.checkLowerChar(password, reasons);

    return {
      valid: !reasons.length,
      reasons,
    };
  }

  public checkAdminPassword(password: string): CheckPassword {
    const { reasons } = this.checkPassword(password);
    this.checkNumber(password, reasons);

    return {
      valid: !reasons.length,
      reasons,
    };
  }

  private checkLength(password: string, reasons: Reason[]): void {
    if (password.length < 8) {
      reasons.push(Reason.INVALID_LENGTH);
    }
  }

  private checkUpperChar(password: string, reasons: Reason[]): void {
    if (password === password.toLowerCase()) {
      reasons.push(Reason.NO_UPPER_CHAR);
    }
  }

  private checkLowerChar(password: string, reasons: Reason[]): void {
    if (password === password.toUpperCase()) {
      reasons.push(Reason.NO_LOWER_CHAR);
    }
  }

  private checkNumber(password: string, reasons: Reason[]): void {
    const reg = /\d/;
    if (!reg.test(password)) {
      reasons.push(Reason.NO_NUMBER);
    }
  }
}
