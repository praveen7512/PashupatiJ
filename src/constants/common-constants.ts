export enum ButtonPreset {
    Borders = 'BORDERS',
    Default = 'DEFAULT',
    Disable = 'DISABLE',
    GreyBackground = 'GREY_BACKGROUND',
    LeftIcon = 'LEFT_ICON',
    LeftRounded = 'LEFT_ROUNDED',
    LightPurpleBackground = 'LIGHT_PURPLE_BACKGROUND',
    PurpleBackground = 'PURPLE_BACKGROUND',
    RedBackground = 'RED_BACKGROUND',
    RightIcon = 'RIGHT_ICON',
    RightRounded = 'RIGHT_ROUNDED',
    Transparent = 'TRANSPARENT',
}

export enum ButtonVariant {
    Contained = 'contained', // this is small-case as mui components has pre-defined values
    Outlined = 'outlined',
    Text = 'text',
}

export const INPUT_LABELS = {
    CONFIRM_PASSWORD: 'Confirm Password',
    CONTACT_NUMBER: 'Contact Number',
    CREATE_PASSWORD: 'Create Password',
    FULL_NAME: 'Full Name',
    GUESTS: 'No. of guests',
    PASSWORD: 'Password',
    VENUE_NAME: 'Venue Name',
    WORK_EMAIL: 'Work Email',
};

export enum InputIconPosition {
    Left = 'LEFT',
    Right = 'RIGHT',
}

export enum InputPresets {
    Icon = 'ICON',
    Password = 'PASSWORD',
    Text = 'TEXT',
}

export enum InputSizes {
    Medium = 'medium', // this is small-case as mui components has pre-defined values
    Small = 'small',
}

export enum InputType {
    Number = 'number',
    Password = 'password', // this is small-case as mui components has pre-defined values
    Text = 'text',
}

export enum VariantTypes {
    Outlined = 'outlined', // this is small-case as mui components has pre-defined values
    Standard = 'standard',
}
