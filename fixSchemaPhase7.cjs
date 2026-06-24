const fs = require('fs');
const path = require('path');

const schemaPath = path.join(__dirname, 'prisma', 'schema.prisma');
let schema = fs.readFileSync(schemaPath, 'utf8');

// Strip off the previous attempt
const markerIndex = schema.indexOf('// 37. SOCIETY MANAGEMENT CLOUD (Phase 7)');
if (markerIndex !== -1) {
  schema = schema.substring(0, markerIndex);
}

// 1. Add new relation fields to existing models
const additions = {
  'model Tenant {': `  committeeMembers CommitteeMember[]\n  agmMeetings      AgmMeeting[]\n  polls            Poll[]\n  pets             Pet[]\n  emergencyContacts EmergencyContact[]\n  guestInvitations GuestInvitation[]\n  deliveryLogs     DeliveryLog[]\n  facilityBookings FacilityBooking[]\n`,
  'model Customer {': `  pets             Pet[]\n  emergencyContacts EmergencyContact[]\n  committeeRoles   CommitteeMember[]\n  votes            Vote[]\n  facilityBookings FacilityBooking[]\n  hostInvitations  GuestInvitation[] @relation("HostInvitations")\n`,
  'model VisitorLog {': `  guestInvitationId String?\n  guestInvitation   GuestInvitation? @relation(fields: [guestInvitationId], references: [id])\n  deliveryLog       DeliveryLog?\n`,
  'model MaintenanceBill {': `  lineItems        MaintenanceBillLineItem[]\n`,
  'model EventSpace {': `  facilityBookings FacilityBooking[]\n`,
  'model Society {': `  committeeMembers CommitteeMember[]\n  agmMeetings      AgmMeeting[]\n  polls            Poll[]\n`
};

for (const [modelDec, addition] of Object.entries(additions)) {
  const regex = new RegExp(`(${modelDec}[\\s\\S]*?)(?=})`);
  // Make sure we don't duplicate if they were already there from a previous pass
  if (!schema.includes('committeeMembers CommitteeMember[]') || modelDec !== 'model Tenant {') {
     // I'll just rely on the git restore to keep it clean, but since I can't guarantee git restore worked, I'll just add it. Wait, I stripped the end but the additions to Customer/Tenant were already made in the first pass!
  }
}

// Actually, it's safer to just write a simple regex that finds 'model Tenant {' and inserts the missing ones if not present.
