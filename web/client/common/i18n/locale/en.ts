import { Domain } from '.'

export default {
  [Domain.General]: {
    Submit: 'Submit',
    Cancel: 'Cancel',
    Confirm: 'Confirm',
    Reset: 'Reset',
    Success: 'Success',
    delete_item: 'Delete this item?',
    confirm_delete_item: 'Are you sure you want to delete this item?',
    price_per_hour: 'Price per hour',
    where_like_to_park: 'Where would you like to park',
    my_parking_slots: 'My Parking Slots',
    Upgrade: 'Upgrade',
    Login: 'Login',
    Logout: 'Logout',
    privacy_policy: 'Privacy Policy',
    terms_and_conditions: 'Terms & Conditions',
    change_password: 'Change Password',
    go_dashboard: 'Go to Dashboard',
    Monday: 'Monday',
    Tuesday: 'Tuesday',
    Wednesday: 'Wednesday',
    Thursday: 'Thursday',
    Friday: 'Friday',
    Saturday: 'Saturday',
    Sunday: 'Sunday',
    hour: `{{count}} Hour`,
    Hour_plural: `{{count}} hours`,
    parking_at: 'Parking at',
    free: 'Free',
    problem_with_booking: 'Are you having problems with this booking?',
    Canceled: 'Canceled',
    Closed: 'Closed',
    Finished: 'Finished',
    Booking: 'Booking #{{id}}',
    i_agree: 'I Agree',
    rofile: 'rofile', // ProfileLogo
    slot_count: `{{count}} slot`,
    'Slot count_plural': `{{count}} slots`,
    Today: 'Today',
    duration: 'Duration',
    status: 'Status',
    price: 'Price',
    call_us: 'Give us a call',
    email_us: 'Write us an E-Mail',
    unclaimed_space: 'Unclaimed space',
    booking_already_started:
      'The booking has already started. According to the <button>terms and conditions</button> you are not eligible for a refund.',
    YES: 'YES',
    All: 'All',
    wish_park_here: 'I wish to park here',
    contact_claim_space: '<mailto>Contact us</mailto> to claim the space.',
    parking_space: 'Parking space',
    price_hour: '{{price}} € / Hour',
    near_you: 'Near you',
    show_more: 'Show more',
    //TODO language key below does not seem to be used anywhere
    'Parking slot': 'Parking slot',
    'Parking slot_plural': 'Parking slot_plural',
    'Please confirm that you wanna cancel your booking':
      'Please confirm that you wanna cancel your booking',
  },
  [Domain.Validation]: {
    too_short: 'Too short',
    too_long: 'Too long',
    required_name: 'Name is required',
    required_password: 'Password is required',
    required_newpassword: 'New Password is required',
    passwords_same: 'The passwords must be the same',
    required_vehicle_type: 'Vehicle Type is required',
    required_vehicle_size: 'Vehicle Size is required',
    invalid_phonenumber: 'Invalid phone number',
    required_phonenumber: 'Phone number is required',
    required_id: 'ID is required',
    invalid_email: 'Invalid email',
    required_email: 'Email is required',
    required_license_plate: 'License plate is required',
    required_longitude: 'Longitude is required',
    required_latitude: 'Latitude is required',
    select_country: 'Select country',
    processing_error: 'Processing error. Please try again',
    error_already_registered: 'User with this email is already registered',
    //TODO language key below does not seem to be used anywhere
    'User not found with provided email and password':
      'User not found with provided email and password',
    error_wrong_password: "The password you've provided does not match your login password.",
    error_invalid_reset_password: 'Your reset password token is invalid or missing',
    account_activation_token_not_found: 'Account matching this activation token is not found',
    invalid_activation_token: 'Your activation token is invalid or missing',
    account_already_activated: 'Your account has already been activated. Please log in',
    warning_account_already_activated: 'Your account has already been activated.',
    error_unexpected_occurred: 'An unexpected error has occurred',
    invalid_location: 'Invalid location provided',
    error_billing_profile_not_created: 'Billing profile is not yet created. Please contact support',
    error_booking_attempted_past:
      'The booking is attempted to be made in the past. Please check the start time.',
    error_slot_already_booked: 'The slot is already booked in the desired time.',
    error_cannot_process_method: 'Cannot process your payment method',
    error_terms_conditions: 'Please accept the terms and conditions',
    error_parking_slot_not_available: 'Parking slot is not fully available for the selected period',
    alert_user_already_exist: 'A user with this email already exists in the system.',
    'The terms and conditions must be accepted.': 'The terms and conditions must be accepted.',
    no_payment_methods: 'No payment methods',
    'Amount must be at least €0.50 eur': 'Amount must be at least €0.50 eur',
    error_selection_invalid:
      'The booking time selection is invalid. Please select a continuous period.',
    min_price_per_hour: 'Price per hour cannot be less than 1 EUR',
    max_price_per_hour: 'Price per hour cannot be more than 200 EUR',
    price_required: 'Price is required',
    min_day_required: 'At least one day is required',
    required_account: 'Address is required',
    required_current_password: 'Current Password is required',
    error_account_active:
      'We found your account, but it is not active. Please use your activation email to activate it or contact your administrator for assistance.',
    required_start_time: 'Start time is required',
    required_end_time: 'End time is required',
    required_type: 'Type is required',
  },
  [Domain.Forms]: {
    Login: 'Login',
    Update: 'Update',
    Password: 'Password',
    continue: 'Continue',
    Submit: 'Submit',
    Subscribe: 'Subscribe',
    Cancel: 'Cancel',
    Save: 'Save',
    Select: 'Select',
    close: 'Close',
    Done: 'Done',
    reserve: 'Reserve',
    Driver: 'Driver',
    Provider: 'Provider',
    select_period: 'Select Period',
    select_time_period: 'Select time period',
    change_password: 'Change Password',
    current_password: 'Current Password',
    new_password: 'New Password',
    confirm_password: 'Confirm Password',
    send_password_reset: 'Send password reset email',
    name_on_card: 'Name on card',
    i_accept: 'I Accept',
    phone_number: 'Phone Number',
    license_plate: 'License Plate',
    select_vehicle_type: 'Select Vehicle Type',
    vehicle_type: 'Vehicle Type',
    select_vehicle_size: 'Select Vehicle Size',
    vehicle_size: 'Vehicle Size',
    delete_account: 'Delete account',
    //TODO language key below does not seem to be used anywhere
    'Select Vehicle': 'Select Vehicle',
    select_Vehicle: 'Select Vehicle',
    add_new_vehicle: 'Add new vehicle',
    Register: 'Register',
    add_new_parking_space: 'Add new parking space',
    parking_space_updated: 'Parking space updated!',
    parking_space_created: 'Parking space created!',
    Small: 'Small',
    Large: 'Large',
    Electric: 'Electric',
    Petrol: 'Petrol',
    Diesel: 'Diesel',
    Hybrid: 'Hybrid',
    postal_code: 'Postal Code',
    vat_number: 'VAT Number',
    City: 'City',
    select_country: 'Select country',
    Currency: 'Währung',
    address_line_1: 'Address Line 1',
    address_line_2: 'Address Line 2',
    Name: 'Name',
    Description: 'Description',
    slot_type: 'Slot Type',
    Notes: 'Notes',
    upload_picture: 'Upload picture',
    Availability: 'Availability',
    Monday: 'Monday',
    Tuesday: 'Tuesday',
    Wednesday: 'Wednesday',
    Thursday: 'Thursday',
    Friday: 'Friday',
    Saturday: 'Saturday',
    Sunday: 'Sunday',
    every_day: 'Every day',
    Search: 'Search',
    add_new_parking_slot: 'Add a new parking slot',
    give_slot_name: 'Give this slot a name',
    where_slot_located: 'Where is the slot located?',
    click_map_move_exact_space_location:
      'Click on the map to move the pin to the exact space location',
    charge_per_hour: 'How much would you like to charge per hour?',
    title_slot_available: 'When is the slot available?',
    describe_your_slot: 'Describe your slot',
    new_slot_added: 'New slot added!',
    add_parking_slot: 'Add parking slot',
    import_slot_csv: 'Import slots via CSV',
    upload_csv: 'Upload CSV',
    uploading: 'Uploading...',
    select_your_file: 'Select your file',
    browse_csv_file: 'Browse CSV file',
    imported_slot: 'Imported {{count}} slot',
    upload_completed: 'Upload completed!',
    From: 'From',
    To: 'To',
    booking_confirmed: 'Booking confirmed',
    Filter: 'Filter',
    payment_methods: 'Payment Methods',
    delete_payment_method: 'Delete payment method',
    message_confirm_delete_payment_method:
      'Please confirm if you really want to delete this payment method. This action is irreversible',
    message_confirm_close_account:
      'Please confirm if you really want to close your account. This action is irreversible',
    check_your_inbox: 'Check your inbox',
    Terms: 'Terms',
    parking_description: 'Parking description',
    message_thankyou: 'We have received your request. Thank you!',
    booking_confirmation: 'Booking confirmation',
    parking_rules: 'Parking Rules',
    pay: 'Pay',
    closing_your_account: 'Closing your account',
    set_password: 'Set password',
    //TODO language key below does not seem to be used anywhere
    'No parking spaces': 'No parking spaces',
    'Extra Large': 'Extra Large',
    'Place booking': 'Place booking',
    'Select Slot Type': 'Select Slot Type',
    'Additional info': 'Additional info',
    'Imported slot_plural': 'Imported {{count}} slots',
    'Your booking has been placed.': 'Your booking has been placed.',
    'Please select': 'Please select',
  },
  [Domain.Amenities]: {
    //INFO these language keys are used for translating amenities
    //     they are based on the content of the field 'name' in the table api.amenity
    Amenities: 'Amenities',
    Monitored: 'Monitored',
    Handycapped: 'Handycapped',
    Freestanding: 'Freestanding',
    Electric: 'Electric',
    Covered: 'Covered',
    Illuminated: 'Illuminated',
    Business: 'Business',
    Private: 'Private',
    Dirt_free_no_tree: 'Dirty free',
    extra_wide: 'Extra wide',
    mother_child: 'Mother + kid',
    women_parking_space: 'Parking space reserved for women',
    mobility: 'Mobility parking slot',
    Carpooling: 'Carpooling',
    caravan_water_supply: 'Water suply for caravan',
    shower_washing_rooms: 'Shower & washing rooms available for camping',
    caravan_power_connecter: 'Power connector for caravan',
    avp: 'Automated valet parking',
    sun_protection: 'Sun protection',
  },
  [Domain.Navigation]: {
    Dashboard: 'Dashboard',
    Users: 'Users',
    settings: 'Settings',
    Slots: 'Slots',
    Vehicles: 'Vehicles',
    Profile: 'Profile',
    Bookings: 'Bookings',
    Partners: 'Partners',
    Create: 'Create',
    update: 'update',
    Upgrade: 'Upgrade',
    Login: 'Login',
    logout: 'Logout',
    signup: 'SignUp',
    parking_slots: 'My Parking Slots',
    //TODO language key below does not seem to be used anywhere
    'Find Parking Slot': 'Find Parking Slot',
  },
  [Domain.User]: {
    Role: 'Role',
    Profile: 'Profile',
    //TODO language key below does not seem to be used anywhere
    account_owner: 'Account Owner',
    super_admin: 'Super Admin',
    single_member: 'Single Member',
  },
  [Domain.Pages]: {
    Slots: 'Parking slots',
    Vehicles: 'Vehicles',
    Profile: 'Profile',
    create_vehicle: 'Create vehicle',
    terms_conditions: 'Terms and Conditions',
    parkhands_subscription: 'Parkhands Subscription',
    payment_methods: 'Payment Methods',
    credit_card: 'Credit Card',
    sepa_direct_debit: 'SEPA Direct Debit',
    billing_detail: 'Billing Details',
    subscriptions_invoices: 'Subscriptions & Invoices',
    start_date: 'Start date',
    end_date: 'End date',
    Availability: 'Availability',
    amount: 'Amount',
    status: 'Status',
    actions: 'Actions',
    view_online: 'View Online',
    download_pdf: 'Download PDF',
    park_nearby: 'Park nearby',
    parking_space: 'Parking spaces',
    //TODO language key below does not seem to be used anywhere
    'Create user': 'Create user',
    'Create slot': 'Create slot',
    'Vehicle Type': 'Vehicle Type',
    'License Plate': 'License Plate',
    'Data security / GDPR': 'Datenschutz',
    // LoginForm / RegisterForm
    label_sign_up: 'Sign up as:',
    new_to_parkhands: 'New to Parkhands?',
    create_account: 'Create an account',
    did_you: 'Did you ',
    forget_password: 'forget your password?',
    //TODO language key below does not seem to be used anywhere
    'Already have an account? Sign in': 'Already have an account? Sign in',
    // NotActivatedAlert
    your_account_still_pending: 'Your account is still pending',
    check_your_inbox_confirm_your_email_address:
      'Please check your inbox and confirm your email address',
    send_again: 'SEND AGAIN',
    sent: 'SENT',
    // SubscriptionPage
    welcome_to_parkhands: 'Welcome to Parkhands',
    title_welcome_to_parkhands_premium: 'Welcome to Parkhands Premium!',
    parkhands_premium_subscription: 'Parkhands Premium subscription',
    alert_subscription_updated: 'Your subscription has been updated.',
    // ForgotPasswordPage
    forgot_password: 'Forgot your password?',
    message_password_reset_link:
      "Enter your user account's verified email address and we will send you a password reset link.",
    // ChangePasswordPage
    change_password: 'Change your password',
    label_new_password: 'Enter your new password below:',
    // CheckInboxPage
    message_reset_password_link: 'Reset password link has been sent to your email!',
    message_follow_instructions: 'Please follow the provided instructions.',
    //TODO language key below does not seem to be used anywhere
    'Parked at:': 'Parked at:',
    'Reservation at:': 'Reservation at:',
    message_confirm_cancel_booking: 'Are you sure you want to cancel this booking?',
    parking_period_expired: 'Parking period expired',
    starting_in: 'Starting in {{seconds}}s',
    confirm_email_address_set_password: 'To confirm your email address please set a password:',
    // Payment Methods
    agree_terms_conditions: 'I agree with the <button>terms and conditions</button>',
    //TODO language key below does not seem to be used anywhere
    'I agree with the ': 'I agree with the ',
    'terms and conditions': 'terms and conditions',
    name_on_card: 'Name on card',
    label_agree_with: 'Do you agree with the ',
    title_update_profile: 'Updating the profile requires concent',
    label_receive_information: 'I would like to receive information about PARKHANDS',
    Bookings: 'Bookings',
    contact_us_download_information:
      'If you want to download all your information please contact us.',
    no_result_found: 'No results found',
    extend_time: 'Extend time',
    Login: 'Login',
    no_subscriptions_available_superadmin: 'No subscriptions are available for Super Admins',
    your_subscription_is_active: 'Your subscription is active',
    payment_method_created: 'Payment method created',
  },
  [Domain.Email]: {
    parkingIssueSubject: 'Issue with booking {{id}}',
    claimSlotSubject: 'Request to activate a parking slot {{id}}',
  },
  [Domain.Bookings]: {
    All: 'All',
    Ongoing: 'Ongoing',
    Planned: 'Planned',
    Expired: 'Expired',
    Canceled: 'Canceled',
  },
}
