import { Domain } from '.'

export default {
  [Domain.General]: {
    location_required: 'Please enter location',
    submit: 'Absenden',
    cancel: 'Abbrechen',
    confirm: 'Bestätigen',
    reset: 'Erholung',
    success: 'Success',
    delete_item: 'Element löschen?',
    confirm_delete_item: 'Möchten Sie den Artikel wirklich löschen?',
    price_per_hour: 'Preis pro Stunde',
    approve: 'Genehmigen',
    reject: 'Ablehnen',
    restricted_area: 'Restricted area',
    no_resource_access: 'You don\'t have access to this resource',
    visit_parkhands: 'Visit Parkhands',
    access_restriction: 'Access Restrictions',
    floor_number: 'Floor Number',
    welcome: 'Welcome to Parkhands',
    visit: 'Visit',
    manage_slots: 'Manage slots',
    manage_vehicles: 'Manage Vehicles',
    upload: 'Upload JSON Dataset',
    space_id: 'SpaceID:',
    review: 'Review State:',
    entry: 'Entry Ramp:',
    exit: 'Exit Ramp:',
    view: 'View in maps',
    capacity: 'Capacity:',
    area: 'Area:',
    name: 'Name',
    owner: 'Owner',
    select_acccount: 'Select account',
    actions: 'Actions',
    logo: 'Logo',
    org_address: 'Company address',
    status: 'Status',
    select_vehicle: 'Select Vehicle Type',
  },
  [Domain.Navigation]: {
    approve_slots: 'Approve Slots',
    approve_spaces: 'Approve Spaces',
    dashboard: 'Hauptpanel',
    users: 'Benutzer',
    settings: 'Settings',
    slots: 'Parkplätze',
    spaces: 'Spaces',
    vehicles: 'Fahrzeuge',
    billing: 'Abrechnung',
    bookings: 'Reservierung',
    partners: 'Partnerschaft',
    logout: 'Ausloggen',
    create: 'Erstellen',
    update: 'Aktualisieren',
  },
  [Domain.Bookings]: {
    id: 'ID',
    booking_status: 'Booking Status',
    slot: 'Slot',
    driver: 'Driver',
    license_plate: 'Nummernschild',
    phone: 'Phone',
    start: 'Start',
    End: 'End',
    booking_created: 'Booking Created'
  },
  [Domain.User]: {
    role: 'Rolle',
    profile: 'Profil',
    account_owner: 'Kontoinhaber',
    super_admin: 'Höchster Vorgesetzter',
    single_member: 'Mitglied',
    email: 'Email',
    profile_completion: 'User will receive invitation email to complete their profile and set a password.',
  },
  [Domain.Amenities]: {
    amenities: 'Ausstattung',
    //INFO these language keys are used for translating amenities
    //     they are based on the content of the field 'name' in the table api.amenity
    dirt_free_no_tree: 'Schmutzfrei',
    extra_wide: 'Extra breit',
    mother_child: 'Mutter + Kind',
    monitored: 'Überwacht',
    handycapped: 'Behindert',
    freestanding: 'Freistehend',
    electric: 'Elektrisch',
    covered: 'Bedeckt',
    illuminated: 'Beleuchtet',
    business: 'Business',
    private: 'Privat',
    women_parking_space: 'Frauenparkplatz',
    mobility: 'Carsharing',
    carpooling: 'Carpooling',
    caravan_water_supply: 'Wasseranschluss für Wohnmobil',
    shower_washing_rooms: 'Waschräume und Duschen (Wohnmobil)',
    caravan_power_connecter: 'Stromanschluss für Wohnmobil',
    avp: 'Automated Valet Parking',
    sun_protection: 'Schattenparkplatz',
  },
  [Domain.Slots]: {
    description: 'Description',
    parking_rules: 'Parking Rules',
    slot_number: 'Slot Number',
    status_inactive: 'Status Inactive',
    every_day: 'Every day',
    availability: 'Availability',
    active: 'Active',
    vehicle_size: 'Vehicle size',
    max_parking_time: 'Maximum Parking time',
    copy_new_slot: 'Copy to New Slot',
    positive_price: 'The price must be a positive number',
    lessthan: 'Price per hour above 200 EUR',
    price_required: 'Price is required',
    flr_no_required: 'Floor Number is required',
    acc_owner_required: 'Account Owner is required',
    type_required: 'Type is required',
    start_time_req: 'Start time is required',
    end_time_required: 'End time is required',
    end_time_first: 'The end time must be after the start time',
    min_day: 'At least one day is required',
    view_slot: 'View Slot',
    manage: 'Manage',
    upload_csv: 'Upload Slots CSV file'
  },
  [Domain.Spaces]: {
    space: 'Space:',
    space_location: 'Space location',
    inventory: 'Inventory',
    basic_info: 'Please provide basic information for your parking space and set the active status if the parking is available',
    date_range: 'Please select the date range within which your parking space is available. After that you will be able to set the open and work hours.',
    define_no_of_slots: 'Please define the number of the parking slots within your parking space, their description, rules and amenities.',
  },
  [Domain.Pages]: {
    slots: 'Parkplätze',
    vehicles: 'Fahrzeuge',
    profile: 'Profil',
    create_user: 'Benutzer erstellen',
    create_vehicle: 'Fahrzeug erstellen',
    create_slot: 'Parkplatz erstellen',
    vehicle_type: 'Fahrzeugtypen',
    license_plate_required: 'License Plate is required',
    pending_approval: 'Dieser Parkplatz steht noch aus',
    approve_or_reject: 'Bitte überprüfen Sie die Stellplatzdaten und genehmigen oder lehnen Sie den Stellplatz ab. Wenn Sie den Slot genehmigen, wird der Slot in der Karte angezeigt und je nach Verfügbarkeit buchbar gemacht.',
    copyright_yr: '2020 Parkhands',
    privacy_policy: 'Privacy Policy',
    tc: 'Terms & Conditions',
    en: 'EN',
    de: 'DE',
    upload: 'Upload JSON Dataset',
    vehicle: 'Vehicle:'
  },
  [Domain.Register]: {
    please_register: 'Please register',
    new_user: 'New at PARKHANDS?',
    did_you_forget_pwd: 'Did you',
    sign_in: 'Sing In',
    remember_me: 'Remember me',
    email: 'Email Address',
    password: 'Password',
    invalid_email: 'Invalid email',
    email_required: 'Email is required',
    too_short: 'Too short',
    too_long: 'Too long',
    pwd_required: 'Password is required',
    sign_up: 'Sign Up',
    first_name: 'First Name',
    last_name: 'Last Name',
    existing_account: 'Already have an account? Sign in',
    name_required: 'Name is required',
    forget_pwd: 'forget your password?'
  }
}
