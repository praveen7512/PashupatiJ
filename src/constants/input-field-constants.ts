enum InputAdornmentPosition {
    End = 'end',
    Start = 'start',
  }
  
  enum InputPreset {
    Date = 'date',
    Dropdown = 'dropdown',
    Otp = 'otp',
    Phone = 'phone',
    Text = 'text',
  }
  
  enum InputMode {
    Numeric = 'numeric',
  }
  
  enum DateFormatType {
    DateFormat = 'DD MMM, YY', // 01 Jan 24
    FullDateDashFormat = 'DD-MM-YYYY', // ex: 25-01-24
    FullDateFormat = 'DD MMM YYYY', // ex: 1st Jan, 2024
  }
  
  enum InputFieldKeys {
    ConfirmPassword = 'confirmPassword', // values are not in pascal case because they refer to states variables.
    Contact = 'contact',
    Email = 'email',
    WorkEmail = 'workEmail',
    Name = 'name',
    Password = 'password',
    VenueName = 'venueName',
  }
  
  enum InputFieldVariant {
    Standard = 'standard',
  }
  
  export {
    DateFormatType,
    InputAdornmentPosition,
    InputFieldKeys,
    InputFieldVariant,
    InputMode,
    InputPreset,
  };
  