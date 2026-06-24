const fs = require('fs');
const path = require('path');

const schemaPath = path.join(__dirname, 'prisma', 'schema.prisma');
let schema = fs.readFileSync(schemaPath, 'utf8');

const additions = {
  'model Tenant {': `  committeeMembers CommitteeMember[]\n  agmMeetings      AgmMeeting[]\n  polls            Poll[]\n  pets             Pet[]\n  emergencyContacts EmergencyContact[]\n  guestInvitations GuestInvitation[]\n  deliveryLogs     DeliveryLog[]\n  facilityBookings FacilityBooking[]\n`,
  'model Customer {': `  hostInvitations  GuestInvitation[] @relation("HostInvitations")\n`
};

for (const [modelDec, addition] of Object.entries(additions)) {
  const regex = new RegExp(`(${modelDec}[\\s\\S]*?)(?=})`);
  schema = schema.replace(regex, `$1${addition}`);
}

fs.writeFileSync(schemaPath, schema);
console.log('Schema fixed successfully.');
